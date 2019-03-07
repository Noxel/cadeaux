import React, {Component} from 'react';
import '../assets/css/FormLogin.css';
import {requestSignup} from "../Actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }

    confirmPassword = (e) => {
        let password = e.target.value;
        let confirmPassword = e.target.value;
        console.log('e: ',e.target.value + 'password: ',password, 'confirm: ', confirmPassword);

        if (password !== confirmPassword) {
            this.setState({message: 'Vos mots de passe ne sont pas identiques.'});
        } else {
            this.setState({message: 'OK'});
        }
    };

    render() {
        return (
            <>
                <form className="formLogin"
                      onSubmit={(e) => {
                          e.preventDefault();

                          let password = e.target.elements[1].value;
                          let confirmPassword = e.target.elements[2].value;
                          if (password !== confirmPassword) {
                              this.setState({message: 'Vos mots de passe ne sont pas identiques.'});
                          } else {
                              this.props.dispatch(requestSignup(e.target.elements[0].value, e.target.elements[1].value, e.target.elements[3].value, e.target.elements[4].value, e.target.elements[5].value));
                          }
                      }}
                >
                    <h1>Inscription</h1>

                    {this.props.error}

                    {this.state.message}

                    <input type="text" placeholder="Nom d'utilisateur" name="username" required/>
                    <input type="password" placeholder="Mot de passe" name="password" onChange={e => this.confirmPassword(e)} required/>
                    <input type="password" placeholder="Confirmation du mot de passe" name="confirmPassword" onKeyUp={e => this.confirmPassword(e)} required/>
                    <input type="text" placeholder="Nom" name="surname" required/>
                    <input type="text" placeholder="Prénom" name="name" required/>
                    <input type="email" placeholder="Adresse mail" name="email" required/>

                    <button type="submit">S'inscrire</button>

                    <div className="links">
                        <Link to="/">Déjà inscrit ? Connectez-vous</Link>
                    </div>
                </form>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
    }
};

export default connect(mapStateToProps)(Registration);
