import './App.css';
import {NavigationMenu} from "./components/NavigationMenu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Announcements} from "./pages/Announcements";
import {useEffect, useState} from "react";

function App() {
    const [theme, setTheme] = useState("green")
    useEffect(() => {
        document.body.id = theme + "-theme"
    }, [theme])
    return (
        <div className="App">
            <BrowserRouter>
                <NavigationMenu/>
                <Routes>
                    <Route path={"/profile"}/>
                    <Route path={"/announcements"} element={<Announcements setTheme={setTheme}/>}/>
                    <Route path={"/messages"}/>
                    <Route path={"/tasks"}/>
                    <Route path={"/calendar"}/>
                    <Route path={"/recipes"}/>
                    <Route path={"/settings"}/>
                    {/*<Route path={"/settings"} element={<Announcements setTheme={setTheme}/>}/>*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
