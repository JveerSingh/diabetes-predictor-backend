import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PredictionService } from '../../services/prediction.service';
import { PredictResponse, PatientRequest } from '../../models/prediction.model';

@Component({
  selector: 'app-predictor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent {
  private fb = inject(FormBuilder);
  private predictionService = inject(PredictionService);

  loading = false;
  error = '';
  result: any = null;

  // Tab management
  activeTab = 'demographics';
  formTabs = [
    { id: 'demographics', label: 'Demographics' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'history', label: 'History' },
    { id: 'vitals', label: 'Vitals' },
    { id: 'labs', label: 'Lab Values' }
  ];

  form = this.fb.group({
    // Demographics
    age: [45],
    gender: ['Male'],
    ethnicity: [''],
    education_level: [''],
    income_level: [''],
    employment_status: [''],

    // Lifestyle
    smoking_status: [''],
    alcohol_consumption_per_week: [2],
    physical_activity_minutes_per_week: [180],
    diet_score: [7],
    sleep_hours_per_day: [7],
    screen_time_hours_per_day: [6],

    // Medical History
    family_history_diabetes: [0],
    hypertension_history: [0],
    cardiovascular_history: [0],

    // Vitals
    bmi: [28],
    waist_to_hip_ratio: [0.9],
    systolic_bp: [120],
    diastolic_bp: [80],
    heart_rate: [72],

    // Lab Values
    cholesterol_total: [190],
    hdl_cholesterol: [52],
    ldl_cholesterol: [110],
    triglycerides: [140],
    glucose_fasting: [95],
    glucose_postprandial: [130],
    insulin_level: [12],
    hba1c: [5.5]
  });

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  loadSampleData(): void {
    this.form.patchValue({
      age: 52,
      gender: 'male',
      ethnicity: 'Caucasian',
      smoking_status: 'former',
      alcohol_consumption_per_week: 2,
      physical_activity_minutes_per_week: 90,
      diet_score: 4,
      family_history_diabetes: 1,
      hypertension_history: 1,
      cardiovascular_history: 0,
      bmi: 31.2,
      waist_to_hip_ratio: 1.02,
      systolic_bp: 142,
      diastolic_bp: 88,
      heart_rate: 78,
      cholesterol_total: 235,
      hdl_cholesterol: 38,
      ldl_cholesterol: 145,
      triglycerides: 198,
      glucose_fasting: 128,
      hba1c: 6.4,
      insulin_level: 22
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.error = 'Please fill required fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.result = null;

    this.predictionService.predict(this.form.getRawValue() as PatientRequest).subscribe({
      next: (response) => {
        this.result = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Prediction error:', err);
        this.error = 'Prediction failed. Check backend configuration.';
        this.loading = false;
      }
    });
  }
}