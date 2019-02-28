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
        nextDay: new Date().getDate()+1, /// nop ça marche pas ça sinon tu arrive a des jour du type 33 :p
        neDay: new Date().getDate()+5, /// si tu veut faire le jour d'apres faut utiliser les time stamp ^^
        nextMonth: new Date().getMonth()+1,
        event: [new Date(2019, 2, 2), new Date(2019, 2, 7), new Date(2019, 2, 8) ] // :D

    }
    
    onChange = date => this.setState({ date })

    doIHaveEventOnThisDate(day){
        console.log(day.date.getDate())
        //const tab = [this.state.nextDay, this.state.neDay, this.state.currentDay] ************** nop :p
        //const res = tab.find((date, index) => date === day.date.getDate()) !== undefined   **************  a chaque date on check si un event correspond du coup map et non find
        //console.log(res)
        const tab = this.state.event
        let res = false;
        tab.map(value =>{
            console.log("value " + value);
            return value.getUTCDate() === day.date.getUTCDate() && value.getUTCMonth() === day.date.getUTCMonth() && value.getUTCFullYear() === day.date.getUTCFullYear() ? res = true : null
        })
        return res
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
                    tileClassName={(date) =>
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