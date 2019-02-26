import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/Navbar';

class HomeScreen extends Component{
    render(){
        return(
            <>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Navbar />
                            <Typography variant="h6" color="inherit">
                                App Cadeaux
                            </Typography>
                        </Toolbar>
                    </AppBar>
            </>
        );
    }
}



export default HomeScreen;