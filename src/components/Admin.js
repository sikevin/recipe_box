import React from 'react';
import AddRecipe from './addRecipe';
import base from '../base';

class Admin extends React.Component {

	state = {
		uid: null,
		owner: null
	}

	componentDidMount() {
		base.onAuth(user => {
			if(user) {
				this.traitementConnection(null, {user})
			}
		})
	}

	connection = provider => {
		base.authWithOAuthPopup(provider, this.traitementConnection);
	}

	logout = () => {
		base.unauth();
		this.setState({ uid: null });
	}

	traiterChangement = (event, key) => {
		const recette = this.props.recipes[key];
		const majRecette = {
			...recette,
			[event.target.name]: event.target.value
		};
		this.props.updateRecipe(key, majRecette);
	};

	traitementConnection = (error, authData) => {
		if(error){
			console.log(error);
			return;
		}
		//Récupérer le nom de la boite
		const boxRef = base.database().ref(this.props.pseudo);

		//Demander à firebase les données
		boxRef.once('value', snapshot => {
			const data = snapshot.val() || {};

			// Si y a rien attribuer la box à la personne
			if(!data.owner){
				boxRef.set({
					owner: authData.user.uid,
				})
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			})
		})
	};

	renderAdmin = (key) => {
		const recette = this.props.recipes[key];
		return (
			<div className="card" key={key} >
				<form className="admin-form">

					<input type="text" name="nom" placeholder="Nom de la recette" value={recette.nom} onChange={(e) => this.traiterChangement(e, key)} />

					<input type="text" name="image" placeholder="Adresse de l'image" value={recette.image} onChange={(e) => this.traiterChangement(e, key)} />

					<textarea name="ingredients" rows="3" placeholder="Liste des ingrédients" value={recette.ingredients} onChange={(e) => this.traiterChangement(e, key)} ></textarea>

					<textarea name="instructions" rows="15" placeholder="Liste des instructions" value={recette.instructions} onChange={(e) => this.traiterChangement(e, key)} ></textarea>
					
				</form>

				<button onClick={() => this.props.deleteRecipe(key)} >Supprimer</button>
				
			</div>
		)
	};

	renderLogin = () => {
		return(
			<div className="login">
				<h2>Connecte toi pour créer tes recettes !</h2>
				<button className="facebook-button" onClick={() => this.connection('facebook')}>Me connecter avec Facebook</button>
			</div>
		)
	};

	render() {

		const logoutButton = <button onClick={this.logout}>Logout</button>
		//S'il existe un propriétaire
		if(!this.state.uid){
			return <div>{this.renderLogin()}</div>
		}

		if (this.state.uid !== this.state.owner) {
			return (
				<div className="login">
					{this.renderLogin}
					<p>Tu n'es pas le propriétaire de cette liste</p>
				</div>
			)
		}

		const adminCards = Object
			.keys(this.props.recipes)
			.map(this.renderAdmin);
		
		return (
			<div className="cards">
			<AddRecipe addRecipe={this.props.addRecipe} />
			{adminCards}
				<footer>
					<button onClick={this.props.loadRecipes} >Remplir</button>
					{logoutButton}
				</footer>
			</div>	
		)
	}

	static propTypes = {
		recipes: React.PropTypes.object.isRequired,
		loadRecipes: React.PropTypes.func.isRequired,
		addRecipe: React.PropTypes.func.isRequired,
		updateRecipe: React.PropTypes.func.isRequired,
		deleteRecipe: React.PropTypes.func.isRequired,
		pseudo: React.PropTypes.string.isRequired,
	};

}

export default Admin;