import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/Navbar';
import ProfileScreen from './ProfileScreen';
import CalendarScreen from './CalendarScreen';
import PresentsScreen from './PresentsScreen';
import ContactsScreen from './ContactsScreen';
import Home from '../components/Home';
import Registration from "../forms/Registration";
import Login from "../forms/Login";
import {connect} from "react-redux";

class HomeScreen extends Component{
    render(){
        if(this.props.user === null)
            return (
                <>
                    <Route exact path="/" render={() => <Login/>}/>
                    <Route exact path="/registration" render={() => <Registration/>}/>
                </>
            );
        return(
            <>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Navbar />
                        <Typography variant="h6" color="inherit">
                            App Cadeaux
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Route exact path="/" render={() => <Home/>}/>
                <Route exact path="/profile" render={() => <ProfileScreen/>}/>
                <Route exact path="/calendar" render={() => <CalendarScreen/>}/>
                <Route exact path="/presents" render={() => <PresentsScreen/>}/>
                <Route exact path="/contacts" render={() => <ContactsScreen/>}/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(HomeScreen);
