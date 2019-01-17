import React from 'react';

class Header extends React.Component {

	dorde = (pseudo) => {
		return /[aeiouy]/i.test(pseudo[0]) ? "d'" : "de";
	};

	render() {
		return(
			<header>
				<h1>La boite à recette {this.dorde(this.props.pseudo)} {this.props.pseudo}</h1>
			</header>
		)
	}

	static PropTypes = {
		pseudo: React.PropTypes.string.isRequired
	}
}

export default Header;