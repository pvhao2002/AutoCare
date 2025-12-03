package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Long> {
}
