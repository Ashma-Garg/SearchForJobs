import React,{Component} from 'react';
import axios from 'axios';
import {Card,CardTitle,CardBody,Col,Row,Button} from 'reactstrap';
import Header from './HeaderCandidate';
import { Redirect } from 'react-router-dom';

class AppliedJob extends Component{
    constructor(props){
        super(props);
        const token=localStorage.getItem("token");
        let loggedIn=true;
        if(token==null){
            loggedIn=false;
        }
        this.state={
            CandId:this.props.match.params.id,
            Disp:'',
            name:'',
            loggedIn
        };
        this.deleteApplied=this.deleteApplied.bind(this);
    }
    deleteApplied(jobId){
        // console.log(jobId);
        axios.post(`http://localhost:2040/candidate/deleteapplied/${this.state.CandId}`,{jobId})
        .then(res=>{
            window.location.href=`/appliedJob/${this.state.CandId}`
        });
    }
    componentDidMount(){
        axios.get(`http://localhost:2040/candidate/data/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                name:res.data.Name
            });
        })
        axios.get(`http://localhost:2040/jobs/appliedList/${this.state.CandId}`)
        .then(res=>{
            if(res.data.length>0){
            this.setState({
                Disp:res.data.map((jobs)=>{
                    return(
                        <Col className="col-12 col-md-10 col-lg-6 mb-5">
                        <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                            <CardTitle style={{backgroundColor:"#8feb34",padding:"10px",color:"#eb4f34"}}><h3 style={{fontFamily:"Luckiest Guy",letterSpacing:"2px"}}>{jobs.Company}</h3></CardTitle>
                            <CardBody>
                                <Row>
                                    <Col className="col-sm-4"><p style={{fontWeight:"bolder"}}>Designation:</p> </Col>
                                    <Col><p>{jobs.Designation}</p> </Col>
                                </Row>
                                <Row>
                                    <Col className="col-sm-4"><p style={{fontWeight:"bolder"}}>Salary:</p> </Col>
                                    <Col><p> {jobs.Salary}</p> </Col>
                                </Row>
                                <Row>
                                    <Col className="col-sm-4"><p style={{fontWeight:"bolder"}}>Description: </p> </Col>
                                    <Col><p>{jobs.Desc}</p> </Col>
                                </Row>
                                <Row>
                                    <Col className="col-sm-4"><p style={{fontWeight:"bolder"}}>Joining Date:</p> </Col>
                                    <Col><p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(jobs.JoiningDate)))}</p> </Col>
                                </Row>
                                <Row>
                                    <Col className="col-sm-4"><p style={{fontWeight:"bolder"}}>Location: </p> </Col>
                                    <Col><p> {jobs.Location}</p> </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    {jobs.CandidateId.map((cid)=>{
                                        if(cid.candid===this.props.match.params.id){
                                            if(cid.isAccepted==='true'){
                                                return (<h4 style={{fontWeight:"bolder",color:"green",backgroundColor:"yellow",padding:"2%"}}>You have been selected!</h4>);
                                            }
                                            else{
                                                return (<p></p>);
                                            }
                                        }
                                        else{
                                            return (<p></p>);
                                        }
                                    })}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <p className="text-secondary">Applications Received: {jobs.CandidateId.length}</p>
                                    </Col>
                                   
                                </Row>
                                <Row>
                                    <Col>
                                        <Button onClick={()=>this.deleteApplied(jobs._id)}>Delete</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    {new Date(jobs.JoiningDate)<new Date()?<p className="disabled fa fa-warning fa-lg m-3">Expired</p>:null}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        </Col>
                    );
                })
            });
        }
        else{
            this.setState({
                Disp:<div className="container" style={{minHeight:"100vh"}}><h2 className="text-secondary" style={{marginTop:"25%"}}><p className="fa fa-warning fa-large"></p>You have not applied for any Job yet!</h2></div>
            });
        }
        })
    }
    render(){
        if(this.state.loggedIn===false){
            return <Redirect to="/"/>
        }
        return(
            <div>
                <div style={{position:"sticky",top:"0",zIndex:"1"}}>
                <Header id={this.state.CandId} name={this.state.name}/>
                </div>
                <div className="container">
                <Row>
                {this.state.Disp}
                </Row>
            </div>
            </div>
            
        );
    }
}

export default AppliedJob;