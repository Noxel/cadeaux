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
import { delGift, loadGift, loadWish, openAddGiftDialog } from '../Actions';
import FabButton from '../components/FabButton';
import Grow from '@material-ui/core/Grow';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import DialogTitle from '@material-ui/core/es/DialogTitle/DialogTitle';
import DialogActions from '@material-ui/core/es/DialogActions/DialogActions';
import Button from '@material-ui/core/Button';
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
    not: {},
});

class WishList extends Component {
    constructor(props) {
        super(props);
        if (this.props.idContact) this.props.dispatch(loadWish(this.props.idContact));
        else this.props.dispatch(loadWish());
    }

    state = {
        menu: null,
        modal: false,
        confDel: false,
        value: 0,
        id: '',
    };

    handleClick = (event, id) => {
        this.setState({ menu: event.currentTarget, id: id });
    };
    handleClose = () => {
        this.setState({ menu: null });
    };

    render() {
        const { menu } = this.state;
        const open = Boolean(menu);
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <List className={classes.root}>
                    {this.props.wishs.length > 0 ? (
                        this.props.wishs.map((item, index) => {
                            return (
                                <Grow in={true} timeout={400 * index < 6000 ? 500 * index : 400} key={index}>
                                    <div>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar className={classes.avatar}>{}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={
                                                    <Typography
                                                        component="span"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {item.price ? item.price : '0€'}
                                                    </Typography>
                                                }
                                            />
                                            {this.props.idContact ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <IconButton
                                                        aria-label={'More'}
                                                        aria-haspopup={'true'}
                                                        onClick={e => {
                                                            this.handleClick(e, item.id);
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
                                                                this.props.dispatch(loadGift(this.state.id));
                                                            }}
                                                        >
                                                            Modifier
                                                        </MenuItem>
                                                    </Menu>
                                                </>
                                            )}
                                        </ListItem>
                                        <Divider variant="fullWidth" />
                                    </div>
                                </Grow>
                            );
                        })
                    ) : (
                        <ListItem alignItems="flex-start"> {'Rien à afficher'} </ListItem>
                    )}
                </List>
                {this.props.idContact ? (
                    <></>
                ) : (
                    <>
                        <FabButton fonct={openAddGiftDialog} />
                        <AddGiftDialog me={true} />
                        {this.props.openUpdateGiftDialog ? <UpdateGiftDialog /> : null}
                        <Dialog open={this.state.confDel} disableEnforceFocus>
                            <DialogTitle>{'Voulez-vous supprimer cet élément ? '}</DialogTitle>
                            <DialogActions>
                                <Button
                                    onClick={() => {
                                        this.props.dispatch(delGift(this.state.id, true));
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
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    wishs: state.wishs,
    openUpdateGiftDialog: state.openUpdateGiftDialog,
});

export default withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(WishList)));
