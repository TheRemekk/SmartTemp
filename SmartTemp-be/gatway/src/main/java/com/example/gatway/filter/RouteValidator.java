package com.example.gatway.filter;

import com.example.gatway.entity.Endpoint;
import org.endpoint.entity.HttpMethod;
import org.endpoint.entity.Role;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;

@Component
public class RouteValidator {
    public Set<Endpoint> openApiEndpoints = new HashSet<>(List.of(
            new Endpoint("/auth/logout", HttpMethod.GET,Role.GUEST),
            new Endpoint("/auth/register",HttpMethod.POST,Role.GUEST),
            new Endpoint("/auth/login",HttpMethod.POST,Role.GUEST),
            new Endpoint("/auth/validate",HttpMethod.GET,Role.GUEST),
            new Endpoint("/auth/authorize",HttpMethod.GET,Role.GUEST),
            new Endpoint("/api/v1/gateway",HttpMethod.POST,Role.GUEST),
            new Endpoint("/api/v1/auto-login",HttpMethod.GET,Role.GUEST),
            new Endpoint("/api/v1/logged-in",HttpMethod.GET,Role.GUEST)
            )
    );
    private Set<Endpoint> adminEndpoints = new HashSet<>();

    public void addEndpoints(List<Endpoint> endpointList){
        for (Endpoint endpoint: endpointList){
            if (endpoint.getRole().name().equals(Role.ADMIN.name())) {
                adminEndpoints.add(endpoint);
            }
            if (endpoint.getRole().name().equals(Role.GUEST.name())) {
                openApiEndpoints.add(endpoint);
            }
        }
    }

    public Predicate<ServerHttpRequest> isAdmin =
            request -> adminEndpoints
                    .stream()
                    .anyMatch(value -> request.getURI()
                            .getPath()
                            .contains(value.getUrl())
                            && request.getMethod().name().equals(value.getHttpMethod().name()));

    public Predicate<ServerHttpRequest> isSecure =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(value -> request.getURI()
                            .getPath()
                            .contains(value.getUrl())
                            && request.getMethod().name().equals(value.getHttpMethod().name()));
}
