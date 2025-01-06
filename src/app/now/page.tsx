export default async function Home() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_NOW;
    const data = await fetch(apiUrl);
    const d = await data.json();

  return (
    <div>
        {d.observations?.[0].metric.temp}
    </div>
  );
}
