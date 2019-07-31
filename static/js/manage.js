
employeeListItemUL = $(".employeeListItemUL")[0];
employeeListItem = $(".employeeListItem");
employeeListSetting = $('.employee-list-setting');
employeeListSettingUl = $('.employee-list-setting-ul');
qr_code_container = $('.qr-code-container');
card_header_qrcode = $('.card-header.qrcode');

//Time statistics items
datestamp_ul= $(".datestamp-ul")[0];
datestamp_li = $(".datestamp-li");
timestamp_ul = $(".timestamp-ul");
timestamp_li = $(".timestamp-li");

qrCodeImage = $('#qrcodeimage');

//ADDING NEW EMPLOYEE ITEMS
FirstName = $('.add-employee-question')[0].firstElementChild;
LastName = $('.add-employee-question')[1].firstElementChild;
Email = $('.add-employee-question')[2].firstElementChild;
StudentID = $('.add-employee-question')[3].firstElementChild;
Position = $('.add-employee-question')[4].firstElementChild;
AddEmployeeBtn = $('#add-employee-btn')[0];

//FIREBASE VARIABLES
var userUID2 = "";

var firestore = firebase.firestore();

var datestamp_template = "<li class = 'datestamp-li'> <button class='collapsible'>February 15, 2019</button><div class='content'><ul class='timestamp-ul'><li class='timestamp-li'>Clock In : 12:00 PM</li><li class='timestamp-li'>Clock Out : 5:00 PM</li></ul></div></li>"
var employeeListArray = ['Omar Guajardo','Luis Acosta','Omar Garza','Anahi Cantu','Denielle Islas','Jennifer Guajardo']
var employeeListArray2 = [];
testArray = [];

// <===============POPULATING THE EMPLOYEE LIST=====================>
function populateList(){
  console.log(employeeListArray2.length);
  for (let i = 0; i < employeeListArray2.length; i++) {
    var beforeText = "<li class='employeeListItem'> <div class='name'>"
    var afterText = "</div><div class='settings'><div class='btn-group dropleft'><button type='button' class='btn btn-secondary dropdown-toggle' data-toggle= 'dropdown' aria-haspopup='true' aria-expanded='false'><i class='material-icons'>more_vert</i></button><div class='dropdown-menu'><ul class='employee-list-setting-ul'><li class='employee-list-setting'>Edit</li><li class='employee-list-setting'>Stats</li><li class='employee-list-setting'>ID</li><li id='delete' class='employee-list-setting'>Delete</li></ul></div></div></div></li>"
    $(employeeListItemUL).append(beforeText+employeeListArray2[i]['FirstName']+afterText);
  }
  for (let i = 0; i < employeeListItemUL.children.length; i++) {
    var listName = employeeListItemUL.children[i].children[0].textContent;
    var idBtn = employeeListItemUL.children[i].children[1].children[0].children[1].children[0].children[2];
    $(idBtn).on('click',function(){
      qrCode(employeeListArray2[i]['FirstName'],employeeListArray2[i]['QRCode'])
  });
  }
}

function qrCode(name,code){
    console.log("this element belongs to " + name);
    qrCodeImage[0].src = "https://api.qrserver.com/v1/create-qr-code/?data="+code+"&amp;size=250x250";
    console.log(qrCodeImage[0]);
    card_header_qrcode[0].textContent = name + "'s ID"
    
}

function fetchingEmployees(userUID){

  firestore.collection(userUID).doc('MainInfo').collection('EmployeeList')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var userData = doc.data();
            var employeeMapTemp = {
              'QRCode' : doc.id,
              'FirstName' : userData['FirstName'],
              'LastName' : userData['LastName'],
              'Email' : userData['Email'],
              'ID' : userData['ID'],
              'Position' : userData['Position'],
              
            }
            employeeListArray2.push(employeeMapTemp);
        });
        populateList();

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}



// <===================================================>


// <===============EXPANDABLE LIST=====================>
function update(){
var coll = document.getElementsByClassName('collapsible');
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
}
// <===================================================>

// <===============ADDING EMPLOYEES=====================>
$(AddEmployeeBtn).on('click',function(){
  console.log("We are adding to this user", userUID);
  var employeeIDTemp = firestore.collection(userUID).doc('MainInfo').collection('EmployeeList').doc().id;
  var newEmployeePath = firestore.collection(userUID).doc('MainInfo').collection('EmployeeList').doc(employeeIDTemp);
  newEmployeePath.set({
    'FirstName': FirstName.value,
    'LastName': LastName.value,
    'Email': Email.value,
    'ID': StudentID.value,
    'Position': Position.value
  })
  // console.log(employeeIDTemp);
  // fetchingEmployees(userUID);
  expandEmployeeList(employeeIDTemp)
});

function expandEmployeeList(employeeID){
  var employeeMapTemp = {
    'QRCode' : employeeID,
    'FirstName': FirstName.value,
    'LastName': LastName.value,
    'Email': Email.value,
    'ID': StudentID.value,
    'Position': Position.value
  }
  employeeListArray2.push(employeeMapTemp);

}
// <===================================================>

$(datestamp_ul).append(datestamp_template);
// firestore.collection('test').doc().set({
//   'test':'test'
// })
update();


firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
      var uid = firebaseUser.uid
      userUID2 = uid;
      console.log(uid);
      fetchingEmployees(uid);
      trial();
      }
  else{
      console.log('not logged in')
  }
});

function trial(){
firestore.collection(userUID).doc('MainInfo').collection('EmployeeList')
    .onSnapshot(function(querySnapshot) {
        var cities = [];
        querySnapshot.forEach(function(doc) {
            cities.push(doc.data().name);
            console.log(doc.data())
        });
        console.log("Current cities in CA: ", cities.join(", "));
    });
  }