import React, { useEffect, useState, useContext } from 'react';
import { appContext } from './App';
import { Typography } from '@mui/material';
import './Header.css';
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
    </div>
  )


}

export default Header