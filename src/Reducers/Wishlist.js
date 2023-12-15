let initialState = localStorage.getItem('wishlistredux')
initialState = JSON.parse(initialState)
const wishlistReducer = (state = initialState,action) => {
    switch (action.type) {
        case "Add_wishlist":
            state = state +1
            localStorage.setItem("wishlistredux",state)
            return state;
        default:
            return state;
    }
}
export default wishlistReducer;