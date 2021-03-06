var sync_callback;
var sync_total;
var sync_finish;
if (typeof($SYS) === "undefined") {
    var $SYS = {}
}
(function () {
    try {
        if (typeof(allow_iframe) !== "undefined" && allow_iframe == 1) {
            return
        }
        var b = [window.location.host, "www.baidu.com", "tongji.baidu.com", "www.douyutv.com"];
        if (window.top.location.host == "" || $.inArray(window.top.location.host, b) === -1) {
            window.top.location.href = window.location.href
        }
    } catch (a) {
        window.location.href = "/tips/no_iframe"
    }
})();
var is_hover_bq = 0;
(function (a) {
    a.fn.dropdown = function (b) {
        var d = {dropdownEl: ".dropdown-menu", openedClass: "dropdown-open", delayTime: 100};
        var c = a.extend(d, b);
        return this.each(function () {
            var g = null;
            var f = null;
            var i = null;
            var j = null;
            a(this).hover(function () {
                if (i) {
                    clearTimeout(i)
                }
                g = a(this);
                i = setTimeout(function () {
                    g.addClass(c.openedClass).find(c.dropdownEl).show()
                }, c.delayTime);
                f = g;
                if (a(this).data("arrow")) {
                    a("." + a(this).data("arrow")).addClass(a(this).data("css"))
                }
            }, function () {
                if (i) {
                    clearTimeout(i)
                }
                i = setTimeout(function () {
                    f.removeClass(c.openedClass).find(c.dropdownEl).hide()
                }, c.delayTime);
                if (a(this).data("arrow")) {
                    a("." + a(this).data("arrow")).removeClass(a(this).data("css"))
                }
            })
        })
    }
})(jQuery);
(function (c, b, a, f) {
    var d = c(b);
    c.fn.lazyload = function (g) {
        var j = this;
        var k;
        var i = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: b,
            data_attribute: "original",
            skip_invisible: true,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function l() {
            var m = 0;
            if (typeof $SYS.is_mobile == "boolean" && $SYS.is_mobile) {
                c("#header .head").css("width", "100%")
            } else {
                c("#header .head").width(c(b).width() >= 1400 ? 1200 : 1100)
            }
            j.each(function () {
                var n = c(this);
                if (i.skip_invisible && !n.is(":visible")) {
                    return
                }
                if (c.abovethetop(this, i) || c.leftofbegin(this, i)) {
                } else {
                    if (!c.belowthefold(this, i) && !c.rightoffold(this, i)) {
                        n.trigger("appear");
                        m = 0
                    } else {
                        if (++m > i.failure_limit) {
                            return false
                        }
                    }
                }
            })
        }

        if (g) {
            if (f !== g.failurelimit) {
                g.failure_limit = g.failurelimit;
                delete g.failurelimit
            }
            if (f !== g.effectspeed) {
                g.effect_speed = g.effectspeed;
                delete g.effectspeed
            }
            c.extend(i, g)
        }
        k = (i.container === f || i.container === b) ? d : c(i.container);
        if (0 === i.event.indexOf("scroll")) {
            k.bind(i.event, function () {
                return l()
            })
        }
        this.each(function () {
            var m = this;
            var n = c(m);
            m.loaded = false;
            if (n.attr("src") === f || n.attr("src") === false) {
                if (n.is("img")) {
                    n.attr("src", i.placeholder)
                }
            }
            n.one("appear", function () {
                if (!this.loaded) {
                    if (i.appear) {
                        var o = j.length;
                        i.appear.call(m, o, i)
                    }
                    c("<img />").bind("load", function () {
                        var q = n.attr("data-" + i.data_attribute);
                        n.hide();
                        if (n.is("img")) {
                            n.attr("src", q)
                        } else {
                            n.css("background-image", "url('" + q + "')")
                        }
                        n[i.effect](i.effect_speed);
                        m.loaded = true;
                        var p = c.grep(j, function (s) {
                            return !s.loaded
                        });
                        j = c(p);
                        if (i.load) {
                            var r = j.length;
                            i.load.call(m, r, i)
                        }
                    }).attr("src", n.attr("data-" + i.data_attribute))
                }
            });
            if (0 !== i.event.indexOf("scroll")) {
                n.bind(i.event, function () {
                    if (!m.loaded) {
                        n.trigger("appear")
                    }
                })
            }
        });
        d.bind("resize", function () {
            l()
        });
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            d.bind("pageshow", function (m) {
                if (m.originalEvent && m.originalEvent.persisted) {
                    j.each(function () {
                        c(this).trigger("appear")
                    })
                }
            })
        }
        c(a).ready(function () {
            l()
        });
        return this
    };
    c.belowthefold = function (i, j) {
        var g;
        if (j.container === f || j.container === b) {
            g = (b.innerHeight ? b.innerHeight : d.height()) + d.scrollTop()
        } else {
            g = c(j.container).offset().top + c(j.container).height()
        }
        return g <= c(i).offset().top - j.threshold
    };
    c.rightoffold = function (i, j) {
        var g;
        if (j.container === f || j.container === b) {
            g = d.width() + d.scrollLeft()
        } else {
            g = c(j.container).offset().left + c(j.container).width()
        }
        return g <= c(i).offset().left - j.threshold
    };
    c.abovethetop = function (i, j) {
        var g;
        if (j.container === f || j.container === b) {
            g = d.scrollTop()
        } else {
            g = c(j.container).offset().top
        }
        return g >= c(i).offset().top + j.threshold + c(i).height()
    };
    c.leftofbegin = function (i, j) {
        var g;
        if (j.container === f || j.container === b) {
            g = d.scrollLeft()
        } else {
            g = c(j.container).offset().left
        }
        return g >= c(i).offset().left + j.threshold + c(i).width()
    };
    c.inviewport = function (g, i) {
        return !c.rightoffold(g, i) && !c.leftofbegin(g, i) && !c.belowthefold(g, i) && !c.abovethetop(g, i)
    };
    c.extend(c.expr[":"], {
        "below-the-fold": function (g) {
            return c.belowthefold(g, {threshold: 0})
        }, "above-the-top": function (g) {
            return !c.belowthefold(g, {threshold: 0})
        }, "right-of-screen": function (g) {
            return c.rightoffold(g, {threshold: 0})
        }, "left-of-screen": function (g) {
            return !c.rightoffold(g, {threshold: 0})
        }, "in-viewport": function (g) {
            return c.inviewport(g, {threshold: 0})
        }, "above-the-fold": function (g) {
            return !c.belowthefold(g, {threshold: 0})
        }, "right-of-fold": function (g) {
            return c.rightoffold(g, {threshold: 0})
        }, "left-of-fold": function (g) {
            return !c.rightoffold(g, {threshold: 0})
        }
    })
})(jQuery, window, document);
function JumpObj(g, l, b, m) {
    var n = g.children[0].children[0];
    var i = l = l || 6;
    b = b || function () {
        };
    m = m || function () {
        };
    var c = 0;
    var d = 1;
    o();
    function o() {
        n.style.position = "relative";
        j()
    }

    function j() {
        g.onmouseover = function (q) {
            if (!c) {
                p()
            }
        }
    }

    function a() {
        g.onmouseover = null
    }

    function p() {
        var r = parseInt(n.style.top);
        if (!c) {
            f()
        } else {
            var q = r - d * c;
            if (q >= -i && q <= 0) {
                n.style.top = q + "px"
            } else {
                if (q < -i) {
                    c = -1
                } else {
                    var s = i / 2;
                    if (s < 1) {
                        k();
                        return
                    }
                    i = s;
                    c = 1
                }
            }
        }
        setTimeout(function () {
            p()
        }, 200 / (i + 3) + c * 3)
    }

    function f() {
        b.apply(this);
        n.style.top = "0";
        c = 1
    }

    function k() {
        m.apply(this);
        i = l;
        c = 0;
        n.style.top = "0"
    }

    this.jump = p;
    this.active = j;
    this.deactive = a
}
function get_cookie(b) {
    if (typeof($SYS.cookie_pre) !== "undefined") {
        b = $SYS.cookie_pre + b
    }
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    if (a !== null) {
        return decodeURIComponent(a[2])
    }
    return null
}
function setCookie(c, d, f) {
    f = f || 0;
    var a = "";
    if (f !== 0) {
        var b = new Date();
        b.setTime(b.getTime() + (f * 1000));
        a = "; expires=" + b.toGMTString()
    }
    if (typeof($SYS.cookie_pre) !== "undefined") {
        c = $SYS.cookie_pre + c
    }
    document.cookie = c + "=" + escape(d) + a + "; path=/"
}
if (!get_cookie("nickname")) {
    setCookie("auth", "", -1);
    setCookie("auth_wl", "", -1);
    setCookie("uid", "", -1);
    setCookie("nickname", "", -1);
    setCookie("username", "", -1);
    setCookie("own_room", "", -1);
    setCookie("groupid", "", -1);
    setCookie("notification", "", -1)
}
$SYS.uid = get_cookie("uid");
$SYS.username = get_cookie("username");
$SYS.nickname = get_cookie("nickname");
$SYS.own_room = get_cookie("own_room");
$SYS.groupid = get_cookie("groupid");
$SYS.notification = parseInt(get_cookie("notification"));
$SYS.phonestatus = parseInt(get_cookie("phonestatus"));
function sync_login(c, f) {
    if (!document.getElementById("sync_login")) {
        var a = document.createElement("div");
        a.id = "sync_login";
        a.style.display = "none";
        document.body.appendChild(a)
    }
    sync_callback = f;
    setTimeout(sync_callback, 2000);
    $("#sync_login").html(c);
    var d = $("#sync_login").children();
    sync_total = d.length;
    sync_finish = 0;
    for (var b = 0; b < d.length; b++) {
        d[b].onload = function () {
            sync_finish++;
            if (sync_finish === sync_total) {
                setTimeout(sync_callback, 1)
            }
        }
    }
}
function get_url_param(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var c = new RegExp("[\\?&]" + a + "=([^&#]*)"), b = c.exec(location.search);
    return b == null ? "" : decodeURIComponent(b[1].replace(/\+/g, " "))
}
function timetodate(f) {
    var d = new Date(f * 1000);
    var c = d.getHours();
    c = c < 10 ? "0" + c : c;
    var a = d.getMinutes();
    a = a < 10 ? "0" + a : a;
    var b = d.getSeconds();
    b = b < 10 ? "0" + b : b;
    return c + ":" + a + ":" + b
}
function timetodate_all(d) {
    var c = new Date(d * 1000);
    var f = c.getMonth() + 1;
    var b = c.getHours();
    b = b < 10 ? "0" + b : b;
    var a = c.getMinutes();
    a = a < 10 ? "0" + a : a;
    return c.getFullYear() + "-" + f + "-" + c.getDate() + " " + b + ":" + a
}
function is_email(a) {
    var b = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4}$/;
    return b.test(a)
}
function close_open(a) {
    $.dialog.list.REG001.close();
    if (a) {
        window.location.reload()
    }
}
function open_reg() {
    user_dialog.open_reg();
    return false
}
var login_jump = "";
function open_login() {
    if (typeof(arguments[0]) !== "undefined") {
        login_jump = arguments[0]
    }
    user_dialog.open_login();
    return false
}
function check_message() {
    if ($SYS.uid) {
        window.open("/member/message/release", "_blank")
    } else {
        open_login("/member/message/release")
    }
    return false
}
function feedback_copyright() {
    window.$feedback_copyright_dialog = artDialog.open("/feedback/copyright", {width: 650, height: 330}, true)
}
var logout = function () {
    $.post("/member/logout/ajax", function (a) {
        var b = "";
        sync_login(a.sync_login_html + b, "window.location.reload();");
        try {
            thisMovie("WebRoom").js_userlogout()
        } catch (c) {
        }
        $.dialog.tips_black("退出成功！", 1.5)
    }, "json")
};
function logout_submit() {
    $.dialog.confirm("确认退出吗？", logout)
}
var bindphone = function () {
    window.location.href = "/member/cp#phone"
};
function bindphone_submit() {
    callback = bindphone;
    $.dialog.confirm("完成手机绑定后才能进行弹幕发送", callback)
}
function reg_success(a, b) {
    if ($.dialog.list.REG001) {
        $.dialog.list.REG001.close()
    }
    if (b !== "") {
        $.dialog({icon: "succeed", content: "注册成功，正在登录……请稍候!", lock: true});
        sync_login(b, "window.location.reload();")
    } else {
        window.location.reload()
    }
}
function search_submit() {
    var a = $("#search_word").val();
    a = $.trim(a);
    if (a === "") {
        alert_msg("搜索关键词还没有填写", "$('#search_word').focus();");
        return false
    }
    window.location.href = "/search/" + encodeURIComponent(a)
}
function alert_msg(d, b, a) {
    try {
        switch (a) {
            case 4:
            case"succeed":
                var f = "succeed";
                break;
            case 3:
                var f = "error";
                break;
            case 2:
                var f = "question";
                break;
            default:
                var f = "warning"
        }
        $.dialog({
            lock: true, content: d, icon: f, ok: function () {
                b && setTimeout(b, 100);
                return true
            }
        })
    } catch (c) {
        $.dialog.tips_black(d);
        b && setTimeout(b, 100)
    }
}
function confirm_msg(c, d, a) {
    try {
        $.dialog.confirm(c, function () {
            d && setTimeout(d, 100)
        }, function () {
            a && setTimeout(a, 100)
        })
    } catch (b) {
        if (confirm(c)) {
            d && setTimeout(d, 100)
        } else {
            a && setTimeout(a, 100)
        }
    }
}
function getByteLen(c) {
    var a = c.length;
    if (c.match(/[^\x00-\xff]/ig) !== null) {
        var b = c.match(/[^\x00-\xff]/ig).length;
        a = a + b * 2
    }
    return a
}
var bottom_tips = {
    pos: function () {
        var a = $(window).width();
        if (a >= 1164) {
            var b = parseInt(a - 1000) / 2 + 1235;
            $("#tbox").css({right: -1, bottom: 10}).show()
        } else {
            $("#tbox").hide()
        }
    }, move: function () {
        h = $(window).height() / 4;
        t = $(document).scrollTop();
        if (t > h) {
            $("#gotop").fadeIn("slow")
        } else {
            $("#gotop").fadeOut("slow")
        }
    }, init: function () {
        if ($SYS.uid > 0 && $SYS.own_room > 0) {
            var a = '<a id="want" href="/room/my" target="_blank">我要直播</a>'
        } else {
            if ($SYS.uid > 0) {
                var a = '<a id="want" href="/room/apply" target="_blank">我要直播</a>'
            } else {
                var a = '<a id="want" href="javascript:void(0);" onclick="open_login(\'/room/apply\');">我要直播</a>'
            }
        }
        $("body").append('<div id="tbox" style="right:0px; bottom: 10px;"><div class="lift"><a id="gotop" href="javascript:void(0)" style="display: inline;">返回顶部</a>' + a + '<a id="jianyi" href="javascript:void(0)" onclick="return check_message()">意见反馈</a><a id="dj" href="javascript:void(0)"><span class="xz">APP下载</span></a></div><div class="ewm_load"><a class="code" href="/client" target="_blank"><div class="ewm_down"><span class="ewm_span">斗鱼移动客户端</span><img src="' + $SYS.res_url + "douyu/images/s_t02.png?" + $SYS.res_ver + '"></div><div class="down_load"><span>立即下载</span></div></a></div></div>');
        this.pos(10, 10);
        this.move();
        $("#gotop").click(function () {
            $(document).scrollTop(0);
            return false
        });
        $(window).resize(function () {
            bottom_tips.pos()
        });
        $(window).scroll(function (b) {
            bottom_tips.move()
        })
    }
};
function number_format(g, c, j, f) {
    g = (g + "").replace(/[^0-9+\-Ee.]/g, "");
    var b = !isFinite(+g) ? 0 : +g, a = !isFinite(+c) ? 0 : Math.abs(c), l = (typeof f === "undefined") ? "," : f, d = (typeof j === "undefined") ? "." : j, k = "", i = function (p, o) {
        var m = Math.pow(10, o);
        return "" + (Math.round(p * m) / m).toFixed(o)
    };
    k = (a ? i(b, a) : "" + Math.round(b)).split(".");
    if (k[0].length > 3) {
        k[0] = k[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, l)
    }
    if ((k[1] || "").length < a) {
        k[1] = k[1] || "";
        k[1] += new Array(a - k[1].length + 1).join("0")
    }
    return k.join(d)
}
function get_avatar(a, b) {
    if (typeof($SYS.avatar_url) === "undefined") {
        return ""
    }
    if (!b) {
        b = "small"
    }
    return $SYS.avatar_url + "avatar.php?uid=" + a + "&size=" + b
}
var loading = {
    lock: false, dialog: null, show: function (a) {
        if (!a) {
            a = "正在提交……"
        }
        if (loading.dialog) {
            loading.close()
        }
        loading.dialog = $.dialog({
            title: false,
            cancel: false,
            lock: loading.lock,
            content: '<div class="infodrmation"><img src="' + $SYS.res_url + 'douyu/images/loading.gif" style="vertical-align: middle;" >&nbsp;' + a + "</div>"
        })
    }, close: function () {
        if (loading.dialog) {
            loading.dialog.close()
        }
    }
};
var user_dialog = {
    _dialog: null, chg_tab: function (a) {
        $("#js_login_tab a").removeClass("current");
        $("#js_" + a).addClass("current");
        $("#js_login_dialog .inputBox").hide();
        $("#js_" + a + "_cont").show();
        if ($("#login_captcha_val").length && $("#login_captcha").length) {
            DragCheckEngine.init({hideMod: "#login_captcha_val,#login_captcha", target: "#login_captcha_cont"})
        }
    }, open_login: function () {
        if ($("#js_login_dialog").length < 1) {
            throw"dialog no found"
        }
        this.chg_tab("login");
        if ($("#js_login_dialog").is(":hidden")) {
            this.show()
        }
        $("#login-form").find("input[name='username']").focus()
    }, open_reg: function () {
        if ($("#js_login_dialog").length < 1) {
            throw"dialog no found"
        }
        this.chg_tab("reg");
        if ($("#js_login_dialog").is(":hidden")) {
            this.show()
        }
        $("#reg_form").find("input[name='nickname']").focus()
    }, show: function () {
        user_dialog._dialog = $.dialog({
            content: document.getElementById("js_login_dialog"),
            title: false,
            cancel: false,
            padding: 0,
            margin: 0,
            fixed: true,
            lock: true
        });
        return false
    }, hide: function () {
        if (user_dialog._dialog) {
            user_dialog._dialog.close()
        }
        return false
    }, logout: function () {
        $.dialog.confirm("确认退出吗？", function () {
            $.post("/member/logout/ajax", function (a) {
                try {
                    thisMovie("WebRoom").js_userlogout()
                } catch (b) {
                }
                $.dialog.tips_black("退出成功！", 1.5);
                window.location.reload()
            }, "json")
        })
    }
};
try {
    if (window.console && window.console.log) {
        console.log("怀才不遇无处倾诉？\n快来斗鱼！JOIN US！\n我们重金悬赏各类有才之士，\n也包括优秀应届生哦！\n");
        console.log("请将简历发送至 %c zhanghaicun@douyu.tv（邮件标题请以“姓名-应聘XX职位-来自console”命名）", "color:red");
        console.log("职位介绍：http://www.douyutv.com/cms/about/jobs.html#page3")
    }
} catch (e) {
}
var user_form = {
    check: function (c) {
        var b = $(c);
        var d = b.val();
        d = $.trim(d);
        b.val(d);
        if (b.attr("name") == "captcha_word" && DragCheckEngine.getLiveStatus()) {
            return true
        }
        if (d == "") {
            inputError(b);
            return false
        }
        switch (b.attr("name")) {
            case"nickname":
                if (d == "") {
                    this.error("用户账号不能为空", b);
                    return false
                }
                if (d.indexOf("_") != -1) {
                    this.error("用户账号不能含有下划线", b);
                    return false
                }
                var a = this.get_byte_len(d);
                if (a < 5 || a > 30) {
                    this.error("用户账号长度只能5~30个字符", b);
                    return false
                }
                break;
            case"username":
                if (d == "") {
                    this.error("用户账号不能为空", b);
                    return false
                }
                if (d.indexOf("_") === 0) {
                    this.error("用户账号不能以下划线开头", b);
                    return false
                }
                var a = this.get_byte_len(d);
                if (a < 5 || a > 30) {
                    this.error("用户账号长度只能5~30个字符", b);
                    return false
                }
                break;
            case"password":
                if (d.length < 5 || d.length > 25) {
                    this.error("密码长度不正确，仅限5~25个字符", b);
                    return false
                }
                break;
            case"password2":
                if (b.parents("form").find("input[name='password']").val() != d) {
                    this.error("两次密码输入不一致", b);
                    return false
                }
                break;
            case"email":
                var f = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;
                if (!f.test(d)) {
                    this.error("邮箱地址格式不正确", b);
                    return false
                }
                break;
            case"captcha_word":
                if (d.length != 4) {
                    this.error("验证码不正确", b);
                    return false
                }
                break
        }
        this.success(b);
        return true
    }, error: function (b, a) {
        $.dialog.tips_black(b, 2);
        inputError(a)
    }, success: function (a) {
        if (window.ipt_timer) {
            clearTimeout(window.ipt_timer)
        }
        a.removeClass("login-form-error")
    }, get_byte_len: function (c) {
        var a = c.length;
        if (c.match(/[^\x00-\xff]/ig) != null) {
            var b = c.match(/[^\x00-\xff]/ig).length;
            a = a + b * 2
        }
        return a
    }, update_vcode: function (b) {
        var a = $("#" + b).data("src") + "?_t=" + Math.random(1);
        $("#" + b).attr("src", a);
        $("#" + b + "_val").val("")
    }
};
var inputError = function (a) {
    clearTimeout(window.ipt_timer);
    var b = 0;
    var c = function () {
        window.ipt_timer = setTimeout(function () {
            if (!a.hasClass("login-form-error")) {
                a.addClass("login-form-error")
            }
            if (b >= 5) {
                a.removeClass("login-form-error")
            } else {
                c(b++)
            }
        }, 300)
    };
    c()
};
var monitor_obj = {
    census: function (a) {
        $.ajax({
            type: "POST",
            url: "/monitor/census",
            data: {dot_str: a, source: document.referrer, ref: GetQueryString("ref")},
            success: function (b) {
            }
        })
    }
};
function GetQueryString(a) {
    var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)");
    var c = window.location.search.substr(1).match(b);
    if (c != null) {
        return unescape(c[2])
    }
    return null
}
var doing = 0;
function reg_ajaxSubmit() {
    if (doing == 1) {
        return false
    }
    var a = true;
    $("#reg_form input").each(function () {
        var b = $(this).attr("type");
        if (b != "submit" && b != "hidden" && !$(this).hasClass("placeholder") && user_form.check(this) == false) {
            a = false;
            return false
        }
    });
    if (!a) {
        return false
    }
    doing = 1;
    loading.show();
    $("#js_reg_submit").val("提交中…");
    $.ajax({
        type: "POST",
        url: "/member/register/ajax",
        data: $("#reg_form").serialize(),
        dataType: "json",
        error: function (b, d, c) {
            $.dialog.tips_black("注册过程中发生错误，请稍候再试！");
            loading.close()
        },
        success: function (b) {
            doing = 0;
            $("#js_reg_submit").val("注册");
            if (b.result == 0) {
                $("#culp a").trigger("click");
                $.dialog.tips_black("注册成功，正在登录…", 1.5);
                window.location.reload()
            } else {
                if (b.result == 2) {
                    $("div.lyzm").hide();
                    $.dialog({
                        content: "当前ip输入验证码时错误次数过多，请等待一天后在重新尝试！", icon: "warning", okVal: "确定", ok: function () {
                        }
                    })
                } else {
                    user_form.update_vcode("reg_captcha");
                    $.dialog.tips_black("注册失败：" + b.error)
                }
            }
            loading.close()
        }
    });
    return false
}
function login_ajaxSubmit(a) {
    if (doing == 1) {
        return false
    }
    var b = true;
    $("#login-form input").each(function () {
        var c = $(this).attr("type");
        if (c != "submit" && c != "hidden" && !$(this).hasClass("placeholder") && user_form.check(this) == false) {
            b = false;
            return false
        }
    });
    if (!b) {
        return false
    }
    if (DragCheckEngine.getLiveStatus() && !DragCheckEngine.getCheckStatus()) {
        $.dialog.tips_black("验证码错误！");
        return false
    }
    doing = 1;
    $("#js_login_submit").val("提交中…");
    $.post("/member/login/ajax", $("#login-form").serialize(), function (c) {
        doing = 0;
        $("#js_login_submit").val("登录");
        if (c.result == 0) {
            $("#culp a").trigger("click");
            if (typeof(a) === "function") {
                a()
            } else {
                $.dialog.tips_black("登录成功！", 1.5);
                if (typeof(login_jump) != "undefined" && login_jump) {
                    if ((login_jump == "/room/apply" || login_jump == "room/apply") && c.own_room == 1) {
                        login_jump = "/room/my"
                    }
                    window.location.href = login_jump
                } else {
                    window.location.reload()
                }
            }
        } else {
            switch (c.result) {
                case -1:
                    var d = "请把表单填写完整";
                    break;
                case -2:
                    var d = "请填写密码";
                    break;
                case -3:
                    var d = "密码错误";
                    break;
                case -5:
                    var d = "该用户未注册，请检查";
                    break;
                case -4:
                    if (c.ban_time == 0) {
                        var d = "您的账户目前已经被永久封禁"
                    } else {
                        var d = "您的账户目前已经被封禁，有效期截止：" + c.ban_time
                    }
                    break;
                case -99:
                    var d = "验证码错误";
                    break;
                default:
                    var d = c.result
            }
            if (DragCheckEngine.getLiveStatus()) {
                $(".gt_refresh_button")[0].click()
            } else {
                user_form.update_vcode("login_captcha")
            }
            $.dialog.tips_black(d)
        }
    }, "json");
    return false
}
function get_his_time(c, b) {
    var a = c - b;
    if (a >= 604800) {
        return "很久以前"
    }
    if (a >= 86400) {
        return Math.floor(a / 86400) + "天前"
    }
    if (a >= 3600) {
        return Math.floor(a / 3600) + "小时前"
    }
    if (a >= 1200) {
        return Math.floor(Math.floor(a / 60) / 15) * 15 + "分钟前"
    }
    if (a >= 900) {
        return "15分钟前"
    }
    if (a >= 60) {
        return Math.floor(a / 60) + "分钟前"
    }
    return "刚刚"
}
function get_show_online(a) {
    a = parseInt(a);
    if (a < 1) {
        return 0
    }
    if (a >= 10000) {
        return (a / 10000).toFixed(1) + "万"
    } else {
        return a
    }
}
function notification_bubble(b) {
    setCookie("notification", b);
    var a = $(".notification_bubble b");
    if (a.length) {
        if (b > 0) {
            a.html(b)
        } else {
            a.remove()
        }
    } else {
        if (b > 0) {
            $(".notification_bubble").append("<b>" + b + "</b>")
        }
    }
}
function home_mobile_notice() {
    if (/nokia|sony|ericsson|mot|samsung|htc|sgh|lg|sharp|sie-|philips|panasonic|alcatel|lenovo|iphone|phone|ipad|ipod|blackberry|meizu|android|netfront|symbian|ucweb|windowsce|webos|palm|operamini|operamobi|openwave|nexusone|cldc|midp|wap|mobile/i.test(navigator.userAgent)) {
        $SYS.is_mobile = true
    }
}
if (location.pathname == "/") {
    home_mobile_notice()
}
var regimg_loadevent = false;
function regSubmitProcess(a) {
    a.preventDefault();
    var b = true;
    $("#reg_form input").each(function () {
        var c = $(this).attr("type");
        if (c != "submit" && c != "hidden" && !$(this).hasClass("placeholder") && user_form.check(this) == false) {
            b = false;
            return false
        }
    });
    if (!b) {
        return false
    }
    $("#js_login_dialog div.lyzm").show();
    user_form.update_vcode("reg_captcha");
    if (!regimg_loadevent) {
        $("#reg_captcha").load(function () {
            $("#js_login_dialog div.val_add b").not(".delete").css("backgroundPositionX", "-500px").css("backgroundPositionY", "-500px");
            $("#js_login_dialog div.val_add b").not(".delete").css("background-position", "-500px -500px");
            $("#js_login_dialog div.val_add b").attr("c", "0");
            $("#reg_captcha_val").val("");
            var c = "url(" + $("#reg_captcha").attr("src") + ")";
            $("#js_login_dialog div.val_add b, #js_login_dialog div.val_input b, #js_login_dialog div.input_show span").not(".delete").css("background-image", c)
        });
        $("#js_login_dialog div.val_input").on("click", "a", function () {
            var c = $(this).find("b");
            var g = c.attr("num");
            var f = (document.all && !window.opera) ? [c.css("backgroundPositionX"), c.css("backgroundPositionY")] : c.css("background-position").split(" ");
            f[0] = parseInt(f[0].replace("px")) - 3;
            f[1] = parseInt(f[1].replace("px")) - 3;
            if (g != null) {
                var d = $("#reg_captcha_val").val() + g;
                $("#reg_captcha_val").val(d);
                $("#js_login_dialog div.val_add b").not(".delete").each(function (i) {
                    if ($(this).attr("c") != "1") {
                        $(this).css("background-position", f[0] + "px " + f[1] + "px");
                        $(this).css("backgroundPositionX", f[0] + "px");
                        $(this).css("backgroundPositionY", f[1] + "px");
                        $(this).attr("c", "1");
                        if (i == 3) {
                            reg_ajaxSubmit()
                        }
                        return false
                    }
                })
            }
        });
        $("#js_login_dialog div.val_add b.delete").click(function () {
            $(this).siblings("b").not(".delete").css("backgroundPositionX", "-500px").css("backgroundPositionY", "-500px");
            $(this).siblings("b").not(".delete").css("background-position", "-500px -500px");
            $(this).siblings("b").attr("c", "0");
            $("#reg_captcha_val").val("")
        });
        regimg_loadevent = true
    }
}
function check_time_delay(a) {
    var b = Math.round(new Date().getTime() / 1000);
    if (Math.abs(a - b) > 600) {
        var c = new Date(a * 1000);
        alert_msg("本机系统时间有误！错误的系统时间会导致flash播放器出现无限加载及其他不可预知的错误。<br>请校准本机系统时间后刷新页面。当前参考时间：" + c.toLocaleString())
    }
}
function set_ad_width() {
    var c = $(".room_box .rn3 .offi_cont");
    var a = c.outerWidth();
    var f = c.find("ul li").width();
    var d = Math.floor(a / f);
    d = d > 3 ? 3 : d;
    var b = Math.floor((a - (f * d)) / d / 2) - 10;
    $(c).find("ul li").css({"padding-left": b, "padding-right": b})
}
function html5_upload() {
    return typeof(window.FileReader) != "undefined"
}
$(document).ready(function (b) {
    if ($("body").data("page") == "home") {
        bottom_tips.init()
    } else {
        $(".js_index_but").removeClass("current")
    }
    if ($("#js_head_game,#js_head_team,#js_member_pic,#js_head_webgame").length > 0) {
        $("#js_head_game,#js_head_team,#js_member_pic,#js_head_webgame").dropdown({
            dropdownEl: ".js_head_show",
            openedClass: "on"
        })
    }
    if ($("input, textarea").length > 0) {
        $("input, textarea").placeholder()
    }
    if ($(".tse-scroll-content").length > 0) {
        $("img.lazy").lazyload({container: $(".tse-scroll-content")})
    } else {
        $("img.lazy").lazyload()
    }
    $(".js_live_setup,.js_his,#headfolow").hide();
    if ($SYS.uid) {
        $(".js_login_no").hide();
        $(".js_nickname").html($SYS.nickname);
        if ($SYS.qq_avatar) {
            $(".js_avatar").attr("src", $SYS.qq_avatar)
        } else {
            $(".js_avatar").attr("src", get_avatar($SYS.uid))
        }
        $("#left_big_show").css({top: 185});
        if ($SYS.own_room === "1") {
            $(".js_member_url").attr("href", "/room/my");
            $(".js_login_room,.js_live_setup").show()
        } else {
            $(".js_login_member").show()
        }
        $(".js_login_yes").show();
        $(".js_his,#headfolow").show();
        if ($SYS.groupid === "5" && ($(".js_login_sa").length > 0)) {
            $(".js_login_sa").show();
            $.ajax({
                type: "POST",
                url: "/room/my_admin/get_show",
                data: {room_id: $ROOM.room_id},
                success: function (c) {
                    $("#select_box").html(c)
                }
            });
            $("#select_box").delegate("#room_hide", "click", function (c) {
                if ($("#room_hide").data("id")) {
                    $.ajax({
                        type: "POST",
                        url: "/room/my_admin/del_room_hide",
                        data: {hide_id: $("#room_hide").data("id"), room_id: $ROOM.room_id},
                        success: function (d) {
                            $("#room_hide").data("id", 0);
                            $("#room_hide").html("隐藏房间");
                            $.dialog.tips_black("取消成功")
                        }
                    })
                } else {
                    $.dialog({
                        title: "房间隐藏设置",
                        content: '结束时间<input id="endtime" name="endtime"  class="queryInput Wdate" type="text"  onFocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})" style="width:160px" />',
                        okVal: "添加",
                        ok: function () {
                            if (!$("#endtime").val()) {
                                alert("请填写结束时间");
                                return false
                            } else {
                                $.ajax({
                                    type: "POST",
                                    url: "/room/my_admin/room_hide",
                                    dataType: "json",
                                    data: {room_id: $ROOM.room_id, endtime: $("#endtime").val()},
                                    success: function (d) {
                                        if (d.ret) {
                                            $("#room_hide").data("id", d.ret);
                                            $("#room_hide").html("取消隐藏")
                                        }
                                        $.dialog.tips_black(d.msg)
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    } else {
        $(".js_login_yes, .js_login_member, .js_login_room, .js_login_sa").hide();
        var a = window.location.hash;
        if (a && a.substr(1) === "dy_tool_reg") {
            user_dialog.open_reg()
        }
    }
    $(".js_head_menu").bind("mouseleave", function (c) {
        if ($("body").data("page") == "home") {
            $(".js_index_but").addClass("current")
        }
    });
    $(".js_search_txt").focus(function () {
        $(".js_search").animate({width: "140px"}, 300);
        $(".js_search_txt").animate({width: "102px"}, 300)
    });
    $(".js_search_txt").blur(function () {
        if ($(this).val().length == 0) {
            $("#search_word").attr("placeholder", "搜房间/主播")
        }
        $(".js_search").animate({width: "116px"}, 300);
        $(".js_search_txt").animate({width: "78px"}, 300)
    });
    $("#headfolow").mouseleave(function () {
        $(this).removeClass("on");
        $("#folowdiv").finish();
        $("#folowdiv").hide();
        $("#follow_sj").removeClass("his_up");
        if ($("#js_myfollow").data("stat") == 2) {
            $("#js_myfollow").data("stat", 0);
            $("#followlist").html("");
            $("#loadfollow").hide()
        }
    });
    $("#js_myfollow").mouseover(function () {
        if (!$SYS.uid) {
            return false
        }
        $("#folowdiv").finish();
        $("#folowdiv").slideDown("fast");
        $("#follow_sj").addClass("his_up");
        if ($(this).data("stat") == 0) {
            $("#loadfollow").show();
            $("#followlist").html("");
            $("#nofollow").hide();
            $(this).data("stat", 1);
            var c = "";
            c = "/member/cp/get_follow_list";
            $.ajax({
                type: "POST", url: c, dataType: "json", success: function (f) {
                    $("#js_myfollow").data("stat", 2);
                    $("#loadfollow").hide();
                    var d = "";
                    $.each(f.room_list, function (i, k) {
                        d += '<li class="li1"><p><a href="/' + k.room_id + '"  target="_blank">' + k.room_name + "</a></p>";
                        var j = parseInt((f.nowtime - k.show_time) / 60);
                        d += '<span><a href="/' + k.room_id + '" class="head_icon1"   target="_blank">已播' + j + "分钟</a> ";
                        d += '<a href="' + k.room_id + '" class="head_icon2"   target="_blank">' + k.nickname + "</a>";
                        d += '<a href="' + k.room_id + '" class="head_icon3"   target="_blank">' + get_show_online(k.online) + "</a> ";
                        d += "</span></li>"
                    });
                    if (d == "") {
                        var g = parseInt(f.nolive) > 0 ? "你关注的主播还没有开播" : "你的关注列表空空如也";
                        $("#nofollow").html(g);
                        $("#nofollow").show()
                    } else {
                        $("#followlist").html(d)
                    }
                }
            })
        }
        return false
    });
    $(".js_his").mouseleave(function () {
        $(this).removeClass("on");
        $(".js_his_list").finish();
        $(".js_his_list").hide();
        $("#his_sj").removeClass("his_up");
        if ($(".js_header_his").data("stat") == 2) {
            $(".js_header_his").data("stat", 0);
            $(".js_his_list ul").html("");
            $("#loadhis").hide()
        }
    });
    $(".js_header_his").mouseover(function () {
        if (!$SYS.uid) {
            return false
        }
        $(".js_his_list").finish();
        $(".js_his_list").slideDown("fast");
        $("#his_sj").addClass("his_up");
        if ($(this).data("stat") == 0) {
            $("#loadhis").show();
            var c = $(".js_his_list ul");
            c.html("");
            $(this).data("stat", 1);
            $(".js_no_his").hide();
            $.ajax({
                type: "POST", url: "/member/cp/get_user_history", dataType: "json", success: function (f) {
                    $(".js_header_his").data("stat", 2);
                    $("#loadhis").hide();
                    var g = f.nowtime;
                    var d = "";
                    $.each(f.history_list, function (i, j) {
                        j.n = $.trim(j.n);
                        d += '<li class="li1"><p><a href="/' + j.rid + '" target="_blank">' + (j.n != "" ? j.n : "&nbsp;&nbsp;") + '</a></p><span><a href="javascript:void(0);" class="';
                        d += j.ls == 0 ? "head_icon4" : "head_icon1";
                        d += '">';
                        d += get_his_time(f.nowtime, j.lt) + '</a><a href="javascript:void(0);" class="head_icon2">' + j.on + "</a>";
                        d += '<a href="javascript:void(0);" class="head_icon3">' + get_show_online(j.uc) + "</a></span></li>"
                    });
                    if (d == "") {
                        $(".js_no_his").show()
                    } else {
                        c.html(d)
                    }
                }
            })
        }
        return false
    });
    $("#culp a").click(user_dialog.hide);
    $("#login_captcha, #reg_captcha").click(function () {
        user_form.update_vcode($(this).attr("id"))
    });
    $("#login_captcha_val, #reg_captcha_val").focus(function () {
        var c = $(this).next();
        if (c.attr("src").indexOf("captcha") == -1) {
            c.trigger("click")
        }
    });
    $("#js_login, #js_reg").click(function () {
        if ($(this).attr("id") == "js_login") {
            user_dialog.open_login()
        } else {
            user_dialog.open_reg()
        }
        return false
    });
    $("#reg_form").submit(regSubmitProcess);
    $("#reg_form input[placeholder]").each(function () {
        $(this).blur(function () {
            if (user_form.check(this)) {
                var c = $(this).attr("name");
                var f = $(this);
                if (c == "nickname") {
                    doing = 1;
                    $.getJSON("/member/register/validate/nickname", "data=" + encodeURIComponent(f.val()), function (i) {
                        doing = 0;
                        if (i.result == 0) {
                            user_form.success(f)
                        } else {
                            if (i.result == -2) {
                                user_form.error("用户账号含有敏感字符", f)
                            } else {
                                user_form.error("用户账号不合法或已被占用", f)
                            }
                        }
                    })
                } else {
                    if (c == "email") {
                        var g = $.trim(f.val());
                        var d = /^\d+\@qq\.com$/i;
                        if (!d.test(g)) {
                            user_form.error("注册只能使用QQ纯数字邮箱", f);
                            return false
                        }
                        doing = 1;
                        $.getJSON("/member/register/check_email", "email=" + encodeURIComponent(f.val()), function (i) {
                            doing = 0;
                            if (i.result == 0) {
                                user_form.success(f)
                            } else {
                                user_form.error("邮箱地址已被使用", f)
                            }
                        })
                    }
                }
            }
        })
    });
    $("#login-form").submit(login_ajaxSubmit);
    $("#js_login_submit").click(function () {
        if (DragCheckEngine.getLiveStatus() && !DragCheckEngine.getCheckStatus()) {
            setTimeout(function () {
                $("#login-form").submit()
            }, 1000)
        } else {
            $("#login-form").submit()
        }
        return false
    });
    $("#login-form input").each(function () {
        if ($(this).attr("type") !== "submit" && $(this).attr("type") !== "hidden" && !$(this).hasClass("placeholder")) {
            $(this).blur(function () {
                user_form.check(this)
            })
        }
    });
    if (typeof $SYS.is_mobile == "boolean" && $SYS.is_mobile) {
        $("body").append(' <div id=\'mobile_notice_box\' class=\'hidden\'><div class="box_cont fl"><a href="/client/index" class="box_word">下载斗鱼TV客户端</a></div><a href=" javascript:; " class=" box_pic fr "></a><a href="/client/index" class="box_btn fr ">点击下载</a></div>');
        if ($(window).width() <= 640) {
            $("#header .head").append("<a href='/client/index' class='mobile_dload fr'>移动端下载</a> ")
        }
        $("#banner").remove();
        $("#mobile_notice_box .box_pic").click(function () {
            $("#mobile_notice_box").slideUp("fast", function () {
                $(this).remove()
            })
        })
    } else {
        $("#mobile_style_elem").remove()
    }
    $("#ad_6").delegate(".js_outwith_fid", "click", function (d) {
        var c = $(this).attr("href");
        if (typeof($ROOM) === "object" && c.indexOf("fid=") === -1) {
            if (c.indexOf("?") >= 0) {
                c += "&"
            } else {
                c += "?"
            }
            c += "fid=" + $ROOM.owner_uid;
            $(this).attr("href", c)
        }
    });
    (function (c) {
        function g(n) {
            if (jQuery.isEmptyObject(n)) {
                return ""
            }
            var o = "";
            c.each(n, function (p) {
                o += (n[p].name == undefined || n[p].name == "" ? "" : m(n[p].name) + "@=") + (n[p].value != undefined ? m(n[p].value) : "") + "/"
            });
            return o
        }

        function m(n) {
            n = c.trim(n);
            if (n != "") {
                n = n.replace(/@/g, "@A");
                n = n.replace(/\//g, "@S")
            }
            return n
        }

        function f(p) {
            if (p == "") {
                return false
            }
            p = p.replace(/@AAS/g, "/");
            var o = p.split("@S");
            var n = [];
            c.each(o, function (q, r) {
                var s = {};
                if (r.indexOf("@AS") != -1) {
                    var u = r.split("@AS");
                    c.each(u, function (w, x) {
                        var v = x.split("@AA=");
                        if (v[0] && v[0] != "") {
                            s[v[0]] = v[1]
                        }
                    });
                    n.push(s)
                } else {
                    return true
                }
            });
            return n
        }

        function j(n) {
            if (n != "") {
                n = n.replace(/@A/g, "@");
                n = n.replace(/@S/g, "/")
            }
            return n
        }

        function k() {
            var o = {};
            var q = {allowscriptaccess: "always", wmode: "opaque"};
            var p = {id: "aseswf_movie", name: "aseswf_movie"};
            var n = ((typeof($SYS) !== "undefined" && typeof($SYS.res_url) !== "undefined") ? $SYS.res_url : "/common/") + "simplayer/ase.swf";
            c("body").append("<div style='position:absolute; width:0px;overflow: hidden;'><div id='sign_swf_ase'></div></div>");
            swfobject.embedSWF(n, "sign_swf_ase", "1px", "1px", "9", "", o, q, p);
            window.return_getsigninfo = i
        }

        function i(o) {
            var n = [];
            if (o.indexOf("ad_list@=") != -1) {
                o = o.replace("ad_list@=", "");
                if (o.length > 5) {
                    n = f(o)
                } else {
                    return false
                }
            }
            if (n.length <= 0) {
                return false
            }
            c.each(n, function (s, A) {
                if (!A.adid || A.adid == "" || A.adid <= 0 || !A.srcid || A.srcid == "") {
                    return true
                }
                var u = c("#sign_p_" + A.posid);
                if (u.length <= 0) {
                    u = c(".sign_posid[data-sign_posid='" + A.posid + "']");
                    if (u.length <= 0) {
                        return true
                    }
                } else {
                    if (typeof($SYS.uid) !== "undefined" && $SYS.uid && u.hasClass("no_login")) {
                        u.hide()
                    } else {
                        if (A.posid == 15 || A.posid == 18) {
                            u.hide()
                        } else {
                            u.show()
                        }
                    }
                }
                var p = 0;
                if (typeof($ROOM) === "object") {
                    p = $ROOM.room_id
                }
                var r = A.srcid, w = c.trim(A.link);
                if (typeof($SYS.upload_url) !== "undefined") {
                    r = $SYS.upload_url + r
                }
                var z, x;
                if (w != "" && w.length > 5) {
                    w = "/signal/sign_click?roomid=" + p + "&aid=" + A.adid + "&posid=" + A.posid + "&projid=" + A.proid;
                    if (u.is("a")) {
                        u.attr("href", w).attr("target", "_blank").empty();
                        z = "100%";
                        x = "100%"
                    } else {
                        u.empty().append("<a href='" + w + "' target='_blank'></a>");
                        z = u.width() + "px";
                        x = u.height() + "px";
                        u = u.children("a")
                    }
                } else {
                    if (u.is("a")) {
                        u.removeAttr("href").empty()
                    } else {
                        u.empty()
                    }
                }
                if (r.indexOf(".swf") >= 0) {
                    var v = {wmode: "opaque", menu: "false"};
                    var q = "sign_p_" + A.posid + "_swf";
                    var y = ((typeof($SYS) !== "undefined" && typeof($SYS.res_url) !== "undefined") ? $SYS.res_url : "/common/") + "images/swfcover.gif";
                    u.append("<img src='" + y + "' class='sign_swfcover' style='position:absolute; width:" + z + "; height:" + x + "; margin:0px; padding:0px; border:0px;'><div id='" + q + "'></div>");
                    swfobject.embedSWF(r, q, "100%", "100%", "9.0.0", null, null, v)
                } else {
                    u.append("<img src='" + r + "'  />")
                }
            });
            if (c("#sign_p_15").children().length > 0) {
                c("#sign_p_15").show();
                setTimeout(function () {
                    c("#sign_p_15").hide();
                    if (c("#sign_p_18").children().length > 0) {
                        c("#sign_p_18").show();
                        setTimeout("$('#sign_p_18').hide()", 15000)
                    }
                }, 15000)
            } else {
                if (c("#sign_p_18").children().length > 0) {
                    c("#sign_p_18").show();
                    setTimeout("$('#sign_p_18').hide()", 15000)
                }
            }
            if (typeof($ROOM) === "object") {
                set_ad_width()
            }
        }

        function d() {
            c(window).resize(function () {
                c.each(c("img.sign_swfcover"), function (o, p) {
                    var n = c(p).closest(".sign_posid");
                    if (!n.is("a")) {
                        c(p).height(n.height()).width(n.width())
                    }
                })
            })
        }

        window.return_aseload = function () {
            if (typeof($SYS) !== "object") {
                return
            }
            var s = c("#aseswf_movie").get(0);
            var p = 0, o = 0;
            if (typeof($ROOM) === "object") {
                p = $ROOM.room_id
            }
            if ($SYS.uid && $SYS.uid != "") {
                o = $SYS.uid
            }
            var r = "";
            c.each(c(".sign_posid"), function (u, v) {
                var w = c(v).data("sign_posid");
                if (w && Number(w) > 0) {
                    r += Number(w) + "/"
                }
            });
            var n = Math.floor(Math.random() * $SYS.sport.length + 1) - 1;
            n = $SYS.sport[n];
            var q = [{name: "ip", value: $SYS.sgate}, {name: "port", value: n}, {name: "rid", value: p}, {
                name: "uid",
                value: o
            }, {name: "pos", value: r}];
            s.js_completeInfo(g(q))
        };
        if (c("body").hasClass("mobile")) {
            return true
        }
        if (typeof(swfobject) === "undefined") {
            var l = "simplayer/swfobject.min.js";
            if (typeof($SYS.res_url) !== "undefined") {
                l = $SYS.res_url + l
            } else {
                l = "/common/" + l
            }
            c.ajax({dataType: "script", cache: true, url: l}).done(function () {
                k();
                d()
            })
        } else {
            k();
            d()
        }
    })(jQuery)
});
(function () {
    var d = window.jQuery;
    var a = false;
    var b = false;
    var c = {
        ajax: {url: "/member/login/check_capcha_status", type: "post", dataType: "json"},
        path: "http://api.geetest.com/get.php?gt=",
        target: "",
        hideMod: ""
    };
    var f = {
        init: function (g) {
            c = d.extend(true, c, g);
            f.pub();
            if (!a) {
                f.load()
            }
        }, load: function () {
            d(c.hideMod).hide();
            var g = d.extend({}, c.ajax, {
                success: function (l) {
                    if (l.code == 0) {
                        var k = d.trim(l.id);
                        var m = d(c.target);
                        var i = d('<div class="drag-check-engine-box"></div>');
                        var j = document.createElement("script");
                        j.src = c.path + k;
                        i.get(0).appendChild(j);
                        m.get(0).appendChild(i.get(0));
                        d(c.hideMod).hide();
                        a = true
                    } else {
                        d(c.hideMod).show()
                    }
                }, error: function () {
                    d(c.hideMod).show()
                }
            });
            d.ajax(g)
        }, getLiveStatus: function () {
            return a
        }, getCheckStatus: function () {
            return b
        }, pub: function () {
            window.DragCheckEngine = f;
            window.gt_custom_ajax = function (i, g, k) {
                var j = i === 1 || k.toLowerCase() === "success";
                b = j;
                if (!j) {
                    setTimeout(function () {
                        d(".gt_refresh_button")[0].click()
                    }, 1200)
                }
            }
        }
    };
    window.DragCheckEngine = f
})(window);