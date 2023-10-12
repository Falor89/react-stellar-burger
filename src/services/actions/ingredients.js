import { getData, http } from "../../utils/api";
import sort from "../../utils/sort";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';


export function loadIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getData()
            .then((ingredients) => sort(ingredients.data))
            .then((list) => {
                const [buns, sauces, main] = list;
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: {
                        buns: buns,
                        sauces: sauces,
                        main: main
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: GET_INGREDIENTS_FAIL
                })
                alert(`Ошибка в получении ингредиентов: ${err}`)
            })
    }
}

// export function loadIngredients() {
//     return function (dispatch) {
//         dispatch({ type: GET_INGREDIENTS_REQUEST })
//         getData()
//             .then(ingredients => {
//                 sort(ingredients.data)
//             })
//             .then((list) => {
//                 const [buns, sauces, main] = list;
//                 dispatch({
//                     type: GET_INGREDIENTS_SUCCESS,
//                     ingredients: {
//                         buns: buns,
//                         sauces: sauces,
//                         main: main,
//                     }
//                 })
//             })
//             .catch(err => {
//                 dispatch({
//                     type: GET_INGREDIENTS_FAIL
//                 })
//             })

//     }
// }