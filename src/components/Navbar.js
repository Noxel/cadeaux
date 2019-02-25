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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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


    render(){
        const { classes } = this.props;
        const listItems = ['Accueil', 'Mon profil', 'Calendrier', 'Cadeaux', 'Contacts', 'Déconnexion'];
        const linkItems = ['/', '/profile', '/calendar', '/presents', '/contacts', '/'];
        return(
            <>
                <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer
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
                    <IconButton className={classes.iconChevron} onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Divider />
                    <List color="primary">
                    {listItems.map((text, index) => (
                        <Link className={classes.link} to={linkItems[index]}>
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index === 0  ? <HomeIcon /> : <></>}
                                    {index === 1  ? <ProfileIcon /> : <></>}
                                    {index === 2  ? <CalendarIcon /> : <></>}
                                    {index === 3  ? <StarIcon /> : <></>}
                                    {index === 4  ? <ContactsIcon /> : <></>}
                                    {index === 5  ? <UndoIcon /> : <></>}
                                </ListItemIcon>
                            <ListItemText primary={text} />
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
    },
    link: {
        textDecoration: 'none'
    }
};

export default withStyles(styles, { withTheme: true })(Navbar);