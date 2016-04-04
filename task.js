/**
 * Created by tinycode2333 on 2016/4/2.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var flag = 0;
var re_city = /^[\u4e00-\u9fa5a-zA-Z]+$/;
var re_value = /^\d+$/;

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var value = document.getElementById("aqi-value-input").value;
    city = city.replace(/(^\s*)|(\s*$)/g, "");
    value = value.replace(/(^\s*)|(\s*$)/g, "");
    if (!re_city.test(city)) {
        alert("城市为中英文字符");
    }
    else if (!re_value.test(value) || parseInt(value, 10) != value) {
        alert("空气质量为整数");
    }
    else {
        aqiData[city] = value;
        flag++;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    if (flag >= 1) {
        table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        for (var i in aqiData) {
            table.innerHTML += "<tr><td>" + i + "</td><td>" + aqiData[i] + "</td><td><button>删除</button></td></tr>";
        }
    }
    else if (flag === 0) {
        table.innerHTML = "";
    }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(d) {
    // do sth.
    var city = d.parentNode.parentNode.firstChild.innerHTML;
    delete aqiData[city];
    flag--;
    renderAqiList();
}

function init() {
    window.onload = function () {
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        document.getElementById("add-btn").onclick = function () {
            addBtnHandle();
        };
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var table = document.getElementById("aqi-table");
        table.onmouseover = function () {
            var del = table.getElementsByTagName("button");
            for (var i = 0; i < del.length; i++) {
                del[i].onclick = (function (del, i) {
                    return function(){
                        delBtnHandle(del[i]);
                    }
                })(del, i);
            }
        };
    }
}

init();