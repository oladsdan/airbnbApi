// this is used to make sure the axios connect when the accessToken expires
//and could not connect the server

import { axiosPrivate } from "../clientApi/axios";
import {useContext, useEffect} from "react";
import useRefreshToken from "./useRefreshToken";
import AuthContext from "../context/AuthProvider";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { authUser } = useContext(AuthContext);

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${authUser?.Accestoken}`
                }
                return config;
            }, (error) => Promise.reject(error)
    
        )
        
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }

            
        );

        //we did a clean up
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }


    }, [authUser, refresh])

    return axiosPrivate
}

export default useAxiosPrivate