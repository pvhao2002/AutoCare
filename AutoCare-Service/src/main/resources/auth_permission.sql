-- ============================================================
--  PHÂN QUYỀN NGƯỜI DÙNG CHO ỨNG DỤNG BẢO DƯỠNG Ô TÔ
-- ============================================================
-- ============================================================
-- 1️⃣ TẠO 3 USER
-- ============================================================
CREATE USER ADMIN_APP IDENTIFIED BY admin123
    DEFAULT TABLESPACE USERS
    QUOTA UNLIMITED ON USERS;

CREATE USER SPRING_APP IDENTIFIED BY spring123
    DEFAULT TABLESPACE USERS
    QUOTA UNLIMITED ON USERS;

CREATE USER DEV_APP IDENTIFIED BY dev123
    DEFAULT TABLESPACE USERS
    QUOTA UNLIMITED ON USERS;

-- ============================================================
-- 2️⃣ CẤP QUYỀN KẾT NỐI
-- ============================================================
GRANT CREATE SESSION TO ADMIN_APP;
GRANT CREATE SESSION TO SPRING_APP;
GRANT CREATE SESSION TO DEV_APP;

-- ============================================================
-- 3️⃣ TẠO 3 ROLE TƯƠNG ỨNG
-- ============================================================
CREATE ROLE R_ADMIN;
CREATE ROLE R_SPRING;
CREATE ROLE R_DEV;

-- ============================================================
-- 4️⃣ CẤP QUYỀN CHO ROLE
-- ============================================================

-- 💼 R_ADMIN: full quyền (SELECT, INSERT, UPDATE, DELETE, ALTER, CREATE)
GRANT ALL PRIVILEGES TO R_ADMIN;

-- ============================================================
-- 5️⃣ GÁN ROLE CHO USER
-- ============================================================
GRANT R_ADMIN  TO ADMIN_APP;
GRANT R_SPRING TO SPRING_APP;
GRANT R_DEV    TO DEV_APP;

-- ============================================================
-- 6️⃣ MỞ TÀI KHOẢN CHO PHÉP ĐĂNG NHẬP
-- ============================================================
ALTER USER ADMIN_APP ACCOUNT UNLOCK;
ALTER USER SPRING_APP ACCOUNT UNLOCK;
ALTER USER DEV_APP ACCOUNT UNLOCK;

COMMIT;

-- ============================================================
-- 7️⃣ KIỂM TRA KẾT QUẢ
-- ============================================================

-- Xem danh sách user
SELECT username, account_status, created FROM dba_users
WHERE username IN ('ADMIN_APP','SPRING_APP','DEV_APP');

-- Xem role được gán
SELECT * FROM dba_role_privs
WHERE grantee IN ('ADMIN_APP','SPRING_APP','DEV_APP');

-- Xem quyền role
SELECT grantee, privilege, table_name
FROM dba_tab_privs
WHERE grantee IN ('R_ADMIN','R_SPRING','R_DEV')
ORDER BY grantee, table_name;

-- ============================================================
-- HẾT FILE
-- ============================================================
