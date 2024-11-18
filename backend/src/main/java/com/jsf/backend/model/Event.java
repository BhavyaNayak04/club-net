package com.jsf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    private ObjectId id;
    private Integer eventId;
    private Integer clubId;
    private String eventName;
    private String description;
    private String banner;
    private Date dateAndTime;
    private String location;
    private Integer entryFee;
    private Integer teamCapacity;
    private String organizerContactNumber;

    public Event( Integer clubId, String eventName, String description,
                 String banner, Date dateAndTime, String location, Integer entryFee,
                 Integer teamCapacity, String organizerContactNumber) {
        this.clubId = clubId;
        this.eventName = eventName;
        this.description = description;
        this.banner = banner;
        this.dateAndTime = dateAndTime;
        this.location = location;
        this.entryFee = entryFee;
        this.teamCapacity = teamCapacity;
        this.organizerContactNumber = organizerContactNumber;
    }


}
