package app.auto.be.autocare.service;

import app.auto.be.autocare.dto.employee.EmployeeDTO;
import app.auto.be.autocare.entity.Employee;
import app.auto.be.autocare.repo.BranchRepository;
import app.auto.be.autocare.repo.EmployeeRepository;
import app.auto.be.autocare.repo.UserRepository;
import app.auto.be.autocare.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final BranchRepository branchRepository;

    public void upsertEmployee(EmployeeDTO dto, Long employeeId, UserPrincipal userPrincipal) {
        var branch = branchRepository.findById(dto.getBranchId())
                .orElseThrow(() -> new IllegalArgumentException("Branch not found"));
        var user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Optional.ofNullable(employeeId)
                .flatMap(employeeRepository::findById)
                .ifPresentOrElse(employee -> {
                    employee.setPosition(dto.getPosition());
                    employee.setSalary(dto.getSalary());
                    employee.setBranch(branch);
                    employeeRepository.save(employee);
                }, () -> {
                    var newEmployee = new Employee();
                    newEmployee.setPosition(dto.getPosition());
                    newEmployee.setSalary(dto.getSalary());
                    newEmployee.setBranch(branch);
                    newEmployee.setUser(user);
                    newEmployee.setActive(true);
                    employeeRepository.save(newEmployee);
                });
    }
}
