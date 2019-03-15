import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
class AllPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            search: ''
        }
        this.handleChange = this.handleChange.bind(this)

    }
    componentDidMount() {
        fetch('http://localhost:9999/feed/posts')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    posts: data.posts,
                    search: ''
                })
            })
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    render() {
        const searched = this.state.search.toLowerCase()
        const filteredPosts = this.state.posts.filter(post => post.title.toLowerCase().includes(searched))

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
            <Fragment>
                {localStorage.name
                    ? <div className='center'>
                        <input type="text" id="search" value={this.state.search} onChange={this.handleChange} placeholder='Търсене' />
                    </div>
                    : null
                }
                <br />
                <div className='row'>
                    {filteredPosts.map((post, index) => (
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
                    ))}
                </div>
            </Fragment>

        )
    }
}

export default AllPosts