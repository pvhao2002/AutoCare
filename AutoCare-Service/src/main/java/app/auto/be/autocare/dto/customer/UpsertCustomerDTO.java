package app.auto.be.autocare.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpsertCustomerDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
}
