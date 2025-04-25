package org.endpoint.entity;

public class Endpoint {
    private final String url;
    private final HttpMethod httpMethod;
    private final Role role;

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
}
