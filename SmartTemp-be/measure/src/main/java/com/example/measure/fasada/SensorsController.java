package com.example.measure.fasada;

import com.example.measure.entity.*;
import com.example.measure.services.SensorsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/sensors")
public class SensorsController {

    private final SensorsService sensorsService;

    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<MeasureResponse> addSensor(@RequestBody SensorsDTO sensorDTO) {
        return sensorsService.addSensor(sensorDTO);
    }

    @RequestMapping(path = "/list", method = RequestMethod.GET)
    public ResponseEntity<?> getAllSensors() {
        return sensorsService.getListOfAllSensors();
    }

    @RequestMapping(path = "/getByName", method = RequestMethod.GET)
    public ResponseEntity<?> getSensorByName(@RequestParam String name) {
        return sensorsService.getSensorByName(name);
    }

    @RequestMapping(path = "/updateIp", method = RequestMethod.PATCH)
    public ResponseEntity<MeasureResponse> updateSensorIp(@RequestBody SensorsDTO sensorDTO) {
        return sensorsService.updateSensorIp(sensorDTO);
    }

    @RequestMapping(path = "/changeActivation", method = RequestMethod.PATCH)
    public ResponseEntity<MeasureResponse> changeSensorActivation(@RequestBody SensorsActiveDTO sensorActiveDTO) {
        return sensorsService.changeSensorActivation(sensorActiveDTO);
    }

    @RequestMapping(path = "/delete", method = RequestMethod.DELETE)
    public ResponseEntity<MeasureResponse> deleteSensor(@RequestParam String name) {
        return sensorsService.deleteSensor(name);
    }

    @RequestMapping(path = "/sendMessage", method = RequestMethod.POST)
    public ResponseEntity<?> sendMessage(@RequestParam String name,
                                         @RequestParam String mode,
                                         @RequestParam(required = false) String level,
                                         @RequestParam(required = false) String cond,
                                         @RequestParam(required = false) String temp) {
        if(Objects.equals(mode, "T") && !(level == null))
        {
            return sensorsService.sendMessageSet(name, mode, level);
        }
        else if(Objects.equals(mode, "C") && !(cond==null) && !(temp==null))
        {
            return sensorsService.sendMessageCon(name, mode, cond, temp);
        }
        else
        {
            return ResponseEntity.status(400).body(new MeasureResponse(Code.S3));
        }
    }
}
