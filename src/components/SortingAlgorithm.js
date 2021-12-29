const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const swap = async (arr, left, right, updateArr) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    updateArr(arr)
}

const partition = async (arr, low, high, updateArr, changeSelectedColor, changePivotColor) => {
    let pivot = arr[high];
    let i = (low);

    for(let j = low; j < high; j++){
        changePivotColor(i)
        changeSelectedColor(j);
    
        await sleep(100)
        if(arr[j] <= pivot){
            await swap(arr, i, j, updateArr);
            i++;
        }
    }
    await swap(arr, i, high, updateArr);
    return (i);
};

export const quickSort = async (arr, updateArr, changeSelectedColor, changePivotColor) => {
    let start = 0;
    let end = arr.length - 1;

    let stack = [];
    stack.push(0);
    stack.push(end);

     while(stack[stack.length - 1] >= 0){
    	end = stack.pop();
        start = stack.pop();
        
        const pi = await partition(arr, start, end, updateArr, changeSelectedColor, changePivotColor);
    
        if (pi - 1 > start){
        	stack.push(start);
            stack.push(pi - 1);
		}

        if (pi + 1 < end){
        	stack.push(pi + 1);
            stack.push(end);
        }
    }
};

export const bubbleSort = async (arr, updateArr, changeSelectedColor, changeSelectedColor2) => {
    let arraySize = arr.length;
    for(let i = 0; i < arraySize; i++){
        
        for(let j=0; j < arraySize- i; j++){
            await sleep(100);
            changeSelectedColor(j);
            changeSelectedColor2(j+1);
            if(arr[j] > arr[j+1]){
                await swap(arr, j, j+1, updateArr);
            }
        }
        
    }
};

export const insertionSort = async (arr, updateArr, changeSelectedColor, changeSelectedColor2) => {
    for(let i = 0; i < arr.length; i++){
        let value = arr[i];
        let j = i - 1;
        changeSelectedColor2(i);
        while (j >= 0 && arr[j] > value){
            changeSelectedColor(j);
            arr[j + 1] = arr[j];
            j = j - 1;
            updateArr(arr);
            await sleep(100)
        }
        arr[j + 1] = value;
    }
};

const merge = async (arr, left, middle, right, updateArr, changeSelectedColor, changeSelectedColor2) => {
    let n1 = middle - left + 1;
    let n2 = right - middle;

    let leftArr = [];
    let rightArr = [];

    for(let i=0; i<n1; i++){
        leftArr[i] = arr[left + i];
    }
    for(let j=0; j<n2; j++){
        rightArr[j] = arr[middle + 1 + j];
    }

    let i=0;
    let j=0;
    let k=left;

    while (i < n1 && j < n2) {
        changeSelectedColor(k);
        if(leftArr[i] <= rightArr[j]){
            arr[k] = leftArr[i];
            i++;
            updateArr(arr);
        }
        else{
            arr[k] = rightArr[j];
            j++;
            updateArr(arr);
        }
        k++;
        await sleep(100)
    }
    while(i < n1){
        changeSelectedColor(k);
        arr[k] = leftArr[i];
        i++;
        k++;
        updateArr(arr);
        await sleep(100)
    }
    while(j < n2){
        changeSelectedColor(k);
        arr[k] = rightArr[j];
        j++;
        k++;
        updateArr(arr);
        await sleep(100)
    }
}

export const mergeSort = async (arr, left, right, updateArr, changeSelectedColor, changeSelectedColor2) => {
    if(left >= right){
        return;
    }

    let middle = Math.floor((left + right) / 2);

    await mergeSort(arr, left, middle, updateArr, changeSelectedColor, changeSelectedColor2);
    await mergeSort(arr, middle+1, right, updateArr, changeSelectedColor, changeSelectedColor2);
    await merge(arr, left, middle, right, updateArr, changeSelectedColor, changeSelectedColor2);

};