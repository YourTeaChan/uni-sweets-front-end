import './App.css';
import {NavigationMenu} from "./components/NavigationMenu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Announcements} from "./pages/Announcements";
import {createContext, useEffect, useState} from "react";

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
                        <Route path={"/profile"}/>
                        <Route path={"/announcements"} element={<Announcements filters={filters} setFilter={setFilter}/>}/>
                        <Route path={"/messages"}/>
                        <Route path={"/tasks"}/>
                        <Route path={"/calendar"}/>
                        <Route path={"/recipes"}/>
                        <Route path={"/settings"}/>
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

export default App;
