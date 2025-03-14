import './style.css';

interface TemperatureCardProps {
	temperature: number;
}

const TemperatureCard = ({ temperature }: TemperatureCardProps) => {
	const degrees = Math.floor(temperature);
	const decimals = temperature.toString().split('.')[1] || '0';

	return (
		<div className="meteo-TemperatureCard">
			<div className="meteo-TemperatureCard-degrees">{degrees}</div>
			<div className="meteo-TemperatureCard-decimals">.{decimals}</div>
			<div className="meteo-TemperatureCard-units">°C</div>
		</div>
	);
};

export default TemperatureCard;
