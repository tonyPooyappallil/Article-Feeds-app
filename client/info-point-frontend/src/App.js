import "./App.css";
import Routing from "./Routing";
import { AppContext, UserContext } from "./context";
import { useState } from "react";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [user, setUserContext] = useState({});

  const value1 = { loggedIn, setLogin };
  const value2 = { user, setUserContext };

  return (
    <div className="App">
      <AppContext.Provider value={value1}>
        <UserContext.Provider value={value2}>
          <Routing />
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
