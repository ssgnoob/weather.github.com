/*var app = angular.module('Weather', []);
app.factory('WeatherApi', function($http) {
    var obj = {};
    obj.getIP  = function() {
        return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
    }
    obj.getCurrent = function(ip) {
        var api = "http://v.juhe.cn/weather/ip?format=1";
        var APPKey = "&key=5a568b49a8bb9ebd7f58dfa1eb9545b2&ip=";
        var cb = "&callback=JSON_CALLBACK";
        return $http.jsonp(api + APPKey + ip + cb);
    };
    return obj
});

app.controller('MainCtrl', function($scope, WeatherApi) {
    $scope.Data = {};
    WeatherApi.getIP().success(function(data){
        var ip = data.ip;
        WeatherApi.getCurrent(ip).success(function(data) {
            $scope.Data = data.result;
            $scope.items= data.result.future;
            delete $scope.items[Object.keys($scope.items)[0]];
        });
    })
});*/

$(function () {
                $(".load").css("display",'block');
                $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function () {
            var city = '';
            city = remote_ip_info.city;
                call(city);

        });



            $("#search").on("click",function () {
                $(".load").css("display",'block');
                    var city=encodeURI($("#cityname").val());
                    $.ajax({
                        type:'get',
                        url:'http://v.juhe.cn/weather/index?format=2&cityname=' + city + '&key=5a568b49a8bb9ebd7f58dfa1eb9545b2&callback=JSON_CALLBACK',
                        dataType:'jsonp',
                        success:function(data){
                            getdata(data);
                            $(".currentcity").html("当前城市:"+$("#cityname").val());
                            $("#cityname").val('');
                        }
                    });

            });
            $("#cityname").keydown(function () {
                if (event.keyCode == "13"){
                    $("#search").click();
                }
                    });

});


function call(city) {
    $.ajax({

        type:'GET',

        url:'http://v.juhe.cn/weather/index?format=2&cityname=' + city + '&key=5a568b49a8bb9ebd7f58dfa1eb9545b2&callback=JSON_CALLBACK',
        dataType:'jsonp',//跨域所需

        //	jsonp:'callback',

        success:function(data){
            getdata(data);
        }


    });
}


function getdata(data) {
    var imgurl='url(/weather.github.com/img/day/'+data.result.today.weather_id.fa+'.png)';
    $(".today .line1").css("background",imgurl);
    $(".today .line2 .temper").html(data.result.sk.temp);
    $(".today .line2 .weat").html("湿度：<br>"+data.result.sk.humidity);
    $(".today .line3 .temper").html(data.result.today.temperature);
    $(".today .line3 .weat").html(data.result.today.weather);
    $(".today .line3 .wind").html(data.result.today.wind);
    var date=new Date();
    var time1=date.getDate()+1;
    var time2=dateformat(date.getDay()+1);
    $(".header .date").html(date.getMonth()+1+"月"+time1+"日"+" "+time2);
    var i=0;
    for(var item in data.result.future){
        var day=date.getDate()+i+1;
        $(".otherday .line1 .week:eq("+i+")").html(dateformat(date.getDay()+i+1));
        $(".otherday .line1 .day:eq("+i+")").html(date.getMonth()+1+"月"+day+"日");
        var imgurl2='url(/weather/img/day/'+data.result.future[item].weather_id.fa+'.png)';
        $(".otherday .line2:eq("+i+")").css('background',imgurl2);
        $(".otherday .line3 .temper:eq("+i+")").html(data.result.future[item].temperature);
        $(".otherday .line3 .weat:eq("+i+")").html(data.result.future[item].weather);
        $(".otherday .line3 .wind:eq("+i+")").html(data.result.future[item].wind);
        i++;
    }
    $(".load").css("display",'none');
}
function dateformat(week) {
    switch(week%7){
        case 0:
            return '星期日';
            break;
        case 1:
            return '星期一';
            break;
        case 2:
            return '星期二';
            break;
        case 3:
            return '星期三';
            break;
        case 4:
            return '星期四';
            break;
        case 5:
            return '星期五';
            break;
        case 6:
            return '星期六';
            break;
    }
}
