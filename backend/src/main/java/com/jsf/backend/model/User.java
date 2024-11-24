package com.jsf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId id;
    private Integer userId;
    private String name;
    private String email;
    private String password;
    private String role;
    private Integer sem;
    private String usn;
    private String branch;
    private List<Integer> clubsFollowed;
    private List<String> notifications;
}
