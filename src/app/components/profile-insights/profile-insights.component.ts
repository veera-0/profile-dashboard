import { Component } from '@angular/core';
import { AnalyticsServiceService, ButtonClickCount } from '../../service/analytics-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-insights',
  imports: [CommonModule],
  templateUrl: './profile-insights.component.html',
  styleUrl: './profile-insights.component.css'
})
export class ProfileInsightsComponent {

  todayStats: ButtonClickCount[] = [];
  downloadTotal = 0;
  previewTotal = 0;
  loading = true;


  constructor(private analyticsService: AnalyticsServiceService) {}

  async ngOnInit(): Promise<void> {
    await this.loadStats();
  }

  async loadStats(): Promise<void> {
    this.loading = true;

    const [todayStats, downloadTotal, previewTotal] = await Promise.all([
      this.analyticsService.getTodayStats(['download', 'preview']),
      this.analyticsService.getTotal('download'),
      this.analyticsService.getTotal('preview')
    ]);

    this.todayStats = todayStats;
    this.downloadTotal = downloadTotal;
    this.previewTotal = previewTotal;
    this.loading = false;
  }

  getTodayCount(buttonId: string): number {
    return this.todayStats.find(s => s.button_id === buttonId)?.click_count ?? 0;
  }
}
