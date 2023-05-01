
const initialState = 'SQUEAK'

export const userReducer = (state= false, action) => {

    switch(action.type) {
        case 'squeak/change': 
            return true

        default: return state
    }
}

export default userReducer