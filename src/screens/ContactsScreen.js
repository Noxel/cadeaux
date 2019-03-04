import React, {Component} from 'react';
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withMobileDialog from "@material-ui/core/es/withMobileDialog";
import connect from "react-redux/es/connect/connect";
import {delContact, loadContact, loadContacts, modalAddContact} from "../Actions";
import FabButton from "../components/FabButton";
import ModalAddContact from "../components/ModalAddContact";

const styles = theme => ({
    root: {
        minWidth: '50%',
        backgroundColor: theme.palette.background.paper,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    inline: {
        display: 'inline',
    },
    avatar: {
        margin: 10,
        backgroundColor: theme.palette.secondary.light,
    },
    container: {
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
    },

});

class ContactsScreen extends Component{

    constructor(props) {
        super(props);
        this.props.dispatch(loadContacts());
    }

    state = {
        menu : null,
        modal : false,
        value: 0,
    };

    handleClick = event => {
        this.setState({ menu: event.currentTarget});
    };
    handleClose = () => {
        this.setState({ menu: null });
    };
    handleClickModal = (id) => {
        this.props.dispatch(loadContact(id));
    };






    render(){
        const { menu } = this.state;
        const open = Boolean(menu);
        const { classes  } = this.props;
        return(
            <div className={classes.container}>
                <List className={classes.root}>

                    {this.props.contacts.map((item, index) => {
                        let birthday = item.birthday? new Date(item.birthday.date) : {};
                        return <div key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>{item.name.charAt(0) + item.surname.charAt(0)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name + ' ' +item.surname}
                                    secondary={
                                        <>
                                            <Typography component="span" className={classes.inline} color="textPrimary">
                                                {item.link ? item.link.username : ''}
                                            </Typography>
                                            {item.birthday ? ' - ' + birthday.getDate()+'/'+(birthday.getMonth()+1)+'/'+birthday.getFullYear() : ''}
                                        </>
                                    }
                                    onClick={()=> {this.handleClickModal(item.id)}}
                                />
                                <IconButton aria-label={"More"} aria-haspopup={"true"} onClick={this.handleClick}>
                                    <MoreVert/>
                                </IconButton>
                                <Menu id="menu" anchorEl={menu} open={open} onClose={this.handleClose}>
                                    <MenuItem onClick={() => {
                                        this.props.dispatch(delContact(item.id))
                                    }}>
                                        Supprimer
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        console.log('Update')
                                    }}>
                                        Modifer
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        console.log('Liste de souhait')
                                    }}>
                                        Liste de souhait
                                    </MenuItem>
                                </Menu>
                            </ListItem>
                            <Divider variant="fullWidth"/>
                        </div>
                    })}
                </List>
                <FabButton fonct={modalAddContact}/>
                <ModalAddContact/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contacts : state.contacts
});

export default  withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(ContactsScreen)));