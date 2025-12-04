package app.auto.be.autocare.entity;

import app.auto.be.autocare.device.TypeDevice;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "user_session")
public class UserSession {
    @Id
    @Column(length = 100)
    private String sessionId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private TypeDevice deviceType;    // mobile / web
    private LocalDateTime loginTime;
    private LocalDateTime lastActive;

    private boolean active;

    // ⭐ THÔNG TIN THIẾT BỊ / TRÌNH DUYỆT
    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Column(name = "device_model", length = 100)
    private String deviceModel;

    @Column(name = "os", length = 100)
    private String os;

    @Column(name = "browser", length = 100)
    private String browser;

    @PrePersist
    protected void onCreate() {
        this.loginTime = LocalDateTime.now();
        this.lastActive = LocalDateTime.now();
        this.active = true;
    }
}
