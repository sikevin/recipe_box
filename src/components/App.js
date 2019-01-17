import React from 'react';

//Components
import Header from './Header';
import Admin from './Admin';
import Card from './Card';

//Load Recipe
import Recipes from '../recettes';

//base
import base from '../base';

class App extends React.Component {

	state = {
		recettes : {}
	}

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.pseudo}/recettes`, {
			context: this,
			state: 'recettes'
		})
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	loadRecipes = () => {
		this.setState({ recettes : Recipes});
	}

	addRecipe = (recette) => {
		const recettes = {...this.state.recettes};
		const timestamp = Date.now();
		recettes[`recette-${timestamp}`] = recette;
		this.setState({recettes});
	}

	updateRecipe = (key, majRecette) => {
		const recettes = {...this.state.recettes}
		recettes[key] = majRecette;
		this.setState({recettes});
	}

	deleteRecipe = (key) => {
		const recettes = {...this.state.recettes}
		recettes[key] = null;
		this.setState({recettes});
	}

	render(){
		const cards = Object.keys(this.state.recettes).map(key => <Card key={key} details={this.state.recettes[key]} />)
		
		return (
			<div className="box">
				<Header pseudo={this.props.params.pseudo} />
				<div className="cards">
					{cards}
				</div>
				<Admin 
					recipes={this.state.recettes}
					loadRecipes={this.loadRecipes} 
					addRecipe={this.addRecipe}
					updateRecipe={this.updateRecipe}
					deleteRecipe={this.deleteRecipe}
					pseudo={this.props.params.pseudo}
				/>
			</div>
		)
	};

	static propTypes = {
		params : React.PropTypes.object.isRequired
	};
}

export default App;