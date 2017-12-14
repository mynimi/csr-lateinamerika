$(document).ready(function() {
    if ($('.mixer').length) {
        var mixer = mixitup('.mixer');
    }

    $('.overlay').addClass('overlay-hidden');
    $('.sidestory-toggle').click(function() {
        var overlay = $(this).parent().next('.overlay');

        overlay.toggleClass('overlay-hidden');
        overlay.toggleClass('active');
        $(this).children('span').toggleClass('active');
        $(this).parent().toggleClass('active');
        $('body').toggleClass('overlay-active');
        checkIfInView(overlay);
        $('body').append('<div class="close-overlay"></div>');

        // overlay.isOnScreen();
    });

    $('.overlay').click(function(e) {
        e.stopPropagation();
    });

    $(document).on('click', '.close-overlay', function(event) {
        $('.overlay').addClass('overlay-hidden');
        $('body').removeClass('overlay-active');
        $('.sidestory-toggle span').removeClass('active');
        $('.sidestory').removeClass('active');
        $('.overlay').removeClass('active');
        $('.close-overlay').remove();
    });

    $(window).scroll(function(event) {
        var header = $('header').outerHeight();

        if ($(window).scrollTop() > header) {
            $('#btt').fadeIn();
        } else {
            $('#btt').fadeOut();
        }
    });

    $('#btt').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    });

    $('.nav-toggle').click(function() {
        $('.menu').toggleClass('active');
        $('.nav-toggle').toggleClass('active');
    });

    $('.slider').each(function() {
        $(this).children('div').first().addClass('active');
    });
    $('.toggle-next').click(function() {
        var current = $(this).siblings('div').children('.active');
        current.removeClass('active');
        if (current.next().length) {
            current.next().addClass('active');
        } else {
            $(this).siblings('div').children().first().addClass('active');
        }
    });
    $('.toggle-prev').click(function() {
        var current = $(this).siblings('div').children('.active');
        current.removeClass('active');
        if (current.prev().length) {
            current.prev().addClass('active');
        } else {
            $(this).siblings('div').children().last().addClass('active');
        }
    });

    $('.togglable div').each(function(){
        if(!$(this).data('toggler')){
            $(this).hide();
        }
    });
    $('.togglable:first-of-type div[data-toggler="true"]').siblings().show();

    $('div[data-toggler="true"]').click(function(){
        if(!$(this).siblings().is(':visible')){
            $('div[data-toggler="true"]').siblings().slideUp();
            $(this).siblings().slideDown();
        }
    });
});

function checkIfInView(element) {
    var elTop = element.offset().top;
    var elBottom = element.offset().top + element.outerHeight();
    var vpBottom = $(window).scrollTop() + $(window).height();
    var vpTop = $(window).scrollTop();

    if ((vpBottom >= elTop) && (vpTop <= elBottom)) {
        $('html,body').animate({
            scrollTop: elTop - element.outerHeight() / 2
        }, 300);
    }
}