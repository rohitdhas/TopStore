import { configureStore } from "@reduxjs/toolkit";
import profileDataReducer from "./profileData";

export default configureStore({
  reducer: {
    profileData: profileDataReducer,
  },
});
