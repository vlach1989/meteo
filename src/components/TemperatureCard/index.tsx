import {Card, Text} from '@mantine/core';
import './style.css';

interface TemperatureCardProps {
	/** The temperature to display. */
	temperature: number;
}

/**
 * A component that displays the temperature in a card format.
 * @param {TemperatureCardProps} props - The props for the component.
 */
const TemperatureCard = ({temperature}: TemperatureCardProps) => {
	const degrees = Math.floor(temperature);
	const decimals = temperature.toString().split('.')[1] || '0';

	return (
		<Card className="meteo-TemperatureCard" shadow="sm" padding="lg" radius="md" withBorder>
			<Text component="span" className="meteo-TemperatureCard-degrees">
				{degrees}
			</Text>
			<Text component="span" className="meteo-TemperatureCard-decimals">
				.{decimals}
			</Text>
			<Text component="span" className="meteo-TemperatureCard-units">
				°C
			</Text>
		</Card>
	);
};

export default TemperatureCard;
