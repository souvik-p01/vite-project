
import React, { useState, useEffect, useRef } from "react";
import getBubbleSortAnimations from '../SortingAlgoritms/BubbleSortAlgorithm'
import getMergeSortAnimations from '../SortingAlgoritms/MargeSortAlgoritm'
import getHeapSortAnimations from '../SortingAlgoritms/HeapSortAlgorithm'
import getSelectionSortAnimations from '../SortingAlgoritms/SelectionSortAlgoritm'
import getQuickSortAnimations from '../SortingAlgoritms/QuickSortAlgoritm'

import "./SortingVisualizer.css";


//import React, { useState, useEffect } from "react";

/*import React, { useState, useEffect } from "react";
import * as SortingAlgorithms from "../SortingAlgorithms/SortingAlgorithms";
import "./SortingVisualizer.css"

import React, { useState, useEffect, useRef } from "react";
import getBubbleSortAnimations from '../SortingAlgoritms/BubbleSortAlgorithm';
import getMergeSortAnimations from '../SortingAlgoritms/MargeSortAlgoritm';
import getHeapSortAnimations from '../SortingAlgoritms/HeapSortAlgorithm';
import getSelectionSortAnimations from '../SortingAlgoritms/SelectionSortAlgoritm';
import getQuickSortAnimations from '../SortingAlgoritms/QuickSortAlgoritm';

import "./SortingVisualizer.css";*/


