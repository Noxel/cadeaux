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
import {connect} from "react-redux";
import { loadGifts, loadGift, openAddGiftDialog, openDelGiftDialog, openUpdateGiftDialog } from "../Actions";
import FabButton from "../components/FabButton";
import DelGiftDialog from '../dialogs/DelGiftDialog';
import AddGiftDialog from '../dialogs/AddGiftDialog';
import UpdateGiftDialog from '../dialogs/UpdateGiftDialog';

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

class PresentsScreen extends Component{

    componentDidMount(){
        this.props.dispatch(loadGifts());
    }

    state = {
        menu : null,
        modal : false,
        value: 0,
        idGift: 0,
    };

    handleClick = event => {
        this.setState({ menu: event.currentTarget});
    };

    handleClose = () => {
        this.setState({ menu: null });
    };

    handleClickModal = (id) => {
        this.props.dispatch(loadGift(id));
    };

    handleClickDialog = (id) => {
        console.log("ID:"+id)
        this.setState({idGift: id})
    }

    render(){
        const { menu } = this.state;
        const open = Boolean(menu);
        const { classes  } = this.props;
        return(
            <div className={classes.container}>
                <List className={classes.root}>
                    {this.props.gifts.map((gift, index) => {
                        return <div key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>{}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={gift.name}
                                    secondary={
                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                            {gift.price === null 
                                                || 
                                            gift.price === undefined ? 
                                                "0" : 
                                            gift.price} €, à offrir à {gift.contact === null ? "Personne" : gift.contact.surname + "" + gift.contact.name} {gift.date === null ? "" : ", le " + new Date(gift.date.date).toLocaleDateString()}
                                        </Typography>
                                    }
                                />
                                <IconButton aria-label={"More"} aria-haspopup={"true"} onClick={this.handleClick}>
                                    <MoreVert/>
                                </IconButton>
                                <Menu id="menu" anchorEl={menu} open={open} onClose={this.handleClose}>
                                    <MenuItem onClick={() => {
                                        this.props.dispatch(openUpdateGiftDialog(true))
                                    }}>
                                        Modifier
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        console.log("ID GIFT:"+gift.id);this.handleClickDialog(gift.id)
                                        this.props.dispatch(openDelGiftDialog(true))
                                    }}>
                                        Supprimer
                                    </MenuItem>
                                </Menu>
                            </ListItem>
                            <Divider variant="fullWidth"/>
                        </div>
                    })}
                </List>
                <FabButton fonct={openAddGiftDialog}/>
                {this.props.openAddGiftDialog ? <AddGiftDialog /> : null}
                {this.props.openDelGiftDialog ? <DelGiftDialog idGift={this.state.idGift} /> : null}
                {this.props.openUpdateGiftDialog ? <UpdateGiftDialog /> : null}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    gifts : state.gifts,
    gift: state.gift,
    openDelGiftDialog: state.openDelGiftDialog,
    openAddGiftDialog: state.openAddGiftDialog,
    openUpdateGiftDialog: state.openUpdateGiftDialog,
});

export default  withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(PresentsScreen)));