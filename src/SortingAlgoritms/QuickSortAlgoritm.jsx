
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }


export default function getQuickSortAnimations(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  }
  
  function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
    
    for (let i = startIdx; i < endIdx; i++) {
      animations.push([i, endIdx, 'compare']);
      if (array[i] < pivotValue) {
        animations.push([i, pivotIdx, array[i], array[pivotIdx]]);
        swap(array, i, pivotIdx);
        pivotIdx++;
      }
      animations.push([i, endIdx, 'revert']);
    }
    
    animations.push([pivotIdx, endIdx, array[pivotIdx], array[endIdx]]);
    swap(array, pivotIdx, endIdx);
    return pivotIdx;
  }