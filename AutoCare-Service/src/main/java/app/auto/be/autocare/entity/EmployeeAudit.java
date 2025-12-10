package app.auto.be.autocare.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "employee_audit")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeAudit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "audit_id")
    private Long auditId;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private BigDecimal oldSalary;
    private BigDecimal newSalary;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "action_type", length = 10)
    private String actionType; // INSERT, UPDATE, DELETE

    @Column(name = "action_by", length = 100)
    private String actionBy;

    @Column(name = "action_at")
    private LocalDateTime actionAt;
}
