import React, {Component} from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import Login from './Login';
import ClientReg from './ClientReg';
import CandReg from './CandReg';
import Client from './ClientLogin';
import Jobs from './Jobs';
import CandJob from './CandJob';
import AppliedJob from './AppliedJob';
import Application from './Application'
import Reset from './Reset';

class Main extends Component{
    constructor(props){
        super()
        this.state={
            message:null
        }
        this.callBack=this.callBack.bind(this);
    }
    callBack(message){
        this.setState(
            {
                message:message
            }
        )
    }
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={()=><Login callBack={this.callBack}></Login>}></Route>
                    <Route exact path="/client" component={()=><Client callBack={this.callBack}/>}></Route>
                    <Route exact path='/candidateregister' component={CandReg}></Route>
                    <Route exact path="/clientregister" component={ClientReg}></Route>
                    <Route exact path="/jobs/:id" component={Jobs}></Route>
                    <Route exact path="/candidateJob/:id" component={CandJob}></Route>
                    <Route exact path="/appliedJob/:id" component={AppliedJob}></Route>
                    <Route exact path='/appliedforjob/:id' component={Application}></Route>
                    <Route exact path="/reset/:email" component={(props)=><Reset category={this.state.message} {...props}></Reset>}></Route>
                    <Redirect to='/'></Redirect>
                </Switch>
            </div>
        );
    }
}

export default Main;