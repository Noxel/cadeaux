import React from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openAddContactDialog, addContactToDate } from '../Actions';
import {  FormControlLabel, FormGroup, Checkbox, withStyles, FormLabel, FormControl } from '@material-ui/core';
import { Divider } from '@material-ui/core/es';

class AddContactDialog extends React.Component {

    state={
        checked: []
    }

    componentDidMount(){
        this.props.contacts.map((contact, index) => (
            this.addContactIntoState(contact.id)
        ))
    }

    isInContactsInDate(id){
      let res = false;
      this.props.contactsInDate.map((contact, index) => {
        return contact.id === id ? res = true : null
      })
      return res;
    }

    addContactIntoState(id){
        this.setState({id: false})
    }

    handleChange = (id, event, checked) => {
        this.setState({ 
            [id]: event.target.checked,
        });
      };

    handleClose = () => {
        this.props.dispatch(openAddContactDialog(false))
    };

    addContactToDate(){
        this.props.contacts.map((contact, index) => (
            this.state[contact.id] ? this.props.dispatch(addContactToDate(this.props.idDate, contact.id)) : null
        ))
        this.props.dispatch(openAddContactDialog(false))
    }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Ajouter un contact à cette date"}</DialogTitle>
          <Divider />
          <DialogContent>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Liste de vos contacts</FormLabel>
                    <FormGroup>
                        {this.props.contacts.map((contact, index) => 
                            this.isInContactsInDate(contact.id) ? null :
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                    onChange={(event, checked) => this.handleChange(contact.id, event, checked)}
                                    value={this.state[contact.id]+''}
                                    />
                                }
                                label={contact.name + " " + contact.surname}
                                labelPlacement="start"
                            />
                        )}
                    </FormGroup>
                </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.addContactToDate()} color="primary">
              Ajouter
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
    return ({openDialog: state.openAddContactDialog})
}

const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit * 3,
    },
  });

export default withStyles(styles)(connect(mapStateToProps)(AddContactDialog));