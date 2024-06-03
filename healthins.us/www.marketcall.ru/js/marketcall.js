! function(e, t) {
    if (!e.Marketcall) {
        e.Marketcall = {
            Program: {
                state: 0
            },
            Widgets: {},
            Tracker: {
                trackEvent: function(e, t, a) {
                    console.log("Tracking event " + t + " " + a);
                    var n = {
                        program: e,
                        visitor: Marketcall.Helpers.getClientInfo(),
                        event: {
                            source: t,
                            action: a
                        }
                    };
                    Marketcall.Helpers.jQuery.ajax({
                        jsonp: "callback",
                        dataType: "jsonp",
                        url: Marketcall.Helpers.makeUrl("/api/v1/tracker/events"),
                        data: n,
                        error: function(e, t, a) {
                            console.log("Event tracker responded with error."), console.log(e.responseText)
                        },
                        success: function(e, t, a) {
                            202 == e.status && console.log("Event tracked successfully.")
                        }
                    })
                }
            },
            Helpers: {
                currentScript: "",
                injectTrackers: function(e) {
                    if (!("object" != typeof e || e.length < 1))
                        for (var t = Marketcall.Helpers.jQuery(Marketcall.Helpers.getScriptElement()), a = Marketcall.Helpers.jQuery("body"), n = 0; n < e.length; n++) e[n].code_before_body && (-1 == e[n].code_before_body.indexOf("<script") && (e[n].code_before_body = "<script>" + e[n].code_before_body + "<\/script>"), a.prepend(e[n].code_before_body)), e[n].code && (-1 == e[n].code.indexOf("<script") && (e[n].code = "<script>" + e[n].code + "<\/script>"), t.after(e[n].code))
                },
                loadFile: function(e, t, a) {
                    var n;
                    "js" === e ? ((n = document.createElement("script")).type = "text/javascript", n.src = t) : "css" === e && ((n = document.createElement("link")).type = "text/css", n.href = t, n.rel = "stylesheet"), a && (n.readyState ? n.onreadystatechange = function() {
                        "loaded" !== n.readyState && "complete" !== n.readyState || (n.onreadystatechange = null, a())
                    } : n.onload = function() {
                        a()
                    }), (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(n)
                },
                isMobile: function() {
                    var e = navigator.userAgent || navigator.vendor || window.opera;
                    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
                },
                getClientId: function() {
                    return n.id
                },
                updateClientId: function(e) {
                    n.id = e, Marketcall.Storage.set("client_id", e, "local", 43200), Marketcall.Helpers.setCookie("_mccid", e, {
                        domain: "." + document.domain.replace(/^www\./, ""),
                        expires: new Date((new Date).getTime() + 2592e6)
                    })
                },
                getParams: function(e) {
                    var t = Marketcall.Helpers.getScriptElement(e);
                    if (t) {
                        for (var a = t.src.split("?").pop().split("&"), n = {}, r = 0; r < a.length; r++) {
                            var o = a[r].split("=");
                            n[o[0]] = o[1]
                        }
                        return n
                    }
                    return {}
                },
                getScriptElement: function(e) {
                    void 0 === e && (e = Marketcall.Helpers.currentScript);
                    for (var t = document.getElementsByTagName("script"), a = 0; a < t.length; a++)
                        if (t[a].src.indexOf("/" + e) > -1) return t[a];
                    return !1
                },
                getCookie: function(e) {
                    var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
                    return t ? decodeURIComponent(t[1]) : void 0
                },
                setCookie: function(e, t, a) {
                    var n = (a = a || {}).expires,
                        r = a.domain;
                    if (r && Marketcall.Helpers.isIe() && /[а-яА-ЯЁё]/.test(r) && delete a.domain, "number" == typeof n && n) {
                        var o = new Date;
                        o.setTime(o.getTime() + 1e3 * n), n = a.expires = o
                    }
                    n && n.toUTCString && (a.expires = n.toUTCString());
                    var l = e + "=" + (t = encodeURIComponent(t));
                    for (var i in a) {
                        l += "; " + i;
                        var c = a[i];
                        !0 !== c && (l += "=" + c)
                    }
                    document.cookie = l
                },
                loadWidget: function(e, t) {
                    if (void 0 !== Marketcall.Widgets[e]) try {
                        Marketcall.Widgets[e].init(t, Marketcall.Helpers.jQuery)
                    } catch (t) {
                        console.error("Error " + e + " widget initialisation"), console.log(t)
                    } else console.error("Unknown widget " + e)
                },
                urlParam: function(e) {
                    var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
                    return null == t ? null : t[1] || 0
                },
                urlParams: function(e) {
                    void 0 === e && (e = window.location.search), e = e.substr(e.indexOf("?") + 1).split("&");
                    for (var t = {}, a = 0; a < e.length; ++a) {
                        var n = e[a].split("=");
                        t[n[0]] = 2 === n.length ? decodeURIComponent(n[1].replace(/\+/g, " ")) : ""
                    }
                    return t
                },
                getClientInfo: function() {
                    return n
                },
                getStatParams: function() {
                    var e = Marketcall.Storage.get("stat_params", "local"),
                        t = Marketcall.Helpers.urlParams();
                    if (!t.program_id && "object" == typeof e) return e;
                    try {
                        var a = {},
                            n = ["utm_source", "utm_medium", "utm_term", "utm_content", "utm_campaign", "subid", "subid1", "subid2", "subid3", "subid4"];
                        for (var r in t) {
                            var o = r.toLowerCase(); - 1 !== n.indexOf(o) && (a[o] = t[r])
                        }
                        return Marketcall.Storage.set("stat_params", a, "local", 43200), a
                    } catch (e) {
                        return console.log(e), {}
                    }
                },
                getEntrancePage: function() {
                    var t = Marketcall.Storage.get("entrance_page", "session") || e.location.href;
                    try {
                        Marketcall.Storage.set("entrance_page", t, "session")
                    } catch (e) {
                        console.log(e)
                    }
                    return t
                },
                getHttpReferrer: function() {
                    var t = Marketcall.Storage.get("http_referrer", "session") || e.document.referrer;
                    try {
                        Marketcall.Storage.set("http_referrer", t, "session")
                    } catch (e) {
                        console.log(e)
                    }
                    return t
                },
                getCookieDomain: function(t, a) {
                    return void 0 === t && (t = e.document.domain), a && (t = t.split(".").reverse().splice(0, 2).reverse().join(".")), "localhost" !== t ? "." + t.replace(/^www\./, "").replace(/^m\./, "") : t
                },
                makeUrl: function(e) {
                    return "https://www.marketcall.ru" + e
                },
                isIe: function() {
                    var e = window.navigator.userAgent,
                        t = e.indexOf("MSIE "),
                        a = !!e.match(/Edge\/\d+/);
                    return !!(t > 0 || a || navigator.userAgent.match(/Trident.*rv\:11\./))
                },
                source: function() {
                    return "marketcall.js" === this.currentScript ? "merchant" : "affiliate"
                }
            },
            Storage: function(e) {
                return {
                    prefix: "mcstore",
                    storage: {
                        local: e.localStorage,
                        session: e.sessionStorage
                    },
                    isAvailable: function() {
                        try {
                            return t && t.parse && t.stringify && e.sessionStorage
                        } catch (e) {
                            return console.log("Storage not available"), !1
                        }
                    },
                    get: function(e, a) {
                        if (!this.isAvailable()) return !1;
                        var n = "session" === a ? "session" : "local";
                        try {
                            var r = t.parse(this.storage[n][this.prefix + "." + e]);
                            return r && r._expired ? !((new Date).getTime() > r._expired) && r.data : r
                        } catch (e) {
                            return !1
                        }
                    },
                    set: function(e, a, n, r) {
                        if (!this.isAvailable()) return !1;
                        var o = "session" === n ? "session" : "local";
                        "number" == typeof r && (a = {
                            data: a,
                            _expired: (new Date).getTime() + 60 * r
                        });
                        try {
                            this.storage[o][this.prefix + "." + e] = t.stringify(a)
                        } catch (e) {
                            return !1
                        }
                    }
                }
            }(e)
        };
        var a = Marketcall.Helpers.getCookie("_mc_visitor_id") || Marketcall.Helpers.urlParam("mc_session_uuid") || "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16)
        });
        Marketcall.Helpers.setCookie("_mc_visitor_id", a, {
            domain: Marketcall.Helpers.getCookieDomain(),
            expires: new Date((new Date).getTime() + 2592e6)
        });
        var n = {
            id: Marketcall.Storage.get("client_id", "local") || Marketcall.Helpers.getCookie("_mccid"),
            visitor_id: a,
            url: e.location.href,
            user_agent: navigator.userAgent,
            stat_params: Marketcall.Helpers.getStatParams(),
            entrance_page: Marketcall.Helpers.getEntrancePage(),
            http_referrer: Marketcall.Helpers.getHttpReferrer()
        }
    }
}(window, window.JSON),
function() {
    window.Marketcall || (window.Marketcall = {
        Widgets: {}
    });
    var widget = function(params, jQuery) {
        var selectors = params.selector ? params.selector.split("|") : params.selector,
            phone = params.phone,
            hrefPhone = params.phoneToHref,
            phoneUnformatted = phone,
            mask = params.mask,
            replacer = params.replacer,
            code = params.code,
            init = function() {
                phone && mask && selectors ? (runUserCode(code), phone = unmaskPhone(phone, mask), console.log(phone), void 0 !== window.ComagicWidget && void 0 !== window.ComagicWidget.widget && window.ComagicWidget.widget.calltracking.MutationObserver.stop(), updatePhoneElems(selectors, phone, hrefPhone, replacer), jQuery.each(selectors, function(e, t) {
                    var a = function() {
                        jQuery(t).off("DOMSubtreeModified"), updatePhoneElems([t], phone, hrefPhone), Marketcall.Helpers.isIe() ? window.setTimeout(function() {
                            jQuery(t).on("DOMSubtreeModified", a)
                        }, 0) : jQuery(t).on("DOMSubtreeModified", a)
                    };
                    jQuery(t).on("DOMSubtreeModified", a)
                })) : (console.log("Response contains no params or is not full"), console.log(params))
            },
            runUserCode = function(code) {
                if (code) try {
                    eval(code)
                } catch (e) {
                    console.log("Error when running user code: " + e.message)
                }
            },
            unmaskPhone = function(e, t) {
                for (var a = "", n = t.length - 1, r = e.length - 1; n >= 0; n--) "X" == t[n] || "x" == t[n] ? (a = e[r] + a, r--) : a = t[n] + a;
                return a
            },
            isIe = function() {
                return !!(window.navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.match(/Trident.*rv\:11\./))
            },
            updatePhoneElems = function(selectors, phone, hrefPhone, replacer) {
                jQuery.each(selectors, function(i, selector) {
                    jQuery(selector).each(function(i, value) {
                        var v = jQuery(value);
                        if (replacer) try {
                            eval(replacer)
                        } catch (e) {
                            console.log(e.message)
                        } else v.html(phone), v.is("a") && v.attr("href") && v.attr("href").match("^tel:") && v.attr("href", "tel:" + hrefPhone)
                    })
                })
            };
        this.getPhone = function() {
            return phoneUnformatted
        }, init()
    };
    window.Marketcall.Widgets.PhoneReplacer = {
        init: function(e, t) {
            window.Marketcall.Widgets.PhoneReplacer = new widget(e, t)
        }
    }
}(),
function(e, t) {
    var a = function(e, a) {
        var n = t.Helpers.makeUrl("/api/v1/widget/callback?callback=?"),
            r = e.hasOwnProperty("locale") ? e.locale : "ru",
            o = e.hasOwnProperty("countryPhoneCode") ? e.countryPhoneCode : "7",
            l = "380" === o ? "+38 0** *** ** **" : "+" + o + " *** *** ** **",
            i = l.split("*").join("9"),
            c = {
                en: {
                    callback_button_text: "Call me now!",
                    panel_header_text: "We'll call you back",
                    panel_text: "Enter your phone number and click “_btn_text” button.",
                    panel_text_sub: "Our manager will contact you shortly.",
                    privacy_agreement_text: "By submitting this form you agree to the automated processing of your personal info.",
                    ref_link: "https://www.marketcall.com",
                    phone_button_header: "Request Callback",
                    phone_button_text: "Our manager will call you back.",
                    schedule_toggle_text: "Choose another time",
                    branding_povered_by: "Powered By",
                    branding_link_title: "Marketcall.net",
                    messages: {
                        wrong_number: "Invalid phone number.",
                        service_unavailable: "Service is unavailable."
                    },
                    phoneMask: "",
                    schedule: {
                        callback_button_text: "Submit callback request!",
                        panel_text: "Please enter your phone number, choose date and time when you'll be able to answer call, and click “_btn_text” button.",
                        phone_button_text: "Our manager will contact you at a specified time.",
                        panel_text_sub: "Our manager will contact you at a specified time and will answer your questions in detail.",
                        schedule_toggle_text: "I can answer now"
                    },
                    day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    month_names_gen: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                },
                ru: {
                    callback_button_text: "Позвоните сейчас!",
                    panel_header_text: "Мы вам перезвоним",
                    panel_text: "Укажите ваш номер телефона и нажмите кнопку “_btn_text”.",
                    panel_text_sub: "Наш специалист свяжется с вами и подробно ответит на все вопросы.",
                    privacy_agreement_text: 'Нажимая на кнопку, вы принимаете <a href="https://www.marketcall.ru/legal/regulation" target="_blank">Положение</a> и <a href="https://www.marketcall.ru/legal/agreement" target="_blank">Согласие</a> на обработку персональных данных.',
                    ref_link: "https://www.marketcall.ru",
                    phone_button_header: "Заказать обратный звонок",
                    phone_button_text: "Наш специалист перезвонит вам.",
                    schedule_toggle_text: "Выбрать другое время",
                    branding_povered_by: "Технология",
                    branding_link_title: "Marketcall.ru",
                    messages: {
                        wrong_number: "Укажите правильный номер.",
                        service_unavailable: "Сервис недоступен."
                    },
                    phoneMask: "",
                    schedule: {
                        callback_button_text: "Оставить заявку!",
                        panel_text: "Укажите ваш номер телефона, выберите дату и время, и нажмите кнопку “_btn_text”.",
                        phone_button_text: "Наш специалист перезвонит вам в указанное вами время.",
                        panel_text_sub: "Наш специалист свяжется с вами в указанное время и подробно ответит на все вопросы.",
                        schedule_toggle_text: "Могу говорить сейчас"
                    },
                    day_names: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                    month_names_gen: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
                },
                ua: {
                    callback_button_text: "Зателефонувати зараз!",
                    panel_header_text: "Ми вам перетелефонуємо",
                    panel_text: "Вкажіть ваш номер телефону та натисніть кнопку  “_btn_text”.",
                    panel_text_sub: "Наш спеціаліст зв'яжеться с вами та детально відповість на всі запитання.",
                    privacy_agreement_text: 'Тиснучи на кнопку, ви приймаєте<a href="https://www.marketcall.com.ua/legal/regulation" target="_blank">Положення</a> и <a href="https://www.marketcall.com.ua/legal/agreement" target="_blank">Согласие</a> та З году на обробку персональних даних',
                    ref_link: "https://www.marketcall.com.ua",
                    phone_button_header: "Заказать обратный звонок",
                    phone_button_text: "Наш фахівець зв'яжеться з вам.",
                    schedule_toggle_text: "Вибрати інший час",
                    branding_povered_by: "Технологія",
                    branding_link_title: "Marketcall.com.ua",
                    messages: {
                        wrong_number: "Вкажіть правильний номер.",
                        service_unavailable: "Сервіс недоступний."
                    },
                    phoneMask: "",
                    schedule: {
                        callback_button_text: "Залишити заявку!",
                        panel_text: "Вкажіть ваш номер телефону, виберіть дату і час, і натисніть кнопку “_btn_text”.",
                        phone_button_text: "Наш фахівець зв'яжеться з вам у вказаний вами час.",
                        panel_text_sub: "Наш фахівець зв'яжеться з вами у вказаний час і докладно відповість на всі питання.",
                        schedule_toggle_text: "Можу говорити зараз"
                    },
                    day_names: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
                    month_names_gen: ["січня", "лютого", "березня", "квітня", "травня", "червень", "липень", "серпня", "вересня", "жовтня", "листопада", "грудня"]
                },
                tr: {
                    callback_button_text: "Şimdi arayın",
                    panel_header_text: "Size geri arayacağız",
                    panel_text: "Telefon numaranız girin, tarih ve saati seçin ve “_btn_text”i tıklayın.",
                    panel_text_sub: "Uzmanımız belirli bir zamanda sizinle ulaşacak ve tüm soruları ayrıntılı olarak cevaplayacak.",
                    privacy_agreement_text: ' Bu düğmeye basarak <a href="https://www.marketcall.net/legal/regulation" target="_blank">pozisyon</a> ve <a href="https://www.marketcall.net/legal/agreement" target="_blank">anlaşma</a> .',
                    ref_link: "https://www.marketcall.ru",
                    phone_button_header: "Biz sizi arayalım",
                    phone_button_text: "Uzmanımız sizi geri arayacak.",
                    schedule_toggle_text: "Başka bir zaman seçin",
                    branding_povered_by: "Teknoloji",
                    branding_link_title: "Marketcall.ru",
                    messages: {
                        wrong_number: "Doğru numara belirtin.",
                        service_unavailable: "Hizmet kullanılamıyor."
                    },
                    phoneMask: "",
                    schedule: {
                        callback_button_text: "Başvuru yapın",
                        panel_text: "Telefon numaranız girin, tarih ve saati seçin ve “_btn_text”i tıklayın.",
                        phone_button_text: "Uzmanımız belirttiğiniz sürede sizinle iletişime geçecek.",
                        panel_text_sub: "Uzmanımız belirli bir zamanda sizinle ulaşacak ve tüm soruları ayrıntılı olarak cevaplayacak.",
                        schedule_toggle_text: "Şimdi konuşabilirım"
                    },
                    day_names: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
                    month_names_gen: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
                }
            }[r],
            s = !1;
        e.hasOwnProperty("hide_branding") && 1 == e.hide_branding ? s = !0 : e.hasOwnProperty("default_id") && e.callbacks.hasOwnProperty(e.default_id) && void 0 !== e.callbacks[e.default_id] && e.callbacks[e.default_id].hide_branding && (s = !0);
        var d, u, p, m, g, _, h, f = !1 === s ? c.branding_povered_by + ' <a class="mc-panel-ref-link" href="_ref_link">' + c.branding_link_title + "</a>" : "",
            b = '<div class="mc_schedule" style="display:none"><select name="date" data-dependency="[name=\'hours\']" disabled></select><br><select name="hours" data-dependency="[name=\'minutes\']" data-step="60" data-value-func="getHours" disabled></select><select name="minutes" data-step="15" data-value-func="getMinutes" disabled></select></div>',
            v = '<div id="mc_panel"><div class="mc_panel_close mc_close"><a href="#"><img src="https://www.marketcall.ru/img/widgets/mc_icon_close.png"></a></div><div id="mc_panel_content"><div id="mc_panel_lcontent"><b class="mc-panel-header-text">_panel_header_text</b><p class="mc-panel-text">_panel_text </p><p class="mc-panel-text-sub">_panel_text_sub</p></div><div id="mc_panel_rcontent"><input class="mc_phone" placeholder="' + l + '" type="text"><div class="mc_message"></div>' + b + '<a class="mc_panel_button mc_callback" href="#"><img src="https://www.marketcall.ru/img/widgets/mc_icon_phone.png"> <span class="mc-panel-btn-text">_btn_text</span></a><a href="#" class="mc_panel_time mc_toggle_schedule">_schedule_toggle_text</a></div></div><p class="mc_privacy_agreement">_privacy_agreement_text</p><div class="mc_panel_mc">' + f + "</div></div>",
            k = '<div class="mc_ds"> <div id="mc_popup"><div class="mc_popup_close mc_close"><a href=#><img src="https://www.marketcall.ru/img/widgets/mc_icon_close.png"></a></div><b class="mc-panel-header-text">_panel_header_text</b> <p class="mc-panel-text">_panel_text</p><input class="mc_phone" type="text" placeholder="' + l + '"><div class="mc_message"></div>' + b + '<a class="mc_popup_button mc_callback" href=#><img src="https://www.marketcall.ru/img/widgets/mc_icon_phone.png"> <span class="mc-panel-btn-text">_btn_text</span></a><a href="#" class="mc_popup_time mc_toggle_schedule">_schedule_toggle_text</a><p class="mc_privacy_agreement">_privacy_agreement_text</p><div class="mc_popup_mc">' + f + "</div></div> </div>",
            w = '<div id="mc_mobile"><div class="mc_mobile_close mc_close"><a href=#><img src="https://www.marketcall.ru/img/widgets/mc_icon_close.png"></a></div><div class="mc_mobile_content"><b class="mc-panel-header-text">_panel_header_text</b><p class="mc-panel-text">_panel_text</p><input class="mc_phone" type="text" placeholder="' + l + '"><div class="mc_message"></div>' + b + '<a class="mc_mobile_button mc_callback" href=#><img src="https://www.marketcall.ru/img/widgets/mc_icon_phone.png"> <span class="mc-panel-btn-text">_btn_text</span></a><a href="#" class="mc_mobile_time mc_toggle_schedule">_schedule_toggle_text</a></div><p class="mc_privacy_agreement">_privacy_agreement_text</p><div class="mc_mobile_mc">' + f + "</div></div>",
            x = '<div id="mc_layout"><div id="mc_button"><div id="mc_container"><div class="mc_icon"><img src="https://www.marketcall.ru/img/widgets/mc_icon_phone.png"></div><div class="mc_desc"><b>_phone_button_header</b>_phone_button_text</div></div> </div></div>',
            y = this,
            M = !1,
            j = {},
            S = function(e, o, l) {
                if (!M)
                    if ("function" == typeof(o = o || {}) && (l = o), "function" != typeof l && (l = function() {}), e = e.toString().replace(/[^\d]/g, ""), !1 !== /^((7|1)\d{10,11})|(380\d{9})$/.test(e)) {
                        M = !0, u.add(p).find(".mc_callback").addClass("disabled");
                        var i = a.getJSON(n, {
                            program_id: _ || g,
                            client_phone: e,
                            client_info: t.Helpers.getClientInfo(),
                            datetime: o.datetime,
                            locale: r
                        }, function(e) {
                            M = !1, u.add(p).find(".mc_callback").removeClass("disabled"), l(e)
                        });
                        i.fail && i.fail(function() {
                            M = !1, u.add(p).find(".mc_callback").removeClass("disabled"), l({
                                error: {
                                    message: c.messages.service_unavailable
                                }
                            })
                        })
                    } else l({
                        error: {
                            message: c.messages.wrong_number
                        }
                    })
            },
            H = function(e) {
                if (void 0 !== j[e] && 1 != j[e].phone_button_hide) {
                    (d = a(x.replace("_phone_button_header", j[e].phone_button_header || c.phone_button_header).replace("_phone_button_text", j[e].phone_button_text || c.phone_button_text)).attr("program-id", e)).find("#mc_button").bind("click", function(e) {
                        e.preventDefault(), y.openPanel(d.attr("program-id"))
                    });
                    var t = [];
                    j[e].phone_button_color && t.push("#mc_button .mc_icon { background-color:" + j[e].phone_button_color + " !important; }"), j[e].phone_bg_color && t.push("#mc_container { background-color:" + j[e].phone_bg_color + " !important; }"), j[e].phone_border_color && t.push("#mc_button { border-color:" + j[e].phone_border_color + " !important; }"), a("body").append(a("<style/>").text(t.join(" "))).append(d)
                }
            },
            C = function() {
                u = a((t.Helpers.isMobile() ? w : v).replace("_panel_header_text", c.panel_header_text).replace("_panel_text", c.panel_text).replace("_panel_text_sub", c.panel_text_sub).replace(/_btn_text/g, c.callback_button_text).replace("_ref_link", c.ref_link).replace("_privacy_agreement_text", c.privacy_agreement_text)), p = t.Helpers.isMobile() ? u : a(k.replace("_panel_header_text", c.panel_header_text).replace("_panel_text", c.panel_text).replace("_panel_text_sub", c.panel_text_sub).replace(/_btn_text/g, c.callback_button_text).replace("_ref_link", c.ref_link).replace("_privacy_agreement_text", c.privacy_agreement_text)), u.add(p[0]).find(".mc_callback").bind("click", function(e) {
                    e.preventDefault(), m.trigger("submitted.mc.form"), T("");
                    var a = m.find(".mc_phone"),
                        n = a.val();
                    a.css("border", "");
                    var r = {
                        datetime: m.find(".mc_schedule [disabled]").length > 0 ? "" : new Date(parseInt(m.find('[name="minutes"]').val())).toUTCString()
                    };
                    S(n, r, function(e) {
                        if (e.error) return a.css("border", "1px solid red"), T(e.error.message), void m.trigger(W("error.mc.form", {
                            phone: n
                        }));
                        e.success && (T(e.message), t.Helpers.updateClientId(e.client_id), m.trigger(W("success.mc.form", {
                            phone: n
                        })))
                    })
                }), u.add(p[0]).find(".mc_phone").bind("keyup", function(e) {}).bind("focus", function(e) {
                    a(this).data("placeholder", a(this).attr("placeholder")).attr("placeholder", "")
                }).bind("blur", function(e) {
                    a(this).attr("placeholder", a(this).data("placeholder")).data("placeholder", "")
                }).mask(i, {
                    autoclear: !1
                }), u.add(p[0]).find(".mc_close").bind("click", function(e) {
                    e.preventDefault(), y.closePanel()
                }), O(), a("body").append(u).append(p)
            };
        this.openPanel = function(e, t) {
            (e = e || d.attr("program-id")) && j[e] ? (_ = e, void 0 === t && (t = j[e].popup ? "popup" : "panel"), m = "popup" == t ? p : u, E(j[e]), D(j[e] || c, m), T(""), m.addClass("mc_active"), m.trigger("shown.mc.panel"), P(new Date) ? 1 != j[e].delayed_off_hours_only && I() ? A(m.find(".mc_schedule")) : (m.find(".mc_toggle_schedule").hide(), U("hide")) : (m.find(".mc_toggle_schedule").hide(), U(I() ? "show" : "hide"))) : console.log("no config for program " + e)
        }, this.closePanel = function() {
            m.removeClass("mc_active"), m.trigger("hidden.mc.panel"), _ = null
        }, this.on = function(e, t) {
            u.add(p[0]).bind(e, function(a) {
                try {
                    t(a)
                } catch (a) {
                    window.console.log("Error when running " + e + " callback. Check your code."), window.console.log("Error " + a.name + ":" + a.message + "\n" + a.stack)
                }
            })
        }, this.call = function() {
            if (arguments.length < 1) console.error("Not enough arguments");
            else {
                var e = arguments[0],
                    t = "object" == typeof arguments[1] ? arguments[1] : {};
                t.program_id && (_ = t.program_id);
                var a = "function" == typeof arguments[1] ? arguments[1] : arguments[2];
                S(e, t, a), _ = null
            }
        }, this.getPhone = function(e) {
            return void 0 === e && (e = g), j[e] && j[e].phone
        };
        var T = function(e) {
                m.find(".mc_message").text(e)
            },
            E = function(e) {
                h || (h = a("<style/>"), a("body").append(h));
                var t = [];
                e.callback_button_text_color && t.push(".mc_callback { color:" + e.callback_button_text_color + " !important; }"), e.callback_button_color && t.push(".mc_callback { background-color:" + e.callback_button_color + " !important; }"), e.callback_button_color_hover && t.push(".mc_callback:hover { background-color:" + e.callback_button_color_hover + " !important; }"), h.text(t.join(" "))
            },
            D = function(e, t) {
                t.find(".mc-panel-header-text").text(e.panel_header_text || c.panel_header_text), t.find(".mc-panel-text").text((e.panel_text || c.panel_text).replace(/_btn_text/g, e.callback_button_text || c.callback_button_text)), t.find(".mc-panel-text-sub").text(e.panel_text_sub || c.panel_text_sub), t.find(".mc-panel-btn-text").text(e.callback_button_text || c.callback_button_text), t.find(".mc-panel-ref-link").attr("href", e.ref_link || c.ref_link), t.find(".mc_toggle_schedule").text(e.schedule_toggle_text || c.schedule_toggle_text)
            };
        var z = function() {
                if ("object" == typeof j[_].workingHours) return j[_].workingHours;
                if ("object" != typeof j[_].working_hours || 0 == j[_].working_hours.length) return {};
                j[_].hasSchedule = !0;
                var e = {},
                    t = new Date,
                    n = 60 * (t.getTimezoneOffset() + j[_].timezone_offset) * 1e3,
                    r = new Date(t.getTime() + n),
                    o = function(e) {
                        return e.getMonth().toString() + "-" + e.getDate()
                    },
                    l = function(t, a) {
                        void 0 === e[o(t)] && (e[o(t)] = []), e[o(t)].push([t.getTime(), a.getTime()])
                    };
                return a.each(j[_].working_hours, function(e, t) {
                    for (var a = 0; a < 7; a++) {
                        var o = new Date(r.getTime());
                        if (o.setDate(r.getDate() + a), 0 != (t.days & Math.pow(2, (o.getDay() || 7) - 1))) {
                            var i = new Date(o.getTime());
                            o.setHours.apply(o, t.time_range[0].split(":")), i.setHours.apply(i, t.time_range[1].split(":")), o.setTime(o.getTime() - n), i.setTime(i.getTime() - n), i.getDate() != o.getDate() && (l(o, new Date(o.getFullYear(), o.getMonth(), o.getDate(), 23, 59, 59)), o = new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0)), l(o, i)
                        }
                    }
                }), j[_].workingHours = e
            },
            P = function(e) {
                var t = z(),
                    a = e.getMonth().toString() + "-" + e.getDate();
                if (!t[a] || 0 === t[a].length) return !1;
                for (var n = 0; n < t[a].length; n++)
                    if (t[a][n][0] <= e.getTime() && t[a][n][1] >= e.getTime()) return !0;
                return !1
            },
            O = function() {
                var e = function(t, n, r) {
                    if ("object" == typeof t[0]) return a.map(t, function(t) {
                        return e(t, n, r)
                    });
                    for (var o = a([]), l = (new Date).getTime(), i = new Date(t[0]); i.getTime() < t[1];) {
                        var c = [i.getTime()],
                            s = i[r]();
                        i.setMinutes(60 == n ? n : i.getMinutes() + n), c[0] > l && (o = o.add(a("<option>").val(c[0]).data("range", c).text(s < 10 ? "0" + s : s)), c.push(i.getTime() < t[1] ? i.getTime() : t[1]))
                    }
                    return o
                };
                u.add(p).find(".mc_toggle_schedule").bind("click", function(e) {
                    e.preventDefault(), U()
                }), u.add(p).find("select").bind("change", function() {
                    var t = a(this),
                        n = m.find(t.data("dependency"));
                    if (0 !== n.length) {
                        var r = t.find(":selected");
                        n.html(e(r.data("range"), n.data("step"), n.data("value-func"))).trigger("change")
                    }
                })
            },
            U = function(e) {
                var t = m.find(".mc_schedule");
                t.toggle("string" == typeof e ? "show" === e : void 0), t.is(":visible") ? (D(j[_] && j[_].schedule || c.schedule, m), A(t), t.find("select").removeAttr("disabled")) : (D(j[_] || c.schedule, m), t.find("select").attr("disabled", "disabled"))
            },
            A = function(e) {
                e.find('select[name="date"]').html(Q()).trigger("change")
            },
            Q = function() {
                var e = new Date;
                return e.setMinutes(e.getMinutes() + 30), e = e.getTime(), a.map(z(), function(t) {
                    return 0 !== t.length && (!(e >= t[t.length - 1][1]) && a("<option>").data("range", t).text((n = new Date(t[0][0])).getDate().toString() + " " + c.month_names_gen[n.getMonth()] + " (" + c.day_names[n.getDay()] + ")"));
                    var n
                })
            },
            I = function() {
                return j[_].hasSchedule
            },
            W = function(e, a) {
                return t.Helpers.jQuery.Event ? t.Helpers.jQuery.Event(e, a) : e
            };
        t.Helpers.getClientInfo(), C(), j = e.callbacks || {}, e.program_id && (j[e.program_id] = e), (e.program_id || e.default_id) && (g = e.program_id || e.default_id, H(e.program_id || e.default_id)), a(".mc-callback").bind("click", function(e) {
            e.preventDefault(), y.openPanel(a(this).attr("program-id"))
        }).each(function(e, t) {
            j[a(t).attr("program-id")] && a(t).append('<div class="mc-icon-phone"><img src="https://www.marketcall.ru/img/mc_icon_phone.svg"></div>')
        }), y.on("shown.mc.panel", function() {
            new Function(j[_] && j[_].panel_shown_callback)()
        }), y.on("hidden.mc.panel", function() {
            new Function(j[_] && j[_].panel_hidden_callback)()
        }), y.on("submitted.mc.form", function() {
            new Function(j[_] && j[_].form_submitted_callback)()
        })
    };
    t.Widgets.Callback = {
        init: function(e, n) {
            t.Helpers.loadFile("css", t.Helpers.makeUrl("/css/widgets/callback.css"), function() {
                var r, o, l, i, c, s;
                r = n, l = navigator.userAgent, i = /iphone/i.test(l), c = /chrome/i.test(l), s = /android/i.test(l), r.mask = {
                    definitions: {
                        9: "[0-9]",
                        a: "[A-Za-z]",
                        "*": "[A-Za-z0-9]"
                    },
                    autoclear: !0,
                    dataName: "rawMaskFn",
                    placeholder: "_"
                }, r.fn.extend({
                    caret: function(e, t) {
                        var a;
                        if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function() {
                            this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((a = this.createTextRange()).collapse(!0), a.moveEnd("character", t), a.moveStart("character", e), a.select())
                        })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (a = document.selection.createRange(), e = 0 - a.duplicate().moveStart("character", -1e5), t = e + a.text.length), {
                            begin: e,
                            end: t
                        })
                    },
                    unmask: function() {
                        return this.trigger("unmask")
                    },
                    mask: function(e, t) {
                        var a, n, l, d, u, p, m;
                        if (!e && this.length > 0) {
                            var g = r(this[0]).data(r.mask.dataName);
                            return g ? g() : void 0
                        }
                        return t = r.extend({
                            autoclear: r.mask.autoclear,
                            placeholder: r.mask.placeholder,
                            completed: null
                        }, t), a = r.mask.definitions, n = [], l = p = e.length, d = null, r.each(e.split(""), function(e, t) {
                            "?" == t ? (p--, l = e) : a[t] ? (n.push(new RegExp(a[t])), null === d && (d = n.length - 1), l > e && (u = n.length - 1)) : n.push(null)
                        }), this.trigger("unmask").each(function() {
                            function g() {
                                if (t.completed) {
                                    for (var e = d; u >= e; e++)
                                        if (n[e] && y[e] === _(e)) return;
                                    t.completed.call(x)
                                }
                            }

                            function _(e) {
                                return t.placeholder.charAt(e < t.placeholder.length ? e : 0)
                            }

                            function h(e) {
                                for (; ++e < p && !n[e];);
                                return e
                            }

                            function f(e, t) {
                                var a, r;
                                if (!(0 > e)) {
                                    for (a = e, r = h(t); p > a; a++)
                                        if (n[a]) {
                                            if (!(p > r && n[a].test(y[r]))) break;
                                            y[a] = y[r], y[r] = _(r), r = h(r)
                                        }
                                    k(), x.caret(Math.max(d, e))
                                }
                            }

                            function b() {
                                w(), x.val() != j && x.change()
                            }

                            function v(e, t) {
                                var a;
                                for (a = e; t > a && p > a; a++) n[a] && (y[a] = _(a))
                            }

                            function k() {
                                x.val(y.join(""))
                            }

                            function w(e) {
                                var a, r, o, i = x.val(),
                                    c = -1;
                                for (a = 0, o = 0; p > a; a++)
                                    if (n[a]) {
                                        for (y[a] = _(a); o++ < i.length;)
                                            if (r = i.charAt(o - 1), n[a].test(r)) {
                                                y[a] = r, c = a;
                                                break
                                            }
                                        if (o > i.length) {
                                            v(a + 1, p);
                                            break
                                        }
                                    } else y[a] === i.charAt(o) && o++, l > a && (c = a);
                                return e ? k() : l > c + 1 ? t.autoclear || y.join("") === M ? (x.val() && x.val(""), v(0, p)) : k() : (k(), x.val(x.val().substring(0, c + 1))), l ? a : d
                            }
                            var x = r(this),
                                y = r.map(e.split(""), function(e, t) {
                                    return "?" != e ? a[e] ? _(t) : e : void 0
                                }),
                                M = y.join(""),
                                j = x.val();
                            x.data(r.mask.dataName, function() {
                                return r.map(y, function(e, t) {
                                    return n[t] && e != _(t) ? e : null
                                }).join("")
                            }), x.one("unmask", function() {
                                x.unbind(".mask").removeData(r.mask.dataName)
                            }).bind("focus.mask", function() {
                                var t;
                                x.attr("readonly") || (clearTimeout(o), j = x.val(), t = w(), o = setTimeout(function() {
                                    x.get(0) === document.activeElement && (k(), t == e.replace("?", "").length ? x.caret(0, t) : x.caret(t))
                                }, 10))
                            }).bind("blur.mask", b).bind("keydown.mask", function(e) {
                                if (!x.attr("readonly")) {
                                    var t, a, r, o = e.which || e.keyCode;
                                    m = x.val(), 8 === o || 46 === o || i && 127 === o ? (t = x.caret(), a = t.begin, (r = t.end) - a == 0 && (a = 46 !== o ? function(e) {
                                        for (; --e >= 0 && !n[e];);
                                        return e
                                    }(a) : r = h(a - 1), r = 46 === o ? h(r) : r), v(a, r), f(a, r - 1), e.preventDefault()) : 13 === o ? b.call(this, e) : 27 === o && (x.val(j), x.caret(0, w()), e.preventDefault())
                                }
                            }).bind("keypress.mask", function(e) {
                                if (!x.attr("readonly")) {
                                    var t, a, o, l = e.which || e.keyCode,
                                        i = x.caret();
                                    e.ctrlKey || e.altKey || e.metaKey || 32 > l || !l || 13 === l || (i.end - i.begin != 0 && (v(i.begin, i.end), f(i.begin, i.end - 1)), t = h(i.begin - 1), p > t && (a = String.fromCharCode(l), n[t].test(a)) && (function(e) {
                                        var t, a, r, o;
                                        for (t = e, a = _(e); p > t; t++)
                                            if (n[t]) {
                                                if (r = h(t), o = y[t], y[t] = a, !(p > r && n[r].test(o))) break;
                                                a = o
                                            }
                                    }(t), y[t] = a, k(), o = h(t), s ? setTimeout(function() {
                                        r.proxy(r.fn.caret, x, o)()
                                    }, 0) : x.caret(o), i.begin <= u && g()), e.preventDefault())
                                }
                            }).bind("input.mask paste.mask", function() {
                                x.attr("readonly") || setTimeout(function() {
                                    var e = w(!0);
                                    x.caret(e), g()
                                }, 0)
                            }), c && s && x.unbind("input.mask").bind("input.mask", function() {
                                var e = x.val(),
                                    t = x.caret(),
                                    a = function() {
                                        r.proxy(r.fn.caret, x, t.begin, t.begin)()
                                    };
                                if (m && m.length && m.length > e.length) {
                                    for (w(!0); t.begin > 0 && !n[t.begin - 1];) t.begin--;
                                    if (0 === t.begin)
                                        for (; t.begin < d && !n[t.begin];) t.begin++;
                                    setTimeout(a, 0)
                                } else {
                                    var o = w(!0),
                                        l = e.charAt(t.begin);
                                    t.begin < p && (n[t.begin] ? n[t.begin].test(l) && t.begin++ : t.begin = o), setTimeout(a, 0)
                                }
                                g()
                            }), w()
                        })
                    }
                }), t.Widgets.Callback = new a(e, n), document.dispatchEvent(new Event("callback_loaded.mc.widget")), t.Helpers.jQuery(document).trigger("callback_loaded.mc.widget")
            }), t.Helpers.loadFile("css", "https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,cyrillic,cyrillic-ext")
        }
    }
}(window, window.Marketcall || (window.Marketcall = {
    Widgets: {}
})),
function() {
    const widget = function(params, jQuery) {
        console.log(params);
        const init = function() {
                jQuery = Marketcall.Helpers.jQuery, console.log("Lead mapper init"), Marketcall.Tracker.trackEvent(params.program_id, "lead_mapper", "view"), console.log("Calling integration code...");
                try {
                    eval(params.code)
                } catch (e) {
                    console.log("Error when running code: " + e.message)
                }
            },
            sendLead = function(e, t, a) {
                const n = {
                    channel_key: "uIGn0zqpUCyrzq6uDfsd1Mqj8P1hiKIP",
                    program: a || params.program_id,
                    template: t || params.template,
                    body: e.body,
                    cost: e.cost,
                    subid: e.subid,
                    subid1: e.subid1,
                    subid2: e.subid2,
                    subid3: e.subid3,
                    subid4: e.subid4,
                    affiliate_own_id: e.affiliate_own_id,
                    merchant_own_id: e.merchant_own_id,
                    session_uuid: Marketcall.Helpers.getClientInfo().visitor_id,
                    widget: {
                        type: "lead_mapper",
                        source: Marketcall.Helpers.source()
                    }
                };
                n.template && !1 === /^\d+$/.test(n.template) && (n.action = n.template), console.log(n), jQuery.ajax({
                    type: "POST",
                    jsonp: "callback",
                    dataType: "jsonp",
                    url: Marketcall.Helpers.makeUrl("/api/v1/widget/leads"),
                    data: n,
                    error: function(e, t, a) {
                        console.log(e.responseText)
                    },
                    success: function(e, t, a) {
                        switch (console.log(e), parseInt(e.status)) {
                            case 201:
                                console.log("Success lead sent.", e.id), Marketcall.Helpers.jQuery(document).trigger("success.lead-mapper.mc", {
                                    id: e.id
                                });
                                break;
                            case 422:
                                console.log("Validation error.", e.errors), Marketcall.Helpers.jQuery(document).trigger("error.lead-mapper.mc", {
                                    code: 422,
                                    errors: e.errors
                                });
                                break;
                            case 500:
                                console.log("Fatal error.", e.errors), Marketcall.Helpers.jQuery(document).trigger("error.lead-mapper.mc", {
                                    code: 500,
                                    errors: e.errors
                                });
                                break;
                            default:
                                console.log("Unknown response code.", e)
                        }
                    }
                })
            };
        return init(), {
            sendLead: sendLead
        }
    };
    window.Marketcall.Widgets.LeadMapper = {
        init: function(e, t) {
            window.Marketcall.Widgets.LeadMapper = new widget(e, t), document.dispatchEvent(new Event("lead_mapper_loaded.mc.widget")), console.log("Lead mapper loaded")
        }
    }
}(),
function() {
    var e = function(e, t) {
        t.fn.serializeObject = function() {
            var e = {};
            return t.each(this.serializeArray(), function(a, n) {
                var r = n.name,
                    o = n.value;
                e[r] = void 0 === e[r] ? o : t.isArray(e[r]) ? e[r].concat(o) : [e[r], o]
            }), e
        };
        ! function() {
            var a = function(e) {
                var t = document.createElement("form");
                e = JSON.parse(e), console.log(e.properties), e.schema.properties.forEach(function(e) {
                    var a = document.createElement("div");
                    a.className += "form-group";
                    var n = document.createElement("label");
                    n.setAttribute("for", e.title), n.innerText = e.label;
                    var r = document.createElement("input");
                    r.setAttribute("type", "text"), r.setAttribute("name", e.title), r.id = e.title, r.className += "form-control";
                    var o = document.createElement("span");
                    o.className = "help-block", a.appendChild(n), a.appendChild(r), a.appendChild(o), t.appendChild(a)
                });
                var a = document.createElement("div");
                a.id = "mcSuccessBlock", a.className = "alert alert-success text-center hidden", t.appendChild(a);
                var n = document.createElement("input");
                return n.setAttribute("type", "submit"), n.setAttribute("value", "Submit"), n.className += "btn btn-default", t.appendChild(n), t
            }(e.schema);
            t(a).find("input").on("input", function(e) {
                t(e.target).parent(".form-group").removeClass("has-error").find("span.help-block").text("")
            }), t(a).on("submit", function(a) {
                a.preventDefault();
                var n = t(this);
                n.find('input[type="submit"]').attr("disabled", "disabled"), n.find(".form-group").removeClass("has-error"), n.find(".help-block").text("");
                var r = {
                    channel_key: "uIGn0zqpUCyrzq6uDfsd1Mqj8P1hiKIP",
                    program: e.program_id,
                    template: e.template,
                    body: t(this).serializeObject(),
                    widget: {
                        type: "lead_form",
                        source: Marketcall.Helpers.source()
                    }
                };
                t.ajax({
                    type: "POST",
                    jsonp: "callback",
                    dataType: "jsonp",
                    url: Marketcall.Helpers.makeUrl("/api/v1/widget/leads"),
                    data: r,
                    error: function(e, t, a) {
                        console.log(e.responseText)
                    },
                    success: function(e, a, r) {
                        console.log(e), 422 == e.status ? t.each(e.errors, function(e, t) {
                            console.log(e, t), n.find('input[name="' + e + '"]').parent(".form-group").addClass("has-error"), n.find('input[name="' + e + '"]').siblings("span.help-block").text(t)
                        }) : 500 == e.status ? (alert("Server error occured."), console.log("Fatal error"), console.log(e.errors)) : 201 == e.status && (console.log("success lead sent"), n.find(".form-group").removeClass("has-error"), n.find("#mcSuccessBlock").text(e.message), n.find('input[type="submit"]').remove(), n.find("input").attr("disabled", !0), n.find("#mcSuccessBlock").removeClass("hidden")), n.find('input[type="submit"]').attr("disabled", !1)
                    }
                })
            });
            var n = document.getElementById("mcLeadForm");
            n ? (n.appendChild(a), console.log("Lead form loaded")) : console.log("No container to attach lead form found.")
        }()
    };
    window.Marketcall.Widgets.LeadForm = {
        init: function(t, a) {
            Marketcall.Helpers.loadFile("css", Marketcall.Helpers.makeUrl("/css/widgets/form.css")), window.Marketcall.Widgets.LeadForm = new e(t, a), document.dispatchEvent(new Event("lead_form_loaded.mc.widget"))
        }
    }
}(),
function() {
    const e = function(e, t) {
        e.set_id && t.ajax({
            type: "GET",
            jsonp: "callback",
            dataType: "jsonp",
            url: Marketcall.Helpers.makeUrl("/api/v1/widget/legal/data"),
            data: {
                set_id: e.set_id,
                domain: window.location.hostname
            },
            error: function(e, t, a) {
                console.error(e.responseText)
            },
            success: function(e, t, a) {
                var n = $("#underForm"),
                    r = $("#legal");
                n.html(e.disclaimerUnderForm);
                var o = e.disclaimerDocs,
                    l = "<p>" + e.disclaimerDocs.reduce(function(e, t) {
                        return e + ' <a class="widget-modal-open-link" href="#" data-id="' + t.id + '" data-header="' + t.name + '">' + t.name + "</a>"
                    }, "") + "</p>" + e.disclaimer + '<div id="widget-modal" class="widget-modal"><div class="widget-modal-content"><div><span id="widget-modal-header"></span><span class="widget-modal-close">&times;</span></div><div id="widget-modal-content"></div></div></div>';
                r.html(l);
                var i = $("#widget-modal"),
                    c = $("#widget-modal-content"),
                    s = $(".widget-modal-open-link"),
                    d = $(".widget-modal-close");
                s.on("click", function(e) {
                    e.preventDefault();
                    var t = $(this).data("id");
                    c.html(o.find(function(e) {
                        return e.id === t
                    }).text), i.css("display", "block")
                }), d.on("click", function() {
                    i.css("display", "none"), c.html("")
                }), $(window).on("click", function(e) {
                    $(e.target).is("#widget-modal") && !$(e.target).is(".widget-modal-open-link") && (i.css("display", "none"), c.html(""))
                })
            }
        })
    };
    window.Marketcall.Widgets.Legal = {
        init: function(t, a) {
            Marketcall.Helpers.loadFile("css", Marketcall.Helpers.makeUrl("/css/widgets/legal.css")), window.Marketcall.Widgets.Legal = new e(t, a), document.dispatchEvent(new Event("legal_loaded.mc.widget"))
        }
    }
}(),
function() {
    var e;
    if (void 0 === window.jQuery || "1.4.4" === window.jQuery.fn.jquery) {
        var t = document.createElement("script");
        t.setAttribute("type", "text/javascript"), t.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"), t.readyState ? t.onreadystatechange = function() {
            "complete" != this.readyState && "loaded" != this.readyState || a()
        } : t.onload = a, (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(t)
    } else e = window.jQuery, r();

    function a() {
        e = window.jQuery.noConflict(!0), r()
    }

    function n(e) {
        for (var t = document.getElementsByTagName("script"), a = 0; a < t.length; a++)
            if (t[a].src.indexOf("/" + e) > -1) {
                for (var n = t[a].src.split("?").pop().split("&"), r = {}, o = 0; o < n.length; o++) {
                    var l = n[o].split("=");
                    r[l[0]] = l[1]
                }
                return r
            }
        return {}
    }

    function r() {
        Marketcall.Helpers.jQuery = e;
        var t, a = function(e) {
                var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
                return null == t ? null : t[1] || 0
            },
            r = Marketcall.Helpers.makeUrl("/api/v1/widget/data?callback=?"),
            o = "1" === a("mc_tld");
        (t = a("program_id")) && Marketcall.Helpers.setCookie("_mc_program", t, {
            path: "/",
            domain: Marketcall.Helpers.getCookieDomain(document.domain, o),
            expires: new Date((new Date).getTime() + 1728e6)
        }), Marketcall.Helpers.getCookie("_mc_program") && (t = Marketcall.Helpers.getCookie("_mc_program")), console.log(n("marketcall.js"));
        var l = Marketcall.Helpers.makeUrl("/api/v1/widget/preload-trackers?callback=?");
        e.getJSON(l, {
            offer: n("marketcall.js").id
        }, function(e) {
            e.trackers && Marketcall.Helpers.injectTrackers(e.trackers)
        }), e.getJSON(r, {
            offer: n("marketcall.js").id,
            program: t,
            client_info: Marketcall.Helpers.getClientInfo(),
            stat_params: Marketcall.Helpers.getStatParams()
        }, function(t) {
            Marketcall.Helpers.currentScript = "marketcall.js", t.widgets && (window.Marketcall.Program.state = 1, e.each(t.widgets, function(t, a) {
                ! function(t, a) {
                    if (void 0 === Marketcall.Widgets[t]) return void console.error("Unknown widget " + t);
                    try {
                        Marketcall.Widgets[t].init(a, e)
                    } catch (e) {
                        console.error("Error " + t + " widget initialisation"), console.log(e)
                    }
                }(a.name, a.config)
            }), t.trackers && Marketcall.Helpers.injectTrackers(t.trackers))
        })
    }
}();