package controle_financeiro.api.backend.messages;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String message;
    private Map<String, String> errors;
}
