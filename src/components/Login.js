import React from "react";
import { useCookies } from "react-cookie";

function Login({ handleRegistClicked }) {
    const [inputId, setInputId] = React.useState('');
    const [inputPw, setInputPw] = React.useState('');
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onSubmitAccount = () => {
        console.log(inputId);
        console.log(inputPw);
        let after30m = new Date();
        after30m.setMinutes(new Date().getMinutes() + 30);
        setCookie("user", { id: inputId, name: "user name" }, { path: "/", expires: after30m });
    };
    return (
        <div className="login">
            <div className="login-input">
                <div>
                    <input
                        name="id"
                        placeholder="ID"
                        onChange={handleInputId} />
                    <input
                        name="password"
                        placeholder="Password"
                        onChange={handleInputPw} />
                </div>
                <button onClick={onSubmitAccount}>로그인</button>
            </div>
            <div className="login-sub">
                <p onClick={handleRegistClicked}>회원 가입</p>
            </div>
        </div>
    );
}

export default Login