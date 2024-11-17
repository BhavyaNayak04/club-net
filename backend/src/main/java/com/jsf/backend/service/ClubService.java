package com.jsf.backend.service;

import com.jsf.backend.model.Club;
import com.jsf.backend.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {
    ClubRepository clubRepository;

    @Autowired
    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    public List<Club> allClubs()
    {
        return clubRepository.findAll();
    }

    public Club clubById(Integer clubId)
    {
        return clubRepository.findByClubId(clubId);
    }
    
    public List<Club> allClubsByUserId(Integer userId)
    {
        return clubRepository.findByFollowersContaining(userId);
    }

}
