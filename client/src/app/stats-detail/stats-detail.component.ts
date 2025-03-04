import { Component, Input } from '@angular/core';
import { Stat } from '../entities/Stat';
import { StatFormatter } from '../entities/Stat';

@Component({
  selector: 'app-stats-detail',
  imports: [],
  templateUrl: './stats-detail.component.html',
  styleUrl: './stats-detail.component.scss',
})
export class StatsDetailComponent {
  @Input({ required: true })
  stats!: Stat[];

  streak: number = 0;
  guessedToday: number = 0;
  guessedThisWeek: number = 0;
  guessedThisMonth: number = 0;
  statsToday: number = 0;
  statsThisWeek: number = 0;
  statsThisMonth: number = 0;
  statsList: string[] = [];

  ngOnInit() {
    this.processStats();
  }

  private processStats(): void {
    if (!this.stats || this.stats.length === 0) {
      this.resetCounts();
      return;
    }
    this.calculateStreak();
    this.calculateCounts();
    this.writeStatsList();
  }

  private resetCounts(): void {
    this.streak = 0;
    this.guessedToday = 0;
    this.guessedThisWeek = 0;
    this.guessedThisMonth = 0;
    this.statsToday = 0;
    this.statsThisWeek = 0;
    this.statsThisMonth = 0;
  }

  private calculateStreak(): void {
    const sortedStats = [...this.stats].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    let streak = 1;
    let lastDate = new Date(sortedStats[0].date);
    for (let i = 1; i < sortedStats.length; i++) {
      let currentDate = new Date(sortedStats[i].date);
      let diffInDays = Math.floor(
        (lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
      );
      if (diffInDays === 1) {
        streak++;
      } else if (diffInDays > 1) {
        break;
      }
      lastDate = currentDate;
    }
    this.streak = streak;
  }

  private calculateCounts(): void {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    this.statsToday = this.stats.filter((stat) =>
      this.isSameDay(new Date(stat.date), today)
    ).length;
    this.statsThisWeek = this.stats.filter(
      (stat) => new Date(stat.date) >= startOfWeek
    ).length;
    this.statsThisMonth = this.stats.filter(
      (stat) => new Date(stat.date) >= startOfMonth
    ).length;

    this.guessedToday = this.getTotalGuessed(today, true);
    this.guessedThisWeek = this.getTotalGuessed(startOfWeek);
    this.guessedThisMonth = this.getTotalGuessed(startOfMonth);
  }

  private getTotalGuessed(fromDate: Date, isExactDay: boolean = false): number {
    return this.stats
      .filter((stat) =>
        isExactDay
          ? this.isSameDay(new Date(stat.date), fromDate)
          : new Date(stat.date) >= fromDate
      )
      .reduce(
        (sum, stat) =>
          sum + Object.values(stat.attempts).reduce((a, b) => a + b, 0),
        0
      );
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  private writeStatsList(): void {
    this.statsList = [...this.stats]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((stat) => StatFormatter.toString(stat));
  }
}
