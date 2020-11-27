import React,{Component} from 'react';
import axios from 'axios';
class Main extends Component {

    constructor(props){
        super(props);
        this.state={
            text : '',
            text2 : '',
        }
    }

    componentDidMount=async()=>{
        this.getMain()
    }

    getMain = async() =>{
        await axios.get("http://localhost:5000/")
        .then((res)=>{
            console.log(res)
            this.setState({text:res.data.text, text2:res.data.text2});
        }).catch((err)=>{
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <h2>Main Text : {this.state.text}</h2>
                {this.state.text2}
            </div>
        );
    }
};

export default Main;