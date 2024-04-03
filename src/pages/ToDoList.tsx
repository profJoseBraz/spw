import { ChangeEvent, useState } from "react";
import style from "./ToDoList.module.css"
import MyMiniForm from "../components/MyMiniForm";
import MyItem from "../components/MyItem";
import MyTitle from "../components/MyTitle";
import MyCount from "../components/MyCount";
import MyUserAvatar from "../components/MyUserAvatar";

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
        // alert(e.target.value);
        setNewItem(e.target.value);
    };

    // const [cookies] = useCookies(["auth"]);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!cookies["auth"]) {
    //         // Se não estiver, redirecione o usuário de volta para a página de login
    //         // alert("Realize o login para continuar!")
    //         navigate("/");
    //     }
    // },[cookies, navigate])

    //Manipuador do evento de clique no botão do componente MyMiniForm 
    const handleFormSubmit = () => {
        // setItems([...items, "item " + items.length]);
        if (newItem.trim().length > 0) {
            setItems([...items, newItem]);
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

    // Manipulador do evento de exclusão de itens (usar com os alunos)
    // const handleOnRemoveItemSimple = (index : number) => {
    //     const newItems = [...items];
    //     newItems.splice(index, 1);
    //     setItems(newItems);
    // }

    const loggedInUser = localStorage.getItem('token');

    return (
        <div className={style.ToDoList}>
            <div className={style.FormContainer}>
                <MyMiniForm
                    style={{
                        width: "100%",
                        height: "auto"
                    }}
                    onButtonClick={handleFormSubmit}
                    onInputChange={handleOnInputChange}
                    inputValue={newItem.length > 0 ? newItem : ""}
                />
                <MyUserAvatar>{loggedInUser?.charAt(0).toUpperCase()}</MyUserAvatar>
            </div>
            
            {/* <h1>Usuário logado: {getSessionInfo().user}</h1> */}
            <div className={style.ItemsContainer}>
                {/* {items.length > 0 && ( */}
                <div className={style.Items}>
                    <div className={style.Title}>
                        {/* <h1>Meus itens</h1> */}
                        <MyTitle
                            // style={{fontSize: "18px"}}
                        >
                            Meus itens
                        </MyTitle>
                        {/* <h1>Itens adicionados: {items.length}</h1> */}
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
                            {/* <h1 key={index}>{item}</h1> */}
                            <MyItem
                                keyValue={index}
                                isChecked={checkedItems.includes(index) ? true : false}
                                toRemove={removedItems.includes(index) ? true : false}
                                bgColorSelected={selectedItemIndex === index ? "rgb(207,114,62,1)" : ""}
                                onSelectItem={() => {handleOnSelectItem(index)}}
                                onCheckItem={() => {handleOnCheckItem(index)}}
                                onRemoveItem={() => {
                                    handleOnRemoveItem(index)
                                    /*handleOnRemoveItemSimple(index);*/
                                }}
                            >
                                {item}
                            </MyItem>
                        </div>
                    ))}
                </div>
                {/* )} */}
            </div>

            <div className={style.Footer}>
                <p>Meu primeiro componente React</p>
            </div>
             
            {isMessageInTransition &&
            <div className={`${style.Message} ${isMessageShowing ? style.MessageIn : style.MessageOut}`}>
                <p>Item exluído com sucesso</p>
            </div>}
        </div>
    );
}

export default ToDoList;
