import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import {NavigationMenu} from "./components/NavigationMenu";
import {Profile} from "./pages/Profile";
import {Announcements} from "./pages/Announcements";
import {Messages} from "./pages/Messages";
import {Settings} from "./pages/Settings";
import {SignUpSignIn} from "./pages/SignUpSignIn";
import {Tasks} from "./pages/Tasks";
import axios from "axios";

export const AppContext = createContext(null)

function App() {
    const [menuIsVisible, setMenuVisibility] = useState(false)
    const [theme, setTheme] = useState("green")
    const dessertFiltersFromDB = ["#торт", "#капкейк", "#печиво"]
    const locationFiltersFromDB = ["Львів", "Київ", "Луцьк", "Рівне", "Тернопіль", "Харків"]
    const dateFiltersFromDB = ["Весь час", "Сьогодні", "Минулий тиждень"]
    const sortingFromDB = ["Спочатку нові", "Спочатку старі"]

    const createFiltersFromDB = (filters, fieldName) => {
        return filters.map((value, index) => {
            return {id: index, title: value[fieldName], checked: false}
        })
    }

    const dateFilters = createFiltersFromDB(dateFiltersFromDB)
    dateFilters[0].checked = true

    const sorting = createFiltersFromDB(sortingFromDB)
    sorting[0].checked = true

    const authFromStorage = localStorage.getItem("user")
    const [authInfo, setAuthInfo] = useState(authFromStorage !== null ? JSON.parse(authFromStorage) : null)
    const [userInformation, setUserInformation] = useState()


    useEffect(() => {
        if (authInfo !== null) {
            localStorage.setItem("user", JSON.stringify(authInfo))
            setMenuVisibility(true)
            axios.get(
                "http://192.168.0.106:8080/api/v1/users/" + authInfo.username,
                {
                    headers: {
                        "Authorization": authInfo.token
                    }
                }
            ).then(value => {
                setUserInformation(value.data)
            })
        }
    }, [authInfo])


    const [filters, setFilter] = useState({
        dessert: createFiltersFromDB(dessertFiltersFromDB),
        location: createFiltersFromDB(locationFiltersFromDB),
        date: [...dateFilters],
        sort: [...sorting],
        quick: false,
        favorites: false
    })

    const [tasksFilters, setTasksFilters] = useState({
        todo: true,
        completed: false
    })

    useEffect(() => {
        document.body.id = theme + "-theme"
    }, [theme])

    return (
        <div className="App">
            <AppContext.Provider value={{filters, setFilter, authInfo, setAuthInfo, userInformation, setUserInformation}}>
                <BrowserRouter>
                    {menuIsVisible && <NavigationMenu/>}
                    <Routes>
                        <Route path={"/"} element={<Navigate to={authInfo ? `/profile/${authInfo.username}` : "/auth"}/>}/>
                        <Route path={"/auth"} element={<SignUpSignIn setMenuVisibility={setMenuVisibility}/>}/>
                        <Route path={"/profile/:username"} element={<Profile userInformation={authInfo}/>}/>
                        <Route path={"/announcements"} element={<Announcements filters={filters} setFilter={setFilter}/>}/>
                        <Route path={"/messages/:username?"} element={<Messages/>}/>
                        <Route path={"/tasks"} element={<Tasks filters={tasksFilters} setFilter={setTasksFilters}/>}/>
                        <Route path={"/settings"} element={<Settings userInformation={authInfo} setUserInformation={setAuthInfo} theme={theme} setTheme={setTheme}/>}/>
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

export default App;
