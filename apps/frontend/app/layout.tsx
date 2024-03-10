import React from 'react';
import './global.css';
import type { Metadata } from 'next';
import TabBar from '../components/tabbar';

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
		<html lang='zh-CN'>
			<body>
				<div className='h-screen flex flex-col'>
					<TabBar />
					<div className='overflow-auto flex-1'>{children}</div>
				</div>
			</body>
		</html>
	);
}
