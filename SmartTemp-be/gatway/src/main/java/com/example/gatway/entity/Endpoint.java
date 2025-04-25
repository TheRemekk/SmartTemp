package com.example.gatway.entity;

import org.endpoint.entity.HttpMethod;
import org.endpoint.entity.Role;

import java.util.Objects;

public class Endpoint {
    private  String url;
    private  HttpMethod httpMethod;
    private  Role role;

    public Endpoint(String url, HttpMethod httpMethod, Role role) {
        this.url = url;
        this.httpMethod = httpMethod;
        this.role = role;
    }

    public String getUrl() {
        return url;
    }

    public HttpMethod getHttpMethod() {
        return httpMethod;
    }

    public Role getRole() {
        return role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Endpoint endpoint = (Endpoint) o;
        return Objects.equals(url, endpoint.url) &&
                httpMethod == endpoint.httpMethod &&
                Objects.equals(role, endpoint.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(url, httpMethod, role);
    }
}
