employeeListItems = $(".employeeListItem");
employeeListSetting = $('.employee-list-setting');
employeeListSettingUl = $('.employee-list-setting-ul');
qr_code_container = $('.qr-code-container');

"https://api.qrserver.com/v1/create-qr-code/?data=OmarGuajardo&amp;size=250x250";

qrCodeImage = $('#qrcodeimage');

testArray = [];


for (let i = 0; i < employeeListItems.length; i++) {
    
    indicators = employeeListSettingUl[i].children;
    nameText = employeeListItems[i].firstElementChild.textContent;
    // console.log(nameText);
    testArray.push(nameText);
    $(indicators[2]).on('click',function(){
        reference(testArray[i])
    });
        

}
function reference(name){
    console.log("this element belongs to " + name);
    updateCode(name);
}

function updateCode(name){
    qrCodeImage[0].src = "https://api.qrserver.com/v1/create-qr-code/?data="+name+"&amp;size=250x250";
    console.log(qrCodeImage[0]);
    // qrCodeImage[0].src = "https://api.qrserver.com/v1/create-qr-code/?data=-LkPd7EJJ5ACShkrA14T&amp;size=250x250";
}