package com.example.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
	  private String token;
	    private String refreshToken; // Añadido para manejar el token de refresco
	    private long userId;
	    private String message;

    public LoginResponse(String message) {
        this.message = message;
    }
}