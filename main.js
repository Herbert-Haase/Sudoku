let gameTable = [[], [], [], [], [], [], [], [], []];

//Check for duplicate numbers in the same row/column and Cube
let checkForDuplicates = {
  rowCol(num, field) {
    let row = field.getAttribute("row");
    let col = field.getAttribute("col");

    let rowValues = gameTable[row];
    let colValues = gameTable.map((row) => row[col]);

    return rowValues.includes(Number(num)) || colValues.includes(Number(num));
  },

  cube(num, field) {
    let cube_html = field.parentElement.childNodes;
    let cube_array = [...cube_html];
    let cube_numbers = cube_array
      .map((item) => Number(item.textContent))
      .filter((item) => typeof item == "number" && item !== 0);

    return cube_numbers.includes(Number(num));
  },
};

function checkDifficulty() {
  return Number(document.querySelector("select").value);
}

// Reset both DOM and gameTable
function resetTable() {
  document.querySelectorAll("div[row]").forEach((field) => {
    field.textContent = "";
  });
  gameTable = [[], [], [], [], [], [], [], [], []];
}

// Insert a number into the DOM and gameTable
function insert(num, field) {
  field.textContent = num;
  let row = field.getAttribute("row");
  let col = field.getAttribute("col");

  gameTable[row][col] = num;
}
// Place random numbers at the start of the game
function placeAtStart(amount) {
  document.querySelectorAll("div[cube]").forEach((cube) => {
    let amountOfNumbers = Math.floor(Math.random() * amount);

    for (let i = 0; i < amountOfNumbers; i++) {
      let locationOfNumber = Math.floor(Math.random() * 9);
      let field = cube.children[locationOfNumber];
      let num = Math.floor(Math.random() * 9) + 1;

      if (
        !(
          checkForDuplicates.rowCol(num, field) ||
          checkForDuplicates.cube(num, field)
        )
      ) {
        insert(num, field);
      } else {
        insert(undefined, field);
      }
    }
  });
}

// Add event listener for user input
document.querySelectorAll("div[row]").forEach((field) => {
  field.addEventListener("keydown", (e) => {
    if (!isNaN(Number(e.key)) && !(e.key == 0)) {
      if (
        checkForDuplicates.rowCol(e.key, e.target) ||
        checkForDuplicates.cube(e.key, e.target)
      ) {
        e.target.classList.add("wrong");
      } else {
        e.target.classList.remove("wrong");
      }
      insert(Number(e.key), e.target);
    }
  });
});

//Starting Difficulty (Once the site loads)
placeAtStart(checkDifficulty());

// Add event listener for reset button
document.querySelector("#reset").addEventListener("click", () => {
  resetTable();
  placeAtStart(checkDifficulty());
});
