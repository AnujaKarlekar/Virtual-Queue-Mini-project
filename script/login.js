function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let request = new XMLHttpRequest()
    request.open("GET","https://localhost:44300/isauthenticated/" + '?UserName=' + username + '&Passwd=' + password);
    request.send();
    request.onload = () => {
        if(request.status === 200){
                var date = new Date()
                date.setTime(date.getTime()+(30*60*1000))
                var expires = "; expires="+date.toUTCString();

                var rows = JSON.parse(request.response)

                if(rows["item2"]){
                    document.cookie = "UserName=" + username + expires + "; path=/";
                    document.cookie = "UserID=" + rows["item1"] + expires + "; path=/"
                    document.cookie = "RoleID=" + rows["item3"] + expires + "; path=/"
                if(rows["item3"] == 1){
                    window.location = "../admin-dashboard.html" 
                }
                if(rows["item3"] == 2){
                    window.location = "../customer-dashboard.html"
                }
                if(rows["item3"] == 3){
                    window.location = "../shop-dashboard.html"
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