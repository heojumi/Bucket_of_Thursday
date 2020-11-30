import React from 'react';
import {Link} from 'react-router-dom';

const Bucket = (props) =>{
    return(
        <div style={{color : 'red'}}>
            <h2>Title : {props.title}</h2>
        </div>
    );
}

export default Bucket;