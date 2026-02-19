import {Container} from '@mantine/core';
import {SkeletonLoader} from '@/components/SkeletonLoader';
import classes from './page.module.css';

/**
 * Loading UI for the Last Week page.
 * @returns {JSX.Element} The rendered skeleton state.
 */
export default function Loading() {
	return (
		<Container size="md" className={classes.LastWeekPage}>
			<SkeletonLoader showHeader={true} showChart={true} lines={1} />
		</Container>
	);
}
