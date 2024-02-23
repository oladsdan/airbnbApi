import { createContext, useState} from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState("");
    const [openLogin, setOpenLogin] = useState(true)
    const [reservationReload, setReservationReload]= useState(true)

    return (
        <AuthContext.Provider value={{authUser, setAuthUser, openLogin, setOpenLogin, reservationReload, setReservationReload}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;