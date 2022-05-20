import { Typography } from '@mui/material';
import React from 'react'
import './Header.css';
import { ThemeProvider, useTheme } from '@mui/material/styles';
// import {theme} from './App'

const Header = ({state}) => {
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
    </div>
  )


}

export default Header