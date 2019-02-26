import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../assets/css/FormLogin.css';

class Registration extends Component{
    render(){
        return(
            <>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Cadeaux
                        </Typography>
                    </Toolbar>
                </AppBar>

                <form className="formLogin">
                    {this.props.error}

                    <input type="text" placeholder="Nom d'utilisateur" name="username" required />
                    <input type="password" placeholder="Mot de passe" name="password" required />
                    <input type="email" placeholder="Adresse mail" name="email" required />
                    <input type="phone" placeholder="N° Téléphone" name="phone" />
                    <input type="text" placeholder="Nom" name="surname" />
                    <input type="text" placeholder="Prénom" name="name" />

                    <button type="submit">S'inscrire</button>
                </form>
            </>
        );
    }
}

export default Registration;
