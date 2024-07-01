import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        list: [],
        one: {}
    },
    reducers:{
        setMenu:(state, action)=>{
            state.list = action.payload
        },
        setOneMenu:(state, action)=>{
            state.one = action.payload
        }
    }
})

export const {setMenu, setOneMenu} = menuSlice.actions

export const dataMenu = () => {
    return async (dispatch) => {
        try {
            let menu = await axios({
                method: "get",
                url: "http://localhost:3456/menu/listMenu",
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })
            // console.log(menu.data, `<< data menu nih boss <<`);
            dispatch(setMenu(menu.data))

        } catch (error) {
            console.log(error);
        }
    }
}

export const menuById = (id) => {
    return async (dispatch) => {
        try {
            let oneMenu = await axios({
                method: "get",
                url: `http://localhost:3456/menu/listMenu/${id}`,
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })

            dispatch(setOneMenu(oneMenu.data))
        } catch (error) {
            console.log(error);
        }
    }
}



export default menuSlice.reducer