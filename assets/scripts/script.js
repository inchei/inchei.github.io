$(function() {
    //An Easter egg
      if(
        window.outerWidth - window.innerWidth > 20 || 
        window.outerHeight - window.innerHeight > 100){
            setTimeout('console.log("你想幹什麽？一定是圖謀不軌！");',0);
            setTimeout('console.warn("檢測到惡意打開控制台，啓動自爆系統……");',1000);
            setTimeout('console.warn("倒計時開始：5");',2000);
            setTimeout('console.warn("4");',3000);
            setTimeout('console.log("快點！再不引爆就……");',3500);
            setTimeout('console.warn("3");',4000);
            setTimeout('console.log("這該死的倒計時系統……可惡！");',4700);
            setTimeout('console.warn("2");',5000);
            setTimeout('console.error("自爆系統啓動失敗，權限成功寫入");',5500);
            setTimeout('console.info("歡迎使用控制臺！");',6000);
     }

    //Set buttons
    $('#more').click(function() {
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });

    //Set the background
    var random = Math.floor(Math.random() * 11);

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
                $('body').css('background-image', 'url(assets/img/bg01.' + type + ')');
                break;
            case 1:
                $('body').css('background-image', 'url(assets/img/bg02.' + type + ')');
                break;
            case 2:
                $('body').css('background-image', 'url(assets/img/bg03.' + type + ')');
                break;
            case 3:
                $('body').css('background-image', 'url(assets/img/bg04.' + type + ')');
                break;
            case 4:
                $('body').css('background-image', 'url(assets/img/bg05.' + type + ')');
                break;
            case 5:
                $('body').css('background-image', 'url(assets/img/bg06.' + type + ')');
                break;
            case 6:
                $('body').css('background-image', 'url(assets/img/bg07.' + type + ')');
                break;
            case 7:
                $('body').css('background-image', 'url(assets/img/bg08.' + type + ')');
                break;
            case 8:
                $('body').css('background-image', 'url(assets/img/bg09.' + type + ')');
                break;
            case 9:
                $('body').css('background-image', 'url(assets/img/bg10.' + type + ')');
                break;
            case 10:
                $('body').css('background-image', 'url(assets/img/bg11.' + type + ')');
                break;
        }
    }

    if (checkWebp()) {
        setbg(type = 'webp');
    } else {
        setbg(type = 'jpg');
    }

    //Gradient background
    $(window).scroll(function() {
        var opacity = Math.floor(document.documentElement.scrollTop / 10) + 40;
        if (opacity > 90)
            opacity = 90;
        else
            $('main').css('background', 'rgba(20, 20, 20, .' + String(opacity) + ')');
    });

    //Go to the top of the page when refreshing
    window.onbeforeunload = function() {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
});