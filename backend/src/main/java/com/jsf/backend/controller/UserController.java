package com.jsf.backend.controller;

import com.jsf.backend.model.Club;
import com.jsf.backend.model.User;
import com.jsf.backend.repository.UserRepository;
import com.jsf.backend.service.ClubService;
import com.jsf.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/auth")
public class UserController {

    private final UserService userService;
    private final ClubService clubService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, ClubService clubService, UserRepository userRepository) {
        this.userService = userService;
        this.clubService = clubService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        System.out.println("Received credentials: " + credentials);

        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        String sessionId = userService.authenticate(email, password);

        if (sessionId != null) {
            return ResponseEntity.ok(Map.of("sessionId", sessionId)); // Return session ID as JSON
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/followed-clubs/{email}")
    public ResponseEntity<?> getFollowedClubs(@PathVariable String email) {
        try {
            List<Integer> followedClubIds = userService.getFollowedClubsByEmail(email);
            System.out.println(followedClubIds);

            if (followedClubIds.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No followed clubs found.");
            }

            List<Club> clubs = clubService.getClubsByIds(followedClubIds);

            if (clubs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No club details found for the provided IDs.");
            }
            return ResponseEntity.ok(clubs); // Return list of followed clubs with details
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> user) {
        System.out.println("Received user details: " + user);
        if (userRepository.findByEmail(user.get("email")).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        String name = user.get("name");
        String email = user.get("email");
        String password = user.get("password");

        if (name == null || email == null || password == null) {
            return ResponseEntity.badRequest().body("All fields are required");
        }

        try {
            User newUser = new User();
            newUser.setUserId((int) (userRepository.count() + 1));
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(password);
            userService.register(newUser);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

//    @PutMapping("/follow")
}