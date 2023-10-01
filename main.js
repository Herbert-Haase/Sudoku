let gameTable = [[], [], [], [], [], [], [], [], []];

function randomNumbersPerCube(maxAmount = 5) {
  // Create array of numbers to insert into cubes at the start of the game
  let amount = Math.floor(Math.random() * (maxAmount - 1)) + 1;
  let numbers = [];

  for (let i = 0; i < amount; i++) {
    numbers.push(Math.floor(Math.random() * 9) + 1);
  }
  return [...new Set(numbers)]; // Remove Duplicates
}

//let num = randomNumbersPerCube(9);

function emptyTable() {
  //empty DOM
  let fields = document.querySelectorAll("div[row]");
  fields.forEach((field) => {
    field.textContent = "";
  });

  //empty gameTable
  gameTable = [[], [], [], [], [], [], [], [], []];
}

// function placeAtStart(gameTable) {
//let subarrays = [];

//   for (let i = 0; i < 9; i += 3) {
//     for (let j = 0; j < 9; j += 3) {
//       let subarray = [];

//       for (let x = i; x < i + 3; x++) {
//         for (let y = j; y < j + 3; y++) {
//           subarray.push(gameTable[x][y]);
//         }
//       }

//       subarrays.push(subarray);
//     }
//   }
//   return subarrays;
// }

let fields = document.querySelectorAll("div[row]");
fields.forEach((field) => {
  field.addEventListener("keydown", (e) => {
    if (!isNaN(Number(e.key)) && !(e.key == 0)) {
      insertIntoDOM(e.key, e.target);
      insertIntoGameTable(e.key, e.target);
      if (checkForSameNumber_RowCol(e.key, e.target)) {
        e.target.classList.add("wrong");
      } else {
        e.target.classList.remove("wrong");
      }
    }
  });
});

function insertIntoDOM(num, field) {
  field.textContent = num;
}
function insertIntoGameTable(num, field) {
  let row = field.getAttribute("row");
  let col = field.getAttribute("col");

  gameTable[row][col] = Number(num);
}

function checkForSameNumber_RowCol(num, field) {
  let row = field.getAttribute("row");
  let col = field.getAttribute("col");

  let unfiltered_rows = gameTable[row];
  let colsWithUndefind = gameTable.map((row) => row[col]);
  let unfiltered_cols = colsWithUndefind.filter((col) => col != undefined);

  let cols = unfiltered_cols.filter((item) => item == num);
  let rows = unfiltered_rows.filter((item) => item == num);

  let duplicatesRows = rows.some((item, index) => rows.indexOf(item) !== index);
  let duplicatesCols = cols.some((item, index) => cols.indexOf(item) !== index);

  return duplicatesRows || duplicatesCols;
}
