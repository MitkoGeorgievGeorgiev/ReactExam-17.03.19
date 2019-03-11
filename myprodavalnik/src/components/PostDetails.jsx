import React from 'react'

class PostDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            post:null
        }
    }
    componentDidMount(){
        fetch(`http://localhost:9999/feed/post/${post.id}`)
        .then(res => res.json())
        .then(post => {
            this.setState({ post: post })
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
                    Featured
            </div>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                <div className="card-footer text-muted">
                    2 days ago
            </div>
            </div> }
        </div>
            
            

        )
    }
}

export default PostDetails