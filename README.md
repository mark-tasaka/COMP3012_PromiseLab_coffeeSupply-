# COMP3012_PromiseLab_coffeeSupply-
My lab for my BCIT COMP 3012 Node.js class that uses Promises to read in a text file (supply.txt) containing a list of coffee types.  The lab contains the following functions to modify/update the items on the text file.

Function 1: viewAllSupply(input, coffeeCountObj)
The purpose of this function is to read in a coffee-type abbreviated by initials (i.e. DR for dark-roast).  The function produces a count of the coffee type.

Function 2: addSupply(input, coffeeArray)
The purpose of this function is to add additional coffee to the text file (supply.txt).

Function 3: deleteSupply(input, quantity, coffeeArray)
The purpose of this function is to delete additional coffee to the text file (supply.txt).

The following additional function were created to ensure going coding practices by limiting reducing the code inside the function by calling other functions that shared functionality with other functions:
createArray()
coffeeCount(coffee)
coffeeInputValidation(input)
convertToFullName(input)
convertToFullNameNoEOL(input)
