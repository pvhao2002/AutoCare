package app.auto.be.autocare.device;

import lombok.Data;

@Data
public class ParsedInfo {
    private String os = "Unknown";
    private String browser = "Unknown";
    private String deviceModel = "Unknown";
}

