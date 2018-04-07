import React, {Component} from 'react';
import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = (e) => {
        console.log(`${this.state.title} and ${this.state.body}`)
        const post = {
            title: this.state.title,
            body: this.state.body
        }

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            // Convert a JavaScript object into a string with JSON.stringify().
            body: JSON.stringify(post)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        
        e.preventDefault();
    }

    render() {
        return (
        <Form onSubmit={this.onSubmit} className = 'input-form'>
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
            <FormItem>
                <Button type="primary submit">POST</Button>
            </FormItem>
        </Form>
        );
    }
}

// const WrappedApp = Form.create()(PostForm);

export default PostForm;