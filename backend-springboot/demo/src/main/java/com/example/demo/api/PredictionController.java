package com.example.demo.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

import com.example.demo.dto.PatientRequest;
import com.example.demo.dto.PredictResponse;
import com.example.demo.service.PredictionService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class PredictionController {

    private PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @GetMapping("/health")
    public String health() {
        return "ok";
    }
    
    @PostMapping("/predict")
    public PredictResponse predict(@RequestBody PatientRequest request) {
        return predictionService.predict(request);
    }
}
