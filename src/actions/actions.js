const setData = (value) => ({type: "SET_DATA", payload: value})
const setVisibleData = (value) => ({type: "SET_VISIBLE_DATA", payload: value})
const setTotalCount = (value) => ({type: "SET_TOTAL_COUNT", payload: value})
const setFetching = (value) => ({type: "SET_FETCHING", payload: value})
const setCurrentPage = (value) => ({type: "SET_CURRENT_PAGE", payload: value})
const setSorting = (value) => ({type: "SET_SORTING", payload: value})
const setText = (value) => ({type: "SET_TEXT", payload: value})

export {
    setData,
    setVisibleData,
    setTotalCount,
    setFetching,
    setCurrentPage,
    setSorting,
    setText
}