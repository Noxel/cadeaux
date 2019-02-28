import React, {Component} from 'react';
import {connect} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core';

class FabButton extends Component{
    render(){
        const {classes} = this.props
        return(
            <>
                <Fab className={classes.fab} color="secondary" onClick={() => this.props.dispatch(this.props.fonct(true))}>
                    <AddIcon/>
                </Fab>
            </>
        );
    }
}

const styles = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
})

export default withStyles(styles, { withTheme: true })(connect()(FabButton));