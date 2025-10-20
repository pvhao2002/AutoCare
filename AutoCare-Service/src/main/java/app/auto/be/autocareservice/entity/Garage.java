package app.auto.be.autocareservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Table(name = "garage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Garage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "garage_id")
    private UUID garageId;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "branch_code", unique = true, length = 50)
    private String branchCode;

    @Column(name = "address")
    private String address;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @OneToMany(mappedBy = "garage", cascade = CascadeType.ALL)
    private List<Vehicle> vehicles = new ArrayList<>();
}
