package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.entities.User;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