// Constants
const DEFAULT_SPEED = 50;
const MIN_SPEED = 5;
const MAX_SPEED = 200;
const DEFAULT_BARS = 50;
const MIN_BARS = 5;
const MAX_BARS = 240;
const DEFAULT_COLOR = 'turquoise';
const COMPARE_COLOR = 'yellow';
const SWAP_COLOR = 'red';
const SORTED_COLOR = 'green';

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [numBars, setNumBars] = useState(DEFAULT_BARS);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [algorithm, setAlgorithm] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const arrayContainerRef = useRef(null);
  const timeoutIds = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      resetArray();
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearAllTimeouts();
    };
  }, []);

  const clearAllTimeouts = () => {
    timeoutIds.current.forEach(id => clearTimeout(id));
    timeoutIds.current = [];
  };

  const resetArray = () => {
    if (isSorting) return;
    
    clearAllTimeouts();
    
    const newArray = Array.from({length: numBars}, () => 
      randomIntFromInterval(10, 400)
    );
    setArray(newArray);
    setIsSorting(false);
    setAlgorithm('');
    setShowCompletionMessage(false);
    
    // Reset all bars to default color
    const arrayBars = document.getElementsByClassName('array-bar');
    Array.from(arrayBars).forEach(bar => {
      if (bar && bar.style) {
        bar.style.backgroundColor = DEFAULT_COLOR;
      }
    });
    
    document.body.classList.remove('sorting-active');
  };

  const handleNumBarsChange = (e) => {
    const value = Math.max(MIN_BARS, Math.min(MAX_BARS, parseInt(e.target.value)));
    setNumBars(value);
    if (!isSorting) {
      setTimeout(resetArray, 50);
    }
  };

  const handleSpeedChange = (e) => {
    const value = Math.max(MIN_SPEED, Math.min(MAX_SPEED, parseInt(e.target.value)));
    setSpeed(value);
  };

  const animateSorting = (animations) => {
    clearAllTimeouts();
    
    const arrayBars = document.getElementsByClassName('array-bar');
    if (!arrayBars || arrayBars.length === 0) return;
    
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      
      if (!animation) continue;
      
      const isColorChange = animation.length === 3;
      
      if (isColorChange) {
        const [barOneIdx, barTwoIdx, color] = animation;
        
        if (barOneIdx >= 0 && barOneIdx < arrayBars.length && 
            barTwoIdx >= 0 && barTwoIdx < arrayBars.length) {
          
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          
          const timeoutId = setTimeout(() => {
            const colorToUse = 
              color === 'compare' ? COMPARE_COLOR : 
              color === 'revert' || color === 'default' ? DEFAULT_COLOR : color;
            
            barOneStyle.backgroundColor = colorToUse;
            barTwoStyle.backgroundColor = colorToUse;
          }, i * speed);
          
          timeoutIds.current.push(timeoutId);
        }
      } else if (animation.length === 2) {
        const [barIdx, newHeight] = animation;
        
        if (barIdx >= 0 && barIdx < arrayBars.length) {
          const timeoutId = setTimeout(() => {
            arrayBars[barIdx].style.height = `${newHeight}px`;
            if (numBars <= 30) {
              const valueElement = arrayBars[barIdx].querySelector('.bar-value');
              if (valueElement) {
                valueElement.textContent = newHeight;
              }
            }
          }, i * speed);
          
          timeoutIds.current.push(timeoutId);
        }
      } else if (animation.length === 4) {
        // Handle swap animation with special color
        const [barOneIdx, barTwoIdx, value1, value2] = animation;
        
        if (barOneIdx >= 0 && barOneIdx < arrayBars.length && 
            barTwoIdx >= 0 && barTwoIdx < arrayBars.length) {
          
          const timeoutId1 = setTimeout(() => {
            arrayBars[barOneIdx].style.backgroundColor = SWAP_COLOR;
            arrayBars[barTwoIdx].style.backgroundColor = SWAP_COLOR;
          }, i * speed);
          
          const timeoutId2 = setTimeout(() => {
            arrayBars[barOneIdx].style.height = `${value2}px`;
            arrayBars[barTwoIdx].style.height = `${value1}px`;
            
            if (numBars <= 30) {
              const valueElement1 = arrayBars[barOneIdx].querySelector('.bar-value');
              const valueElement2 = arrayBars[barTwoIdx].querySelector('.bar-value');
              if (valueElement1) valueElement1.textContent = value2;
              if (valueElement2) valueElement2.textContent = value1;
            }
          }, i * speed + speed/2);
          
          const timeoutId3 = setTimeout(() => {
            arrayBars[barOneIdx].style.backgroundColor = DEFAULT_COLOR;
            arrayBars[barTwoIdx].style.backgroundColor = DEFAULT_COLOR;
          }, (i + 1) * speed);
          
          timeoutIds.current.push(timeoutId1, timeoutId2, timeoutId3);
        }
      }
    }
    
    // Finalize sorting with a smoother finish
    const finalTimeoutId = setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        const barTimeoutId = setTimeout(() => {
          if (arrayBars[i]) {
            arrayBars[i].style.backgroundColor = SORTED_COLOR;
            arrayBars[i].classList.add('sorted-bar');
          }
        }, i * 10);
        
        timeoutIds.current.push(barTimeoutId);
      }
      
      const completionTimeoutId = setTimeout(() => {
        setIsSorting(false);
        setShowCompletionMessage(true);
        document.body.classList.remove('sorting-active');
        
        const hideMessageTimeoutId = setTimeout(() => setShowCompletionMessage(false), 3000);
        timeoutIds.current.push(hideMessageTimeoutId);
      }, arrayBars.length * 10 + 500);
      
      timeoutIds.current.push(completionTimeoutId);
    }, animations.length * speed);
    
    timeoutIds.current.push(finalTimeoutId);
  };

  // C++ implementation for each algorithm
  const bubbleSortCode = `
// C++ implementation of Bubble Sort
// Time Complexity: O(n²) - worst case and average case
// Space Complexity: O(1)

void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    bool swapped = false;
    
    // Last i elements are already in place
    for (int j = 0; j < n-i-1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j+1]) {
        // Swap if elements are in wrong order
        swap(arr[j], arr[j+1]);
        swapped = true;
      }
    }
    
    // If no elements were swapped in inner loop,
    // array is already sorted
    if (!swapped)
      break;
  }
}`;

  const selectionSortCode = `
// C++ implementation of Selection Sort
// Time Complexity: O(n²) - worst case and average case
// Space Complexity: O(1)

void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    // Find the minimum element in unsorted array
    int min_idx = i;
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[min_idx])
        min_idx = j;
    }
    
    // Swap the found minimum element with the first element
    if (min_idx != i)
      swap(arr[min_idx], arr[i]);
  }
}`;

  const mergeSortCode = `
// C++ implementation of Merge Sort
// Time Complexity: O(n log n) - worst, average, and best cases
// Space Complexity: O(n)

void merge(int arr[], int left, int mid, int right) {
  int n1 = mid - left + 1;
  int n2 = right - mid;
  
  // Create temporary arrays
  int L[n1], R[n2];
  
  // Copy data to temporary arrays
  for (int i = 0; i < n1; i++)
    L[i] = arr[left + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[mid + 1 + j];
    
  // Merge the temporary arrays back into arr[left..right]
  int i = 0, j = 0, k = left;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  // Copy remaining elements of L[] if any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  // Copy remaining elements of R[] if any
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

void mergeSort(int arr[], int left, int right) {
  if (left < right) {
    // Same as (left+right)/2, but avoids overflow
    int mid = left + (right - left) / 2;
    
    // Sort first and second halves
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    
    // Merge the sorted halves
    merge(arr, left, mid, right);
  }
}`;

  const quickSortCode = `
// C++ implementation of Quick Sort
// Time Complexity: O(n²) - worst case, O(n log n) - average case
// Space Complexity: O(log n) - due to recursion stack

int partition(int arr[], int low, int high) {
  int pivot = arr[high]; // Choose last element as pivot
  int i = (low - 1);     // Index of smaller element
  
  for (int j = low; j <= high - 1; j++) {
    // If current element is smaller than or equal to pivot
    if (arr[j] <= pivot) {
      i++; // Increment index of smaller element
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return (i + 1);
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    // pi is partitioning index, arr[pi] is now at right place
    int pi = partition(arr, low, high);
    
    // Separately sort elements before and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`;

  const heapSortCode = `
// C++ implementation of Heap Sort
// Time Complexity: O(n log n) - worst, average, and best cases
// Space Complexity: O(1)

// To heapify a subtree rooted with node i which is an index in arr[]
// n is size of heap
void heapify(int arr[], int n, int i) {
  int largest = i;    // Initialize largest as root
  int left = 2*i + 1; // left = 2*i + 1
  int right = 2*i + 2; // right = 2*i + 2
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest])
    largest = left;
    
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest])
    largest = right;
    
  // If largest is not root
  if (largest != i) {
    swap(arr[i], arr[largest]);
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[], int n) {
  // Build heap (rearrange array)
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
    
  // One by one extract an element from heap
  for (int i = n - 1; i > 0; i--) {
    // Move current root to end
    swap(arr[0], arr[i]);
    
    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
}`;

  // Modified sorting functions to show code and time complexity
  const bubbleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setAlgorithm('Bubble Sort');
    setCurrentCode(bubbleSortCode);
    setTimeComplexity('Time Complexity: O(n²) | Space Complexity: O(1)');
    setShowCodePanel(true);
    document.body.classList.add('sorting-active');
    const animations = getBubbleSortAnimations([...array]);
    animateSorting(animations);
  };

  const mergeSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setAlgorithm('Merge Sort');
    setCurrentCode(mergeSortCode);
    setTimeComplexity('Time Complexity: O(n log n) | Space Complexity: O(n)');
    setShowCodePanel(true);
    document.body.classList.add('sorting-active');
    const animations = getMergeSortAnimations([...array]);
    animateSorting(animations);
  };

  const quickSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setAlgorithm('Quick Sort');
    setCurrentCode(quickSortCode);
    setTimeComplexity('Time Complexity: O(n log n) average, O(n²) worst | Space Complexity: O(log n)');
    setShowCodePanel(true);
    document.body.classList.add('sorting-active');
    const animations = getQuickSortAnimations([...array]);
    animateSorting(animations);
  };

  const heapSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setAlgorithm('Heap Sort');
    setCurrentCode(heapSortCode);
    setTimeComplexity('Time Complexity: O(n log n) | Space Complexity: O(1)');
    setShowCodePanel(true);
    document.body.classList.add('sorting-active');
    const animations = getHeapSortAnimations([...array]);
    animateSorting(animations);
  };

  const selectionSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setAlgorithm('Selection Sort');
    setCurrentCode(selectionSortCode);
    setTimeComplexity('Time Complexity: O(n²) | Space Complexity: O(1)');
    setShowCodePanel(true);
    document.body.classList.add('sorting-active');
    const animations = getSelectionSortAnimations([...array]);
    animateSorting(animations);
  };

  const toggleCodePanel = () => {
    setShowCodePanel(!showCodePanel);
  };

  const WelcomeScreen = () => (
    <div className="welcome-screen">
      <h1>Welcome to Sorting Visualizer</h1>
      <p>An interactive tool to visualize sorting algorithms</p>
      <div className="welcome-animation">
        {Array.from({length: 20}).map((_, i) => (
          <div 
            key={i} 
            className="welcome-bar"
            style={{ 
              height: `${randomIntFromInterval(30, 200)}px`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  const CompletionMessage = () => (
    <div className="completion-message">
      <div className="completion-content">
        <h2>Sorting Complete!</h2>
        <p>{algorithm} has finished</p>
      </div>
    </div>
  );

  const barWidth = numBars <= 10 ? 40 : 
                  numBars <= 30 ? 16 : 
                  numBars <= 50 ? 8 : 
                  numBars <= 100 ? 5 : 3;
                 
  const marginWidth = numBars <= 10 ? 5 : 
                     numBars <= 30 ? 3 : 
                     numBars <= 50 ? 2 : 1;

                     return (
                      <div className="sorting-visualizer">
                        {showWelcome ? (
                          <WelcomeScreen />
                        ) : (
                          <div className="main-content-container">
                            <h1 className="text-xl md:text-4xl mb-4">Sorting Algorithm Visualizer</h1>
                    
                            <div className="controls">
                              <div className="control-group">
                                <label>Number of Bars: {numBars}</label>
                                <input
                                  type="range"
                                  min={MIN_BARS}
                                  max={MAX_BARS}
                                  value={numBars}
                                  onChange={handleNumBarsChange}
                                  disabled={isSorting}
                                />
                              </div>
                              
                              <div className="control-group">
                                <label>Animation Speed: {Math.round(1000/speed)} ops/sec</label>
                                <input
                                  type="range"
                                  min={MIN_SPEED}
                                  max={MAX_SPEED}
                                  value={speed}
                                  onChange={handleSpeedChange}
                                  disabled={isSorting}
                                />
                              </div>
                              
                              <button 
                                onClick={resetArray} 
                                className="reset-button"
                                disabled={isSorting}
                              >
                                Generate New Array
                              </button>
                            </div>
                            
                            {isSorting && (
                              <div className="algorithm-info">
                                <div>{algorithm} in progress...</div>
                              </div>
                            )}
                            
                            <div className="array-container" ref={arrayContainerRef}>
                              {array.map((value, idx) => (
                                <div
                                  className="array-bar"
                                  key={idx}
                                  style={{
                                    backgroundColor: DEFAULT_COLOR,
                                    height: `${value}px`,
                                    width: `${barWidth}px`,
                                    margin: `0 ${marginWidth}px`,
                                    transition: isSorting ? 'height 0.1s ease-in-out' : 'height 0.5s ease-out, background-color 0.3s ease'
                                  }}
                                >
                                  {numBars <= 30 && <span className="bar-value">{value}</span>}
                                </div>
                              ))}
                            </div>
                            
                            <div className="color-legend">
                              <div className="legend-item">
                                <div className="color-box" style={{ backgroundColor: DEFAULT_COLOR }} />
                                <span>Unsorted</span>
                              </div>
                              <div className="legend-item">
                                <div className="color-box" style={{ backgroundColor: COMPARE_COLOR }} />
                                <span>Comparing</span>
                              </div>
                              <div className="legend-item">
                                <div className="color-box" style={{ backgroundColor: SWAP_COLOR }} />
                                <span>Swapping</span>
                              </div>
                              <div className="legend-item">
                                <div className="color-box" style={{ backgroundColor: SORTED_COLOR }} />
                                <span>Sorted</span>
                              </div>
                            </div>
                            
                            <div className="sort-buttons">
                              <button onClick={bubbleSort} disabled={isSorting} className="sort-button">
                                Bubble Sort
                              </button>
                              <button onClick={selectionSort} disabled={isSorting} className="sort-button">
                                Selection Sort
                              </button>
                              <button onClick={mergeSort} disabled={isSorting} className="sort-button">
                                Merge Sort
                              </button>
                              <button onClick={quickSort} disabled={isSorting} className="sort-button">
                                Quick Sort
                              </button>
                              <button onClick={heapSort} disabled={isSorting} className="sort-button">
                                Heap Sort
                              </button>
                            </div>
                            
                            {algorithm && (
                              <div className="code-panel-container">
                                <button className="toggle-code-button" onClick={toggleCodePanel}>
                                  {showCodePanel ? "Hide C++ Code" : "Show C++ Code"}
                                </button>
                                
                                {showCodePanel && (
                                  <div className="code-panel">
                                    <div className="complexity-info">
                                      <h3>{algorithm}</h3>
                                      <p>{timeComplexity}</p>
                                    </div>
                                    <pre className="code-display">
                                      <code>{currentCode}</code>
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {showCompletionMessage && <CompletionMessage />}
                      </div>
                    );
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;