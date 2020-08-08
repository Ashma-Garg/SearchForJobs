import React, {Component} from 'react';
import {Label, Col, Row,Button} from 'reactstrap';
// import 'react-redux';
// import 'redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) =>  val?(val.length >= len):1;
const validEmail = (val) => !(val)||/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const pass= (val) => !(val)||/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/i.test(val);

class ClientLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            err:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(values){
        console.log("Current values are: "+ JSON.stringify(values));
        alert("Current values are: "+ JSON.stringify(values));
        const cand={
            name:values.name,
            email:values.email,
            password:values.password,
            cpassword:values.cpassword,
        }
        axios.post('http://localhost:2040/candidate/',cand)
        .then((res)=>{
            if(res.data.status===400){
                this.setState({
                    err:res.data.data
                });
            }
            else{
                this.setState({
                    err:''
                })
                window.location.href='/';
            }

        });
    }
    render(){
        return(
            <div className="container" style={{height:"400px",marginTop:"200px"}}>
                {this.state.err?
                    <div class="alert col-md-8 offset-md-2 alert-danger alert-dismissible fade show" role="alert">
                    <strong> {this.state.err}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>:""
                }
                <h3 style={{padding:"20px"}}>Register As Candidate...</h3>
                <LocalForm className="col-md-8 offset-md-2  shadow-lg p-3 mb-5 bg-white rounded" onSubmit={this.handleSubmit}>
                    <Row className="form-group">
                        <Label sm={{size:2}} htmlFor="name">Name</Label>
                        <Col>
                        <Control.text model=".name" id="name" name="name" className="form-control" placeholder="Enter Your Name"
                        validators={{
                            required, maxLength:maxLength(15), minLength:minLength(5)
                        }}
                        />
                        <Errors className="text-danger" show="touched" model=".name"
                        messages={{
                            required: "This Field is mandatory",
                            maxLength: "Too Long String",
                            minLength: "Too Short"
                        }}
                        />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label sm={{size:2}} htmlFor="email">Email</Label>
                        <Col>
                        <Control.text model=".email" id="email" name="email" className="form-control" placeholder="Email"
                        validators={{
                            required,validEmail
                        }}
                        />
                        <Errors className="text-danger" show="touched" model=".email"
                        messages={{
                            required: "This Field is mandatory",
                            validEmail: "Invalid Email"
                        }}
                        />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label sm={{size:2}}htmlFor="password" >Password</Label>
                        <Col>
                        <Control.password model=".password" name="password" id="password" className="form-control" placeholder="Password"
                        validators={{
                            required,pass
                        }}
                        />
                        <Errors className="text-danger" show="touched" model=".password"
                        messages={{
                            required: "This Field is mandatory",
                            pass: "Password must contain alpabhet, special character and number."
                        }}
                        />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label sm={{size:2}}htmlFor="cpassword" >Confirm Password</Label>
                        <Col>
                        <Control.password model=".cpassword" name="cpassword" id="cpassword" className="form-control" placeholder="Re-enter Password"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size:2,offset:4}}>
                        <Button type="submit" color="primary">Submit</Button>
                        </Col>
                        <Col>
                        <Link to="/" >Already Registered?</Link>
                        </Col>
                    </Row>
                    
                </LocalForm>
                <br/>
                    <hr/>
            </div>
        );
    }
}

export default ClientLogin;