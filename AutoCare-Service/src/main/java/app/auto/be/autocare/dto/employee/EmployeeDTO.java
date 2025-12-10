package app.auto.be.autocare.dto.employee;

import app.auto.be.autocare.entity.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private String username;
    private String fullName;
    private String email;
    private String password;
    private String gender;
    private RoleName role;
    private Integer age;
    private String phone;
    private String address;
    private Long branchId;
    private BigDecimal salary;
}
