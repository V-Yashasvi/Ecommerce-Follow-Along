const initialState={
    email:""
}

const userReducer=(state=initialState, action)=>{
    switch(action.type){
        case "SET_EMAIL":
            localStorage.setItem("email", action.payload);
            return{
                ...state, email:action.payload
            }
        default:
            return state;
    }
}

export default userReducer