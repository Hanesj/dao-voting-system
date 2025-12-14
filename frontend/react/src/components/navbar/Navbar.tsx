import React from 'react';
import './Navbar.css';

type Props = {};

const Navbar = (props: Props) => {
	return (
		<header className='main-header'>
			<div className='header-container'>
				<a href='/' className='logo'>
					DApp Voting
				</a>

				<nav className='main-nav'>
					<ul>
						<li>
							<a href='#'>Polls</a>
						</li>
						<li>
							<a href='#'>Create</a>
						</li>
						<li>
							<a href='#'>Wallet</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
