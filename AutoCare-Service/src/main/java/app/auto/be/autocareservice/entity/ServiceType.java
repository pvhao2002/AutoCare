package app.auto.be.autocareservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "SERVICE_TYPE")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "SUPPLIER_ID")
    private Supplier supplier;

    @Column(name = "NAME", nullable = false, length = 150)
    private String name;

    @Column(name = "BASE_PRICE")
    private Double basePrice;
}
