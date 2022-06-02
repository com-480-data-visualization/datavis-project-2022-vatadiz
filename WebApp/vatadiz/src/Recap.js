import React from 'react'
import { Card, CardContent , List, ListItem, Typography} from '@mui/material'
import Divider from '@mui/material/Divider';

const Recap = (props) => {
    const data = props.props
    return (
        <Card>
            <CardContent>
            <Typography>
                Average statistics per match
            </Typography>
                <List>
                    <ListItem>
                        Goals : {data.core_goals.toFixed(2)}
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem>
                        Shots : {data.core_shots.toFixed(2)}
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem>
                        Saves : {data.core_saves.toFixed(2)}
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem>
                        Assists : {data.core_assists.toFixed(2)}
                    </ListItem>
                </List>
                {/* <Typography>
                    You want to talk about :
                </Typography> */}
                <List>
                
                    <ListItem>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

export default Recap
