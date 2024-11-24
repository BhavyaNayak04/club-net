package com.jsf.backend.repository;

import com.jsf.backend.model.Club;
import com.jsf.backend.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    Optional<User> findByEmail(String email);


}
