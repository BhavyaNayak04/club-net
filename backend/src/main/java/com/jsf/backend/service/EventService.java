package com.jsf.backend.service;

import com.jsf.backend.model.Event;
import com.jsf.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
