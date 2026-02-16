'use client';

import {SegmentedControl} from '@mantine/core';
import {usePathname, useRouter} from 'next/navigation';
import classes from './Navigation.module.css';

/**
 * Route options for top-level navigation.
 */
const NAV_ITEMS: Array<{label: string; value: string}> = [
	{label: 'Now', value: '/now'},
	{label: 'Last week', value: '/last-week'},
];

/**
 * Top navigation switcher for app sections.
 */
export function Navigation() {
	const pathname = usePathname();
	const router = useRouter();
	const currentValue = pathname?.startsWith('/last-week') ? '/last-week' : '/now';

	return (
		<div className={classes.Navigation}>
			<SegmentedControl
				data={NAV_ITEMS}
				value={currentValue}
				onChange={(value) => router.push(value)}
				classNames={{
					root: classes['Navigation-segmented'],
					control: classes['Navigation-control'],
					label: classes['Navigation-label'],
					indicator: classes['Navigation-indicator'],
				}}
				withItemsBorders={false}
			/>
		</div>
	);
}
