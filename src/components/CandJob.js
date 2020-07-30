import React,{Component} from 'react';
import axios from 'axios';
import {Card,CardTitle,CardBody,Button,Col,Row} from 'reactstrap';
import {withRouter,Link} from 'react-router-dom';
// import { json } from 'body-parser';
class Jobs extends Component{
    constructor(props){
        super(props);
        this.state={
            Candid:this.props.match.params.id,
            Applied:false,
            disp:'',
            color:"btn-success col-md-6"
        };
    }
    AddToApplied(JobId){
        // axios.post(`http://localhost:2040/candidate/addAppliedJob/${this.state.Candid}`,{JobId})
        // .then(res=>{
        //     console.log(res.data);
        // })
        // axios.post(`http://localhost:2040/jobs/addAppliedJob/${this.state.Candid}`,{JobId})
        // .then(res=>{
        //     console.log(res.data);
        // })
    }
    componentDidMount(){


        setTimeout(()=>{
            axios.get(`http://localhost:2040/jobs/`)
            .then(res=>{
                this.setState({
                    disp:res.data.map((jobs)=>{
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
                                    <Button onClick={()=>this.AddToApplied(jobs._id)} className={this.state.color} >Apply Now</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        </Col>
                        );
                    })
                })
            });
        },1000
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