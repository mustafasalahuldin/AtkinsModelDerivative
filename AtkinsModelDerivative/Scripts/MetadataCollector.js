var accessToken = 'izkMlHGNslUFMGgUVRhfnacqdNVH';

$(function () {
    $.ajax({
        type: 'GET',
        url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXRraW5zbW9kZWxidWNrZXQvQVRLUmV2aXQyMDE3LnJ2dA/metadata',
        headers: { 'Authorization': 'Bearer ' + accessToken },

        success: function (data) {
            
            var MetaData = '';
            $.each(data, function (i, item) {

                $.each(data[i].metadata, function (j, item) {
                    
                    MetaData += '<div class="row"><div class="col-md-12"><p>' + item.name + '</p><p>' + item.guid + '</p></div></div><hr>';
                })
                });

            $('#services').append(MetaData);

        },

        error: function (msg) {

            alert(msg.responseText);
        }
    });

    $.ajax({
        type: 'GET',
        url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXRraW5zbW9kZWxidWNrZXQvQVRLUmV2aXQyMDE3LnJ2dA/metadata/87b53270-a13c-534d-53f3-ee58d375a8ef/properties',
        headers: { 'Authorization': 'Bearer ' + accessToken },

        success: function (data) {

            var Properties = '';
            
            groupBy = "properties.__category__.Category[1]";

            var categories = [];
            var uniqueCategories = [];

            $.each(data, function (i, item) {

                $.each(data[i].collection, function (j, item) {
                    console.log(JSON.stringify(item));

                    if (item.properties.__category__.Category[1] == 'Revit Family Type')
                    {
                        Properties += '<tr><th scope="row">' + item.name + '</th><td>' + item.objectid + '</td><td>' + item.properties["Identity Data"].Workset[0] + '</td><td>' + item.properties.__category__.Category[0] + '</td></tr>';
                        categories.push(item.properties.__category__.Category[0]);
                    }
                })
            });

            console.log(JSON.stringify(categories));

            $.each(categories, function(i, el){
                if ($.inArray(el, uniqueCategories) === -1) uniqueCategories.push(el);
            });

            var uniqueCategoriesOccurrence = {};
            var uniqueCategoriesWithOccurrence = [];

            for (var i = 0, j = categories.length; i < j; i++) {
                uniqueCategoriesOccurrence[categories[i]] = (uniqueCategoriesOccurrence[categories[i]] || 0) + 1;
            }

            for (var i = 0, j = uniqueCategories.length; i < j; i++) {
                item = {}
                item["label"] = uniqueCategories[i];
                item["value"] = uniqueCategoriesOccurrence[uniqueCategories[i]];
                uniqueCategoriesWithOccurrence.push(item);
            }

            console.log(uniqueCategories);

            console.log(JSON.stringify(uniqueCategoriesOccurrence));
            
            console.log(JSON.stringify(uniqueCategoriesWithOccurrence));

            $('#Elements').append(Properties);

            new Morris.Bar({
                // ID of the element in which to draw the chart.
                element: 'bar',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data: uniqueCategoriesWithOccurrence,
                // The name of the data record attribute that contains x-values.
                xkey: ['label'],
                // A list of names of data record attributes that contain y-values.
                ykeys: ['value'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels: ['Count']
            });

            new Morris.Line({
                parseTime: false,
                // ID of the element in which to draw the chart.
                element: 'line',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data: uniqueCategoriesWithOccurrence,
                // The name of the data record attribute that contains x-values.
                xkey: 'label',
                // A list of names of data record attributes that contain y-values.
                ykeys: ['value'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels: ['Count']
            });

            new Morris.Donut({
                parseTime: false,
                element: 'donut',
                data: uniqueCategoriesWithOccurrence
            });

        },

        error: function (msg) {

            alert(msg.responseText);
        }
    });
});