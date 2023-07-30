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
import {Announcement} from "./pages/Announcement";
import {NewAnnouncement} from "./pages/NewAnnouncement";

export const AppContext = createContext(null)

function App() {
    const [menuIsVisible, setMenuVisibility] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "green")
    useEffect(() => {
        document.body.id = theme + "-theme"
    }, [theme])

    const createFiltersFromDB = (filters, fieldName) => {
        return filters.map((value, index) => {
            return {id: index, title: fieldName ? value[fieldName] : value, checked: false}
        })
    }

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


    const [locations, setLocations] = useState([])
    const [dessertTypes, setDessertType] = useState([])
    const dateFilters = createFiltersFromDB(["Весь час", "Сьогодні", "Останні 7 днів"])
    dateFilters[0].checked = true
    const sorting = createFiltersFromDB(["Спочатку нові", "Спочатку старі"])
    sorting[0].checked = true
    const [sortingOrder, setSortingOrder] = useState(sorting)
    const [date, setDate] = useState(dateFilters)

    useEffect(() => {
        if (authInfo) {
            axios.get("http://192.168.0.106:8080/api/v1/locations").then(value => {
                setLocations(createFiltersFromDB(value.data, "locationName"))
            })
            axios.get("http://192.168.0.106:8080/api/v1/dessert-types").then(value => {
                setDessertType(createFiltersFromDB(value.data, "dessertTypeName"))
            })
        }
    }, [authInfo])


    return (
        <div className="App">
            <AppContext.Provider value={{
                authInfo,
                setAuthInfo,
                userInformation,
                setUserInformation,
                locations,
                setLocations,
                date,
                setDate,
                dessertTypes,
                setDessertType,
                sortingOrder,
                setSortingOrder
            }}>
                <BrowserRouter>
                    {menuIsVisible && <NavigationMenu/>}
                    <Routes>
                        <Route path={"/auth"} element={<SignUpSignIn setMenuVisibility={setMenuVisibility}/>}/>
                        {authInfo ?
                            <>
                                <Route path={"/"} element={<Navigate to={authInfo ? `/profile/${authInfo.username}` : "/auth"}/>}/>
                                <Route path={"/profile/:username"} element={<Profile userInformation={authInfo}/>}/>
                                <Route path={"/announcements"} element={<Announcements/>}/>
                                <Route path={"/announcement/:announcementId"} element={<Announcement/>}/>
                                <Route path={"/announcement/new"} element={<NewAnnouncement/>}/>
                                <Route path={"/messages/:username?"} element={<Messages/>}/>
                                <Route path={"/tasks"} element={<Tasks/>}/>
                                <Route path={"/settings"} element={<Settings userInformation={authInfo} setUserInformation={setAuthInfo} theme={theme} setTheme={setTheme}/>}/>
                            </>
                            : <Route path={"/*"} element={<Navigate to={"/auth"}/>}/>}
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

export default App;
