package com.example.measure.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "Data")
public class Data {
    @Id
    @Column(name = "measur_date")
    private Timestamp measurDate;
    @ManyToOne
    @JoinColumn(name = "sensor_name", referencedColumnName = "name")
    private Sensors sensor;
    private Float temp;
    private Float mois;
    private Integer level;
}