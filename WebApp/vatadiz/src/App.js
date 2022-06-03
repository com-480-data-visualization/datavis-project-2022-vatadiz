import './App.css';
import Header from './Header';
import Content from './Content';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import Popup from './Popup';
import { initialMetricFactors } from './InteractiveMetric';
import MetricAccess from './MetricAccess';

// https://mui.com/material-ui/customization/color/
export const theme = createTheme({
  typography:{
    fontFamily: [
      'Raleway',
      'Jost'
    ].join(",")
  },
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
  
function handleStateContext(state, action) {
  state = JSON.parse(JSON.stringify(state))
  // console.log(state,action)
  switch(action.type) {
    case "select_team_id":
      state.team_id = action.data
      state.match_id = ""
      state.game_id = ""
      break;
    case "select_match_id":
      state.match_id = action.data
      state.game_id = ""
      break;
    case "select_game_id":
        state.game_id = action.data
        break;
    case "select_metric_factor":
      state.factors = action.data
      state.positiveSum = Object.values(state.factors).reduce((acc, v) => acc + (v >= 0 ? v : 0))
      state.negativeSum = Object.values(state.factors).reduce((acc, v) => acc + (v < 0 ? v : 0))
      return state;
    default:
      break;
  }
  return state
}


const initialState = {
  team_id: "",
  match_id: "",
  game_id: "",
  open_popup: true,
  factors: initialMetricFactors,
  positiveSum:  Object.values(initialMetricFactors).reduce((acc, v) => acc + (v >= 0 ? v : 0)),
  negativeSum:  Object.values(initialMetricFactors).reduce((acc, v) => acc + (v < 0 ? v : 0))
}

const appContext = React.createContext()

function App() {
  const [state, dispatcher] = React.useReducer(handleStateContext, initialState)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <appContext.Provider value={{ state, dispatcher }}>
          <main>
            <Box className="App">
              <Header/>
              <Popup/>  
              <Content/>
              <MetricAccess/>
            </Box>
          </main>  
     </appContext.Provider>
    </ThemeProvider>
  );
}

export { appContext }
export default App;
