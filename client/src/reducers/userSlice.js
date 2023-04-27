
const initialState = 'SQUEAK'

export const userReducer = (state=initialState, action) => {

    switch(action.type) {
        case 'squeak/change': 
            return 'NOT SQUEAK'

        default: return state
    }
}

export default userReducer