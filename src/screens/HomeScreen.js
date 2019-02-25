import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class HomeScreen extends Component{
    render(){
        return(
            <>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Cadeaux
                        </Typography>
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}

export default HomeScreen;