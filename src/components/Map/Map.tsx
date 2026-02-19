'use client';

import DeckGL, {TileLayer} from 'deck.gl';
import {BitmapLayer} from '@deck.gl/layers';
import {parseAsFloat, useQueryState} from 'nuqs';
import {ViewStateChangeParameters} from '@deck.gl/core';

const INITIAL_VIEW_STATE = {
	longitude: 14.4378,
	latitude: 50.0755,
	zoom: 11,
	pitch: 0,
	bearing: 0,
};

/**
 * Map component using deck.gl with URL state synchronization.
 * @returns {JSX.Element} The rendered map.
 */
export function Map() {
	const [longitude, setLongitude] = useQueryState('lon', parseAsFloat.withDefault(INITIAL_VIEW_STATE.longitude));
	const [latitude, setLatitude] = useQueryState('lat', parseAsFloat.withDefault(INITIAL_VIEW_STATE.latitude));
	const [zoom, setZoom] = useQueryState('zoom', parseAsFloat.withDefault(INITIAL_VIEW_STATE.zoom));

	const viewState = {
		longitude,
		latitude,
		zoom,
		pitch: 0,
		bearing: 0,
	};

	const layers = [
		new TileLayer<ImageBitmap>({
			data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
			minZoom: 0,
			maxZoom: 19, // Possibly higher zoom levels can be supported in the future
			tileSize: 256,
			maxRequests: 20,
			pickable: true,
			/**
			 * Function to render sublayers for each tile.
			 * Creates a `BitmapLayer` for rendering the tile image.
			 *
			 * @param {Object} props - Properties for the sublayer.
			 * @param {Object} props.tile - The tile object containing bounding box information.
			 * @param {Array} props.tile.boundingBox - The bounding box of the tile as [[west, south], [east, north]].
			 * @param {string} props.data - The URL of the tile image.
			 * @returns {BitmapLayer[]} An array containing the `BitmapLayer` for the tile.
			 */
			renderSubLayers: (props) => {
				const [[west, south], [east, north]] = props.tile.boundingBox;
				const {data, ...otherProps} = props;

				return [
					new BitmapLayer(otherProps, {
						image: data,
						bounds: [west, south, east, north],
					}),
				];
			},
		}),
	];

	return (
		<DeckGL
			initialViewState={viewState}
			controller={true}
			layers={layers}
			onViewStateChange={({viewState}: ViewStateChangeParameters) => {
				setLongitude(viewState.longitude);
				setLatitude(viewState.latitude);
				setZoom(viewState.zoom);
			}}
		/>
	);
}
