var firstTime = true;

employeeListItemUL = $(".employeeListItemUL")[0];
employeeListItem = $(".employeeListItem");
employeeListSetting = $('.employee-list-setting');
employeeListSettingUl = $('.employee-list-setting-ul');
qr_code_container = $('.qr-code-container');
card_header_qrcode = $('.card-header.qrcode');
activeEmployeeListUL = $('#activeEmployeeListUL');
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
var activeEmployeeArray = [];
// var i;
var MAINTEST;

// <===============POPULATING THE EMPLOYEE LIST=====================>
function populateList(){
  for (let i = 0; i < employeeListArray2.length; i++) {
    var beforeText = "<li class='employeeListItem'> <div class='name'>"
    var afterText = "</div><div class='settings'><div class='btn-group dropleft'><button type='button' class='btn btn-secondary dropdown-toggle' data-toggle= 'dropdown' aria-haspopup='true' aria-expanded='false'><i class='material-icons'>more_vert</i></button><div class='dropdown-menu'><ul class='employee-list-setting-ul'><li class='employee-list-setting'  data-toggle='modal' data-target='#exampleModalCenter'>Edit</li><li class='employee-list-setting'>Stats</li><li id='delete' class='employee-list-setting'>Delete</li></ul></div></div></div></li>"
    $(employeeListItemUL).append(beforeText+employeeListArray2[i]['FirstName']+" "+employeeListArray2[i]['LastName']+afterText);
  }
  for (let i = 0; i < employeeListItemUL.children.length; i++) {
    var listName = employeeListItemUL.children[i].children[0].textContent;
    var statsBtn = employeeListItemUL.children[i].children[1].children[0].children[1].children[0].children[1];
    var deleteBtn = employeeListItemUL.children[i].children[1].children[0].children[1].children[0].children[2];
    $(statsBtn).on('click',function(){
      qrCode(employeeListArray2[i]['FirstName'],employeeListArray2[i]['QRCode'])
      employeeTimes(employeeListArray2[i]['QRCode']);

  });
  $(deleteBtn).on('click',function(){
    firestore.collection(userUID).doc('MainInfo').collection('EmployeeList').doc(employeeListArray2[i]["QRCode"]).delete().then(function() {
      console.log("Document successfully deleted!");
      updateEmployeeList();
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

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
            var userData = doc.data()['UserInfo'];
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

// <===============EMPLOYEE TIMES=====================>

function employeeTimes(employeeID){


  firestore.collection(userUID).doc('MainInfo').collection('EmployeeList').doc(employeeID).collection('Logs')
  .onSnapshot(function(querySnapshot) {
    $(datestamp_ul).empty();

    firestore.collection(userUID).doc('MainInfo').collection('EmployeeList').doc(employeeID).collection('Logs')
    .get()
    .then(function(querySnapshot) {
      logsArray = []
      logsDataArray = []
      testArray = []
        querySnapshot.forEach(function(doc) {
            logsArray.push(doc.id);
            logsDataArray.push(doc.data());
        });
        test(logsArray,logsDataArray);
    })
    .catch(function(error) {
        console.log("Error getting timestamps: ", error);
    });
    

  });
}

function test(logsArray, logsDataArray){
  mainDate = []
  times = []
  clockInDateTime = [];
  for (let i = 1; i < logsDataArray.length; i++) {
    date = logsArray[i]
    timeData = logsDataArray[i]
    mainDate.push(date);
    times.push(timeData['Times'])
    
  }
  for (let i = 0; i < mainDate.length; i++) {
    var temp = [mainDate[i],times[i]]
    clockInDateTime.push(temp);
    console.log(times[i]);
    displayRecords(mainDate[i],times[i]);
  }
  console.log('Clocking Date and Time',clockInDateTime);
  
}

function displayRecords(date,times){
  update();
  var datestamp_template_after = "</button><div class='content'><ul class='timestamp-ul'>"
  // <li class='timestamp-li'>Clock Out : 5:00 PM</li></ul></div></li>"
  for (let i = 0; i < times.length; i++) {
    var clockedMap = {
      'cout' : 'Cloked Out: ',
      'cin' : 'Clocked In: '
    }
    var clockedInOut = Object.keys(times[i])
    var generalDate = new Date(times[i][clockedInOut].seconds*1000)
    var generalDateHour = generalDate.getHours()
    var clockedTimeStamp;
    if(generalDateHour > 12){
      clockedTimeStamp = String((generalDateHour-12)+":"+(generalDate.getMinutes()<10?'0':'') + generalDate.getMinutes()+ " "+"PM")
    }
    else{
      clockedTimeStamp = String((generalDateHour)+":"+(generalDate.getMinutes()<10?'0':'') + generalDate.getMinutes()+ " "+"AM")
    }
    // MAINTEST = times[i][clockedInOut]
    if(i != times.length-1){
      datestamp_template_after = datestamp_template_after + "<li class='timestamp-li'>"+clockedMap[clockedInOut]+" "+clockedTimeStamp+"</li>" 
    }
    else{
        datestamp_template_after = datestamp_template_after + "<li class='timestamp-li'>"+clockedMap[clockedInOut]+" "+clockedTimeStamp+"</li></ul></div></li>"
    }
  }
  var datestamp_template_before = "<li class = 'datestamp-li'> <button class='collapsible'>"
  $(datestamp_ul).append(datestamp_template_before + date + datestamp_template_after);
  update();
}
// <===================================================>

// <===============UPATDING EMPLOYEE LIST=====================>

function updateEmployeeList(){
  $(employeeListItemUL).empty();
  employeeListArray2 = [];
  fetchingEmployees(userUID);
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

// <===============ACTIVE EMPLOYEE LIST=====================>
function updateActiveEmployeeList(){
  
  
  firestore.collection(userUID2).doc('MainInfo').collection('EmployeeList')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var name = doc.data()['UserInfo']['FirstName']+" "+doc.data()['UserInfo']['LastName']

           
            firestore.collection(userUID2+"/MainInfo/EmployeeList/" + doc.id+"/Logs")
            .onSnapshot(function (querySnapshot){
              

              firestore.collection(userUID2+"/MainInfo/EmployeeList/" + doc.id+"/Logs")
              .get()
             .then(function(querySnapshot) {
                   var i = 0
                   querySnapshot.forEach(function(doc) {
                     if(i == querySnapshot.size-1){
                       var lastTimeClockedArray = doc.data()['Times']
                       var lastTimeClocked = lastTimeClockedArray[lastTimeClockedArray.length-1]
                       if(Object.keys(lastTimeClocked) == "cin"){
                         console.log(name +" is clocked in")
                         activeEmployeeArray.push(name)
                         appendingEmployeeList()
                       }
                       else{
                        removeName(name);
                        appendingEmployeeList()
                       }
                       
                     }
                     
                    i = i + 1;
   
               });
               })
             
            })

      
  
   
            
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    



}

function emptyActiveEmployeeList(){
  $(activeEmployeeListUL).empty()
}

function appendingEmployeeList(){
  emptyActiveEmployeeList();
  var beforeText = "<li class='employeeListItem'> <div class='name'>"
  var afterText = "</div><div class='settings'><div class='btn-group dropleft'><button type='button' class='btn btn-secondary dropdown-toggle' data-toggle= 'dropdown' aria-haspopup='true' aria-expanded='false'><i class='material-icons'>more_vert</i></button><div class='dropdown-menu'><ul class='employee-list-setting-ul'><li class='employee-list-setting'  data-toggle='modal' data-target='#exampleModalCenter'>Edit</li><li class='employee-list-setting'>Stats</li><li id='delete' class='employee-list-setting'>Delete</li></ul></div></div></div></li>"
  for (let i = 0; i < activeEmployeeArray.length; i++) {    
    $(activeEmployeeListUL).append(beforeText+activeEmployeeArray[i]+afterText)
  }

}

function removeName(name){

  for (let i = 0; i < activeEmployeeArray.length; i++) {

    if(activeEmployeeArray[i] == name){
      activeEmployeeArray.splice(i,1)
    }
    
  }
}


// <===================================================>
// <===============ADDING EMPLOYEES=====================>

$(AddEmployeeBtn).on('click',function(){
  console.log("We are adding to this user", userUID);
  var employeeIDTemp = firestore.collection(userUID).doc('MainInfo').collection('EmployeeList').doc().id;
  var newEmployeePath = firestore.collection(userUID).doc('MainInfo').collection('EmployeeList').doc(employeeIDTemp);
  newEmployeePath.set({
    'UserInfo':{
    'FirstName': FirstName.value,
    'LastName': LastName.value,
    'Email': Email.value,
    'ID': StudentID.value,
    'Position': Position.value
    }
  })
  firestore.collection(userUID).doc('MainInfo').collection('EmployeeList').doc(employeeIDTemp).collection('Logs').doc('AAA').set({
    'Setup' : true
  }).then(function(){
    console.log('did it')
  });

  // updateEmployeeList();
  FirstName.value = "";
  LastName.value = "";
  Email.value = "";
  StudentID.value = "";
  Position.value = "";
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

update();


firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
      var uid = firebaseUser.uid
      userUID2 = uid;
      console.log(uid);
      qrCode("Boss",uid)
      emloyeeListener(uid);
      updateActiveEmployeeList();
      }
  else{
      console.log('not logged in')
  }
});

function emloyeeListener(uid){
firestore.collection(userUID).doc('MainInfo').collection('EmployeeList')
    .onSnapshot(function(querySnapshot) {
        
        updateEmployeeList();
    });

  }



  
