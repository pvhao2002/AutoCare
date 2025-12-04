package app.auto.be.autocare.service;

import app.auto.be.autocare.device.ParsedInfo;
import app.auto.be.autocare.device.SimpleAgentParser;
import app.auto.be.autocare.device.TypeDevice;
import app.auto.be.autocare.entity.User;
import app.auto.be.autocare.entity.UserSession;
import app.auto.be.autocare.repo.UserSessionRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final UserSessionRepository sessionRepository;

    public void deactivateOldSession(Long userId, List<TypeDevice> deviceType) {
        var allSessions = sessionRepository.findAllByUserIdAndDeviceTypeIn(userId, deviceType);
        sessionRepository.deleteAll(allSessions);
    }

    public void createSession(String sessionId, User user, TypeDevice deviceType,
                              HttpServletRequest request
    ) {
        String ua = request.getHeader("User-Agent");
        ParsedInfo info = SimpleAgentParser.parse(ua);

        var session = new UserSession();
        session.setSessionId(sessionId);
        session.setUser(user);
        session.setDeviceType(deviceType);
        session.setLoginTime(LocalDateTime.now());
        session.setLastActive(LocalDateTime.now());
        session.setActive(true);

        session.setIpAddress(getClientIp(request));
        session.setUserAgent(ua);

        session.setDeviceModel(info.getDeviceModel());
        session.setOs(info.getOs());
        session.setBrowser(info.getBrowser());

        sessionRepository.save(session);
    }

    private String getClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}

