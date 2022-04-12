let INITIAL_STATE = {
    activities: [],
    namaUser: 'Vicent'
    
}

const todo = (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case 'GET_DATA':
            return {
                    ...state,
                    activities: action.payload
                    // activities: []
                    // username: '' ,
                    // pasword: 
            }
        default:
            return state
    }
}

export default todo