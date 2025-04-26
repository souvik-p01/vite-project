
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }


export default function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j, 'compare']);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
      animations.push([i-1, j-1, 'revert']);
    }
  
    while (i <= middleIdx) {
      animations.push([i, i, 'compare']);
      animations.push([k, auxiliaryArray[i]]);
      animations.push([i, i, 'revert']);
      mainArray[k++] = auxiliaryArray[i++];
    }
  
    while (j <= endIdx) {
      animations.push([j, j, 'compare']);
      animations.push([k, auxiliaryArray[j]]);
      animations.push([j, j, 'revert']);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  