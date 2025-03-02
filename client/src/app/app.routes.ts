import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizManagerComponent } from './quiz-manager/quiz-manager.component';

export const routes: Routes = [
  { path: '', redirectTo: 'play', pathMatch: 'full' },
  { path: 'play', component: QuizManagerComponent },
  { path: 'dashboard', component: DashboardComponent },
];
