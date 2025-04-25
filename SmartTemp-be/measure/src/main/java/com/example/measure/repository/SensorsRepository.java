package com.example.measure.repository;

import com.example.measure.entity.Sensors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SensorsRepository extends JpaRepository<Sensors, String> {
    Optional<Sensors> findSensorByName(String name);
}
