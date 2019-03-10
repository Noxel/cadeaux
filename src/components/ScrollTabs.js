import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Gift from '@material-ui/icons/CardGiftcard';
import Add from '@material-ui/icons/PersonAdd';
import Delete from '@material-ui/icons/Delete';
import Info from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import { openDelDateDialog, openInfoDateDialog, openAddContactDialog, openInfoEventDialog } from '../Actions';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        margin: 'auto',
    },
});

class ScrollTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <Tabs
                    classes={{ root: classes.tabs }}
                    value={value}
                    onChange={this.handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {this.props.contacts.map((contact, index) => {
                        return (
                            <Tab
                                key={index}
                                label={contact.name + ' ' + contact.surname}
                                icon={<Gift />}
                                onClick={() => this.props.dispatch(openInfoEventDialog(true, contact))}
                            />
                        );
                    })}
                    <Tab
                        label="Ajouter un contact"
                        icon={<Add />}
                        onClick={() => this.props.dispatch(openAddContactDialog(true))}
                    />
                    <Tab label="Info" icon={<Info />} onClick={() => this.props.dispatch(openInfoDateDialog(true))} />
                    <Tab
                        label="Supprimer"
                        icon={<Delete />}
                        onClick={() => this.props.dispatch(openDelDateDialog(true))}
                    />
                </Tabs>
            </div>
        );
    }
}

ScrollTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(ScrollTabs));
