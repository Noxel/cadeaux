import React from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openUpdateGiftDialog, updateGift } from '../Actions';
import { TextField, FormControl } from '@material-ui/core';
import { InputLabel, Select, MenuItem } from '@material-ui/core/es';

class UpdateGiftDialog extends React.Component {

    state={
      id: this.props.gift.id,
      name: this.props.gift.name,
      price: this.props.gift.price === null ? 0 : this.props.gift.price,
      contact: this.props.gift.contact,
      date: this.props.gift.date,
      contactId: "",
      dateId: "",
    }

    handleClose = () => {
        this.props.dispatch(openUpdateGiftDialog(false))
    };

    updateGift = () => {  
      if(this.state.name !== null && this.state.name !== undefined){
        let query = 'id:"'+this.state.id+'" name:"'+this.state.name+'"';
        if(this.state.price !== null && this.state.price !== "")query+=' price:'+this.state.price
        if(this.state.dateId !== null && this.state.dateId !== "")query+=' idDate:"'+this.state.dateId+'"'
        if(this.state.contactId !== null && this.state.contactId !== "")query+=' idContact:"'+this.state.contactId+'"'
        this.props.dispatch(updateGift(query))
      }
      this.props.dispatch(openUpdateGiftDialog(false))

    }

    changeName = (name) => {
        this.setState({name: name})
    }
    
    changePrice = (price) => {
      this.setState({price: price})
    } 

    handleChangeContact = event => {
      this.setState({ contactId: event.target.value });
    };

    handleChangeDate = event => {
      this.setState({ dateId: event.target.value });
    };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Modifier le cadeau"}</DialogTitle>
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
                onChange={(event) => this.changeName(event.target.value)}
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
                onChange={(event) => this.changePrice(event.target.value)}
              />
              <FormControl>
                <InputLabel htmlFor="contact-simple">Contact</InputLabel>
                <Select
                  value={this.state.contactId}
                  fullWidth
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
                    <MenuItem key={index} value={contact.id}>{contact.name + " " + contact.surname}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="date-simple">Date événementielle</InputLabel>
                <Select
                  value={this.state.dateId}
                  fullWidth
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
                    <MenuItem key={index} value={date.id}>{new Date(date.date).toLocaleDateString()}</MenuItem>
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
    return ({
      openDialog: state.openUpdateGiftDialog,
      contacts: state.contacts,
      dates: state.dates,
    })
}

export default connect(mapStateToProps)(UpdateGiftDialog);