import {parseAsFloat, parseAsStringEnum} from 'nuqs';

// Metric state for metric switchers
export const METRIC_OPTIONS = ['temp', 'humidity', 'windSpeed'];
export const metricParser = parseAsStringEnum(METRIC_OPTIONS).withDefault('temp');

// Map state
export const INITIAL_VIEW_STATE = {
	longitude: 14.4378,
	latitude: 50.0755,
	zoom: 11,
};

export const lonParser = parseAsFloat.withDefault(INITIAL_VIEW_STATE.longitude);
export const latParser = parseAsFloat.withDefault(INITIAL_VIEW_STATE.latitude);
export const zoomParser = parseAsFloat.withDefault(INITIAL_VIEW_STATE.zoom);
