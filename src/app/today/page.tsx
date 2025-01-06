import Chart from "@/components/Chart";
import {ChartPoint} from "@/types/ChartPoint";

interface Observation {
    obsTimeUtc: string;
    metric: {
        tempAvg: number
    };
}

export default async function Home() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_TODAY;
    const data = await fetch(apiUrl);
    const d = await data.json();
    const chartData = d.observations.map((obs: Observation):ChartPoint => {
       return {
           x: obs.obsTimeUtc,
           y: obs.metric.tempAvg
       }
    });
    console.log(chartData);

  return (
    <Chart data={[{id: "today", color: "hsl(100, 70%, 50%)", data: chartData}]}/>
  );
}
