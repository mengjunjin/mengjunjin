"use strict";var usernameInp=document.getElementById("username"),passwordInp=document.getElementById("password"),loginBtn=document.getElementById("loginBtn"),usernames_lock=!1,passwords_lock=!1;usernameInp.onblur=function(){var e=this.value;/^[^\d]\w{6,12}$/.test(e)?(usernames_lock=!0,this.style.borderColor="green"):(usernames_lock=!1,this.style.borderColor="red"),console.log(usernames_lock)},passwordInp.onblur=function(){var e=this.value;/^[^\d]\w{6,12}$/.test(e)?(passwords_lock=!0,this.style.borderColor="green"):(passwords_lock=!1,this.style.borderColor="red"),console.log(passwords_lock)},loginBtn.onclick=function(){passwords_lock&&usernames_lock&&ajax({url:"../php/zhuce.php",data:{username:usernameInp.value,password:passwordInp.value},success:function(e){console.log(e),"注册成功"===e?(alert("注册成功"),window.location="../html/denglv.html"):alert("注册失败")}})};