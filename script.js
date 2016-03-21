var MAX_LENGTH = 13;

$(document).ready(function () {
    $("#One").click(function (event) {
        console.log('one');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "1");
        formatphone_numberber($("#phone_number"));
    });
    $("#Two").click(function (event) {
        console.log('two');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "2");
        formatphone_numberber($("#phone_number"));
    });
    $("#Three").click(function (event) {
        console.log('three');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "3");
        formatphone_numberber($("#phone_number"));
    });
    $("#Four").click(function (event) {
        console.log('four');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "4");
        formatphone_numberber($("#phone_number"));
    });
    $("#Five").click(function (event) {
        console.log('five');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "5");
        formatphone_numberber($("#phone_number"));
    });
    $("#Six").click(function (event) {
        console.log('six');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "6");
        formatphone_numberber($("#phone_number"));
    });
    $("#Seven").click(function (event) {
        console.log('seven');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "7");
        formatphone_numberber($("#phone_number"));
    });
    $("#Eight").click(function (event) {
        console.log('eight');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "8");
        formatphone_numberber($("#phone_number"));
    });
    $("#Nine").click(function (event) {
        console.log('nine');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "9");
        formatphone_numberber($("#phone_number"));
    });
    $("#Zero").click(function (event) {
        console.log('zero');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "0");
        formatphone_numberber($("#phone_number"));
    });
    $("#Star").click(function (event) {
        console.log('star');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "*");
        formatphone_numberber($("#phone_number"));
    });
    $("#Pound").click(function (event) {
        console.log('pound');
        if($("#phone_number").val().length < MAX_LENGTH)
            $("#phone_number").val($("#phone_number").val() + "#");
        formatphone_numberber($("#phone_number"));
    });
    $("#Backspace").click(function (event) {
        console.log('backspace');
        if($("#phone_number").val().length > 0)
            $("#phone_number").val($("#phone_number").val().substr(0, $("#phone_number").val().length - 1));
        formatphone_numberber($("#phone_number"));
    });
    $("#Call").click(function (event) {
        console.log('call');
    });
    
    $("#phone_number").bind('focusout', function(e) {
        e.preventDefault();
        $(this).focus();
    });
    $("#phone_number").keyup(function(e) {
        formatphone_numberber($("#phone_number")); 
    });
    $('#phone_number').keypress(function(e) {
        return isNumberKey(event)
    });
    $("#phone_number").focus();
});

function formatphone_numberber(num) {
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