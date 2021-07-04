import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

/** NavBar
 * 
 * Props:
 * - none
 * 
 * State:
 * - none
 * 
 * App --> NavBar
 */
function NavBar() {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          openSource Cafe
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="NavLink-snacks" to="/snacks">Snacks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="NavLink-drinks" to="/drinks">Drinks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="NavLink-new-item" to="/add">Add an Item!</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;