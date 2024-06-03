function swintchQuestion(number, next) {
    var nextQuestion = next ? Number(number) + 1 : Number(number) - 1;
    var delayNumber = next ? 300 : 0;
    var textCount = nextQuestion === 6 ? "Last step" : "Question " + nextQuestion + " of 5";
    if (nextQuestion === 6) {
        $("#quiz form .wrapper").fadeOut(300, function() {
            $(".counter p").text(textCount);
            $(".counter").attr("data-question", nextQuestion);
            $("#quiz .loader").fadeIn(300);
            setTimeout(function() {
                $("#quiz .loader").fadeOut(300, function() {
                    $("#quiz form .wrapper").fadeIn(300);
                });
            }, 2500);
            $(".question-box[data-question=" + number + "]").css("display", "none");
            $(".question-box[data-question=" + nextQuestion + "]").css("display", "block");
        });
    } else {
        $(".question-box[data-question=" + number + "]").delay(delayNumber).fadeOut(300, function() {
            $(".counter p").text(textCount);
            $(".counter").attr("data-question", nextQuestion);
            $(".question-box[data-question=" + nextQuestion + "]").fadeIn(300);
        });
    }
};

document.addEventListener("DOMContentLoaded", function() {
    $("button[data-smooth-scroll^='#']").click(function() {
        var _href = $(this).attr("data-smooth-scroll");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });
    $("input[name=phone]").mask("(999) 999-99-99");
    $("label input").each(function() {
        $(this).click(function() {
            var currentQuestion = $(this).parent().parent().parent().attr("data-question");
            swintchQuestion(currentQuestion, true)
        });
    });
    $(".back").click(function() {
        var currentQuestion = $(this).parent().attr("data-question");
        swintchQuestion(currentQuestion, false)
    });
    $("#quiz form").submit(function(event) {
        event.preventDefault();
        // try {
        //     document.cookie = "fromUrl="+location.href;
        // } catch(e) {}

        // Marketcall Start
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }

        var formData = $(this).serializeArray();
        // programId = $.urlParam('programId');

        var payload = {
            body: {
                currentlyInsurance: formData[0].value,
                useTabacco: formData[1].value,
                gender: formData[2].value,
                old: formData[3].value,
                income: formData[4].value,
                zip: formData[5].value,
                name: formData[6].value,
                phone: `+1 ${formData[7].value}`,
            },
            // merchant_own_id: formData[7].value.replace(/[^\d]/g, '')
        };

        Marketcall.Helpers.jQuery(document).on('success.lead-mapper.mc', function() {

            Marketcall.Widgets.Callback.call(payload.body.phone, (data) => console.log({
                data
            }));

            const params = window.location.href.split('?')[1];
            let redirectUrl = params ? `http://${location.host}/thanks_page.html?${params}` : `http://${location.host}/thanks_page.html`;

            document.location.assign(redirectUrl);

            // $("#quiz form .result-send .form-error").fadeOut(300);
            // $("#quiz form .wrapper").fadeOut(100, function () {
            //     $("#quiz form .result-send .form-success").css("display", "block");
            //     $("#quiz form .result-send").css("display", "flex");    
            // });
        });
        Marketcall.Helpers.jQuery(document).on('error.lead-mapper.mc', function(event, data) {
            console.log(data);
            let errorMessage = '';
            for (key in data.errors) {
                errorMessage += `Error: ${data.errors[key][0]}<br>`;
            }
            $("#quiz form .result-send .form-error").fadeOut(300);
            $("#quiz form .result-send .form-error .form-error-message").html(`${errorMessage}<br>`);
            $("#quiz form .result-send .form-error").fadeIn(300);
            $("#quiz form .result-send").css("display", "flex");
            Marketcall.Helpers.jQuery(document).off('error.lead-mapper.mc');
        });

        Marketcall.Widgets.LeadMapper.sendLead(payload, 'health_leads');
        return false;
    });
});