import axios  from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useRefreshToken = () => {
    const {setAuthUser, authUser} = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true
        });
        setAuthUser(prev => {
            console.log("delete from the useRefreshToken.js")
            console.log(response)
            console.log(JSON.stringify(prev))
            return {...prev, Accesstoken: response.data.Accesstoken }
        })
        console.log(authUser)
        return response.data.Accesstoken;
    }
    return refresh;
};
export default useRefreshToken;