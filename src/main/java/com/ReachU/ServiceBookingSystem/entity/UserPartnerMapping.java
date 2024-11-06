//package com.ReachU.ServiceBookingSystem.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//@Entity
//@Table(name = "user_partner_mapping")
//@Data
//public class UserPartnerMapping {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "partner_id", nullable = false)
//    private PartnerEntity partner;
//
//}
