import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openDelDateDialog, delDate } from '../Actions';

class DelDateDialog extends React.Component {
    handleClose = () => {
        this.props.dispatch(openDelDateDialog(false));
    };

    delDate = () => {
        if (!(this.props.date === -1)) this.props.dispatch(delDate(this.props.date));
        this.props.dispatch(openDelDateDialog(false));
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
                    <DialogTitle id="alert-dialog-title">{'Supprimer la date'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Voulez-vous supprimer cette date ?
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
    return { openDialog: state.openDelDateDialog };
};

export default connect(mapStateToProps)(DelDateDialog);
