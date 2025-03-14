interface TemperatureCardProps {
	temperature: number;
}

const TemperatureCard = ({ temperature }: TemperatureCardProps) => {
	return (
		<div className="meteo-TemperatureCard">
			<h2>Temperature</h2>
			<p>{temperature}°C</p>
		</div>
	);
};

export default TemperatureCard;
