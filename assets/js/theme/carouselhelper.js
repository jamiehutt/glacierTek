import $ from 'jquery';
var spreadsheetID = "1QMf2vlsAPgZ_qa6A5EHrJ8qxiK4_TTv3P3xijTJrIB4";
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";
$.getJSON(url, function(data) {
    var entry = data.feed.entry;
    var i=0;
    var itemCount = 0;
    var imgCount = 0;
    var rotateScript = '';
    $(entry).each(function(){ // rotating script
        if(this.gsx$howmanyphotosforthisproduct.$t > 1){
            if(itemCount + 1 == 1){
                rotateScript += "<script>\n";                   
            }
            for (imgCount = 0; imgCount < this.gsx$howmanyphotosforthisproduct.$t; imgCount++) {
                if(imgCount + 1 == 1){
                    rotateScript += "\t$('.carousel-360.img" + (itemCount+1) + "').click(function(e){\n\t\te.preventDefault();\n";

                    // build the script for each collection of images

                    if(this.gsx$howmanyphotosforthisproduct.$t == 2){
                        rotateScript += "\t\tif($('#img" + (itemCount + 1) + "_1').hasClass('visible')) {\n\t\t\t$('#img" + (itemCount + 1) + "_2').addClass('visible');\n\t\t\t$('#img" + (itemCount + 1) + "_1').removeClass('visible');\n\t\t}\n\t\telse if($('#img" + (itemCount + 1) + "_2').hasClass('visible')) {\n\t\t\t$('#img" + (itemCount + 1) + "_1').addClass('visible');\n\t\t\t$('#img" + (itemCount + 1) + "_2').removeClass('visible');\n\t\t}\n\t});\n";
                    }
                    else if(this.gsx$howmanyphotosforthisproduct.$t == 3){
                        rotateScript += "\t\tif($('#img" + (itemCount + 1) + "_1').hasClass('visible')) {\n\t\t\t$('#img" + (itemCount + 1) + "_2').addClass('visible');\n\t\t\t$('#img" + (itemCount + 1) + "_1,#img" + (itemCount + 1) + "_3').removeClass('visible');\n\t\t}\n\t\telse if($('#img" + (imgCount + 1) + "_2').hasClass('visible')) {\n\t\t\t$('#img" + (itemCount + 1) + "_1').addClass('visible');\n\t\t\t$('#img" + (itemCount + 1) + "_2').removeClass('visible');\n\t\t}\n\t\telse if($('#img" + (itemCount + 1) + "_3').hasClass('visible')) {\n\t\t\t$('#img" + (itemCount + 1) + "_1').addClass('visible');\n\t\t\t$('#img" + (itemCount + 1) + "_2,#img" + (itemCount + 1) + "_3').removeClass('visible');\n\t\t}\n\t});\n";
                    }
                }  
            }
        }
        itemCount++;
        if(itemCount == entry.length){
            rotateScript += "</script>";                   
        }
    });
$('.footer').append(rotateScript);
