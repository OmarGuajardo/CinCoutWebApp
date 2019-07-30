
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

var firestore = firebase.firestore();



var datestamp_template = "<li class = 'datestamp-li'> <button class='collapsible'>February 15, 2019</button><div class='content'><ul class='timestamp-ul'><li class='timestamp-li'>Clock In : 12:00 PM</li><li class='timestamp-li'>Clock Out : 5:00 PM</li></ul></div></li>"
var employeeListArray = ["Omar Guajardo","Jennifer Guajardo","Anahi Cantu"]

testArray = [];
function populateList(){
  for (let i = 0; i < employeeListArray.length; i++) {
    var beforeText = "<li class='employeeListItem'> <div class='name'>"
    var afterText = "</div><div class='settings'><div class='btn-group dropleft'><button type='button' class='btn btn-secondary dropdown-toggle' data-toggle= 'dropdown' aria-haspopup='true' aria-expanded='false'><i class='material-icons'>more_vert</i></button><div class='dropdown-menu'><ul class='employee-list-setting-ul'><li class='employee-list-setting'>Edit</li><li class='employee-list-setting'>Stats</li><li class='employee-list-setting'>ID</li><li id='delete' class='employee-list-setting'>Delete</li></ul></div></div></div></li>"
    $(employeeListItemUL).append(beforeText+employeeListArray[i]+afterText);
    // employeeListArray.push(employeeItemTemp);
  }
  for (let i = 0; i < employeeListItemUL.children.length; i++) {
    // const element = employeeListItemUL[i];
    var listName = employeeListItemUL.children[i].children[0].textContent;
    var idBtn = employeeListItemUL.children[i].children[1].children[0].children[1].children[0].children[2];
    $(idBtn).on('click',function(){
      updateCode(employeeListArray[i])
  });
  }
}

function updateCode(name){
    console.log("this element belongs to " + name);
    qrCodeImage[0].src = "https://api.qrserver.com/v1/create-qr-code/?data="+name+"&amp;size=250x250";
    console.log(qrCodeImage[0]);
    card_header_qrcode[0].textContent = name + "'s ID"
    
}

// EXPANDABLE LIST
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
$(datestamp_ul).append(datestamp_template);

update();
populateList();

