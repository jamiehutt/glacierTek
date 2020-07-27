$('.carousel-360.img1').click(function(e){
    e.preventDefault();
    if($('#img1_1').hasClass('visible')) {
        $('#img1_2').addClass('visible');
        $('#img1_1,#img1_3').removeClass('visible');
    }
    else if($('#img1_2').hasClass('visible')) {
        $('#img1_1').addClass('visible');
        $('#img1_2').removeClass('visible');
    }
    else if($('#img1_3').hasClass('visible')) {
        $('#img1_1').addClass('visible');
        $('#img1_2,#img1_3').removeClass('visible');
    }
});
$('.carousel-360.img2').click(function(e){
    e.preventDefault();
    if($('#img2_1').hasClass('visible')) {
        $('#img2_2').addClass('visible');
        $('#img2_1,#img2_3').removeClass('visible');
    }
    else if($('#img1_2').hasClass('visible')) {
        $('#img2_1').addClass('visible');
        $('#img2_2').removeClass('visible');
    }
    else if($('#img2_3').hasClass('visible')) {
        $('#img2_1').addClass('visible');
        $('#img2_2,#img2_3').removeClass('visible');
    }
});
$('.carousel-360.img3').click(function(e){
    e.preventDefault();
    if($('#img3_1').hasClass('visible')) {
        $('#img3_2').addClass('visible');
        $('#img3_1').removeClass('visible');
    }
    else if($('#img3_2').hasClass('visible')) {
        $('#img3_1').addClass('visible');
        $('#img3_2').removeClass('visible');
    }
});
$('.carousel-360.img4').click(function(e){
    e.preventDefault();
    if($('#img4_1').hasClass('visible')) {
        $('#img4_2').addClass('visible');
        $('#img4_1,#img4_3').removeClass('visible');
    }
    else if($('#img1_2').hasClass('visible')) {
        $('#img4_1').addClass('visible');
        $('#img4_2').removeClass('visible');
    }
    else if($('#img4_3').hasClass('visible')) {
        $('#img4_1').addClass('visible');
        $('#img4_2,#img4_3').removeClass('visible');
    }
});
$('.carousel-360.img5').click(function(e){
    e.preventDefault();
    if($('#img5_1').hasClass('visible')) {
        $('#img5_2').addClass('visible');
        $('#img5_1').removeClass('visible');
    }
    else if($('#img5_2').hasClass('visible')) {
        $('#img5_1').addClass('visible');
        $('#img5_2').removeClass('visible');
    }
});
