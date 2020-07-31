import React,{Component} from 'react';
import axios from 'axios';
import {Card,CardTitle,CardBody,Button,Col,Row, ModalHeader, ModalBody,Label,Modal} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css"; 
import {LocalForm,Control} from 'react-redux-form';
// import { Label, Button,Row,Col } from 'reactstrap';
// import { json } from 'body-parser';
class Jobs extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            disp:'',
            isModalOpen:false,
            date:new Date()
        };
        this.deleteJob=this.deleteJob.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }
    deleteJob(jobid){
        console.log("Delete data");
        axios.get(`http://localhost:2040/jobs/delete/${jobid}`)
        .then(response=>{
        })
        this.componentDidMount();
    }
    handleChange=date=>{
        this.setState({
            date:date
        });
    }
    handleSubmit(values){
        const jobs={
            clientid:this.state.id,
            // jobid:values.id,
            date:this.state.date,
            company:values.company,
            desg:values.desg,
            salary:values.salary,
            location:values.location,
            desc:values.desc
        }
        axios.post(`http://localhost:2040/jobs/add`,jobs,{
            responseMethod:"POST"
        })
        .then(res=>{
            if(res.data){
                window.location.href=`/jobs/${this.state.id}`
            }
        })
    }
    componentDidMount(){
        this.setState({
            id:this.props.match.params.id
        });
        setTimeout(()=>{
            axios.get(`http://localhost:2040/jobs/${this.state.id}`)
            .then(res=>{
                this.setState({
                    disp:res.data.map((jobs)=>{
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
                                <Row>
                                    <Col>
                                    <p className="text-secondary">Applications Received: {jobs.CandidateId.length}</p>
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
                <Row>
                    <Col className="col-12 col-md-8"></Col>
                    <Col>
                    {/* <Link to={`/newJob/${this.state.id}`}> */}
                    <Button onClick={this.toggleModal} className="col-12 col-md-4" color="primary" style={{marginBottom:"7vh"}}>Add Jobs</Button>
                    {/* </Link> */}
                    </Col>
                </Row>
                <div className="container">
                <Row>
                {this.state.disp}
                </Row>
                </div>
                <Modal style={{minWidth:"60%"}} isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader style={{backgroundColor:"#3464eb",color:"white"}} toggle={this.toggleModal}>
                        <h3>Add New Job</h3>
                    </ModalHeader>
                    <ModalBody style={{backgroundColor:"#cbcdd4"}}>
                    <div class="container">
                        <LocalForm onSubmit={this.handleSubmit} className="col-md-10">
                            <Row className="form-group" md={12}>
                                <Label htmlFor="clientId" md={3}>Client Id:</Label>
                                <Col>
                                    <Control.password className="form-control" model=".clientId" id="clientId" value={this.state.id} readOnly name="clientId"></Control.password>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="date" md={3}>Joining Date</Label>
                                <Col>
                                    <DatePicker onChange={this.handleChange} selected={this.state.date} className="form-control" model=".date" id="date" name="date"></DatePicker>
                                </Col>      
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="company">Company:</Label>
                                <Col>
                                    <Control.text className="form-control" model=".company" id="company" name="company"></Control.text>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="desg">Desigantion:</Label>
                                <Col>
                                    <Control.text className="form-control" model=".desg" id="desg" name="desg"></Control.text>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="salary">Salary:</Label>
                                <Col>   
                                    <Control.text className="form-control" model=".salary" id="salary" name="salary"></Control.text>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="location">Location:</Label>
                                <Col>
                                    <Control.text className="form-control" model=".location" id="location" name="location"></Control.text>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="desc">Description:</Label>
                                <Col>
                                    <Control.textarea rows="5" className="form-control" model=".desc" id="desc" name="desc"/>
                                </Col>  
                            </Row>
                            <Row className="form-group">
                                <Col md={{offset:4}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>  
                        </LocalForm>
                {/* this nkjksmnk g  jen vwn kjvgw mw vjnwk */}
                     </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Jobs);