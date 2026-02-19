import {Container, Stack, Text, Title} from '@mantine/core';
import {LastWeekChart} from '@/components/LastWeekChart';
import fetchData from '@/helpers/fetchData';
import {LastWeekData} from '@/types/api';
import classes from './page.module.css';

/**
 * Page displaying a chart of last week's weather data.
 * @returns {Promise<JSX.Element>} The rendered page content.
 */
export default async function LastWeekPage() {
	const data = await fetchData<LastWeekData>('last-week');

	return (
		<Container size="md" className={classes.LastWeekPage}>
			<Stack gap="lg">
				<header className={classes['LastWeekChart-header']}>
					<Title order={1}>Last Week</Title>
					<Text c="dimmed">Historical data from the past 7 days.</Text>
				</header>
				<LastWeekChart data={data} />
			</Stack>
		</Container>
	);
}
