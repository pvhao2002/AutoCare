CREATE OR REPLACE TRIGGER trg_employee_audit
              AFTER INSERT OR UPDATE OR DELETE
                    ON employee
                        FOR EACH ROW
BEGIN
    -- INSERT
    IF INSERTING THEN
INSERT INTO employee_audit (
    employee_id,
    branch_id,
    old_salary, new_salary,
    active,
    action_type,
    action_by,
    action_at
)
VALUES (
           :NEW.id,
           :NEW.branch_id,
           :NEW.salary, :NEW.salary,
           NVL(:NEW.active, 0),
           'INSERT',
           :NEW.updated_by,
           SYSTIMESTAMP
       );

-- UPDATE
ELSIF UPDATING THEN
INSERT INTO employee_audit (
    employee_id,
    branch_id,
    old_salary, new_salary,
    active,
    action_type,
    action_by,
    action_at
)
VALUES (
           :NEW.id,
           :NEW.branch_id,
           :OLD.salary, :NEW.salary,
           NVL(:NEW.active, 0),
           'UPDATE',
           :NEW.updated_by,
           SYSTIMESTAMP
       );

-- DELETE
ELSIF DELETING THEN
INSERT INTO employee_audit (
    employee_id,
    branch_id,
    old_salary, new_salary,
    active,
    action_type,
    action_by,
    action_at
)
VALUES (
           :OLD.id,
           :OLD.branch_id,
           :OLD.salary, :OLD.salary,
           NVL(:OLD.active, 0),
           'DELETE',
           :OLD.updated_by,
           SYSTIMESTAMP
       );
END IF;
END;
/
