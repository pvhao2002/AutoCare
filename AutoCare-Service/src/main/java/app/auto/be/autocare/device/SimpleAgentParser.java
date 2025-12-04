package app.auto.be.autocare.device;

public class SimpleAgentParser {

    public static ParsedInfo parse(String ua) {
        ParsedInfo info = new ParsedInfo();

        if (ua == null) return info;
        String lower = ua.toLowerCase();

        // Detect OS
        if (lower.contains("windows")) info.setOs("Windows");
        else if (lower.contains("mac os")) info.setOs("macOS");
        else if (lower.contains("android")) info.setOs("Android");
        else if (lower.contains("iphone")) info.setOs("iOS");
        else if (lower.contains("ipad")) info.setOs("iPadOS");
        else info.setOs("Unknown");

        // Detect Browser
        if (lower.contains("chrome")) info.setBrowser("Chrome");
        else if (lower.contains("safari") && !lower.contains("chrome")) info.setBrowser("Safari");
        else if (lower.contains("firefox")) info.setBrowser("Firefox");
        else if (lower.contains("edge")) info.setBrowser("Edge");
        else info.setBrowser("Unknown");

        // Device Model (chỉ đơn giản)
        if (lower.contains("iphone")) info.setDeviceModel("iPhone");
        else if (lower.contains("ipad")) info.setDeviceModel("iPad");
        else if (lower.contains("samsung")) info.setDeviceModel("Samsung");
        else if (lower.contains("pixel")) info.setDeviceModel("Google Pixel");
        else info.setDeviceModel("Unknown");

        return info;
    }
}

