import React, {Component} from 'react';
import {DatePicker} from 'antd';
import Post from './Post.jsx';
import PostForm from './PostForm';

import style from '../css/style.css';

class App extends Component {

    render() {
        return(
            <div
                className='app'
            >
                <h1 className='buttonTest'>Social Media</h1>
                <PostForm />
                {/* <br /> */}
                <Post />
            </div>
        )
    }
};

export default App;