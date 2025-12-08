package app.auto.be.autocare.controller;

import app.auto.be.autocare.dto.ApiResponse;
import app.auto.be.autocare.repo.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("employee")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeRepository employeeRepository;

    @GetMapping
    public Object getAllEmployees() {
        return ApiResponse.success(employeeRepository.findAllByActiveTrue());
    }
}
