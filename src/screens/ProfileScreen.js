import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/es/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { loadUser, saveUser } from '../Actions';
import connect from 'react-redux/es/connect/connect';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        marginLeft: 'auto',
        marginRight: 'auto',
        minWidth: '50%',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#68b36b',
            main: '#43a047',
            dark: '#2e7031',
        },
    },
    typography: { useNextVariants: true },
});

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(loadUser());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) {
            this.setState({
                name: this.props.user.name,
                username: this.props.user.username,
                surname: this.props.user.surname,
                mail: this.props.user.mail,
            });
        }
    }

    submit() {
        if (this.state.password !== this.state.verif) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
            let query = '';
            if (this.state.name !== this.props.user.name) query += ' name:"' + this.state.name + '", ';
            if (this.state.username !== this.props.user.username) query += ' username:"' + this.state.username + '", ';
            if (this.state.surname !== this.props.user.surname) query += ' surname:"' + this.state.surname + '", ';
            if (this.state.mail !== this.props.user.mail) query += ' mail:"' + this.state.mail + '", ';
            if (this.state.password === this.state.verif && this.state.password)
                query += ' password:"' + this.state.password + '", ';
            if (query !== '') this.props.dispatch(saveUser(query));
        }
    }

    state = {
        name: '',
        username: '',
        surname: '',
        mail: '',
        password: '',
        verif: '',
        error: false,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <MuiThemeProvider theme={theme}>
                    <TextField
                        id="username"
                        label="Nom d'utilisateur"
                        className={classes.textField}
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="name"
                        label="Nom"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="surname"
                        label="Prénom"
                        className={classes.textField}
                        value={this.state.surname}
                        onChange={this.handleChange('surname')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="mail"
                        label="Mail"
                        className={classes.textField}
                        value={this.state.mail}
                        onChange={this.handleChange('mail')}
                        autoComplete="email"
                        type="email"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="password"
                        label="Mot de passe"
                        className={classes.textField}
                        onChange={this.handleChange('password')}
                        autoComplete="current-password"
                        error={this.state.error}
                        type="password"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="rePassword"
                        label="Vérification"
                        onChange={this.handleChange('verif')}
                        className={classes.textField}
                        error={this.state.error}
                        type="password"
                        margin="normal"
                        variant="outlined"
                    />
                </MuiThemeProvider>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {
                        this.submit();
                    }}
                >
                    <SaveIcon className={classes.leftIcon} />
                    Save
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

export default withStyles(styles)(connect(mapStateToProps)(ProfileScreen));
