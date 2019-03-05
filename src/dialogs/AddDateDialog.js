import React from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openAddDateDialog } from '../Actions';
import { TextField } from '@material-ui/core';

class AddDateDialog extends React.Component {

    handleClickOpen = () => {
        this.setState({ open: this.props.openDialog });
    };

    handleClose = () => {
        this.props.dispatch(openAddDateDialog(false))
    };

    addDate = (event) => {
        console.log(event)
    }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Ajouter une date événementielle"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              margin="dense"
              id="date"
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(event) => this.addDate(event)} color="primary">
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
    return ({openDialog: state.openAddDateDialog})
}

export default connect(mapStateToProps)(AddDateDialog);