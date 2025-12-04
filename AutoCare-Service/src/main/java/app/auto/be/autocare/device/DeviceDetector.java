package app.auto.be.autocare.device;

import jakarta.servlet.http.HttpServletRequest;
import lombok.experimental.UtilityClass;

@UtilityClass
public class DeviceDetector {

    public static TypeDevice detectDevice(HttpServletRequest request) {
        String ua = request.getHeader("User-Agent");
        if (ua == null) return TypeDevice.UNKNOWN;

        ua = ua.toLowerCase();

        // 📱 MOBILE APP DETECTION
        if (ua.contains("okhttp") || ua.contains("dalvik")) {
            return TypeDevice.MOBILE_APP_ANDROID;
        }

        if (ua.contains("cfnetwork") || ua.contains("alamofire")) {
            return TypeDevice.MOBILE_APP_IOS;
        }

        // 📱 MOBILE BROWSER
        if (ua.contains("iphone") || ua.contains("android") && ua.contains("mobile")) {
            return TypeDevice.WEB_MOBILE;
        }

        // 📱 TABLET
        if (ua.contains("ipad") || (ua.contains("android") && !ua.contains("mobile"))) {
            return TypeDevice.TABLET;
        }

        // 💻 DESKTOP APP (Electron, Capacitor, Tauri, custom)
        if (ua.contains("electron") ||
                ua.contains("tauri") ||
                ua.contains("capacitor")) {
            return TypeDevice.DESKTOP_APP;
        }

        // 🖥️ DESKTOP BROWSER
        if (ua.contains("windows") ||
                ua.contains("macintosh") ||
                ua.contains("x11") ||
                ua.contains("linux")) {
            return TypeDevice.WEB_DESKTOP;
        }

        return TypeDevice.UNKNOWN;
    }
}

