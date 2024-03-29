import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ToDoList from "./assets/pages/ToDoList";
import Login from "./assets/pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/exemplos-react-aulas-web" element={<Login />} />
                <Route path="/exemplos-react-aulas-web/to-do-list" element={<ToDoList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
