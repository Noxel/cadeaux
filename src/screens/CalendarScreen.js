import React, {Component} from 'react';
import Calendar from 'react-calendar';
import {connect} from "react-redux";
import CalendarDialog from '../components/CalendarDialog';
import { openDialog } from '../Actions';
import { withStyles } from '@material-ui/core';

class CalendarScreen extends Component{
    state = {
        currentDay: new Date(),
        date: new Date(),
        nextDay: new Date().getDate()+1,
        neDay: new Date().getDate()+5,
        nextMonth: new Date().getMonth()+1
    }
    
    onChange = date => this.setState({ date })

    doIHaveEventOnThisDate(day){
        console.log(day)
        const tab = [this.state.nextDay, this.state.neDay, this.state.currentDay]
        const res = tab.find((date, index) => date === day.date.getDate()) !== undefined
        console.log(res)
    }
    
    render(){
        const {classes} = this.props;
        return(
            <>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    minDate={this.state.currentDay}
                    onClickDay={(value) => {this.props.dispatch(openDialog(true))}}
                    tileClassName={(date, view) => 
                        this.doIHaveEventOnThisDate(date) ? classes.tiles : null
                    }
                />
                {this.props.openDialog ? <CalendarDialog/>: <></>}
            </>
        );
    }
}

const mapStateToProps = state => {
    return ({openDialog: state.openDialog})
}

const styles = {
    tiles: {
        backgroundColor: "red"
    }
}

export default withStyles(styles)(connect(mapStateToProps)(CalendarScreen));