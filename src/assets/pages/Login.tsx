import { ChangeEvent, useState } from "react";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import './Login.css'
import Style from "./Login.module.css";
import axios from "axios";
import { setSessionInfo } from '../global/sessionInfo'

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setLoginFail] = useState(false);

    //Necessita da dependência 'react-cookie'
    const [,setCookie,] = useCookies(["auth"]);

    const navigate = useNavigate();

    const handleUserOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handlePasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    async function authUser(userName: string): Promise<boolean>{
        try{
            const res = await axios.get(`https://spw-api-production.up.railway.app/users/username/${userName}`);

            if(user === res.data.nome && password === res.data.senha){
                setSessionInfo(user);
                return true;
            }else{
                return false;
            }
        }catch(error: any){
            console.log(`Erro ao processar a requisição: ${error}`);
            return false;
        }
    }
    
    const handleOnClick = async () => {
        if (await authUser(user)){
            setCookie("auth", user);
            navigate("/spw/to-do-list");
        }else{
            setLoginFail(true);
            setUser("");
            setPassword("");
            alert("Usuário ou senha incorreto!");
            setLoginFail(false);
        }
    };

    return (
        <div className={Style.LoginContainer}>
            <div className={Style.LoginForm}>
                <MyInput
                    type="text"
                    placeholder="Usuário"
                    placeholderFocusedColor="white"
                    onChange={handleUserOnChange}
                    value={loginFail ? "" : user}
                    style={{
                        width: "70%",
                        height: "50px",
                        backgroundColor: "#f0f0f0",
                        margin: "5px"
                    }}
                    focusStyle={{
                        backgroundColor: "gray",
                        color: "white",
                    }}
                />

                <MyInput
                    type="password"
                    placeholder="Senha"
                    placeholderFocusedColor="white"
                    onChange={handlePasswordOnChange}
                    value={loginFail ? "" : password}
                    style={{
                        width: "70%",
                        height: "50px",
                        backgroundColor: "#f0f0f0",
                        margin: "100px 0"
                    }}
                    focusStyle={{
                        backgroundColor: "gray",
                        color: "white",
                    }}
                />

                <MyButton
                    onClick={handleOnClick}
                    style={{
                        width: "30%",
                        backgroundColor: "#f0f0f0",
                        margin: "5px"
                    }}
                >
                    Entrar
                </MyButton>
            </div>
        </div>
    );
}

export default Login;
