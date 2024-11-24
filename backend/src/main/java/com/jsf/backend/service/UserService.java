package com.jsf.backend.service;

import com.jsf.backend.model.Club;
import com.jsf.backend.model.User;
import com.jsf.backend.repository.ClubRepository;
import com.jsf.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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
                return UUID.randomUUID().toString();
            }
        }
        return null; // Authentication failed
    }


    public List<Integer> getFollowedClubsByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        // Return the list of followed club IDs
        return user.map(User::getClubsFollowed).orElse(null);

    }
}
