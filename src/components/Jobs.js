import React,{Component} from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.css';
import {Card,CardTitle,CardBody,CardFooter,Button,Col,Row, ModalHeader, ModalBody,Label,Modal} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";
import Header from './HeaderClient';
import "react-datepicker/dist/react-datepicker.css"; 
import {LocalForm,Control} from 'react-redux-form';
class Jobs extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            disp:'',
            isModalOpen:false,
            date:new Date(),
            isModalOpenEdit:false,
            JoiningDate:'',
            Company:'',
            Designation:'',
            Salary:'',
            Location:'',
            Desc:'',
            JobId:'',
            name:''
        };
        this.deleteJob=this.deleteJob.bind(this);
        this.editJob=this.editJob.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.toggleModalEdit=this.toggleModalEdit.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleSubmitEdit=this.handleSubmitEdit.bind(this);
        this.handleCompany=this.handleCompany.bind(this);
        this.handleDesg=this.handleDesg.bind(this);
        this.handleLocation=this.handleLocation.bind(this);
        this.handleSalary=this.handleSalary.bind(this);
        this.handleDesc=this.handleDesc.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.displayCandidates=this.displayCandidates.bind(this);

    }
    handleSubmitEdit(values){
        const jobs={
            clientid:this.state.id ,
            date:this.state.JoiningDate,
            company:  this.state.Company, 
            desg:  this.state.Designation,
            salary:  this.state.Salary,
            location:  this.state.Location,
            desc:  this.state.Desc
        };
        axios.post(`http://localhost:2040/jobs/edit/${this.state.JobID}`,jobs,{
            responseMethod:"POST"
        })
        .then(res=>{
            if(res.data){
                window.location.href=`/jobs/${this.state.id}`
            }
        })
    }
    toggleModalEdit(){
        this.setState({
            isModalOpenEdit:!this.state.isModalOpenEdit
        });
    }
    editJob(jobid){
        this.setState({
            isModalOpenEdit:!this.state.isModalOpenEdit
        });
            axios.get(`http://localhost:2040/jobs/data/${jobid}`)
            .then(res=>{
                this.setState({
                    JobID:res.data._id,
                    JoiningDate:new Date(res.data.JoiningDate),
                    Company:res.data.Company,
                    Designation:res.data.Designation,
                    Salary:res.data.Salary,
                    Location:res.data.Location,
                    Desc:res.data.Desc
                })
            })
        
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
    handleDate=date=>{
        this.setState({
            JoiningDate:date
        });
    }
    handleCompany(event){
        this.setState({
            Company:event.target.value
        });
    }
    handleDesg(event){
        this.setState({
            Designation:event.target.value
        });
    }
    handleSalary(event){
        this.setState({
            Salary:event.target.value
        });
    }
    handleLocation(event){
        this.setState({
            Location:event.target.value
        });
    }
    handleDesc(event){
        this.setState({
            Desc:event.target.value
        });
    }
    handleSubmit(values){
        const jobs={
            clientid:this.state.id,
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
    displayCandidates(jobId){
        window.location.href=`/appliedforjob/${jobId}`;
    }
    componentDidMount(){
        this.setState({
            id:this.props.match.params.id
        });
        setTimeout(()=>{
            axios.get(`http://localhost:2040/client/data/${this.state.id}`)
            .then(res=>{
                this.setState({
                    name:res.data.Name
                });
                // console.log(res.data);
            })
        },1000)
        
        setTimeout(()=>{
            axios.get(`http://localhost:2040/jobs/${this.state.id}`)
            .then(res=>{
                this.setState({
                    disp:res.data.map((jobs)=>{
                        return(
                        <Col className="col-12 col-md-10 col-lg-6 mb-5">
                        <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                            <CardTitle style={{backgroundColor:"#8feb34",padding:"10px",color:"#eb4f34"}}><h3 style={{fontFamily:"Luckiest Guy",letterSpacing:"2px"}}>{jobs.Company}</h3></CardTitle>
                            <CardBody onClick={()=>this.displayCandidates(jobs._id)}>
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
                                </CardBody>
                                <CardFooter>
                                <Row>
                                    <Col>
                                        <Button className="col-sm-4 col-md-4" color="danger" onClick={()=>this.deleteJob(jobs._id)}>Delete</Button>
                                        <Button className="col-sm-4 offset-1 col-md-4" color="primary" onClick={()=>this.editJob(jobs._id)}>Edit</Button>
                                    </Col>
                                    {/* <Col>
                                        
                                    </Col> */}
                                   
                                </Row>
                                <Row>
                                    <Col>
                                    {new Date(jobs.JoiningDate)<new Date()?<p className="disabled fa fa-warning fa-lg m-3">Expired</p>:null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <p className="text-secondary m-2">Applications Received: {jobs.CandidateId.length}</p>
                                    </Col>
                                   
                                </Row>
                                
                                </CardFooter>
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
            <div style={{backgroundColor:"#bed1cb",minHeight:"100vh"}}> 
                <div style={{position:"sticky",top:"0",zIndex:"1"}}>
                <Header id={this.state.id} name={this.state.name}/>
                </div>
                <div style={{padding:"5vh"}}>
               <div className="container">
                <Row>
                {this.state.disp}                
                </Row>
                </div>
                <Button title="Add New Job" onClick={this.toggleModal} color="primary" style={{bottom:"30px",right:"30px",position:"fixed"}}><img alt="Add New Job" src="https://img.icons8.com/ios-filled/35/000000/plus.png"/></Button>
                <Modal style={{minWidth:"60%"}} isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader 
                    style={{backgroundColor:"#3464eb",color:"white"}}
                     toggle={this.toggleModal}>
                        <h3>Add New Job</h3>
                    </ModalHeader>
                    <ModalBody>
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
                     </div>
                    </ModalBody>
                </Modal>




                <Modal style={{minWidth:"60%"}} isOpen={this.state.isModalOpenEdit} toggle={this.toggleModalEdit}>
                        <ModalHeader style={{backgroundColor:"#3464eb",color:"white"}} toggle={this.toggleModalEdit}>
                            <h3>Edit Job</h3>
                        </ModalHeader>
                        <ModalBody>
                        <div class="container">
                            <LocalForm onSubmit={this.handleSubmitEdit} className="col-md-10">
                                <Row className="form-group" md={12}>
                                    <Label htmlFor="clientId" md={3}>Client Id:</Label>
                                    <Col>
                                        <Control.password className="form-control" model=".clientId" id="clientId" value={this.state.id} readOnly name="clientId"></Control.password>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="date" md={3}>Joining Date</Label>
                                    <Col>
                                        <DatePicker onChange={this.handleDate} selected={this.state.JoiningDate} className="form-control" model=".date" id="date" name="date"></DatePicker>
                                    </Col>      
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} htmlFor="company">Company:</Label>
                                    <Col>
                                        <Control.text className="form-control" onChange={this.handleCompany} value={this.state.Company} model=".company" id="company" name="company"></Control.text>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} htmlFor="desg">Desigantion:</Label>
                                    <Col>
                                        <Control.text className="form-control" onChange={this.handleDesg} value={this.state.Designation} model=".desg" id="desg" name="desg"></Control.text>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} htmlFor="salary">Salary:</Label>
                                    <Col>   
                                        <Control.text className="form-control" onChange={this.handleSalary} value={this.state.Salary} model=".salary" id="salary" name="salary"></Control.text>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} htmlFor="location">Location:</Label>
                                    <Col>
                                        <Control.text className="form-control" onChange={this.handleLocation} value={this.state.Location} model=".location" id="location" name="location"></Control.text>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} htmlFor="desc">Description:</Label>
                                    <Col>
                                        <Control.textarea rows="5" className="form-control" onChange={this.handleDesc} value={this.state.Desc} model=".desc" id="desc" name="desc"/>
                                    </Col>  
                                </Row>
                                <Row className="form-group">
                                    <Col md={{offset:4}}>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>  
                            </LocalForm>
                         </div>
                        </ModalBody>
                    </Modal>
            </div>
            </div>
            
        );
    }
}

export default withRouter(Jobs);