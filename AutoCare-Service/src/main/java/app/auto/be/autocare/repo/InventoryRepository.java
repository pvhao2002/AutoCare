package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
