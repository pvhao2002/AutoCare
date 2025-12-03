package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.MaintenanceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceOrderRepository extends JpaRepository<MaintenanceOrder, Long> {

    List<MaintenanceOrder> findByCustomerId(Long customerId);

    List<MaintenanceOrder> findByVehicleId(Long vehicleId);

    List<MaintenanceOrder> findByStatus(String status);
}
