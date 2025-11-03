-- ============================================================
-- 1. TẠO PROFILE BẢO MẬT
-- ============================================================
CREATE PROFILE secure_profile LIMIT
    FAILED_LOGIN_ATTEMPTS 5             -- Cho phép sai tối đa 5 lần
    PASSWORD_LIFE_TIME 180              -- Mật khẩu có hiệu lực 180 ngày (6 tháng)
    PASSWORD_REUSE_TIME 30              -- Sau 30 ngày có thể dùng lại mật khẩu cũ
    PASSWORD_REUSE_MAX 3                -- Hoặc sau khi đổi 3 lần
    PASSWORD_LOCK_TIME 1/48             -- Khóa 30 phút nếu sai quá 5 lần
    SESSIONS_PER_USER 5                 -- Cho phép mở 5 session cùng lúc
    IDLE_TIME 120                       -- Cho phép rảnh 120 phút (2 tiếng) mới tự ngắt
    PASSWORD_VERIFY_FUNCTION NULL;      -- Không kiểm tra độ phức tạp mật khẩu

-- ============================================================
-- 2. TẠO USER (SCHEMA) CHO ỨNG DỤNG
-- ============================================================
CREATE USER AUTOCAR IDENTIFIED BY autocar123
    DEFAULT TABLESPACE USERS
    QUOTA UNLIMITED ON USERS;

GRANT CONNECT, RESOURCE TO AUTOCAR;
ALTER USER AUTOCAR PROFILE secure_profile;

-- ============================================================
-- 3. THIẾT LẬP APPLICATION CONTEXT
-- ============================================================
CREATE OR REPLACE PACKAGE APP_CTX_PKG AS
  PROCEDURE set_context(p_user VARCHAR2, p_garage_id VARCHAR2, p_role VARCHAR2);
END APP_CTX_PKG;
/

CREATE OR REPLACE PACKAGE BODY APP_CTX_PKG AS
  PROCEDURE set_context(p_user VARCHAR2, p_garage_id VARCHAR2, p_role VARCHAR2) IS
BEGIN
    DBMS_SESSION.SET_CONTEXT('APP_CTX', 'USER_NAME', p_user);
DBMS_SESSION.SET_CONTEXT('APP_CTX', 'GARAGE_ID', p_garage_id);
DBMS_SESSION.SET_CONTEXT('APP_CTX', 'ROLE', p_role);
END;
END APP_CTX_PKG;
/

CREATE CONTEXT APP_CTX USING APP_CTX_PKG;

-- ============================================================
-- 4. DEMO TABLE CHO VPD & OLS
-- ============================================================
CONNECT AUTOCAR/autocar123@//localhost:1521/XEPDB1;

CREATE TABLE WORK_ORDER (
                            WORK_ORDER_ID VARCHAR2(36) PRIMARY KEY,
                            GARAGE_ID     VARCHAR2(36),
                            CUSTOMER_ID   VARCHAR2(36),
                            STATUS        VARCHAR2(30),
                            QR_TOKEN      VARCHAR2(256),
                            CREATED_BY    VARCHAR2(100),
                            ASSIGNED_TO   VARCHAR2(100),
                            OLS_LABEL     VARCHAR2(100)
);

INSERT INTO WORK_ORDER VALUES ('W001','G01','C01','DONE',NULL,'MANAGER1','MECH1',NULL);
INSERT INTO WORK_ORDER VALUES ('W002','G02','C02','PENDING',NULL,'MANAGER2','MECH2',NULL);
COMMIT;

-- ============================================================
-- 5. TẠO POLICY VPD (ROW-LEVEL SECURITY)
-- ============================================================
CREATE OR REPLACE FUNCTION f_vpd_work_order(schema_name VARCHAR2, table_name VARCHAR2)
RETURN VARCHAR2 AS
  v_role VARCHAR2(30);
v_garage VARCHAR2(36);
BEGIN
    v_role := SYS_CONTEXT('APP_CTX', 'ROLE');
v_garage := SYS_CONTEXT('APP_CTX', 'GARAGE_ID');

IF v_role = 'ADMIN' THEN
    RETURN '1=1';
ELSE
    RETURN 'GARAGE_ID = '||QUOTE_LITERAL(v_garage);
END IF;
END;
/

