package com.example.measure.repository;

import com.example.measure.entity.Data;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface DataRepository extends JpaRepository<Data, Timestamp> {
    Optional<List<Data>> findBySensorNameAndMeasurDateBetween(String sensorName, Timestamp minValue, Timestamp maxValue);
    Optional<Data> findTopBySensorNameOrderByMeasurDateDesc(String sensorName);
}



