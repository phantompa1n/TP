$(document).on("click", "input[name='radioBtn']", function() {
    thisRadio = $(this);
    if (thisRadio.hasClass("imChecked")) {
        thisRadio.removeClass("imChecked");
        thisRadio.prop('checked', false);
    } else {
        thisRadio.prop('checked', true);
        thisRadio.addClass("imChecked");
    };
})
$(function() {
    $("form").submit(function(event) {
        event.preventDefault();
        var textValue = event.currentTarget[2].value;
        var colorValue = event.currentTarget[3].value;
        var screen = $('.screen');
        var newElement = $("<p id='new'>" + textValue + "</p>").css("background-color", colorValue);
        var radioValue = $('input:radio:checked').val();
        if (!isEmpty(textValue)) {
            if (radioValue == 1) {
                screen.append(newElement);
            } else {
                screen.prepend(newElement);
            }
        }
    });
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}
$(document).on("click", ".screen > p#new", function() {
    $(this).remove();
});

$(document).on("click", ".stat", function() {
    var countElement = 0;
    var str = " ";
    $('.screen > #new').each(function(i) {
        countElement++;
        str += $(this).text() + ".";
    })
    str = str.replace(/^/, "Total items = " + countElement + " ");
    alert(str);
});