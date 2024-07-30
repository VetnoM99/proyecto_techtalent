package com.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.DTO.LoginResponse;
import com.example.component.JwtUtil;
import com.example.entities.User;
import com.example.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse authenticateUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getUserpassword().equals(password)) {
                String token = jwtUtil.generateToken(username);
                String refreshToken = jwtUtil.generateRefreshToken(username);
                return new LoginResponse(token, refreshToken, user.getId(), "Login successful");
            }
        }
        throw new RuntimeException("Invalid credentials");
    }
    public boolean validateToken(String token) {
        try {
            // Verifica si el token es válido
            return jwtUtil.validateToken(token, jwtUtil.extractUsername(token));
        } catch (Exception e) {
            return false;
        }
    }

    public String refreshToken(String refreshToken) {
        // En este ejemplo, el refreshToken es tratado como un JWT. Normalmente se utilizaría un refresh token separado.
        if (jwtUtil.isTokenExpired(refreshToken)) {
            throw new RuntimeException("Refresh token has expired");
        }

        String username = jwtUtil.extractUsername(refreshToken);
        return jwtUtil.generateToken(username); // Genera un nuevo token basado en el nombre de usuario
    }
    
    public String generateToken(String username) {
        return jwtUtil.generateToken(username);
    }
    
    public String generateRefreshToken(String username) {
        return jwtUtil.generateRefreshToken(username);
    }
}
