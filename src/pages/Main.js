import React,{Component} from 'react';
import axios from 'axios';
import {Bucket} from '../components';
class Main extends Component {

    constructor(props){
        super(props);
        this.state={
            lists : [],
        }
    }

    componentDidMount=async()=>{
        this.getMain()
    }

    getMain = async() =>{
        await axios.get("http://localhost:5000/")
        .then((res)=>{
            this.setState({lists:res.data.lists});
        }).catch((err)=>{
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <h2>Main Text</h2>
                {this.state.lists.map((val, i)=>{return <Bucket title={val.title}/>})}
            </div>
        );
    }
};

export default Main;