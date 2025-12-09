package app.auto.be.autocare.controller;

import app.auto.be.autocare.dto.ApiResponse;
import app.auto.be.autocare.dto.customer.UpsertCustomerDTO;
import app.auto.be.autocare.entity.Customer;
import app.auto.be.autocare.repo.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("customers")
public class CustomerController {
    private final CustomerRepository customerRepository;

    @GetMapping
    public Object getAllCustomers() {
        return ApiResponse.success(customerRepository.findAllByActiveTrue());
    }

    @PostMapping
    public Object upsert(@RequestBody UpsertCustomerDTO customer) {
        Optional.ofNullable(customer.getId())
                .flatMap(customerRepository::findById)
                .ifPresentOrElse(existingCustomer -> {
                    existingCustomer.setPhone(customer.getPhone());
                    existingCustomer.setAddress(customer.getAddress());
                    customerRepository.save(existingCustomer);
                }, () -> {
                    var newCustomer = new Customer();
                    newCustomer.setPhone(customer.getPhone());
                    newCustomer.setAddress(customer.getAddress());
                    newCustomer.setActive(true);
                    customerRepository.save(newCustomer);
                });
        return ApiResponse.success("Customer successfully uploaded");
    }

    @DeleteMapping("{id}")
    public Object deleteCustomer(@PathVariable Long id) {
        customerRepository.findById(id).ifPresent(existingCustomer -> {
            existingCustomer.setActive(false);
            customerRepository.save(existingCustomer);
        });
        return ApiResponse.success("Customer successfully deleted");
    }

}
