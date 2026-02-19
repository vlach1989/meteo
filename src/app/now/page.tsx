import {Container, Stack, Text, Title} from '@mantine/core';
import {NowMetrics} from '@/components/NowMetrics';
import classes from './page.module.css';

/**
 * Now page showing current weather metrics.
 * @returns {Promise<JSX.Element>} The rendered page content.
 */
export default async function NowPage() {
	return (
		<Container size="md" className={classes.NowPage}>
			<Stack gap="lg">
				<header className={classes['NowPage-header']}>
					<Title order={1}>Current data</Title>
					<Text c="dimmed">Live values from the latest observation.</Text>
				</header>
				<NowMetrics />
			</Stack>
		</Container>
	);
}
