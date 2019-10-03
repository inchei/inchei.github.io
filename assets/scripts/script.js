$(function() {
    //Set buttons
    /*$('#more').click(() => {
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        $('#spb').text(':)');
    });*/

    //Set the background
    var random = Math.floor(Math.random() * 13);

    function checkWebp() {
        try {
            return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
        } catch (err) {
            return false;
        }
    }

    function setbg(type) {
        switch (random) {
            case 0:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg01.' + type);
                break;
            case 1:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg02.' + type);
                break;
            case 2:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg03.' + type);
                break;
            case 3:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg04.' + type);
                break;
            case 4:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg05.' + type);
                break;
            case 5:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg06.' + type);
                break;
            case 6:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg07.' + type);
                break;
            case 7:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg08.' + type);
                break;
            case 8:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg09.' + type);
                break;
            case 9:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg10.' + type);
                break;
            case 10:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg11.' + type);
                break;
            case 11:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg12.' + type);
                break;
            case 12:
                $('.bg').attr('data-ibg-bg', 'assets/img/bg13.' + type);
                break;
        }
    }

    if (checkWebp()) {
        setbg(type = 'webp');
    } else {
        setbg(type = 'jpg');
    }

    $(".bg").interactive_bg({
        strength: 30,
        scale: 1.03,
        animationSpeed: "100ms",
        contain: true,
        wrapContent: false
      });

    $(window).resize(function() {
      $(".ibg-bg, html, body, header").css({
        width: $(window).outerWidth(),
        height: $(window).outerHeight()
      });
    })

    //Gradient background
    /*$(window).scroll(function() {
        var opacity = Math.floor(document.documentElement.scrollTop / 10) + 40;
        if (opacity > 90)
            opacity = 90;
        else
            $('header').css('background', 'rgba(20, 20, 20, .' + String(opacity));
    });*/

    //Go to the top of the page when refreshing
    /*window.onbeforeunload = function() {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }*/
});