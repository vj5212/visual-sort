// VIZ AND STOP BUTTONS
let btn = document.querySelector("#viz");
let stopBtn = document.querySelector("#stop");

// Algorithm Title
let algTitle = document.querySelector("#sortType");

// Sort description
let description = document.querySelector(".main-description");
let avg = document.querySelector(".avg");
let worst = document.querySelector(".worst");
let links = document.querySelector(".links");

// ALGORITHM BUTTONS
let bubbleButton = document.getElementById("bubbleBtn");
let mergeButton = document.getElementById("mergeBtn");
let quickButton = document.getElementById("quickBtn");

// MAIN GRAPH DIV
let graph = document.querySelector(".inner");

// Global Stop Variable
let stop = false;

let curr = [];

// Global Active Alg Object
let activeAlg = {
  bubble: false,
  merge: false,
  quick: false,
};

// Initialize Active Algorithm to bubble
activateSort("bubble");
algTitle.innerHTML = "Bubble Sort";
bubbleButton.style.boxShadow = "0px 0px 20px 1px rgb(255, 96, 184, .8)";

// Make Each Alg button change the state of the active Alg object
bubbleButton.addEventListener("click", () => {
  activateSort("bubble");
  algTitle.innerHTML = bubbleButton.textContent;
  description.innerHTML = "Bubble Sort is overall the simplest and most straightforward sorting algorithm. It uses a brute force technique that checks every element against its neighbor, swapping them if they are out of order. The algorithm iterates through the array until it is sorted. It is a comparison sort, and is named for how elements will bubble to the top or bottom. It is also generally the least efficient sorting algorithm in terms of time complexity.";
  avg.innerHTML = "Average Time Complexity: <span>O(n<sup>2</sup>)</span>";
  worst.innerHTML = "Worst Case Time Complexity: <span>O(n<sup>2</sup>)</span>";
  links.innerHTML = "Links: <a href='https://en.wikipedia.org/wiki/Bubble_sort' target='_blank'>Wikipedia</a> - <a href='https://www.geeksforgeeks.org/bubble-sort/' target='_blank'>GeeksforGeeks Tutorial</a>"
  changeColor(bubbleButton, mergeButton, quickButton);
});


mergeButton.addEventListener("click", () => {
  activateSort("merge");
  algTitle.innerHTML = mergeButton.textContent;
  description.innerHTML = "Merge Sort is a more complex and efficient sorting algorithm. It works by a divide and conquer method which breaks the larger list into <i>n</i> sublists, and sorts those separately. The algorithm then merges theses sublists into larger ones and separates those separately until the list is finally sorted. Invented by John von Neumann in 1945, this divide and conquer algorithm is named for the process of merging smaller sublists during the sorting process. It boasts a rather efficient time complexity and is generally implemented recursively. ";
  avg.innerHTML = "Average Time Complexity: <span>O(n log n)</span>";
  worst.innerHTML = "Worst Case Time Complexity: <span>O(n log n)</span>";
  links.innerHTML = 'Links: <a href="https://en.wikipedia.org/wiki/Merge_sort" target="_blank">Wikipedia</a> - <a href="https://www.geeksforgeeks.org/merge-sort/" target="_blank">GeeksforGeeks Tutorial</a>';
  changeColor(mergeButton, bubbleButton, quickButton);
});

quickButton.addEventListener("click", () => {
  activateSort("quick");
  algTitle.innerHTML = quickButton.textContent;
  description.innerHTML = "Quick Sort is a very efficient divide and conquer sorting algorithm that is also commonly referred to as partition-exchange sort. It was developed by Tony Hoare in 1959, and works by sorting sublists depending on their relation to the pivot element. The algorithm, which is a comparison sort that is commonly implemented recursively, has the potential of outperforming other popular sorting algorithms by two to three times.";
  avg.innerHTML = "Average Time Complexity: <span>O(n log n)</span>";
  worst.innerHTML = "Worst Case Time Complexity: <span>O(n log n)</span>";
  links.innerHTML = 'Links: <a href="https://en.wikipedia.org/wiki/Quicksort" target="_blank">Wikipedia</a> - <a href="https://www.geeksforgeeks.org/quick-sort/" target="_blank">GeeksforGeeks Tutorial</a>'
  changeColor(quickButton, mergeButton, bubbleButton);
});

// STOP VISUALIZATION
stopBtn.addEventListener("click", () => {
  stop = true;
});

