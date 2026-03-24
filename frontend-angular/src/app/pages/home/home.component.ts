import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PredictionService } from '../../services/prediction.service';
import { PredictResponse, PatientRequest } from '../../models/prediction.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  predictionForm!: FormGroup;
  loading = false;
  error = '';
  result: any = null;
  showResult = false;

  // Tab management
  activeTab = 'demographics';
  formTabs = [
    { id: 'demographics', label: 'Demographics' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'history', label: 'History' },
    { id: 'vitals', label: 'Vitals' },
    { id: 'labs', label: 'Lab Values' }
  ];

  features = [
    {
      icon: '🧠',
      title: 'AI-Powered Prediction',
      description: 'Random Forest ensemble model trained on clinical datasets with 94%+ AUC for reliable risk stratification.'
    },
    {
      icon: '📊',
      title: 'Multi-Factor Analysis',
      description: '25+ clinical variables across demographics, lifestyle, history, vitals, and laboratory values.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Results',
      description: 'Sub-200ms inference via FastAPI microservice for instant clinical decision support.'
    },
    {
      icon: '🏥',
      title: 'Clinical-Grade Inputs',
      description: 'Structured data collection following clinical standards — from fasting glucose to waist-hip ratio.'
    },
    {
      icon: '📈',
      title: 'Probability Scoring',
      description: 'Continuous probability output (0-100%) with calibrated confidence — not just binary classification.'
    },
    {
      icon: '🛡️',
      title: 'Risk Stratification',
      description: 'Low / Moderate / High / Critical risk bands with evidence-based thresholds.'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private predictionService: PredictionService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.predictionForm = this.fb.group({
      // Demographics
      age: [52],
      gender: ['male'],
      ethnicity: [''],
      education_level: [''],
      income_level: [''],
      employment_status: [''],

      // Lifestyle
      smoking_status: [''],
      alcohol_consumption_per_week: [0],
      physical_activity_minutes_per_week: [150],
      diet_score: [7],
      sleep_hours_per_day: [7],
      screen_time_hours_per_day: [6],

      // Medical History
      family_history_diabetes: [0],
      hypertension_history: [1],
      cardiovascular_history: [0],

      // Vitals
      bmi: [31.2],
      waist_to_hip_ratio: [1.02],
      systolic_bp: [142],
      diastolic_bp: [88],
      heart_rate: [78],

      // Lab Values
      cholesterol_total: [235],
      hdl_cholesterol: [38],
      ldl_cholesterol: [145],
      triglycerides: [198],
      glucose_fasting: [128],
      glucose_postprandial: [180],
      insulin_level: [22],
      hba1c: [6.4]
    });
  }

  get isFormValid(): boolean {
    return this.predictionForm.valid;
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  loadSampleData(): void {
    this.predictionForm.patchValue({
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

  onSubmitForm(): void {
    if (this.predictionForm.invalid) {
      this.error = 'Please fill required fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.result = null;

    this.predictionService.predict(this.predictionForm.getRawValue() as PatientRequest).subscribe({
      next: (response) => {
        this.result = response;
        this.showResult = true;
        this.loading = false;
      },
      error: (err) => {
        console.error('Prediction error:', err);
        this.error = 'Prediction failed. Check backend configuration.';
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.predictionForm.reset();
    this.result = null;
    this.showResult = false;
    this.error = '';
    this.activeTab = 'demographics';
    this.initializeForm();
  }

  getRiskColor(probability: number): string {
    if (probability >= 0.8) return '#dc2626'; // critical red
    if (probability >= 0.6) return '#ef4444'; // high red
    if (probability >= 0.4) return '#f59e0b'; // moderate amber
    return '#10b981'; // low green
  }

  getRiskLabel(probability: number): string {
    if (probability >= 0.8) return 'Critical';
    if (probability >= 0.6) return 'High';
    if (probability >= 0.4) return 'Moderate';
    return 'Low';
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
