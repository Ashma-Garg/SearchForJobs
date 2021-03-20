import React, {Component} from 'react';
import axios from 'axios';
import {Label, Col, Row,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm,Control} from 'react-redux-form';
class Login extends Component{
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
    // componentDidMount(){
    //     var keys=Object.keys(localStorage),
    //     i=keys.length;
    //     console.log(i);
    //     while(i--){
    //         console.log(localStorage.getItem(keys[i]))
    //         localStorage.removeItem(keys[i])
    //     }
    // }
    setCategory(){
        if(!this.state.email) alert("Please enter Email first.")
        this.props.callBack('candidate');
    }
    storeEmail(event){
        this.setState({
            email:event.target.value
        })
    }

    handleSubmit(values){
        const candidate={
            email:values.email,
            password:values.password
        }
        axios.post('http://localhost:2040/candidate/login',candidate)
        .then((res)=>{
            if(res.data.status===400){
                this.setState({
                    err:res.data.err
                });
            }
            else{
                this.setState({
                    err:''
                })
               
                localStorage.setItem("token","bvfbda");
                window.location.href=`/candidateJob/${res.data.id}`;
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
                <h3 style={{padding:"20px"}}>Login As Candidate...</h3>
                <LocalForm className="col-md-8 offset-md-2 shadow-lg p-3 mb-5 bg-white rounded" onSubmit={this.handleSubmit}>
                    <Row className="form-group">
                        <Label sm={{size:2}} htmlFor="email">Email</Label>
                        <Col>
                        <Control.text onChange={this.storeEmail} model=".email" id="email" name="email" className="form-control" placeholder="Email" required></Control.text>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label sm={{size:2}}htmlFor="password" >Password</Label>
                        <Col>
                        <Control.password model=".password" name="password" id="password" className="form-control" placeholder="Password"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size:2,offset:4}}>
                        <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/Candidateregister" >Not Registered?</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{offset:3}}>
                            <Link to={this.state.email?`/reset/${this.state.email}`:`/`} onClick={this.setCategory}>
                                Reset Password if forgotten!
                            </Link>
                        </Col>
                    </Row>
                    
                </LocalForm>
                <br/>
                    <hr/>
                    <Row className="form-group">
                    <Col md={{offset:2,size:8}}>
                        <Link to="/client">
                            <Button className="form-control btn btn-lg" color="primary">If Client!!</Button>
                        </Link>
                    </Col>
                    </Row>
            </div>
        );
    }
}

export default Login;