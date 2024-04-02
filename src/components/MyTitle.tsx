import { CSSProperties, ReactNode } from "react";
import style from "./MyTitle.module.css";

interface Props {
    children: ReactNode;
    style?: CSSProperties;
}

function MyTitle(props: Props) {
    return (
        <h1 
        className={style.MyTitle} 
        style={props.style}
        >
            {props.children}
        </h1>
    );
}

export default MyTitle;
