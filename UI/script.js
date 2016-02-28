var MAX_LENGTH = 13;

$(document).ready(function () {
    $("#One").click(function (event) {
        console.log('one');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "1");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Two").click(function (event) {
        console.log('two');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "2");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Three").click(function (event) {
        console.log('three');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "3");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Four").click(function (event) {
        console.log('four');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "4");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Five").click(function (event) {
        console.log('five');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "5");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Six").click(function (event) {
        console.log('six');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "6");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Seven").click(function (event) {
        console.log('seven');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "7");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Eight").click(function (event) {
        console.log('eight');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "8");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Nine").click(function (event) {
        console.log('nine');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "9");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Zero").click(function (event) {
        console.log('zero');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "0");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Star").click(function (event) {
        console.log('star');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "*");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Pound").click(function (event) {
        console.log('pound');
        if($("#phoneNum").val().length < MAX_LENGTH)
            $("#phoneNum").val($("#phoneNum").val() + "#");
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Backspace").click(function (event) {
        console.log('backspace');
        if($("#phoneNum").val().length > 0)
            $("#phoneNum").val($("#phoneNum").val().substr(0, $("#phoneNum").val().length - 1));
        formatPhoneNumber($("#phoneNum"));
    });
    $("#Call").click(function (event) {
        console.log('call');
    });
    
    $("#phoneNum").bind('focusout', function(e) {
        e.preventDefault();
        $(this).focus();
    });
    $("#phoneNum").keyup(function(e) {
        formatPhoneNumber($("#phoneNum")); 
    });
    $('#phoneNum').keypress(function(e) {
        return isNumberKey(event)
    });
    $("#phoneNum").focus();
});

function formatPhoneNumber(num) {
    var str = num.val().replace("-", "").replace("(", "").replace(")", "");
    if(str.length == 4) {
        str = str.replace(/(\d{3})(\d{1})/, '$1-$2');
    } else if(str.length == 5) {
        str = str.replace(/(\d{3})(\d{2})/, '$1-$2');
    } else if(str.length == 6) {
        str = str.replace(/(\d{3})(\d{3})/, '$1-$2');
    } else if(str.length == 7) {
        str = str.replace(/(\d{3})(\d{4})/, '$1-$2');
    } else if(str.length == 8) {
        str = str.replace(/(\d{3})(\d{3})(\d{2})/, '($1)$2-$3');
    } else if (str.length == 9) {
        str = str.replace(/(\d{3})(\d{3})(\d{3})/, '($1)$2-$3');
    } else if (str.length == 10) {
        str = str.replace(/(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
    }
    num.val(str);
    return;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    // accept: *#0-9
    if (charCode !== 35 && charCode !== 42 && charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}