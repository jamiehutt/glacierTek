import 'babel-polyfill';
import $ from 'jquery';
import async from 'async';
import account from './theme/account';
import auth from './theme/auth';
import blog from './theme/blog';
import brand from './theme/brand';
import cart from './theme/cart';
import category from './theme/category';
import contactUs from './theme/contact-us';
import compare from './theme/compare';
import errors from './theme/errors';
import errors404 from './theme/404-error';
import giftCertificate from './theme/gift-certificate';
import global from './theme/global';
import home from './theme/home';
import orderComplete from './theme/order-complete';
import rss from './theme/rss';
import page from './theme/page';
import product from './theme/product';
import search from './theme/search';
import sitemap from './theme/sitemap';
import subscribe from './theme/subscribe';
import wishlist from './theme/wishlist';

const PageClasses = {
    mapping: {
        'pages/account/orders/all': account,
        'pages/account/orders/details': account,
        'pages/account/addresses': account,
        'pages/account/add-address': account,
        'pages/account/add-return': account,
        'pages/account/add-wishlist': wishlist,
        'pages/account/recent-items': account,
        'pages/account/download-item': account,
        'pages/account/edit': account,
        'pages/account/inbox': account,
        'pages/account/return-saved': account,
        'pages/account/returns': account,
        'pages/auth/login': auth,
        'pages/auth/account-created': auth,
        'pages/auth/create-account': auth,
        'pages/auth/new-password': auth,
        'pages/auth/forgot-password': auth,
        'pages/blog': blog,
        'pages/blog-post': blog,
        'pages/brand': brand,
        'pages/brands': brand,
        'pages/cart': cart,
        'pages/category': category,
        'pages/compare': compare,
        'pages/contact-us': contactUs,
        'pages/errors': errors,
        'pages/errors/404': errors404,
        'pages/gift-certificate/purchase': giftCertificate,
        'pages/gift-certificate/balance': giftCertificate,
        'pages/gift-certificate/redeem': giftCertificate,
        // eslint-disable-next-line
        'global': global,
        'pages/home': home,
        'pages/order-complete': orderComplete,
        'pages/page': page,
        'pages/product': product,
        'pages/search': search,
        'pages/rss': rss,
        'pages/sitemap': sitemap,
        'pages/subscribed': subscribe,
        'pages/account/wishlist-details': wishlist,
        'pages/account/wishlists': wishlist,
    },
    /**
     * Getter method to ensure a good page type is accessed.
     * @param page
     * @returns {*}
     */
    get(pageKey) {
        if (this.mapping[pageKey]) {
            return this.mapping[pageKey];
        }

        return false;
    },
};

/**
 *
 * @param {Object} pageObj
 */
function series(pageObj) {
    async.series([
        pageObj.before.bind(pageObj), // Executed first after constructor()
        pageObj.loaded.bind(pageObj), // Main module logic
        pageObj.after.bind(pageObj), // Clean up method that can be overridden for cleanup.
    ], (err) => {
        if (err) {
            throw new Error(err);
        }
    });
}

/**
 * Loads the global module that gets executed on every page load.
 * Code that you want to run on every page goes in the global module.
 * @param {object} pages
 * @returns {*}
 */
function loadGlobal(pages) {
    const Global = pages.get('global');

    return new Global;
}

/**
 *
 * @param {function} pageFunc
 * @param {} pages
 */
function loader(pageFunc, pages) {
    if (pages.get('global')) {
        const globalPageManager = loadGlobal(pages);

        globalPageManager.context = pageFunc.context;

        series(globalPageManager);
    }
    series(pageFunc);
}

/**
 * This function gets added to the global window and then called
 * on page load with the current template loaded and JS Context passed in
 * @param templateFile String
 * @param contextJSON
 * @returns {*}
 */
window.stencilBootstrap = function stencilBootstrap(templateFile, contextJSON = '{}') {
    const pages = PageClasses;
    const context = JSON.parse(contextJSON);

    return {
        load() {
            $(() => {
                const PageTypeFn = pages.get(templateFile); // Finds the appropriate module from the pageType object and store the result as a function.

                if (PageTypeFn) {
                    const pageType = new PageTypeFn(context);

                    pageType.context = context;

                    return loader(pageType, pages);
                }

                throw new Error(`${templateFile} Module not found`);
            });
        },
    };
};


// Custom functions

var navOffset = 130;


$( '.search' ).click(function(e) {
    e.preventDefault();
  $( '.search-pane' ).toggleClass( 'open' );
  $( '.search-input' ).focus();
});
$( '.close' ).click(function() {
  $( '.search-pane' ).toggleClass( 'open' );
});

// drop-down menu

