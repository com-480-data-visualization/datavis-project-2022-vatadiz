import React from 'react'
import { Card, CardContent , List, ListItem} from '@mui/material'
import Divider from '@mui/material/Divider';

const Recap = (props) => {
    const data = props.props
    return (
        <Card>
            <CardContent>
            {/* <Typography>
                You are : 
            </Typography> */}
                <List>
                    <ListItem>
                         Average goals : {data.core_goals.toFixed(2)}
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem>
                    Number of shots : {data.core_shots.toFixed(2)}
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem>
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
