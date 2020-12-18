import React, {Component} from 'react';
import {axios} from 'axios';
import {Link} from 'react-router-dom';
import {Menu} from '../components';
import {Main} from '.';
import './Home.css';
import styled from 'styled-components';
import { wrap } from 'module';

class Join extends Component {
    
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    
    event = () =>{
        
    }

    componentDidMount(){
        
    }
    
    render(){
        return(
            <div class="login-page">
            <div class="form">
                <form class="login-form">
                    <input type="text" name="id" placeholder="ID"/>
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="nickname" placeholder="Nickname"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="text" name="email" placeholder="Email address"/>
                    <button>create</button>
                    <p class="message">Already registered? <a href="/">Sign In</a></p>
                </form>
                </div>
            </div>
        );
    }   
}

export default Join;