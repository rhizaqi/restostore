import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "../features/MenuSlice";

export default configureStore({
    reducer: {
        menu: menuSlice,
    }
})
