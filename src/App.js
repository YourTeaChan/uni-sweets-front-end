import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import {NavigationMenu} from "./components/NavigationMenu";
import {Profile} from "./pages/Profile";
import {Announcements} from "./pages/Announcements";
import {Messages} from "./pages/Messages";
import {Settings} from "./pages/Settings";
import {SignUpSignIn} from "./pages/SignUpSignIn";

export const AppContext = createContext(null)

function App() {
    const [isAuthorized, setAuthorized] = useState(false)
    const [theme, setTheme] = useState("green")
    const dessertFiltersFromDB = ["#торт", "#капкейк", "#печиво"]
    const locationFiltersFromDB = ["Львів", "Київ", "Луцьк", "Рівне", "Тернопіль", "Харків"]
    const dateFiltersFromDB = ["Весь час", "Сьогодні", "Минулий тиждень"]
    const sortingFromDB = ["Спочатку нові", "Спочатку старі"]

    const createFiltersFromDB = (filters) => {
        return filters.map((value, index) => {
            return {id: index, title: value, checked: false}
        })
    }

    const dateFilters = createFiltersFromDB(dateFiltersFromDB)
    dateFilters[0].checked = true

    const sorting = createFiltersFromDB(sortingFromDB)
    sorting[0].checked = true

    const [userInformation, setUserInformation] = useState({
        userId: 1,
        userLocation: "Місто",
        location: createFiltersFromDB(locationFiltersFromDB),
        userPicture: null
    })

    const [filters, setFilter] = useState({
        dessert: createFiltersFromDB(dessertFiltersFromDB),
        location: createFiltersFromDB(locationFiltersFromDB),
        date: [...dateFilters],
        sort: [...sorting],
        quick: false,
        favorites: false
    })

    useEffect(() => {
        document.body.id = theme + "-theme"
    }, [theme])

    return (
        <div className="App">
            <AppContext.Provider value={{filters, setFilter, userInformation}}>
                <BrowserRouter>
                    {isAuthorized && <NavigationMenu/>}
                    <Routes>
                        {!isAuthorized ? (<Route path={"/"} element={<SignUpSignIn setSignInSignUpPage={setAuthorized}/>}/>) :
                            (
                                <>
                                    <Route path={"/profile"} element={<Profile userInformation={userInformation}/>}/>
                                    <Route path={"/announcements"} element={<Announcements filters={filters} setFilter={setFilter}/>}/>
                                    <Route path={"/messages"} element={<Messages/>}/>
                                    <Route path={"/tasks"}/>
                                    <Route path={"/settings"} element={<Settings userInformation={userInformation}
                                                                                 setUserInformation={setUserInformation} theme={theme} setTheme={setTheme}/>}/>
                                </>
                            )
                        }
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

export default App;
