$(function() {

    loadMain('home');
    rippleEffect();
    // let func = {
    //     home: function() {},
    //     about: function() {},
    //     page1: function() {}
    // };

    $('a').click(function() {
        loadMain($(this).attr("id"));
    });
});

function loadMain(name) {
    $('#bodyMain').load('html/' + name + '.html', function() {
        // $(this).hide().fadeIn(800);
        $(this).children('.card').animate({
            'margin-top': '1rem',
            'opacity' : 1
            },500);
    });
}