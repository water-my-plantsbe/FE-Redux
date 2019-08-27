import React from 'react';
import { userLogin } from '../../actions/default';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Form } from 'reactstrap';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.history.push('/');
        }
    }
    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    };
    handlePassword = (e) => {
        e.preventDefault();
        let username = this.state.userInput;
        let password = this.state.passInput
        this.props.userLogin(username, password);
        this.setState({
            username: '',
            password: ''
        });
    }

    render() {
        return (
            <div>
                <FormWrapper>
                    <UserBar>
                        <h1>Login</h1>
                        <Form onSubmit={this.handlePassword} className='loginform'>
                            <input
                                className='input'
                                type="text"
                                placeholder="username or email"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInput}
                            />
                            <input
                                className='input'
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleInput}
                            />
                            <Button className="input" onClick={this.handlePassword}>Log in</Button>
                        </Form>
                        <div className='regLink'>
                            <RegisterLink to="/register">Don't have an account? <strong>Sign Up Here!</strong></RegisterLink>
                        </div>

                    </UserBar>
                </FormWrapper>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        loggingIn: state.loggingIn
    }
};


export default connect(mapStateToProps, { userLogin })(Login);
const FormWrapper = styled.div`
      width: 100%;
      height: 100%;
`
const UserBar = styled.div`
    box-shadow: 0px 2px 2px purple;
    text-align : center;
    width: 400px;
    border-radius: 5px;
    padding-top: 60px;
    padding-bottom: 60px;
    margin: 50px auto;
    a{
      text-decoration: none;
    }
    .input{
          margin: 5px;
          height: 25px;
          width : 300px;
          border-radius: 5px;
          border: none;
          box-shadow: 0 2px 4px #272727;
          text-align:center;
          @media(max-width: 479px){
              width: 250px;
          }
    }
      button{
        background-color: #009FB7;
        border-radius: 5px;
        color : white;
        margin: 10px;
        height: 30px;
        border: none;       
      }
      button:hover{
          box-shadow: 0 2px 4px #272727;
          transform: scaleX(1.025) scaleY(1.025);
          cursor : pointer;
          transition: all 0.2s;
      }
      .regLink{
          margin-top: 40px;
      }
  `
const RegisterLink = styled(Link)`
    font-size: 1rem;
    margin: 20px 20px;
    &:visited {
        color: rgba(0, 0, 0, .5);
    }
    &:hover{
        color: blue;
    }
    a{
        padding: 10px;
    }
`;