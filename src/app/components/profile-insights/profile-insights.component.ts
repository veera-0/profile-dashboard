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
  dbData: ButtonClickCount[] = [];

  // New: dropdown + last-7-days state
  uniqueButtonEvents: string[] = [];
  selectedButton: string = '';
  lastSevenDays: ButtonClickCount[] = [];
  lastSevenDaysLoading = false;

  constructor(private analyticsService: AnalyticsServiceService) {}

  async ngOnInit(): Promise<void> {
    await this.loadStats();
  }

  async loadStats(): Promise<void> {
    this.loading = true;

    const button_events = await this.analyticsService.getButtonEventIDs();

    const allData: ButtonClickCount[] = await this.analyticsService.getAllData();

    const uniqueButtonEvents = button_events.filter((value, index, self) => self.indexOf(value) === index);

    console.log("The button events list: ", button_events, "unique: ", uniqueButtonEvents);

    const [todayStats, downloadTotal, previewTotal] = await Promise.all([
      this.analyticsService.getTodayStats(button_events),
      this.analyticsService.getTotal(button_events[0]),
      this.analyticsService.getTotal(button_events[2])
    ]);

    this.dbData = allData;
    this.todayStats = todayStats;
    this.downloadTotal = downloadTotal;
    this.previewTotal = previewTotal;
    this.uniqueButtonEvents = uniqueButtonEvents;
    this.loading = false;

    // Default the dropdown to the first button and load its last-7-days data
    if (uniqueButtonEvents.length > 0) {
      this.selectedButton = uniqueButtonEvents[0];
      await this.loadLastSevenDays(this.selectedButton);
    }
  }

  async onButtonSelectionChange(event: Event): Promise<void> {
    const buttonId = (event.target as HTMLSelectElement).value;
    this.selectedButton = buttonId;
    await this.loadLastSevenDays(buttonId);
  }

  async loadLastSevenDays(buttonId: string): Promise<void> {
    this.lastSevenDaysLoading = true;
    try {
      this.lastSevenDays = await this.analyticsService.getLastNDays(buttonId, 7);
    } catch (err) {
      console.error('Failed to load last 7 days data', err);
      this.lastSevenDays = [];
    } finally {
      this.lastSevenDaysLoading = false;
    }
  }

  getTodayCount(buttonId: string): number {
    return this.todayStats.find(s => s.button_id === buttonId)?.click_count ?? 0;
  }

  getButtonLabel(buttonId: string): string {
    const labels: Record<string, string> = {
      resume_download: 'Resume Download',
      resume_preview: 'Resume Preview'
    };

    return labels[buttonId] ?? buttonId;
  }

}
