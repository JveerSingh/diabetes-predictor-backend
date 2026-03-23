import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PredictionService } from '../../services/prediction.service';
import { PredictResponse } from '../../models/prediction.model';

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
  result: PredictResponse | null = null;

  form = this.fb.group({
    age: [45, [Validators.required]],
    gender: ['Male', [Validators.required]],
    ethnicity: ['White', [Validators.required]],
    education_level: ['Bachelor', [Validators.required]],
    income_level: ['Medium', [Validators.required]],
    employment_status: ['Employed', [Validators.required]],
    smoking_status: ['Never', [Validators.required]],
    alcohol_consumption_per_week: [2, [Validators.required]],
    physical_activity_minutes_per_week: [180, [Validators.required]],
    diet_score: [7, [Validators.required]],
    sleep_hours_per_day: [7, [Validators.required]],
    screen_time_hours_per_day: [6, [Validators.required]],
    family_history_diabetes: [0, [Validators.required]],
    hypertension_history: [0, [Validators.required]],
    cardiovascular_history: [0, [Validators.required]],
    bmi: [28, [Validators.required]],
    waist_to_hip_ratio: [0.9, [Validators.required]],
    systolic_bp: [120, [Validators.required]],
    diastolic_bp: [80, [Validators.required]],
    heart_rate: [72, [Validators.required]],
    cholesterol_total: [190, [Validators.required]],
    hdl_cholesterol: [52, [Validators.required]],
    ldl_cholesterol: [110, [Validators.required]],
    triglycerides: [140, [Validators.required]],
    glucose_fasting: [95, [Validators.required]],
    glucose_postprandial: [130, [Validators.required]],
    insulin_level: [12, [Validators.required]],
    hba1c: [5.5, [Validators.required]]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.error = 'Please fill out all required fields.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.result = null;

    this.predictionService.predict(this.form.getRawValue() as any).subscribe({
      next: (response) => {
        this.result = response;
        this.loading = false;
      },
      error: () => {
        this.error = 'Prediction failed. Make sure backend services are running.';
        this.loading = false;
      }
    });
  }
}