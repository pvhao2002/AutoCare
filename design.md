# System Design / Thiết Kế Hệ Thống

## 1. Overview / Tổng quan
**EN:**  
The application follows a **3-tier architecture**: Presentation → Business Logic → Database.  
Each layer is isolated for security, maintainability, and scalability.

**VN:**  
Ứng dụng được thiết kế theo **kiến trúc 3 lớp**: Giao diện → Xử lý nghiệp vụ → Cơ sở dữ liệu.  
Mỗi lớp được tách biệt để đảm bảo bảo mật, dễ bảo trì và mở rộng.

---

## 2. Architecture Diagram / Sơ đồ kiến trúc
**EN:**  
- **Presentation Layer:** UI built in JavaFX or C# WinForms / Web.  
- **Business Layer:** Handles authentication, access control, digital signature.  
- **Database Layer:** Oracle DB with VPD, OLS, FGA, Triggers, and Auditing.

**VN:**  
- **Lớp giao diện:** Xây dựng bằng JavaFX hoặc C# WinForms / Web.  
- **Lớp nghiệp vụ:** Xử lý xác thực, phân quyền, chữ ký số.  
- **Lớp cơ sở dữ liệu:** Oracle Database tích hợp VPD, OLS, FGA, Trigger và Audit.

---

## 3. Database Design / Thiết kế cơ sở dữ liệu
**Tables:**  
- USERS(user_id, username, password_hash, role, profile_id)  
- CUSTOMER(customer_id, name, contact, address, qr_code)  
- SERVICE(service_id, name, type, price)  
- INVOICE(invoice_id, customer_id, total_amount, signature_hash)  
- AUDIT_LOG(log_id, user_id, action, timestamp)

**Security Layers:**  
- Encryption for `password_hash`, `signature_hash`  
- VPD policies to restrict data visibility by user role  
- Standard & Fine-Grained Auditing (FGA) for all CRUD operations  

**VN:**  
Thiết kế bao gồm các bảng chính như **USERS, CUSTOMER, SERVICE, INVOICE, AUDIT_LOG**,  
mã hóa trường nhạy cảm, kiểm soát truy cập chi tiết bằng VPD/OLS,  
và ghi log bằng FGA, Trigger.

---

## 4. Security Features / Tính năng bảo mật
| Feature | Description (EN) | Mô tả (VN) |
|----------|------------------|-------------|
| Authentication | Username/password, Oracle profile policies | Đăng nhập bằng tài khoản, áp dụng profile chính sách mật khẩu |
| Authorization | Role-based + VPD/OLS | Phân quyền theo vai trò, kết hợp VPD/OLS |
| Auditing | FGA, Standard Audit, Trigger logs | Ghi nhận thao tác người dùng bằng FGA, Audit, Trigger |
| Encryption | Data encryption for sensitive fields | Mã hóa dữ liệu quan trọng |
| Digital Signature | Sign invoice using Oracle Wallet/PKI | Ký hóa đơn bằng Oracle Wallet/PKI |
| Backup & Recovery | RMAN / export-import utilities | Sao lưu & phục hồi bằng RMAN hoặc công cụ export/import |

---

## 5. Interface Design / Thiết kế giao diện
**EN:**  
- Login Screen  
- Dashboard with role-based menu  
- Service & Customer Management  
- Invoice Generation & QR Code viewer  

**VN:**  
- Màn hình đăng nhập  
- Trang chủ có menu tùy vai trò  
- Quản lý dịch vụ & khách hàng  
- Tạo hóa đơn và hiển thị mã QR
