import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
             
            error:''

        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.id]:event.target.value
          })
    }
    handleSubmit(event){
        event.preventDefault()
        this.props.logIn(this.state)
    }
    render(){
        if (this.props.name) {
            return <Redirect to='/' />
        }
        return(
            <div className="form-wrapper">
                <h2>Вход</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Имейл</label>
                        <input type="text" name="email" id="email" placeholder="Enter e-mail"  value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Парола</label>
                        <input type="password" name="password" id="password" placeholder="Enter password"  value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" >Вход</button>
                </form>
            </div>
            
            
        )
    }
}
export default Login
