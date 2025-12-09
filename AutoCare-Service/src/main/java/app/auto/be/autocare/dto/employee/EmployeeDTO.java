package app.auto.be.autocare.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private String fullName;
    private Long branchId;
    private String position;
    private Double salary;
}
