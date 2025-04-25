package com.example.measure.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@Builder
public class SensorsDTO {
    @Length(max = 5, message = "Nazwa czujnika powinna mieć max. 5 znaków")
    private String name;
    @Length(max = 15, message = "Podany adres ip jest niepoprawny")
    private String ip;
}
