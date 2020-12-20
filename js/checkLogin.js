function getCookie(isLogin) 
{ 
    if (!isLogin) {
        alert("请登录")
        setTimeout(function () {
            location.href = "../html/denglv.html"
        }, 500)
    }
};