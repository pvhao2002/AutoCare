package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.Employee;
import app.auto.be.autocare.entity.projection.EmployeeInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<EmployeeInfo> findAllByActiveTrue();
}
