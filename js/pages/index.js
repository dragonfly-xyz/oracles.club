var ws;

$(document).ready(function(e) {
    ws = new WebSocket('wss://api.oracles.club:5678');
    ws.onmessage = function(e) {
        console.log(e);
        $('#price-feed-table-spinner').addClass('d-none');
        var update = JSON.parse(e.data);
        const priceFeedMainSelector = '#price-feed-cards'
        for(var priceFeed in update) {
            var lowerPriceFeed = priceFeed.toLowerCase();
            if($(`#${lowerPriceFeed}-price-table-body`).length === 0) {
                var elem = $(`<div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">${priceFeed}</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Price Feed</th>
                                    <th>Current Value</th>
                                    <th>Last Updated</th>
                                    <th>Previous Value</th>
                                    <th>Historical Data</th>
                                </tr>
                            </thead>
                            <tbody id='${lowerPriceFeed}-price-table-body'>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>`)
                $(priceFeedMainSelector).append(elem);
            }

            var priceFeedUpdate = update[priceFeed];
            var priceFeedTableSelector = `#${lowerPriceFeed}-price-table-body`;

            for(var protocol in priceFeedUpdate) {
                var lowerProtocol = protocol.toLowerCase();
                var rowSelector = `${lowerPriceFeed}-${lowerProtocol}-price-feed`
                var lastUpdatedDate = new Date(priceFeedUpdate[protocol].last_updated * 1000);

                if($(`#${rowSelector}-row`).length === 0) {
                    var elem = $(`<tr id=\'${rowSelector}-row\'>`)
                    .append($(`<td id=\'${rowSelector}-title\'><a href=${lowerProtocol}.html>${protocol}</a></td>`))
                    .append($(`<td id=\'${rowSelector}-cur-price\'>`))
                    .append($(`<td id=\'${rowSelector}-last-updated\'>`))
                    .append($(`<td id=\'${rowSelector}-prev-price\'>`))
                    $(priceFeedTableSelector).append(elem)
                }

                $(`#${rowSelector}-cur-price`).text(priceFeedUpdate[protocol].cur_price.toFixed(2));
                $(`#${rowSelector}-last-updated`).text(lastUpdatedDate.toUTCString());
                $(`#${rowSelector}-prev-price`).text((priceFeedUpdate[protocol].prev_price.toFixed(2)));
            }
        }
    };
    ws.onopen = function(e) {
        console.log("open");
        //console.log(e);
    }
});