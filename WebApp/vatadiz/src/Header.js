import { Typography } from '@mui/material';
import React from 'react'
import './Header.css';
import TeamChooser from './TeamChooser';
const Header = () => {
    
  return (
    <div className = "Header">
        <Typography variant = "h2" style = {{textAlign: "center"}}>
            VataDiz
        </Typography>
        <Typography components = "div">
        Lorem ipsum dolor sit amet. Vel voluptas eligendi est minima quasi aut similique natus. Qui architecto amet hic accusam
        </Typography>
        <br/>
        <TeamChooser/>
    </div>
  )


}

export default Header