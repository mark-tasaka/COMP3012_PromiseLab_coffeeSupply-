const fs = require("node:fs/promises");

const os = require("node:os");

const process = require("node:process");



//Mark Tasaka Lab 5



//function to convert data to array

async function createArray() {

  //Read File

  return fs

    .readFile("./supply.txt", "utf8")

    .then((data) => {

      data = data.toString();

      coffee = data.split(os.EOL);

      return coffee;

    })

    .catch((err) => console.log(err));

}



//Creates an obj for the quantity of coffee types

async function coffeeCount(coffee) {

  let coffeeCountObj = { DR: 0, MR: 0, B: 0 };

  for (i = 0; i < coffee.length; i++) {

    if (coffee[i] === "medium-roast") coffeeCountObj.MR += 1;

    if (coffee[i] === "dark-roast") coffeeCountObj.DR += 1;

    if (coffee[i] === "blonde") coffeeCountObj.B += 1;

  }



  return coffeeCountObj;

}



//ensure proper coffee type data entered

function coffeeInputValidation(input) {

  if (input != "DR" && input != "MR" && input != "B") {

    return false;

  } else {

    return true;

  }

}



//convert input to full name

function convertToFullName(input) {

  if (input === "DR") return os.EOL + "dark-roast";

  if (input === "MR") return os.EOL + "medium-roast";

  if (input === "B") return os.EOL + "blonde";

}



//convert input to full name without EOL

function convertToFullNameNoEOL(input) {

  if (input === "DR") return "dark-roast";

  if (input === "MR") return "medium-roast";

  if (input === "B") return "blonde";

}



//user inputs DR, MR or B, and the quantity of that coffee type appears

async function viewAllSupply(input, coffeeCountObj) {

  const inputValid = coffeeInputValidation(input);

  if (inputValid === true) {

    if (input === "DR") return coffeeCountObj.DR;

    if (input === "MR") return coffeeCountObj.MR;

    if (input === "B") return coffeeCountObj.B;

  } else {

    console.log(

      "Invalid coffee type entered, please enter either MR, DR, or B."

    );

    return;

  }

}



//Add coffee to quantity

async function addSupply(input, coffeeArray) {

  const inputValid = coffeeInputValidation(input);

  let coffeeName = convertToFullName(input);

  if (inputValid === true) {

    return fs

      .appendFile("./supply.txt", coffeeName, "utf8")

      .then(() => {

        // substring to remove the EOLin convertToFullName

        coffeeArray.push(coffeeName.substring(1));

        return coffeeArray;

      })

      .catch((err) => console.log(err));

  } else {

    console.log(

      "Invalid coffee type entered, please enter either MR, DR, or B."

    );

    return;

  }

}



//delete coffee type base on quanity

async function deleteSupply(input, quantity, coffeeArray) {

  const inputValid = coffeeInputValidation(input);

  let coffeeType = convertToFullNameNoEOL(input);

  let message = "";

  console.log("Coffee Array Length Before: " + coffeeArray.length);

  for (i = 0; i < coffeeArray.length; i++) {

    if (coffeeArray[i] == coffeeType && quantity > 0) {

      const removed = coffeeArray.splice(i, 1);

      quantity -= 1;

      //console.log("Item removed: " + removed);

    }

  }

  //coffeeCountObj = coffeeCount(coffeeArray);

  console.log("Coffee Array Length after: " + coffeeArray.length);

  for (i = 0; i < coffeeArray.length; i++) {

    message += coffeeArray[i] + os.EOL;

  }

  if (inputValid === true) {

    fs.writeFile("./supply.txt", message, "utf8")

      .then(() => {})

      .catch((err) => console.log(err));

  } else {

    console.log(

      "Invalid coffee type entered, please enter either MR, DR, or B."

    );

    return;

  }

  let coffeeArray2 = await createArray();

  return coffeeArray2;

}



//Main(): Program entry

async function main() {

  try {

    let coffeeArray = await createArray();

    let coffeeCountObj = await coffeeCount(coffeeArray);

    console.log(coffeeCountObj);

    let mediumQuantity = await viewAllSupply("MR", coffeeCountObj);



    //1. viewAllSupply for "MR"

    console.log("1. Supply for MR: " + mediumQuantity);



    //2. call addSupply one time with "MR"

    coffeeArray = await addSupply("MR", coffeeArray);

    //coffeeArray = await createArray();

    //console.log(coffeeCountObj);

    coffeeCountObj = await coffeeCount(coffeeArray);

    mediumQuantity = await viewAllSupply("MR", coffeeCountObj);



    //3. viewAllSupply for "MR"

    console.log("3. Supply for MR after addition of MR: " + mediumQuantity);



    //4. call deleteSupply with "MR" and 2

    coffeeArray = await deleteSupply("MR", 2, coffeeArray);



    //update Coffee Obj

    //coffeeCountObj = coffeeCount(coffeeArray);

    //update MR count

    mediumQuantity = await viewAllSupply("MR", coffeeCountObj);



    //5. viewAllSupply for "MR"

    console.log("5. Supply for MR after deletion of 2 MR: " + mediumQuantity);



    //6. print "Program is completed."

    console.log("Program is completed.");



    //Update coffee object

    //  coffeeCountObj = await coffeeCount(coffeeArray);

    //console.log(coffeeCountObj);

    //console.log(coffeeCountObj);

  } catch (err) {

    console.log(err);

  }

}



main();