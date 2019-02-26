import React, {Component} from 'react';
import Calendar from 'react-calendar';
import {connect} from "react-redux";
import CalendarDialog from '../components/CalendarDialog';
import { openDialog } from '../Actions';

class CalendarScreen extends Component{
    state = {
        currentDay: new Date(),
        date: new Date(),
    }
    
      onChange = date => this.setState({ date })
    
    render(){
        return(
            <>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    minDate={this.state.currentDay}
                    onClickDay={(value) => {this.props.dispatch(openDialog(true))}}
                />
                {this.props.openDialog ? <CalendarDialog/>: <></>}
            </>
        );
    }
}

const mapStateToProps = state => {
    return ({openDialog: state.openDialog})
}

export default connect(mapStateToProps)(CalendarScreen);