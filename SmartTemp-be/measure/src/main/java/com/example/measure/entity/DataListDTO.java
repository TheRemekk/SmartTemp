package com.example.measure.entity;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class DataListDTO {
    private List<Timestamp> measurDates;
    private String sensor;
    private List<Float> temps;
    private List<Float> mois;
    private List<Integer> levels;

    public DataListDTO(List<Timestamp> measurDates, String sensor, List<Float> temps, List<Float> mois, List<Integer> levels)
    {
        this.measurDates = measurDates;
        this.temps = temps;
        this.mois = mois;
        this.levels = levels;
        this.sensor = sensor;
    }
}