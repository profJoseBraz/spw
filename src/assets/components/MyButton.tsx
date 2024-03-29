import { CSSProperties, ReactNode } from "react";
import style from "./MyButton.module.css";

interface Props {
    children: ReactNode;
    style?: CSSProperties;
    onClick: () => void;
}

function MyButton(props: Props) {
    return (
        <button
            className={style.MyButton}
            onClick={props.onClick}
            style={props.style}
        >
            {props.children}
        </button>
    );
}

export default MyButton;
