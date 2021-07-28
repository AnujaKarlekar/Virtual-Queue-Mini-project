function load_edit_profile() {
    document.getElementById("content").style.display="block";
    document.getElementById("frame1").style.display="none";
    document.getElementById("content").innerHTML='<object width="100%" height="100%" type="text/html" data="edit_profile.html" ></object>';
}

function load_medical() {
    document.getElementById("content").style.display="block";
    document.getElementById("frame1").style.display="none";
    document.getElementById("content").innerHTML='<object width="100%" height="100%" type="text/html" data="shoplist.html" ></object>';
}

function load_search_shop() {
        var pin = document.getElementById("search-pin").value
        var url = "https://localhost:44300/searchbypincode/"+pin
        console.log(url)
        let request = new XMLHttpRequest()
            request.open("GET", url);
            request.send();
            request.onload = () => {
                if(request.status === 200){
                    var rows = JSON.parse(request.response)
                    var html = '<table id="current">';
                    html += '<tr>';
                    var hed = ["Name", "Address", "Contact", "Category"]
                    for( var j in hed ) {
                        html += '<th>' + hed[j] + '</th>';
                    }
                    html += '</tr>';
                    for( var i = 0; i < rows.length; i++) {
                        html += '<tr>';
                        var dec = [1,3,4];
                        // for( var j in rows[i] ) {
                        //     html += '<td>' + rows[i]. + '</td>';
                        // }
                        html += '<td>' + rows[i].shopName + '</td>';
                        html += '<td>' + rows[i].adress + '</td>';
                        html += '<td>' + rows[i].contactNumber + '</td>';
                        html += '<td>' + rows[i].shopCategory + '</td>';
                        html += '</tr>';
                    }
                    html += '</table>';
                    document.getElementById("content").style.display="block";
                    document.getElementById("frame1").style.display="none";
                    document.getElementById("content").innerHTML = html;
                    // document.getElementById("container").innerHTML = html;
                    // document.getElementById("container").style.display = "block";
                    //console.log(html)
                } 
                else {
                    console.log("Page not found")
                }
            }

}
