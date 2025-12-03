package app.auto.be.autocare.entity;

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

    private DeviceType deviceType;    // mobile / web
    private LocalDateTime loginTime;
    private LocalDateTime lastActive;

    private boolean active;
}
