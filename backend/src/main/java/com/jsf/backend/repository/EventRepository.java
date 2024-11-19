package com.jsf.backend.repository;

import com.jsf.backend.model.Club;
import com.jsf.backend.model.Event;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, ObjectId> {
    public Event findByEventId(Integer eventId);

    List<Event> findEventsByClubId(Integer clubId);
}
