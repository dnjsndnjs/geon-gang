import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom"
import server from "../functions/server";


function Login({ handleRegistClicked }) {
    const [inputId, setInputId] = React.useState('');
    const [inputPw, setInputPw] = React.useState('');
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const passwordFocus = React.createRef();

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onSubmitAccount = async () => {
        const data = await server.login(inputId, inputPw);
        if (typeof data === 'string') {
            window.alert(data);
            return
        }
        let after30m = new Date();
        after30m.setMinutes(new Date().getMinutes() + 30);
        setCookie("user", data, { path: "/", expires: after30m });
    };

    const idKeyDown = (e) => {
        if (e.key === 'Enter') {
            passwordFocus.current.focus();
        }
    }

    const passwordKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmitAccount();
        }
    }

    return (
        <div className="login">
            <div className="login-input">
                <div>
                    <input
                        name="id"
                        placeholder="ID"
                        onChange={handleInputId}
                        onKeyDown={idKeyDown} />
                    <input
                        ref={passwordFocus}
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInputPw}
                        onKeyDown={passwordKeyDown} />
                </div>
                <button onClick={onSubmitAccount}>로그인</button>
            </div>
            <div className="login-sub">
                <Link to="/regist" style={{ color: 'black', textDecoration: 'none' }}>
                    <p onClick={handleRegistClicked}>회원 가입</p>
                </Link>
            </div>
        </div>
    );
}

export default Login