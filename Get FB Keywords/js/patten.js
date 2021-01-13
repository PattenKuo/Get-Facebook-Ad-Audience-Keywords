
var myTable = {};

function StartSearch(){
    
    var userInput = document.getElementById("userInput").value;
    request_url = "https://graph.facebook.com/search?type=adinterest&q=[" + userInput + "]&limit=100&locale=en_US&access_token=562476534284148%7CRR0VTMWxhtPFVGMbPS8_GkQPmHQ";
    jQuery.get(request_url, function(data, status){
        console.log("Status: " + status);
        keywordsList = data["data"];
        console.log("data:", keywordsList.length);
        if(keywordsList.length < 1){
            alert("No related keywords response, Please try another keyword!");
        }

        keywordsHtml = '';
        for(i = 0; i < keywordsList.length; i++){
                pathBlock = keywordsList[i].path;
                pathUrl = '';
                for( j = 0; j < pathBlock.length; j++ ){
                    pathUrl += "/" + pathBlock[j];

                }
                keywordsHtml += '<tr id="' + i + '"><td class="rightAlign">' + keywordsList[i].id + '</td><td class="rightAlign">' + keywordsList[i].name + 
                                '</td><td class="rightAlign">' + keywordsList[i].audience_size + '</td><td class="rightAlign">' + pathUrl + '</td><td class="rightAlign">' + 
                                keywordsList[i].description + '</td><td class="rightAlign">' + keywordsList[i].topic + '</td></tr>';   
        }
        jQuery("tbody").append(keywordsHtml);

        document.getElementById("container").fireEvent('domready', function(){ });
        document.getElementById("container").addEvent('domready', function(){
            myTable = new sortableTable('myTable', {overCls: 'over', onClick: function(){
                    // alert(this.id)
                }
            });

            document.getElementById('tableFilter').onsubmit = function(){
                myTable.filter('tableFilter'); return false;
            }
        });

    });
    

}