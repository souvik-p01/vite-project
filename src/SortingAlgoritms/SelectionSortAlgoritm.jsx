
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }



export default function getSelectionSortAnimations(array) {
    const animations = [];
    
    for (let i = 0; i < array.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        animations.push([j, minIdx, 'compare']);
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
        animations.push([j, minIdx, 'revert']);
      }
      
      if (i !== minIdx) {
        animations.push([i, minIdx, array[i], array[minIdx]]);
        swap(array, i, minIdx);
      }
    }
    
    return animations;
  }