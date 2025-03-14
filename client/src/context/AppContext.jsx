import { createContext, useState } from "react";

export const AppContext = createContext()



const AppContextProvider = (props) => {

    const [isEducator, setIsEducator] = useState(false)

    const value = {
        isEducator, setIsEducator
    }

    return (
        <AppContext.Provider value={value}>
            {
                props.children
            }
        </AppContext.Provider>
    )
}

export  default AppContextProvider 