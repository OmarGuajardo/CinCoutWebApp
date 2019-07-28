// TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#config-web-app
submitBtn = $('#submit')[0];
signUpBtn = $('#signUp')[0];
loginText = $('#login')[0];
passwordText = $('#password')[0];
logOut = $("#logOut")[0];

var firebaseConfig = {
    apiKey: "AIzaSyAIamGmniOEtPAyOee22C_Ey0ApVGU3Kes",
    authDomain: "cincout-82180.firebaseapp.com",
    databaseURL: "https://cincout-82180.firebaseio.com",
    projectId: "cincout-82180",
    storageBucket: "cincout-82180.appspot.com",
    messagingSenderId: "451678536324",
    appId: "1:451678536324:web:c8af77d4d7bd468b"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();

$(submitBtn).on('click',function(){
    const login = loginText.value;
    const password = passwordText.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(login,password);
    promise.catch(e => console.log(e.message));
});

//SIGN UP USER
$(signUpBtn).on('click',function(){
    const login = loginText.value;
    const password = passwordText.value;
    const auth = firebase.auth();

    //singing user
    const promise = auth.createUserWithEmailAndPassword(login,password);
    promise.catch(e => console.log(e.message));
    // registering();
});

//CHECKING TO SEE IF THERE IS AN USER
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
        var uid = firebaseUser.uid
        regisetering(uid);
        // TO DO: CHECKING TO SEE IF USER IS ALREADY REGISTERED
    }
    else{
        console.log('not logged in')
    }
});

$(logOut).on('click',function(){
    firebase.auth().signOut();  
});

function regisetering(user) {
    var docRef = firestore.doc(user+"/MainInfo");
    docRef.set({
        'Name':'Omar Guajardo',
        "ID": "asdf"
    });
    console.log(user)
}