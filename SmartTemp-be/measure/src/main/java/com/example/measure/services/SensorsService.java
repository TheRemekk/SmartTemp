package com.example.measure.services;

import com.example.measure.entity.*;
import com.example.measure.repository.SensorsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SensorsService {

    private final SensorsRepository sensorRepository;

    public ResponseEntity<MeasureResponse> addSensor(SensorsDTO sensorDTO) {
        Sensors sensor = sensorRepository.findSensorByName(sensorDTO.getName()).orElse(null);
        if (sensor != null) {
            return ResponseEntity.badRequest()
                    .body(new MeasureResponse(Code.S1));
        } else {
            sensor = Sensors.builder()
                    .name(sensorDTO.getName())
                    .ip(sensorDTO.getIp())
                    .active(true)
                    .build();

            sensorRepository.saveAndFlush(sensor);
            return ResponseEntity.ok(new MeasureResponse(Code.SUCCESS));
        }
    }

    public ResponseEntity<?> getListOfAllSensors() {
        return ResponseEntity.ok(sensorRepository.findAll());
    }

    public  ResponseEntity<?> getSensorByName(String name) {
        Sensors sensor = sensorRepository.findSensorByName(name).orElse(null);
        if (sensor != null) {
            return ResponseEntity.ok(sensor);
        }
        else {
            return ResponseEntity.status(400).body(new MeasureResponse(Code.S2));
        }
    }

    public ResponseEntity<MeasureResponse> updateSensorIp(SensorsDTO sensorDTO) {
        Optional<Sensors> sensorExists = sensorRepository.findSensorByName(sensorDTO.getName());
        if (sensorExists.isPresent()) {
            sensorExists.ifPresent(sensor -> {
                sensor.setIp(sensorDTO.getIp());
                sensorRepository.save(sensor);
            });
            return ResponseEntity.ok(new MeasureResponse(Code.SUCCESS));
        }
        return ResponseEntity.status(400).body(new MeasureResponse(Code.S2));
    }

    public ResponseEntity<MeasureResponse> changeSensorActivation(SensorsActiveDTO sensorActiveDTO) {
        Optional<Sensors> sensorExists = sensorRepository.findSensorByName(sensorActiveDTO.getName());
        if (sensorExists.isPresent()) {
            sensorExists.ifPresent(sensor -> {
                sensor.setActive(sensorActiveDTO.isActive());
                sensorRepository.save(sensor);
            });
            return ResponseEntity.ok(new MeasureResponse(Code.SUCCESS));
        }
        return ResponseEntity.status(400).body(new MeasureResponse(Code.S2));
    }

    public ResponseEntity<MeasureResponse> deleteSensor(String name)  {
        Optional<Sensors> sensorExists = sensorRepository.findSensorByName(name);
        if (sensorExists.isPresent()) {
            sensorRepository.deleteById(name);
            return ResponseEntity.ok(new MeasureResponse(Code.SUCCESS));
        }
        return ResponseEntity.status(400).body(new MeasureResponse(Code.S2));
    }

    public ResponseEntity<?> sendMessageSet(String name, String mode, String level)
    {
        Map<String, String> response = new HashMap<>();
        int exitCode = 0;
        try
        {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "python3", "./send_message.py", mode, name, level);

            exitCode = pythonExecute(response, processBuilder);
        } catch (Exception e)
        {
            response.put("status", "error");
            response.put("exception", e.getMessage());
        }
        if (exitCode == 0)
            return ResponseEntity.ok(response);
        else
            return ResponseEntity.status(400).body(response);
    }

    public ResponseEntity<?> sendMessageCon(String name, String mode, String cond, String temp)
    {
        Map<String, String> response = new HashMap<>();
        int exitCode = 0;
        try
        {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "python3", "./send_message.py", mode, name, cond, temp);

            exitCode = pythonExecute(response, processBuilder);
        } catch (Exception e)
        {
            response.put("status", "error");
            response.put("exception", e.getMessage());
        }

        if (exitCode == 0)
            return ResponseEntity.ok(response);
        else
            return ResponseEntity.status(400).body(response);
    }

    private int pythonExecute(Map<String, String> response, ProcessBuilder processBuilder)
    {
        int exitCode = 0;
        try
        {
            Process process = processBuilder.start();

            StringBuilder stdOutput = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())))
            {
                String line;
                while ((line = reader.readLine()) != null)
                {
                    stdOutput.append(line).append("\n");
                }
            }

            StringBuilder errOutput = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getErrorStream())))
            {
                String line;
                while ((line = reader.readLine()) != null)
                {
                    errOutput.append(line).append("\n");
                }
            }

            exitCode = process.waitFor();

            response.put("status", exitCode == 0 ? "success" : "error");
            response.put("stdout", stdOutput.toString());
            response.put("stderr", errOutput.toString());
        } catch (Exception e)
        {
            response.put("status", "error");
            response.put("exception", e.getMessage());
        }
        return(exitCode);
    }
}

