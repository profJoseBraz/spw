import { ChangeEvent, useState } from "react";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import axios from "axios";
import { domain } from "../global/environments";

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setLoginFail] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);

    const navigate = useNavigate();

    const handleUserOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handlePasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    async function authUser(userName: string, password: string): Promise<string | null> {
        try {
            const res = await axios.post(`${domain}/auth/authenticate`, {
                userName,
                password
            });

            const userData = axios.get(`${domain}/users/username/${user}`, {
                headers:{
                    Authorization: res.data.token
                }
            })

            const userId = (await userData).data.id

            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('userName', userName);
            sessionStorage.setItem('token', res.data.token);

            // Se o usuário foi autenticado com sucesso, o backend deve retornar um token JWT
            return res.data.token;
        } catch (error) {
            console.error(`Erro ao processar a requisição: ${error}`);
            return null;
        }
    }

    const handleLoginClick = async () => {
        const token = await authUser(user, password);
        
        if (token){
            navigate("/to-do-list");
        }else{
            setLoginFail(true);
            setUser("");
            setPassword("");
            alert("Usuário ou senha incorreto!");
            setLoginFail(false);
        }
    };

    const handleCreateAccountClick = () => {
        setCreateAccount(true);
    }

    return (
        <div className={style.LoginContainer}>
            <div className={style.GreetingsPanel}>
                <div className={style.GreetingsText}>
                    <h1>Bem vindo!</h1>
                    <p>Esta é uma aplicação web exemplo desenvolvida especialmente para o curso de Programador Web do Senac de Campo Mourão - Paraná.</p>
                    <MyButton
                    style={{
                        width: "50%",
                        backgroundColor: "#fd1a7d",
                        color: "white"
                    }} 
                    onClick={handleCreateAccountClick}>Criar conta</MyButton>
                </div>
                <div className={style.LoginForm}>
                    <h1 className={style.Title}>Entra<h1 className={style.TitleEmphasis}>aí!</h1></h1>
                    <MyInput
                        type="text"
                        placeholder="Usuário"
                        placeholderFocusedColor="white"
                        onChange={handleUserOnChange}
                        value={loginFail ? "" : user}
                        style={{
                            width: "100%",
                            height: "50px",
                            backgroundColor: "#f0f0f0"
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
                            width: "100%",
                            height: "50px",
                            backgroundColor: "#f0f0f0",
                            marginTop: "calc(5vh)"
                        }}
                        focusStyle={{
                            backgroundColor: "gray",
                            color: "white",
                        }}
                    />

                    {createAccount &&
                        <> 
                            <MyInput
                                type="password"
                                placeholder="Confirme sua senha"
                                placeholderFocusedColor="white"
                                onChange={handlePasswordOnChange}
                                value={loginFail ? "" : password}
                                style={{
                                    width: "100%",
                                    height: "50px",
                                    backgroundColor: "#f0f0f0",
                                    marginTop: "calc(5vh)",
                                    fontSize: "calc(.8vw + .8vh)"
                                }}
                                focusStyle={{
                                    backgroundColor: "gray",
                                    color: "white",
                                }}
                            />
                        </>
                    }

                    {!createAccount &&
                        <p className={style.ForgotPassword}>Esqueci a senha</p>
                    }

                    <MyButton
                        onClick={handleLoginClick}
                        style={{
                            width: "60%",
                            height: "50px",
                            backgroundColor: "#fd1a7d",
                            color: "white",
                            borderRadius: "100px",
                            margin: "calc(5vh)"
                        }}
                    >
                        {createAccount ? "Criar conta" : "Entrar"}
                    </MyButton>

                    {!createAccount &&
                        <p 
                        onClick={handleCreateAccountClick}
                        style={{
                            color: "#fd1a7d",  
                            textDecoration: "underline", 
                            cursor: "pointer", 
                            fontSize: "calc(0.7vw + 0.7vh)",
                            fontWeight: "800"}}
                        >Ainda não tenho conta</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Login;
