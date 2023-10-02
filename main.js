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

function placeAtStart(amount) {
  let cubes = document.querySelectorAll("div[cube]");
  for (let cube of cubes) {
    let amountOfNumbers = Math.floor(Math.random() * amount);
    for (let i = 0; i < amountOfNumbers; i++) {
      let locationOfNumber = Math.floor(Math.random() * 9);
      let field = cube.children[locationOfNumber];
      let num = Math.floor(Math.random() * 9) + 1;

      insertIntoDOM(num, field);
      insertIntoGameTable(num, field);
      if (
        checkForSameNumber_RowCol(num, field) ||
        checkForSameNumber_Cube(num, field)
      ) {
        insertIntoDOM(undefined, field);
        insertIntoGameTable(undefined, field);
      }
    }
  }
}

let fields = document.querySelectorAll("div[row]");
fields.forEach((field) => {
  field.addEventListener("keydown", (e) => {
    if (!isNaN(Number(e.key)) && !(e.key == 0)) {
      insertIntoDOM(Number(e.key), e.target);
      insertIntoGameTable(Number(e.key), e.target);
      if (
        checkForSameNumber_RowCol(e.key, e.target) ||
        checkForSameNumber_Cube(e.key, e.target)
      ) {
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

function checkForSameNumber_Cube(num, field) {
  let cube_html = field.parentElement.childNodes;
  let cube_array = [...cube_html];
  let cube_numbers = cube_array
    .map((item) => Number(item.textContent))
    .filter((item) => typeof item == "number" && item != 0);

  let cube_numbers_filtered = cube_numbers.filter((item) => item == num);
  let duplicatesCube = cube_numbers_filtered.some(
    (item, index) => cube_numbers_filtered.indexOf(item) !== index
  );

  return duplicatesCube;
}

placeAtStart(9);
