//HTML Elements

let werIstDranDiv = document.querySelector(".werIstDran");
let buttonResetDiv = document.querySelector(".resetButton");
var playerswitch = 0

const playerDef = {"0" : "cross" , "1" : "circle"}

// console.log(werIstDranDiv);
// console.log(buttonResetDiv);

//Platzhalter zum generieren der Spielfeldgröße
let spielfeldNumber = [];
//Hier wird die Größe des Spielfelds angegeben (n x n)

function generateSpielfeld() {
  //Die Zahl die im Eingabefeld Input steht wird verwendet
  spielfeldNumber = Number(document.getElementById("input").value);
    //herunterrechnen, neue Felder minus die vorhandenen
    for (let i = 0; i < (spielfeldNumber * spielfeldNumber-9); i++) {

    // Erstelle ein div container mit der Klasse gitter, vergeben unique id
      const Feld = $("<div></div>").appendTo(".spielfeld").addClass("gitter").click(function(){ fieldClicked(i+10)}).attr("id",`${i+10}` )
    console.log("Hey")
    }

  //Änder das Stylesheet des spielfelds so ab, dass die neue Anzahl an felder angepasst wird
  const Layout = $(".spielfeld").css( "grid-template-columns", "repeat(" + spielfeldNumber + ", 1fr)" );
  }

  // Funktion um abwechselnd Kreis und Kreuz zu platzieren
  function fieldClicked(uniqueid) {
    let id = uniqueid

    if (playerswitch == 0) {
    $(`#${uniqueid}`).toggleClass("circle")
    playerswitch = 1
    } else if (playerswitch == 1) {
      $(`#${uniqueid}`).toggleClass("cross")
      playerswitch = 0
    }
    console.log("fieldClicked: " + uniqueid)
    $(`#${uniqueid}`).css('pointer-events', 'none');
    checkWinCondition(uniqueid)
    }

    function checkWinCondition(id) {
      var fieldSize = spielfeldNumber * spielfeldNumber
      if (spielfeldNumber.length == 0){
      fieldSize = 9 
      }
      const winCondition =  Math.sqrt(fieldSize)
      // console.log(winCondition)
      checkVertical(id, winCondition)
      checkHorizontal(id, winCondition)
      checkDiagonal(id, winCondition)
    }

    function checkVertical(id, winCondition) {
      var whosTurn = playerDef[playerswitch]
      var allFieldsAboveChecked = false;
      var allFieldsBelowChecked = false;

      var position = id;

      // Check below
      for (var i = position; i <= winCondition * winCondition; i += winCondition) {
        var classInfo = $(`#${i}`).attr("class");
        if ($(`#${i}`).hasClass(whosTurn)) {
          allFieldsBelowChecked = true;
         } else {
           allFieldsBelowChecked = false;
          return;
         }
      }
      
      // Check above    
      for (var i = position; i > 0; i -= winCondition) {     
        var classInfo = $(`#${i}`).attr("class");
        if ($(`#${i}`).hasClass(whosTurn)) {
          allFieldsAboveChecked = true;
        } else {
          allFieldsAboveChecked = false;
          return;
        }
      }

      if (allFieldsAboveChecked && allFieldsBelowChecked) {
        console.log("YOU WON VERTICAL")
      }          
    }

    function checkHorizontal(id, winCondition) {
      
      var horizontalPosition = id % winCondition;
      var fieldsLeftCount = horizontalPosition - 1 
      var fieldsRightCount = winCondition - horizontalPosition
      var whosTurn = playerDef[playerswitch]
      var allFieldsLeftChecked = false;
      var allFieldsRightChecked = false;

      if (horizontalPosition == 0) {
        fieldsLeftCount = winCondition - 1
        fieldsRightCount = 0
      }

      var initialClassInfo = $(`#${id}`).attr("class");
      // console.log("INITIAL: " + initialClassInfo)

      // Felder nach links überprüfen
      for (let i = 1; i <= fieldsLeftCount; i++) {        
        var classInfo = $(`#${id-i}`).attr("class");
        // console.log(classInfo)
        if ($(`#${id-i}`).hasClass(whosTurn)) {
          allFieldsLeftChecked = true;
        } else {
          allFieldsLeftChecked = false;
          return;
        }
      }

      // Felder nach rechts überprüfen
      for (let i = 1; i <= fieldsRightCount; i++) {        
        var classInfo = $(`#${id+i}`).attr("class");
        // console.log(classInfo)
        if ($(`#${id+i}`).hasClass(whosTurn)) {
          allFieldsRightChecked = true;
        } else {
          allFieldsRightChecked = false;
          return;
        }
      }

      // Gewonnen wenn in der Mitte irgendwo
      if (allFieldsLeftChecked && allFieldsRightChecked) {
        console.log("YOU WON HORIZONTAL!")
      }

      // Gewonnen wenn an horizontaler erster stelle und alle rechts richtig
      if (horizontalPosition == 1 && allFieldsRightChecked) {
        console.log("YOU WON HORIZONTAL!")
      }

      // Gewonnen wenn an horizontaler letzter stelle und alle links richtig
      if (horizontalPosition == 0 && allFieldsLeftChecked) {
        console.log("YOU WON HORIZONTAL!")
      }

    }

    function checkDiagonal(id, winCondition) {
      
      checkDiagonal1(id, winCondition)
      checkDiagonal2(id, winCondition)

      if (checkDiagonal1(id, winCondition) || checkDiagonal2(id,winCondition)) {
        console.log("YOU WON DIAGONAL")
      }
    }

    function checkDiagonal1(id, winCondition) {
      var whosTurn = playerDef[playerswitch]
      var allUpDownRightChecked = false;  //    -->  \    nach rechts unten
      var allDownUpLeftChecked = false;   //    -->  \    nach links oben

      // Check down up Left   
      for (var n = id; n > 0; n -= (winCondition + 1)) {   
        var classInfo = $(`#${n}`).attr("class");
        if ($(`#${n}`).hasClass(whosTurn)) {
          allDownUpLeftChecked = true;
        } else {
          allDownUpLeftChecked = false;
          return;
        }
      }

      // Check Up Down Right
      for (var i = id; i <= winCondition * winCondition; i += (winCondition + 1)) {
        var classInfo = $(`#${i}`).attr("class");
        if ($(`#${i}`).hasClass(whosTurn)) {
           allUpDownRightChecked = true;
         } else {
           allUpDownRightChecked = false;
          return;
         }
      }

      return allDownUpLeftChecked && allUpDownRightChecked
    }

    function checkDiagonal2(id, winCondition) {
      var whosTurn = playerDef[playerswitch]
      var allDownUpRightChecked = false;  //    -->  /    nach rechts oben
      var allUpDownLeftChecked = false;   //    -->  /    nach links unten 
      var exceptionValue = (winCondition * winCondition) - (winCondition - 1)  // Feld-Id unten links 

       // Check down up Right
       for (var z = id; z >= winCondition; z -= (winCondition - 1)) {
        var classInfo = $(`#${z}`).attr("class");
        if ($(`#${z}`).hasClass(whosTurn)) {
          allDownUpRightChecked = true;
         } else {
           allDownUpRightChecked = false;
          return;
         }
      }

      // Check up down Left
      for (var d = id; d <= exceptionValue; d += (winCondition - 1)) {
        var classInfo = $(`#${d}`).attr("class");
        if ($(`#${d}`).hasClass(whosTurn)) {
          allUpDownLeftChecked = true;
         } else {
           allUpDownLeftChecked = false;
          return;
         }
      }

      return allDownUpRightChecked && allUpDownLeftChecked

    }


