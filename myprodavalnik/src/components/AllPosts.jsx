import React from 'react'
import { Link } from 'react-router-dom'
class AllPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:9999/feed/posts')
            .then(res => res.json())
            .then(posts => {
                this.setState({ posts: posts.posts })
            })
    }
    render() {
        if (!this.state.posts.length) {
            return (
                <div className="d-flex justify-content-center">
                    <div>Не са намерени обяви   </div>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        return (
        <div className="row">
            {this.state.posts.length ?
                this.state.posts.map((post, index) => (
                    <div key={index} className="card" style={{ width: '18rem' }}>
                        <p className="card-text">{post.title}</p>
                        <img src={post.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-title">Описание</p>
                            <p className="card-text">{post.content}</p>
                            <h5 className="card-title">Цена</h5>
                            <p className="card-text">{post.price} BGN</p>
                            <Link to={`/post/details/${post._id}`} className="btn btn-primary">Детайли</Link>
                        </div>
                    </div>
                )) : null}
        </div>

        )
    }
}

export default AllPosts