package com.example.measure.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "Sensors")
public class Sensors {
    @Id
    private String name;
    private String ip;
    private boolean active;
}
