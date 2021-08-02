function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let request = new XMLHttpRequest()
    request.open("GET","https://localhost:44361/api/isauthenticated/" + '?UserName=' + username + '&Passwd=' + password);
    request.send();
    request.onload = () => {
        if(request.status === 200){
                var rows = JSON.parse(request.response)
                if(rows["item2"]){
                if(rows["item3"] == 1){
                    window.location = "admin-dashboard.html" 
                }
                if(rows["item3"] == 2){
                    window.location = "customer-dashboard.html"
                }
                if(rows["item3"] == 3){
                    window.location = "shop-dashboard.html"
                }
                }
                else{
                alert("Not a registered user.")
                }
        } 
        else {
                console.log("Page not found")
        }
    }

}