import React from "react";
import server from "../../../functions/server";
import util from "../../../functions/util";

function UserData() {
    const [userName, setName] = React.useState('');
    const [userPw, setPw] = React.useState('');
    const [userGoalText, setGoalText] = React.useState('');

    const userId = sessionStorage.getItem('id');

    async function initialFunc() {
        if (userId === null) { return }
        const userData = await server.userData(userId);
        setName(userData.userName);
        setGoalText(userData.userGoalText);
    }

    React.useEffect(() => {
        initialFunc();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        const result = window.confirm(util.confirmMessage);
        if (!result) { return }
        const data = {
            id: userId,
            name: userName,
            password: userPw,
            goalText: userGoalText
        }
        await server.updateUserData(data);

    }

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td>
                            <input
                                type="text"
                                name="userId"
                                value={userId}
                                readOnly
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td>
                            <input
                                type="text"
                                name="userName"
                                value={userName}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <input
                                type="password"
                                name="userPw"
                                value={userPw}
                                onChange={(e) => setPw(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>각오 한마디</th>
                        <td>
                            <input
                                type="text"
                                name="userGoalText"
                                value={userGoalText}
                                onChange={(e) => setGoalText(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th />
                        <td><button style={{ float: 'right' }} type="submit">수정</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default UserData