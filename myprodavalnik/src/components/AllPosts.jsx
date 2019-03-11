import React from 'react'

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
                    <div>Loading. . .   </div>

                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            )

        }

        return (<div class="row">
            {this.state.posts.length ?
                this.state.posts.map((post, index) => (
                    <div className="card" style={{ width: '18rem' }}>
                            <p className="card-text">{post.title}</p>
                        <img src={post.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-title">Описание</p>
                            <p className="card-text">{post.content}</p>
                            <h5 className="card-title">Цена</h5>

                            <p className="card-text">{post.price} BGN</p>

                            <a href={`/post/details/${post._id}`}  className="btn btn-primary">Детайли</a>
                        </div>
                    </div>

                )
                )
                : null}
        </div>

        )
    }
}

export default AllPosts