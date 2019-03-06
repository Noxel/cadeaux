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
import ResetPassword from "../forms/ResetPassword";
import Badge from "@material-ui/core/Badge";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import MailIcon from '@material-ui/icons/Mail';
import {IconButton} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import Grow from "@material-ui/core/Grow";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import {accepteRequest, deleteRequest} from "../Actions";


const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
    root: {
        backgroundColor: theme.palette.background.paper,
    },
});

class HomeScreen extends Component{
    componentDidMount(){
        return this.props.token === null ? this.props.history.push('/login') : null;
    }

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        if(this.props.user.request.length > 0)
        this.setState({
            anchorEl: event.currentTarget,
        });
    };


    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render(){
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return(
            <>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        {this.props.token !== null ? <Navbar /> : null}
                        <Typography variant="h6" color="inherit">
                            App Cadeaux
                        </Typography>
                        <div style={{flexGrow: 1}} />
                        {this.props.token ?
                            <>
                                <IconButton color="inherit" onClick={this.handleClick} >
                                    <Badge badgeContent={this.props.user.request.length} color="secondary">
                                        <MailIcon/>
                                    </Badge>
                                </IconButton>
                                <Popover
                                    id="requestPopper"
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={this.handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Typography component="div" className={classes.typography}>
                                        <List className={classes.root}>
                                            {this.props.user.request.map((item,index)=> (
                                                <Grow in={true} timeout={300*index} key={index} >
                                                    <>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemText primary={this.props.user.request[index].user.username+" vous veut dans ces contact"}/>
                                                        <ListItemIcon  onClick={()=>{
                                                                this.handleClose()
                                                                this.props.dispatch(accepteRequest(item.id))}
                                                            } aria-label="Accepte" >
                                                                <DoneIcon color="secondary"/>
                                                        </ListItemIcon>
                                                        <ListItemIcon  onClick={() => {
                                                                this.handleClose()
                                                                this.props.dispatch(deleteRequest(item.id))}
                                                            } aria-label="Refuse">
                                                                <CloseIcon color="primary"/>
                                                        </ListItemIcon>
                                                    </ListItem>
                                                    <Divider variant="fullWidth"/>
                                                    </>
                                                </Grow>
                                            ))}
                                        </List>
                                    </Typography>
                                </Popover>
                            </>
                            : <></>
                        }
                    </Toolbar>
                </AppBar>
                <Route exact path="/home" render={() => <Home/>}/>
                <Route exact path="/login" render={() => this.props.token === null ? <Login/> : <Redirect to="/home"/>}/>
                <Route exact path="/logout" render={() => <Redirect to="/"/>}/>
                <Route exact path="/registration" render={() => this.props.token === null ? <Registration/> : <Redirect to="/home"/>}/>
                <Route exact path="/resetPassword" render={() => <ResetPassword/>}/>
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

export default withRouter( withStyles(styles)(connect(mapStateToProps)(HomeScreen)));
