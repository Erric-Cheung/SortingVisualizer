import {createStore} from 'redux';

const generateArray = () => {
    let newArray = [];
    for (let i=0; i < 30; ++i){
        newArray.push(Math.floor(Math.random() * (350 - 10 + 1) + 10));
    }
    return newArray;
}

const initialState = {
    array: generateArray(),
    arrayColor: 'blue',
    selectedIndex: undefined,
    selectedIndex2: undefined,
    pivotedIndex: undefined,
    sortedColor: 'purple',
    selectedColor: '#00ff00',
    selectedColor2: '#00ff00',
    pivotedColor: 'red',
    sorting: false,
    sorted: false,
};

const reducer = (state = initialState, action) => {
    if(action.type === 'GENERATE_ARRAY'){
        return{
            ...state,
            array: generateArray(),
            sorted: false,
        }
    }

    if(action.type === 'UPDATE_ARRAY'){
        let newArr = [...action.array]
        return{
            ...state, array: newArr
        }
    }

    if(action.type === "CHANGE_SELECTED_COLOR"){
        let newIndex = action.index
        return{
            ...state, selectedIndex: newIndex
        }
    }

    if(action.type === "CHANGE_SELECTED_COLOR_2"){
        let newIndex = action.index
        return{
            ...state, selectedIndex2: newIndex
        }
    }

    if(action.type === "CHANGE_PIVOTED_COLOR"){
        let newIndex = action.index
        return{
            ...state, pivotedIndex: newIndex
        }
    }

    if(action.type === "START_SORTING"){
        let sorting = action.sorting;
        return{
            ...state, sorting: sorting, selectedIndex: undefined, selectedIndex2:undefined, pivotedIndex: undefined
        }
    }

    if(action.type === "SORTED"){
        let sorted = action.sorted;
        return{
            ...state, sorted: sorted
        }
    }

    return state;
}

const store = createStore(reducer);

export default store;