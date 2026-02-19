'use client';

import {Group} from '@mantine/core';
import {IconChartLine, IconSun} from '@tabler/icons-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import classes from './Navigation.module.css';

/**
 * Route options for top-level navigation.
 */
type NavItem = {
	label: string;
	href: string;
	Icon: typeof IconSun;
};

const NAV_ITEMS: NavItem[] = [
	{label: 'Now', href: '/now', Icon: IconSun},
	{label: 'Last week', href: '/last-week', Icon: IconChartLine},
];

/**
 * Top navigation bar with page links and icons.
 * @returns {JSX.Element} The rendered navigation control.
 */
export function Navigation() {
	const pathname = usePathname();
	const activeHref = pathname?.startsWith('/last-week') ? '/last-week' : '/now';

	return (
		<nav className={classes.Navigation} aria-label="Primary">
			<div className={classes['Navigation-inner']}>
				<Group gap="sm" className={classes['Navigation-items']}>
					{NAV_ITEMS.map(({label, href, Icon}) => {
						const isActive = activeHref === href;
						const linkClassName = isActive
							? `${classes['Navigation-link']} ${classes['Navigation-link--active']}`
							: classes['Navigation-link'];

						return (
							<Link key={href} href={href} className={linkClassName} aria-current={isActive ? 'page' : undefined}>
								<span className={classes['Navigation-icon']}>
									<Icon size={18} stroke={1.8} aria-hidden="true" />
								</span>
								<span className={classes['Navigation-label']}>{label}</span>
							</Link>
						);
					})}
				</Group>
			</div>
		</nav>
	);
}
