import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import {NavigationMenu} from "./components/NavigationMenu";
import {Profile} from "./pages/Profile";
import {Announcements} from "./pages/Announcements";
import {Settings} from "./pages/Settings";

export const AppContext = createContext(null)

function App() {
    const [theme, setTheme] = useState("green")
    const dessertFiltersFromDB = ["#cake", "#cupcake", "#cookie"]
    const locationFiltersFromDB = ["Lviv", "Kyiv", "Lutsk", "Rivne", "Ternopil", "Kharkiv"]
    const dateFiltersFromDB = ["All time", "Today", "Last week"]
    const sortingFromDB = ["First new", "First old"]

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
        userLocation: "Location",
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
            <AppContext.Provider value={{filters, setFilter}}>
                <BrowserRouter>
                    <NavigationMenu/>
                    <Routes>
                        <Route path={"/profile"} element={<Profile userInformation={userInformation}/>}/>
                        <Route path={"/announcements"} element={<Announcements filters={filters} setFilter={setFilter}/>}/>
                        <Route path={"/messages"}/>
                        <Route path={"/tasks"}/>
                        <Route path={"/calendar"}/>
                        <Route path={"/recipes"}/>
                        <Route path={"/settings"}
                               element={<Settings userInformation={userInformation} setUserInformation={setUserInformation} theme={theme} setTheme={setTheme}/>}/>
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

export default App;
