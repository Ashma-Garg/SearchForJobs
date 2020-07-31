import React,{Component} from 'react';
import axios from 'axios';
import {Card,CardTitle,CardBody,Button,Col,Row} from 'reactstrap';
import {withRouter,Link} from 'react-router-dom';
// import { json } from 'body-parser';
class Jobs extends Component{
    constructor(props){
        super(props);
        this.state={
            Candid:"",
            disp:'',
            disable:0,
            button:0,
            err:'',
            Applied:''
        };
    }
    AddToApplied(JobId){


        axios.post(`http://localhost:2040/candidate/addAppliedJob/${this.state.Candid}`,{JobId})
        .then(res=>{
            // console.log(res.data);
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
                                    if(ele===this.state.Candid){
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
                        <Col className="col-sm-12 col-md-6 mb-5">
                        <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                            <CardTitle style={{backgroundColor:"#8feb34",padding:"10px",color:"#eb4f34"}}><h3 style={{fontWeight:"bolder"}}>{jobs.Company}</h3></CardTitle>
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
                                        <Button id={jobs._id} onClick={()=>this.AddToApplied(jobs._id)} className={this.state.disable?'disabled col-md-6':"btn-success col-md-6"}>{this.state.disable?"Applied":"Apply Now"}</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text-secondary">Applications Received: {this.state.Applied}</p>
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
        return(
            <div style={{padding:"5vh",backgroundColor:"#3c424d",minHeight:"100vh"}}>
                
                <Link to={`/appliedJob/${this.state.Candid}`}>
                    <Button className="btn btn-lg" color="warning" style={{marginBottom:"7vh"}}>Applied List</Button>
                </Link>
                <div class="container">
                <Row>
                {this.state.disp}
                </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(Jobs);