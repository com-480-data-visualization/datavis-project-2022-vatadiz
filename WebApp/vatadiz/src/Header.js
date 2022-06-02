import React, { useEffect, useState, useContext } from 'react';

import { appContext } from './App';
import { Typography } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
// import {theme} from './App'

const Header = () => {
  // const theme = useTheme();
  return (
    <div className = "Header">
      <div>
        <img className="MainLogo" src={require("./data/rlcs_wm_logo.png")} alt="logo"></img>
      </div>
      <Typography className="SubTitle" style = {{textAlign: "center", 
                                                fontFamily:'Raleway',
                                                fontSize: 35,
                                                fontWeight: 200}}>
        TEAM BEHAVIORAL ANALYSIS - VISUALIZATION 
      </Typography>
      <br/>
    </div>
  )


}

export default Header