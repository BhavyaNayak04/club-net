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

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return new ResponseEntity<>(eventService.allEvents(), HttpStatus.OK);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Integer eventId){
        return new ResponseEntity<>(eventService.eventById(eventId), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(
            @RequestParam("clubId") Integer clubId,
            @RequestParam("eventName") String eventName,
            @RequestParam("description") String description,
            @RequestParam("banner") MultipartFile banner,
            @RequestParam("dateAndTime") Date dateAndTime,
            @RequestParam("location") String location,
            @RequestParam("entryFee") Integer entryFee,
            @RequestParam("teamCapacity") Integer teamCapacity,
            @RequestParam("organizerContactNumber") String organizerContactNumber
    ) throws IOException {
        // Create the event using the service
        Event event = eventService.createEvent( clubId, eventName, description, banner, dateAndTime,
                location, entryFee, teamCapacity, organizerContactNumber);

        // Return the created event as a response
        return ResponseEntity.ok(event);
    }

}
