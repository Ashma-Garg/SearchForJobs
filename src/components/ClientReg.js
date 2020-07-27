import React, {Component} from 'react';
import {Label, Col, Row,Button} from 'reactstrap';
// import 'react-redux';
// import 'redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {LocalForm,Control} from 'react-redux-form';
class ClientLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            client:[],
            err:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        // window.location('/clientreister');
    }
    handleSubmit(values){
        // console.log("Current values are: "+ JSON.stringify(values));
        // alert("Current values are: "+ JSON.stringify(values));
        const ient={
            name:values.name,
            email:values.email,
            password:values.password,
            cpassword:values.cpassword,
            company:values.company,
            id:values.id
        }
        axios.post(`http://localhost:2040/client/add`,ient, {
            responseMethod:"POST"
        })
        .then((res)=>{
            if(res.data.length>0){
                this.setState({
                    err:res.data
                });
            }
        });
        setTimeout(()=>{axios.get(`http://localhost:2040/client`)
        .then(response =>{
            if(response.data.length>0){
                // alert(response.data);
                this.setState({
                    client:response.data.map((client)=>client.Name)
                });
                
            }
        });
    },2000
    );
        

    }
    componentDidMount(){
        // const client=[];
    //     async function getClient(){
    //         try{
    //             const res=await axios.get('http://localhost:2040/client/');
    //             console.log(res);
    //         }
    //         catch(error){
    //             console.log(error);
    //         }
    //     }
    //     getClient();
    // }
        axios.get(`http://localhost:2040/client`)
        .then(response =>{
            if(response.data.length>0){
                // alert(response.data);
                this.setState({
                    client:response.data.map((client)=>client.Name)
                });
                
            }
        })
        .catch((err)=> console.log(err));
        
    }
    render(){
        return(
            <div className="container" style={{height:"400px",marginTop:"200px"}}>
                {this.state.err}
                <h3 style={{padding:"20px"}}>Register As Client...</h3>
                <LocalForm className="col-md-8 offset-md-2" onSubmit={this.handleSubmit}>
                    <Row className="form-group">
                        <Label md={{size:2}} htmlFor="name">Name</Label>
                        <Col>
                        <Control.text model=".name" id="name" name="name" className="form-control" placeholder="Enter Your Name"></Control.text>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}} htmlFor="email">Email</Label>
                        <Col>
                        <Control.text model=".email" id="email" name="email" className="form-control" placeholder="Email"></Control.text>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="password" >Password</Label>
                        <Col>
                        <Control.text model=".password" name="password" id="password" className="form-control" placeholder="Password"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="cpassword" >Confirm Password</Label>
                        <Col>
                        <Control.text model=".cpassword" name="cpassword" id="cpassword" className="form-control" placeholder="ReEnter Password"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="company" >Company</Label>
                        <Col>
                        <Control.text model=".company" name="company" id="company" className="form-control" placeholder="Enter Compnay's Name"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="id" >Client Id</Label>
                        <Col>
                        <Control.text model=".id" name="id" id="id" className="form-control" placeholder="Enter Your Unique Id"/>
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
                <p>
                    {this.state.client}
                </p>
            </div>
        );
    }
}

export default ClientLogin;