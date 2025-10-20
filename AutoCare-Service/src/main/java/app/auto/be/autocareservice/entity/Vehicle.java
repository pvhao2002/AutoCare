package app.auto.be.autocareservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Table(name = "vehicle")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "vehicle_id")
    private UUID vehicleId;

    @Column(name = "color", length = 100)
    private String color;

    @Column(name = "plate", length = 20, unique = true)
    private String plate;

    @Column(name = "image", columnDefinition = "TEXT")
    private String image;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Customer owner;
}
