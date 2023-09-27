/* */

import { createSlice, configureStore } from "@reduxjs/toolkit";

/* We are creating a variable name authSlice for authentication ie. to know whether a particular 
   user exists in our database or not. 
   reducers are functions that should run when click.
*/
const authSlice = createSlice({
  name: "auth",
  initialState: { user: "", isLoggedIn: false },
  reducers: {
    /* */

    /* Creating a login() function. */
    login(state) {
      state.isLoggedIn = true;
    },

    /* Creating a logout() function. */
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

/* Storing all the actions such as name,initialState,reducers of the authSlice variable in the
   variable authActions and exporting it. 
*/
export const authActions = authSlice.actions;

/* Configuring authSlice. */
export const authStore = configureStore({
  reducer: authSlice.reducer,
});

/* ***************************************************************************************************** */

// const initialState = {};

// /* We are creating a variable name authSlice for authentication ie. to know whether a particular
//    user exists in our database or not.
//    reducers are functions that should run when click.
// */
// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     /* */

//     /* Creating a login() function. */
//     loginRedux: (state, action) => {
//       // console.log(action);
//       state.user = action.payload.data;
//     },
//   },
// });

// /* Storing all the actions such as name,initialState,reducers of the authSlice variable in the
//    variable authActions and exporting it.
// */
// export const { loginRedux } = userSlice.actions;

// /* Configuring the userSlice. */
// export const userStore = configureStore({
//   reducer: userSlice.reducer,
// });
