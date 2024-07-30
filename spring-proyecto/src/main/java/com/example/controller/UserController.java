package com.example.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.LoginRequest;
import com.example.DTO.LoginResponse;
import com.example.entities.User;
import com.example.service.AuthService;
import com.example.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final AuthService authService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/crear")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody User user) {
        if (userService.doesUsernameExist(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        User createdUser = userService.createUser(user);

        // Generar tokens
        String token = authService.generateToken(createdUser.getUsername());
        String refreshToken = authService.generateRefreshToken(createdUser.getUsername());

        System.out.println("Generated Token: " + token);
        System.out.println("Generated Refresh Token: " + refreshToken);

        // Crear respuesta con tokens
        Map<String, Object> response = Map.of(
            "id", createdUser.getId(),
            "token", token,
            "refreshToken", refreshToken
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> existingUser = userService.getUserById(id);
        if (!existingUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = existingUser.get();
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        
        if (updatedUser.getUserpassword() != null && !updatedUser.getUserpassword().isEmpty()) {
            user.setUserpassword(updatedUser.getUserpassword()); // Actualiza la contraseña si está presente
        }

        User updated = userService.updateUser(user);
        return ResponseEntity.ok(updated);
    }
    
    @GetMapping("/check-username/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable String username) {
        boolean exists = userService.doesUsernameExist(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
    @GetMapping("/{userId}/saldo")
    public ResponseEntity<Integer> getUserSaldo(@PathVariable Long userId) {
        int saldo = userService.getUserSaldo(userId);
        return ResponseEntity.ok(saldo);
    }

    @PutMapping("/{userId}/saldo")
    public ResponseEntity<Void> updateUserSaldo(@PathVariable Long userId, @RequestParam int newSaldo) {
        userService.updateUserSaldo(userId, newSaldo);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    
 // src/main/java/com/example/controller/UserController.java

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LoginResponse response = new LoginResponse();
            response.setMessage("Login failed: " + e.getMessage());
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestBody String token) {
        boolean isValid = authService.validateToken(token);
        return ResponseEntity.ok(isValid);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(@RequestBody String refreshToken) {
        try {
            String newToken = authService.refreshToken(refreshToken);
            LoginResponse response = new LoginResponse();
            response.setToken(newToken);
            response.setMessage("Token refreshed successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LoginResponse response = new LoginResponse();
            response.setMessage("Token refresh failed: " + e.getMessage());
            return ResponseEntity.status(401).body(response);
        }
    }
}



