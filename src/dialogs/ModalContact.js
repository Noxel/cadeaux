import React, { Component } from 'react';
import withMobileDialog from '@material-ui/core/es/withMobileDialog/withMobileDialog';
import withStyles from '@material-ui/core/es/styles/withStyles';
import connect from 'react-redux/es/connect/connect';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { MODAL_CONTACT } from '../Actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class modalContact extends Component {
    handleCloseModal = () => {
        this.props.dispatch({
            type: MODAL_CONTACT,
            modal: false,
        });
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    state = {
        value: 0,
    };

    render() {
        const { classes, theme, fullScreen } = this.props;
        let birthday = this.props.contact.birthday ? new Date(this.props.contact.birthday.date) : {};
        return (
            <Dialog
                fullScreen={fullScreen}
                open={this.props.modal}
                onClose={this.handleCloseModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {this.props.contact.name + ' ' + this.props.contact.surname}
                </DialogTitle>
                <Divider variant="fullWidth" />
                <DialogContent>
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor={'primary'}
                        variant={'fullWidth'}
                        onChange={this.handleChange}
                    >
                        <Tab label="Information" />
                        <Tab label="Cadeaux" />
                        <Tab label="Dates" />
                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                            <p>
                                <b>Nom :</b> {this.props.contact.name}
                            </p>
                            <p>
                                <b>Prénom :</b> {this.props.contact.surname}
                            </p>
                            <p>
                                <b>Utilisateur associé :</b>{' '}
                                {this.props.contact.link ? this.props.contact.link.username : ''}
                            </p>
                            <p>
                                <b>Date d'anniversaire :</b>{' '}
                                {this.props.contact.birthday
                                    ? birthday.getDate() +
                                      '/' +
                                      (birthday.getMonth() + 1) +
                                      '/' +
                                      birthday.getFullYear()
                                    : ''}
                            </p>
                        </Typography>

                        <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                            <List className={classes.root}>
                                {this.props.contact.gifts.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={item.name}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                            >
                                                                {item.price ? item.price + ' €' : '-- €'}
                                                            </Typography>
                                                        </>
                                                    }
                                                    onClick={() => {
                                                        console.log('modalGift(' + item.id + ')');
                                                    }}
                                                />
                                            </ListItem>
                                            <Divider variant="fullWidth" />
                                        </div>
                                    );
                                })}
                            </List>
                        </Typography>

                        <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                            <List className={classes.root}>
                                {this.props.contact.dates.map((item, index) => {
                                    let date = item.date ? new Date(item.date) : {};
                                    return (
                                        <div key={index}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={
                                                        date.getDate() +
                                                        '/' +
                                                        (date.getMonth() + 1) +
                                                        '/' +
                                                        date.getFullYear()
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                            >
                                                                {item.description ? item.description : ''}
                                                            </Typography>
                                                        </>
                                                    }
                                                    onClick={() => {
                                                        console.log('modalDate(' + item.id + ')');
                                                    }}
                                                />
                                            </ListItem>
                                            <Divider variant="fullWidth" />
                                        </div>
                                    );
                                })}
                            </List>
                        </Typography>
                    </SwipeableViews>
                </DialogContent>
                <Divider variant="fullWidth" />
                <DialogActions>
                    <Button onClick={this.handleCloseModal} color="secondary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    contact: state.contact,
    modal: state.modalContact,
});

export default withMobileDialog()(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(modalContact)));
