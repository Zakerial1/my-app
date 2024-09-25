import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
    value: 0,
    status: 'idle',
    arrUser:[{Login: 'Login',Name:'Name',Surname:'surname',LastName:'LastName',Passwort:"qwer123",NumberPhone:'+380000000000',userID:''}],
    currentUser:[{Login: '',Name:'',Surname:'',LastName:'',Passwort:"",NumberPhone:'',userID:''}],
    autorizac:(false)
}

export const autorization = createSlice({
    name: 'autorization',
    initialState,
    reducers: {
        addUser: (state, action) => {
            for (const iterator of state.arrUser) {
                if (iterator.email !== action.payload.email || iterator.Passwort !== action.payload.password) {
                    state.arrUser.push(action.payload);
                    state.currentUser = action.payload;
                    state.autorizac = true;
                    localStorage.setItem("user",JSON.stringify(state.currentUser));
                    break
                }
            }
        },
        autorUser: (state, action) =>{
            state.currentUser = action.payload;
            state.autorizac = true;
        },
        deleteUser: (state, action) => {
            state.currentUser = [{Login: '',Name:'',Surname:'',LastName:'',Passwort:"",NumberPhone:'',userID:''}]
        }

    
    }
})
export const selectArrUser = (state) =>state.autorization.arrUser;
export const selectcurrentUser = (state) => state.autorization.currentUser;
export const {addUser,deleteUser,autorUser} = autorization.actions;
export default autorization.reducer;