package app.auto.be.autocare.service;

import app.auto.be.autocare.dto.RegisterRequest;
import app.auto.be.autocare.dto.employee.EmployeeDTO;
import app.auto.be.autocare.entity.Employee;
import app.auto.be.autocare.entity.model.RawEmployee;
import app.auto.be.autocare.repo.BranchRepository;
import app.auto.be.autocare.repo.EmployeeRepository;
import app.auto.be.autocare.repo.UserRepository;
import app.auto.be.autocare.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final BranchRepository branchRepository;
    private final AuthService authService;

    @Transactional(readOnly = true)
    public List<RawEmployee> findAllEmployees() {
        var allUsers = userRepository.findAllByActiveTrue();
        return allUsers.stream().map(user -> {
            var employee = employeeRepository.findById(user.getId()).orElse(null);
            if (employee != null && !employee.isActive()) {
                return null;
            }
            return new RawEmployee(employee, user);
        }).filter(Objects::nonNull).sorted(Comparator.comparing(e -> e.getUser().id())).toList();
    }

    @Transactional
    public void upsertEmployee(EmployeeDTO dto, Long employeeId, UserPrincipal userPrincipal) {
        var branch = branchRepository.findById(dto.getBranchId())
                .orElseThrow(() -> new IllegalArgumentException("Branch not found"));

        Optional.ofNullable(employeeId)
                .flatMap(employeeRepository::findById)
                .ifPresentOrElse(employee -> {
                    employee.setAddress(dto.getAddress());
                    employee.setGender(dto.getGender());
                    employee.setPhone(dto.getPhone());
                    employee.setAge(dto.getAge());
                    employee.setSalary(dto.getSalary());
                    employee.setUpdatedBy(userPrincipal.getUsername());
                    employee.getUser().setBranch(branch);
                    employeeRepository.save(employee);
                }, () -> {
                    var registerPayload = new RegisterRequest(
                            dto.getEmail(),
                            dto.getUsername(),
                            dto.getPassword(),
                            dto.getFullName(),
                            dto.getBranchId()
                    );
                    var user = authService.register(registerPayload, dto.getRole());
                    var newEmployee = new Employee();
                    newEmployee.setAddress(dto.getAddress());
                    newEmployee.setGender(dto.getGender());
                    newEmployee.setPhone(dto.getPhone());
                    newEmployee.setAge(dto.getAge());
                    newEmployee.setSalary(dto.getSalary());
                    newEmployee.setUser(user);
                    newEmployee.setActive(true);
                    newEmployee.setUpdatedBy(userPrincipal.getUsername());
                    employeeRepository.save(newEmployee);
                });
    }


    @Transactional
    public void deactivateEmployee(Long employeeId, UserPrincipal userPrincipal) {
        var employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        employee.setActive(false);
        employee.setUpdatedBy(userPrincipal.getUsername());
        employeeRepository.save(employee);
    }
}
