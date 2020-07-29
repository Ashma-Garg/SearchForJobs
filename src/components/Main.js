import React, {Component} from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import Login from './Login';
import ClientReg from './ClientReg';
import CandReg from './CandReg';
import Client from './ClientLogin';
import Jobs from './Jobs';
import NewJobs from './NewJob';
import CandJob from './CandJob';
import AppliedJob from './AppliedJob';
class Main extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     clientId:''
        // };
    }
    // setId(selectedId){
    //     this.setState({
    //         clientId:selectedId
    //     });
    // }
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/client" component={()=><Client/>}></Route>
                    <Route exact path='/candidateregister' component={CandReg}></Route>
                    <Route exact path="/clientregister" component={ClientReg}></Route>
                    <Route exact path="/jobs/:id" component={Jobs}></Route>
                    <Route exact path="/newJob/:id" component={NewJobs}></Route>
                    <Route exact path="/candidateJob/:id" component={CandJob}></Route>
                    <Route exact path="/appliedJob/:id" component={AppliedJob}></Route>
                    <Redirect to='/'></Redirect>
                </Switch>
            </div>
        );
    }
}

export default Main;