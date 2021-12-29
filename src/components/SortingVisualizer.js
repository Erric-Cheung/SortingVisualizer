import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import Button from "./UI/Button";
import Card from "./UI/Card";
import classes from './SortingVisualizer.module.css';

import {quickSort, bubbleSort, mergeSort, insertionSort} from "./SortingAlgorithm";


const SortingVisualizer = () => {
    const dispatch = useDispatch();

    const array = useSelector(state => state.array);
    const arrayColor = useSelector(state => state.arrayColor);
    const sortedColor = useSelector(state => state.sortedColor);
    const selectedIndex = useSelector(state => state.selectedIndex);
    const selectedColor = useSelector(state => state.selectedColor);
    const selectedIndex2 = useSelector(state => state.selectedIndex2);
    const selectedColor2 = useSelector(state => state.selectedColor2);
    const pivotedColor = useSelector(state => state.pivotedColor);
    const pivotedIndex = useSelector(state => state.pivotedIndex);
    const sorting = useSelector(state => state.sorting);
    const sorted = useSelector(state => state.sorted);

    const generateArrayHandler = () => {
        if(sorting){
            alert("Please wait until sorting is finished.");
            return;
        }
        dispatch({type:'GENERATE_ARRAY'});
    }

    const changeSelectedColorHandler = (index) => {
        dispatch({type : 'CHANGE_SELECTED_COLOR', index: index});
    }

    const changeSelectedColorHandler2 = (index) => {
        dispatch({type : 'CHANGE_SELECTED_COLOR_2', index: index});
    }

    const changePivotedColorHandler = (index) => {
        dispatch({type: 'CHANGE_PIVOTED_COLOR', index: index});
    }

    const updateArray = (array) => {
        dispatch({type: 'UPDATE_ARRAY', array: array});
    }

    const updateSortingStatus = (sorting, sorted) => {
        dispatch({type:'START_SORTING', sorting: sorting});
        dispatch({type:'SORTED', sorted: sorted});
    }


    const quickSortHandler = async () => {
        if(sorting){
            alert("Please wait until sorting is finished.");
            return;
        }
        if(sorted){
            alert("Please generate a new array.")
            return;
        }

        updateSortingStatus(true, false);
        await quickSort(array, updateArray, changeSelectedColorHandler, changePivotedColorHandler);
        updateSortingStatus(false, true);
        updateArray(array);
    }

    const bubbleSortHandler = async () => {
        if(sorting){
            alert("Please wait until sorting is finished.");
            return;
        }
        if(sorted){
            alert("Please generate a new array.")
            return;
        }

        updateSortingStatus(true, false);
        await bubbleSort(array, updateArray, changeSelectedColorHandler, changeSelectedColorHandler2);
        updateSortingStatus(false, true);
        updateArray(array);
    }

    const mergeSortHandler = async () => {
        if(sorting){
            alert("Please wait until sorting is finished.");
            return;
        }
        if(sorted){
            alert("Please generate a new array.")
            return;
        }

        updateSortingStatus(true, false);
        await mergeSort(array, 0, array.length-1, updateArray, changeSelectedColorHandler, changeSelectedColorHandler2);
        updateSortingStatus(false, true);
        updateArray(array);
    }

    const insertionSortHandler = async () => {
        if(sorting){
            alert("Please wait until sorting is finished.");
            return;
        }
        if(sorted){
            alert("Please generate a new array.")
            return;
        }
        
        updateSortingStatus(true, false);
        await insertionSort(array, updateArray, changeSelectedColorHandler, changeSelectedColorHandler2);
        updateSortingStatus(false, true);
        updateArray(array);
    }


    return(
        <React.Fragment>
            <Card className={classes['container']}>
                {array.map((height, index) => (
                    <div 
                    key={index}
                    className={classes['bar']}
                    id={index}
                    style={{
                    backgroundColor: `${(sorted) ? sortedColor : (index === selectedIndex && sorting === true) ? selectedColor : (index === pivotedIndex && sorting === true) ? pivotedColor : (index === selectedIndex2 && sorting === true) ? selectedColor2 : arrayColor}`,
                    height: `${height}px`,
                      }}
                    ></div>
                ))}
            </Card>
            <div style={{textAlign: "center"}}>
                <Button onClick={generateArrayHandler}>Generate Array!</Button>
                <Button onClick={quickSortHandler}>Quick Sort!</Button>
                <Button onClick={bubbleSortHandler}>Bubble Sort!</Button>
                <Button onClick={mergeSortHandler}>Merge Sort!</Button>
                <Button onClick={insertionSortHandler}>Insertion Sort!</Button>
            </div>

            
        </React.Fragment>
    )
};

export default SortingVisualizer;