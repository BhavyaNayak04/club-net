package com.jsf.backend.controller;

import com.jsf.backend.model.Event;
import com.jsf.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/events")
public class EventController {

    EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addEvent(@RequestBody Event event) {
        System.out.println("Event received: " + event);
        eventService.addEvent(event);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return new ResponseEntity<>(eventService.allEvents(), HttpStatus.OK);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Integer eventId){
        return new ResponseEntity<>(eventService.eventById(eventId), HttpStatus.OK);
    }

    @GetMapping("/club/{clubId}")
    public ResponseEntity<List<Event>> getEventsByClubId(@PathVariable Integer clubId){
        return new ResponseEntity<>(eventService.eventsByClubId(clubId), HttpStatus.OK);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer eventId) {
        eventService.deleteEvent(eventId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
