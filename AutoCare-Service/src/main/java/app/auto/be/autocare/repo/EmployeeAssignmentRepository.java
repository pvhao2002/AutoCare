package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.EmployeeAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeAssignmentRepository extends JpaRepository<EmployeeAssignment, Long> {

    List<EmployeeAssignment> findByOrderId(Long orderId);

    List<EmployeeAssignment> findByEmployeeId(Long employeeId);
}
