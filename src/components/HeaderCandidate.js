import React, { Component } from 'react';
import {  Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../Header.css';

class HeaderCand extends Component {
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
          localStorage.removeItem("token");
          window.location.href=`/`;
      }

    render() {
        return(
                <Navbar className="bg-dark navbar-dark" fixedtop="true" expand="md">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href={'/candidateJob/'+this.props.id}>STI</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to={'/candidateJob/'+this.props.id}><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to={'/appliedJob/'+this.props.id}><span className="fa fa-info fa-lg"></span> Applied Jobs</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button style={{margin:"5px"}}><span className="fa fa-user fa-lg pr-3"></span>{this.props.name}</Button>
                                </NavItem>
                                <NavItem>
                                    <Button style={{margin:"5px"}} onClick={()=>this.logout()}><span className="fa fa-sign-out fa-lg pr-3"></span>Logout</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                </Navbar>
        );
    }
}

export default HeaderCand;