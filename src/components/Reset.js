import React, { Component } from 'react';
import { Label, Row, Col, Button } from 'reactstrap';
import { LocalForm, Control, Errors} from 'react-redux-form';
import axios from 'axios';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) =>  val?(val.length >= len):1;
const pass= (val) => !(val)||/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/i.test(val);

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reset: null,
            email: this.props.match.params.email
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(value) {
        const resetCand = {
            email: this.state.email,
            reset: value.reset
        }
            axios.post(`http://localhost:2040/${this.props.category}/reset`, { resetCand })
                .then(res => {
                    if (res.data.status == 400) {
                        alert(res.data.error)
                        window.location.href = `/${this.props.category}`
                    }
                    else {
                        alert(res.data.error)
                        window.location.href = `/${this.props.category}`
                    }
                })
        
    }
    render() {
        return (
            <div>
                <p>{this.props.category?this.props.category:"null"}</p>
                <h3>Reset password for {this.state.email}</h3>
                <LocalForm className="col-md-5 offset-md-3" onSubmit={this.handleSubmit}>
                    <Row className="form-group">
                        <Label htmlFor="reset">Password: </Label>
                        <Col>
                            <Control.password 
                                className="form-control" 
                                name="reset" 
                                id="reset" 
                                placeholder="reset password" 
                                model=".reset"  
                                validators={{
                                    required,pass
                                }}
                            />
                            <Errors className="text-danger" show="touched" model=".reset"
                                messages={{
                                    required: "This Field is mandatory",
                                    pass: "Password must contain alpabhet, special character and number."
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit" color="warning">
                                Submit
                        </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
        );
    }
}

export default Reset;
