
  // Initialize Firebase
        var config = {
            apiKey: "AIzaSyB96-Nt6UvoFwW2oEGjy5uu0HwYastoap4",
            authDomain: "q-click-me-fcd33.firebaseapp.com",
            databaseURL: "https://q-click-me-fcd33.firebaseio.com",
            projectId: "q-click-me-fcd33",
            storageBucket: "q-click-me-fcd33.appspot.com",
            messagingSenderId: "500249296523"
        };
        
        firebase.initializeApp(config);
        var database = firebase.database();

        // var gettrain= "";
        // var getdestination= "";
        // var getfrequency= "";
        // var getnextarrival= [];
        // var getminutesaway= [];

        $("#submitinformation").on("click",function (event){
            event.preventDefault();
            console.log("#submitinformation");
        
        trains = $("#addtrain").val().trim();
        destination = $("#adddestination").val().trim();
        time = $("#addtime").val().trim();
        frequency = $("#addfrequency").val().trim();

        database.ref().push({
            trains: trains,
            destination: destination,
            time: time,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        // firebase information recollection event
        // database.ref().limitToLast(1).on("child_added", function(snapshot){
        //     console.log(snapshot.val());
            
        //     $("#information").text(snapshot.val().trains + " | " + snapshot.val().destination + " | " + snapshot.val().frequency + " | " + snapshot.val().time);
            
        // }, function (errosObject){
        //     console.log("The read faild" + errosObject.code);
        // });
        database.ref().on("child_added", function(childSnapshot){
            console.log(childSnapshot.val());

            var ttrains = childSnapshot.val().trains;
            var tdestination = childSnapshot.val().destination;
            var ttime = childSnapshot.val().time;
            var tfrequency = childSnapshot.val().frequency;

            console.log(ttrains);
            console.log(tdestination);
            console.log(ttime);
            console.log(tfrequency);

            var backTime = moment(ttime, 'hh:mm').subtract(1, 'years');

            var starttime = moment(backTime).format("HH:mm");
            console.log(starttime);

            var firstTime = moment(starttime, 'hh:mm').subtract(1, 'years');

            var tarrival = moment(childSnapshot).diff(moment(), "minutes");
            console.log(tarrival);
            console.log(moment);

            var remainder = tarrival % tfrequency;


            var tminutes = tfrequency - remainder;
            console.log(tminutes);
            
            $("#information").append(ttrains + tdestination + starttime + " the next train is  " + tminutes + ' minutes away ');
        })})