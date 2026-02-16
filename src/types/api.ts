export interface NowData {
	temp: number;
	humidity: number;
	windSpeed: number;
}

export interface LastWeekDataPoint {
	date: string;
	temp: number;
}

export type LastWeekData = LastWeekDataPoint[];
