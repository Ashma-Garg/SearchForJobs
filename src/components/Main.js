import React, {Component} from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import Login from './Login';
import ClientReg from './ClientReg';
import CandReg from './CandReg';
import Client from './ClientLogin';
class Main extends Component{
    render(){
        return(
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/client" component={Client}></Route>
                    <Route exact path='/candidateregister' component={CandReg}></Route>
                    <Route exact path="/clientregister" component={ClientReg}></Route>
                    <Redirect to='/'></Redirect>
                </Switch>
            </div>
        );
    }
}

export default Main;