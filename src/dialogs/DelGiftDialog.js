import React from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openDelGiftDialog, delGift } from '../Actions';

class DelGiftDialog extends React.Component {

    handleClickOpen = () => {
        this.setState({ open: this.props.openDialog });
    };

    handleClose = () => {
        this.props.dispatch(openDelGiftDialog(false))
    };

    delDate = () => {
      console.log("Props")
      console.log(this.props.idGift)
      let res = this.props.idGift === null || this.props.idGift === undefined ? null : this.props.dispatch(delGift(this.props.idGift))
      this.props.dispatch(openDelGiftDialog(false))
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
          <DialogTitle id="alert-dialog-title">{"Supprimer le cadeau"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Voulez-vous supprimer ce cadeau ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.delDate()} color="primary">
              Supprimer
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return ({openDialog: state.openDelGiftDialog})
}

export default connect(mapStateToProps)(DelGiftDialog);