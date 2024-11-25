package com.jsf.backend.service;
import com.jsf.backend.model.Club;
import com.jsf.backend.model.User;
import com.jsf.backend.repository.ClubRepository;
import com.jsf.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    UserRepository userRepository;
    ClubRepository clubRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String authenticate(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            User student = user.get();

            if (password.equals(student.getPassword())) {
                return UUID.randomUUID().toString();
            }
        }
        return null;
    }


    public List<Integer> getFollowedClubsByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(User::getClubsFollowed).orElse(null);
    }

    public void register(User user) {
        userRepository.save(user);
    }


    public void addFollowedClub(String email, Integer clubId) {
        // Fetch the user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return; // User not found
        }

        User user = userOptional.get();

        // Fetch the club by ID
        Club club = clubRepository.findByClubId(clubId);

        // Add the clubId to user's followedClubs if not already added
        if (!user.getClubsFollowed().contains(clubId)) {
            user.getClubsFollowed().add(clubId);
            userRepository.save(user);
        }

        // Optionally update club's followers list
        if (!club.getFollowers().contains(user.getUserId())) {
            club.getFollowers().add(user.getUserId());
            clubRepository.save(club);
        }

    }
}
