import React,{Component} from 'react';
import axios from 'axios';
// import { Row } from 'reactstrap';
import {Card,CardTitle,CardBody,Col,Row} from 'reactstrap';
import Header from './HeaderCandidate';
// import {withRouter,Link} from 'react-router-dom';

class AppliedJob extends Component{
    constructor(props){
        super(props);
        this.state={
            CandId:this.props.match.params.id,
            Disp:''
        };
    }
    apihandler(){

    }
    componentDidMount(){
        // var i=0;
        axios.get(`http://localhost:2040/jobs/appliedList/${this.state.CandId}`)
        .then(res=>{
            if(res.data.length>0){
            this.setState({
                Disp:res.data.map((jobs)=>{
                    // if(res.data.length>0){
                    return(
                        <Col className="col-12 col-md-10 col-lg-6 mb-5">
                            {/* <p>{res.data.length}</p> */}
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
                                {/* <Row>
                                    <Col>
                                        <Button className="col-sm-6 col-md-6" color="danger" onClick={()=>this.deleteJob(jobs._id)}>Delete</Button>
                                    </Col>
                                   
                                </Row> */}
                                <Row>
                                    <Col>
                                    <p className="text-secondary">Applications Received: {jobs.CandidateId.length}</p>
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
                    // }
                    
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
        return(
            <div>
                <Header id={this.state.CandId}/>
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