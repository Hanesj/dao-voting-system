type Props = {
	pageNo: number;
	handleClick: (dir: number) => void;
	hasNextPage: boolean;
};

const Pagination = ({ pageNo, handleClick, hasNextPage }: Props) => {
	return (
		<div className='pagination'>
			{pageNo > 0 && (
				<button onClick={() => handleClick(-1)}>&lt;</button>
			)}
			<p>{pageNo + 1}</p>
			{hasNextPage && (
				<button onClick={() => handleClick(1)}>&gt;</button>
			)}
		</div>
	);
};

export default Pagination;
