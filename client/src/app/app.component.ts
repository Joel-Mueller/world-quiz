import { Component } from '@angular/core';
import { QuizManagerComponent } from "./quiz-manager/quiz-manager.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
