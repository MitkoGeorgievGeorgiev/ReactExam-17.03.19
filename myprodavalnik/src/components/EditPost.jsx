import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            image: '',
            content: '',
            price: '',
            author: localStorage.name,
            phone: '',


        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editPost = this.editPost.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        this.editPost(this.state)
    }
    editPost(data) {


        fetch(`http://localhost:9999/feed/post/update/${this.props.match.params.postId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.token}`
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(body => {
                

                toast.info(body.message)
                if (body.success) {
                    //todo redirect

                }
            })
    }
    componentDidMount(){
        fetch(`http://localhost:9999/feed/post/${this.props.match.params.postId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.token}`
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            // body: JSON.stringify(data)
        })
            .then(res =>res.json() 
            )
            .then(body => {
                
                this.setState({
                    title: body.post.title,
                image: body.post.image,
                content: body.post.content,
                price: body.post.matchprice,
                author: body.post.author,
                phone: body.post.phone,})
            //     toast.info(body.message)
            //     if (body.success) {
            //         //todo redirect

            //     }
            })
    
    }
    render() {


        return (

            <div className="form-wrapper">
                <h2>Редактиране на обявата</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Заглавие</label>
                        <input type="text" name="title" id="title" placeholder="Enter title" value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Изображение</label>
                        <input type="text" name="image" id="image" placeholder="Enter image url" value={this.state.image} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Описание</label>
                        <textarea type="text" name="content" id="content" placeholder="Enter description" value={this.state.content} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон за контакти</label>
                        <input type="text" name="phone" id="phone" placeholder="Enter phone number" value={this.state.phone} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Цена BGN</label>
                        <input type="text" name="price" id="price" placeholder="Enter price" value={this.state.price} onChange={this.handleChange} />
                    </div>
                    <button type="submit" >Редактирай</button>
                </form>
            </div>


        )
    }
}
export default EditPost
