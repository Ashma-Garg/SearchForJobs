import React, {Component} from 'react';
import {Label, Col, Row,Button} from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';

// const required=(val)=> val&&val.length;
// const maxlength=(len)=>(val)=> !val || val.length<=len;
// const minlength=(len) =>(val) => val && val.length>=len;
// const isNumber=(val)=> !isNaN(val);
// const validEmail=(val)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) =>  val?(val.length >= len):1;
const validEmail = (val) => !(val)||/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const pass= (val) => !(val)||/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/i.test(val);
class ClientLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            // client:[],
            err:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        // this.deleteclient=this.deleteclient.bind(this);
    }
    // deleteclient(id){
    //     axios.get(`http://localhost:2040/client/delete/${id}`)
    //     .then(response=>{
    //         this.setState({
    //             client:response.data.map((client)=>{
    //                 return(
    //                 <div>
    //                     {client.Name}
    //                     <Button onClick={()=>this.deleteclient(client.Id)}>Delete</Button>
    //                 </div>
    //                 );
    //             })
    //         });
    //     })
    // }
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
            if(res.data.status===400){
                this.setState({
                    err:res.data.data
                });
            }
            else{
                window.location.href='/client';
            }
        });
        
        

    }
    // componentDidMount(){
    //     axios.get(`http://localhost:2040/client`)
    //     .then(response =>{
    //         if(response.data.length>0){
    //             this.setState({
    //                 client:response.data.map((client)=>{
    //                     return(
    //                     <div>
    //                         {client.Name}
    //                         <Button onClick={()=>this.deleteclient(client.Id)}>Delete</Button>
    //                     </div>
    //                     );
    //                 })
    //             });
                
    //         }
    //     })
    //     .catch((err)=> console.log(err));
        
    // }
    render(){
        return(
            <div className="container" style={{height:"400px",marginTop:"200px"}}>
                {this.state.err}
                <h3 style={{padding:"20px"}}>Register As Client...</h3>
                <LocalForm className="col-md-8 offset-md-2  shadow-lg p-3 mb-5 bg-white rounded" onSubmit={this.handleSubmit}>
                    <Row className="form-group">
                        <Label md={{size:2}} htmlFor="name">Name</Label>
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
                        <Label md={{size:2}} htmlFor="email">Email</Label>
                        <Col>
                        <Control.text model=".email" id="email" name="email" className="form-control" placeholder="Email"
                        validators={{
                            required,validEmail
                        }}
                        />
                        <Errors className="text-danger" show="touched" model=".email"
                        messages={{
                            required: "This Field is mandatory",
                            validEmail:"Email is not valid"
                        }}
                        />

                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="password" >Password</Label>
                        <Col>
                        <Control.password model=".password" name="password" id="password" className="form-control" placeholder="Password"
                        validators={{
                            required, maxLength:maxLength(30), minLength:minLength(8),pass
                        }}
                        />
                        <Errors className="text-danger" show="touched" model=".password"
                        messages={{
                            required: "This Field is mandatory",
                            maxLength: "Too Long String",
                            minLength: "Too Short",
                            pass: "Invalid Password"
                        }}
                        />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="cpassword" >Confirm Password</Label>
                        <Col>
                        <Control.password model=".cpassword" name="cpassword" id="cpassword" className="form-control" placeholder="ReEnter Password"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label md={{size:2}}htmlFor="company" >Company</Label>
                        <Col>
                        <Control.text model=".company" name="company" id="company" className="form-control" placeholder="Enter Compnay's Name"
                        validators={{
                            required, maxLength:maxLength(30), minLength:minLength(8)
                        }}
                        />
                        <Errors className="text-danger" show="touched" model=".company"
                        messages={{
                            required: "This Field is mandatory",
                            maxLength: "Too Long String",
                            minLength: "Too Short",
                        }}
                        />
                        </Col>
                    </Row>
                    {/* <Row className="form-group">
                        <Label md={{size:2}}htmlFor="id" >Client Id</Label>
                        <Col>
                        <Control.text model=".id" name="id" id="id" className="form-control" placeholder="Enter Your Unique Id"
                        validators={{
                            required, isNumber
                        }}
                        />
                        <Errors className="text-danger" show="touched" model=".id"
                        messages={{
                            required: "This Field is mandatory",
                            isNumber: "This Should be a Number"
                        }}
                        />
                        </Col>
                    </Row> */}
                    <Row>
                        <Col md={{size:2,offset:4}}>
                        <Button type="submit">Submit</Button>
                        </Col>
                        <Col>
                        <Link to="/client" >Already Registered?</Link>
                        </Col>
                    </Row>
                    
                </LocalForm>
                <br/>
                    <hr/>
                {/* <p>
                    {this.state.client}
                </p> */}
            </div>
        );
    }
}

export default ClientLogin;