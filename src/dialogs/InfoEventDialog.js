import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openInfoEventDialog, requestContactGifts, deleteContactFromDate } from '../Actions';
import { Typography, Divider, withMobileDialog } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/es';

class InfoEventDialog extends React.Component {
    state = {
        sendingInfos: false,
        deletingContact: false,
        value: 0,
    };

    componentDidMount() {
        this.props.dispatch(requestContactGifts(this.props.idDate, this.props.contact.id));
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleClose = () => {
        this.props.dispatch(openInfoEventDialog(false, {}));
    };

    deleteContact = () => {
        this.props.dispatch(deleteContactFromDate(this.props.idDate, this.props.contact.id, this.props.gifts));
        this.handleClose();
    };

    //{param1} displays button to send informations, {param 2} displays button to delete contact from date
    onMovingTabs(sendingInfos, deletingContact) {
        this.setState({
            sendingInfos: sendingInfos,
            deletingContact: deletingContact,
        });
    }

    render() {
        console.log(this.state.value);
        const { theme, fullScreen } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.props.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Cadeaux à offrir à ' + this.props.contact.surname}
                    </DialogTitle>
                    <Divider variant="fullWidth" />
                    <DialogContent>
                        <Tabs
                            value={this.state.value}
                            indicatorColor="primary"
                            textColor={'primary'}
                            variant={'fullWidth'}
                            onChange={this.handleChange}
                        >
                            <Tab label="Informations" onClick={() => this.onMovingTabs(false, false)} />
                            <Tab label="Supprimer" onClick={() => this.onMovingTabs(false, true)} />
                        </Tabs>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                                {this.props.gifts.map((gift, index) => {
                                    return (
                                        <Typography component="div" key={index}>
                                            <Typography component="p">
                                                {gift.name} à{' '}
                                                {gift.price !== undefined && gift.price !== null ? gift.price : '0'}€
                                            </Typography>
                                        </Typography>
                                    );
                                })}
                            </Typography>
                            <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                                <Typography component="p">
                                    Voulez-vous vraiment supprimer le contact de cette date ?
                                </Typography>
                            </Typography>
                        </SwipeableViews>
                    </DialogContent>
                    <DialogActions>
                        {this.state.sendingInfos ? (
                            <Button onClick={() => this.sendInfos()} color="primary">
                                Envoyer
                            </Button>
                        ) : null}
                        {this.state.deletingContact ? (
                            <Button onClick={() => this.deleteContact()} color="primary">
                                Supprimer
                            </Button>
                        ) : null}
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
    return {
        openDialog: state.openInfoEventDialog,
        contact: state.currentContact,
        gifts: state.giftsContacts,
    };
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(InfoEventDialog)));
