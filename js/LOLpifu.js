; (function () {
    // 定义两个变量
    // 一个变量记录一页的条数
    var dataCount = 6;
    // 一个变量记录当前是第几页
    var currentPage = 1;
    // 获取四个ul
    var uls = document.querySelectorAll(".list-group");
    // 获取分页组件
    var pagination = document.querySelector(".pagination");
    var allData = [];
    var num = 0;

    pAjax({
       
                url: '/api?callback=jQuery21108415735881180415_1607938999497&_version=8193&ratio=3%3A4&cKey=15&page=1&sort=pop&ad=0&fcid=50240&action=clothing&acm=3.mce.1_10_1ko4s.132244.0.1vizBsj8w7vtg.pos_871-m_482170-sd_119&ptp=31.v5mL0b._head.0.wBf0Naob&_=1607938999498',
            }).then(res => {
              
                res = JSON.parse(res);
                var sbu = res.result;
                if (sbu.wall.docs) {
                    for(var i = 0; i < sbu.wall.docs.length; i++){
                        sbu.wall.docs[i].sales = 0;
                    }
                    localStorage.setItem('shoppingCartInfoo', JSON.stringify(sbu.wall.docs,));
                    allData = sbu.wall.docs;
                    // 从数组中截取一段数据
                    var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
                    // 传递数据 渲染结构
                    renderData(arr);
        
                    // 计算应当有多少页
                    num = Math.ceil(allData.length / 8);
                    renderPagination(currentPage);
                }
                console.log(sbu.wall.docs);
            });




    // 添加数字按钮点击事件
    pagination.onclick = function (e) {
        // 通过e判断点击到的是谁
        if (e.target.className === "leftBtn") {
            // 点击的是左按钮  让当前页--
            currentPage--;
            // 边界判定
            if (currentPage < 0) {
                currentPage = 0;
                return;
            }
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            // 根据数据渲染结构
            renderData(arr)
            renderPagination(currentPage);
        } else if (e.target.className === "rightBtn") {
            // 点击的是右按钮  让当前页++
            currentPage++;
            // 边界判定
            if (currentPage > num) {
                currentPage = num;
                return;
            }
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            // 根据数据渲染结构
            renderData(arr)
            renderPagination(currentPage);
        } else if (e.target.className === "num") {
            if (currentPage === e.target.innerHTML - 1) {
                return;
            }
            // 当前页变为 点击的按钮的页数 - 1  
            currentPage = e.target.innerHTML - 1;
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            // 根据数据渲染结构
            renderData(arr);
            renderPagination(currentPage);
        }
    }


// console.log(arr);
    function renderData(arr) {
        // 先清空之前的数据
        for (var i = 0; i < uls.length; i++) {
            uls[i].innerHTML = "";
        }
        // 循环前16条数据 分别渲染成html结构 显示在页面中
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            console.log(item.iCatId);
            let str = `<li class="list-group-item" margin-top: 0px;    
            margin-bottom: 20px;>
                <div class="product-item text-center">
                    
                    <p>
                        <img style ="width:220px;height:220px"  alt="Responsive image" src="${item.img}">
                    </p>
                    <p class="intro">
                       <a href="../HTML/detail.html?id=${item.tradeItemId}&a=1">  ${item.title} </a>
                    </p>
                    <p>
                        ￥${item.price}
                    </p>
                    <p>
                        <a class="btn btn-default addToCart"  role="button" data-id="${item.tradeItemId}">加入购物车</a>
                        <a  href="../HTML/detail.html?id=${item.tradeItemId}&a=1" class="btn btn-default addToDetail"  role="button" data-id="${item.tradeItemId}">查看皮肤详情</a>
                    </p>
                </div>
            </li>`;
            uls[i % 4].innerHTML += str;
        }
    }

    function renderPagination(currentPage) {
        var str = `<li>
                <a aria-label="Previous">
                    <span class='leftBtn' aria-hidden="true">&laquo;</span>
                </a>
            </li>`
        // 判断当前页 
        if (currentPage <= 6) {
            for (var i = 0; i < 10; i++) {
                str += `<li><a class='num'>${i + 1}</a></li>`;
            }
        } else {
            var end = currentPage + 4 > num ? num : currentPage + 4;
            for (var i = currentPage - 6; i < end; i++) {
                str += `<li><a class='num'>${i + 1}</a></li>`;
            }
        }

        str += ` <li>
            <a  aria-label="Next">
                <span class='rightBtn' aria-hidden="true">&raquo;</span>
            </a>
        </li>`
        pagination.innerHTML = str;
    }


    // 使用委托模式实现添加购物车点击功能
    // 获取.list元素
    let list = document.querySelector(".list");

    // 添加点击事件
    list.onclick = function(e) {
        // var carArr = [];

        // 通过事件对象判定触发事件的元素是谁
        if (e.target.className.includes("addToCart")) {
            // 获取当前商品的信息ID
            var tradeItemId = e.target.getAttribute('data-id');

            // 拿着ID去本地存储里看一看有没有
            var arr = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            console.log(arr);

            var goods_item = arr.find(function(value) {
                return value.tradeItemId == tradeItemId;
            });


         

 
     
            // 判断
            
            if (goods_item) {
                // 如果为真 说明已经存在 
            // carArr.push(goods_item);

                goods_item.number++;
            } else {
                // 说明不存在
                // 拿着id去大数组里找 
                goods_item = allData.find(function(value) {
                    return value.tradeItemId == tradeItemId;
                });
                // 设置一个sales属性为1 然后直接往本地存储数组里存储就好了
                goods_item.number =1;
                arr.push(goods_item);

                // console.log(goods_item);
            }
            // 将修改之后的数据放回本地存储
            localStorage.setItem("shoppingCart", JSON.stringify(arr));

         
        }
    }
})();