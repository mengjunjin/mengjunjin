<?php

    $username = $_GET['username'];
    $password = $_GET['password'];

    $con = mysqli_connect('localhost', "root", "123456","xiangmu");


    $sql1 = "SELECT * FROM `user` WHERE username = '$username';";
    $sql2 = "INSERT INTO `user` (`username`, `password`)VALUES ('$username','$password');";

    $res1 = mysqli_query($con,$sql1);
    $row = mysqli_fetch_assoc($res1);

    if($row){
        print_r('注册失败,该用户名已注册');
        }else{
            $new = mysqli_query($con,$sql2);
            if($new){
                print_r('注册成功');

            }
            };
        ?>