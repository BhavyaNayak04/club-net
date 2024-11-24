package com.jsf.backend.controller;

import com.jsf.backend.model.Club;
import com.jsf.backend.service.ClubService;
import com.jsf.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api/auth")


public class UserController {

    private final UserService userService;
    private final ClubService clubService;

    @Autowired
    public UserController(UserService userService, ClubService clubService) {
        this.userService = userService;
        this.clubService = clubService;
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

    @GetMapping("/followed-clubs")
    public ResponseEntity<?> getFollowedClubs(@RequestParam String email) {
        try {
            // Get followed club IDs from the user based on their email
            List<Integer> followedClubIds = userService.getFollowedClubsByEmail(email);

            if (followedClubIds.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No followed clubs found.");
            }
            System.out.println(followedClubIds);
            // Get club details using the club IDs
            List<Club> clubs = clubService.getClubsByIds(followedClubIds);
            System.out.println(clubs);
            if (clubs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No club details found for the provided IDs.");
            }
            return ResponseEntity.ok(clubs); // Return list of followed clubs with details
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }



}
