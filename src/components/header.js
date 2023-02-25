import React from "react";
import PropTypes from "prop-types";
import "./css/header-pixel.scss";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { logout, refreshUser } from "../api/connect";
import {
  salesLocations as salesLocationsAPI,
  blockedUsers as blockedUsersAPI
} from "../api/state";
import { User } from "../api/connect/models";
import { Link, useLocation } from "react-router-dom";

const Header = ({ user, isLogged }) => {

  const dispatch = useDispatch();
  const handleLogout = React.useCallback(() => dispatch(logout()), [dispatch]);

  const handleRefresh = React.useCallback(() => {
    dispatch(refreshUser());
    dispatch(salesLocationsAPI.resetCurrent());
    dispatch(salesLocationsAPI.list());
    dispatch(blockedUsersAPI.setCurrent(null, { update: true }))
  }, [dispatch]);

  const { pathname } = useLocation();

  return (
    <div className="header">
      <div className="header-left" onClick={ handleRefresh }>
        Beethoven { user ? `- ${user.getUsername()}` : null }
      </div>
      <div className="header-right">
        <Link to="menus">
          <Button basic className="button-nav" active={pathname==="/menus"}>
            Menus
          </Button>
        </Link>
        <Link to="sales">
          <Button basic className="button-nav" active = {pathname==="/sales"}>
            Vente
          </Button>
        </Link>
        <Button
          color="red"
          className="button-disconnect"
          onClick = { handleLogout }
          >
          Déconnexion
        </Button>
      </div>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.instanceOf(User),
  isLogged: PropTypes.bool,
}

Header.defaultProps = {
  user: null,
  isLogged: false,
}

export default Header;
