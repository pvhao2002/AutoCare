package app.auto.be.autocare.controller;

import app.auto.be.autocare.repo.UserRepository;
import app.auto.be.autocare.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("info")
    public Object getUserInfo(@AuthenticationPrincipal UserPrincipal user) {
        return userRepository.findById(user.getId());
    }
}
