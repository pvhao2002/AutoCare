SELECT username, account_status, created
FROM dba_users
WHERE username = 'AUTOCAR';

SELECT *
FROM dba_users
WHERE username = 'AUTOCAR';

SELECT * FROM dba_role_privs WHERE grantee = 'AUTOCAR';

