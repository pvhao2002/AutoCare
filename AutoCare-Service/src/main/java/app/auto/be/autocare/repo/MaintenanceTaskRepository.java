package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.MaintenanceTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceTaskRepository extends JpaRepository<MaintenanceTask, Long> {

    List<MaintenanceTask> findByOrderId(Long orderId);
}
