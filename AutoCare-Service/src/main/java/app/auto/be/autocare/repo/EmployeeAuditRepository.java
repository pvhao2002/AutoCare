package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.EmployeeAudit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeAuditRepository extends JpaRepository<EmployeeAudit, Long> {
    List<EmployeeAudit> findByEmployeeIdOrderByActionAtDesc(Long employeeId);
}
