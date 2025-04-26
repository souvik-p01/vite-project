// All sorting algorithm implementations in a separate file

// Merge Sort
 /*function getMergeSortAnimations(array) {
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
      // Compare values at i and j
      animations.push([i, j]);
      // Change color back
      animations.push([i, j]);
      
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // Overwrite value at position k with value at i
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // Overwrite value at position k with value at j
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    
    while (i <= middleIdx) {
      // Compare i with itself (no real comparison)
      animations.push([i, i]);
      // Change color back
      animations.push([i, i]);
      // Overwrite value at position k with value at i
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    
    while (j <= endIdx) {
      // Compare j with itself (no real comparison)
      animations.push([j, j]);
      // Change color back
      animations.push([j, j]);
      // Overwrite value at position k with value at j
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  // Bubble Sort
   function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    
    const auxiliaryArray = array.slice();
    let swapped;
    
    for (let i = 0; i < auxiliaryArray.length - 1; i++) {
      swapped = false;
      for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
        animations.push(['compare', j, j + 1]);
        animations.push(['revert', j, j + 1]);
        
        if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
          animations.push(['swap', j, auxiliaryArray[j + 1]]);
          animations.push(['swap', j + 1, auxiliaryArray[j]]);
          [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
          swapped = true;
        }
      }
      if (!swapped) break;
    }
    return animations;
  }
  
  // Heap Sort
   function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    
    const auxiliaryArray = array.slice();
    const n = auxiliaryArray.length;
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(auxiliaryArray, n, i, animations);
    }
  
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      animations.push(['compare', 0, i]);
      animations.push(['revert', 0, i]);
      animations.push(['swap', 0, auxiliaryArray[i]]);
      animations.push(['swap', i, auxiliaryArray[0]]);
      
      [auxiliaryArray[0], auxiliaryArray[i]] = [auxiliaryArray[i], auxiliaryArray[0]];
      heapify(auxiliaryArray, i, 0, animations);
    }
    
    return animations;
  }
  
  function heapify(arr, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    if (left < n) {
      animations.push(['compare', left, largest]);
      animations.push(['revert', left, largest]);
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
  
    if (right < n) {
      animations.push(['compare', right, largest]);
      animations.push(['revert', right, largest]);
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
  
    if (largest !== i) {
      animations.push(['swap', i, arr[largest]]);
      animations.push(['swap', largest, arr[i]]);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest, animations);
    }
  }
  
  // Quick Sort
   function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    
    const auxiliaryArray = array.slice();
    quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(arr, low, high, animations) {
    if (low < high) {
      const pi = partition(arr, low, high, animations);
      quickSortHelper(arr, low, pi - 1, animations);
      quickSortHelper(arr, pi + 1, high, animations);
    }
  }
  
  function partition(arr, low, high, animations) {
    const pivot = arr[high];
    animations.push(['pivot', high, -1]);
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      animations.push(['compare', j, high]);
      animations.push(['revert', j, high]);
      
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          animations.push(['swap', i, arr[j]]);
          animations.push(['swap', j, arr[i]]);
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }
  
    if (i + 1 !== high) {
      animations.push(['swap', i + 1, arr[high]]);
      animations.push(['swap', high, arr[i + 1]]);
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    }
    
    animations.push(['pivot-revert', high, -1]);
    return i + 1;
  }
  
  // Selection Sort
   function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    
    const auxiliaryArray = array.slice();
  
    for (let i = 0; i < auxiliaryArray.length - 1; i++) {
      let minIndex = i;
      
      for (let j = i + 1; j < auxiliaryArray.length; j++) {
        animations.push(['compare', j, minIndex]);
        animations.push(['revert', j, minIndex]);
        
        if (auxiliaryArray[j] < auxiliaryArray[minIndex]) {
          minIndex = j;
        }
      }
      
      if (minIndex !== i) {
        animations.push(['swap', i, auxiliaryArray[minIndex]]);
        animations.push(['swap', minIndex, auxiliaryArray[i]]);
        [auxiliaryArray[i], auxiliaryArray[minIndex]] = [auxiliaryArray[minIndex], auxiliaryArray[i]];
      }
    }
    
    return animations;
  }

  export default{   getMergeSortAnimations,
    getQuickSortAnimations,
    getHeapSortAnimations,
    getBubbleSortAnimations,
    getSelectionSortAnimations}
*/
    // src/SortingAlgorithms/SortingAlgorithms.js
    // All sorting algorithm implementations in a separate file
// Helper function for swapping array elements
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Bubble Sort


// Merge Sort

// Quick Sort
 

// Heap Sort
 
// Selection Sort
 

