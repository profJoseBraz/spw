import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ToDoList from "./assets/pages/ToDoList";
import Login from "./assets/pages/Login";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/to-do-list" element={<ToDoList />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
