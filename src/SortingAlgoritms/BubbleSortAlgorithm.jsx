
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

export default function getBubbleSortAnimations(array) {
    const animations = [];
    const arr = array.slice(); // Work on a copy
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Compare animation
        animations.push([j, j + 1, 'compare']);
        
        if (arr[j] > arr[j + 1]) {
          // Swap animation (store values before swapping)
          animations.push([j, j + 1, arr[j], arr[j + 1]]);
          swap(arr, j, j + 1);
        }
        
        // Revert color animation
        animations.push([j, j + 1, 'revert']);
      }
    }
    
    return animations;
  }