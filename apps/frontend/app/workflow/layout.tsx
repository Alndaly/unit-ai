import "../global.css"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<main className='h-screen w-full bg-white dark:bg-black'>{children}</main>
			</body>
		</html>
	);
}
