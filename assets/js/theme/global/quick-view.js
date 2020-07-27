import $ from 'jquery';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal } from './modal';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', (event) => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('product-id');

        modal.open({ size: 'large' });

        function changeWeight(){
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
        }

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            return new ProductDetails(modal.$content.find('.quickView'), setTimeout(changeWeight, 250), context);

        });
    });
}
