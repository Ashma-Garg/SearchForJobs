import React,{Component} from 'react';
import axios from 'axios';
import {Card,CardTitle,CardBody,Col,Row} from 'reactstrap';
import {withRouter, Redirect} from 'react-router-dom';
import Header from './HeaderCandidate';
class Jobs extends Component{
    constructor(props){
        super(props);
        const token=localStorage.getItem("token");
        let loggedIn=true;
        if(token==null){
            loggedIn=false
        }
        this.state={
            Candid:"",
            name:'',
            disp:'',
            disable:0,
            button:0,
            err:'',
            Applied:'',
            loggedIn
        };
    }
    AddToApplied(JobId){


        axios.post(`http://localhost:2040/candidate/addAppliedJob/${this.state.Candid}`,{JobId})
        .then(res=>{
            console.log("Added to Candidate Applied List");
        })
        axios.post(`http://localhost:2040/jobs/addAppliedJob/${this.state.Candid}`,{JobId})
        .then(res=>{
            if(res.data.status===400){
                this.setState({
                    err:res.data.err
                });
                alert(this.state.err);
            }
            else{
                document.getElementById(JobId).disabled="true";
                document.getElementById(JobId).innerHTML="Applied";
                document.getElementById(JobId).disabled=true;
                this.setState({
                    Applied:this.state.Applied+1
                });
            }
        })
    }
    componentDidMount(){
        this.setState({
            Candid:this.props.match.params.id
        });

        axios.get(`http://localhost:2040/candidate/data/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                name:res.data.Name,
                email:res.data.email
            });
        })
        setTimeout(()=>{
            axios.get(`http://localhost:2040/jobs/`)
            .then(res=>{
                this.setState({
                    disp:res.data.map((jobs)=>{
                        this.setState({
                            button:0,
                            disable:0,
                            Applied:jobs.CandidateId.length
                        });
                        if(jobs.CandidateId.length>0){
                            this.setState({
                                button:jobs.CandidateId.map((ele)=>{
                                    if(ele.candid===this.state.Candid){
                                        this.setState({
                                            disable:1
                                        });
                                        return 1;
                                    }
                                })
                            })
                        }
                        else{
                            this.setState({
                                disable:0
                            });
                            
                        }
                        return(
                        <Col className="col-12 col-md-10 col-lg-6 mb-5">
                        <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                            <CardTitle style={{backgroundColor:"#c8e6e5",padding:"10px",color:"#eb4f34"}}><h3 style={{fontFamily:"Luckiest Guy",letterSpacing:"2px"}}>{jobs.Company}</h3></CardTitle>
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
                                    <p></p>
                                        <button id={jobs._id} onClick={()=>this.AddToApplied(jobs._id)} className={this.state.disable?'btn btn-secondary disabled col-md-6':new Date(jobs.JoiningDate)<new Date()?'btn btn-secondary disabled col-md-6':"btn btn-success col-md-6"} disabled={this.state.disable?this.state.disable:new Date(jobs.JoiningDate)<new Date()?true:false}>{this.state.disable?"Applied":"Apply"}</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text-secondary">Applications Received: {this.state.Applied}</p>
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
                })
            });
        },90
        );
        
        
    }
    render(){
        if(this.state.loggedIn===false){
            return <Redirect to='/' />
        }
        return(
            <div>
                <div style={{position:"sticky",top:"0",zIndex:"1"}}>
                <Header id={this.props.match.params.id} name={this.state.name}/>
                </div>
                <div style={{padding:"5vh",backgroundColor:"#b8bdd9",minHeight:"100vh"}}>
                    <div className="container">
                        <Row>
                            {this.state.disp}
                        </Row>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default withRouter(Jobs);