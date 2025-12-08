package app.auto.be.autocare.util;

import lombok.experimental.UtilityClass;

import java.util.UUID;

@UtilityClass
public class CommonUtils {
    public String generateBranchCode(String branchName) {
        if (branchName == null || branchName.trim().isEmpty()) {
            return "CN-XXX";
        }

        var words = branchName
                .trim()
                .replaceAll("[^a-zA-Z0-9\\s]", "")
                .replaceAll("\\s+", " ").split(" ");

        if (words.length > 1) {
            var sb = new StringBuilder();
            for (String word : words) {
                if (!word.isEmpty()) {
                    sb.append(word.substring(0, 1).toUpperCase());
                }
                if (sb.length() == 3) break;
            }
            return formatBranchCode(sb.toString());
        } else {
            var word = words[0].toUpperCase();
            var result = word.length() >= 3
                    ? word.substring(0, 3)
                    : word;
            return formatBranchCode(result);
        }
    }

    public String defaultIfNull(String value, String defaultValue) {
        return value == null ? defaultValue : value;
    }

    public String defaultIfBlank(String value, String defaultValue) {
        return (value == null || value.trim().isEmpty()) ? defaultValue : value;
    }

    private String formatBranchCode(String result) {
        return "CN-" + (
                result.length() < 3
                        ? String.format("%-3s", result).replace(' ', 'X')
                        : result
        ) + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
    }
}
