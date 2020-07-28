import React,{Component} from 'react';
import axios from 'axios';
import {Card,CardTitle,CardBody,Button} from 'reactstrap';
import {withRouter,Link} from 'react-router-dom';
class Jobs extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            disp:''
        };
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
                        <Card>
                            <CardTitle>{jobs.Company}</CardTitle>
                            <CardBody>{jobs.Designation}</CardBody>
                        </Card>
                        );
                    })
                })
            });
        },1000
        );
        
        
    }
    render(){
        return(
            <div style={{marginTop:"20vh"}}>
                <Link to={`/newJob/${this.state.id}`}>
                    <Button style={{marginBottom:"7vh"}}>Add Jobs</Button>
                </Link>
                {this.state.disp}
            </div>
        );
    }
}

export default withRouter(Jobs);