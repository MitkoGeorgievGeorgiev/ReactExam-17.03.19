import React,{Component} from 'react'

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
        return(
            <div className="form-wrapper">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" id="email" placeholder="Enter e-mail"  value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter password"  value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" >Log in</button>
                </form>
            </div>
            
            
        )
    }
}
export default Login