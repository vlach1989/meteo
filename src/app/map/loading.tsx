import {Container} from '@mantine/core';
import {SkeletonLoader} from '@/components/SkeletonLoader';
import classes from './page.module.css';

/**
 * Loading UI for the Map page.
 * @returns {JSX.Element} The rendered skeleton state.
 */
export default function Loading() {
	return (
		<Container size="xl" className={classes.MapPage}>
			<SkeletonLoader showHeader={false} showChart={true} lines={0} />
		</Container>
	);
}
