import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
class CreatePost extends Component {
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
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        this.props.createPost(this.state)
    }
    render() {
        if (this.props.postCreated) {
            return <Redirect to='/' />
        }
        return (
            <div className="form-wrapper">
                <h2>Добавяне на нова обява</h2>
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
                        <label htmlFor="content">Телефон за контакти</label>
                        <input type="number" name="phone" id="phone" placeholder="Enter phone number" value={this.state.phone} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Цена BGN</label>
                        <input type="number" name="price" id="price" placeholder="Enter price" value={this.state.price} onChange={this.handleChange} />
                    </div>
                    <button type="submit" >Създай</button>
                </form>
            </div>
        )
    }
}
export default CreatePost
