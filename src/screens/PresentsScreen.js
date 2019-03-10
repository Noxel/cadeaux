import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withMobileDialog from '@material-ui/core/es/withMobileDialog';
import { connect } from 'react-redux';
import { loadGifts, loadGift, openAddGiftDialog, openDelGiftDialog, loadContacts, requestDates } from '../Actions';
import FabButton from '../components/FabButton';
import DelGiftDialog from '../dialogs/DelGiftDialog';
import AddGiftDialog from '../dialogs/AddGiftDialog';
import UpdateGiftDialog from '../dialogs/UpdateGiftDialog';
import { Grow } from '@material-ui/core/es';

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

class PresentsScreen extends Component {
    componentDidMount() {
        this.props.dispatch(loadGifts());
        this.props.dispatch(loadContacts());
        this.props.dispatch(requestDates());
    }

    state = {
        menu: null,
        modal: false,
        value: 0,
        idGift: 0,
    };

    handleClick = (event, id) => {
        this.setState({ menu: event.currentTarget, idGift: id });
    };

    handleClose = () => {
        this.setState({ menu: null });
    };

    displayUser(gift) {
        // {gift.date === null ? "" : ", le " + new Date(gift.date.date).toLocaleDateString()}
        let res = '';
        if (gift.wishUser !== null) {
            res += ' pour moi même';
        } else if (gift.contact === null) {
            res += ' à offrir à personne';
        } else {
            if (gift.contact === null) {
                res += ' à offrir à personne';
            } else {
                res += ' à offrir à ' + gift.contact.surname + ' ' + gift.contact.name;
                if (gift.date !== null) {
                    res += ', le ' + new Date(gift.date.date).toLocaleDateString();
                }
            }
        }
        return res;
    }

    render() {
        const { menu } = this.state;
        const open = Boolean(menu);
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <List className={classes.root}>
                    {this.props.gifts.map((gift, index) => {
                        return (
                            <Grow in={true} timeout={400 * index < 6000 ? 500 * index : 400} key={index}>
                                <Typography component="div">
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar className={classes.avatar}>{}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={gift.name}
                                            secondary={
                                                <Typography
                                                    component="span"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {gift.price === null || gift.price === undefined ? '0' : gift.price}{' '}
                                                    €,
                                                    {this.displayUser(gift)}
                                                </Typography>
                                            }
                                        />
                                        <IconButton
                                            aria-label={'More'}
                                            aria-haspopup={'true'}
                                            onClick={e => {
                                                this.handleClick(e, gift.id);
                                            }}
                                        >
                                            <MoreVert />
                                        </IconButton>
                                        <Menu id="menu" anchorEl={menu} open={open} onClose={this.handleClose}>
                                            <MenuItem
                                                onClick={() => {
                                                    this.props.dispatch(loadGift(this.state.idGift));
                                                }}
                                            >
                                                Modifier
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    this.handleClose();
                                                    this.props.dispatch(openDelGiftDialog(true));
                                                }}
                                            >
                                                Supprimer
                                            </MenuItem>
                                        </Menu>
                                    </ListItem>

                                    <Divider variant="fullWidth" />
                                </Typography>
                            </Grow>
                        );
                    })}
                </List>
                <FabButton fonct={openAddGiftDialog} />
                {this.props.openAddGiftDialog ? <AddGiftDialog /> : null}
                {this.props.openDelGiftDialog ? <DelGiftDialog idGift={this.state.idGift} /> : null}
                {this.props.openUpdateGiftDialog ? <UpdateGiftDialog /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    gifts: state.gifts,
    gift: state.gift,
    openDelGiftDialog: state.openDelGiftDialog,
    openAddGiftDialog: state.openAddGiftDialog,
    openUpdateGiftDialog: state.openUpdateGiftDialog,
    contacts: state.contacts,
    dates: state.date,
});

export default withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(PresentsScreen)));
