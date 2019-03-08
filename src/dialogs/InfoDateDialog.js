import React from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { openInfoDateDialog, sendInfos } from '../Actions';
import { Typography, Divider, withMobileDialog, TextField, Tabs } from '@material-ui/core';
import SwipeableViews from "react-swipeable-views";
import { withStyles, Tab } from '@material-ui/core/es';

class InfoDateDialog extends React.Component {
    state={
        update: false,
        budget: this.props.budget,
        desc: this.props.description
    }

    handleChangeMultipleLine = name => event => {
        this.setState({ [name]: event.target.value });
      };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClickOpen = () => {
        this.setState({ open: this.props.openDialog });
    };

    handleClose = () => {
        this.props.dispatch(openInfoDateDialog(false))
    };

    onUpdate = (isUpdating) => {
        this.setState({update: isUpdating})
    }

    sendInfos = () => {
        let query = 'id:"' + this.props.id + '" description:"' + this.state.desc + '" budget:' + this.state.budget
        this.props.dispatch(sendInfos(query));
        this.props.dispatch(openInfoDateDialog(false))
    }

    onChangeBudget = budget => {
        this.setState({budget: budget})
    }

    onChangeDesc = desc => {
        this.setState({desc: desc})
    }

  render() {
    const { theme, classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Informations"}</DialogTitle>
          <Divider/>
          <DialogContent>
            <Tabs value={this.state.value}  indicatorColor="primary" textColor={"primary"} variant={"fullWidth"} onChange={this.handleChange}>
                <Tab label="Informations" onClick={() => this.onUpdate(false)}/>
                <Tab label="Modifier" onClick={() => this.onUpdate(true)}/>
            </Tabs>
                <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                >
                    <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                        <p><b>Description : </b>{this.props.description}</p>
                        <p><b>Budget : </b>{this.props.budget} €</p>
                    </Typography>
                    <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                        <div style={{flexDirection: "row"}}>
                        <TextField
                            autoFocus
                            id="standard-multiline-flexible"
                            label="Description"
                            defaultValue={this.props.description}
                            multiline
                            rowsMax="4"
                            value={this.state.multiline}
                            className={classes.textField}
                            margin="normal"
                            onChange={(event) => this.onChangeDesc(event.target.value)}
                            required
                        />
                        <TextField
                            autoFocus
                            id="standard-multiline-flexible"
                            label="Budget"
                            margin="normal"
                            defaultValue={this.props.budget}
                            onChange={(event) => this.onChangeBudget(event.target.value)}
                            required
                        />
                        </div>
                    </Typography>
                </SwipeableViews>
          </DialogContent>
          <DialogActions>
            {this.state.update ? 
                <Button onClick={() => this.sendInfos()} color="primary">
                    Envoyer
                </Button> :
                null
            }
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
    return ({openDialog: state.openInfoDateDialog})
}

export default withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(InfoDateDialog)));