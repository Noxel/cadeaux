import React, {Component} from 'react';
import Calendar from 'react-calendar';
import {connect} from "react-redux";
import CalendarDialog from '../components/CalendarDialog';
import { openDialog, requestDates, openAddDateDialog } from '../Actions';
import { withStyles } from '@material-ui/core';
import gift from '../assets/img/gift.png';
import FabButton from '../components/FabButton'
import AddDateDialog from '../dialogs/AddDateDialog';

class CalendarScreen extends Component{
    state = {
        currentDay: new Date(),
        date: new Date(),
        dateEventClicked: null,
        giftsDateEvent: [],
        contactsDateEvent: [],
        budget: 0,
        description: ""
    }
    
    componentDidMount(){
        this.props.dispatch(requestDates());
    }

    onChange = date => this.setState({ date })

    doIHaveEventOnThisDate(day){
        let res = false;
        this.props.dates.map(value =>{
            const dateofmap = new Date(value.date)
            return dateofmap.getUTCDate() === day.date.getUTCDate()+1 && dateofmap.getUTCMonth() === day.date.getUTCMonth() && dateofmap.getUTCFullYear() === day.date.getUTCFullYear() ? res = true : null
        })
        return res;
    }

    requestDateEvent(day){
        console.log(day)
        let res = null;
        console.log(this.props.dates)
        this.props.dates.map(value =>{
            const dateofmap = new Date(value.date)
            return (
                dateofmap.getUTCDate() === day.getUTCDate()+1 && 
                dateofmap.getUTCMonth() === day.getUTCMonth() && 
                dateofmap.getUTCFullYear() === day.getUTCFullYear() ? res = value : res = day
            )
        })
        let date = res === day ? day : res.date;
        console.log("Date fct");
        console.log(date)
        let contacts = res.contacts === null ? [] : res.contacts;
        let gifts = res.gifts === null ? [] : res.gifts;
        this.setState({
            dateEventClicked: date, 
            contactsDateEvent: contacts, 
            giftsDateEvent: gifts,
            budget: res.budget === null ? 0 : res.budget,
            description: res.description
        });
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
                    onClickDay={(value) => {this.props.dispatch(openDialog(true, this.requestDateEvent(value)))}}
                    tileClassName={(date) =>
                         this.doIHaveEventOnThisDate(date) ? classes.eventTiles : classes.tiles
                    }
                />
                {this.props.openDialog ?    <CalendarDialog 
                                                date={this.state.dateEventClicked}
                                                budget={this.state.budget}
                                                description={this.state.description}
                                                contacts={this.state.contactsDateEvent}
                                                gifts={this.state.giftsDateEvent}
                                            />: <></>}
                {this.props.openAddDateDialog ? <AddDateDialog /> : null}
                <FabButton fonct={openAddDateDialog}/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return ({openDialog: state.openDialog, dates: state.dates, openAddDateDialog: state.openAddDateDialog})
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