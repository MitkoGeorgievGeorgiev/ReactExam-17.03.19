import React from 'react'
import {Link} from 'react-router-dom'
class PostDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: null,
            postForEditting :{}
        }
    }
    componentDidMount() {
        fetch(`http://localhost:9999/feed/post/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.token}`,
            }})
            .then(res => res.json())
            .then(post => {
                this.setState({ post: post.post,
                 postForEditting:this.state.post})
            })
    }
    render() {
        return (<div>
            {!this.state.post
                ? <div className="d-flex justify-content-center">
                    <div>Loading. . .   </div>

                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className="card text-center">
                    <div className="card-header">
                        {this.state.post.title}
            </div>
                    <div className="card-body">
                        <h5 className="card-title">Продавач : {this.state.post.author}</h5>
                        <img src={this.state.post.image} className="card-img-top" alt="..." />
                        <p className="card-text">{this.state.post.content}</p>
                        <Link to="#" className="btn btn-primary">Набери </Link><span> : {this.state.post.phone}</span><br/>
                        <Link to="#" className="btn btn-primary">Изпрати съобщение до </Link><span > : {this.state.post.author}</span>

                    </div>
                    <div className="card-footer text-muted">
                        {this.state.post.date}
            </div>
                </div>}
        </div>



        )
    }
}

export default PostDetails