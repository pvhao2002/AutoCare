package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByBranchId(Long branchId);

    List<Employee> findByPosition(String position);

    List<Employee> findAllByActiveTrue();
}
