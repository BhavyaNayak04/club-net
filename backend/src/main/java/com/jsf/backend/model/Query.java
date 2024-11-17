package com.jsf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "queries")
public class Query {
    @Id
    private ObjectId id;
    private String eventId;
    private String userId;
    private String queryText;
    private Date raisedAt;
    private boolean resolved;
    private Date resolvedAt;
}
