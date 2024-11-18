package com.jsf.backend.service;

import com.jsf.backend.model.Event;
import com.jsf.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
public class EventService {
    EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> allEvents()
    {
        return eventRepository.findAll();
    }

    public Event eventById(Integer userId){
        return eventRepository.findByEventId(userId);
    }



    public Event createEvent( Integer clubId, String eventName, String description,
                             MultipartFile banner, Date dateAndTime, String location, Integer entryFee,
                             Integer teamCapacity, String organizerContactNumber) throws IOException {

        // Convert the banner image to base64 string
        String bannerBase64 = encodeFileToBase64(banner);

        // Create the Event object with provided data
        Event event = new Event(clubId, eventName, description, bannerBase64, dateAndTime,
                location, entryFee, teamCapacity, organizerContactNumber);

        // Save the event to MongoDB
        return eventRepository.save(event);
    }

    // Helper method to convert MultipartFile to base64 string
    private String encodeFileToBase64(MultipartFile file) throws IOException {
        byte[] fileBytes = file.getBytes();
        return Base64.getEncoder().encodeToString(fileBytes);
    }


}
