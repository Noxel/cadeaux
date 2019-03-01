import React, {Component} from 'react';
import '../assets/css/FormLogin.css';
import {connect} from "react-redux";
import {requestLogin, requestLogout} from "../Actions";
import {Link} from "react-router-dom";


class Login extends Component {
    componentDidMount() {
        this.props.dispatch(requestLogout());
    }

    render() {
        return (
            <>
                <form className="formLogin" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(requestLogin(e.target.elements[0].value, e.target.elements[1].value));
                }}>
                    <h1>Connexion</h1>

                    {this.props.error}

                    <input type="text" placeholder="Nom d'utilisateur" name="username"/>
                    <input type="password" placeholder="Mot de passe" name="password"/>

                    <button type="submit">Se connecter</button>

                    <Link to="/registration">Créer un compte</Link>
                </form>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
        user: state.user,
    }
};

export default connect(mapStateToProps)(Login);
