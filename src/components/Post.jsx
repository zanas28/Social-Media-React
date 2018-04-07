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
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            visible: false,
            posts: [],
            images: []
        }
    }

    showDeleteConfirm = () => {
        confirm({
          title: 'Are you sure delete this post?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk(id) {
            console.log('OK');
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
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

    showModal = () => {
        this.setState({
            visible: true,
          });
    }

    onSubmit = (e) => {
        this.setState({
            visible: false
        })
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

    render() {
        const { posts, images } = this.state;

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
                            value={this.props.title}
                            onChange={this.onChange}
                            placeholder='Title'
                        />
                    </FormItem>
                    <FormItem>
                        <TextArea 
                            rows={4}
                            name='body'
                            onChange= {this.onChange}
                            value={this.props.body}
                            placeholder='Your Post'  
                        />
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

export default Post;