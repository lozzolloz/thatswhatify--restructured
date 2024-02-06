import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { accessToken } from "./spotify";
// import { catchErrors } from "./utils";

import { Login, MainApp } from "./pages";

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  const [token, setToken] = useState(null);
  // const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    // const fetchData = async () => {
    //   const { data } = await getCurrentUserProfile();
    //   setProfile(data);
    // };

    // catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <Router>
              <ScrollToTop />

              <Switch>
                <Route path="/">
                  <MainApp />
                </Route>
              </Switch>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
