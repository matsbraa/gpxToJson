const electron = require('electron')
const $ = require('jQuery')
const {dialog} = require('electron').remote
let filepath
var fs = require('fs')
var index = 0
var jsonObj = [];
var counter = 0
var counterMinusOne = 0
var item
var jsonString


document.getElementById('generate').addEventListener('click', _ => {
  filepath = document.getElementById("gpxFile").files[0].path
  counter = document.getElementById("selectTime").value;
  counterMinusOne = counter-1
  $.ajax({
    type: "GET",
    url: filepath,
    dataType: "xml",
    crossDomain: true,
    success: function (xml) {
       $(xml).find("trkpt").each(function () {
          if (counter > counterMinusOne) {
             var lat = $(this).attr("lat");
             var lon = $(this).attr("lon");
             counter = 0

             item = {}
             item ["CoordinateId"] = index;
             item ["Latitude"] = lat;
             item ["longitude"] = lon;

             jsonObj.push(item);
             index++
          }
          counter++;
       });

      jsonString = JSON.stringify(jsonObj, null, 2)
    }
  });

  dialog.showSaveDialog({ filters: [

    { name: 'json', extensions: ['json'] }

    ]}, function (fileName) {

    if (fileName === undefined) return;

    fs.writeFile(fileName, jsonString, function (err) {
      if(err){
        alert("An error occured creating the file " + err.message)
      }

      alert("The file has been successfully saved")
    })
  });
})
