import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@material-ui/core';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ContactsIcon from '@material-ui/icons/Contacts';
import CalendarIcon from '@material-ui/icons/EventNote';
import StarIcon from '@material-ui/icons/Stars';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import UndoIcon from '@material-ui/icons/Undo';

class Navbar extends Component{

    state = {
        left: false,
        open: false,
      };

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    icon = (index) => {
        switch (index) {
            case 0 :
                return <HomeIcon/>;
            case 1 :
                return <ProfileIcon/>;
            case 2 :
                return <CalendarIcon/>;
            case 3 :
                return <StarIcon/>;
            case 4 :
                return <ContactsIcon/>;
            case 5 :
                return <UndoIcon/>;
            default:
                break;
        }
    }



    render(){
        const { classes } = this.props;
        const listItems = ['Accueil', 'Mon profil', 'Calendrier', 'Cadeaux', 'Contacts', 'Déconnexion'];
        const linkItems = ['/', '/profile', '/calendar', '/presents', '/contacts', '/login'];
        return(
            <>
                <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                classes={{paper: classes.swipe}}
                open={this.state.left}
                onClose={this.toggleDrawer('left', false)}
                onOpen={this.toggleDrawer('left', true)}
                >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                >
                    <List>
                        <ListItem button>
                            <ListItemIcon classes={{root: classes.iconChevron}} onClick={this.handleDrawerClose} aria-label="menu">
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText classes={{primary: classes.list}}>
                                    App Cadeaux
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List >
                    {listItems.map((text, index) => (
                        <Link key={index} className={classes.link} to={linkItems[index]}>
                            <ListItem button key={text}>
                                <ListItemIcon classes={{root: classes.list}}>
                                    {this.icon(index)}
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.list}} primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                    </List>
                    <Divider />
                </div>
                </SwipeableDrawer>
            </>
        );
    }
}

const styles = {
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
      color: 'inherit'
    },
    iconChevron: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
    },
    link: {
        textDecoration: 'none'
    },
    swipe: {
        backgroundColor: '#f44336'
    },
    list: {
        color: 'white'
    }
};

export default withStyles(styles, { withTheme: true })(Navbar);
