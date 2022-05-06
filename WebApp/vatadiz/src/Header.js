import { Typography } from '@mui/material';
import React from 'react'
import './Header.css';
import TeamChooser from './TeamChooser';
import { ThemeProvider, useTheme } from '@mui/material/styles';
// import {theme} from './App'

const Header = () => {
  // const theme = useTheme();
  return (
    <div className = "Header">
        <Typography variant = "h2" style = {{textAlign: "center"}}>
          RLCS WINTER MAJOR
        </Typography>
        <Typography variant = "h5" style = {{textAlign: "center"}}>
          Team Behavioral Analysis Visualization 
        </Typography>

        <br/>
        <TeamChooser/>
    </div>
  )


}

export default Header