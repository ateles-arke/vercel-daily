import Footer from '@/components/layout/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen flex flex-col">
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
