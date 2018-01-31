ymaps.ready(function () {
    myMap = new ymaps.Map(
        'map',
        {
            center : [ 56.834717, 60.791888 ] ,
            zoom : 15 ,
            controls: []
        }
    );
    myMap.behaviors.disable('scrollZoom');
    
    var Placemark1 = new ymaps.Placemark (
        [ 56.834717, 60.791888 ] , {
            hintContent : 'г. Екатеринбург, ул. Конструкторов, 5 офис 1018',
        }
    );
    var Placemark2 = new ymaps.Placemark (
        [ 56.894577, 60.609144 ] , {
            hintContent : 'г. Екатеринбург, ул. Победы, 11',
        }
    );
    var Placemark3 = new ymaps.Placemark (
        [ 56.855669, 60.616177 ] , {
            hintContent : 'г. Екатеринбург, ул. Восточная, 6',
        }
    );
    myMap.geoObjects
        .add ( Placemark1 )
        .add ( Placemark2 )
        .add ( Placemark3 );
});



$('.office_btn1').click(function (e) {
    e.preventDefault();
    myMap.panTo([56.834717, 60.791888], {
        delay: 1500
    });
    $('.contact_btns a').removeClass('active');
    $(this).addClass('active');
    $('.contacts_main .office').removeClass('active');
    $('.contacts_main .office1').addClass('active');
});

$('.office_btn2').click(function (e) {
   e.preventDefault();
    myMap.panTo([56.894577, 60.609144], {
        delay: 1500
    });
    $('.contact_btns a').removeClass('active');
    $(this).addClass('active');
    $('.contacts_main .office').removeClass('active');
    $('.contacts_main .office2').addClass('active');
});

$('.office_btn3').click(function (e) {
   e.preventDefault();
    myMap.panTo([56.855669, 60.616177], {
        delay: 1500
    });
    $('.contact_btns a').removeClass('active');
    $(this).addClass('active');
    $('.contacts_main .office').removeClass('active');
    $('.contacts_main .office3').addClass('active');
});