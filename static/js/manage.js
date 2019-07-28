employeeListItems = $(".employeeListItem");
employeeListSetting = $('.employee-list-setting');
employeeListSettingUl = $('.employee-list-setting-ul');
qr_code_container = $('.qr-code-container');
card_header_qrcode = $('.card-header.qrcode');

"https://api.qrserver.com/v1/create-qr-code/?data=OmarGuajardo&amp;size=250x250";

qrCodeImage = $('#qrcodeimage');

testArray = [];


for (let i = 0; i < employeeListItems.length; i++) {
    
    indicators = employeeListSettingUl[i].children;
    nameText = employeeListItems[i].firstElementChild.textContent;
    // console.log(nameText);
    testArray.push(nameText);
    $(indicators[2]).on('click',function(){
        updateCode(testArray[i])
    });
        

}

function updateCode(name){
    console.log("this element belongs to " + name);
    qrCodeImage[0].src = "https://api.qrserver.com/v1/create-qr-code/?data="+name+"&amp;size=250x250";
    console.log(qrCodeImage[0]);
    card_header_qrcode[0].textContent = name + "'s ID"
    
}

// EXPANDABLE LIST
var coll = document.getElementsByClassName("collapsible");
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