import { Children, createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({children})=>{
    const navigate = useNavigate()
    const [token,settoken] = useState(null)
    const [blog,setBlog] = useState([])
    const [input,setInput] = useState("")

    const fetchBlog = async()=>{
        try {
         const {data} =   await axios.get("/api/blog/all")
         data.success ? setBlog(data.blogs):toast.error(data.message)
        } catch (error) {
            toast.error(data.message)
        }
    }
    useEffect(()=>{
           fetchBlog()
           const token = localStorage.getItem("token")
           if(token){
            settoken(token)
           }
           axios.defaults.headers.common["Authorization"] = `${token}`
    },[])

    const value = {axios,token,settoken,blog,setBlog,input,setInput,navigate}
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext =()=>{
    return useContext(AppContext)
}