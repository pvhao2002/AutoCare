package app.auto.be.autocare.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 20)
    private String gender;
    private Integer age;
    @Column(length = 20)
    private String phone;
    private String address;

    @Column(precision = 19, scale = 2)
    private BigDecimal salary;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private boolean active;
    private String updatedBy;

    @OneToOne
    @JoinColumn(name = "app_user_id", unique = true)
    private User user;
}

