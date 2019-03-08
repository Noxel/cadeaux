import React, {Component} from 'react';
import Calendar from 'react-calendar';
import {connect} from "react-redux";
import { requestDates, openAddDateDialog, loadContacts } from '../Actions';
import { withStyles } from '@material-ui/core';
import gift from '../assets/img/gift.png';
import FabButton from '../components/FabButton'
import AddDateDialog from '../dialogs/AddDateDialog';
import ScrollTabs from '../components/ScrollTabs';
import SnackbarInfo from '../components/SnackbarInfo';
import DelDateDialog from '../dialogs/DelDateDialog';
import InfoDateDialog from '../dialogs/InfoDateDialog';
import AddContactDialog from '../dialogs/AddContactDialog';
import InfoEventDialog from '../dialogs/InfoEventDialog';

class CalendarScreen extends Component{
    state = {
        id: null,
        currentDay: new Date(),
        date: new Date(),
        dateEventClicked: null,
        giftsDateEvent: [],
        contactsDateEvent: [],
        budget: 0,
        description: "",
        openScrollTabs: false,
        value: null,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.dates !== this.props.dates){
            if(this.state.value !== null) {
                this.requestDateEvent(this.state.value)
            }
        }
    }
    
    componentDidMount(){
        this.props.dispatch(requestDates());
        this.props.dispatch(loadContacts());
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

    getIDOfDay(day){
        let res = -1;
        day = typeof day === 'string' ? new Date(day) : day
        this.props.dates.map(value =>{
            const dateofmap = new Date(value.date)
            return dateofmap.getUTCDate() === day.getUTCDate() && dateofmap.getUTCMonth() === day.getUTCMonth() && dateofmap.getUTCFullYear() === day.getUTCFullYear() ? res = value.id : null
        })
        return res;
    }

    requestDateEvent(day){
        let event = {};
        this.props.dates.map(value =>{
            const dateofmap = new Date(value.date)
            return (
                dateofmap.getUTCDate() === day.getUTCDate()+1 && 
                dateofmap.getUTCMonth() === day.getUTCMonth() && 
                dateofmap.getUTCFullYear() === day.getUTCFullYear() ? event = value : null
            )
        });
        this.setState({
            openScrollTabs: event.id !== undefined ? true : false,
            idDate: event.id,
            dateEventClicked: event.date, 
            contactsDateEvent: event.contacts === undefined || event.contacts === null? [] : event.contacts, 
            giftsDateEvent: event.gifts,
            budget: event.budget === null || event.budget === undefined ? 0 : event.budget,
            description: event.description === null || event.description === undefined ? "Aucune description.." : event.description,
            value: day
        })
    }
    
    render(){
        const {classes} = this.props;
        return(
            <>
                <Calendar
                    className={classes.calendar}
                    onChange={(date) => this.onChange(date)}
                    value={this.state.date}
                    minDate={this.state.currentDay}
                    onClickDay={(value) => {this.requestDateEvent(value)}}
                    tileClassName={(date) =>
                         this.doIHaveEventOnThisDate(date) ? classes.eventTiles : classes.tiles
                    }
                />
                {this.props.openAddDateDialog ? <AddDateDialog /> : null}
                {this.props.openInfoDateDialog ? <InfoDateDialog
                                                    id={this.state.idDate}
                                                    date={this.state.dateEventClicked}
                                                    budget={this.state.budget}
                                                    description={this.state.description}
                                                /> : null}
                {this.props.openDelDateDialog ? <DelDateDialog date={this.getIDOfDay(this.state.dateEventClicked)} /> : null}
                {this.state.openScrollTabs ? <ScrollTabs
                                                id={this.state.idDate}
                                                date={this.state.dateEventClicked}
                                                budget={this.state.budget}
                                                description={this.state.description}
                                                contacts={this.state.contactsDateEvent}
                                                gifts={this.state.giftsDateEvent}
                                            /> : <SnackbarInfo open={this.state.openScrollTabs === false} />
                                            }
                {this.props.openAddContactDialog ?  <AddContactDialog 
                                                        contacts={this.props.contacts} 
                                                        contactsInDate={this.state.contactsDateEvent} 
                                                        idDate={this.state.idDate}
                                                    /> : null }
                {this.props.openInfoEventDialog ?   <InfoEventDialog
                                                        idDate={this.state.idDate}
                                                    />: null}
                <FabButton 
                    fonct={openAddDateDialog}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return ({   dates: state.dates, 
                contacts: state.contacts,
                openAddDateDialog: state.openAddDateDialog,
                openDelDateDialog: state.openDelDateDialog,
                openInfoDateDialog: state.openInfoDateDialog,
                openAddContactDialog: state.openAddContactDialog,
                openInfoEventDialog: state.openInfoEventDialog,
            })
}

const styles = theme => ({
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
    },
})

export default withStyles(styles)(connect(mapStateToProps)(CalendarScreen));