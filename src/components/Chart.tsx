"use client";

import { ResponsiveLine } from '@nivo/line';
import { ChartPoint } from "@/types/ChartPoint";
import React from "react";

interface ChartProps {
	data: {
		id: string;
		color: string;
		data: ChartPoint[];
	}[];
}


const Chart = ({data}: ChartProps)=> {
	return (
		<div style={{width: '100%', height: 400}}>
			<ResponsiveLine
				data={data}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{
					type: 'time',
					format: '%Y-%m-%dT%H:%M:%S%Z',
				}}
				yScale={{
					type: 'linear',
					min: 'auto',
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					legend: 'time scale',
					legendOffset: -12,
					tickValues: 'every 6 hours'
				}}
				axisLeft={{
					legend: 'linear scale',
					legendOffset: 12
				}}
				curve="monotoneX"
				useMesh={true}
				enablePoints={false}
			/>
		</div>
	);
}

export default Chart;
