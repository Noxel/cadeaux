import React, {Component} from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/Navbar';

class HomeScreen extends Component{
    render(){
        return(
            <>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Navbar />
                            <Typography variant="h6" color="inherit">
                                App Cadeaux
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </>
        );
    }
}

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#f6685e',
        main: '#f44336',
        dark: '#aa2e25',
      },
      secondary: {
        light: '#68b36b',
        main: '#43a047',
        dark: '#2e7031',
      }
    }
  })

export default HomeScreen;