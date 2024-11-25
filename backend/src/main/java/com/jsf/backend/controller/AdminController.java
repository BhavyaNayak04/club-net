package com.jsf.backend.controller;

import com.jsf.backend.model.Admin;
import com.jsf.backend.model.Event;
import com.jsf.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {

        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        String sessionId = adminService.authenticate(email, password);

        if (sessionId != null) {
            return ResponseEntity.ok(Map.of("sessionId", sessionId)); // Return session ID as JSON
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Admin admin) {
        adminService.register(admin);
        return ResponseEntity.ok("Admin registered successfully");
    }

    @GetMapping("/get-events/{email}")
    public ResponseEntity<List<Event>> getAllEvents(@PathVariable String email) {
        List<Event> events = adminService.getEvents(email);
        return ResponseEntity.ok(events);
    }
}