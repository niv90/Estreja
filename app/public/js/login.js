//define gmail profile variable
var ImageUrl;
var email;
var userName;

function onSignIn(googleUser) {
    console.log('inside google sign');
   
    var profile = googleUser.getBasicProfile();
    userName = profile.getName();
    email = profile.getEmail();
    //insert to hidden input the value of imageURL js variable 
    document.getElementById('myField').value = profile.getImageUrl();
    //check if the user exits in the system
    $.getJSON("https://estreja.herokuapp.com/ws_horoscope/getUser/"+email, function(data){
        //json contain the uuid of the user
        if(data.length == 0){
          console.log("user not exist");
          $("#registerContainer").css("display", "block");
        }
        else{
          console.log("user exist");
          window.location.assign("https://estreja.herokuapp.com/timeLine.html?uuid="+data[0]._id);
          console.log(data[0]._id);
        }
    });
} 

 function signOut() {
      console.log('inside google sign out');
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
}

