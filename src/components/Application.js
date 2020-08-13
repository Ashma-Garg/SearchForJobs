import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import {Redirect} from 'react-router-dom';
// import { Table,Col, Row } from 'reactstrap';
class Application extends Component{
    constructor(props){
        super(props);
        const token=localStorage.getItem("tokenClient");
        let loggedIn=true;
        if(token==null){
            loggedIn=false;
        }
        this.state={
            jobId:this.props.match.params.id,
            disp:[],
            display:[],
            isAccepted:'',
            Company:'',
            loggedIn
        };
        this.permission=this.permission.bind(this);
    }
    permission(candId){
        alert('Accepted');
        axios.post(`http://localhost:2040/jobs/setrue/${this.state.jobId}`,{candId})
        .then(res=>{console.log(res.data)});
        document.getElementById(candId).disabled='true';
        console.log("Clicked");

    }
    componentDidMount(){
        axios.get(`http://localhost:2040/jobs/application/${this.state.jobId}`)
        .then(res=>{
            this.setState({
            Company:res.data.Company,
            disp:
                res.data.CandidateId.map((cand)=>{
                    return cand.candid;
                }),
            isAccepted: res.data.CandidateId.map((cand)=>{
                return cand.isAccepted;
            })
            })


        })
        var ex;
        var i=-1;
        setTimeout(()=>{
        axios.all(this.state.disp.map(l => axios.get(`http://localhost:2040/candidate/data/${l}`)))
        .then(axios.spread(function (...res) {
                ex=res.map((res)=>{
                    return(
                        res.data
                    );
                })
        }));
        },100);
        setTimeout(()=>{
            this.setState({
                display:ex.map((ex)=>{
                    i++;
                    return(
                        <tr className="col-12">
                        <td>
                            <p style={{fontFamily:"Patua One",fontSize:"24px"}}>{ex.Name}</p>
                        </td>
                        <td>
                        <button className={this.state.isAccepted[i]==='true'?"btn btn-success disabled":"btn btn-success"} id={ex._id} disabled={this.state.isAccepted[i]==='true'?true:false} onClick={()=>this.permission(ex._id)}>{this.state.isAccepted[i]==='true'?"Accepted":"Accept"}</button>
                        </td>
                        </tr>
                )
                })
            })
            // console.log(ex)
        },1000)
        

    }
    render(){
        if(this.state.loggedIn===false){
            return <Redirect to="/client"/>
        }
        return(
            <div className="container">
                
                <h2 style={{textDecoration:"underline",marginTop:"3%",fontFamily:"Lobster"}}>{this.state.Company}</h2>
                <Table dark borderd hover responsive>
                    <tbody>
                        {this.state.display}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default Application;