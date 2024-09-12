package com.ReachU.ServiceBookingSystem.entity;

import com.ReachU.ServiceBookingSystem.dto.AdDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "ads")
@Data
public class Ad {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;

    private String description;

    private Double price;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private Subcategory subcategory;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public AdDTO getAdDto(){
        AdDTO adDTO = new AdDTO();

        adDTO.setId(id);
        adDTO.setServiceName(serviceName);
        adDTO.setDescription(description);
        adDTO.setPrice(price);
//        adDTO.setCompanyName(user.getName());
        adDTO.setReturnedImg(img);
        adDTO.setCategoryId(category.getId());
        adDTO.setSubcategoryId(subcategory != null ? subcategory.getId() : null);
//        adDTO.setSubcategoryId(subcategory.getId());

        return adDTO;
    }
}
