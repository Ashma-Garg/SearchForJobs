import React,{Component} from 'react';
import axios from 'axios';
import {Card,CardTitle,CardBody,Button,Col,Row} from 'reactstrap';
import {withRouter,Link} from 'react-router-dom';

class AppliedJob extends Component{
    constructor(props){
        super(props);
        this.state={
            CandId:this.props.match.params.id,
            AppliedList:[],
            Disp:[]
        };
    }
    apihandler(){

    }
    componentDidMount(){
        // var i=0;
        axios.get(`http://localhost:2040/candidate/data/${this.state.CandId}`)
        .then(res=>{
            this.setState({
                AppliedList:res.data.Accepted.map((accepted)=>{
                    return(
                    accepted
                    );
                })
            });
            // console.log(res.data.Accepted[0] + " this is default");
            // console.log(this.state.AppliedList)
        })
        setTimeout(()=>{
            var n=this.state.AppliedList.length;
            var i=0;
            for(i=0;i<n;i++){
            axios.get(`http://localhost:2040/jobs/data/${this.state.AppliedList[i]}`)
                        .then(res=>
                            {
                                this.setState({
                                    Disp:res.data.map((jobs)=>{
                                        return(
                                                <Col className="col-md-6 mb-5">
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
                                                                <Button className="col-sm-6 col-md-6" color="danger" onClick={()=>this.deleteJob(jobs._id)}>Delete</Button>
                                                            </Col>
                                                           
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                                </Col>
                                        );
                                    })
                                })
                            })
            }
                        // {this.apihandler}
                        // <div>{applied}</div>
        },1000
        );

        // axios.get('http://localhost:2040/jobs/')
    }
    render(){
        return(
            <div>
                {this.state.Disp}
                {/* {this.state.AppliedList[0]} */}
            </div>
        );
    }
}

export default AppliedJob;