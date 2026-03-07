package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PatientRequest {

    private double age;
    private String gender;
    private String ethnicity;

    @JsonProperty("education_level")
    private String educationLevel;

    @JsonProperty("income_level")
    private String incomeLevel;

    @JsonProperty("employment_status")
    private String employmentStatus;

    @JsonProperty("smoking_status")
    private String smokingStatus;

    @JsonProperty("alcohol_consumption_per_week")
    private double alcoholConsumptionPerWeek;

    @JsonProperty("physical_activity_minutes_per_week")
    private double physicalActivityMinutesPerWeek;

    @JsonProperty("diet_score")
    private double dietScore;

    @JsonProperty("sleep_hours_per_day")
    private double sleepHoursPerDay;

    @JsonProperty("screen_time_hours_per_day")
    private double screenTimeHoursPerDay;

    @JsonProperty("family_history_diabetes")
    private double familyHistoryDiabetes;

    @JsonProperty("hypertension_history")
    private double hypertensionHistory;

    @JsonProperty("cardiovascular_history")
    private double cardiovascularHistory;

    private double bmi;

    @JsonProperty("waist_to_hip_ratio")
    private double waistToHipRatio;

    @JsonProperty("systolic_bp")
    private double systolicBp;

    @JsonProperty("diastolic_bp")
    private double diastolicBp;

    @JsonProperty("heart_rate")
    private double heartRate;

    @JsonProperty("cholesterol_total")
    private double cholesterolTotal;

    @JsonProperty("hdl_cholesterol")
    private double hdlCholesterol;

    @JsonProperty("ldl_cholesterol")
    private double ldlCholesterol;

    private double triglycerides;

    @JsonProperty("glucose_fasting")
    private double glucoseFasting;

    @JsonProperty("glucose_postprandial")
    private double glucosePostprandial;

    @JsonProperty("insulin_level")
    private double insulinLevel;

    private double hba1c;

    public double getAge() {
        return age;
    }

    public void setAge(double age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEthnicity() {
        return ethnicity;
    }

    public void setEthnicity(String ethnicity) {
        this.ethnicity = ethnicity;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getIncomeLevel() {
        return incomeLevel;
    }

    public void setIncomeLevel(String incomeLevel) {
        this.incomeLevel = incomeLevel;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public String getSmokingStatus() {
        return smokingStatus;
    }

    public void setSmokingStatus(String smokingStatus) {
        this.smokingStatus = smokingStatus;
    }

    public double getAlcoholConsumptionPerWeek() {
        return alcoholConsumptionPerWeek;
    }

    public void setAlcoholConsumptionPerWeek(double alcoholConsumptionPerWeek) {
        this.alcoholConsumptionPerWeek = alcoholConsumptionPerWeek;
    }

    public double getPhysicalActivityMinutesPerWeek() {
        return physicalActivityMinutesPerWeek;
    }

    public void setPhysicalActivityMinutesPerWeek(double physicalActivityMinutesPerWeek) {
        this.physicalActivityMinutesPerWeek = physicalActivityMinutesPerWeek;
    }

    public double getDietScore() {
        return dietScore;
    }

    public void setDietScore(double dietScore) {
        this.dietScore = dietScore;
    }

    public double getSleepHoursPerDay() {
        return sleepHoursPerDay;
    }

    public void setSleepHoursPerDay(double sleepHoursPerDay) {
        this.sleepHoursPerDay = sleepHoursPerDay;
    }

    public double getScreenTimeHoursPerDay() {
        return screenTimeHoursPerDay;
    }

    public void setScreenTimeHoursPerDay(double screenTimeHoursPerDay) {
        this.screenTimeHoursPerDay = screenTimeHoursPerDay;
    }

    public double getFamilyHistoryDiabetes() {
        return familyHistoryDiabetes;
    }

    public void setFamilyHistoryDiabetes(double familyHistoryDiabetes) {
        this.familyHistoryDiabetes = familyHistoryDiabetes;
    }

    public double getHypertensionHistory() {
        return hypertensionHistory;
    }

    public void setHypertensionHistory(double hypertensionHistory) {
        this.hypertensionHistory = hypertensionHistory;
    }

    public double getCardiovascularHistory() {
        return cardiovascularHistory;
    }

    public void setCardiovascularHistory(double cardiovascularHistory) {
        this.cardiovascularHistory = cardiovascularHistory;
    }

    public double getBmi() {
        return bmi;
    }

    public void setBmi(double bmi) {
        this.bmi = bmi;
    }

    public double getWaistToHipRatio() {
        return waistToHipRatio;
    }

    public void setWaistToHipRatio(double waistToHipRatio) {
        this.waistToHipRatio = waistToHipRatio;
    }

    public double getSystolicBp() {
        return systolicBp;
    }

    public void setSystolicBp(double systolicBp) {
        this.systolicBp = systolicBp;
    }

    public double getDiastolicBp() {
        return diastolicBp;
    }

    public void setDiastolicBp(double diastolicBp) {
        this.diastolicBp = diastolicBp;
    }

    public double getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(double heartRate) {
        this.heartRate = heartRate;
    }

    public double getCholesterolTotal() {
        return cholesterolTotal;
    }

    public void setCholesterolTotal(double cholesterolTotal) {
        this.cholesterolTotal = cholesterolTotal;
    }

    public double getHdlCholesterol() {
        return hdlCholesterol;
    }

    public void setHdlCholesterol(double hdlCholesterol) {
        this.hdlCholesterol = hdlCholesterol;
    }

    public double getLdlCholesterol() {
        return ldlCholesterol;
    }

    public void setLdlCholesterol(double ldlCholesterol) {
        this.ldlCholesterol = ldlCholesterol;
    }

    public double getTriglycerides() {
        return triglycerides;
    }

    public void setTriglycerides(double triglycerides) {
        this.triglycerides = triglycerides;
    }

    public double getGlucoseFasting() {
        return glucoseFasting;
    }

    public void setGlucoseFasting(double glucoseFasting) {
        this.glucoseFasting = glucoseFasting;
    }

    public double getGlucosePostprandial() {
        return glucosePostprandial;
    }

    public void setGlucosePostprandial(double glucosePostprandial) {
        this.glucosePostprandial = glucosePostprandial;
    }

    public double getInsulinLevel() {
        return insulinLevel;
    }

    public void setInsulinLevel(double insulinLevel) {
        this.insulinLevel = insulinLevel;
    }

    public double getHba1c() {
        return hba1c;
    }

    public void setHba1c(double hba1c) {
        this.hba1c = hba1c;
    }
}