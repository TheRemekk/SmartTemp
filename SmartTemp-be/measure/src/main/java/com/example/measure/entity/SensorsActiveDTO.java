package com.example.measure.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class SensorsActiveDTO {
    @Length(max = 5, message = "Nazwa czujnika powinna mieć max. 5 znaków")
    private String name;
    private boolean active;
}

