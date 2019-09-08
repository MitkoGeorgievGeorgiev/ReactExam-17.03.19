import React from 'react'
import { ToastContainer, toast } from 'react-toastify';


const fetchData=(method,data)=>{
    const fetchMethod={
        signIn:'auth/signin',
        signUp:'auth/signup',
        createPost:'feed/post/create'
    }

   return fetch(`http://localhost:9999/${fetchMethod[method]}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(data),
      
    })
      .then(res => res.json())
      // .then(body => {
      //   toast.info(body.message)
      //   if (body.name) {     
      //     localStorage.setItem('name', body.name)
      //     localStorage.setItem('token', body.token)
      //     localStorage.setItem('userId', body.userId)
      //     this.setState({
      //       name: body.name
      //     })
      //   }
      //   if (body.success) {
      //       this.setState({
      //         postCreated: true
      //       })
      //     }
        
      // })

}
export default fetchData