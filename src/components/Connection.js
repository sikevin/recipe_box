import React from 'react';

class Connection extends React.Component {

	goToApp = event => {
		event.preventDefault();
		//On récupère le pseudo
		const pseudo = this.boxInput.value;
		//On change l'url
		this.context.router.transitionTo(`/box/${pseudo}`);
	}

	render() {
		return(
			<div className="connectionBox">
				<form className="connection" onSubmit={(e) => this.goToApp(e)}>
					<h1>Ma boite à recettes</h1>
					<input 
						type="text" 
						placeholder="Nom du chef" 
						pattern='[A-Za-z-]{1,}' 
						required ref={(input) => {this.boxInput=input}} 
					/>
					<button>GO</button>
					<p>Pas de caractères spéciaux</p>
				</form>
			</div>
		)
	};

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};
}

export default Connection;