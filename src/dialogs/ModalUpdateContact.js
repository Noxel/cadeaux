import React, {Component} from 'react';
import withMobileDialog from "@material-ui/core/es/withMobileDialog/withMobileDialog";
import withStyles from "@material-ui/core/es/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {updateContact, MODAL_UPDATECONTACT} from "../Actions";
import TextField from "@material-ui/core/TextField";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";


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
        }
    },
    typography: { useNextVariants: true },
});

class ModalUpdateContact extends Component {


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.contact !== this.props.contact){
            let birthday = '';
            if(this.props.contact.birthday){
                birthday = this.props.contact.birthday.date.split('T')[0]

            }
            this.setState( {
                name: this.props.contact.name,
                surname: this.props.contact.surname,
                birthday: birthday ,
            })

        }

    }

    handleCloseModal = () => {
        this.props.dispatch({
            type: MODAL_UPDATECONTACT,
            modal: false
        });
    };

    submit(){
        if(this.state.name === ''  ){
            this.setState({errorN: true})
        } else if(this.state.surname === '') {
            this.setState({errorS: true})
        } else {
            this.setState({errorN: false, errorS: false})
            let query =''
            query+= ' id:"'+this.props.contact.id+'", '
            query += ' name:"'+this.state.name+'", '
            query += ' surname:"'+this.state.surname+'", '
            query += ' birthday:"'+new Date(this.state.birthday).toISOString()+'", '
            if(query !== ''){
                this.props.dispatch(updateContact(query))
            }
        }
    }

    state = {
        name: '',
        surname: '',
        birthday:'',
        errorN: false,
        errorS: false,
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render(){
        const {classes, fullScreen  } = this.props;
        return(
            <Dialog
                fullScreen={fullScreen}
                open={this.props.modal}
                onClose={this.handleCloseModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{'Modifier le contact'}</DialogTitle>
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
                            <TextField
                                id="date"
                                label="Date d'anniversaire"
                                type="date"
                                value={this.state.birthday}
                                onChange={this.handleChange('birthday')}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MuiThemeProvider>
                    </div>
                </DialogContent>
                <Divider variant="fullWidth" />
                <DialogActions>
                    <Button onClick={()=>{this.submit()}} color="secondary" autoFocus>
                        Accepter
                    </Button>
                    <Button onClick={this.handleCloseModal} color="primary" autoFocus>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}

const mapStateToProps = state => ({
    contact: state.contact,
    modal : state.modalUpdateContact
});

export default  withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(ModalUpdateContact)));