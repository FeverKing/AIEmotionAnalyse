/**
AI情感分析插件
    Copyright (C) 2020  FeverKing

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
**/
// ==UserScript==
// @name         AI情感分析
// @namespace    http://tampermonkey.net/
// @version      v1.0
// @description  使用百度飞浆预训练模型进行AI情感分析,支持数据提交,我们一起创建更强大的AI
// @author       FeverKing
// @match        *://weibo.com/*
// @match        *://*.weibo.com/*
// @match        *://*.weibo.cn/*
// @match        *://sina.com.cn/*
// @match        *://*.ifeng.com/*
// @match        *://tieba.baidu.com/*
// @match        *://*.bilibili.com/
// @match        *://*.bilibili.com/*
// @match        *://*.douban.com/group/*
// @match        *://douban.com/group/*
// @grant        none
// @require      https://libs.baidu.com/jquery/2.1.4/jquery.min.js
// @downloadURL   https://api.feverking.cn/nlpapi/latest.js
// ==/UserScript==


const apiurl = "https://nlpapi.feverking.cn/api";
const reporturl = "https://api.feverking.cn/nlpapi/report.php";

//如果你使用自己的接口,请把apiurl改成你的AI分析接口
//reporturl改为你的数据收集接口


function isChinese(obj) {//判断是否为中文

    if (/.*[\u4e00-\u9fa5]+.*$/.test(obj)) {

        return true;
    }
    return false;
}

$("html").append('<style>#unidetails{ font:400 14px/1.4 sans-serif; } #positiveReport{ background:#FFFFFF } #negativeReport{ background:#FFFFFF } #reported{  }</style>');
var x, y, aim;
jQuery(document).ready(function () {

    $(document).on('click', '#positiveReport',//提交积极数据
        function () {

        let html = $.ajax({
                async: true,
                type: "get",
                url: reporturl,

                dataType: 'json',
                data: {
                    "content": aim.toString(),
                    "tag": "positive"
                },
                success: function (data) {
                    var resp = "<p id='reported'>感谢您的反馈,她会越来越聪明</p>";
                    document.getElementById("unidetails").innerHTML = "";
                    document.getElementById("unidetails").innerHTML = resp;
                }
            });
    });

    $(document).on('click', '#negativeReport',//提交消极数据
        function () {
        let html = $.ajax({
                async: true,
                type: "get",
                url: reporturl,

                dataType: 'json',
                data: {
                    "content": aim.toString(),
                    "tag": "negative"
                },
                success: function (data) {
                    var resp = "<p id='reported'>感谢您的反馈,她会越来越聪明</p>";
                    document.getElementById("unidetails").innerHTML = "";
                    document.getElementById("unidetails").innerHTML = resp;
                }
            });
    });

    $('body').mouseup(//监听鼠标抬起

        function () {

        var el = $(this).html();
        var hiddenY = document.documentElement.scrollTop || document.body.scrollTop;
        y = parseInt(event.clientY) + parseInt(hiddenY);
        x = event.clientX;

        aim = window.getSelection();

        if (!isChinese(aim)) {
            $("#unifloat").fadeOut(300);
            setTimeout(function () {
                $("#unifloat").remove();
            }, 300);
        } else {
            $("html").append("<div id='unifloat' class='unifloat'><duv id='unidetails'>加载中...</div></div>");
            $("#unifloat").css({
                "position": "absolute",
                "left": parseInt(x) - 10,
                "top": parseInt(y) + 20,
                "background": "#FFFFFF",
                "width": "500px",
                "height": "100",
                "z-index": "99999999999",
                "box-shadow": "5px 5px 10px #888888",
                "border-radius": "5px"
            });
            let html = $.ajax({//从分析API取回数据
                    async: true,
                    type: "get",
                    url: apiurl,

                    dataType: 'json',
                    data: {
                        "quest": aim.toString()
                    },
                    success: function (data) {
                        data = JSON.stringify(data);
                        var obj = JSON.parse(data);
                        function judge() {//根据可能性判断感情
                            if (parseFloat(obj['negative_probs']) * 100 >= 60) {
                                return "很可能不是什么好话";
                            } else if (parseFloat(obj['negative_probs']) * 100 <= 40) {
                                return "一句礼貌的话";
                            } else {
                                return "目前无法判断,提交标签可以让她变聪明哦";
                            }
                        }
                        html = "<p>&nbsp;&nbsp;AI检测结果: <strong>" + judge() + "</strong></p><p>&nbsp;&nbsp;友善可能性: " + parseFloat(obj['positive_probs']) * 100 + "%</p><p>&nbsp;&nbsp;原文内容: " + aim + "</p>";
                        var rest = "<p>&nbsp;&nbsp;对结果有疑问?点击你认为的标签进行反馈:&nbsp;&nbsp;<button id='positiveReport'>极富礼貌的</button><button id='negativeReport'>有攻击性的</button></p>";
                        document.getElementById("unidetails").innerHTML = "";
                        document.getElementById("unidetails").innerHTML = html + rest;
                    }
                });
        }
    });

});
