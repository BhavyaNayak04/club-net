package com.jsf.backend.service;

import com.jsf.backend.model.Club;
import com.jsf.backend.model.User;
import com.jsf.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String authenticate(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            User student = user.get();

            if (password.equals(student.getPassword())) {
                // Generate a session ID (e.g., UUID) for the user
                System.out.println(student.getPassword());
                return UUID.randomUUID().toString();
            }
        }
        return null; // Authentication failed
    }

}
