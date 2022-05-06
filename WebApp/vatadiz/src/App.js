import Header from './Header';
import './App.css';
import Content from './Content';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';

// https://mui.com/material-ui/customization/color/
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#1a237e",
      light: "#534bae",
      dark: "#000051",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#bbdefb",
      light: "#eeffff",
      dark: "#8aacc8",
      contrastText: "#263238"
    },
  },
})
  
function handleContext(state, action) {
  let newState = JSON.parse(JSON.stringify(state))
  console.log(state,action)
  switch (action.type) {
    case "teamChoose":
      newState.team_id = action.data
      newState.match_id = ""
      newState.game_id = ""
      break;
    case "click":
      newState.match_id = action.data.match_id
      break;
    default:
      break;
  }
  return newState
}

const initialeState = {
  "team_id": "",
  "match_id": "",
  "game_id": ""
}
const appContext = React.createContext()


function App() {
  const [state, dispatcher] = React.useReducer(handleContext, initialeState)
  
  

  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline/>
      <appContext.Provider value={{ state, dispatcher }}>
        <main>
          <Box className="App">
              <Header />
              <Content state={state} />
          </Box>
        </main>
     </appContext.Provider>
        
    </ThemeProvider>
  );
}

export { appContext }
export default App;
