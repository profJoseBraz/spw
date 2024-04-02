import { ReactNode } from "react";
import style from "./MyItem.module.css";
import MyButton from "./MyButton";

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
            <div className={props.toRemove ? style.MyItemRemoved : style.MyItemContainer}>
                <div className={style.MyItem} style={{ backgroundColor: `${props.bgColorSelected}` }}>
                    <div className={style.MyItemDescription} onClick={props.onSelectItem}>
                        <h2 className={props.isChecked ? style.MyItemChecked : style.MyItemUnchecked} key={props.keyValue}>
                            {props.children}
                        </h2>
                    </div>

                    <div className={style.MyItemButtons}>
                        
                        <MyButton 
                            onClick={props.onCheckItem} 
                            style={{
                                width: "50%",
                                // fontSize: "18px",
                                margin: "5px"
                            }}
                        >
                            ok
                        </MyButton>
                        
                        <MyButton 
                            onClick={props.onRemoveItem} 
                            style={{
                                width: "50%",
                                // fontSize: "18px",
                                margin: "5px"
                            }}
                        >
                            rm
                        </MyButton>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyItem;
