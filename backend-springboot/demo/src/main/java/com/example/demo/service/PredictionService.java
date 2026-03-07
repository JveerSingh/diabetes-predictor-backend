package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.PatientRequest;
import com.example.demo.dto.PredictResponse;

@Service
public class PredictionService {

    public PredictResponse predict(PatientRequest request) {
        RestTemplate restTemplate = new RestTemplate();
        
        PredictResponse response = restTemplate.postForObject(
            "http://localhost:8000/predict", 
            request, 
            PredictResponse.class
        );

        return response;    
    }
}
