import React from 'react';
import './Navbar.css';

type Props = {};

const Navbar = (props: Props) => {
	return (
		<nav className='navbar'>
			<ul className='navlist'>
				<li>1</li>
				<li className='item'>2</li>
				<li>3</li>
				<li>4</li>
			</ul>
		</nav>
	);
};

export default Navbar;