$( '.nav-by-use' ).click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.nav-by-feature').removeClass('open');
    $('.nav-by-use').toggleClass('open');
});
$( '.nav-by-feature' ).click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.nav-by-feature').toggleClass('open');
    $('.nav-by-use').removeClass('open');
});
$('.has-dropdown li').click(function(e){
    e.stopPropagation();
});
$(document).click(function() {
    $('.nav-by-use,.nav-by-feature').removeClass('open');
});

$( '.review-link' ).click(function(e) {
    e.preventDefault();
    $('.tab,.tab-content').toggleClass('is-active');
    $('html, body').animate({
        scrollTop: ($('.productView-description').offset().top)
    },500);
});




// $('.carousel-360.img1').click(function(e){
//     e.preventDefault();
//     if($('#img1_1').hasClass('visible')) {
//         $('#img1_2').addClass('visible');
//         $('#img1_1,#img1_3,#img1_4,#img1_5').removeClass('visible');
//     }
//     else if($('#img1_2').hasClass('visible')) {
//         $('#img1_3').addClass('visible');
//         $('#img1_1,#img1_2,#img1_4,#img1_5').removeClass('visible');
//     }
//     else if($('#img1_3').hasClass('visible')) {
//         $('#img1_1').addClass('visible');
//         $('#img1_2,#img1_3').removeClass('visible');
//     }
// });



// $('.carousel-360.img2').click(function(e){
//     e.preventDefault();
//     if($('#carousel-img2-1').hasClass('visible')) {
//         $('#carousel-img2-2').addClass('visible');
//         $('#carousel-img2-1,#carousel-img2-3').removeClass('visible');
//     }
//         else if($('#carousel-img2-2').hasClass('visible')) {
//         $('#carousel-img2-3').addClass('visible');
//         $('#carousel-img2-1,#carousel-img2-2').removeClass('visible');
//     }
//         else if($('#carousel-img2-3').hasClass('visible')) {
//         $('#carousel-img2-1').addClass('visible');
//         $('#carousel-img2-2,#carousel-img2-3').removeClass('visible');
//     }
// });
// $('.carousel-360.img3').click(function(e){
//     e.preventDefault();
//     if($('#carousel-img3-1').hasClass('visible')) {
//         $('#carousel-img3-2').addClass('visible');
//         $('#carousel-img3-1,#carousel-img3-3').removeClass('visible');
//     }
//     else if($('#carousel-img3-2').hasClass('visible')) {
//         $('#carousel-img3-3').addClass('visible');
//         $('#carousel-img3-1,#carousel-img3-2').removeClass('visible');
//     }
//     else if($('#carousel-img-3').hasClass('visible')) {
//         $('#carousel-img3-1').addClass('visible');
//         $('#carousel-img3-2,#carousel-img3-3').removeClass('visible');
//     }
//     else{
//         $('#carousel-img3-1').addClass('visible');
//         $('#carousel-img3-2,#carousel-img3-3').removeClass('visible');
//     }
// });

$(document).ready(function(){ // convert weights for detail pages
    var str = $( ".weight" ).text();
    var n = str.search(" Ounces");
    var ounces = str.substring(0, n);
    var pounds = ounces/16;
    pounds = pounds.toString();
    var point = pounds.indexOf(".");
    ounces = Math.round(pounds.substring(point, ounces.length) * 16);
    if(point == -1){
        $( ".weight").html(pounds + " lbs. ");
    }
    else{
        pounds = pounds.substring(0, point);
        $( ".weight").html(pounds + " lbs. " + ounces + " oz.");  
    }
});

$(".heroCarousel").slick({
    dots: true,
    mobileFirst: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000
    }).on("afterChange beforeChange edge init reInit setPosition swipe breakpoint", handler);

    function handler(event, slick, direction) {
        $('#img1_2,#img1_3,#img1_4,#img1_5').removeClass('visible');
        $('#img2_2,#img2_3,#img2_4,#img2_5').removeClass('visible');
        $('#img3_2,#img3_3,#img3_4,#img3_5').removeClass('visible');
        $('#img4_2,#img4_3,#img4_4,#img4_5').removeClass('visible');
        $('#img5_2,#img5_3,#img5_4,#img5_5').removeClass('visible');
        $('#img1_1,#img2_1,#img3_1,#img4_1,#img5_1').addClass('visible');
    };

// $(document).ready(function(){ // print all the testimonials
//     $.getJSON("/testimonial-data/", function(reviews){
//         $("#testimonials").html("");
//         $.each(reviews, function(i, review){
//             var obj = review;
//             for(i=0; i < obj.length; i++){
//                 $("#testimonials").append(obj[i].review + " ");
//             }
//         });
//     });

