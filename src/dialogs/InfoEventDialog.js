import React from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openInfoEventDialog, requestContactGifts } from '../Actions';
import { Typography, Divider, withMobileDialog, TextField, Tabs } from '@material-ui/core';
import SwipeableViews from "react-swipeable-views";
import { withStyles, Tab } from '@material-ui/core/es';

class InfoEventDialog extends React.Component {
    state={
        sendingInfos: false,
        deletingContact: false,
        gifts: []
    }

    componentDidMount(){
        this.props.dispatch(requestContactGifts(this.props.idDate, this.props.contact.id))
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClose = () => {
        this.props.dispatch(openInfoEventDialog(false, {}))
    };

    sendInfos = () => {
        console.log("sendinfos")
        this.handleClose();
    }

    deleteContact = () => {
        console.log("deleteContact")
        this.handleClose();
    }

    //{param1} displays button to send informations, {param 2} displays button to delete contact from date
    onMovingTabs(sendingInfos, deletingContact){
        this.setState({
            sendingInfos: sendingInfos,
            deletingContact: deletingContact,
        })
    }

    render() {
        console.log(this.props.contact);
        const { theme, classes } = this.props;
        return (
        <div>
            <Dialog
                open={this.props.openDialog}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Cadeaux à offrir à " + this.props.contact.surname}</DialogTitle>
            <Divider/>
            <DialogContent>
                <Tabs value={this.state.value}  indicatorColor="primary" textColor={"primary"} variant={"fullWidth"} onChange={this.handleChange}>
                    <Tab label="Informations" onClick={() => this.onMovingTabs(false, false)}/>
                    <Tab label="Modifier" onClick={() => this.onMovingTabs(true, false)}/>
                    <Tab label="Supprimer" onClick={() => this.onMovingTabs(false, true)}/>
                </Tabs>
                    <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                    >
                        <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                            <Typography component="p"><Typography component="b">Description : </Typography>{this.props.description}</Typography>
                            <Typography component="p"><Typography component="b">Budget : </Typography>{this.props.budget} €</Typography>
                        </Typography>
                        <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                            <div style={{flexDirection: "row"}}>
                            <TextField
                                autoFocus
                                id="standard-multiline-flexible"
                                label="Description"
                                defaultValue={this.props.description}
                                multiline
                                rowsMax="4"
                                value={this.state.multiline}
                                className={classes.textField}
                                margin="normal"
                                onChange={(event) => this.onChangeDesc(event.target.value)}
                                required
                            />
                            <TextField
                                autoFocus
                                id="standard-multiline-flexible"
                                label="Budget"
                                margin="normal"
                                defaultValue={this.props.budget}
                                onChange={(event) => this.onChangeBudget(event.target.value)}
                                required
                            />
                            </div>
                        </Typography>
                    </SwipeableViews>
            </DialogContent>
            <DialogActions>
                {this.state.sendingInfos ? 
                    <Button onClick={() => this.sendInfos()} color="primary">
                        Envoyer
                    </Button> :
                    null
                }
                {this.state.deletingContact ? 
                    <Button onClick={() => this.deleteContact()} color="primary">
                        Supprimer
                    </Button> :
                    null
                }
                <Button onClick={this.handleClose} color="primary">
                    Quitter
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
  }
}

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

const mapStateToProps = state => {
    return ({
                openDialog: state.openInfoEventDialog,
                contact: state.currentContact
            })
}

export default withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(InfoEventDialog)));