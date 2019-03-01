import React, {Component} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
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
    componentDidMount(){
        return this.props.token === null ? this.props.history.push('/login') : null;
    }

    render(){
        console.log(this.props.token)
        return(
            <>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        {this.props.token !== null ? <Navbar /> : null}
                        <Typography variant="h6" color="inherit">
                            App Cadeaux
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Route exact path="/home" render={() => <Home/>}/>
                <Route exact path="/login" render={() => this.props.token === null ? <Login/> : <Redirect to="/home"/>}/>
                <Route exact path="/logout" render={() => <Redirect to="/"/>}/>
                <Route exact path="/registration" render={() => this.props.token === null ? <Registration/> : <Redirect to="/home"/>}/>
                <Route exact path="/profile" render={() => <ProfileScreen/>}/>
                <Route exact path="/calendar" render={() => <CalendarScreen/>}/>
                <Route exact path="/presents" render={() => <PresentsScreen/>}/>
                <Route exact path="/contacts" render={() => <ContactsScreen/>}/>
                <Route exact path="/" render={() => 
                    this.props.token !== null ? <Redirect to="/home"/> : <Redirect to="/login"/>    
                }/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        token: state.token
    }
};

export default withRouter(connect(mapStateToProps)(HomeScreen));
