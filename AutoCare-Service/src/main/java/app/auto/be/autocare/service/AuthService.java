package app.auto.be.autocare.service;

import app.auto.be.autocare.dto.AuthResponse;
import app.auto.be.autocare.dto.LoginRequest;
import app.auto.be.autocare.dto.RegisterRequest;
import app.auto.be.autocare.entity.RoleName;
import app.auto.be.autocare.entity.User;
import app.auto.be.autocare.exception.UnauthorizedException;
import app.auto.be.autocare.exception.ValidationException;
import app.auto.be.autocare.repo.UserRepository;
import app.auto.be.autocare.security.JwtUtil;
import app.auto.be.autocare.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;


    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ValidationException("Email is already registered");
        }

        // Create new user
        var user = User.builder()
                .username(request.getUsername().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(RoleName.STAFF)
                .active(true)
                .build();
        var savedUser = userRepository.save(user);


        var userDetails = UserPrincipal.create(savedUser);
        var token = jwtUtil.generateToken(userDetails);
        var refreshToken = jwtUtil.generateRefreshToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .type("Bearer")
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole().name())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
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
            var token = jwtUtil.generateToken(userPrincipal);
            var refreshToken = jwtUtil.generateRefreshToken(userPrincipal);

            return AuthResponse.builder()
                    .token(token)
                    .refreshToken(refreshToken)
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
