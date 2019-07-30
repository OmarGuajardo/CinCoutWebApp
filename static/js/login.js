

//Loggin In Variables
submitBtn = $('#login-submit')[0];
loginText = $('#username')[0];
passwordText = $('#password')[0];
logOut = $("#LogOut")[0];

//Singing Up
signUpBtn = $('#register-submit')[0];
firstName = $('#firstName')[0];
lastName = $('#lastName')[0];
emailSignUp = $("#emailSignUp")[0];
passwordSignUp = $("#passwordSignUp")[0];
passwordSignUp2 = $("#confirm-password")[0];

//Global UID
userUID = ""

$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

// <===============FIRE BASE STUFF=====================>
var firebaseConfig = {
    apiKey: "AIzaSyAIamGmniOEtPAyOee22C_Ey0ApVGU3Kes",
    authDomain: "cincout-82180.firebaseapp.com",
    databaseURL: "https://cincout-82180.firebaseio.com",
    projectId: "cincout-82180",
    storageBucket: "cincout-82180.appspot.com",
    messagingSenderId: "451678536324",
    appId: "1:451678536324:web:c8af77d4d7bd468b"
};
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();

// <===================================================>


// <===============LOGGIN IN=====================>

$(submitBtn).on('click',function(){
    const login = loginText.value;
    const password = passwordText.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(login,password);
    promise.catch(e => console.log(e.message));
    clear('login');
    // window.location = ("manage");
});

$(logOut).on('click',function(){
    firebase.auth().signOut();  
    // window.location = ("manage");
});
// <===================================================>

// <===============SINGING UP USER=====================>

$(signUpBtn).on('click',function(){
    const login = emailSignUp.value;
    const password = passwordSignUp.value;
    const auth = firebase.auth();

    //signing user
    const promise = auth.createUserWithEmailAndPassword(login,password);
    promise.catch(e => {
        console.log(e.message)
    });  
    clear("signup");
});

function regisetering(user) {
    var mainInfo = firestore.doc(user+"/MainInfo");
    mainInfo.set({
        'FirstName':firstName.value,
        'LastName': lastName.value,
        'Email': emailSignUp.value,
        'Date Registerd': new Date()
    });
    console.log(user)
    
}

// <===================================================>

// <===============STATUS CHECK=====================>
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log("Fire base user", firebaseUser.email);
        var uid = firebaseUser.uid
        userUID = firebaseUser.uid
        existingUser(uid);
        }
    else{
        console.log('not logged in')
    }
});

function existingUser(uid){

        var docRef = firestore.collection(uid).doc("MainInfo");

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("User already registered") 
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                console.log("New User. Registering now!")
                regisetering(uid)

            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

}

// <===================================================>


// <===============MISCELLANOUS=====================>

function clear(state) {
    if(state == 'login'){
        console.log('working')
        loginText.value = "";
        passwordText.value = "";
    }
    else{
        firstName.value = "";
        lastName.value = "";
        emailSignUp.value = "";
        passwordSignUp = "";
    }
}
