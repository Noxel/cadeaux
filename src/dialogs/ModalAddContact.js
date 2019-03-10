import React, { Component } from 'react';
import withMobileDialog from '@material-ui/core/es/withMobileDialog/withMobileDialog';
import withStyles from '@material-ui/core/es/styles/withStyles';
import connect from 'react-redux/es/connect/connect';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { addContact, MODAL_ADDCONTACT } from '../Actions';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/es/styles/createMuiTheme';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        marginLeft: 'auto',
        marginRight: 'auto',
        minWidth: '50%',
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

class ModalAddContact extends Component {
    handleCloseModal = () => {
        this.props.dispatch({
            type: MODAL_ADDCONTACT,
            modal: false,
        });
    };

    submit() {
        if (this.state.name === '') {
            this.setState({ errorN: true });
        } else if (this.state.surname === '') {
            this.setState({ errorS: true });
        } else {
            this.setState({ errorN: false, errorS: false });
            let query = '';
            query += ' name:"' + this.state.name + '", ';
            query += ' surname:"' + this.state.surname + '", ';
            if (query !== '') {
                this.setState({ name: '', surname: '' });
                this.props.dispatch(addContact(query));
            }
        }
    }

    state = {
        name: '',
        surname: '',
        errorN: false,
        errorS: false,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes, fullScreen } = this.props;
        return (
            <Dialog
                fullScreen={fullScreen}
                open={this.props.modal}
                onClose={this.handleCloseModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{'Ajouter un contact'}</DialogTitle>
                <Divider variant="fullWidth" />
                <DialogContent>
                    <div className={classes.container}>
                        <MuiThemeProvider theme={theme}>
                            <TextField
                                id="name"
                                label="Nom"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                error={this.state.errorN}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="surname"
                                label="Prénom"
                                className={classes.textField}
                                value={this.state.surname}
                                onChange={this.handleChange('surname')}
                                error={this.state.errorS}
                                margin="normal"
                                variant="outlined"
                            />
                        </MuiThemeProvider>
                    </div>
                </DialogContent>
                <Divider variant="fullWidth" />
                <DialogActions>
                    <Button
                        onClick={() => {
                            this.submit();
                        }}
                        color="secondary"
                        autoFocus
                    >
                        Accepter
                    </Button>
                    <Button onClick={this.handleCloseModal} color="primary" autoFocus>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.modalAddContact,
});

export default withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(ModalAddContact)));
