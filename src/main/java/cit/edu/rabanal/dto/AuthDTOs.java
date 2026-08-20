package cit.edu.rabanal.dto;

import lombok.Data;

public class AuthDTOs {

    @Data
    public static class RegisterRequest {
        private String username;
        private String password;
        private String fullName;
    }

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private String message;

        public AuthResponse(String token, String message) {
            this.token = token;
            this.message = message;
        }
    }

    @Data
    public static class UserDTO {
        private Long id;
        private String username;
        private String fullName;

        public UserDTO(Long id, String username, String fullName) {
            this.id = id;
            this.username = username;
            this.fullName = fullName;
        }
    }
}