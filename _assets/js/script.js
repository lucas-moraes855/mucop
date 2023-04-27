$(function () {

    // Url atual da página
    
    var url = window.location.href;
    
    // Sessão da página
    
    const sessId = url.split("#")[1];
    
    // Direciona a sessão ao carregar a página
    
    function goSession(sessId) {
        let elementPosition = $("#" +sessId).offset().top;
        $("main").animate({
            scrollTop: elementPosition
        }, 0);
    }
    
    goSession(sessId);
    

    // Menu de navegação

    $(".sidebar nav a, .logo").click(function () {
        let mainPosition = $("main").scrollTop();
        let element = $(this).attr("href");
        let elementPosition = $(element).offset().top;

        $("main").animate({
            scrollTop: elementPosition + mainPosition
        }, 800);
    });

    $(".sidebar nav").scroll(function () {
        let navPosition = $(this).scrollTop();

        if (navPosition > 0) {
            $(".sidebar header").addClass("show_shadow");
        } else {
            $(".sidebar header").removeClass("show_shadow");
        }
    });


    // Componente

    $(".component_code .tab_item").click(function () {
        let left = $(this).position().left;
        let outerWidth = $(this).outerWidth();

        if (!$(this).hasClass("active")) {
            $(this).siblings(".bar").animate({
                left: left + "px",
                width: outerWidth + "px"
            }, 100);
        }

        $(this).siblings(".tab_item").removeClass("active");
        $(this).addClass("active");


        var index = $(this).index();
        if (index == 0) {
            $(this).parents(".box_tab").siblings(".box_component").children(".render").show();
            $(this).parents(".box_tab").siblings(".box_component").children(".box_code").hide();
        } else {
            $(this).parents(".box_tab").siblings(".box_component").children(".box_code").show();
            $(this).parents(".box_tab").siblings(".box_component").children(".render").hide();
        }
    });


    // Copiar código do componente

    $(document).on("click", ".box_code .btn_copy", function () {
        let btnIcon = $(this).children("i");
        btnIcon.attr("class", "ph-check-circle").css("color", "#00D856");
        setTimeout(function () {
            btnIcon.attr("class", "ph-copy-simple").css("color", "white");
        }, 3000);

        let index = $(".btn_copy").index(this);
        if (document.selection) { // IE
            let range = document.body.createTextRange();
            range.moveToElementText(document.getElementsByClassName("code").item(index));
            range.select();
        } else if (window.getSelection) {
            let range = document.createRange();
            range.selectNode(document.getElementsByClassName("code").item(index));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
        document.execCommand("copy");
    });

});

