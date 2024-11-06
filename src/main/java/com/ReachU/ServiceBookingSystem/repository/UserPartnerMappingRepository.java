//package com.ReachU.ServiceBookingSystem.repository;
//
//import com.ReachU.ServiceBookingSystem.entity.User;
//import com.ReachU.ServiceBookingSystem.entity.PartnerEntity;
//import com.ReachU.ServiceBookingSystem.entity.UserPartnerMapping;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface UserPartnerMappingRepository extends JpaRepository<UserPartnerMapping, Long> {
//    UserPartnerMapping findByUserAndPartner(User user, PartnerEntity partner);
//
//    List<UserPartnerMapping> findByUser(User user);
//}
