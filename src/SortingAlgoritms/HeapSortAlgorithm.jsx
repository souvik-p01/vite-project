
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

export default function getHeapSortAnimations(array) {
    const animations = [];
    buildMaxHeap(array, animations);
    
    for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
      animations.push([0, endIdx, array[0], array[endIdx]]);
      swap(array, 0, endIdx);
      siftDown(array, 0, endIdx - 1, animations);
    }
    
    return animations;
  }
  
  function buildMaxHeap(array, animations) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      siftDown(array, currentIdx, array.length - 1, animations);
    }
  }
  
  function siftDown(array, startIdx, endIdx, animations) {
    let currentIdx = startIdx;
    let leftChildIdx = 2 * currentIdx + 1;
    
    while (leftChildIdx <= endIdx) {
      const rightChildIdx = 2 * currentIdx + 2 <= endIdx ? 2 * currentIdx + 2 : -1;
      let idxToSwap;
      
      if (rightChildIdx !== -1 && array[rightChildIdx] > array[leftChildIdx]) {
        idxToSwap = rightChildIdx;
      } else {
        idxToSwap = leftChildIdx;
      }
      
      animations.push([currentIdx, idxToSwap, 'compare']);
      if (array[currentIdx] < array[idxToSwap]) {
        animations.push([currentIdx, idxToSwap, array[currentIdx], array[idxToSwap]]);
        swap(array, currentIdx, idxToSwap);
        currentIdx = idxToSwap;
        leftChildIdx = 2 * currentIdx + 1;
      } else {
        break;
      }
      animations.push([currentIdx, idxToSwap, 'revert']);
    }
  }
  