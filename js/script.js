$(document).ready(function () {

    var ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = "https://cdn.jsdelivr.net/npm/suggestions-jquery@17.12.0/dist/css/suggestions.min.css";
    document.getElementsByTagName("head")[0].appendChild(ss);

    $("#con_tab2 input.order-name").suggestions({
        token: "43db7e0fd7df33eb2e2ac018410d3f1381382f05",
        type: "PARTY",
        count: 5,
        /* Вызывается, когда пользователь выбирает одну из подсказок */
        onSelect: function(suggestion) {
            window.suggest = suggestion;
        }
    });

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
        if (document.querySelector(".mfp-bg") == null && sessionStorage.getItem("bannerIsShowed") == null) {
            $('.banner_popup_btn').click();
            sessionStorage.setItem("bannerIsShowed", true);
        }
    }


    if (sessionStorage.getItem("bannerIsShowed") == null) {
        setTimeout(function () {
            second_passed();
        }, 15000);
        $("html").mouseout(function (e) {
            if (sessionStorage.getItem("bannerIsShowed") == null && e.toElement == null) {
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
        tabClick(tab_id);

    });

    function tabClick(tab_id) {
        if (tab_id != $('#tab .tab_btn.active').attr('id')) {
            $('#tab .tab_btn').removeClass('active');
            $('#' + tab_id).addClass('active');
            $('#tab div').removeClass('active');
            $('#con_' + tab_id).addClass('active');
        }
    }

    var basePrice = parseInt($($(".price strong")[0]).text().replace(/\s/g, ''));
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




    $("body").on('submit', '#popup_order form', function (e) {
        e.preventDefault();
        var o = {};
        var ajaxFunction = null;
        o.count = $(this).find(".count_input").val();
        o.total_price = $(this).find(".price strong").text();
        var tabPhys = $(this).find("#con_tab1.active");
        var tabEntity = $(this).find("#con_tab2.active");
        if (tabPhys[0] !== undefined) {
            o.type = 1;
            o.name = $(".order-name", tabPhys).val();
            o.surname = $(".order-lastname", tabPhys).val();
            o.city = $(".order-city", tabPhys).val();
            o.address = $(".order-address", tabPhys).val();
            o.phone = $(".order-phone", tabPhys).val();
            o.email = $(".order-email", tabPhys).val();
            o.total_price = parseInt(o.total_price.replace(/\s/g, ''));
            ajaxFunction = function(o){
                $.ajax({
                    url: '/system/plugins/SecArgonia/feedback/individual/createPayment',
                    dataType: "json",
                    data: o,
                    success: function (data) {
                        if(!data.status || !data.data || !data.data.id) {
                            alert(data.statusText);
                            return false;
                        }

                        window.location = 'http://замена-фн.рф/payment.php?id=' + data.data.id;
                        $.magnificPopup.close();

                    }
                });
            };

        }
        else if (tabEntity[0] !== undefined) {
            o.type = 2;
            o.name_organization = $(".order-name", tabEntity).val();
            o.city = $(".order-city", tabEntity).val();
            o.address = $(".order-address", tabEntity).val();
            o.phone = $(".order-phone", tabEntity).val();
            o.email = $(".order-email", tabEntity).val();
            if(window.suggest)
                o.company = JSON.stringify(window.suggest);
            ajaxFunction = function(o){
                $.ajax({
                    url: '/system/plugins/SecArgonia/feedback/legal/createPayment',
                    dataType: "json",
                    data: o,
                    success: function (data) {
                        if(!data.status || !data.data || !data.data.id) {
                            alert(data.statusText);
                            return false;
                        }

                        window.location = 'http://замена-фн.рф/system/plugins/SecArgonia/feedback/plugin/xls/order'+data.data.id+'.xlsx';
                        alert("Мы приняли Ваш заказ и в ближайшее время с Вами свяжемся");
                        $.magnificPopup.close();
                    }

                });
            };
        }

        var ok = true;
        for (var key in o) if (o[key] === "") ok = false;
        if (ok) {
            ajaxFunction(o);
        }
        else {
            alert("Не все поля заполнены");
        }
    });

    $("#popup form").submit(function (e) {
        e.preventDefault();
        var o = {};
        o.phone = $(".order-phone", this).val();
        var ok = true;
        for (var key in o) if (o[key] === "") ok = false;
        if (ok) {
            $.ajax({
                url: '/system/plugins/SecArgonia/feedback/order/create',
                dataType: "json",
                data: o,
                success: function (data) {
                    if (data.status) {
                        alert("Мы скоро Вам позвоним");
                        $.magnificPopup.close();
                    }
                    else alert(data.statusText);
                }
            });
        }
        else {
            alert("Не все поля заполнены");
        }
    });

    $("#subscribe form").submit(function (e) {
        e.preventDefault();
        var o = {};
        o.email = $(".subscribe-email", this).val();
        var ok = true;
        for (var key in o) if (o[key] === "") ok = false;
        if (ok) {
            $.ajax({
                url: '/system/plugins/SecArgonia/feedback/order/create',
                dataType: "json",
                data: o,
                success: function (data) {
                    if (data.status) {
                        alert("Мы рады Вас приветствовать");
                        $.magnificPopup.close();
                    }
                    else alert(data.statusText);
                }
            });
        }
        else {
            alert("Не все поля заполнены");
        }
    });

    $("a[href='#when_to_change']").click(function () {
        var speed = 500;
        var top = $('#when_to_change').offset().top;
        $('html, body').animate({scrollTop: top}, speed);
    });

    $("#dop_service form").submit(function (e) {
        e.preventDefault();
        var o = {};
        o.phone = $(".order-phone", this).val();
        o.name = $(".order-name", this).val();
        o.type = $(".order-type", this).val();
        var ok = true;
        for (var key in o) if (o[key] === "") ok = false;
        if (ok) {
            $.ajax({
                url: '/system/plugins/SecArgonia/feedback/order/create',
                dataType: "json",
                data: o,
                success: function (data) {
                    if (data.status) {
                        alert("Мы скоро Вам позвоним");
                        $.magnificPopup.close();
                    }
                    else alert(data.statusText);
                }
            });
        }
        else {
            alert("Не все поля заполнены");
        }
    });

    $(".dop_service-btn").click(function () {
        $("#dop_service .order-type").val($(this).attr("data-type"));
        $("#dop_service .title").text($(this).attr("data-title"));
    });

    $(".dop_service-btn").magnificPopup({
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


});