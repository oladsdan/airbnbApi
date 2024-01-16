import axios  from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useRefreshToken = () => {
    const {setAuthUser} = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuthUser(prev => {
            console.log("delete from the useRefreshToken.js")
            console.log(response)
            console.log(JSON.stringify(prev))
            return {...prev, accessToken: response.data.accessToken }
        })
        return response.data.accessToken;
    }
    return refresh;
};
export default useRefreshToken;