package com.example.measure.fasada;

import com.example.measure.services.DataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/data")
public class DataController {
    private final DataService dataService;

    @RequestMapping(path = "/get", method = RequestMethod.GET)
    public ResponseEntity<?> getMeasurementBySensorAndDateRange(@RequestParam String sensorName,
                                                                @RequestParam String minValue,
                                                                @RequestParam String maxValue) {
        Timestamp minTimestamp = Timestamp.valueOf(minValue);
        Timestamp maxTimestamp = Timestamp.valueOf(maxValue);
        return dataService.getMeasurementBySensorAndDateRange(sensorName, minTimestamp, maxTimestamp);
    }

    @RequestMapping(path = "/latest", method = RequestMethod.GET)
    public ResponseEntity<?> getLatestMeasurement(@RequestParam String sensorName) {
        return dataService.getLatestMeasurement(sensorName);
    }
}

