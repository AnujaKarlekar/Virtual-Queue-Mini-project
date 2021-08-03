function load_edit_profile() {
    document.getElementById("content").style.display="block";
    document.getElementById("frame1").style.display="none";
    document.getElementById("content").innerHTML='<object width="100%" height="100%" type="text/html" data="edit_profile.html" ></object>';
    //window.location = "../edit_profile.html"
    let cookie = document.cookie
    var cookies = cookie.split(';')
    var username = cookies[1].split('=')[1]
}
function logout() {
    //console.log("here")
    document.cookie = "UserName=; expiress= Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "UserID=; expiress= Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "RoleID=; expiress= Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = "../index.html"
}
function read_cookie(cname) {
    var cookies = document.cookie.split(';')
    for(var i in cookies) {
        var value = cookies[i].split('=')
        //console.log(value)
        if(cname == value[0].trim())
            return value[1].toString()
    }
    return null
}

function cancel(button) {
    var token = button.id
    var reply = window.confirm("Do yo want cancel this appointment?\ntoken = " + token)
    // document.getElementById(token).onclick = function() {
    if(reply){
        var url = "https://localhost:44300/deleteslot/" +  token
        let request = new XMLHttpRequest()
            request.open("DELETE", url);
            request.send();
            request.onload = () => {
                if(request.status === 200){
                    alert("Appointment deleted!!")
                }
                else
                    alert("Could not delete the apoointment")
            }
    }
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
    //console.log(id) //
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
            //console.log(rows)
            html = '<div id = "main-panel"> <div class="row"><div class="col-25"><center><h2>Available Slots</h2><br><h3>Select Time Slot:</h3></center></div><center>'
            html += '<div class="col-75"><select style="text-align: center;" id="Available Slots" name="Available Slots">'
            for(var i = 0; i < rows.length; i++) {
                html += '<option value=' + rows[i].startTime.split('T')[0] + 'T' + rows[i].startTime.split('T')[1]
                html += 'to'  + rows[i].endTime.split('T')[1] + '>'
                html += rows[i].startTime.split('T')[0] + ' ' 
                html +=rows[i].startTime.split('T')[1] + ' to'  + rows[i].endTime.split('T')[1] +'</option>'
                //<option value="09:00 to 10:00">09:00 to 10:00</option>
            }
            html += '</select></div></center></div>'
            html += '<div><p align="center"><button type="button" style="background-color:rgb(255, 174, 0);'
            html += 'margin-left:auto;margin-right:auto;display:block;margin-top:10%;margin-bottom:0%", onclick="book_slot(this)", id=' + id + '> Book Slot </button>'
            html += '</p></button></p></div>'
            document.getElementById("content").innerHTML += html
        } 
        else {
            console.log("Page not found")
        }
    }
            
}

function book_slot(shop) {
    var reply = window.confirm("Do you want to book this slot?\n Time:" + document.getElementById("Available Slots").value)
    var shopid = shop.id.split("-")[1]
    //console.log(shopid)
    if(reply) {
        var apmnt_details = {
            customerID: read_cookie('UserID'),
            shopId: shopid,
            startTime: document.getElementById("Available Slots").value.split('to')[0],
            endTime:   document.getElementById("Available Slots").value.split('T')[0] + 'T' + 
            document.getElementById("Available Slots").value.split('to')[1]
        }
        var url = "https://localhost:44300/bookslot/"
        let request = new XMLHttpRequest()
        request.open("PUT", url);
        request.setRequestHeader("Content-type", "application/json")
        request.send(JSON.stringify(apmnt_details));
        request.onload = () => {
            if(request.status === 200)
                alert("Appointment Booked")
            else
                alert("Couldn't book the slot")
        }
                
    }
}
//fot sorting
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
                //console.log(html)
                document.getElementById('content').innerHTML = html;
            
            
        } 
        else {
            console.log("Page not found")
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {   
    let cookie = document.cookie
    var cookies = cookie.split(';')
    console.log(document.cookie)
    var username = read_cookie('UserName')//cookies[1].split('=')[1]
    var userid = read_cookie('UserID')//cookies[2].split('=')[1]
    document.getElementById('username').innerText = username
    if(username == "") {
        window.location = "../index.html"
    }
    var url = 'https://localhost:44300/gethistory/' + userid;
    //console.log(url)
    let request = new XMLHttpRequest()
    request.open("GET", url);
    request.send();
    request.onload = () => {
        if(request.status === 200){
            var rows = JSON.parse(request.response)
            //console.log(rows
            var html = '<center><h2>Bookings History</h2><br></br>'
            html += '<table id="current">';
            html += '<tr>';
            var hed = ["Sr.No.", "Shop", "Place", "Date", "Time", "Token", "Status"]
            for( var j in hed ) {
                html += '<th>' + hed[j] + '</th>';
            }
            html += '</tr>';
            html += '</tr>';
            for( var i = 0; i < rows.length; i++) {
                html += '<tr>';
                html += '<td>' + (i + 1) + '</td>';
                var url1 = 'https://localhost:44300/searchbyid/' + rows[i].shopId;
                
                let request1 = new XMLHttpRequest()
                request1.open("GET", url1);
                
                var shopname = ""
                var address = ""
                html += '<td id =' + i + '>' + shopname    + '</td>';
                html += '<td id = addr'+ i + '>' + address + '</td>';
                var count = 0
                request1.onload = () => {
                if(request1.status === 200){
                    var shop = JSON.parse(request1.response)
                    //console.log(shop
                    
                    shopname = shop[0].shopName
                    address = shop[0].adress
                    //return (shopname, address)
                    document.getElementById(count).innerText = shopname
                    document.getElementById('addr' + count++).innerText = address
                }
                }
                request1.send();
                

                
                if(rows[i].startTime) {
                    html += '<td>' + rows[i].startTime.split('T')[0] + '</td>';
                    html += '<td>' + rows[i].startTime.split('T')[1] + '</td>';
                }
                else {
                    html += '<td>' + "placeholder" + '</td>';
                    html += '<td>' + "placeholder" + '</td>'
                }
                html += '<td>' + rows[i].token + '</td>';
                if(rows[i].isCompleted) {
                    html += '<td>' + 'Completed' + '</td>'
                       
                }
                else {
                    html += '<td>' + 'Not Completed' + '</td>'
                    html += '<td><button class="btn" class="button button1" onclick="cancel(this)" id =' 
                    html += rows[i].token + '>Cancel</button></td>'
                }
                html += '</tr>';
            
            }
            html += '</table></center>';
            document.getElementById("content").style.display="block";
            document.getElementById("frame1").style.display="none";
            document.getElementById("content").innerHTML = html
        }
    }

}, false)

    