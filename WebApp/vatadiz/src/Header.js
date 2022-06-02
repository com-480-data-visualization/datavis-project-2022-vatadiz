import React, { useEffect, useState, useContext } from 'react';

import { appContext } from './App';
import { Typography } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {motion} from "framer-motion"
// import {theme} from './App'

const Header = () => {
  // const theme = useTheme();
  return (
    <motion.div 
    className = "Header"
    initial = {{opacity: 0, y : -100}}
    animate = {{opacity: 1, y : 0}}
    transition = {{duration: 0.7}}
    >
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
    </motion.div>
  )


}

export default Header