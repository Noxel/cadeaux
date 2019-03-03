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
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

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
    item: {
    }

});

class ContactsScreen extends Component{

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
    handleClickModal = () => {
        this.setState({ modal: true});
    };
    handleCloseModal = () => {
        this.setState({ modal: false});
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };




    render(){
        const { menu } = this.state;
        const open = Boolean(menu);
        console.log(this.props)
        const { classes, theme, fullScreen  } = this.props;
        return(
            <div className={classes.container}>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start"  >
                        <ListItemAvatar>
                            <Avatar  className={classes.avatar}>BT</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Billou the un"
                            secondary={
                                <>
                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                        a
                                    </Typography>
                                    {" — 2019-03-03"}
                                </>
                            }
                            onClick={this.handleClickModal}
                        />
                        <IconButton aria-label={"More"} aria-haspopup={"true"} onClick={this.handleClick}>
                            <MoreVert/>
                        </IconButton>
                        <Menu  id="menu" anchorEl={menu} open={open} onClose={this.handleClose}>
                            <MenuItem onClick={()=>{console.log('Supprimer')}}>
                            Supprimer
                            </MenuItem>
                            <MenuItem onClick={()=>{console.log('Update')}}>
                                Modifer
                            </MenuItem>
                        </Menu>
                    </ListItem>

                    <Divider variant="fullWidth" />

                    <Dialog
                        fullScreen={fullScreen}
                        open={this.state.modal}
                        onClose={this.handleCloseModal}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{"Bilou the un"}</DialogTitle>
                        <Divider variant="fullWidth" />
                        <DialogContent>
                            <Tabs value={this.state.value}  indicatorColor="primary" textColor={"primary"} variant={"fullWidth"} onChange={this.handleChange}>
                                <Tab label="Information" />
                                <Tab label="Cadeaux" />
                                <Tab label="Date" />
                            </Tabs>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}
                            >
                                <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>Information </Typography>
                                <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>Cadeaux </Typography>
                                <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>Date </Typography>
                            </SwipeableViews>

                        </DialogContent>
                        <Divider variant="fullWidth" />
                        <DialogActions>
                            <Button onClick={this.handleCloseModal} color="secondary" autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </List>
            </div>
        );
    }
}



export default  withMobileDialog()(withStyles(styles, { withTheme: true })(ContactsScreen));