/*
Author: Arjun B
Creation Date: 24th Nov 2017
Time Taken for Code: 60 Mins
Time Taken for Testing: 20 Mins
Time Taken for Documentation: 15 Mins
Execution Time: 0.256 Seconds
Development OS: Windows 10 1709
Development Edito: VS Code 1.18.1
*/

//Import the Core FS module
const fs = require("fs");

//Import the Core Path module
const path = require('path');

//Initialize a buffer variable to hold the converted JSON data
var buff = "";
var strdata = " ";

fs.readFile(path.join(__dirname, 'customer-data.csv'), (error, data) => {

    if (error) throw error;

    //Get the CSV file contents as a string into a variable. This also removes the carriage return through legacy "\r", which messes the formatting
    strdata = data.toString().replace("\r", "");;

    //Split each of the lines from the CSV file into an array
    var lines = strdata.split("\n");

    //Get the total number of lines in the CSV file, including the header line
    var numLines = lines.length;

    //Extract the header line as an array, segregated at Individual fields in each array element.
    var header = lines[0].split(",");

    //Get the total number of fields in the CSV file
    var fieldLength = header.length;

    //Set counter for the first line of CSV content, leaving out the header
    var lnum = 1;

    //Initialize JSON format start symbol into a variable
    buff = "[";

    //Run the while loop until we reach the last line/record of the CSV file. We do not start from the header record/line here
    while (lnum < numLines) {
        
        //Get the current line into an array, segregated at Individual fields
        var currentLine = lines[lnum].split(",");

        //Pad with necessary opening braces and newlines for the JSON structure
        buff += "\n{\n";

        //Read through all fields of the current line, matching them with corresponding header fields, and padding with necessary JSON format symbols
        for (var i = 0; i < fieldLength; i++) {
            
            //To remove the carriage return through legacy "\r", which messes the formatting. After splitting the current line into Individual fields, each field can possibly have embedded "\r"
            currentLine[i] = currentLine[i].replace("\r", "");

            //Form the JSON tag from the corresponding header and current line fields
            buff += "\"" + header[i] + "\"" + ":" + "\"" + currentLine[i] + "\""

            //This is to avoid putting a "," after the last field of the current record has been converted, or otherwise this will form an Invalid JSON
            if (fieldLength - i > 1) {
                buff += ",\n";
            }
        }

        //This is for padding the brace closure of a single record in JSON
        buff += "\n}";

        //Avoid putting a "," after the last record has been converted, or otherwise this will form an Invalid JSON
        if (numLines - lnum > 1) {
            buff += ",";
        }

        //Increment the current line number being converted
        lnum++;

    }

    //Conclude the JSOn format with closing tag
    buff += "\n]";

    //Write to a file in the same directory as the program
    fs.writeFile('Converted.json', buff.toString(), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

})