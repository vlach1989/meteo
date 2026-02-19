import React from 'react';
import type {Metadata} from 'next';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {Navigation} from '../components/Navigation';
import classes from './layout.module.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import {NuqsAdapter} from 'nuqs/adapters/next/app';

export const metadata: Metadata = {
	title: 'Meteo',
	description: 'Weather information dashboard',
};

/**
 * Root layout for the Meteo app.
 * @param {{children: React.ReactNode}} props - Layout props.
 * @returns {JSX.Element} The rendered app shell.
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
					<NuqsAdapter>
						<Navigation />
						{children}
					</NuqsAdapter>
				</MantineProvider>
			</body>
		</html>
	);
}
