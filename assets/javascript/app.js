$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyDrwdUkliVs7tzC8MKiU4LL1nc8LrcHWQg",
        authDomain: "trains-b0c97.firebaseapp.com",
        databaseURL: "https://trains-b0c97.firebaseio.com",
        projectId: "trains-b0c97",
        storageBucket: "",
        messagingSenderId: "152400647567"
    };
    firebase.initializeApp(config);

    $(document).on("click", "#addTrain" , function(event) {
    
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();       
        
        firebase.database().ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        });   
    
        $( "#trainName" ).val("");
        $( "#destination" ).val("");
        $( "#firstTrain" ).val("");
        $( "#frequency" ).val("");
       
    });
    
    firebase.database().ref().on("child_added", function(snap) {    
    
        var firstTrain = snap.val().firstTrain;
        if (firstTrain.length < 4) {
            firstTrain = "0" + firstTrain;
        }
        var frequency = snap.val().frequency;
        
        var time = moment(firstTrain, "hh:mm A");
        var timeRemainder = moment().diff(time, "minutes") % frequency;
        var minutesAway = frequency - timeRemainder;
        var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm A");
  
        $(".table").append("<tr><td> " +
            snap.val().trainName + " </td><td> " +
            snap.val().destination + " </td><td> " +
            frequency + " </td><td> " +
            nextTrain + "</td><td> " +
            minutesAway + "</td></tr>");       
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});