'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button, Group} from '@mantine/core';
import {IconCalendarWeek, IconCloudStorm} from '@tabler/icons-react';
import './style.css';

/**
 * Navigation bar component for switching between different weather pages
 * @returns {JSX.Element} Navigation bar with links to Now and Last Week pages
 */
export default function NavBar() {
	const pathname = usePathname();

	const isActive = (path: string) => {
		if (path === '/') {
			return pathname === '/';
		}
		return pathname.startsWith(path);
	};

	return (
		<header className="nav-header">
			<Group justify="space-between" h="100%" px="md">
				<div className="nav-title">Meteo</div>
				<Group gap="xs">
					<Button
						component={Link}
						href="/"
						variant={isActive('/now') || pathname === '/' ? 'filled' : 'subtle'}
						leftSection={<IconCloudStorm size={18} />}
					>
						Now
					</Button>
					<Button
						component={Link}
						href="/last-week"
						variant={isActive('/last-week') ? 'filled' : 'subtle'}
						leftSection={<IconCalendarWeek size={18} />}
					>
						Last Week
					</Button>
				</Group>
			</Group>
		</header>
	);
}
