import '../global.css';
import SideBar from '@/components/sidebar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<main className='bg-white dark:bg-black w-full h-screen flex flex-row box-border p-3 gap-3'>
					<SideBar />
					{children}
				</main>
			</body>
		</html>
	);
}
