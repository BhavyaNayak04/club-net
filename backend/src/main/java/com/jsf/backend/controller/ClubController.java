package com.jsf.backend.controller;

import com.jsf.backend.model.Club;
import com.jsf.backend.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/clubs")
public class ClubController {
    ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping
    public ResponseEntity<List<Club>> getAllClubs(){
        return new ResponseEntity<>(clubService.allClubs(), HttpStatus.OK);
    }

    @GetMapping("/{clubId}")
    public ResponseEntity<Club> getClubById(@PathVariable Integer clubId){
        return new ResponseEntity<>(clubService.clubById(clubId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/followed-clubs")
    public ResponseEntity<List<Club>> getAllClubsByUserId(@PathVariable Integer userId){
        return new ResponseEntity<>(clubService.allClubsByUserId(userId), HttpStatus.OK);
    }
}