BEGIN
    DBMS_RLS.ADD_POLICY(
    object_schema   => 'AUTOCAR',
    object_name     => 'WORK_ORDER',
    policy_name     => 'POL_WORK_ORDER_VPD',
    function_schema => 'AUTOCAR',
    policy_function => 'f_vpd_work_order',
    statement_types => 'SELECT, UPDATE, DELETE'
  );
END;
/

-- ============================================================
-- 6. CẤU HÌNH OLS (Oracle Label Security)
-- ============================================================
CONNECT LBACSYS/LBACSYS@//localhost:1521/XEPDB1;

BEGIN
    SA_SYSDBA.CREATE_POLICY(policy_name => 'GARAGE_POLICY', column_name => 'OLS_LABEL');
SA_SYSDBA.ADD_LEVEL('GARAGE_POLICY', 10, 'L10', 'GARAGE_CONFIDENTIAL');
SA_SYSDBA.ADD_LEVEL('GARAGE_POLICY', 5, 'L5', 'GARAGE_PUBLIC');
END;
/

BEGIN
    SA_SYSDBA.APPLY_TABLE_POLICY('GARAGE_POLICY', 'AUTOCAR', 'WORK_ORDER', 'READ_CONTROL');
END;
/

EXEC SA_USER_ADMIN.SET_LEVELS('GARAGE_POLICY','AUTOCAR','L10');

-- ============================================================
-- 7. PHÂN QUYỀN VÀ ROLE (RBAC)
-- ============================================================
CONNECT SYSTEM/123456@//localhost:1521/XEPDB1;

CREATE ROLE R_MANAGER;
CREATE ROLE R_MECHANIC;
CREATE ROLE R_CUSTOMER;

GRANT SELECT, INSERT, UPDATE ON AUTOCAR.WORK_ORDER TO R_MANAGER;
GRANT SELECT ON AUTOCAR.WORK_ORDER TO R_CUSTOMER;

GRANT R_MANAGER TO AUTOCAR;

-- ============================================================
-- 8. FGA – FINE-GRAINED AUDIT
-- ============================================================
CONNECT SYSTEM/123456@//localhost:1521/XEPDB1;

BEGIN
    DBMS_FGA.ADD_POLICY(
    object_schema   => 'AUTOCAR',
    object_name     => 'WORK_ORDER',
    policy_name     => 'FGA_WORK_ORDER',
    audit_condition => 'STATUS = ''DONE''',
    audit_column    => 'STATUS',
    statement_types => 'SELECT, UPDATE',
    enable          => TRUE
  );
END;
/

-- ============================================================
-- 9. STANDARD AUDIT + TRIGGER AUDIT
-- ============================================================
AUDIT SESSION;
AUDIT CREATE TABLE BY ACCESS;
AUDIT DROP TABLE BY ACCESS;

CONNECT AUTOCAR/autocar123@//localhost:1521/XEPDB1;

CREATE TABLE AUDIT_LOG (
                           ID NUMBER GENERATED ALWAYS AS IDENTITY,
                           USERNAME VARCHAR2(100),
                           ACTION_TYPE VARCHAR2(10),
                           TABLE_NAME VARCHAR2(50),
                           ACTION_TIME TIMESTAMP DEFAULT SYSTIMESTAMP
);

CREATE OR REPLACE TRIGGER TRG_AUDIT_WORK_ORDER
              AFTER INSERT OR UPDATE OR DELETE ON WORK_ORDER
    FOR EACH ROW
BEGIN
INSERT INTO AUDIT_LOG(USERNAME, ACTION_TYPE, TABLE_NAME)
VALUES (SYS_CONTEXT('USERENV','SESSION_USER'),
        CASE WHEN INSERTING THEN 'INS'
             WHEN UPDATING THEN 'UPD'
             WHEN DELETING THEN 'DEL' END,
        'WORK_ORDER');
END;
/

-- ============================================================
-- 10. BACKUP / RESTORE (HƯỚNG DẪN)
-- ============================================================
-- Dùng Data Pump:
-- Xuất dữ liệu:
--    expdp system/123456 schemas=AUTOCAR directory=DATA_PUMP_DIR dumpfile=autocar.dmp logfile=autocar.log
-- Nhập dữ liệu:
--    impdp system/123456 schemas=AUTOCAR directory=DATA_PUMP_DIR dumpfile=autocar.dmp logfile=import.log
-- ============================================================
