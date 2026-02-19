import {parseAsString, parseAsStringEnum} from 'nuqs';

// Metric state for metric switchers
export const METRIC_OPTIONS = ['temp', 'humidity', 'windSpeed'];
export const metricParser = parseAsStringEnum(METRIC_OPTIONS).withDefault('temp');

// Map state
export const INITIAL_VIEW_STATE = {
	longitude: 14.4378,
	latitude: 50.0755,
	zoom: 11,
	pitch: 0,
	bearing: 0,
};

export type MapState = typeof INITIAL_VIEW_STATE;

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const normalizeMapState = (value?: Partial<MapState> | null): MapState => ({
	longitude: isFiniteNumber(value?.longitude) ? value.longitude : INITIAL_VIEW_STATE.longitude,
	latitude: isFiniteNumber(value?.latitude) ? value.latitude : INITIAL_VIEW_STATE.latitude,
	zoom: isFiniteNumber(value?.zoom) ? value.zoom : INITIAL_VIEW_STATE.zoom,
	pitch: isFiniteNumber(value?.pitch) ? value.pitch : INITIAL_VIEW_STATE.pitch,
	bearing: isFiniteNumber(value?.bearing) ? value.bearing : INITIAL_VIEW_STATE.bearing,
});

export const mapStateParser = parseAsString.withDefault(JSON.stringify(INITIAL_VIEW_STATE));

export const parseMapState = (raw: string | null | undefined): MapState => {
	if (!raw) {
		return INITIAL_VIEW_STATE;
	}

	try {
		const parsed = JSON.parse(raw) as Partial<MapState>;
		return normalizeMapState(parsed);
	} catch {
		return INITIAL_VIEW_STATE;
	}
};

export const serializeMapState = (state: MapState): string => JSON.stringify(normalizeMapState(state));
