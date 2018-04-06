import React, {Component} from 'react';
import { List, Avatar, Button, Spin } from 'antd';

import reqwest from 'reqwest';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            posts: [],
            images: []
        }
    }

    componentDidMount() {
        this.getPosts();
        // console.log(this.state.images);
    }

    getPosts() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            this.setState(({posts : data}))
        })
    }

    getImages() {
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(res => res.json())
        .then(imgs => {
            this.setState(({images : imgs}))
        })
    }

    deleteData(item) {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${item}`, {
            method: 'DELETE'
        })
    }

    render() {
        const { posts, images } = this.state;

        return(
            <List
                className='list-post'
                // loading={loading}
                itemLayout='horizontal'
                // loadMore={loadMore}
                dataSource={posts}
                renderItem={item => (
                    <List.Item actions={[<a>edit</a>, <a onClick={this.deleteData(item.id)}>Delete</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.body}
                        />
                    </List.Item>
                )}
            />
        )
    }
}

export default Post;