import Header from './Header';
import './App.css';
import Content from './Content';
import * as React from 'react';

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
    <div className="App">
      <appContext.Provider value={{ state, dispatcher }}>
        <Header />
        <Content state={state} />
      </appContext.Provider>
    </div>
  );
}

export { appContext }
export default App;
