package app.auto.be.autocare.controller;

import app.auto.be.autocare.dto.ApiResponse;
import app.auto.be.autocare.dto.employee.EmployeeDTO;
import app.auto.be.autocare.security.UserPrincipal;
import app.auto.be.autocare.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("employee")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    public Object getAllEmployees() {
        return ApiResponse.success(employeeService.findAllEmployees());
    }

    @PostMapping
    public Object addEmployee(@RequestBody EmployeeDTO employee, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        employeeService.upsertEmployee(employee, null, userPrincipal);
        return ApiResponse.success("Employee added successfully");
    }

    @PatchMapping("{id}")
    public Object updateEmployee(@RequestBody EmployeeDTO employee, @PathVariable Long id, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        employeeService.upsertEmployee(employee, id, userPrincipal);
        return ApiResponse.success("Employee updated successfully");
    }

    @DeleteMapping("{id}")
    public Object deleteEmployee(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        employeeService.deactivateEmployee(id, userPrincipal);
        return ApiResponse.success("Employee deleted successfully");
    }
}
