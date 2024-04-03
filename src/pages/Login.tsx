import { ChangeEvent, useState } from "react";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import './Login.css'
import style from "./Login.module.css";
import axios from "axios";
// import { setSessionInfo } from '../global/sessionInfo'

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setLoginFail] = useState(false);

    //Necessita da dependência 'react-cookie'
    // const [,setCookie,] = useCookies(["auth"]);

    const navigate = useNavigate();

    const handleUserOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handlePasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // async function authUser(userName: string): Promise<boolean>{
    //     try{
    //         const res = await axios.get(`https://spw-api-production.up.railway.app/users/username/${userName}`);

    //         if(user === res.data.nome && password === res.data.senha){
    //             setSessionInfo(user);
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     }catch(error: any){
    //         console.log(`Erro ao processar a requisição: ${error}`);
    //         return false;
    //     }
    // }
    
    async function authUser(userName: string, password: string): Promise<string | null> {
        try {
            const res = await axios.post('https://spw-api-production.up.railway.app/users/auth/authenticate', {
                userName,
                password
            });
    
            // Se o usuário foi autenticado com sucesso, o backend deve retornar um token JWT
            return res.data.token;
        } catch (error) {
            console.error(`Erro ao processar a requisição: ${error}`);
            return null;
        }
    }

    const handleOnClick = async () => {
        const token = await authUser(user, password);
        
        if (token){
            // setCookie("auth", user);
            navigate("/to-do-list");
        }else{
            setLoginFail(true);
            setUser("");
            setPassword("");
            alert("Usuário ou senha incorreto!");
            setLoginFail(false);
        }
    };

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
                    onClick={() => {}}>Criar conta</MyButton>
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
                    <p className={style.ForgotPassword}>Esqueci a senha</p>
                    
                    <MyButton
                        onClick={handleOnClick}
                        style={{
                            width: "60%",
                            height: "50px",
                            backgroundColor: "#fd1a7d",
                            color: "white",
                            borderRadius: "100px",
                            margin: "calc(5vh)"
                        }}
                    >
                        Entrar
                    </MyButton>
                </div>
            </div>
        </div>
    );
}

export default Login;
