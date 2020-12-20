<?php
    // 获取前端传递过来的信息
    $username = $_GET["username"];
    $password = $_GET["password"];

    // 连接数据库
    $con = mysqli_connect('localhost', "root", "123456","xiangmu");

    // 定义sql语句
    $sql = "SELECT * FROM `user` WHERE username='$username' and password='$password'";
    // 执行
    $result = mysqli_query($con,$sql);
    // 判定返回结果
    $row = mysqli_fetch_assoc($result);
    // 返回数据
    if ($row) {
        // 后端给前端设置一个登录标记 
        setcookie("isLogin","1", time() + 1000000, "/");
        echo json_encode(array("error" => 0, "data" => "登录成功"),JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(array("error" => 1, "data" => "用户名或密码错误"),JSON_UNESCAPED_UNICODE);
    }
?>