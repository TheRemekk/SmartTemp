package com.example.measure.services;

import com.example.measure.entity.Code;
import com.example.measure.entity.Data;
import com.example.measure.entity.DataListDTO;
import com.example.measure.entity.MeasureResponse;
import com.example.measure.repository.DataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DataService {

    private final DataRepository dataRepository;

    public ResponseEntity<?> getMeasurementBySensorAndDateRange(String sensorName, Timestamp minValue,
                                                                Timestamp maxValue) {
        List<Data> measurements = dataRepository.findBySensorNameAndMeasurDateBetween(sensorName, minValue, maxValue).orElse(null);
        if (measurements != null && !measurements.isEmpty()) {
            String sensor = measurements.get(0).getSensor().getName();
            List<Timestamp> measurDates = measurements.stream()
                    .map(Data::getMeasurDate)
                    .collect(Collectors.toList());

            List<Float> temps = measurements.stream()
                    .map(Data::getTemp)
                    .collect(Collectors.toList());

            List<Float> mois = measurements.stream()
                    .map(Data::getMois)
                    .collect(Collectors.toList());

            List<Integer> levels = measurements.stream()
                    .map(Data::getLevel)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(new DataListDTO(measurDates, sensor, temps, mois, levels));
        }
        return ResponseEntity.status(400).body(new MeasureResponse(Code.S2));
    }

    public ResponseEntity<?> getLatestMeasurement(String sensorName) {
        return ResponseEntity.ok(dataRepository.findTopBySensorNameOrderByMeasurDateDesc(sensorName));
    }
}
