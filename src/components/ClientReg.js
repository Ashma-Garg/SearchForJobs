import React, {Component} from 'react';
import {Label, Col, Row,Button} from 'reactstrap';
// import 'react-redux';
// import 'redux';
import {Link} from 'react-router-dom';
import {LocalForm,Control} from 'react-redux-form';
class ClientLogin extends Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        return(
            <div className="container" style={{height:"400px",marginTop:"200px"}}>
                <h3 style={{padding:"20px"}}>Register As Client...</h3>
                <LocalForm className="col-md-8 offset-md-2">
                    <Row className="form-group">
                        <Label md={{size:2}} htmlFor="name">Name</Label>
                        <Col>
                        <Control.text model=".name" id="name" name="name" className="form-control" placeHolder="Enter Your Name"></Control.text>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}} htmlFor="email">Email</Label>
                        <Col>
                        <Control.text model=".email" id="email" name="email" className="form-control" placeHolder="Email"></Control.text>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="password" >Password</Label>
                        <Col>
                        <Control.text model=".password" name="password" id="password" className="form-control" placeHolder="Password"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="cpassword" >Confirm Password</Label>
                        <Col>
                        <Control.text model=".cpassword" name="cpassword" id="cpassword" className="form-control" placeHolder="ReEnter Password"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="company" >Company</Label>
                        <Col>
                        <Control.text model=".company" name="company" id="company" className="form-control" placeHolder="Enter Compnay's Name"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="id" >Client Id</Label>
                        <Col>
                        <Control.text model=".id" name="id" id="id" className="form-control" placeHolder="Enter Your Unique Id"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size:2,offset:4}}>
                        <Button type="submit">Submit</Button>
                        </Col>
                        <Col>
                        <Link to="/client" >Already Registered?</Link>
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    
                </LocalForm>
            </div>
        );
    }
}

export default ClientLogin;