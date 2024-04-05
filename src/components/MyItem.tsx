import { ReactNode } from "react";
import style from "./MyItem.module.css";
import MyButton from "./MyButton";
import '../assets/font-awesome-4.7.0/css/font-awesome.min.css'

interface Props {
    keyValue: number;

    isChecked: boolean;
    toRemove: boolean;

    children: ReactNode;
    bgColorSelected?: string;

    onSelectItem: () => void;
    onCheckItem: () => void;
    onRemoveItem: () => void;
}

function MyItem(props: Props) {
    return (
        <>
            <div className={props.toRemove ? style.MyItemRemoved : ''}>
                <div className={style.MyItem} style={{ backgroundColor: `${props.bgColorSelected}` }}>
                    <div className={style.MyItemDescription} onClick={props.onSelectItem}>
                        <h2 className={props.isChecked ? style.MyItemChecked : style.MyItemUnchecked} key={props.keyValue}>
                            {props.children}
                        </h2>
                    </div>

                    <MyButton 
                        onClick={props.onCheckItem} 
                        style={{
                            width: "10%",
                            // fontSize: "18px",
                            height: "10%",
                            margin: "0px",
                            borderRadius: "0px",
                            backgroundColor: "green",
                            color: "white",
                            fontSize: "calc(2vw + 2vh)"
                        }}
                    >
                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                    </MyButton>
                        
                    <MyButton 
                        onClick={props.onRemoveItem} 
                        style={{
                            width: "10%",
                            // fontSize: "18px",
                            margin: "0px",
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                            backgroundColor: "red",
                            color: "white",
                            fontSize: "calc(2vw + 2vh)"
                        }}
                    >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </MyButton>
                </div>
            </div>
        </>
    );
}

export default MyItem;
