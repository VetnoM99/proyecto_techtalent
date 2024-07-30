package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.DTO.LoginRequest;
import com.example.DTO.LoginResponse;
import com.example.component.JwtUtil;
import com.example.entities.User;
import com.example.exeption.ResourceNotFoundException;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
    	 if (userRepository.existsByUsername(user.getUsername())) {
             throw new IllegalArgumentException("El usuario ya existe");
         }
         return userRepository.save(user);
     }

    public User updateUser(User user) {
        if (user.getId() == null) {
            throw new IllegalArgumentException("User ID must be provided");
        }

        return userRepository.findById(user.getId())
            .map(existingUser -> {
                if (user.getUsername() != null && !user.getUsername().isEmpty()) {
                    existingUser.setUsername(user.getUsername());
                }
                if (user.getEmail() != null && !user.getEmail().isEmpty()) {
                    existingUser.setEmail(user.getEmail());
                }
                if (user.getUserpassword() != null && !user.getUserpassword().isEmpty()) {
                    existingUser.setUserpassword(user.getUserpassword());
                }
                if (user.getSaldo() >= 0) { // Asegura que el saldo sea un valor válido
                    existingUser.setSaldo(user.getSaldo());
                }
                return userRepository.save(existingUser);
            })
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + user.getId()));
    }

    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean doesUsernameExist(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public int getUserSaldo(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.map(User::getSaldo).orElse(0);
    }

    public void updateUserSaldo(Long userId, int newSaldo) {
        Optional<User> userOptional = userRepository.findById(userId);
        userOptional.ifPresent(user -> {
            user.setSaldo(newSaldo);
            userRepository.save(user);
        });
    }



    public LoginResponse authenticate(LoginRequest loginRequest) throws Exception {
        User user = userRepository.findByUsernameAndUserpassword(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            LoginResponse response = new LoginResponse();
            response.setToken(jwtUtil.generateToken(user.getUsername())); // Usa el método de JwtUtil para generar el token
            response.setUserId(user.getId());
            response.setMessage("Login successful");
            return response;
        } else {
            LoginResponse response = new LoginResponse();
            response.setMessage("Invalid credentials");
            return response;
        }
    }

    public boolean validateToken(String token) {
        String username = jwtUtil.extractUsername(token);
        return (username != null && jwtUtil.validateToken(token, username));
    }
}
