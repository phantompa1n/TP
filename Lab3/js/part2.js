var screen = $('.screen');
$(function() {
    $("form").submit(function(event) {
        event.preventDefault();
        var newElement = getRandomSquare();
        screen.append(newElement);
    });
});

function getRandomSquare() {
    var screenHeight = screen.height();
    var screenWidth = screen.width();
    var randomColor = getRandomColor();
    var randomWidth = getRandomArbitrary(20, 100);
    var randomHeight = getRandomArbitrary(20, 100);
    var newElement = $("<div class='new' style='position:absolute;'></div>").css("background-color", randomColor).css("width", randomWidth + "px").css("height", randomHeight + "px").css("top", getRandomArbitrary(randomHeight, screenHeight - randomHeight) + "px").css("left", getRandomArbitrary(randomWidth, screenWidth - randomWidth) + "px");
    return newElement;
};
$(document).on("click", ".screen > div.new", function() {
    $('.clicked').removeClass('clicked');
    $('.draggable').removeClass('draggable')
    $(this).addClass('clicked');
    $(this).addClass('draggable');
    $(function() {
        var thisElement = $('.draggable');
        thisElement.draggable({
            containment: 'parent'
        });
    });
});
$(document).keydown(function(e) {
    var thisElement = $('.clicked');
    var elWidth = thisElement.width();
    var elHeight = thisElement.height();
    var posLeft = thisElement.position().left;
    var posTop = thisElement.position().top;
    var screenHeight = screen.height();
    var screenWidth = screen.width();
   
    if (!((posTop + elHeight + 5) > screenHeight)) {
        if (e.keyCode == 40) {
            thisElement.css("top", posTop = posTop + 15);
        }
    }
    if (!((posLeft - elWidth / 2 ) < 0)) {
        if (e.keyCode == 37) {
            thisElement.css("left", posLeft = posLeft - 15);
        }
    }
    if (!((posTop - 15) < 0)) {
        if (e.keyCode == 38) {
            thisElement.css("top", posTop = posTop - 15);
        }
    }
    if (!((posLeft + elWidth) > screenWidth)) {
        if (e.keyCode == 39) {
            thisElement.css("left", posLeft = posLeft + 15);
        }
    }
    
});

function getRandomArbitrary(min, max) {
    var randomValue = Math.random() * (max - min) + min;
    return randomValue;
}

function getRandomColor() {
    var max = 0xffffff;
    var randomValue = Math.round(Math.random() * max);
    var randomColor = '#' + randomValue.toString(16);
    return randomColor;
}