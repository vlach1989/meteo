export interface NowCsvRow {
	temp: number;
	humidity: number;
	windSpeed: number;
}

export interface NowData {
	temp: number;
	humidity: number;
	windSpeed: number;
}

export interface LastWeekCsvRow {
	obsTimeLocal: string;
	temp: number;
}

export interface LastWeekDataPoint {
	date: string;
	temp: number;
}

export type LastWeekData = LastWeekDataPoint[];
