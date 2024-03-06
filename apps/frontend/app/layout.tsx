import React from 'react';
import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Unit AI',
	description: 'A simple app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
