import React from 'react';
import type {Metadata} from 'next';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import '../global.css';
import {Navigation} from '../components/Navigation';

export const metadata: Metadata = {
	title: 'Meteo',
	description: 'Weather information dashboard',
};

/**
 * Root layout for the Meteo app.
 */
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
					<Navigation />
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
