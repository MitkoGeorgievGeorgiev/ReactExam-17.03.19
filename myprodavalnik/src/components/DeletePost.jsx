import React from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

class DeletePost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
        this.redirect = this.redirect.bind(this)
        this.deletePost = this.deletePost.bind(this)

    }
    redirect() {
        this.setState({
            redirect: true
        })
    }
    deletePost() {
        fetch(`http://localhost:9999/feed/post/delete/${this.props.match.params.postId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.token}`
            },
        })
            .then(res => res.json())
            .then(body => {
                this.setState({
                    redirect: true
                })
                toast.info(body.message)
            })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/posts/all' />
        }
        return (
            <div><h1>Сигурни ли сте че искате да изтриете тази обява?</h1>
                <p><button onClick={this.deletePost}>Да</button> <button className="red" onClick={this.redirect}>НЕ</button></p></div>
        )
    }
}
export default DeletePost