import React, {Component} from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = () => ({
    element: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -34,
        marginLeft: -34,
    }
});


class ModalWait extends Component {

    render(){
        const { classes } = this.props;
        return(
            <>
                {this.props.modal &&  <CircularProgress size={68} className={classes.element} />}
            </>

        )
    }

}

const mapStateToProps = state => ({
    modal : state.wait
});

export default  withStyles(styles, { withTheme: true })(connect(mapStateToProps)(ModalWait));