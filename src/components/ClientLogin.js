import React, {Component} from 'react';
import {Label, Col, Row,Button} from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {LocalForm,Control, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const validEmail = (val) => !val||/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class ClientLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            err:'',
            email:null
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.storeEmail=this.storeEmail.bind(this);
        this.setCategory=this.setCategory.bind(this);
    }
    setCategory(){
        if(!this.state.email) alert("Please enter Email first.")
        this.props.callBack('client');
    }
    storeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    handleSubmit(values){
        const login={
            email:values.email,
            password:values.password
        }
        axios.post('http://localhost:2040/client/login',login)
        .then(response=>{
            if(response.data.status===400){
                this.setState({
                    err:response.data.err
                });
            }
            else{
                this.setState({
                    err:'',
                });
                localStorage.setItem("tokenClient","hjhja");
                window.location.href=`/jobs/${response.data.id}`;
            }
            
            
        })
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
                <h3 style={{padding:"20px"}}>Login As Client...</h3>
                <LocalForm className="col-md-8 offset-md-2 shadow-lg p-3 mb-5 bg-white rounded" onSubmit={this.handleSubmit}>
                    <Row className="form-group">
                        <Label sm={{size:2}} htmlFor="email">Email</Label>
                        <Col>
                        <Control.text onChange={this.storeEmail} model=".email" id="email" name="email" className="form-control" placeholder="Email"
                        validators={{
                            required,validEmail
                        }}
                        />
                        <Errors show="touched" className="text-danger" model=".email"
                            messages={{
                                required: "this field is Mandatory",
                                validEmail: "Email is not valid"
                            }}
                        />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label sm={{size:2}}htmlFor="password" >Password</Label>
                        <Col>
                        <Control.password model=".password" name="password" id="password" className="form-control" placeholder="Password"
                        validators={{
                            required
                        }}
                        />
                        <Errors show="touched" className="text-danger" model=".password"
                            messages={{
                                required: "this field is Mandatory"
                            }}
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size:2,offset:4}}>
                        <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/clientregister" >Not Registered?</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{offset:3}}>
                            <Link to={this.state.email?`/reset/${this.state.email}`:`/client`} onClick={this.setCategory}>
                                Reset Password if forgotten!
                            </Link>
                        </Col>
                    </Row>
                </LocalForm>
                <br/>
                    <hr/>
                    <Row className="form-group">
                    <Col md={{offset:2,size:8}}>
                        <Link to="/">
                            <Button className="form-control btn btn-lg" color="primary">If Candidate!!</Button>
                        </Link>
                    </Col>
                    </Row>
            </div>
        );
    }
}

export default ClientLogin;