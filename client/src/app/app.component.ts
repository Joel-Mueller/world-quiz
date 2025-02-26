import { Component } from '@angular/core';
import { QuizManagerComponent } from "./quiz-manager/quiz-manager.component";

@Component({
  selector: 'app-root',
  imports: [QuizManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
