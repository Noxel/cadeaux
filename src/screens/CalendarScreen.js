import React, {Component} from 'react';
import Calendar from 'react-calendar';
import {connect} from "react-redux";
import CalendarDialog from '../components/CalendarDialog';
import { openDialog } from '../Actions';
import { withStyles } from '@material-ui/core';
import gift from '../assets/img/gift.png';
import FabButton from '../components/FabButton'

class CalendarScreen extends Component{
    state = {
        currentDay: new Date(),
        date: new Date(),
        event: [new Date(2019, 2, 2), new Date(2019, 2, 7), new Date(2019, 2, 20) ] // :D
    }
    
    onChange = date => this.setState({ date })

    doIHaveEventOnThisDate(day){
        const tab = this.state.event
        let res = false;
        tab.map(value =>{
            return value.getUTCDate() === day.date.getUTCDate() && value.getUTCMonth() === day.date.getUTCMonth() && value.getUTCFullYear() === day.date.getUTCFullYear() ? res = true : null
        })
        return res;
    }
    
    render(){
        const {classes} = this.props;
        return(
            <>
                <Calendar
                    className={classes.calendar}
                    onChange={this.onChange}
                    value={this.state.date}
                    minDate={this.state.currentDay}
                    onClickDay={(value) => {this.props.dispatch(openDialog(true))}}
                    tileClassName={(date) =>
                         this.doIHaveEventOnThisDate(date) ? classes.eventTiles : classes.tiles
                    }
                />
                {this.props.openDialog ? <CalendarDialog/>: <></>}
                <FabButton fonct={openDialog}/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return ({openDialog: state.openDialog})
}

const styles = {
    calendar: {
        margin: "auto",
        width: "100%"
    },
    eventTiles: {
        backgroundImage: "url("+gift+")",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        fontWeight: "bold",
        color: '#2e7031',
        backgroundPosition: "center center",
        padding: "2%",
        margin: "auto"
    },
    tiles: {
        padding: "2%",
        margin: "auto"
    }
}

export default withStyles(styles)(connect(mapStateToProps)(CalendarScreen));