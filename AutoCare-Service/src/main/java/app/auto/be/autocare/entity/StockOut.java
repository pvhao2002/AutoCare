package app.auto.be.autocare.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "stock_out")
public class StockOut {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String stockOutCode;
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "signature_id")
    private DigitalSignature signature;
    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;
    @OneToMany(mappedBy = "stockOut", cascade = CascadeType.ALL)
    private Set<StockOutDetail> details = new HashSet<>();
    private String status;
}


