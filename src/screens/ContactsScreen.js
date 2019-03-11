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
import connect from 'react-redux/es/connect/connect';
import { delContact, loadContact, loadContacts, MODAL_LINKCONTACT, modalAddContact } from '../Actions';
import FabButton from '../components/FabButton';
import ModalAddContact from '../dialogs/ModalAddContact';
import ModalUpdateContact from '../dialogs/ModalUpdateContact';
import ModalLinkContact from '../dialogs/ModalLinkContact';
import Grow from '@material-ui/core/Grow';
import ModalContact from '../dialogs/ModalContact';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import DialogTitle from '@material-ui/core/es/DialogTitle/DialogTitle';
import DialogActions from '@material-ui/core/es/DialogActions/DialogActions';
import Button from '@material-ui/core/Button';
import WishList from '../components/WishList';

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

class ContactsScreen extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(loadContacts());
    }

    state = {
        menu: null,
        modal: false,
        confDel: false,
        wish: false,
        value: 0,
        item: '',
    };

    handleClick = (event, item) => {
        this.setState({ menu: event.currentTarget, item: item });
    };
    handleClose = () => {
        this.setState({ menu: null });
    };
    handleClickModal = id => {
        this.props.dispatch(loadContact(id));
    };

    render() {
        const { menu } = this.state;
        const open = Boolean(menu);
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <List className={classes.root}>
                    {this.props.contacts.map((item, index) => {
                        let birthday = item.birthday ? new Date(item.birthday.date) : {};
                        return (
                            <Grow in={true} timeout={400 * index < 6000 ? 500 * index : 400} key={index}>
                                <div>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar className={classes.avatar}>
                                                {item.name.charAt(0) + item.surname.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.name + ' ' + item.surname}
                                            secondary={
                                                <>
                                                    <Typography
                                                        component="span"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {item.link ? item.link.username : ''}
                                                    </Typography>
                                                    {item.birthday
                                                        ? ' - ' +
                                                          birthday.getDate() +
                                                          '/' +
                                                          (birthday.getMonth() + 1) +
                                                          '/' +
                                                          birthday.getFullYear()
                                                        : ''}
                                                </>
                                            }
                                            onClick={() => {
                                                this.handleClickModal(item.id);
                                            }}
                                        />
                                        <IconButton
                                            aria-label={'More'}
                                            aria-haspopup={'true'}
                                            onClick={e => {
                                                this.handleClick(e, item);
                                            }}
                                        >
                                            <MoreVert />
                                        </IconButton>
                                        <Menu anchorEl={menu} open={open} onClose={this.handleClose}>
                                            <MenuItem
                                                onClick={() => {
                                                    this.setState({ confDel: true });
                                                }}
                                            >
                                                Supprimer
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    this.props.dispatch(loadContact(this.state.item.id, true));
                                                }}
                                            >
                                                Modifier
                                            </MenuItem>

                                            {this.state.item.link ? (
                                                <MenuItem
                                                    onClick={() => {
                                                        console.log(this.state.item.id);
                                                        this.setState({ wish: true });
                                                    }}
                                                >
                                                    List de souhait
                                                </MenuItem>
                                            ) : (
                                                <MenuItem
                                                    onClick={() => {
                                                        this.props.dispatch({
                                                            type: MODAL_LINKCONTACT,
                                                            modal: true,
                                                            id: this.state.item.id,
                                                        });
                                                    }}
                                                >
                                                    Connecter
                                                </MenuItem>
                                            )}
                                        </Menu>
                                    </ListItem>
                                    <Divider variant="fullWidth" />
                                </div>
                            </Grow>
                        );
                    })}
                </List>
                <FabButton fonct={modalAddContact} />
                <ModalAddContact />
                <ModalUpdateContact />
                <ModalLinkContact idLinkContact={this.state.item.id} />
                <ModalContact />
                <Dialog open={this.state.confDel} disableEnforceFocus>
                    <DialogTitle>{'Voulez-vous supprimer cet élément ? '}</DialogTitle>
                    <Divider variant="fullWidth" />
                    <DialogActions>
                        <Button
                            onClick={() => {
                                this.props.dispatch(delContact(this.state.item.id));
                                this.setState({ confDel: false, menu: null });
                            }}
                            color="secondary"
                            autoFocus
                        >
                            Accepter
                        </Button>
                        <Button
                            onClick={() => {
                                this.setState({ confDel: false });
                            }}
                            color="primary"
                            autoFocus
                        >
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.wish} disableEnforceFocus>
                    <DialogTitle>{'List de souhait '}</DialogTitle>
                    <Divider variant="fullWidth" />
                    <WishList idContact={this.state.item.id} />
                    <Divider variant="fullWidth" />
                    <DialogActions>
                        <Button
                            onClick={() => {
                                this.setState({ wish: false });
                            }}
                            color="primary"
                            autoFocus
                        >
                            Quitter
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contacts: state.contacts,
});

export default withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(ContactsScreen)));
