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
        if(isNaN(pin))
            var url = "https://localhost:44300/searchbyname/"+pin
        else
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
                        var shophtml = '<a href="#" onclick="load_time_slot(this)" id = res-' + rows[i].shopId   + '>' + rows[i].shopName + '</a>';
                        html += '<td>' + shophtml  + '</td>'
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
function load_time_slot(shop) {
    document.getElementById("content").style.display="block";
    document.getElementById("frame1").style.display="none";
    var id = shop.id
    console.log(id) //
    var shopName = document.getElementById(id).innerText;
    document.getElementById("content").innerHTML = '<div id="main-panel"> <!link rel="stylesheet" type="text/css" href="asd.css" />'
    document.getElementById("content").innerHTML = '<h2 class="name"><center><p id = "shop-name"></p></center><br></h2></div>'//<h3 class="name">Opening hours: 9:00 am to 4:00pm</h3>'
    //document.getElementById("content").innerHTML +='<object width="100%" height="100%" type="text/html" data="TimeSlot.html" ></object>';
    document.getElementById("shop-name").innerText = shopName;
    shopId = id.split('-')[1]
    url = 'https://localhost:44300/gettotalslotsavailable/' + shopId
    let request = new XMLHttpRequest()
    request.open("GET", url);
    request.send();
    request.onload = () => {
        if(request.status === 200){
            var rows = JSON.parse(request.response)
            console.log(rows)
            html = '<div id = "main-panel"> <div class="row"><div class="col-25"><center><h2>Available Slots</h2><br><h3>Select Time Slot:</h3></center></div><center>'
            html += '<div class="col-75"><select style="text-align: center;" id="Available Slots" name="Available Slots">'
            for(var i = 0; i < rows.length; i++) {
                html += '<option value=' + rows[i].startTime.split('T')[0] + ' ' + rows[i].startTime.split('T')[1]
                html += 'to'  + rows[i].endTime.split('T')[1] + '>'
                html += rows[i].startTime.split('T')[0] + ' ' 
                html +=rows[i].startTime.split('T')[1] + ' to'  + rows[i].endTime.split('T')[1] +'</option>'
                //<option value="09:00 to 10:00">09:00 to 10:00</option>
            }
            html += '</select></div></center></div>'
            html += '<div><p align="center"><button type="button" style="background-color:rgb(255, 174, 0);'
            html += 'margin-left:auto;margin-right:auto;display:block;margin-top:10%;margin-bottom:0%"> Book Slot </button>'
            html += '</p></button></p></div>'
            document.getElementById("content").innerHTML += html
        } 
        else {
            console.log("Page not found")
        }
    }
            
}

var menu = document.querySelector(".dropdown-content");
menu.addEventListener("click", function(e){
        var id = e.target.getAttribute("id")
        var which_api = ""
        if(id == "medical-store")
            which_api = "Pharmacy"
        if(id == "grocery-store")
            which_api = "Grocery"
        if(id == "general-store")
            which_api = "General Store"
        if(id == "clothing-store")
            which_api = "Clothing"
        let request = new XMLHttpRequest()
        request.open("GET","https://localhost:44300/getbycategory/"+which_api);
        request.send();
        request.onload = () => {
        if(request.status === 200){
            var rows = JSON.parse(request.response)
            //fetch('style/store-list.css')
            //.then(response => response.text())
            //.then(data => {
                html = '<head><style>'
                //html += data
                html += '</style></head>'
                html += '<table id = "current">';
                html += '<tr>';
                var hed = ["Name", "Address", "Contact", "Category"]
                for( var j in hed ) {
                    html += '<th>' + hed[j] + '</th>';
                }
                html += '</tr>';
                html += '</tr>';
                for( var i = 0; i < rows.length; i++) {
                    html += '<tr>';
                    var shophtml = '<a href="#" onclick="load_time_slot(this)" id = res-' + rows[i].shopId   + '>' + rows[i].shopName + '</a>';
                    html += '<td>' + shophtml  + '</td>'
                    html += '<td>' + rows[i].adress + '</td>';
                    html += '<td>' + rows[i].contactNumber + '</td>';
                    html += '<td>' + rows[i].shopCategory + '</td>';
                    html += '</tr>';
                
                }
                html += '</table>';
                console.log(html)
                document.getElementById('content').innerHTML = html;
            
            
        } 
        else {
            console.log("Page not found")
        }
    }
});



    