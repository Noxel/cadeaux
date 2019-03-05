import React from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openDialog } from '../Actions';

class CalendarDialog extends React.Component {

    handleClickOpen = () => {
        this.setState({ open: this.props.openDialog });
    };

    handleClose = () => {
        this.props.dispatch(openDialog(false))
    };

  render() {
    const date = new Date(this.props.date)
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Liste des cadeaux du "+date.toLocaleDateString()}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Budget: {this.props.budget}€
              {this.props.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
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
    return ({openDialog: state.openDialog})
}

export default connect(mapStateToProps)(CalendarDialog);