import {Skeleton} from '@mantine/core';
import classes from './SkeletonLoader.module.css';

/**
 * Props for the SkeletonLoader component.
 */
type SkeletonLoaderProps = {
	/** Number of text lines to render. */
	lines?: number;
	/** Whether to render the header skeleton. */
	showHeader?: boolean;
	/** Whether to render the chart skeleton. */
	showChart?: boolean;
	/** Additional class names for the root element. */
	className?: string;
};

const DEFAULT_LINES = 3;

/**
 * Skeleton placeholder for data-fetching states.
 * @param {SkeletonLoaderProps} props - Component props.
 * @returns {JSX.Element} The rendered skeleton layout.
 */
export function SkeletonLoader({
	lines = DEFAULT_LINES,
	showHeader = true,
	showChart = true,
	className,
}: SkeletonLoaderProps) {
	const rootClassName = className ? `${classes.SkeletonLoader} ${className}` : classes.SkeletonLoader;

	return (
		<div className={rootClassName}>
			{showHeader ? <Skeleton height={28} radius="md" className={classes['SkeletonLoader-header']} /> : null}
			<div className={classes['SkeletonLoader-metrics']}>
				<Skeleton height={48} radius="md" />
				<Skeleton height={48} radius="md" />
				<Skeleton height={48} radius="md" />
			</div>
			<div className={classes['SkeletonLoader-lines']}>
				{Array.from({length: Math.max(0, lines)}, (_, index) => (
					<Skeleton key={`line-${index}`} height={14} radius="sm" className={classes['SkeletonLoader-line']} />
				))}
			</div>
			{showChart ? <Skeleton height={220} radius="md" className={classes['SkeletonLoader-chart']} /> : null}
		</div>
	);
}
