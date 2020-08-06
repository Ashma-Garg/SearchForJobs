import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
// import { Table,Col, Row } from 'reactstrap';
class Application extends Component{
    constructor(props){
        super(props);
        this.state={
            jobId:this.props.match.params.id,
            disp:[],
            display:[]
        };
        this.permission=this.permission.bind(this);
    }
    permission(candId){
        alert('Accepted');
        axios.post(`http://localhost:2040/jobs/setrue/${this.state.jobId}`,candId)
        .then(res=>{console.log(res.data)});
        // document.getElementById(candId).disabled='true';

    }
    componentDidMount(){
        axios.get(`http://localhost:2040/jobs/application/${this.state.jobId}`)
        .then(res=>{
            this.setState({
            disp:
                res.data.CandidateId.map((cand)=>{
                    return cand.candid;
                })
            })


        })
        var ex;
        setTimeout(()=>{
        axios.all(this.state.disp.map(l => axios.get(`http://localhost:2040/candidate/data/${l}`)))
        .then(axios.spread(function (...res) {
                ex=res.map((res)=>{
                    return(
                        res.data
                    );
                })
        }));
        },100);
        setTimeout(()=>{
            this.setState({
                display:ex.map((ex)=>{
                    return(
                        <tr className="col-12">
                        <td>
                            <p>{ex.Name}</p>
                            
                        </td>
                        <td>
                        <Button id={ex._id} onClick={()=>this.permission(ex._id)} color="success">Accept</Button>
                        </td>
                        </tr>

                )
                })
            })
            // console.log(ex)
        },1000)
        

    }
    render(){
        return(
            <div className="container">
                <Table dark borderd hover responsive>
                    <tbody>
                        {this.state.display}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default Application;