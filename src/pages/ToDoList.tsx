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

interface Task{
    id: number;
    descricao: string;
}

function ToDoList() {
    
    // UseState que atualizará a lista de itens
    const [items, setItems] = useState<Task[]>([]);

    // UseState que atualizará a lista de itens checados
    const [checkedItems, setCheckedItems] = useState<number[]>([]); 
    
    // UseState que atualizará a lista de itens removidos
    const [removedItems, setRemovedItems] = useState<number[]>([]); 
    
    // UseState que atualizará o valor do novo item
    const [newItem, setNewItem] = useState<string>(""); 
    
    // UseState que atualizará o valor referente ao índice do item selecionado
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1); 
    
    // UseState bolano que verificará se um item está sendo removido
    const [isRemoving, setIsRemoving] = useState(false); 
    
    // UseState boleano que verificará se uma mensagem está sendo mostrada. Deverá ser true enquanto a mensagem estiver sendo renderizada
    // const [isMessageShowing, setIsMessageShowing] = useState(false);  
    
    // const [isMessageInTransition, setIsMessageInTransition] = useState(false);

    // UseState que servirá para guardar a referência ao TimeOut da mensagem de exclusão
    // const [timerId, setTimerId] = useState(0);

    // const [timerId2, setTimerId2] = useState(0);

    // const [isUpdating, setIsUpdating] = useState<boolean>(false);

    //Manipulador do evento de OnChange do Input refererente ao novo item
    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
    };

    useEffect(() => {
        getUserTasks();
    }, []);

    const getUserTasks = () => {
        // Faz a requisição para obter os dados do banco de dados
        const userId = sessionStorage.getItem("userId");
        axios.get(`${domain}/tasks/${userId}`,{
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }).then((res) => {
            const tasks = res.data.map((task : Task) => task);

            setItems(tasks)
        }).catch((error) => {
            console.error("Erro ao obter os dados: " + error)
        })
    }

    const handleAddTaskClick = async () => {
        if(selectedItemIndex < 0){
            if (newItem.trim().length > 0) {
                await axios.post(`${domain}/tasks/add`, {
                    descricao: newItem,
                    idUsuario: sessionStorage.getItem('userId')
                }, {
                    headers: {
                        Authorization: sessionStorage.getItem('token')
                    }
                });

                setNewItem("");

                getUserTasks();

                // setIsMessageShowing(true);

                // setIsMessageInTransition(true)

                // setTimerId(setTimeout(() => {
                //     setIsMessageShowing(false);
                // }, 2000))

                // setTimerId2(setTimeout(() => {
                //     setIsMessageInTransition(false);
                // }, 4000))
            } else {
                alert("Não é possível adicionar um novo item sem descrição!");
                setNewItem("");
            }
        }else{
            // setIsUpdating(true);

            if (newItem.trim().length > 0) {
                await axios.put(`${domain}/tasks/update/${selectedItemIndex}`,{
                    descricao: newItem
                }, {
                    headers: {
                        Authorization: sessionStorage.getItem('token')
                    }
                })

                setNewItem("");

                getUserTasks();

                setSelectedItemIndex(-1);
                
                // setIsMessageShowing(true);

                // setIsMessageInTransition(true)

                // setTimerId(setTimeout(() => {
                //     setIsMessageShowing(false);
                // }, 2000))

                // setTimerId2(setTimeout(() => {
                //     setIsMessageInTransition(false);
                //     setIsUpdating(false);
                // }, 4000))
            } else {
                alert("A descrição está vazia.");
                setNewItem("");
            }
        }
    };
    
    const handleOnSelectItem = (index : number) => {
        if(selectedItemIndex < 0 || selectedItemIndex !== index){
            setSelectedItemIndex(index);
            const task = items.find((task : Task) => task.id === index); 
            
            setNewItem(task ? task.descricao : "");
        }else{
            // setIsUpdating(false);
            setSelectedItemIndex(-1);
            setNewItem("");
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
        // clearTimeout(timerId)
        // clearTimeout(timerId2)
        if (!isRemoving) {
            setIsRemoving(true);

            setRemovedItems([
                ...removedItems,
                index,
            ]);

            setTimeout(() => {
                // const newItems = [...items];
                // newItems.splice(index, 1);
                // setItems(newItems);

                const updatedTasks = items.filter((task : Task) => task.id !== index);   
                setItems(updatedTasks);

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

                setIsRemoving(false)

                // setIsMessageShowing(true);

                // setIsMessageInTransition(true)

                // setTimerId(setTimeout(() => {
                //     setIsMessageShowing(false);
                // }, 2000))

                // setTimerId2(setTimeout(() => {
                //     setIsMessageInTransition(false);
                //     setIsRemoving(false);
                // }, 4000))

                axios.delete(`${domain}/tasks/delete/${index}`,{
                    headers:{
                        Authorization: sessionStorage.getItem('token')
                    }
                });
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
                    onClick={handleAddTaskClick} 
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
                    {selectedItemIndex < 0 ? 'Adicionar' : 'Alterar'}

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

                    {items.map((item) => (
                        <div key={item.id} className={style.Item}>
                            <MyItem
                                keyValue={item.id}
                                isChecked={checkedItems.includes(item.id) ? true : false}
                                toRemove={removedItems.includes(item.id) ? true : false}
                                bgColorSelected={selectedItemIndex === item.id ? "rgb(207,114,62,1)" : ""}
                                onSelectItem={() => {handleOnSelectItem(item.id)}}
                                onCheckItem={() => {handleOnCheckItem(item.id)}}
                                onRemoveItem={() => {
                                    handleOnRemoveItem(item.id)
                                }}
                            >
                                {item.descricao}
                            </MyItem>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.Footer}>
                <p>Lista de tarefas</p>
            </div>
             
            {/* {isMessageInTransition &&
            <div className={`${style.Message} ${isMessageShowing ? style.MessageIn : style.MessageOut}`}>
                {isRemoving ? 'Tarefa exluída com sucesso': isUpdating ? 'Tarefa alterada com sucesso' : 'Tarefa adicionada com sucesso'}
            </div>} */}
        </div>
    );
}

export default ToDoList;
