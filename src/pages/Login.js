import React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from '../components';
import {Main} from '.';
import './Home.css';
import {GoogleLogin} from 'react-google-login'
import styled from 'styled-components';
import { wrap } from 'module';
const lists =[
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

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
            list : [],
        }
    }
    //Loading 되기 전에 발생하는 이벤트 cycle
    componentDidmount = () => {

    }

    postLogin = () => {
        console.log('post login');
        alert('login');
    }
// 구글로그인 구현시 보내주는 데이터
    responseGoogle=(res) => {
        console.log(res);
    }
    responseFail=(err) => {
        console.log(err);
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
                        <p class="message">Already registered? <a href="join">Sign In</a></p>
                    </form>
                    <form class="login-form">
                        <input type="text" placeholder="username"/>
                        <input type="password" placeholder="password"/>
                        <button onClick={this.postLogin}>login</button>
                        <p class="message">Not registered? <a href="main">Create an account</a></p>
                    </form>
                </div>
                {/* 구글로그인 구현 */}
                <div>
                        <GoogleLogin
                            clientId='385363013494-8rquobiju2nk4ekkh0m8i6biqvmu16ov.apps.googleusercontent.com'//{process.env.REACT_APP_Google}
                            buttonText="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseFail}
                            />
                </div>
            </div>
        );
    }
};
export default Login;