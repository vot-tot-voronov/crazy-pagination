export const initialState = {
    data: [],
    visibleData: [],
    fetching: true,
    sorting: true,
    text: '',
    currentPage: 1,
    totalCount: 0,
}
export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DATA":
            return {...state, data: action.payload}
        case "SET_VISIBLE_DATA": 
            return {...state, visibleData: action.payload}
        case "SET_TOTAL_COUNT":
            return {...state, totalCount: action.payload}
        case "SET_FETCHING":
            return {...state, fetching: action.payload}
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.payload}
        case "SET_SORTING":
            return {...state, sorting: action.payload}
        case "SET_TEXT":
            return {...state, text: action.payload}
        default:
            throw new Error()
    }
}