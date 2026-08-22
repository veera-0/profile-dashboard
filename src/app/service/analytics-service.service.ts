import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { MainService } from './main.service';

export interface ButtonClickCount {
  button_id: string;
  click_date: string;
  click_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsServiceService {

  mainService = inject(MainService);

  constructor() {
  }

  async getTodayStats(buttonIds: string[]): Promise<ButtonClickCount[]> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await this.mainService.getSupabase()
      .from('button_click_counts')
      .select('button_id, click_date, click_count')
      .eq('click_date', today)
      .in('button_id', buttonIds);

    if (error) {
      console.error('Failed to fetch today stats:', error);
      return [];
    }
    return data ?? [];
  }

  async getLastNDays(buttonId: string, days: number): Promise<ButtonClickCount[]> {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const { data, error } = await this.mainService.getSupabase()
      .from('button_click_counts')
      .select('button_id, click_date, click_count')
      .eq('button_id', buttonId)
      .gte('click_date', fromDate.toISOString().split('T')[0])
      .order('click_date', { ascending: true });

    if (error) {
      console.error('Failed to fetch history:', error);
      return [];
    }
    return data ?? [];
  }

  async getButtonEventIDs() {
    const {data,error} = await this.mainService.getSupabase()
      .from('button_click_counts')
      .select('button_id');
    if (error) {
      console.error('Failed to fetch button event IDs:', error);
      return [];
    }
    return (data ?? []).map((row: any) => row.button_id);
  }

  async getTotal(buttonId: string): Promise<number> {
    const { data, error } = await this.mainService.getSupabase()
      .from('button_click_counts')
      .select('click_count')
      .eq('button_id', buttonId);

    if (error) {
      console.error('Failed to fetch total:', error);
      return 0;
    }
    return (data ?? []).reduce((sum, row) => sum + row.click_count, 0);
  }

  async getAllData(){
    const {data, error} = await this.mainService.getSupabase()
      .from('button_click_counts')
      .select('*');
    if (error) {
      console.error('Failed to fetch all data:', error);
      return [];
    }
    return data ?? [];
  }
}
