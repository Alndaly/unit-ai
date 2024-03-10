import TabBar from '@/components/tabbar';
import "../global.css"

const RootLayout = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	return (
		<html lang='zh-CN'>
			<body>
				<div className='h-screen w-full flex flex-col bg-white dark:bg-black'>
					<TabBar />
					<div className='overflow-auto flex-1'>{children}</div>
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
