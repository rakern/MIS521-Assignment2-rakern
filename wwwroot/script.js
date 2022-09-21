/*

 #ADD ME
- JS:
  - [ * ] Replace 'my-api-url' under the ajax call with the url from your search API.
  - [ * ] Replace 'my-api-key' next to 'Ocp-Apim-Subscription-Key' with the api key from your search API.
  - [ * ] Write a function that calls the 'apiSearch' function on a click of your search button.
  - [ * ] Write a function that changes the background image of your site on a click of your search engine name.
  - [ * ] Write a function that gets the current time (formatted HH:MM), loads the result into your 'time' div, and displays the div as a JQuery UI dialog window on a click of your time button.
 
 */


var len;
var results = '';

function apiSearch() { // must refresh to search a new word/phrase
    
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "c149582c3da1461ab9093effb25cdc45");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

        $('#searchResults').html(results);
        $("#searchResults").css("visibility", "visible");
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}

function doJQuery() {
    $("#search").button({
        classes: {
            "ui-button": "highlight"
        }
    });
    $("#currentTime").button({
        classes: {
            "ui-button": "highlight"
        }
    });

    $("#feelingLucky").button({
        classes: {
            "ui-button": "highlight"
        }
    });

    $("#search").click(function () {
        console.log("search button was clicked");
        apiSearch();
    });
 
    changeBackground();
    getCurrTime();
    imFeelingLucky();
}

function changeBackground() {
    $(document).ready(function () {
        var flag = false;

        $("#engineName").click(function () {
            if (flag == false) {
                $("body").css("background-image", "url(mountain-background-2.jpg)");
                flag = true;
            }
            else {
                $("body").css("background-image", "url(mountain-background.jpg)");
                flag = false;
            }
            
        });

    });

}    

function getCurrTime() {
    var date = new Date($.now());
    var time;
    if (date.getHours() > 11) {
        if (date.getHours() < 22) {
            time = "0" + (date.getHours() % 12);
        }
        else {
            time = (date.getHours() % 12);
        }

        if (date.getMinutes() < 10) {
            time += " : 0" + date.getMinutes();
        }
        else {
            time += " : " + date.getMinutes();
        }
        time += "pm";
    }
    else {
        time = date.getHours();
        if (date.getHours() < 10) {
            time = "0" + date.getHours();
        }
        else {
            time = date.getHours();
        }

        if (date.getMinutes() < 10) {
            time += " : 0" + date.getMinutes();
        }
        else {
            time += " : " + date.getMinutes();
        }
        time += "am";
    }

    $('#currentTime').on('click', function () {
        $("#time").css("visibility", "visible");
        $("#time").html('<p>' + time + '</p>');

        $("#time").dialog({
            autoOpen: true,
            title: "Current Time",
            modal: true,
            buttons: { "Close": function () { $(this).dialog("close"); } }
        });

    });

}

function imFeelingLucky() {
    $("#feelingLucky").on('click', function () {
        var params = {
            "q": $("#query").val(),
            "count": "50",
            "offset": "0",
            "mkt": "en-us"
        };

        $.ajax({
            url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "c149582c3da1461ab9093effb25cdc45");
            },
            type: "GET",
        })
            .done(function (data) {
                var result = "<p><a href='" + data.webPages.value[0].url + "'>" + data.webPages.value[0].name + "</a>: " + data.webPages.value[0].snippet + "</p>";

                $('#lucky').html(result);
                $('#lucky').dialog({
                    autoOpen: true,
                    title: "I'm Feeling Lucky",
                    modal: true,
                    buttons: { "Close": function () { $(this).dialog("close"); } }
                });
            })
            .fail(function () {
                alert("error");
            });
    });
}
