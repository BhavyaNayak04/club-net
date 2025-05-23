package com.jsf.backend.repository;

import com.jsf.backend.model.Club;
import com.jsf.backend.model.Event;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends MongoRepository<Club, ObjectId> {

    public Club findByClubId(Integer clubId);
    public List<Club> findByFollowersContaining(Integer userId);

    @Query(value = "{}", sort = "{ 'followers': -1 }")
    public List<Club>  findTopClubs(PageRequest pageRequest);

   public List<Club> findClubNameByClubIdIn(List<Integer> clubIds);

    List<Event> getAllEventsByClubId(Integer clubId);

//    Club updateClubByClubId(Integer clubId, Club club);

}
