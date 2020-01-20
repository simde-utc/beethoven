import React from 'react';
import { ConnexionModal } from "./components/modals";
import { getUser, isLogged, refreshUser } from "./api/connect";
import {
  salesLocations as salesLocationsAPI,
  blockedUsers as blockedUsersAPI
} from "./api/state";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/header";
import { Switch, Route, Redirect } from "react-router-dom";
import Sales from "./pages/sales/container";
import Menus from "./pages/menus/container";
import WebSocketManager from "./utils/websocket";

const App = () => {
  const [isLoading, setLoading] = React.useState(true);

  const { user, logged } = useSelector(state => ({ user: getUser(state), logged: isLogged(state)}));
  const dispatch = useDispatch();

  const relog = React.useCallback(() => dispatch(refreshUser()), [dispatch]);
  const fetchSalesLocations = React.useCallback(() => dispatch(salesLocationsAPI.list()), [dispatch]);
  const fetchBlockedUsers = React.useCallback(() => dispatch(blockedUsersAPI.setCurrent(null, { update: true })), [dispatch])

  React.useEffect(() => {
    setLoading(false);
    relog();

    if(logged) {
      fetchSalesLocations();
      fetchBlockedUsers();
    }
  }, [relog, logged, fetchSalesLocations, fetchBlockedUsers]);

  if(isLoading) {
    return null;
  }

  return (
    <div>
      <WebSocketManager/>
      <ConnexionModal open={!logged}/>
        <Header user={ user } isLogged={logged}/>
        <div className="application-container">
          <Switch>
            <Route exact path="/sales" component={ Sales }/>
            <Route path="/menus" component={ Menus }/>
            <Redirect to="/sales"/>
          </Switch>
        </div>
    </div>
  )
}


export default App;
