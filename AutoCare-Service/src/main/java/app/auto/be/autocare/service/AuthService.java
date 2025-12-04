package app.auto.be.autocare.service;

import app.auto.be.autocare.device.DeviceDetector;
import app.auto.be.autocare.device.TypeDevice;
import app.auto.be.autocare.dto.AuthResponse;
import app.auto.be.autocare.dto.LoginRequest;
import app.auto.be.autocare.dto.RegisterRequest;
import app.auto.be.autocare.entity.RoleName;
import app.auto.be.autocare.entity.User;
import app.auto.be.autocare.exception.UnauthorizedException;
import app.auto.be.autocare.exception.ValidationException;
import app.auto.be.autocare.repo.BranchRepository;
import app.auto.be.autocare.repo.UserRepository;
import app.auto.be.autocare.security.JwtUtil;
import app.auto.be.autocare.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final BranchRepository branchRepository;
    private final SessionService sessionService;


    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ValidationException("Username is already registered");
        }

        var branch = branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new ValidationException("Branch not found"));

        // Create new user
        var user = User.builder()
                .username(request.getUsername().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(RoleName.STAFF)
                .branch(branch)
                .active(true)
                .build();
        var savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole().name())
                .build();
    }

    public AuthResponse login(LoginRequest request, HttpServletRequest httpReq) {
        try {
            var authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername().toLowerCase(),
                            request.getPassword()
                    )
            );

            var userPrincipal = (UserPrincipal) authentication.getPrincipal();
            if (!userPrincipal.getIsActive()) {
                throw new UnauthorizedException("Account is deactivated");
            }
            var user = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new UnauthorizedException("User not found"));
            TypeDevice device = DeviceDetector.detectDevice(httpReq);

            sessionService.deactivateOldSession(user.getId(), device.sameGroup());
            String sessionId = UUID.randomUUID().toString();
            var token = jwtUtil.generateToken(userPrincipal, sessionId);
            sessionService.createSession(sessionId, user, device, httpReq);

            return AuthResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .id(userPrincipal.getId())
                    .username(userPrincipal.getUsername())
                    .fullName(userPrincipal.getFullName())
                    .role(userPrincipal.getRole().name())
                    .build();

        } catch (BadCredentialsException e) {
            throw new UnauthorizedException("Invalid email or password");
        }
    }
}
