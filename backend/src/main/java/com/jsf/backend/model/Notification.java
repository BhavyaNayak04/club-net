package com.jsf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "notification")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    private ObjectId id;
    private String userId; // User to whom the notification is sent
    private String message;
    private Date sentAt;
    private boolean read; // Indicates whether the user has read the notification
    private boolean deleted; // Indicates whether the user has manually deleted the notification
    private String eventId;
    private String clubId;
}
