import {TemperatureChart} from '@/components/TemperatureChart';
import {Container} from '@mantine/core';

export default function LastWeekPage() {
	return (
		<Container w="100%" h="100%" py="xl">
			<TemperatureChart />
		</Container>
	);
}
