import TemperatureCardClient from './TemperatureCard.client';
import {Alert} from '@mantine/core';
import fetchData from '@/helpers/fetchData';

const TemperatureCard = async () => {
	try {
		const data = await fetchData('now');
		const temperature = data.temperature;

		if (temperature === undefined) {
			return (
				<Alert color="yellow" title="Warning">
					Could not parse temperature data.
				</Alert>
			);
		}

		return <TemperatureCardClient temperature={temperature} />;
	} catch (error) {
		console.error(error);
		return (
			<Alert color="red" title="Error">
				Error fetching or parsing data.
			</Alert>
		);
	}
};

export default TemperatureCard;
