//package com.ReachU.ServiceBookingSystem.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.util.List;
//
//@Entity
//@Table(name = "service")
//@Data
//public class ServiceEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String serviceName;
//
//    @ManyToMany(mappedBy = "selectServices")
//    private List<PartnerEntity> partners;
//}