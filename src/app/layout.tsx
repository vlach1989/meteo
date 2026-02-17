import React from 'react';
import type {Metadata} from 'next';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {Navigation} from '../components/Navigation';
import classes from './layout.module.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';

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
			<body className={classes['RootLayout-body']}>
				<MantineProvider defaultColorScheme="light">
					<Navigation />
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
