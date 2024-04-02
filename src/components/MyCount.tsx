import { CSSProperties, ReactNode } from "react";
import style from "./MyCount.module.css";

interface Props {
    children: ReactNode;
    style: CSSProperties;
}

function MyCount(props: Props) {
    return (
        <h1 
        className={style.MyCount} 
        style={props.style}>
            {props.children}
        </h1>
    );
}

export default MyCount;
