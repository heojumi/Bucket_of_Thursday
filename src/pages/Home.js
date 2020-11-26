import React from 'react';
import {Menu} from '../components';
import './Home.css';

lists =[
    {
        bid : 1,
        title : 'bucket 1',
        status : 1,
    },
    {
        bid : 1,
        title : 'bucket 1',
        status : 1,
    },
    {
        bid : 1,
        title : 'bucket 1',
        status : 1,
    }
]

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
            lists : [],
        }
    }
    //Loading 되기 전에 발생하는 이벤트 cycle
    componentDidmount = () => {

    }

    postLogin = () => {
        console.log('post login');
        alert('login');
    }

    render(){
        return(
            <div class="login-page">
                <div class="form">
                    <form class="register-form">
                        <input type="text" placeholder="name"/>
                        <input type="password" placeholder="password"/>
                        <input type="text" placeholder="email address"/>
                        <button>create</button>
                        <p class="message">Already registered? <a href="#">Sign In</a></p>
                    </form>
                    <form class="login-form">
                        <input type="text" placeholder="username"/>
                        <input type="password" placeholder="password"/>
                        <button onClick={this.postLogin}>login</button>
                        <p class="message">Not registered? <a href="#">Create an account</a></p>
                    </form>
                </div>
            </div>
        );
    }
};

export default Home;