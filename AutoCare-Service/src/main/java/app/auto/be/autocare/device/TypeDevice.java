package app.auto.be.autocare.device;

import java.util.List;

public enum TypeDevice {
    WEB_DESKTOP,
    WEB_MOBILE,
    MOBILE_APP_ANDROID,
    MOBILE_APP_IOS,
    TABLET,
    DESKTOP_APP,
    UNKNOWN;

    public boolean isMobile() {
        return switch (this) {
            case MOBILE_APP_ANDROID, MOBILE_APP_IOS, TABLET -> true;
            default -> false;
        };
    }


    public boolean isWeb() {
        return !isMobile();
    }

    public List<TypeDevice> sameGroup() {
        return this.isWeb()
                ? webDevices()
                : mobileDevices();
    }

    // ⭐ NEW: Trả về danh sách enum nhóm WEB
    public static List<TypeDevice> webDevices() {
        return List.of(WEB_DESKTOP, WEB_MOBILE, DESKTOP_APP, UNKNOWN);
    }

    // ⭐ NEW: Trả về danh sách enum nhóm MOBILE
    public static List<TypeDevice> mobileDevices() {
        return List.of(MOBILE_APP_ANDROID, MOBILE_APP_IOS, TABLET);
    }
}

