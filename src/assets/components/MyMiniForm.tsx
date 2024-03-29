import { ChangeEvent } from "react";
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import style from "./MyMiniForm.module.css";
import { CSSProperties } from "styled-components";

interface Props {
    inputValue: string;

    style?: CSSProperties;

    onButtonClick: () => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function MyMiniForm(props : Props) {
    return (
        <div className={style.formContainer} style={props.style}>
            <MyInput
                type="text"
                placeholder="Digite algo"
                placeholderFocusedColor="white"
                onChange={props.onInputChange}
                value={props.inputValue}
                style={{
                    width: "fit-content",
                    height: "fit-content",
                    margin: "10px"
                }}
                focusStyle={{
                    backgroundColor: "#8b129d",
                    color: "white",
                }}
            />
            <MyButton 
                onClick={props.onButtonClick} 
                style={{ 
                    width: "fit-content",
                    height: "fit-content",
                    // margin: "10px"
                }}
            >
                adicionar
            </MyButton>
        </div>
    );
}

export default MyMiniForm;
