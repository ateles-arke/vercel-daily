import BackButton from '@/components/shared/BackButton';

const NotFound = () => {
	return (
		<main className="px-8 py-12 md:px-16 md:py-16 lg:px-24">
			<div className="mx-auto max-w-360">
				<BackButton className="mb-10" label="Back" />

				<div className="flex flex-col items-center justify-center py-16 text-center">
					<h1 className="text-4xl font-bold">Article Not Found</h1>
					<p className="mt-4 text-lg text-foreground/80">
						The requested article could not be found.
					</p>
				</div>
			</div>
		</main>
	);
};

export default NotFound;
