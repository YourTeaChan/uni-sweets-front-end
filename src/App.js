import './App.css';
import {NavigationMenu} from "./components/NavigationMenu";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavigationMenu/>
            <Routes>
                <Route path={"/profile"}/>
                <Route path={"/announcements"}/>
                <Route path={"/messages"}/>
                <Route path={"/tasks"}/>
                <Route path={"/calendar"}/>
                <Route path={"/recipes"}/>
                <Route path={"/settings"}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
