import React from 'react';
import "../css/login.css"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            come: true
        };
    }

    change(){
        let newCome = !this.state.come;
        this.setState({
            come: newCome
        });
    }

    send(id, login) {
        document.querySelector(`#${id}`).addEventListener("submit",function(e){
            let email = document.querySelector("#email").value;
            let password = document.querySelector("#password").value
            e.preventDefault();
            let info_body = {
                user_email: email,
                user_password: password
            }
            fetch(`http://127.0.0.1:5000/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(info_body),
            })
                .then(response => response.text())
                .then(result => {
                    if (JSON.parse(result)) {
                        let newAkk = JSON.parse(result);
                        login(email, 
                            password,
                            newAkk.radius,
                            newAkk.evol,
                            newAkk.growPx,
                            newAkk.growEvol,
                            newAkk.color);
                    } else {
                        return false
                    }
                })
                .catch(error => console.log('error', error));
                return false
        })
    }

    dontSend(id){
        document.querySelector(`#${id}`).removeEventListener("submit")
    }

    componentDidMount(){
        if (this.state.come) {
            this.send("login", this.props.login)
        } else {
            this.send("register");
        }
    }

    componentDidUpdate(){
        if (this.state.come) {
            this.send("login", this.props.login)
        } else {
            this.send("register");
        }
    }

    render() {
        if (this.state.come) {
            return (
                <div className="login">
                    <div className="login-row">
                        <h2 className="active">Войти</h2>
                        <h2>/</h2>
                        <h2 onClick={() => this.change()}>Регистрация</h2>
                    </div>
                    <form className="login-form" id="login">
                        <input type="text" placeholder="Email" id="email"/>
                        <input type="password" placeholder="Пароль" id="password"/>
                        <input type="submit" value="Войти"/>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="login">
                    <div className="login-row">
                        <h2 onClick={() => this.change()}>Войти</h2>
                        <h2>/</h2>
                        <h2 className="active">Регистрация</h2>
                    </div>
                    <form className="login-form" id="register">
                        <input type="text" placeholder="Email" id="email"/>
                        <input type="password" placeholder="Пароль" id="password"/>
                        <input type="submit" value="Войти"/>
                    </form>
                </div>
            );
        }
    }
}

export default Login;