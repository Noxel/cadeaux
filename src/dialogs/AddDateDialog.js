import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openAddDateDialog, addDate } from '../Actions';
import { TextField } from '@material-ui/core';

class AddDateDialog extends React.Component {
    state = {
        sendDate: null,
    };

    handleClose = () => {
        this.props.dispatch(openAddDateDialog(false));
    };

    addDate = () => {
        if (this.state.sendDate !== null) this.props.dispatch(addDate(this.state.sendDate));
        this.props.dispatch(openAddDateDialog(false));
    };

    splitDate = date => {
        let sendDate = new Date(date).toISOString();
        this.setState({ sendDate: sendDate });
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
                    <DialogTitle id="alert-dialog-title">{'Ajouter une date événementielle'}</DialogTitle>
                    <DialogContent>
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
                            onChange={event => {
                                this.splitDate(event.target.value);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.addDate()} color="primary">
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
    return { openDialog: state.openAddDateDialog };
};

export default connect(mapStateToProps)(AddDateDialog);
