'use client';

import {Card, Group, Stack, Text} from '@mantine/core';
import {useQueryState} from 'nuqs';
import {mapStateParser, parseMapState} from '@/lib/state';
import classes from './CurrentPosition.module.css';

/**
 * Displays the current map position and zoom level from the URL.
 * @returns {JSX.Element} The rendered component.
 */
export function CurrentPosition() {
	const [rawMapState] = useQueryState('map', mapStateParser);
	const mapState = parseMapState(rawMapState);

	return (
		<Card className={classes.CurrentPosition} withBorder radius="md" padding="lg">
			<Stack gap="sm">
				<Text className={classes['CurrentPosition-label']}>Map Position</Text>
				<Stack gap="xs">
					<Group justify="space-between" gap="xs">
						<Text size="sm">Latitude:</Text>
						<Text size="sm" fw={600}>
							{mapState.latitude.toFixed(4)}
						</Text>
					</Group>
					<Group justify="space-between" gap="xs">
						<Text size="sm">Longitude:</Text>
						<Text size="sm" fw={600}>
							{mapState.longitude.toFixed(4)}
						</Text>
					</Group>
					<Group justify="space-between" gap="xs">
						<Text size="sm">Zoom:</Text>
						<Text size="sm" fw={600}>
							{mapState.zoom.toFixed(2)}
						</Text>
					</Group>
				</Stack>
			</Stack>
		</Card>
	);
}
