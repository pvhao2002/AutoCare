package app.auto.be.autocareservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "role")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "role_code", unique = true, length = 50)
    private String roleCode;

    @OneToMany
    @JoinColumn(name = "role_id")
    private List<UserAccount> users;
}
