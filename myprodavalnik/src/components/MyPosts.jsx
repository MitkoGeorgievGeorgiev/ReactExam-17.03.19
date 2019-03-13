import React from 'react'
import {Link} from 'react-router-dom'
class MyPosts extends React.Component {
    constructor(props) {
        super(props)
        
        this.state={
            posts:[]
        }
    }
    
    componentDidMount() {
        fetch(`http://localhost:9999/feed/user/${localStorage.userId}`)
            .then(res => res.json())
            .then(data => {
               this.setState({
                   posts:data.user.posts
               })
               
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
                    <div key ={index} className="card" style={{ width: '18rem' }}>
                            <p className="card-text">{post.title}</p>
                        <img src={post.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-title">Описание</p>
                            <p className="card-text">{post.content}</p>
                            <h5 className="card-title">Цена</h5>

                            <p className="card-text">{post.price} BGN</p>

                            <Link to={`/post/details/${post._id}`} onClick={this.props.postToEdit} className="btn btn-primary">Детайли</Link>
                        </div>
                    </div>

                )
                )
                : null}
        </div>

        )
    }
}

export default MyPosts