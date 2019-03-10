import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openAddGiftDialog, addGift } from '../Actions';
import { TextField } from '@material-ui/core';
import { Divider } from '@material-ui/core/es';

class AddGiftDialog extends React.Component {
    state = {
        name: null,
    };

    handleClose = () => {
        this.props.dispatch(openAddGiftDialog(false));
    };

    addGift = () => {
        if (this.state.name !== null) {
            let query = 'name:"' + this.state.name + '"';
            if (this.props.me) query += ' me:' + this.props.me;
            this.props.dispatch(addGift(query, true));
        }
        this.props.dispatch(openAddGiftDialog(false));
    };

    changeName = name => {
        this.setState({ name: name });
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
                    <DialogTitle id="alert-dialog-title">{'Ajouter un cadeau à offrir'}</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TextField
                            autoFocus
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.addGift()} color="primary">
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
    return { openDialog: state.openAddGiftDialog };
};

export default connect(mapStateToProps)(AddGiftDialog);
