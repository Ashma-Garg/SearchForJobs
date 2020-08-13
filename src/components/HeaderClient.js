import React, { Component } from 'react';
import {  Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

      logout(){
          localStorage.removeItem("tokenClient");
          window.location.href='/client';
      }
    render() {
        return(
            <div>
                <Navbar className="navbar-dark bg-dark" expand="md">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href={'/jobs/'+this.props.id}>STI</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to={'/jobs/'+this.props.id}><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button style={{margin:"5px"}} ><span className="fa fa-user fa-lg pr-3"></span>{this.props.name}</Button>
                                </NavItem>
                                <NavItem>
                                    <Button style={{margin:"5px"}} onClick={()=>this.logout()}><span className="fa fa-sign-out fa-lg pr-3"></span>Logout</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                </Navbar>
                </div>
        );
    }
}

export default Header;