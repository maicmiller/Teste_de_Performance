/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 2.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-16", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-126", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-15", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "send user form autentication-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-18", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "send user form autentication-0", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/hoverIntent.js-153", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-12", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockwishlist/js/ajax-wishlist.js-152", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-11", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-1", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-0", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/10-bootstrap.min.js-137", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.idTabs.js-241", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-70", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-71", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-72", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-73", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-74", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-75", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/product.css-238", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-68", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-69", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/jquery/uniform/sprite.png-121", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/modules/socialsharing/css/socialsharing.css-239", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img5.jpg-175", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-1.jpg-161", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/js/jquery/plugins/autocomplete/jquery.autocomplete.js-150", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-60", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-61", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-62", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-63", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-64", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "/index.php?controller=order&multi-shipping=-133", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-65", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-66", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-67", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "/index.php-237", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/1/1-cart_default.jpg-250", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img2.jpg-172", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/3/3-cart_default.jpg-252", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "step (accept terms of use) -> /v1/tiles-132", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/index.js-156", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/9/9-cart_default.jpg-265", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "send user form autentication", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/5/5-cart_default.jpg-259", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/superfish-modified.js-154", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/cheque.png-135", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/7/7-cart_default.jpg-260", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/8/8-large_default.jpg-263", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/bankwire.png-134", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-2", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/7/7-large_default.jpg-257", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-4", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "/index.php-256", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-3", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/img/c/9-category_default.jpg-188", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/global.js-136", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/my-account.css-94", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.easing.js-134", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-5", "isController": false}, {"data": [[1900.0, 2.0]], "isOverall": false, "label": "/index.php-131", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/tools/treeManagement.js-146", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)-9", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img6.jpg-164", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/favicon.ico-178", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/icon/form-ok.png-91", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/modules/sendtoafriend/sendtoafriend.css-240", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "step (address) -> /index.php-127", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/js/tools.js-135", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "/index.php-262", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/modules/socialsharing/js/socialsharing.js-243", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "/index.php-30", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "/index.php-29", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "/index.php-28", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "/index.php-27", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "/index.php-26", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.textareaCounter.plugin.js-246", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "/index.php-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/8/8-medium_default.jpg-266", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/logo.jpg-158", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocklayered/blocklayered.js-185", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocknewsletter/blocknewsletter.js-148", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img4.jpg-174", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/p/1/2/12-home_default.jpg-176", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/2/2-large_default.jpg-18", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "step (address) -> /index.php-127-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "step (address) -> /index.php-127-1", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/products-comparison.js-140", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/c/3-1_thumb.jpg-160", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "/index.php-10", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-2.jpg-163", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img1.jpg-170", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/blocktopmenu.js-155", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "open the order -> /index.php-259", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "/index.php-187", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-12", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "/index.php-189", "isController": false}, {"data": [[4700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "/-78", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/homeslider/js/homeslider.js-151", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "/index.php-17", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "/index.php-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/7/7-medium_default.jpg-261", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "/index.php-183", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "/index.php-186", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-15", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/2/2-cart_default.jpg-251", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-16", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/img/c/11-category_default.jpg-190", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/sendtoafriend/sendtoafriend.js-245", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-19", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/p/1/0/10-home_default.jpg-171", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/product.js-242", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/js/jquery/jquery-migrate-1.2.1.min.js-133", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "acess my acount", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img7.jpg-165", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/1/1-large_default.jpg-249", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-10", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/p/1/6/16-home_default.jpg-177", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-11", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "/js/jquery/jquery-1.11.0.min.js-132", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/4/4-cart_default.jpg-254", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/6/6-cart_default.jpg-258", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/8/8-cart_default.jpg-264", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/productcomments/js/productcomments.js-247", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocksearch/blocksearch.js-149", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.scrollTo.js-143", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.rating.pack.js-244", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-35", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-36", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-38", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/p/8/8-home_default.jpg-168", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/print.css-248", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-39", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-1", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-0", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.serialScroll.js-144", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img3.jpg-173", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/category.js-184", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-30", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-31", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-32", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-33", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-34", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-24", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-26", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-27", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "/js/jquery/plugins/bxslider/jquery.bxslider.js-145", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-28", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/p/2/0/20-home_default.jpg-169", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "/-78-29", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/8/8-small_default.jpg-14", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/modules/blockbanner/img/sale70.png-157", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.uniform-modified.js-139", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/1/0/10-small_default.jpg-16", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/7/7-small_default.jpg-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/modules/productpaymentlogos/img/payment-logo.png-253", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/p/7/7-home_default.jpg-167", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/c/3-0_thumb.jpg-159", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-20", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-57", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-58", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/-78-59", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/1/1-medium_default.jpg-255", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/modules/blockfacebook/blockfacebook.js-147", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/img/p/1/6/16-small_default.jpg-15", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-3.jpg-162", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.total-storage.min.js-142", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-50", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-51", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-52", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockcart/ajax-cart.js-138", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-53", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/img/p/1/1-home_default.jpg-166", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-54", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-55", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-56", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "/index.php-102 (choose product)", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-5", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-46", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-47", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "/-78-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-48", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-49", "isController": false}, {"data": [[1100.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "/-78-1", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "/index.php?rand=1631139078717-122 (add product to cart)", "isController": false}, {"data": [[1200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "/-78-0", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "/js/jquery/plugins/fancybox/jquery.fancybox.js-141", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/-78-6", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "acess my acount-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "acess my acount-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-40", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "acess my acount-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-41", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "acess my acount-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-42", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "acess my acount-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-43", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "acess my acount-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-44", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "acess my acount-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-78-45", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "acess my acount-1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 242.0, "series": [{"data": [[0.0, 242.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 27.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 18.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.63115016E12, "maxY": 1.0, "series": [{"data": [[1.63115016E12, 1.0]], "isOverall": false, "label": "CN-001 | User Navigate", "isController": false}, {"data": [[1.63115016E12, 1.0]], "isOverall": false, "label": "CN-003 | Buyer User", "isController": false}, {"data": [[1.63115016E12, 1.0]], "isOverall": false, "label": "CN-002 | Searcher User", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.63115016E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 3398.5, "series": [{"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-16", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-16-Aggregated", "isController": false}, {"data": [[3.0, 166.0]], "isOverall": false, "label": "/index.php-102 (choose product)-17", "isController": false}, {"data": [[3.0, 166.0]], "isOverall": false, "label": "/index.php-102 (choose product)-17-Aggregated", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-126", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-126-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-14", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-14-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-15", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-15-Aggregated", "isController": false}, {"data": [[3.0, 1237.0]], "isOverall": false, "label": "send user form autentication-1", "isController": false}, {"data": [[3.0, 1237.0]], "isOverall": false, "label": "send user form autentication-1-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-18", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-18-Aggregated", "isController": false}, {"data": [[3.0, 575.0]], "isOverall": false, "label": "send user form autentication-0", "isController": false}, {"data": [[3.0, 575.0]], "isOverall": false, "label": "send user form autentication-0-Aggregated", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/hoverIntent.js-153", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/hoverIntent.js-153-Aggregated", "isController": false}, {"data": [[3.0, 250.0]], "isOverall": false, "label": "/index.php-102 (choose product)-12", "isController": false}, {"data": [[3.0, 250.0]], "isOverall": false, "label": "/index.php-102 (choose product)-12-Aggregated", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockwishlist/js/ajax-wishlist.js-152", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockwishlist/js/ajax-wishlist.js-152-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-13", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-13-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-10", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-10-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-11", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-11-Aggregated", "isController": false}, {"data": [[1.0, 729.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-1", "isController": false}, {"data": [[1.0, 729.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-1-Aggregated", "isController": false}, {"data": [[1.0, 919.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-0", "isController": false}, {"data": [[1.0, 919.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-0-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/10-bootstrap.min.js-137", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/10-bootstrap.min.js-137-Aggregated", "isController": false}, {"data": [[3.0, 112.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.idTabs.js-241", "isController": false}, {"data": [[3.0, 112.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.idTabs.js-241-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-70", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-70-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/-78-71", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/-78-71-Aggregated", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/-78-72", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/-78-72-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/-78-73", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/-78-73-Aggregated", "isController": false}, {"data": [[3.0, 92.0]], "isOverall": false, "label": "/-78-74", "isController": false}, {"data": [[3.0, 92.0]], "isOverall": false, "label": "/-78-74-Aggregated", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-75", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-75-Aggregated", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/product.css-238", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/product.css-238-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-68", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-68-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-69", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-69-Aggregated", "isController": false}, {"data": [[3.0, 92.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/jquery/uniform/sprite.png-121", "isController": false}, {"data": [[3.0, 92.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/jquery/uniform/sprite.png-121-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/modules/socialsharing/css/socialsharing.css-239", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/modules/socialsharing/css/socialsharing.css-239-Aggregated", "isController": false}, {"data": [[3.0, 126.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img5.jpg-175", "isController": false}, {"data": [[3.0, 126.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img5.jpg-175-Aggregated", "isController": false}, {"data": [[3.0, 98.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-1.jpg-161", "isController": false}, {"data": [[3.0, 98.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-1.jpg-161-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/js/jquery/plugins/autocomplete/jquery.autocomplete.js-150", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/js/jquery/plugins/autocomplete/jquery.autocomplete.js-150-Aggregated", "isController": false}, {"data": [[3.0, 179.0]], "isOverall": false, "label": "/-78-60", "isController": false}, {"data": [[3.0, 179.0]], "isOverall": false, "label": "/-78-60-Aggregated", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-61", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-61-Aggregated", "isController": false}, {"data": [[3.0, 170.0]], "isOverall": false, "label": "/-78-62", "isController": false}, {"data": [[3.0, 170.0]], "isOverall": false, "label": "/-78-62-Aggregated", "isController": false}, {"data": [[3.0, 167.0]], "isOverall": false, "label": "/-78-63", "isController": false}, {"data": [[3.0, 167.0]], "isOverall": false, "label": "/-78-63-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-64", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-64-Aggregated", "isController": false}, {"data": [[2.0, 3092.0]], "isOverall": false, "label": "/index.php?controller=order&multi-shipping=-133", "isController": false}, {"data": [[2.0, 3092.0]], "isOverall": false, "label": "/index.php?controller=order&multi-shipping=-133-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-65", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-65-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-66", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-66-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-67", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-67-Aggregated", "isController": false}, {"data": [[3.0, 1715.0]], "isOverall": false, "label": "/index.php-237", "isController": false}, {"data": [[3.0, 1715.0]], "isOverall": false, "label": "/index.php-237-Aggregated", "isController": false}, {"data": [[3.0, 1590.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129", "isController": false}, {"data": [[3.0, 1590.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/1/1-cart_default.jpg-250", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/1/1-cart_default.jpg-250-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img2.jpg-172", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img2.jpg-172-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/img/p/3/3-cart_default.jpg-252", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/img/p/3/3-cart_default.jpg-252-Aggregated", "isController": false}, {"data": [[2.0, 737.0]], "isOverall": false, "label": "step (accept terms of use) -> /v1/tiles-132", "isController": false}, {"data": [[2.0, 737.0]], "isOverall": false, "label": "step (accept terms of use) -> /v1/tiles-132-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/index.js-156", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/index.js-156-Aggregated", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/img/p/9/9-cart_default.jpg-265", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/img/p/9/9-cart_default.jpg-265-Aggregated", "isController": false}, {"data": [[3.0, 1814.0]], "isOverall": false, "label": "send user form autentication", "isController": false}, {"data": [[3.0, 1814.0]], "isOverall": false, "label": "send user form autentication-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/img/p/5/5-cart_default.jpg-259", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/img/p/5/5-cart_default.jpg-259-Aggregated", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/superfish-modified.js-154", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/superfish-modified.js-154-Aggregated", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/cheque.png-135", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/cheque.png-135-Aggregated", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/img/p/7/7-cart_default.jpg-260", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/img/p/7/7-cart_default.jpg-260-Aggregated", "isController": false}, {"data": [[1.0, 601.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136-0", "isController": false}, {"data": [[1.0, 601.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136-0-Aggregated", "isController": false}, {"data": [[2.0, 86.0]], "isOverall": false, "label": "/img/p/8/8-large_default.jpg-263", "isController": false}, {"data": [[2.0, 86.0]], "isOverall": false, "label": "/img/p/8/8-large_default.jpg-263-Aggregated", "isController": false}, {"data": [[3.0, 1289.0]], "isOverall": false, "label": "/index.php-102 (choose product)-0", "isController": false}, {"data": [[3.0, 1289.0]], "isOverall": false, "label": "/index.php-102 (choose product)-0-Aggregated", "isController": false}, {"data": [[2.0, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/bankwire.png-134", "isController": false}, {"data": [[2.0, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/bankwire.png-134-Aggregated", "isController": false}, {"data": [[3.0, 92.0]], "isOverall": false, "label": "/index.php-102 (choose product)-2", "isController": false}, {"data": [[3.0, 92.0]], "isOverall": false, "label": "/index.php-102 (choose product)-2-Aggregated", "isController": false}, {"data": [[3.0, 343.0]], "isOverall": false, "label": "/index.php-102 (choose product)-1", "isController": false}, {"data": [[3.0, 343.0]], "isOverall": false, "label": "/index.php-102 (choose product)-1-Aggregated", "isController": false}, {"data": [[2.0, 83.0]], "isOverall": false, "label": "/img/p/7/7-large_default.jpg-257", "isController": false}, {"data": [[2.0, 83.0]], "isOverall": false, "label": "/img/p/7/7-large_default.jpg-257-Aggregated", "isController": false}, {"data": [[3.0, 174.0]], "isOverall": false, "label": "/index.php-102 (choose product)-4", "isController": false}, {"data": [[3.0, 174.0]], "isOverall": false, "label": "/index.php-102 (choose product)-4-Aggregated", "isController": false}, {"data": [[3.0, 1706.0]], "isOverall": false, "label": "/index.php-256", "isController": false}, {"data": [[3.0, 1706.0]], "isOverall": false, "label": "/index.php-256-Aggregated", "isController": false}, {"data": [[3.0, 176.0]], "isOverall": false, "label": "/index.php-102 (choose product)-3", "isController": false}, {"data": [[3.0, 176.0]], "isOverall": false, "label": "/index.php-102 (choose product)-3-Aggregated", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "/img/c/9-category_default.jpg-188", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "/img/c/9-category_default.jpg-188-Aggregated", "isController": false}, {"data": [[3.0, 88.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/global.js-136", "isController": false}, {"data": [[3.0, 88.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/global.js-136-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/my-account.css-94", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/my-account.css-94-Aggregated", "isController": false}, {"data": [[3.0, 85.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.easing.js-134", "isController": false}, {"data": [[3.0, 85.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.easing.js-134-Aggregated", "isController": false}, {"data": [[3.0, 253.0]], "isOverall": false, "label": "/index.php-102 (choose product)-6", "isController": false}, {"data": [[3.0, 253.0]], "isOverall": false, "label": "/index.php-102 (choose product)-6-Aggregated", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "/index.php-102 (choose product)-5", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "/index.php-102 (choose product)-5-Aggregated", "isController": false}, {"data": [[3.0, 1925.0]], "isOverall": false, "label": "/index.php-131", "isController": false}, {"data": [[3.0, 1925.0]], "isOverall": false, "label": "/index.php-131-Aggregated", "isController": false}, {"data": [[3.0, 91.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/tools/treeManagement.js-146", "isController": false}, {"data": [[3.0, 91.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/tools/treeManagement.js-146-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-8", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-8-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-7", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-7-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-9", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-9-Aggregated", "isController": false}, {"data": [[3.0, 130.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img6.jpg-164", "isController": false}, {"data": [[3.0, 130.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img6.jpg-164-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/img/favicon.ico-178", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/img/favicon.ico-178-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/icon/form-ok.png-91", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/icon/form-ok.png-91-Aggregated", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/modules/sendtoafriend/sendtoafriend.css-240", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/modules/sendtoafriend/sendtoafriend.css-240-Aggregated", "isController": false}, {"data": [[3.0, 1105.0]], "isOverall": false, "label": "step (address) -> /index.php-127", "isController": false}, {"data": [[3.0, 1105.0]], "isOverall": false, "label": "step (address) -> /index.php-127-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/js/tools.js-135", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/js/tools.js-135-Aggregated", "isController": false}, {"data": [[2.0, 3229.0]], "isOverall": false, "label": "/index.php-262", "isController": false}, {"data": [[2.0, 3229.0]], "isOverall": false, "label": "/index.php-262-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/modules/socialsharing/js/socialsharing.js-243", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/modules/socialsharing/js/socialsharing.js-243-Aggregated", "isController": false}, {"data": [[3.0, 1566.0]], "isOverall": false, "label": "/index.php-30", "isController": false}, {"data": [[3.0, 1566.0]], "isOverall": false, "label": "/index.php-30-Aggregated", "isController": false}, {"data": [[3.0, 1360.0]], "isOverall": false, "label": "/index.php-29", "isController": false}, {"data": [[3.0, 1360.0]], "isOverall": false, "label": "/index.php-29-Aggregated", "isController": false}, {"data": [[3.0, 855.0]], "isOverall": false, "label": "/index.php-28", "isController": false}, {"data": [[3.0, 855.0]], "isOverall": false, "label": "/index.php-28-Aggregated", "isController": false}, {"data": [[3.0, 1802.0]], "isOverall": false, "label": "/index.php-27", "isController": false}, {"data": [[3.0, 1802.0]], "isOverall": false, "label": "/index.php-27-Aggregated", "isController": false}, {"data": [[3.0, 1134.0]], "isOverall": false, "label": "/index.php-26", "isController": false}, {"data": [[3.0, 1134.0]], "isOverall": false, "label": "/index.php-26-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.textareaCounter.plugin.js-246", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.textareaCounter.plugin.js-246-Aggregated", "isController": false}, {"data": [[3.0, 774.0]], "isOverall": false, "label": "/index.php-25", "isController": false}, {"data": [[3.0, 774.0]], "isOverall": false, "label": "/index.php-25-Aggregated", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/img/p/8/8-medium_default.jpg-266", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/img/p/8/8-medium_default.jpg-266-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/img/logo.jpg-158", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/img/logo.jpg-158-Aggregated", "isController": false}, {"data": [[3.0, 150.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocklayered/blocklayered.js-185", "isController": false}, {"data": [[3.0, 150.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocklayered/blocklayered.js-185-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocknewsletter/blocknewsletter.js-148", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocknewsletter/blocknewsletter.js-148-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img4.jpg-174", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img4.jpg-174-Aggregated", "isController": false}, {"data": [[3.0, 91.0]], "isOverall": false, "label": "/img/p/1/2/12-home_default.jpg-176", "isController": false}, {"data": [[3.0, 91.0]], "isOverall": false, "label": "/img/p/1/2/12-home_default.jpg-176-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/img/p/2/2-large_default.jpg-18", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/img/p/2/2-large_default.jpg-18-Aggregated", "isController": false}, {"data": [[3.0, 1001.0]], "isOverall": false, "label": "step (address) -> /index.php-127-0", "isController": false}, {"data": [[3.0, 1001.0]], "isOverall": false, "label": "step (address) -> /index.php-127-0-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "step (address) -> /index.php-127-1", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "step (address) -> /index.php-127-1-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/products-comparison.js-140", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/products-comparison.js-140-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/img/c/3-1_thumb.jpg-160", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/img/c/3-1_thumb.jpg-160-Aggregated", "isController": false}, {"data": [[3.0, 1020.0]], "isOverall": false, "label": "/index.php-10", "isController": false}, {"data": [[3.0, 1020.0]], "isOverall": false, "label": "/index.php-10-Aggregated", "isController": false}, {"data": [[3.0, 170.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-2.jpg-163", "isController": false}, {"data": [[3.0, 170.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-2.jpg-163-Aggregated", "isController": false}, {"data": [[3.0, 127.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img1.jpg-170", "isController": false}, {"data": [[3.0, 127.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img1.jpg-170-Aggregated", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/blocktopmenu.js-155", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/blocktopmenu.js-155-Aggregated", "isController": false}, {"data": [[1.0, 865.0]], "isOverall": false, "label": "open the order -> /index.php-259", "isController": false}, {"data": [[1.0, 865.0]], "isOverall": false, "label": "open the order -> /index.php-259-Aggregated", "isController": false}, {"data": [[3.0, 1163.0]], "isOverall": false, "label": "/index.php-187", "isController": false}, {"data": [[3.0, 1163.0]], "isOverall": false, "label": "/index.php-187-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-12", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-12-Aggregated", "isController": false}, {"data": [[3.0, 1335.0]], "isOverall": false, "label": "/index.php-189", "isController": false}, {"data": [[3.0, 1335.0]], "isOverall": false, "label": "/index.php-189-Aggregated", "isController": false}, {"data": [[3.0, 3398.5]], "isOverall": false, "label": "/-78", "isController": false}, {"data": [[3.0, 3398.5]], "isOverall": false, "label": "/-78-Aggregated", "isController": false}, {"data": [[3.0, 82.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/homeslider/js/homeslider.js-151", "isController": false}, {"data": [[3.0, 82.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/homeslider/js/homeslider.js-151-Aggregated", "isController": false}, {"data": [[3.0, 1714.0]], "isOverall": false, "label": "/index.php-17", "isController": false}, {"data": [[3.0, 1714.0]], "isOverall": false, "label": "/index.php-17-Aggregated", "isController": false}, {"data": [[3.0, 1146.0]], "isOverall": false, "label": "/index.php-11", "isController": false}, {"data": [[3.0, 1146.0]], "isOverall": false, "label": "/index.php-11-Aggregated", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/img/p/7/7-medium_default.jpg-261", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "/img/p/7/7-medium_default.jpg-261-Aggregated", "isController": false}, {"data": [[3.0, 1483.0]], "isOverall": false, "label": "/index.php-183", "isController": false}, {"data": [[3.0, 1483.0]], "isOverall": false, "label": "/index.php-183-Aggregated", "isController": false}, {"data": [[3.0, 1666.0]], "isOverall": false, "label": "/index.php-186", "isController": false}, {"data": [[3.0, 1666.0]], "isOverall": false, "label": "/index.php-186-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/-78-13", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/-78-13-Aggregated", "isController": false}, {"data": [[3.0, 95.0]], "isOverall": false, "label": "/-78-14", "isController": false}, {"data": [[3.0, 95.0]], "isOverall": false, "label": "/-78-14-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-15", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-15-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/2/2-cart_default.jpg-251", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/2/2-cart_default.jpg-251-Aggregated", "isController": false}, {"data": [[3.0, 99.0]], "isOverall": false, "label": "/-78-16", "isController": false}, {"data": [[3.0, 99.0]], "isOverall": false, "label": "/-78-16-Aggregated", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "/img/c/11-category_default.jpg-190", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "/img/c/11-category_default.jpg-190-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-17", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-17-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-18", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-18-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/sendtoafriend/sendtoafriend.js-245", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/sendtoafriend/sendtoafriend.js-245-Aggregated", "isController": false}, {"data": [[3.0, 82.0]], "isOverall": false, "label": "/-78-19", "isController": false}, {"data": [[3.0, 82.0]], "isOverall": false, "label": "/-78-19-Aggregated", "isController": false}, {"data": [[3.0, 92.0]], "isOverall": false, "label": "/img/p/1/0/10-home_default.jpg-171", "isController": false}, {"data": [[3.0, 92.0]], "isOverall": false, "label": "/img/p/1/0/10-home_default.jpg-171-Aggregated", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/product.js-242", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/product.js-242-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/js/jquery/jquery-migrate-1.2.1.min.js-133", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/js/jquery/jquery-migrate-1.2.1.min.js-133-Aggregated", "isController": false}, {"data": [[3.0, 1325.0]], "isOverall": false, "label": "acess my acount", "isController": false}, {"data": [[3.0, 1325.0]], "isOverall": false, "label": "acess my acount-Aggregated", "isController": false}, {"data": [[3.0, 168.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img7.jpg-165", "isController": false}, {"data": [[3.0, 168.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img7.jpg-165-Aggregated", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/img/p/1/1-large_default.jpg-249", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/img/p/1/1-large_default.jpg-249-Aggregated", "isController": false}, {"data": [[3.0, 111.0]], "isOverall": false, "label": "/-78-10", "isController": false}, {"data": [[3.0, 111.0]], "isOverall": false, "label": "/-78-10-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/1/6/16-home_default.jpg-177", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/1/6/16-home_default.jpg-177-Aggregated", "isController": false}, {"data": [[3.0, 94.0]], "isOverall": false, "label": "/-78-11", "isController": false}, {"data": [[3.0, 94.0]], "isOverall": false, "label": "/-78-11-Aggregated", "isController": false}, {"data": [[3.0, 172.0]], "isOverall": false, "label": "/js/jquery/jquery-1.11.0.min.js-132", "isController": false}, {"data": [[3.0, 172.0]], "isOverall": false, "label": "/js/jquery/jquery-1.11.0.min.js-132-Aggregated", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/-78-12", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/-78-12-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/4/4-cart_default.jpg-254", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/4/4-cart_default.jpg-254-Aggregated", "isController": false}, {"data": [[3.0, 93.0]], "isOverall": false, "label": "/img/p/6/6-cart_default.jpg-258", "isController": false}, {"data": [[3.0, 93.0]], "isOverall": false, "label": "/img/p/6/6-cart_default.jpg-258-Aggregated", "isController": false}, {"data": [[2.0, 88.0]], "isOverall": false, "label": "/img/p/8/8-cart_default.jpg-264", "isController": false}, {"data": [[2.0, 88.0]], "isOverall": false, "label": "/img/p/8/8-cart_default.jpg-264-Aggregated", "isController": false}, {"data": [[3.0, 1484.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-0", "isController": false}, {"data": [[3.0, 1484.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-0-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-1", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-1-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-2", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-2-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/productcomments/js/productcomments.js-247", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/productcomments/js/productcomments.js-247-Aggregated", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocksearch/blocksearch.js-149", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocksearch/blocksearch.js-149-Aggregated", "isController": false}, {"data": [[3.0, 116.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.scrollTo.js-143", "isController": false}, {"data": [[3.0, 116.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.scrollTo.js-143-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.rating.pack.js-244", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.rating.pack.js-244-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-35", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-35-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-36", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-36-Aggregated", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-37", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-37-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-38", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-38-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/img/p/8/8-home_default.jpg-168", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/img/p/8/8-home_default.jpg-168-Aggregated", "isController": false}, {"data": [[3.0, 93.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/print.css-248", "isController": false}, {"data": [[3.0, 93.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/print.css-248-Aggregated", "isController": false}, {"data": [[3.0, 166.0]], "isOverall": false, "label": "/-78-39", "isController": false}, {"data": [[3.0, 166.0]], "isOverall": false, "label": "/-78-39-Aggregated", "isController": false}, {"data": [[3.0, 36.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-3", "isController": false}, {"data": [[3.0, 36.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-3-Aggregated", "isController": false}, {"data": [[3.0, 253.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-2", "isController": false}, {"data": [[3.0, 253.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-2-Aggregated", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-1", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-1-Aggregated", "isController": false}, {"data": [[3.0, 1120.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-0", "isController": false}, {"data": [[3.0, 1120.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-0-Aggregated", "isController": false}, {"data": [[3.0, 86.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.serialScroll.js-144", "isController": false}, {"data": [[3.0, 86.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.serialScroll.js-144-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img3.jpg-173", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img3.jpg-173-Aggregated", "isController": false}, {"data": [[3.0, 1391.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123", "isController": false}, {"data": [[3.0, 1391.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/category.js-184", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/category.js-184-Aggregated", "isController": false}, {"data": [[3.0, 95.0]], "isOverall": false, "label": "/-78-30", "isController": false}, {"data": [[3.0, 95.0]], "isOverall": false, "label": "/-78-30-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-31", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-31-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-32", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-32-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/-78-33", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/-78-33-Aggregated", "isController": false}, {"data": [[3.0, 166.0]], "isOverall": false, "label": "/-78-34", "isController": false}, {"data": [[3.0, 166.0]], "isOverall": false, "label": "/-78-34-Aggregated", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/-78-24", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/-78-24-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-25", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-25-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-26", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-26-Aggregated", "isController": false}, {"data": [[3.0, 131.0]], "isOverall": false, "label": "/-78-27", "isController": false}, {"data": [[3.0, 131.0]], "isOverall": false, "label": "/-78-27-Aggregated", "isController": false}, {"data": [[3.0, 126.0]], "isOverall": false, "label": "/js/jquery/plugins/bxslider/jquery.bxslider.js-145", "isController": false}, {"data": [[3.0, 126.0]], "isOverall": false, "label": "/js/jquery/plugins/bxslider/jquery.bxslider.js-145-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-28", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-28-Aggregated", "isController": false}, {"data": [[3.0, 87.5]], "isOverall": false, "label": "/img/p/2/0/20-home_default.jpg-169", "isController": false}, {"data": [[3.0, 87.5]], "isOverall": false, "label": "/img/p/2/0/20-home_default.jpg-169-Aggregated", "isController": false}, {"data": [[3.0, 324.0]], "isOverall": false, "label": "/-78-29", "isController": false}, {"data": [[3.0, 324.0]], "isOverall": false, "label": "/-78-29-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/8/8-small_default.jpg-14", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/8/8-small_default.jpg-14-Aggregated", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/modules/blockbanner/img/sale70.png-157", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/modules/blockbanner/img/sale70.png-157-Aggregated", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.uniform-modified.js-139", "isController": false}, {"data": [[3.0, 88.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.uniform-modified.js-139-Aggregated", "isController": false}, {"data": [[3.0, 97.0]], "isOverall": false, "label": "/img/p/1/0/10-small_default.jpg-16", "isController": false}, {"data": [[3.0, 97.0]], "isOverall": false, "label": "/img/p/1/0/10-small_default.jpg-16-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/img/p/7/7-small_default.jpg-13", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/img/p/7/7-small_default.jpg-13-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/modules/productpaymentlogos/img/payment-logo.png-253", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/modules/productpaymentlogos/img/payment-logo.png-253-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/7/7-home_default.jpg-167", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/img/p/7/7-home_default.jpg-167-Aggregated", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/img/c/3-0_thumb.jpg-159", "isController": false}, {"data": [[3.0, 83.5]], "isOverall": false, "label": "/img/c/3-0_thumb.jpg-159-Aggregated", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/-78-20", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/-78-20-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-21", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-21-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-22", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-22-Aggregated", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/-78-23", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "/-78-23-Aggregated", "isController": false}, {"data": [[3.0, 94.0]], "isOverall": false, "label": "/-78-57", "isController": false}, {"data": [[3.0, 94.0]], "isOverall": false, "label": "/-78-57-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-58", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-58-Aggregated", "isController": false}, {"data": [[1.0, 601.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136", "isController": false}, {"data": [[1.0, 601.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136-Aggregated", "isController": false}, {"data": [[3.0, 253.0]], "isOverall": false, "label": "/-78-59", "isController": false}, {"data": [[3.0, 253.0]], "isOverall": false, "label": "/-78-59-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/img/p/1/1-medium_default.jpg-255", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/img/p/1/1-medium_default.jpg-255-Aggregated", "isController": false}, {"data": [[3.0, 82.0]], "isOverall": false, "label": "/modules/blockfacebook/blockfacebook.js-147", "isController": false}, {"data": [[3.0, 82.0]], "isOverall": false, "label": "/modules/blockfacebook/blockfacebook.js-147-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/img/p/1/6/16-small_default.jpg-15", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/img/p/1/6/16-small_default.jpg-15-Aggregated", "isController": false}, {"data": [[3.0, 89.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-3.jpg-162", "isController": false}, {"data": [[3.0, 89.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-3.jpg-162-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.total-storage.min.js-142", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.total-storage.min.js-142-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-50", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-50-Aggregated", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/-78-51", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/-78-51-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-52", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-52-Aggregated", "isController": false}, {"data": [[3.0, 88.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockcart/ajax-cart.js-138", "isController": false}, {"data": [[3.0, 88.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockcart/ajax-cart.js-138-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-53", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-53-Aggregated", "isController": false}, {"data": [[3.0, 84.5]], "isOverall": false, "label": "/img/p/1/1-home_default.jpg-166", "isController": false}, {"data": [[3.0, 84.5]], "isOverall": false, "label": "/img/p/1/1-home_default.jpg-166-Aggregated", "isController": false}, {"data": [[3.0, 149.0]], "isOverall": false, "label": "/-78-54", "isController": false}, {"data": [[3.0, 149.0]], "isOverall": false, "label": "/-78-54-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-55", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-55-Aggregated", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-56", "isController": false}, {"data": [[3.0, 89.0]], "isOverall": false, "label": "/-78-56-Aggregated", "isController": false}, {"data": [[3.0, 1837.0]], "isOverall": false, "label": "/index.php-102 (choose product)", "isController": false}, {"data": [[3.0, 1837.0]], "isOverall": false, "label": "/index.php-102 (choose product)-Aggregated", "isController": false}, {"data": [[3.0, 170.0]], "isOverall": false, "label": "/-78-5", "isController": false}, {"data": [[3.0, 170.0]], "isOverall": false, "label": "/-78-5-Aggregated", "isController": false}, {"data": [[3.0, 167.0]], "isOverall": false, "label": "/-78-46", "isController": false}, {"data": [[3.0, 167.0]], "isOverall": false, "label": "/-78-46-Aggregated", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "/-78-4", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "/-78-4-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-47", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-47-Aggregated", "isController": false}, {"data": [[3.0, 580.0]], "isOverall": false, "label": "/-78-3", "isController": false}, {"data": [[3.0, 580.0]], "isOverall": false, "label": "/-78-3-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-48", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-48-Aggregated", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-2", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-2-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-49", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-49-Aggregated", "isController": false}, {"data": [[3.0, 1395.5]], "isOverall": false, "label": "/-78-1", "isController": false}, {"data": [[3.0, 1395.5]], "isOverall": false, "label": "/-78-1-Aggregated", "isController": false}, {"data": [[3.0, 1560.0]], "isOverall": false, "label": "/index.php?rand=1631139078717-122 (add product to cart)", "isController": false}, {"data": [[3.0, 1560.0]], "isOverall": false, "label": "/index.php?rand=1631139078717-122 (add product to cart)-Aggregated", "isController": false}, {"data": [[3.0, 839.0]], "isOverall": false, "label": "/-78-0", "isController": false}, {"data": [[3.0, 839.0]], "isOverall": false, "label": "/-78-0-Aggregated", "isController": false}, {"data": [[3.0, 89.5]], "isOverall": false, "label": "/js/jquery/plugins/fancybox/jquery.fancybox.js-141", "isController": false}, {"data": [[3.0, 89.5]], "isOverall": false, "label": "/js/jquery/plugins/fancybox/jquery.fancybox.js-141-Aggregated", "isController": false}, {"data": [[3.0, 164.0]], "isOverall": false, "label": "/-78-9", "isController": false}, {"data": [[3.0, 164.0]], "isOverall": false, "label": "/-78-9-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-8", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-8-Aggregated", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/-78-7", "isController": false}, {"data": [[3.0, 90.0]], "isOverall": false, "label": "/-78-7-Aggregated", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-6", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "/-78-6-Aggregated", "isController": false}, {"data": [[1.0, 1650.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137", "isController": false}, {"data": [[1.0, 1650.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Debug Sampler-Aggregated", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "acess my acount-6", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "acess my acount-6-Aggregated", "isController": false}, {"data": [[3.0, 167.0]], "isOverall": false, "label": "acess my acount-7", "isController": false}, {"data": [[3.0, 167.0]], "isOverall": false, "label": "acess my acount-7-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-40", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-40-Aggregated", "isController": false}, {"data": [[3.0, 141.0]], "isOverall": false, "label": "acess my acount-4", "isController": false}, {"data": [[3.0, 141.0]], "isOverall": false, "label": "acess my acount-4-Aggregated", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/-78-41", "isController": false}, {"data": [[3.0, 87.0]], "isOverall": false, "label": "/-78-41-Aggregated", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "acess my acount-5", "isController": false}, {"data": [[3.0, 83.0]], "isOverall": false, "label": "acess my acount-5-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-42", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-42-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "acess my acount-2", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "acess my acount-2-Aggregated", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-43", "isController": false}, {"data": [[3.0, 84.0]], "isOverall": false, "label": "/-78-43-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "acess my acount-3", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "acess my acount-3-Aggregated", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-44", "isController": false}, {"data": [[3.0, 86.0]], "isOverall": false, "label": "/-78-44-Aggregated", "isController": false}, {"data": [[3.0, 343.0]], "isOverall": false, "label": "acess my acount-0", "isController": false}, {"data": [[3.0, 343.0]], "isOverall": false, "label": "acess my acount-0-Aggregated", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-45", "isController": false}, {"data": [[3.0, 85.0]], "isOverall": false, "label": "/-78-45-Aggregated", "isController": false}, {"data": [[3.0, 771.0]], "isOverall": false, "label": "acess my acount-1", "isController": false}, {"data": [[3.0, 771.0]], "isOverall": false, "label": "acess my acount-1-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 3.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 4309.883333333333, "minX": 1.63115016E12, "maxY": 116919.88333333333, "series": [{"data": [[1.63115016E12, 116919.88333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.63115016E12, 4309.883333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.63115016E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.63115016E12, "maxY": 3398.5, "series": [{"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-16", "isController": false}, {"data": [[1.63115016E12, 166.0]], "isOverall": false, "label": "/index.php-102 (choose product)-17", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-126", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-14", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-15", "isController": false}, {"data": [[1.63115016E12, 1237.0]], "isOverall": false, "label": "send user form autentication-1", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-18", "isController": false}, {"data": [[1.63115016E12, 575.0]], "isOverall": false, "label": "send user form autentication-0", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/hoverIntent.js-153", "isController": false}, {"data": [[1.63115016E12, 250.0]], "isOverall": false, "label": "/index.php-102 (choose product)-12", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockwishlist/js/ajax-wishlist.js-152", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-13", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-10", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-11", "isController": false}, {"data": [[1.63115016E12, 729.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-1", "isController": false}, {"data": [[1.63115016E12, 919.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-0", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/10-bootstrap.min.js-137", "isController": false}, {"data": [[1.63115016E12, 112.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.idTabs.js-241", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-70", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-71", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/-78-72", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-73", "isController": false}, {"data": [[1.63115016E12, 92.0]], "isOverall": false, "label": "/-78-74", "isController": false}, {"data": [[1.63115016E12, 169.0]], "isOverall": false, "label": "/-78-75", "isController": false}, {"data": [[1.63115016E12, 169.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/product.css-238", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-68", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-69", "isController": false}, {"data": [[1.63115016E12, 92.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/jquery/uniform/sprite.png-121", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/modules/socialsharing/css/socialsharing.css-239", "isController": false}, {"data": [[1.63115016E12, 126.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img5.jpg-175", "isController": false}, {"data": [[1.63115016E12, 98.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-1.jpg-161", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/js/jquery/plugins/autocomplete/jquery.autocomplete.js-150", "isController": false}, {"data": [[1.63115016E12, 179.0]], "isOverall": false, "label": "/-78-60", "isController": false}, {"data": [[1.63115016E12, 169.0]], "isOverall": false, "label": "/-78-61", "isController": false}, {"data": [[1.63115016E12, 170.0]], "isOverall": false, "label": "/-78-62", "isController": false}, {"data": [[1.63115016E12, 167.0]], "isOverall": false, "label": "/-78-63", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-64", "isController": false}, {"data": [[1.63115016E12, 3092.0]], "isOverall": false, "label": "/index.php?controller=order&multi-shipping=-133", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-65", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-66", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-67", "isController": false}, {"data": [[1.63115016E12, 1715.0]], "isOverall": false, "label": "/index.php-237", "isController": false}, {"data": [[1.63115016E12, 1590.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/1/1-cart_default.jpg-250", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img2.jpg-172", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/p/3/3-cart_default.jpg-252", "isController": false}, {"data": [[1.63115016E12, 737.0]], "isOverall": false, "label": "step (accept terms of use) -> /v1/tiles-132", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/index.js-156", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/9/9-cart_default.jpg-265", "isController": false}, {"data": [[1.63115016E12, 1814.0]], "isOverall": false, "label": "send user form autentication", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/5/5-cart_default.jpg-259", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/superfish-modified.js-154", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/cheque.png-135", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/7/7-cart_default.jpg-260", "isController": false}, {"data": [[1.63115016E12, 601.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136-0", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/8/8-large_default.jpg-263", "isController": false}, {"data": [[1.63115016E12, 1289.0]], "isOverall": false, "label": "/index.php-102 (choose product)-0", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/bankwire.png-134", "isController": false}, {"data": [[1.63115016E12, 92.0]], "isOverall": false, "label": "/index.php-102 (choose product)-2", "isController": false}, {"data": [[1.63115016E12, 343.0]], "isOverall": false, "label": "/index.php-102 (choose product)-1", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/img/p/7/7-large_default.jpg-257", "isController": false}, {"data": [[1.63115016E12, 174.0]], "isOverall": false, "label": "/index.php-102 (choose product)-4", "isController": false}, {"data": [[1.63115016E12, 1706.0]], "isOverall": false, "label": "/index.php-256", "isController": false}, {"data": [[1.63115016E12, 176.0]], "isOverall": false, "label": "/index.php-102 (choose product)-3", "isController": false}, {"data": [[1.63115016E12, 171.0]], "isOverall": false, "label": "/img/c/9-category_default.jpg-188", "isController": false}, {"data": [[1.63115016E12, 88.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/global.js-136", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/my-account.css-94", "isController": false}, {"data": [[1.63115016E12, 85.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.easing.js-134", "isController": false}, {"data": [[1.63115016E12, 253.0]], "isOverall": false, "label": "/index.php-102 (choose product)-6", "isController": false}, {"data": [[1.63115016E12, 171.0]], "isOverall": false, "label": "/index.php-102 (choose product)-5", "isController": false}, {"data": [[1.63115016E12, 1925.0]], "isOverall": false, "label": "/index.php-131", "isController": false}, {"data": [[1.63115016E12, 91.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/tools/treeManagement.js-146", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-8", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-7", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-9", "isController": false}, {"data": [[1.63115016E12, 130.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img6.jpg-164", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/favicon.ico-178", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/icon/form-ok.png-91", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/modules/sendtoafriend/sendtoafriend.css-240", "isController": false}, {"data": [[1.63115016E12, 1105.0]], "isOverall": false, "label": "step (address) -> /index.php-127", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/js/tools.js-135", "isController": false}, {"data": [[1.63115016E12, 3229.0]], "isOverall": false, "label": "/index.php-262", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/modules/socialsharing/js/socialsharing.js-243", "isController": false}, {"data": [[1.63115016E12, 1566.0]], "isOverall": false, "label": "/index.php-30", "isController": false}, {"data": [[1.63115016E12, 1360.0]], "isOverall": false, "label": "/index.php-29", "isController": false}, {"data": [[1.63115016E12, 855.0]], "isOverall": false, "label": "/index.php-28", "isController": false}, {"data": [[1.63115016E12, 1802.0]], "isOverall": false, "label": "/index.php-27", "isController": false}, {"data": [[1.63115016E12, 1134.0]], "isOverall": false, "label": "/index.php-26", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.textareaCounter.plugin.js-246", "isController": false}, {"data": [[1.63115016E12, 774.0]], "isOverall": false, "label": "/index.php-25", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/8/8-medium_default.jpg-266", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/logo.jpg-158", "isController": false}, {"data": [[1.63115016E12, 150.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocklayered/blocklayered.js-185", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocknewsletter/blocknewsletter.js-148", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img4.jpg-174", "isController": false}, {"data": [[1.63115016E12, 91.0]], "isOverall": false, "label": "/img/p/1/2/12-home_default.jpg-176", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/img/p/2/2-large_default.jpg-18", "isController": false}, {"data": [[1.63115016E12, 1001.0]], "isOverall": false, "label": "step (address) -> /index.php-127-0", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "step (address) -> /index.php-127-1", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/products-comparison.js-140", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/c/3-1_thumb.jpg-160", "isController": false}, {"data": [[1.63115016E12, 1020.0]], "isOverall": false, "label": "/index.php-10", "isController": false}, {"data": [[1.63115016E12, 170.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-2.jpg-163", "isController": false}, {"data": [[1.63115016E12, 127.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img1.jpg-170", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/blocktopmenu.js-155", "isController": false}, {"data": [[1.63115016E12, 865.0]], "isOverall": false, "label": "open the order -> /index.php-259", "isController": false}, {"data": [[1.63115016E12, 1163.0]], "isOverall": false, "label": "/index.php-187", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-12", "isController": false}, {"data": [[1.63115016E12, 1335.0]], "isOverall": false, "label": "/index.php-189", "isController": false}, {"data": [[1.63115016E12, 3398.5]], "isOverall": false, "label": "/-78", "isController": false}, {"data": [[1.63115016E12, 82.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/homeslider/js/homeslider.js-151", "isController": false}, {"data": [[1.63115016E12, 1714.0]], "isOverall": false, "label": "/index.php-17", "isController": false}, {"data": [[1.63115016E12, 1146.0]], "isOverall": false, "label": "/index.php-11", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/7/7-medium_default.jpg-261", "isController": false}, {"data": [[1.63115016E12, 1483.0]], "isOverall": false, "label": "/index.php-183", "isController": false}, {"data": [[1.63115016E12, 1666.0]], "isOverall": false, "label": "/index.php-186", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-13", "isController": false}, {"data": [[1.63115016E12, 95.0]], "isOverall": false, "label": "/-78-14", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-15", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/2/2-cart_default.jpg-251", "isController": false}, {"data": [[1.63115016E12, 99.0]], "isOverall": false, "label": "/-78-16", "isController": false}, {"data": [[1.63115016E12, 171.0]], "isOverall": false, "label": "/img/c/11-category_default.jpg-190", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-17", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-18", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/sendtoafriend/sendtoafriend.js-245", "isController": false}, {"data": [[1.63115016E12, 82.0]], "isOverall": false, "label": "/-78-19", "isController": false}, {"data": [[1.63115016E12, 92.0]], "isOverall": false, "label": "/img/p/1/0/10-home_default.jpg-171", "isController": false}, {"data": [[1.63115016E12, 169.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/product.js-242", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/js/jquery/jquery-migrate-1.2.1.min.js-133", "isController": false}, {"data": [[1.63115016E12, 1325.0]], "isOverall": false, "label": "acess my acount", "isController": false}, {"data": [[1.63115016E12, 168.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img7.jpg-165", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/img/p/1/1-large_default.jpg-249", "isController": false}, {"data": [[1.63115016E12, 111.0]], "isOverall": false, "label": "/-78-10", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/1/6/16-home_default.jpg-177", "isController": false}, {"data": [[1.63115016E12, 94.0]], "isOverall": false, "label": "/-78-11", "isController": false}, {"data": [[1.63115016E12, 172.0]], "isOverall": false, "label": "/js/jquery/jquery-1.11.0.min.js-132", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/-78-12", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/4/4-cart_default.jpg-254", "isController": false}, {"data": [[1.63115016E12, 93.0]], "isOverall": false, "label": "/img/p/6/6-cart_default.jpg-258", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/img/p/8/8-cart_default.jpg-264", "isController": false}, {"data": [[1.63115016E12, 1484.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-0", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-1", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-2", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/productcomments/js/productcomments.js-247", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocksearch/blocksearch.js-149", "isController": false}, {"data": [[1.63115016E12, 116.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.scrollTo.js-143", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.rating.pack.js-244", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-35", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-36", "isController": false}, {"data": [[1.63115016E12, 169.0]], "isOverall": false, "label": "/-78-37", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-38", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/img/p/8/8-home_default.jpg-168", "isController": false}, {"data": [[1.63115016E12, 93.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/print.css-248", "isController": false}, {"data": [[1.63115016E12, 166.0]], "isOverall": false, "label": "/-78-39", "isController": false}, {"data": [[1.63115016E12, 36.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-3", "isController": false}, {"data": [[1.63115016E12, 253.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-2", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-1", "isController": false}, {"data": [[1.63115016E12, 1120.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-0", "isController": false}, {"data": [[1.63115016E12, 86.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.serialScroll.js-144", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img3.jpg-173", "isController": false}, {"data": [[1.63115016E12, 1391.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/category.js-184", "isController": false}, {"data": [[1.63115016E12, 95.0]], "isOverall": false, "label": "/-78-30", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-31", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-32", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/-78-33", "isController": false}, {"data": [[1.63115016E12, 166.0]], "isOverall": false, "label": "/-78-34", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-24", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-25", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-26", "isController": false}, {"data": [[1.63115016E12, 131.0]], "isOverall": false, "label": "/-78-27", "isController": false}, {"data": [[1.63115016E12, 126.0]], "isOverall": false, "label": "/js/jquery/plugins/bxslider/jquery.bxslider.js-145", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-28", "isController": false}, {"data": [[1.63115016E12, 87.5]], "isOverall": false, "label": "/img/p/2/0/20-home_default.jpg-169", "isController": false}, {"data": [[1.63115016E12, 324.0]], "isOverall": false, "label": "/-78-29", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/8/8-small_default.jpg-14", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/modules/blockbanner/img/sale70.png-157", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.uniform-modified.js-139", "isController": false}, {"data": [[1.63115016E12, 97.0]], "isOverall": false, "label": "/img/p/1/0/10-small_default.jpg-16", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/p/7/7-small_default.jpg-13", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/modules/productpaymentlogos/img/payment-logo.png-253", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/7/7-home_default.jpg-167", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/img/c/3-0_thumb.jpg-159", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-20", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-21", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-22", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-23", "isController": false}, {"data": [[1.63115016E12, 94.0]], "isOverall": false, "label": "/-78-57", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-58", "isController": false}, {"data": [[1.63115016E12, 601.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136", "isController": false}, {"data": [[1.63115016E12, 253.0]], "isOverall": false, "label": "/-78-59", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/img/p/1/1-medium_default.jpg-255", "isController": false}, {"data": [[1.63115016E12, 82.0]], "isOverall": false, "label": "/modules/blockfacebook/blockfacebook.js-147", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/img/p/1/6/16-small_default.jpg-15", "isController": false}, {"data": [[1.63115016E12, 89.5]], "isOverall": false, "label": "/modules/homeslider/images/sample-3.jpg-162", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.total-storage.min.js-142", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-50", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/-78-51", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-52", "isController": false}, {"data": [[1.63115016E12, 88.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockcart/ajax-cart.js-138", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-53", "isController": false}, {"data": [[1.63115016E12, 84.5]], "isOverall": false, "label": "/img/p/1/1-home_default.jpg-166", "isController": false}, {"data": [[1.63115016E12, 149.0]], "isOverall": false, "label": "/-78-54", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-55", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-56", "isController": false}, {"data": [[1.63115016E12, 1837.0]], "isOverall": false, "label": "/index.php-102 (choose product)", "isController": false}, {"data": [[1.63115016E12, 170.0]], "isOverall": false, "label": "/-78-5", "isController": false}, {"data": [[1.63115016E12, 167.0]], "isOverall": false, "label": "/-78-46", "isController": false}, {"data": [[1.63115016E12, 171.0]], "isOverall": false, "label": "/-78-4", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-47", "isController": false}, {"data": [[1.63115016E12, 580.0]], "isOverall": false, "label": "/-78-3", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-48", "isController": false}, {"data": [[1.63115016E12, 169.0]], "isOverall": false, "label": "/-78-2", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-49", "isController": false}, {"data": [[1.63115016E12, 1395.5]], "isOverall": false, "label": "/-78-1", "isController": false}, {"data": [[1.63115016E12, 1560.0]], "isOverall": false, "label": "/index.php?rand=1631139078717-122 (add product to cart)", "isController": false}, {"data": [[1.63115016E12, 839.0]], "isOverall": false, "label": "/-78-0", "isController": false}, {"data": [[1.63115016E12, 89.5]], "isOverall": false, "label": "/js/jquery/plugins/fancybox/jquery.fancybox.js-141", "isController": false}, {"data": [[1.63115016E12, 164.0]], "isOverall": false, "label": "/-78-9", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-8", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/-78-7", "isController": false}, {"data": [[1.63115016E12, 169.0]], "isOverall": false, "label": "/-78-6", "isController": false}, {"data": [[1.63115016E12, 1650.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137", "isController": false}, {"data": [[1.63115016E12, 1.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "acess my acount-6", "isController": false}, {"data": [[1.63115016E12, 167.0]], "isOverall": false, "label": "acess my acount-7", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-40", "isController": false}, {"data": [[1.63115016E12, 141.0]], "isOverall": false, "label": "acess my acount-4", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/-78-41", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "acess my acount-5", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-42", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "acess my acount-2", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-43", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "acess my acount-3", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-44", "isController": false}, {"data": [[1.63115016E12, 343.0]], "isOverall": false, "label": "acess my acount-0", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-45", "isController": false}, {"data": [[1.63115016E12, 771.0]], "isOverall": false, "label": "acess my acount-1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.63115016E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.63115016E12, "maxY": 3008.0, "series": [{"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-16", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-17", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-126", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-14", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-15", "isController": false}, {"data": [[1.63115016E12, 1153.0]], "isOverall": false, "label": "send user form autentication-1", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-18", "isController": false}, {"data": [[1.63115016E12, 575.0]], "isOverall": false, "label": "send user form autentication-0", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/hoverIntent.js-153", "isController": false}, {"data": [[1.63115016E12, 166.0]], "isOverall": false, "label": "/index.php-102 (choose product)-12", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockwishlist/js/ajax-wishlist.js-152", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-13", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-10", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-11", "isController": false}, {"data": [[1.63115016E12, 645.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-1", "isController": false}, {"data": [[1.63115016E12, 919.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-0", "isController": false}, {"data": [[1.63115016E12, 84.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/10-bootstrap.min.js-137", "isController": false}, {"data": [[1.63115016E12, 112.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.idTabs.js-241", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-70", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-71", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-72", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-73", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/-78-74", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/-78-75", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/product.css-238", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-68", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-69", "isController": false}, {"data": [[1.63115016E12, 92.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/jquery/uniform/sprite.png-121", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/modules/socialsharing/css/socialsharing.css-239", "isController": false}, {"data": [[1.63115016E12, 82.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img5.jpg-175", "isController": false}, {"data": [[1.63115016E12, 93.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-1.jpg-161", "isController": false}, {"data": [[1.63115016E12, 82.5]], "isOverall": false, "label": "/js/jquery/plugins/autocomplete/jquery.autocomplete.js-150", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-60", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-61", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-62", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/-78-63", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-64", "isController": false}, {"data": [[1.63115016E12, 3008.0]], "isOverall": false, "label": "/index.php?controller=order&multi-shipping=-133", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-65", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-66", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-67", "isController": false}, {"data": [[1.63115016E12, 1469.0]], "isOverall": false, "label": "/index.php-237", "isController": false}, {"data": [[1.63115016E12, 1399.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/1/1-cart_default.jpg-250", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img2.jpg-172", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/p/3/3-cart_default.jpg-252", "isController": false}, {"data": [[1.63115016E12, 737.0]], "isOverall": false, "label": "step (accept terms of use) -> /v1/tiles-132", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/index.js-156", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/9/9-cart_default.jpg-265", "isController": false}, {"data": [[1.63115016E12, 575.0]], "isOverall": false, "label": "send user form autentication", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/5/5-cart_default.jpg-259", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/superfish-modified.js-154", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/cheque.png-135", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/p/7/7-cart_default.jpg-260", "isController": false}, {"data": [[1.63115016E12, 518.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136-0", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/8/8-large_default.jpg-263", "isController": false}, {"data": [[1.63115016E12, 1122.0]], "isOverall": false, "label": "/index.php-102 (choose product)-0", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/bankwire.png-134", "isController": false}, {"data": [[1.63115016E12, 92.0]], "isOverall": false, "label": "/index.php-102 (choose product)-2", "isController": false}, {"data": [[1.63115016E12, 175.0]], "isOverall": false, "label": "/index.php-102 (choose product)-1", "isController": false}, {"data": [[1.63115016E12, 82.0]], "isOverall": false, "label": "/img/p/7/7-large_default.jpg-257", "isController": false}, {"data": [[1.63115016E12, 174.0]], "isOverall": false, "label": "/index.php-102 (choose product)-4", "isController": false}, {"data": [[1.63115016E12, 1463.0]], "isOverall": false, "label": "/index.php-256", "isController": false}, {"data": [[1.63115016E12, 175.0]], "isOverall": false, "label": "/index.php-102 (choose product)-3", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/img/c/9-category_default.jpg-188", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/global.js-136", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/my-account.css-94", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.easing.js-134", "isController": false}, {"data": [[1.63115016E12, 168.0]], "isOverall": false, "label": "/index.php-102 (choose product)-6", "isController": false}, {"data": [[1.63115016E12, 171.0]], "isOverall": false, "label": "/index.php-102 (choose product)-5", "isController": false}, {"data": [[1.63115016E12, 1673.5]], "isOverall": false, "label": "/index.php-131", "isController": false}, {"data": [[1.63115016E12, 91.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/tools/treeManagement.js-146", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-8", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-7", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/index.php-102 (choose product)-9", "isController": false}, {"data": [[1.63115016E12, 86.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img6.jpg-164", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/favicon.ico-178", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/icon/form-ok.png-91", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/modules/sendtoafriend/sendtoafriend.css-240", "isController": false}, {"data": [[1.63115016E12, 920.0]], "isOverall": false, "label": "step (address) -> /index.php-127", "isController": false}, {"data": [[1.63115016E12, 88.5]], "isOverall": false, "label": "/js/tools.js-135", "isController": false}, {"data": [[1.63115016E12, 2980.0]], "isOverall": false, "label": "/index.php-262", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/modules/socialsharing/js/socialsharing.js-243", "isController": false}, {"data": [[1.63115016E12, 1319.0]], "isOverall": false, "label": "/index.php-30", "isController": false}, {"data": [[1.63115016E12, 1109.0]], "isOverall": false, "label": "/index.php-29", "isController": false}, {"data": [[1.63115016E12, 606.0]], "isOverall": false, "label": "/index.php-28", "isController": false}, {"data": [[1.63115016E12, 1465.0]], "isOverall": false, "label": "/index.php-27", "isController": false}, {"data": [[1.63115016E12, 1092.0]], "isOverall": false, "label": "/index.php-26", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.textareaCounter.plugin.js-246", "isController": false}, {"data": [[1.63115016E12, 751.0]], "isOverall": false, "label": "/index.php-25", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/8/8-medium_default.jpg-266", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/logo.jpg-158", "isController": false}, {"data": [[1.63115016E12, 149.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocklayered/blocklayered.js-185", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocknewsletter/blocknewsletter.js-148", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img4.jpg-174", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/img/p/1/2/12-home_default.jpg-176", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/img/p/2/2-large_default.jpg-18", "isController": false}, {"data": [[1.63115016E12, 920.0]], "isOverall": false, "label": "step (address) -> /index.php-127-0", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "step (address) -> /index.php-127-1", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/products-comparison.js-140", "isController": false}, {"data": [[1.63115016E12, 84.5]], "isOverall": false, "label": "/img/c/3-1_thumb.jpg-160", "isController": false}, {"data": [[1.63115016E12, 980.0]], "isOverall": false, "label": "/index.php-10", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-2.jpg-163", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img1.jpg-170", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/blocktopmenu.js-155", "isController": false}, {"data": [[1.63115016E12, 845.0]], "isOverall": false, "label": "open the order -> /index.php-259", "isController": false}, {"data": [[1.63115016E12, 995.0]], "isOverall": false, "label": "/index.php-187", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-12", "isController": false}, {"data": [[1.63115016E12, 1087.0]], "isOverall": false, "label": "/index.php-189", "isController": false}, {"data": [[1.63115016E12, 839.0]], "isOverall": false, "label": "/-78", "isController": false}, {"data": [[1.63115016E12, 81.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/homeslider/js/homeslider.js-151", "isController": false}, {"data": [[1.63115016E12, 1464.0]], "isOverall": false, "label": "/index.php-17", "isController": false}, {"data": [[1.63115016E12, 895.0]], "isOverall": false, "label": "/index.php-11", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/7/7-medium_default.jpg-261", "isController": false}, {"data": [[1.63115016E12, 1315.0]], "isOverall": false, "label": "/index.php-183", "isController": false}, {"data": [[1.63115016E12, 1415.0]], "isOverall": false, "label": "/index.php-186", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-13", "isController": false}, {"data": [[1.63115016E12, 95.0]], "isOverall": false, "label": "/-78-14", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-15", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/2/2-cart_default.jpg-251", "isController": false}, {"data": [[1.63115016E12, 99.0]], "isOverall": false, "label": "/-78-16", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/c/11-category_default.jpg-190", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-17", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-18", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/sendtoafriend/sendtoafriend.js-245", "isController": false}, {"data": [[1.63115016E12, 82.0]], "isOverall": false, "label": "/-78-19", "isController": false}, {"data": [[1.63115016E12, 85.5]], "isOverall": false, "label": "/img/p/1/0/10-home_default.jpg-171", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/product.js-242", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/js/jquery/jquery-migrate-1.2.1.min.js-133", "isController": false}, {"data": [[1.63115016E12, 343.0]], "isOverall": false, "label": "acess my acount", "isController": false}, {"data": [[1.63115016E12, 126.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img7.jpg-165", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/img/p/1/1-large_default.jpg-249", "isController": false}, {"data": [[1.63115016E12, 110.0]], "isOverall": false, "label": "/-78-10", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/1/6/16-home_default.jpg-177", "isController": false}, {"data": [[1.63115016E12, 94.0]], "isOverall": false, "label": "/-78-11", "isController": false}, {"data": [[1.63115016E12, 84.5]], "isOverall": false, "label": "/js/jquery/jquery-1.11.0.min.js-132", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/-78-12", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/4/4-cart_default.jpg-254", "isController": false}, {"data": [[1.63115016E12, 93.0]], "isOverall": false, "label": "/img/p/6/6-cart_default.jpg-258", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/img/p/8/8-cart_default.jpg-264", "isController": false}, {"data": [[1.63115016E12, 1399.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-0", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-1", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-2", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/productcomments/js/productcomments.js-247", "isController": false}, {"data": [[1.63115016E12, 83.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocksearch/blocksearch.js-149", "isController": false}, {"data": [[1.63115016E12, 116.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.scrollTo.js-143", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.rating.pack.js-244", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-35", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-36", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-37", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-38", "isController": false}, {"data": [[1.63115016E12, 86.5]], "isOverall": false, "label": "/img/p/8/8-home_default.jpg-168", "isController": false}, {"data": [[1.63115016E12, 93.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/print.css-248", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-39", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-3", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-2", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-1", "isController": false}, {"data": [[1.63115016E12, 954.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-0", "isController": false}, {"data": [[1.63115016E12, 86.5]], "isOverall": false, "label": "/js/jquery/plugins/jquery.serialScroll.js-144", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img3.jpg-173", "isController": false}, {"data": [[1.63115016E12, 954.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/category.js-184", "isController": false}, {"data": [[1.63115016E12, 94.0]], "isOverall": false, "label": "/-78-30", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-31", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-32", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-33", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-34", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-24", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-25", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-26", "isController": false}, {"data": [[1.63115016E12, 131.0]], "isOverall": false, "label": "/-78-27", "isController": false}, {"data": [[1.63115016E12, 126.0]], "isOverall": false, "label": "/js/jquery/plugins/bxslider/jquery.bxslider.js-145", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-28", "isController": false}, {"data": [[1.63115016E12, 87.5]], "isOverall": false, "label": "/img/p/2/0/20-home_default.jpg-169", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-29", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/img/p/8/8-small_default.jpg-14", "isController": false}, {"data": [[1.63115016E12, 82.5]], "isOverall": false, "label": "/modules/blockbanner/img/sale70.png-157", "isController": false}, {"data": [[1.63115016E12, 84.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.uniform-modified.js-139", "isController": false}, {"data": [[1.63115016E12, 97.0]], "isOverall": false, "label": "/img/p/1/0/10-small_default.jpg-16", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/p/7/7-small_default.jpg-13", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/modules/productpaymentlogos/img/payment-logo.png-253", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/img/p/7/7-home_default.jpg-167", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/img/c/3-0_thumb.jpg-159", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-20", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-21", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-22", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-23", "isController": false}, {"data": [[1.63115016E12, 93.0]], "isOverall": false, "label": "/-78-57", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-58", "isController": false}, {"data": [[1.63115016E12, 518.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-59", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/img/p/1/1-medium_default.jpg-255", "isController": false}, {"data": [[1.63115016E12, 82.0]], "isOverall": false, "label": "/modules/blockfacebook/blockfacebook.js-147", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/img/p/1/6/16-small_default.jpg-15", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-3.jpg-162", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.total-storage.min.js-142", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-50", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-51", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-52", "isController": false}, {"data": [[1.63115016E12, 86.5]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockcart/ajax-cart.js-138", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-53", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/img/p/1/1-home_default.jpg-166", "isController": false}, {"data": [[1.63115016E12, 148.0]], "isOverall": false, "label": "/-78-54", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-55", "isController": false}, {"data": [[1.63115016E12, 89.0]], "isOverall": false, "label": "/-78-56", "isController": false}, {"data": [[1.63115016E12, 1122.0]], "isOverall": false, "label": "/index.php-102 (choose product)", "isController": false}, {"data": [[1.63115016E12, 170.0]], "isOverall": false, "label": "/-78-5", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-46", "isController": false}, {"data": [[1.63115016E12, 171.0]], "isOverall": false, "label": "/-78-4", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-47", "isController": false}, {"data": [[1.63115016E12, 172.0]], "isOverall": false, "label": "/-78-3", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-48", "isController": false}, {"data": [[1.63115016E12, 169.0]], "isOverall": false, "label": "/-78-2", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-49", "isController": false}, {"data": [[1.63115016E12, 1149.5]], "isOverall": false, "label": "/-78-1", "isController": false}, {"data": [[1.63115016E12, 1499.0]], "isOverall": false, "label": "/index.php?rand=1631139078717-122 (add product to cart)", "isController": false}, {"data": [[1.63115016E12, 839.0]], "isOverall": false, "label": "/-78-0", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/js/jquery/plugins/fancybox/jquery.fancybox.js-141", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "/-78-9", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-8", "isController": false}, {"data": [[1.63115016E12, 90.0]], "isOverall": false, "label": "/-78-7", "isController": false}, {"data": [[1.63115016E12, 168.0]], "isOverall": false, "label": "/-78-6", "isController": false}, {"data": [[1.63115016E12, 919.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "acess my acount-6", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "acess my acount-7", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-40", "isController": false}, {"data": [[1.63115016E12, 141.0]], "isOverall": false, "label": "acess my acount-4", "isController": false}, {"data": [[1.63115016E12, 87.0]], "isOverall": false, "label": "/-78-41", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "acess my acount-5", "isController": false}, {"data": [[1.63115016E12, 83.0]], "isOverall": false, "label": "/-78-42", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "acess my acount-2", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-43", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "acess my acount-3", "isController": false}, {"data": [[1.63115016E12, 86.0]], "isOverall": false, "label": "/-78-44", "isController": false}, {"data": [[1.63115016E12, 343.0]], "isOverall": false, "label": "acess my acount-0", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-45", "isController": false}, {"data": [[1.63115016E12, 605.0]], "isOverall": false, "label": "acess my acount-1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.63115016E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.63115016E12, "maxY": 513.0, "series": [{"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-16", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-17", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-126", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-14", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-15", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "send user form autentication-1", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-18", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "send user form autentication-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/hoverIntent.js-153", "isController": false}, {"data": [[1.63115016E12, 81.0]], "isOverall": false, "label": "/index.php-102 (choose product)-12", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockwishlist/js/ajax-wishlist.js-152", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-13", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-10", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-11", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-1", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/10-bootstrap.min.js-137", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.idTabs.js-241", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-70", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-71", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-72", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-73", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-74", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-75", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/product.css-238", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-68", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-69", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/jquery/uniform/sprite.png-121", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/socialsharing/css/socialsharing.css-239", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img5.jpg-175", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-1.jpg-161", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/plugins/autocomplete/jquery.autocomplete.js-150", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-60", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-61", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-62", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-63", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-64", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php?controller=order&multi-shipping=-133", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-65", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-66", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-67", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-237", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/1-cart_default.jpg-250", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img2.jpg-172", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/3/3-cart_default.jpg-252", "isController": false}, {"data": [[1.63115016E12, 513.0]], "isOverall": false, "label": "step (accept terms of use) -> /v1/tiles-132", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/index.js-156", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/9/9-cart_default.jpg-265", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "send user form autentication", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/5/5-cart_default.jpg-259", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/superfish-modified.js-154", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/cheque.png-135", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/7/7-cart_default.jpg-260", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/8/8-large_default.jpg-263", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/bankwire.png-134", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-2", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-1", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/7/7-large_default.jpg-257", "isController": false}, {"data": [[1.63115016E12, 81.0]], "isOverall": false, "label": "/index.php-102 (choose product)-4", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-256", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/index.php-102 (choose product)-3", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/c/9-category_default.jpg-188", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/global.js-136", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/my-account.css-94", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.easing.js-134", "isController": false}, {"data": [[1.63115016E12, 80.0]], "isOverall": false, "label": "/index.php-102 (choose product)-6", "isController": false}, {"data": [[1.63115016E12, 80.0]], "isOverall": false, "label": "/index.php-102 (choose product)-5", "isController": false}, {"data": [[1.63115016E12, 338.0]], "isOverall": false, "label": "/index.php-131", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/tools/treeManagement.js-146", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-8", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-7", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)-9", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img6.jpg-164", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/favicon.ico-178", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/img/icon/form-ok.png-91", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/sendtoafriend/sendtoafriend.css-240", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (address) -> /index.php-127", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/tools.js-135", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-262", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/socialsharing/js/socialsharing.js-243", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-30", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-29", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-28", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-27", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-26", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.textareaCounter.plugin.js-246", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-25", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/8/8-medium_default.jpg-266", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/logo.jpg-158", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocklayered/blocklayered.js-185", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocknewsletter/blocknewsletter.js-148", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img4.jpg-174", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/2/12-home_default.jpg-176", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/2/2-large_default.jpg-18", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (address) -> /index.php-127-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (address) -> /index.php-127-1", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/products-comparison.js-140", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/c/3-1_thumb.jpg-160", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-10", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-2.jpg-163", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img1.jpg-170", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/blocktopmenu.js-155", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "open the order -> /index.php-259", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-187", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-12", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-189", "isController": false}, {"data": [[1.63115016E12, 168.0]], "isOverall": false, "label": "/-78", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/homeslider/js/homeslider.js-151", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-17", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-11", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/7/7-medium_default.jpg-261", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-183", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-186", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-13", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-14", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-15", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/2/2-cart_default.jpg-251", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-16", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/c/11-category_default.jpg-190", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-17", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-18", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/sendtoafriend/sendtoafriend.js-245", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-19", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/0/10-home_default.jpg-171", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/product.js-242", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/jquery-migrate-1.2.1.min.js-133", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount", "isController": false}, {"data": [[1.63115016E12, 40.5]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img7.jpg-165", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/1-large_default.jpg-249", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-10", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/6/16-home_default.jpg-177", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-11", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/jquery-1.11.0.min.js-132", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-12", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/4/4-cart_default.jpg-254", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/6/6-cart_default.jpg-258", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/8/8-cart_default.jpg-264", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-1", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-2", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/productcomments/js/productcomments.js-247", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocksearch/blocksearch.js-149", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.scrollTo.js-143", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/productcomments/js/jquery.rating.pack.js-244", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-35", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-36", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-37", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-38", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/8/8-home_default.jpg-168", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/css/print.css-248", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-39", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-3", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-2", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-1", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/plugins/jquery.serialScroll.js-144", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img3.jpg-173", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "proceed to purchase -> /index.php-123", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/category.js-184", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-30", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-31", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-32", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-33", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-34", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-24", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-25", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-26", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-27", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/plugins/bxslider/jquery.bxslider.js-145", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-28", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/2/0/20-home_default.jpg-169", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-29", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/8/8-small_default.jpg-14", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/blockbanner/img/sale70.png-157", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.uniform-modified.js-139", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/0/10-small_default.jpg-16", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/7/7-small_default.jpg-13", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/productpaymentlogos/img/payment-logo.png-253", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/7/7-home_default.jpg-167", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/c/3-0_thumb.jpg-159", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-20", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-21", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-22", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-23", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-57", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-58", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "step (payment method) -> /index.php-136", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-59", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/1-medium_default.jpg-255", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/blockfacebook/blockfacebook.js-147", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/6/16-small_default.jpg-15", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/modules/homeslider/images/sample-3.jpg-162", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.total-storage.min.js-142", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-50", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-51", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-52", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockcart/ajax-cart.js-138", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-53", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/img/p/1/1-home_default.jpg-166", "isController": false}, {"data": [[1.63115016E12, 48.0]], "isOverall": false, "label": "/-78-54", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-55", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-56", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php-102 (choose product)", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-5", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-46", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-4", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-47", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-3", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-48", "isController": false}, {"data": [[1.63115016E12, 85.0]], "isOverall": false, "label": "/-78-2", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-49", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-1", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/index.php?rand=1631139078717-122 (add product to cart)", "isController": false}, {"data": [[1.63115016E12, 168.0]], "isOverall": false, "label": "/-78-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/js/jquery/plugins/fancybox/jquery.fancybox.js-141", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-9", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-8", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-7", "isController": false}, {"data": [[1.63115016E12, 84.0]], "isOverall": false, "label": "/-78-6", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "Debug Sampler", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount-6", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount-7", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-40", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount-4", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-41", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount-5", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-42", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount-2", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-43", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount-3", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-44", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount-0", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "/-78-45", "isController": false}, {"data": [[1.63115016E12, 0.0]], "isOverall": false, "label": "acess my acount-1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.63115016E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.63115016E12, "maxY": 4709.0, "series": [{"data": [[1.63115016E12, 4709.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.63115016E12, 1136.3999999999999]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.63115016E12, 3108.4400000000005]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.63115016E12, 1659.5999999999995]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.63115016E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.63115016E12, 88.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.63115016E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 85.0, "minX": 1.0, "maxY": 1500.5, "series": [{"data": [[2.0, 601.0], [8.0, 86.0], [9.0, 89.0], [10.0, 87.0], [11.0, 90.0], [46.0, 89.0], [3.0, 1500.5], [13.0, 90.0], [65.0, 85.0], [1.0, 1239.5], [4.0, 797.0], [5.0, 1237.0], [24.0, 129.0], [6.0, 90.0], [27.0, 88.0], [7.0, 90.5], [29.0, 87.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[13.0, 713.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 65.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 85.0, "minX": 1.0, "maxY": 1209.0, "series": [{"data": [[2.0, 518.0], [8.0, 85.5], [9.0, 89.0], [10.0, 85.0], [11.0, 87.0], [46.0, 86.0], [3.0, 1089.5], [13.0, 87.0], [65.0, 85.0], [1.0, 1209.0], [4.0, 745.0], [5.0, 980.0], [24.0, 89.5], [6.0, 90.0], [27.0, 86.0], [7.0, 90.0], [29.0, 86.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[13.0, 477.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 65.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 4.816666666666666, "minX": 1.63115016E12, "maxY": 4.816666666666666, "series": [{"data": [[1.63115016E12, 4.816666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.63115016E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.63115016E12, "maxY": 4.716666666666667, "series": [{"data": [[1.63115016E12, 4.716666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.63115016E12, 0.08333333333333333]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.63115016E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.63115016E12, "maxY": 0.03333333333333333, "series": [{"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-9-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-55-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-4-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-3-failure", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (address) -> /index.php-127-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/superfish-modified.js-154-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/js/jquery/plugins/jquery.idTabs.js-241-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-46-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-14-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-1-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-14-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/6/6-cart_default.jpg-258-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-11-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-32-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/10-bootstrap.min.js-137-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-17-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img7.jpg-165-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "send user form autentication-1-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/p/1/6/16-home_default.jpg-177-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (address) -> /index.php-127-1-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-126-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-20-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (payment method) -> /index.php-136-0-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-69-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img6.jpg-164-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-1-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-30-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/p/2/0/20-home_default.jpg-169-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-70-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocklayered/blocklayered.js-185-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/img/bankwire.png-134-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img4.jpg-174-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-26-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/homeslider/images/sample-1.jpg-161-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-11-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-183-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-73-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-43-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-4-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-9-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/blockbanner/img/sale70.png-157-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-4-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/1/1-medium_default.jpg-255-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/c/3-0_thumb.jpg-159-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/img/cheque.png-135-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/1/6/16-small_default.jpg-15-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img3.jpg-173-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-2-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/tools/treeManagement.js-146-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-61-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-7-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/jquery/jquery-migrate-1.2.1.min.js-133-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/-78-1-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/css/product.css-238-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-64-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img2.jpg-172-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/2/2-cart_default.jpg-251-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/7/7-medium_default.jpg-261-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-52-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-35-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/7/7-cart_default.jpg-260-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/jquery/plugins/bxslider/jquery.bxslider.js-145-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-23-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/img/icon/form-ok.png-91-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/jquery/plugins/jquery.serialScroll.js-144-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-26-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-40-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocksearch/blocksearch.js-149-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-6-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-57-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-29-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-12-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-3-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-48-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/-78-0-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-1-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-63-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-17-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "open the order -> /index.php-259-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-16-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/-78-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/modules/productpaymentlogos/img/payment-logo.png-253-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/css/print.css-248-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php?rand=1631139078717-122 (add product to cart)-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-72-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-38-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/tools.js-135-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img1.jpg-170-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-1-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-29-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/sendtoafriend/sendtoafriend.js-245-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/2/2-large_default.jpg-18-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/1/0/10-small_default.jpg-16-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-54-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocknewsletter/blocknewsletter.js-148-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-24-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-3-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/p/7/7-home_default.jpg-167-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-0-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/p/1/0/10-home_default.jpg-171-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-6-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/jquery/plugins/autocomplete/jquery.autocomplete.js-150-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-75-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/c/9-category_default.jpg-188-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-6-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-30-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-13-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-45-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/jquery/plugins/fancybox/jquery.fancybox.js-141-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-10-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/4/4-cart_default.jpg-254-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-33-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "Debug Sampler-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/1/1-small_default.jpg-12-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-0-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/index.php-131-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/1/1-large_default.jpg-249-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-21-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-66-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockwishlist/js/ajax-wishlist.js-152-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/modules/socialsharing/css/socialsharing.css-239-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/8/8-large_default.jpg-263-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/products-comparison.js-140-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-10-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-11-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-42-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-3-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/1/1-cart_default.jpg-250-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-5-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-74-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/modules/socialsharing/js/socialsharing.js-243-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-failure", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-27-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/homeslider/images/sample-2.jpg-163-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-59-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-8-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/img/jquery/uniform/sprite.png-121-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-187-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/blockfacebook/blockfacebook.js-147-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-60-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.uniform-modified.js-139-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-65-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-36-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-51-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-18-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-237-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/favicon.ico-178-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/jquery/plugins/jquery.easing.js-134-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/jquery/plugins/jquery.scrollTo.js-143-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/productcomments/js/productcomments.js-247-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-39-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/index.js-156-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-25-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-56-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-5-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-15-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-15-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-2-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-12-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-47-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/modules/sendtoafriend/sendtoafriend.css-240-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/9/9-cart_default.jpg-265-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (payment method) -> /index.php-136-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-18-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/p/8/8-home_default.jpg-168-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/autoload/15-jquery.total-storage.min.js-142-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (address) -> /index.php-127-0-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/js/product.js-242-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/p/1/1-home_default.jpg-166-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-8-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-68-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-0-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-2-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-28-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/homeslider/js/homeslider.js-151-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "proceed to purchase -> /index.php-123-1-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-7-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/c/3-1_thumb.jpg-160-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/7/7-small_default.jpg-13-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-25-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/modules/productcomments/js/jquery.rating.pack.js-244-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-44-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-5-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php?controller=order&multi-shipping=-133-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-186-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-31-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/c/11-category_default.jpg-190-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-189-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-34-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/js/category.js-184-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/homeslider/images/sample-3.jpg-162-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-67-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-53-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blockcart/ajax-cart.js-138-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-19-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/modules/themeconfigurator/img/banner-img5.jpg-175-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/hoverIntent.js-153-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-22-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (confirm address) -> /index.php?controller=order-129-0-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/modules/blocktopmenu/js/blocktopmenu.js-155-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "step (accept terms of use) -> /v1/tiles-132-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-10-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-27-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/themes/default-bootstrap/css/my-account.css-94-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/8/8-cart_default.jpg-264-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-41-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/5/5-cart_default.jpg-259-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "acess my acount-2-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/3/3-cart_default.jpg-252-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-256-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/js/jquery/jquery-1.11.0.min.js-132-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/8/8-small_default.jpg-14-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-50-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/p/1/2/12-home_default.jpg-176-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-13-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/8/8-medium_default.jpg-266-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-58-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/modules/productcomments/js/jquery.textareaCounter.plugin.js-246-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-2-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-262-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-7-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/img/logo.jpg-158-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-28-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-62-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-49-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "send user form autentication-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "send user form autentication-0-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-16-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "/themes/default-bootstrap/js/global.js-136-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-37-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/index.php-102 (choose product)-17-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/img/p/7/7-large_default.jpg-257-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "/-78-71-success", "isController": false}, {"data": [[1.63115016E12, 0.016666666666666666]], "isOverall": false, "label": "Checkout -> /index.php?fc=module&module=bankwire&controller=validation-137-0-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.63115016E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.63115016E12, "maxY": 4.783333333333333, "series": [{"data": [[1.63115016E12, 4.783333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.63115016E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.63115016E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
