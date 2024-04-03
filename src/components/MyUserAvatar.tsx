import { ReactNode } from 'react';
import style from './MyUserAvatar.module.css';
import { CSSProperties } from 'styled-components';

interface Props{
    children: ReactNode;
    style?: CSSProperties
}

function MyUserAvatar(props: Props){
    return(
        <div 
        className={style.Container}
        style={props.style}>
            <h3>{props.children}</h3>
        </div>
    )
}

export default MyUserAvatar;