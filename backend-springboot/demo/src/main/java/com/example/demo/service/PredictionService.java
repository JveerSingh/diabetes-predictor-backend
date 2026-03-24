package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import com.example.demo.dto.PatientRequest;
import com.example.demo.dto.PredictResponse;

@Service
public class PredictionService {

    @Value("${model.service.url}")
    private String modelServiceUrl;

    public PredictResponse predict(PatientRequest request) {
        RestTemplate restTemplate = new RestTemplate();
        
        PredictResponse response = restTemplate.postForObject(
            modelServiceUrl, 
            request, 
            PredictResponse.class
        );

        return response;    
    }
}