// START VISUALIZATION
btn.addEventListener("click", () => {
  stop = false;
  function drawLoop() {
    let next = iterator.next(); // pull from yield
    if (!next.done) {
      draw(next.value);
    } else {
      clearInterval(intervalId);
      document
        .querySelectorAll(".bar")
        .forEach((bar) => (bar.style.backgroundColor = "#41d6ff;"));
    }
  }

  let numEls = document.querySelector("#choose").value;

  let bubbleDelayTimes = {
    "30": 25,
    "20": 60,
    "15": 75,
  };

  let mergeDelayTimes = {
    "30": 220,
    "20": 250,
    "15": 300,
  };

  let quickDelayTimes = {
    "30": 400,
    "20": 450,
    "15": 500,
  };

  // let delay = delayTimes[`${numEls}`];
  let array = generateArray();

  let delay;
  let iterator;

  if (activeAlg["bubble"]) {
    delay = bubbleDelayTimes[`${numEls}`];
    iterator = bubbleSort(array);
  }
  else if (activeAlg["merge"]) {
    delay = mergeDelayTimes[`${numEls}`];
    iterator = mergeSort(array);
  }
  else if (activeAlg["quick"]) {
    curr = [];
    delay = quickDelayTimes[`${numEls}`];
    current = quickSort(array, 0, array.length - 1);
    iterator = quick(curr);
  }

  let intervalId = setInterval(drawLoop, delay);
  drawLoop(); // so no wait for first paint
});

// Function to change the global active algorithm object
function activateSort(alg) {
  activeAlg = {
    bubble: false,
    merge: false,
    quick: false,
  };
  activeAlg[alg] = "true";
}

// Function to change button colors when picked
function changeColor(btn1, btn2, btn3) {
  btn1.style.boxShadow = "0px 0px 20px 1px rgb(255, 96, 184, .8)";
  btn2.style.boxShadow = "";
  btn3.style.boxShadow = "";
}

// --- DRAW FUNCTION ---
function draw(array) {
  document.querySelectorAll(".bar").forEach((bar) => bar.remove());

  let container = document.querySelector(".inner");
  array.forEach((value) => {
    let bar = container.appendChild(document.createElement("div"));
    let val = bar.appendChild(document.createElement("h1"));
    val.textContent = value;
    val.className = "arr-val";
    bar.className = "bar";
    bar.style.height = 20 + value * 3 + "px";
    bar.style.width = Math.round(350 / array.length) + "px";
  });
}

// --- GENERATE RANDOM ARRAY ---
function generateArray() {
  let numEls = document.querySelector("#choose").value;
  let newArr = [];
  for (let i = 0; i < numEls; i++) {
    let foundUnique = false;
    while (foundUnique != true) {
      let randNum = Math.round(Math.random() * 98) + 1;
      if (newArr.includes(randNum) != true) {
        newArr.push(randNum);
        foundUnique = true;
      }
    }
  }

  if (isSorted(newArr) === true) {
    newArr = [];
    generateArray(numEls);
  }

  return newArr;
}

// --- HELPER TO SEE IF ARRAY IS CORRECTLY SORTED ---
function isSorted(newArr) {
  let sorted = true;
  for (let i = 0; i < newArr.length - 1; i++) {
    if (newArr[i] > newArr[i + 1]) {
      sorted = false;
      break;
    }
  }
  return sorted;
}

// --- BUBBLE SORT ---
function* bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
      yield array;
      if (stop == true) {
        return;
      }
    }
  }
}

// --- MERGE SORT ---
// Merge Sort Helper
function merge(A, temp, start, middle, last) {
  let k = start,
    i = start,
    j = middle + 1;

  while (i <= middle && j <= last) {
    if (A[i] < A[j]) {
      temp[k++] = A[i++];
    } else {
      temp[k++] = A[j++];
    }
  }

  while (i < A.length && i <= middle) {
    temp[k++] = A[i++];
  }

  for (i = start; i <= last; i++) {
    A[i] = temp[i];
  }
}

// Merge Sort Generator
function* mergeSort(A) {
  let low = 0,
    high = A.length - 1;

  let temp = A.slice(A, A.length);

  for (m = 1; m <= high - low; m = 2 * m) {
    for (i = low; i < high; i += 2 * m) {
      let start = i,
        mid = i + m - 1,
        last = Math.min(i + 2 * m - 1, high);

      merge(A, temp, start, mid, last);
      yield A;
      if (stop == true) {
        return;
      }
    }
  }
}

// --- QUICK SORT ---
function quickSort(arr, left, right) {
  var len = arr.length,
    pivot,
    partitionIndex;

  if (left < right) {
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right);

    //sort left and right
    curr.push(arr.slice());
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }

  return arr;
}

function partition(arr, pivot, left, right) {
  var pivotValue = arr[pivot],
    partitionIndex = left;

  for (var i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(arr, right, partitionIndex);
  return partitionIndex;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function* quick(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
    if (stop == true) {
      return;
    }
  }
}
