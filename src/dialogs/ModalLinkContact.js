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
import {MODAL_LINKCONTACT, createRequest} from "../Actions";
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

class ModalLinkContact extends Component {


    handleCloseModal = () => {
        this.props.dispatch({
            type: MODAL_LINKCONTACT,
            modal: false
        });
    };

    submit(){
        if(this.state.username === ''  ){
            this.setState({error: true})
        } else {
            this.setState({error: false})
            let query =''
            query += ' usernameLink:"'+this.state.username+'", '
            query += ' idContact:"'+this.props.idLinkContact+'", '
            if(query !== ''){
                this.setState({username: ''});
                this.props.dispatch(createRequest(query))
            }
        }
    }

    state = {
        username: '',
        error: false,
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
                <DialogTitle id="responsive-dialog-title">{'Link un contact a un utilisateur'}</DialogTitle>
                <Divider variant="fullWidth" />
                <DialogContent>
                    <div className={classes.container}>
                        <MuiThemeProvider theme={theme}>
                            <TextField
                                id="username"
                                label="Username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                error={this.state.error}
                                margin="normal"
                                variant="outlined"
                            />
                        </MuiThemeProvider>
                    </div>
                </DialogContent>
                <Divider variant="fullWidth" />
                <DialogActions>
                    <Button onClick={()=>{this.submit()}} color="secondary" autoFocus>
                        Save
                    </Button>
                    <Button onClick={this.handleCloseModal} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}

const mapStateToProps = state => ({
    modal : state.modalLinkContact
});

export default  withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(ModalLinkContact)));