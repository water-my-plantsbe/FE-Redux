import React from 'react';
import { userRegister } from '../../actions/default';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Form } from 'reactstrap';
import { connect } from 'react-redux';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            phone: '',
            formError: ''
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
    formValidation = (phone) => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                formError: 'Passwords do not match!'
            });
            return false;
        }

        //check if phone number matches E.164 phone number format - To match Twilio API phone number specifications.
        let phoneRegex = RegExp(/^\+?[1-9]\d{1,14}$/);
        if (phoneRegex.test(phone) === false) {
            this.setState({
                formError: 'Phone number must include country code. Example US number: +13609554732'
            })
            return false;
        }
        return true;
    }
    clearFormError = () => {
        this.setState({
            formError: ''
        });
    }
    handlePassword = (e) => {
        e.preventDefault();
        // If formValidation fails, it will return false. If so, don't submit form.
        if (!this.formValidation(this.state.phone)) return;
        let { username, email, phone, password } = this.state;
        this.props.userRegister(username, email, phone, password);
        this.setState({
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            phone: '',
        });
    }

    render() {
        return (
            <div>
                <FormWrapper>
                    <UserBar>
                        <h1>Register</h1>
                        <Form onSubmit={this.handlePassword} className='loginform'>
                            <input
                                className='input'
                                type="text"
                                placeholder="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInput}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInput}
                            />
                            <input
                                className='input'
                                type="number"
                                placeholder="phone"
                                name="phone"
                                value={this.state.phone}
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
                            <input
                                className='input'
                                type='password'
                                placeholder='Password'
                                name='confirmPassword'
                                value={this.state.confirmPassword}
                                onChange={this.handleInput}
                            />
                            <Button className="input" onClick={this.handlePassword}>Register</Button>
                        </Form>
                        <div className='regLink'>
                            <RegisterLink to="/login">Already have an account? <strong>Sign In Here!</strong></RegisterLink>
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
        registering: state.registering,
        registered: state.registered
    }
};

export default connect(mapStateToProps, { userRegister })(Register);

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

