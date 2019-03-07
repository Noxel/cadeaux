import React, {Component} from 'react';
import '../assets/css/FormLogin.css';
import { requestResetPassword} from "../Actions";
import {Link} from "react-router-dom";
import {connect} from "react-redux";


class ResetPassword extends Component {
    render() {
        return (
            <>
                <form className="formLogin" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(requestResetPassword(e.target.elements[0].value));
                }}>
                    <h1>Mot de passe oublié</h1>

                    {this.props.error}

                    <input type="text" placeholder="Nom d'utilisateur" name="username"/>

                    <button type="submit">Retrouver son mot de passe</button>

                    <div className="links">
                        <Link to="/login">Se connecter</Link>
                        <Link to="/registration">Créer un compte</Link>
                    </div>
                </form>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
        message: state.message
    }
};

export default connect(mapStateToProps)(ResetPassword);
