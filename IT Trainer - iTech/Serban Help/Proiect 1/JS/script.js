var $p = $('p')
$cover = $('.cover'),
    width = $p.width(),
    decrement = width / $p.text().length;

function addChar() {
    $cover.css('width', '-=' + decrement);

    if (parseInt($cover.css('width')) < width) {
        setTimeout(addChar, 150);
    }
}

addChar();