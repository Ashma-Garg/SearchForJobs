import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css"; 
import {LocalForm,Control} from 'react-redux-form';
import { Label, Button,Row,Col } from 'reactstrap';
class NewJob extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            date:new Date()
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount(){
        this.setState({
            id:this.props.match.params.id
        });
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
    render(){
        return(
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
                        <Control.text className="form-control" model=".desc" id="desc" name="desc"></Control.text>
                        </Col>
                    </Row>
                    <Row className="form-group">

                        <Col md={{offset:4}}>
                        <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </LocalForm>
                {/* this nkjksmnk g  jen vwn kjvgw mw vjnwk */}
            </div>
        );
    }
}

export default NewJob;