import { ChangeEvent, useEffect, useState } from "react";
import style from "./ToDoList.module.css"
import MyItem from "../components/MyItem";
import MyTitle from "../components/MyTitle";
import MyCount from "../components/MyCount";
import MyUserAvatar from "../components/MyUserAvatar";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import axios from "axios";
import { domain } from "../global/environments";

function ToDoList() {
    
    // UseState que atualizará a lista de itens
    const [items, setItems] = useState<string[]>([]);

    // UseState que atualizará a lista de itens checados
    const [checkedItems, setCheckedItems] = useState<number[]>([]); 
    
    // UseState que atualizará a lista de itens removidos
    const [removedItems, setRemovedItems] = useState<number[]>([]); 
    
    // UseState que atualizará o valor do novo item
    const [newItem, setNewItem] = useState(""); 
    
    // UseState que atualizará o valor referente ao índice do item selecionado
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1); 
    
    // UseState bolano que verificará se um item está sendo removido
    const [isRemoving, setIsRemoving] = useState(false); 
    
    // UseState boleano que verificará se uma mensagem está sendo mostrada. Deverá ser true enquanto a mensagem estiver sendo renderizada
    const [isMessageShowing, setIsMessageShowing] = useState(false);  
    
    const [isMessageInTransition, setIsMessageInTransition] = useState(false);

    // UseState que servirá para guardar a referência ao TimeOut da mensagem de exclusão
    const [timerId, setTimerId] = useState(0);

    const [timerId2, setTimerId2] = useState(0);

    //Manipulador do evento de OnChange do Input refererente ao novo item
    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
    };

    useEffect(() => {
        // Faz a requisição para obter os dados do banco de dados
        const userId = sessionStorage.getItem("userId");
        axios.get<{descricao : string}[]>(`${domain}/tasks/${userId}`,{
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }).then((res) => {
            const descricoes = res.data.map((tarefa) => tarefa.descricao);

            setItems(descricoes)
        }).catch((error) => {
            console.error("Erro ao obter os dados: " + error)
        })
    }, []);

    const handleOnClick = () => {
        // setItems([...items, "item " + items.length]);
        if (newItem.trim().length > 0) {
            setItems([...items, newItem]);

            axios.post(`${domain}/tasks/add`, {
                descricao: newItem,
                idUsuario: sessionStorage.getItem('userId')
            }, {
                headers: {
                    Authorization: sessionStorage.getItem('token')
                }
            });

            setNewItem("");
        } else {
            alert("Não é possível adicionar um novo item sem descrição!");
            setNewItem("");
        }
    };
    
    const handleOnSelectItem = (index : number) => {
        if (selectedItemIndex === index) {
            setSelectedItemIndex(-1);
        } else {
            setSelectedItemIndex(index);
        }
    }

    const handleOnCheckItem = (index : number) => {
        if (checkedItems.includes(index)) {
            const newCheckedItems = [
                ...checkedItems,
            ];
            newCheckedItems.splice(
                checkedItems.indexOf(index),
                1
            );
            setCheckedItems(newCheckedItems);
        } else {
            setCheckedItems([
                ...checkedItems,
                index,
            ]);
        }
    }

    // Manipulador do evento de exclusao com animação
    const handleOnRemoveItem = (index : number) => {
        clearTimeout(timerId)
        clearTimeout(timerId2)
        if (!isRemoving) {
            setIsRemoving(true);

            setRemovedItems([
                ...removedItems,
                index,
            ]);

            setTimeout(() => {
                const newItems = [...items];
                newItems.splice(index, 1);
                setItems(newItems);

                const newCheckedItems = [
                    ...checkedItems,
                ];
                newCheckedItems.splice(
                    checkedItems.indexOf(index),
                    1
                );
                setCheckedItems(newCheckedItems);

                const newRemovedItems = [
                    ...removedItems,
                ];
                newRemovedItems.splice(
                    removedItems.indexOf(index),
                    1
                );
                setRemovedItems(newRemovedItems);

                setIsRemoving(false);

                setIsMessageShowing(true);

                setIsMessageInTransition(true)

                setTimerId(setTimeout(() => {
                    setIsMessageShowing(false);
                }, 2000))

                setTimerId2(setTimeout(() => {
                    setIsMessageInTransition(false);
                }, 4000))
            }, 950);
        }
    }

    const loggedInUser = sessionStorage.getItem('userName');
    
    return (
        <div className={style.ToDoList}>
            <div className={style.Header}>
                <MyInput
                    type="text"
                    placeholder="Nova tarefa"
                    placeholderFocusedColor="white"
                    onChange={handleOnInputChange}
                    value={newItem.length > 0 ? newItem : ""}
                    style={{
                        margin: "10px",
                        marginRight: "0px",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                        width: "30%"
                    }}
                    focusStyle={{
                        backgroundColor: "#8b129d",
                        color: "white",
                    }}
                />
                <MyButton 
                    onClick={handleOnClick} 
                    style={{ 
                        width: "fit-content",
                        height: "fit-content",
                        borderBottomLeftRadius: "0px",
                        borderTopLeftRadius: "0px",
                        marginLeft: "0px",
                        fontSize: "calc(1vw + 1vh)",
                        color: "gray"
                    }}
                >
                    Adicionar

                </MyButton>
                <MyUserAvatar>{loggedInUser?.charAt(0).toUpperCase()}</MyUserAvatar>
            </div>
            
            <div className={style.ItemsContainer}>
                <div className={style.Items}>
                    <div className={style.Title}>
                        <MyTitle
                            // style={{fontSize: "5vh"}}
                        >
                            Meus itens
                        </MyTitle>
                        <MyCount
                            style={{
                                // fontSize:"18px"
                            }}
                        >
                            Itens adicionados:{" "}
                            {items.length > 0 ? items.length : "Lista vazia"}
                        </MyCount>
                    </div>

                    {items.map((item, index) => (
                        <div key={index} className={style.Item}>
                            <MyItem
                                keyValue={index}
                                isChecked={checkedItems.includes(index) ? true : false}
                                toRemove={removedItems.includes(index) ? true : false}
                                bgColorSelected={selectedItemIndex === index ? "rgb(207,114,62,1)" : ""}
                                onSelectItem={() => {handleOnSelectItem(index)}}
                                onCheckItem={() => {handleOnCheckItem(index)}}
                                onRemoveItem={() => {
                                    handleOnRemoveItem(index)
                                }}
                            >
                                {item}
                            </MyItem>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.Footer}>
                <p>Meu primeiro componente React</p>
            </div>
             
            {isMessageInTransition &&
            <div className={`${style.Message} ${isMessageShowing ? style.MessageIn : style.MessageOut}`}>
                Item exluído com sucesso
            </div>}
        </div>
    );
}

export default ToDoList;
