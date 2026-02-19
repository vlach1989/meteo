import {Container} from '@mantine/core';
import {SkeletonLoader} from '@/components/SkeletonLoader';
import classes from './page.module.css';

/**
 * Loading UI for the Now page.
 * @returns {JSX.Element} The rendered skeleton state.
 */
export default function Loading() {
	return (
		<Container size="md" className={classes.NowPage}>
			<SkeletonLoader />
		</Container>
	);
}
