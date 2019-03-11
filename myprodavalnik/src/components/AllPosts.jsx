import React from 'react'

class AllPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
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

        return (
            null
        )
    }
}

export default AllPosts