type Props = {};

const LoadingState = (props: Props) => {
	return (
		<div className='min-w-95'>
			<p className='text-gray-500 text-sm animate-pulse'>
				Connecting to chat room…
			</p>
		</div>
	);
};

export default LoadingState;