// });
// $(document).ready(function(){ // get one random testimonial
//     var numToShow = 1;
//     var numToChoose = 0;
//     $.getJSON("/testimonial-data/", function(reviews){
//         $.each(reviews, function(i, review){         
//             var obj = review;
//             for(i=0; i < obj.length; i++){
//                 numToChoose++;
//             }
//             var picked = Math.floor(Math.random() * numToChoose) + numToShow;   
//             for(i=0; i < obj.length; i++){
//                 if(i == picked - 1){
//                     $("#sidebar_testimonial").append(obj[i].review + " ");
//                 }
//             }
//         });
//     });
// });

// sidebar testimonials
        
// var spreadsheetID = "15Wpgd08hZ54xBqJwt0vBeGVW4Bf1zYH8CLeg4vIIoj4"; // ID of the Google Spreadsheet
// var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";
var url = "/testimonial-data/";
$.getJSON(url, function(data) {
    var entry = data.feed.entry;
    var i=0;
    var item1 = Math.floor(Math.random() * entry.length) + 1;
    var item2 = Math.floor(Math.random() * entry.length) + 1;
    var maxLength = 300;
    while(item2 == item1){ // make sure the two random numbers are different
        var item2 = Math.floor(Math.random() * entry.length) + 1;
    }
    $("#testimonials").html(''); // clear any characters in the div
    $(entry).each(function(){ // this loop is for the sidebar testimonials
        var photo = '';
        var affiliation = '';
        var customerLocation = '';
        if(i + 1 == item1 || i + 1 == item2){
            var link = this.gsx$title.$t
            link = link.replace(/\s/g, '').toLowerCase();
            var text = this.gsx$text.$t;
            var shortText = this.gsx$text.$t;
            text = text.replace(/\n/g, '<br>');
            shortText = shortText.replace(/\n/g, '<br>');
            if(shortText.length > maxLength){
                var trimmedString = shortText.substr(0, maxLength);
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                shortText = trimmedString + '... <a class="readMore" href="/glacier-tek-stories#' + link + '">Read more</a>';
            }
            if(this.gsx$photo.$t){
                photo = '<figure><img src="' + this.gsx$photo.$t + '"></figure>';
            }
            if(this.gsx$affiliation.$t){
                affiliation = '<i>' + this.gsx$affiliation.$t + '</i><br>';
            }
            if(this.gsx$location.$t){
                customerLocation = '<i>' + this.gsx$location.$t + '</i>';
            }
            $("#sidebar_testimonial").append('<span class="icn-testimonial"></span><div class="testimonial-item"><h3><a href="/glacier-tek-stories/#' + link + '">' + this.gsx$title.$t + '</a></h3>' + photo + '<p class="text">' + shortText + '</p><p class="testimonyName">' + this.gsx$name.$t + '</p>' + affiliation + customerLocation + '</div>');
        }
        if(i + 1 == entry.length){
            $("#sidebar_testimonial").append('<h4><a href="/glacier-tek-stories/">Read more testimonials</a></h4>');
        }
        i++;
    });
    $(entry).each(function(){ // this loop is for the testimonial page
        var photo = '';
        var affiliation = '';
        var customerLocation = '';
        var link = this.gsx$title.$t
        link = link.replace(/\s/g, '').toLowerCase();
        var text = this.gsx$text.$t;
        text = text.replace(/\n/g, '<br>');
        if(this.gsx$photo.$t){
            photo = '<figure class="half-right"><img src="' + this.gsx$photo.$t + '"></figure>';
        }
        if(this.gsx$affiliation.$t){
            affiliation = '<i>' + this.gsx$affiliation.$t + '</i><br>';
        }
        if(this.gsx$location.$t){
            customerLocation = '<i>' + this.gsx$location.$t + '</i>';
        }
        $("#testimonials").append('<div id="' + link + '" class="testimonial-item">' + photo + '<h3>' + this.gsx$title.$t + '</h3><p class="text">' + text + '</p><p class="testimonyName">' + this.gsx$name.$t + '</p>' + affiliation + customerLocation + '</div>');
        i++;
    });
    if(window.location.href.indexOf("#") > -1) { // tells us if the character is in the url
        var hash = window.location.href.substring(window.location.href.indexOf("#"), window.location.href.length);
        $('html, body').animate({
        scrollTop: $(hash).offset().top - navOffset
      }, 800);
    }
});

// display the first div by default.
$("#accordion div").first().css('display', 'block');


// Get all the links.
var link = $("#accordion a.title");

// On clicking of the links do something.
link.on('click', function(e) {

    e.preventDefault();

    var a = $(this).attr("href");

    $(a).slideDown('fast');

    //$(a).slideToggle('fast');
    $("#accordion div").not(a).slideUp('fast');

        $("html, body").animate({
            scrollTop: 100
        }, 600);

    
});
