$(document).ready(function () {

    $('.orden_btn').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.order_drive_btn').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.more_btn').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });


    function second_passed() {
        if (sessionStorage.getItem("bannerIsShowed") == null)
            $('.banner_popup_btn').click();
        sessionStorage.setItem("bannerIsShowed", true);

    }


    if (sessionStorage.getItem("bannerIsShowed") == null) {
        setTimeout(function () {
            second_passed();
        }, 15000);
        var ts = Date.now();
        $("html").mouseout(function (e) {
            if ((Date.now() - ts) <= 15000 && e.toElement == null) {
                second_passed();
            }
        });
    }


    $('.banner_popup_btn').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    /*Phone input placehoder mask*/
    jQuery(function ($) {
        $('input[name="phone"]').mask("+7 (999) 999-99-99");
    });
    /*Phone input placeholder mask End*/
    $("form input").click(function () {
        $(this).parent("form").addClass("before");
    });

    /*Tab*/
    $('#tab .tab_btn').click(function () {
        var tab_id = $(this).attr('id');
        tabClick(tab_id)
    });

    function tabClick(tab_id) {
        if (tab_id != $('#tab .tab_btn.active').attr('id')) {
            $('#tab .tab_btn').removeClass('active');
            $('#' + tab_id).addClass('active');
            $('#tab div').removeClass('active');
            $('#con_' + tab_id).addClass('active');
        }
    }

    var basePrice = parseInt($(".price strong").text().replace(/\s/g, ''));
    $('.plus').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var $num = $this.siblings('.count_input').val();
        $num = +$num;
        $num++;
        if ($num * basePrice > 1000000) {
            return false;
        }
        $this.siblings('.count_input').val($num);
        $(".price strong").text((basePrice * $num).toLocaleString());
    });
    $('.minus').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var $num = $this.siblings('.count_input').val();
        $num = +$num;
        $num--;
        if ($num < 1) {
            return false;
        }
        $this.siblings('.count_input').val($num);
        $(".price strong").text((basePrice * $num).toLocaleString());
    });

});