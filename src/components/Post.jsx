import React, {Component} from 'react';
import { List, Avatar, Button, Spin, Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const confirm = Modal.confirm;

import PostForm from './PostForm';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // loading: true,
            // loadingMore: false,
            // showLoadingMore: true,
            visible: false,
            posts: [],
            images: [],
            title: '',
            body: ''
        }
    }

    showDeleteConfirm = (id) => {
        confirm({
          title: 'Are you sure delete this post?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
            fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
                method: 'DELETE'
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    componentWillMount() {
        this.getPosts();
        // console.log(this.state.images);
        // this.onDelete();
    }

    getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            this.setState(({posts : data}))
        })
    }

    // getImages = () => {
    //     fetch('https://jsonplaceholder.typicode.com/photos')
    //     .then(res => res.json())
    //     .then(imgs => {
    //         this.setState(({images : imgs}))
    //     })
    // }

    onEdit = (e) => {
        console.log(`edit ini ${e.target.title}`);
    }

    showModal = (id) => {
        this.setState({
            visible: true,
        });

        console.log(id);
    }

    onSubmit = (e) => {
        this.setState({
            visible: false
        })
        console.log('this is on SUBMIT');
    }

    onCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    handleAddPost = (post) => {
        let posts = this.state.posts;
        // console.log(post);
        posts.unshift(post);
        this.setState({posts:posts});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    // onDelete = (id) => {
    //     // let idPost = this.state.posts.findIndex(

    //     console.log(id);
    // }

    render() {
        const { posts} = this.state;

        // console.log(posts.map(post => post.id));

        return(
            <div className='list-post'>
                <PostForm addPost={this.handleAddPost} style={{width:'50%'}}/>
                <List
                    // loading={loading}
                    itemLayout='horizontal'
                    // loadMore={loadMore}
                    dataSource={posts}
                    renderItem={item => (
                        <List.Item actions={[<Button onClick={this.showModal}>Edit</Button>, <Button onClick={this.showDeleteConfirm}>Delete</Button>]}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={item.title}
                                description={item.body}
                            />
                        </List.Item>
                    )}
                />

                <Modal
                    title="Edit This Post"
                    visible={this.state.visible}
                    onOk={this.onSubmit}
                    onCancel={this.onCancel}
                >
                    <FormItem>
                        <Input
                            type='text'
                            name='title'
                            value={this.state.title}
                            onChange={this.onChange}
                            placeholder='Title'
                        />
                    </FormItem>
                    <FormItem>
                        <TextArea 
                            rows={4}
                            name='body'
                            onChange= {this.onChange}
                            value={this.state.body}
                            placeholder='Your Post'  
                        />
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

export default Post;