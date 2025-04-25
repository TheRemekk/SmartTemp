package com.example.auth.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Table(name = "users")
@Entity
public class User {
    @Id
    private String uuid;
    private String login;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(name = "create_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp create_date;

    public User(){
        generateUuid();
        this.create_date = new Timestamp(System.currentTimeMillis());
    }
    public User(String uuid, String login, String password, Role role) {
        this.uuid = uuid;
        this.login = login;
        this.password = password;
        this.role = role;
        this.create_date = new Timestamp(System.currentTimeMillis());
        generateUuid();
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    private void generateUuid(){
        if (uuid == null || uuid.isEmpty()){
            setUuid(UUID.randomUUID().toString());
        }
    }
}
