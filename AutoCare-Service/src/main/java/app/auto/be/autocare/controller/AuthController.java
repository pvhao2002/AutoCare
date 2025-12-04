package app.auto.be.autocare.controller;


import app.auto.be.autocare.dto.LoginRequest;
import app.auto.be.autocare.dto.RegisterRequest;
import app.auto.be.autocare.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public Object register(@Valid @RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
        } catch (Exception e) {
            log.error("Registration failed for username: {}: {}", request.getUsername(), e.getMessage());
            throw e;
        }
    }

    @PostMapping("/login")
    public Object loginUser(
            @Valid @RequestBody LoginRequest request
            , HttpServletRequest httpRequest
    ) {
        try {
            return ResponseEntity.ok(authService.login(request, httpRequest));
        } catch (Exception e) {
            log.error("Login failed for email {}: {}", request.getUsername(), e.getMessage());
            throw e;
        }
    }
}
