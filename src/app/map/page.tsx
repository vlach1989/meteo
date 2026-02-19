import {Suspense} from 'react';
import {Map} from '@/components/Map';
import classes from './page.module.css';

/**
 * Page displaying the map.
 * @returns {JSX.Element} The rendered page content.
 */
export default function MapPage() {
	return (
		<div className={classes.MapPage}>
			<Suspense fallback={<div>Loading map...</div>}>
				<Map />
			</Suspense>
		</div>
	);
}
