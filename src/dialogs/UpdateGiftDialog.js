import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { loadContacts, openUpdateGiftDialog, requestDates, updateGift } from '../Actions';
import { TextField, FormControl, FormGroup, FormControlLabel } from '@material-ui/core';
import { InputLabel, Select, MenuItem, Checkbox } from '@material-ui/core/es';

class UpdateGiftDialog extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(loadContacts());
        this.props.dispatch(requestDates());
    }

    state = {
        id: this.props.gift.id,
        name: this.props.gift.name,
        price: this.props.gift.price === null ? 0 : this.props.gift.price,
        contact: this.props.gift.contact,
        date: this.props.gift.date,
        contactId: this.props.gift.contact !== null ? this.props.gift.contact.id : '',
        dateId: this.props.gift.date !== null ? this.props.gift.date.id : '',
        lock: this.props.gift.wishUser !== null,
    };

    handleClose = () => {
        this.props.dispatch(openUpdateGiftDialog(false));
    };

    updateGift = () => {
        if (this.state.name !== null && this.state.name !== undefined) {
            let query = 'id:"' + this.state.id + '" name:"' + this.state.name + '"';
            if (this.state.price !== null && this.state.price !== '') query += ' price:' + this.state.price;
            if (this.state.dateId !== null && this.state.dateId !== '') {
                query += ' idDate:"' + this.state.dateId + '"';
            } else if (this.state.dateId === '') {
                query += ' dDate:true';
            }
            if (this.state.contactId !== null && this.state.contactId !== '') {
                query += ' idContact:"' + this.state.contactId + '"';
            } else if (this.state.contactId === '') {
                query += ' dContact:true';
            }
            query += ' me:' + this.state.lock;
            this.props.dispatch(updateGift(query, this.state.dateId, this.state.contactId));
        }
        this.props.dispatch(openUpdateGiftDialog(false));
    };

    changeName = name => {
        this.setState({ name: name });
    };

    changePrice = price => {
        this.setState({ price: price });
    };

    handleChangeContact = event => {
        this.setState({ contactId: event.target.value });
    };

    handleChangeDate = event => {
        console.log(event.target.value);
        this.setState({ dateId: event.target.value });
    };

    handleChangeForMe = (event, checked) => {
        this.setState({ lock: checked, contactId: '', dateId: '' });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    disableEnforceFocus
                >
                    <DialogTitle id="alert-dialog-title">{'Modifier le cadeau'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            defaultValue={this.props.gift.name}
                            margin="dense"
                            id="name"
                            label="Nom"
                            type="string"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={event => this.changeName(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            defaultValue={this.state.price}
                            margin="dense"
                            id="name"
                            label="Prix"
                            type="string"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={event => this.changePrice(event.target.value)}
                        />
                        <FormControl component="fieldset">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(event, checked) => this.handleChangeForMe(event, checked)}
                                            checked={!!this.state.lock}
                                        />
                                    }
                                    label={'Pour moi même'}
                                    labelPlacement="start"
                                />
                            </FormGroup>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="contact-simple">Contact</InputLabel>
                            <Select
                                value={this.state.contactId}
                                fullWidth
                                disabled={this.state.lock}
                                onChange={this.handleChangeContact}
                                inputProps={{
                                    name: 'contact',
                                    id: 'contact-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>Personne</em>
                                </MenuItem>
                                {this.props.contacts.map((contact, index) => (
                                    <MenuItem key={index} value={contact.id}>
                                        {contact.name + ' ' + contact.surname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="date-simple">Date événementielle</InputLabel>
                            <Select
                                value={this.state.dateId}
                                fullWidth
                                disabled={this.state.lock}
                                onChange={this.handleChangeDate}
                                inputProps={{
                                    name: 'date',
                                    id: 'date-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>Aucune</em>
                                </MenuItem>
                                {this.props.dates.map((date, index) => (
                                    <MenuItem key={index} value={date.id}>
                                        {new Date(date.date).toLocaleDateString()}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.updateGift()} color="primary">
                            Modifier
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Fermer
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gift: state.gift,
        openDialog: state.openUpdateGiftDialog,
        contacts: state.contacts,
        dates: state.dates,
    };
};

export default connect(mapStateToProps)(UpdateGiftDialog);
