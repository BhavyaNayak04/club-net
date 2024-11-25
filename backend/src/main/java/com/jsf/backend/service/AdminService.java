package com.jsf.backend.service;

import com.jsf.backend.model.Admin;
import com.jsf.backend.model.Event;
import com.jsf.backend.repository.AdminRepository;
import com.jsf.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final EventRepository eventRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository, EventRepository eventRepository) {
        this.adminRepository = adminRepository;
        this.eventRepository = eventRepository;
    }

    public String authenticate(String email, String password) {
        Optional<Admin> admin = adminRepository.findByEmail(email);

        if (admin.isPresent()) {
            Admin adminUser = admin.get();

            if (password.equals(adminUser.getPassword())) {
                return UUID.randomUUID().toString();
            }
        }
        return null;
    }

    public void register(Admin admin) {
        adminRepository.save(admin);
    }

    public List<Event> getEvents(String email) {
        Admin admin = adminRepository.findByEmail(email).orElse(null);
        if (admin == null) {
            return null;
        }
        int clubId = admin.getClubId();
        return eventRepository.getAllEventsByClubId(clubId);
    }
}