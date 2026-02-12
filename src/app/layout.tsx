import React from 'react';
import type {Metadata} from 'next';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import NavBar from '@/components/NavBar';
import '../global.css';

export const metadata: Metadata = {
	title: 'Meteo',
	description: 'Weather information dashboard',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>Meteo</title>
				<ColorSchemeScript defaultColorScheme="light" />
			</head>
			<body>
				<MantineProvider defaultColorScheme="light">
					<NavBar />
					<div className="wrapper">{children}</div>
				</MantineProvider>
			</body>
		</html>
	);
}
