package com.example.measure.configuration;

import jakarta.annotation.PostConstruct;
import org.endpoint.ApiGatewayEndpointConfiguration;
import org.endpoint.entity.Endpoint;
import org.endpoint.entity.HttpMethod;
import org.endpoint.entity.Response;
import org.endpoint.entity.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ApiGatewayEndpointConfigurationImpl implements ApiGatewayEndpointConfiguration {

    @Value("${api-gateway.url}")
    private String GATEWAY_URL;

    @PostConstruct
    public void startrOperation(){
        initMap();
        register();
    }

    @Override
    public void initMap() {
        endpointList.add(new Endpoint("/api/v1/sensors/add", HttpMethod.POST, Role.USER)); // JSON (bez active)
        endpointList.add(new Endpoint("/api/v1/sensors/list", HttpMethod.GET, Role.USER)); //
        endpointList.add(new Endpoint("/api/v1/sensors/getByName", HttpMethod.GET, Role.USER)); // name
        endpointList.add(new Endpoint("/api/v1/sensors/updateIp", HttpMethod.PATCH, Role.USER)); // name, ip
        endpointList.add(new Endpoint("/api/v1/sensors/changeActivation", HttpMethod.PATCH, Role.USER)); // name, active
        endpointList.add(new Endpoint("/api/v1/sensors/delete", HttpMethod.DELETE, Role.USER)); // name

        endpointList.add(new Endpoint("/api/v1/sensors/sendMessage", HttpMethod.POST, Role.USER));
        // EXEC Python (R name, R mode, level, cond, temp)
        //  jak conditional (> lub <) to temperatura tez

        endpointList.add(new Endpoint("/api/v1/data/get", HttpMethod.GET, Role.USER)); // paginacja (min_value, max_value) value to daty pomiędzy
        endpointList.add(new Endpoint("/api/v1/data/latest", HttpMethod.GET, Role.USER));
    }

    @Override
    public void register() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Response> response = restTemplate.postForEntity(GATEWAY_URL, endpointList, Response.class);
        if (response.getStatusCode().isError()) throw new RuntimeException();
    }
}
