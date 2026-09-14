$(function() {
    //Set buttons
    /*$('#more').click(() => {
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        $('#spb').text(':)');
    });*/

    //Set the background
    var random = Math.floor(Math.random() * 8);

    switch (random) {
        case 0:
            $('.bg').attr('data-ibg-bg', 'https://s1.ax1x.com/2020/03/16/8YUSMj.jpg');
            break;
        case 1:
            $('.bg').attr('data-ibg-bg', 'https://s1.ax1x.com/2020/03/16/8YNxzQ.jpg');
            break;
        case 2:
            $('.bg').attr('data-ibg-bg', 'https://s1.ax1x.com/2020/03/16/8YNvRg.jpg');
            break;
        case 3:
            $('.bg').attr('data-ibg-bg', 'https://s1.ax1x.com/2020/03/16/8YNLIf.jpg');
            break;
        case 4:
            $('.bg').attr('data-ibg-bg', 'https://s1.ax1x.com/2020/03/16/8YNXi8.jpg');
            break;
        case 5:
            $('.bg').attr('data-ibg-bg', 'https://s1.ax1x.com/2020/03/16/8YUpss.jpg');
            break;
        case 6:
            $('.bg').attr('data-ibg-bg', 'https://s1.ax1x.com/2020/03/16/8YUPZq.jpg');
            break;
        case 7:
            $('.bg').attr('data-ibg-bg', 'https://s1.ax1x.com/2020/03/16/8YUFoV.jpg');
            break;
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