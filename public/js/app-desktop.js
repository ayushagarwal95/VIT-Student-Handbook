/*----------------------Main Script--------------------------*/
$(document).ready(function () {
    /*--------SideNav Bar Script---------*/
    $('.button-collapse').sideNav({
        menuWidth: 100,
        edge: 'right',
        closeOnClick: true
    });
    var defaultIcon = 'img/user-default.png';
    if ($('#NavBarImg').attr('src') == defaultIcon) {
        $('#imgIcon').removeClass('mdi-image-edit');
        $('#imgIcon').addClass('mdi-image-add-to-photos');
    } else {
        $('#imgIcon').removeClass('mdi-image-add-to-photos');
        $('#imgIcon').addClass('mdi-image-edit');
    }
    $('.modal-trigger').leanModal();

    /*----------Search Bar Script---------*/
    $("#SearchBar").focusin(function() {
        $('.search').css({'background-color':'#ffffff'});
    });
    $("#SearchBar").blur(function() {
        $('.search').css({'background-color':'#3B5998'});
    });

    /*--------Suggestions Script----------*/
    if(window.localStorage.suggestions == 1) {
        $('#SuggestionsCheck').click();
        $('#SuggestionsSwitch').attr('checked', true);
        $('#SuggestionsCheck').click();
        $("#Suggestions").fadeIn(0);
        $('.suggestions-button').fadeOut(0);
    }
    $("#close-bt").click(function () {
        $('#SuggestionsCheck').click();
        $('#SuggestionsCheck').attr('checked', false);
        window.localStorage.suggestions = 0;
        $("#Suggestions").fadeOut();
        $('.suggestions-button').fadeIn();
    });
    $('.suggestions-button').click(function () {
        window.localStorage.suggestions = 1;
        $("#Suggestions").fadeIn();
        $('.suggestions-button').fadeOut();
        $('#SuggestionsCheck').click();
        $('#SuggestionsCheck').attr('checked', true);
    });
    $('#SuggestionsSwitch').click(function () {
        if ($('#SuggestionsCheck').attr('checked') == 'checked') {
            $('#SuggestionsCheck').click();
            $('#SuggestionsCheck').attr('checked', false);
            window.localStorage.suggestions = 0;
            $("#Suggestions").fadeOut();
            $('.suggestions-button').fadeIn();
        } else {
            $('#SuggestionsCheck').click();
            $('#SuggestionsCheck').attr('checked', true);
            window.localStorage.suggestions = 1;
            $("#Suggestions").fadeIn();
            $('.suggestions-button').fadeOut();
        }
    });
    $('#SuggestionsSwitch label').click(function (e) {
        e.preventDefault();
    });

    /*---------Second Level Script--------*/
    $("#SecondLevelMenu .mdi-navigation-arrow-back").click(function () {
        $.fn.CloseSecondLevel();
    });
    $(".callCard").click(function() {
        var idName = 'Holds' + $.fn.getType(this);
        $('#' + idName).fadeIn(750);
        $.fn.toggleOverlay();
        $.fn.ShowSecondLevelMenu(idName);
        if(!$.fn.CheckIfLoaded(idName)) {
            $.fn.AddCard(idName);
            $.fn.AddCard(idName);
            $.fn.AddCard(idName);
            $.fn.AddCard(idName);
            $.fn.initDropDown();
        }
    });
    $(".callList").click(function() {
        var idName = 'Holds' + $.fn.getType(this) + 'Sugg';
        $('#' + idName).fadeIn(750);
        $.fn.toggleOverlay();
        $.fn.ShowSecondLevelMenu(idName);
        if(!$.fn.CheckIfLoaded(idName)) {
            $.fn.AddList(idName);
            $.fn.AddToList(idName);
            $.fn.AddToList(idName);
            $.fn.AddToList(idName);
            $.fn.AddToList(idName);
            $.fn.initCollapsible();
        }
    });

    $(document.body).on('click','i.toggle',function () {
        $(this).toggleClass("mdi-navigation-expand-more mdi-navigation-expand-less");
        $(this).parent().parent().parent().find('.hideContent').toggleClass('showContent');
        $(this).parent().parent().toggleClass('showDropDown');
    });
});

$.fn.toggleOverlay = function () {
    $('body').toggleClass('overlayShown');
    $('#overlay').fadeToggle(500);
    $('#Secondpage .container').toggleClass('showContainer');
};

$.fn.ShowSecondLevelMenu = function (idName) {
    $('#SecondLevelMenu .titleText').html($.fn.getTitle(idName));
    $('#SecondLevelMenu').css({'transform': 'translateY(0)', 'background-color': $.fn.getColor(idName)});
};

$.fn.CloseSecondLevel = function () {
    $('#SecondLevelMenu').css('transform', 'translateY(-5rem)');
    $.fn.toggleOverlay();
    $("#Secondpage>div").fadeOut();
};

var num = 0;
$.fn.AddCard = function (idName) {
    $('#Secondpage #' + idName + '>div').append($(
        '<div class="card min">'+
            '<div class="card-content">'+
                '<a class="dropdown-button" href="#" data-activates="dropdown' + num + '">'+
                    '<i class="mdi-navigation-more-vert black-text">'+'</i>'+
                '</a>'+
                '<ul id="dropdown' + num + '" class="dropdown-content">'+
                    '<li>'+'<a href="#">'+'This is a link'+'</a>'+'</li>'+
                    '<li>'+'<a href="#">'+'This is a link'+'</a>'+'</li>'+
                    '<li>'+'<a href="#">'+'This is a link'+'</a>'+'</li>'+
                '</ul>'+
                '<span class="card-title grey-text text-darken-4">'+'Main Title'+'<i class="mdi-navigation-expand-more right toggle">'+'</i>'+'</span>'+
                '<p class="">'+'Card Title'+'</p>'+
            '</div>'+
            '<div class="hideContent">' +
                '<div class="card-image waves-effect waves-block waves-light">'+
                    '<img src="img/image1.png">'+
                '</div>'+
                '<div class="card-content">'+
                    '<p class="">'+'Card Text'+'</p>'+
                '</div>'+
                '<div class="card-action">'+
                    '<a class="activator">'+'This is a link'+'</a>'+
                    '<a class="activator">'+'This is a link'+'</a>'+
                '</div>'+
                '<div class="card-reveal">'+
                    '<span class="card-title grey-text text-darken-4">'+'Card Title'+ '<i class="mdi-navigation-close right">'+'</i>'+'</span>'+
                    '<p>'+'Here is some more information about this product that is only revealed once clicked on.'+'</p>'+
                '</div>'+
            '</div>' +
        '</div>'
    ));
    num ++;
};

$.fn.AddList = function (idName) {
    $('#Secondpage #' + idName + '>div').append($(
        '<ul class="collapsible popout" data-collapsible="accordion">'+
        '</ul>'
    ));
};

$.fn.AddToList = function (idName) {
    $('#Secondpage #' + idName + '>div>ul').append($(
        '<li>'+
            '<div class="collapsible-header">'+'Title'+'</div>'+
            '<div class="collapsible-body">'+'<p>'+'Lorem ipsum dolor sit amet.'+'</p>'+'<img src="img/image1.png">'+'</div>'+
        '</li>'
    ));
};

$.fn.initCollapsible = function () {
    $('.collapsible').collapsible({
        accordion : false
    });
};

$.fn.initDropDown = function () {
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false,
        hover: false,
        belowOrigin: false
    });
};

$.fn.CheckIfLoaded = function (idName) {
    return $('#Secondpage #' + idName + '>div').html() != '';
};

$.fn.getType = function (element) {
    if($(element).hasClass('Ac') || $(element).hasClass('hoverAc')) {
        return 'Ac';
    } else if($(element).hasClass('Co') || $(element).hasClass('hoverCo')) {
        return 'Co';
    } else if($(element).hasClass('St') || $(element).hasClass('hoverSt')) {
        return 'St';
    } else if($(element).hasClass('Li') || $(element).hasClass('hoverLi')) {
        return 'Li';
    } else if($(element).hasClass('Ho') || $(element).hasClass('hoverHo')) {
        return 'Ho';
    } else if($(element).hasClass('Ar') || $(element).hasClass('hoverAr')) {
        return 'Ar';
    } else {
        return null;
    }
};

$.fn.getColor = function (idName) {
    switch (idName) {
        case 'HoldsAc':
        case 'HoldsAcSugg':
            return '#fecd16';
            break;
        case 'HoldsCo':
        case 'HoldsCoSugg':
            return '#75ba5b';
            break;
        case 'HoldsHo':
        case 'HoldsHoSugg':
            return '#ff5b5b';
            break;
        case 'HoldsSt':
        case 'HoldsStSugg':
            return '#7c54f0';
            break;
        case 'HoldsLi':
        case 'HoldsLiSugg':
            return '#cc35ba';
            break;
        case 'HoldsAr':
        case 'HoldsArSugg':
            return '#4aa0e0';
            break;
    }
};

$.fn.getTitle = function (idName) {
    switch (idName) {
        case 'HoldsAc' :
            return 'Academics';
            break;
        case 'HoldsCo' :
            return 'College';
            break;
        case 'HoldsSt' :
            return 'Student Organizations';
            break;
        case 'HoldsLi' :
            return 'Life Hack';
            break;
        case 'HoldsHo' :
            return 'Hostels';
            break;
        case 'HoldsAr' :
            return 'Around VIT';
            break;
        case 'HoldsAcSugg' :
            return 'Suggestions <i class="mdi-hardware-keyboard-arrow-right"></i> Ac';
            break;
        case 'HoldsCoSugg' :
            return 'Suggestions <i class="mdi-hardware-keyboard-arrow-right"></i> Co';
            break;
        case 'HoldsStSugg' :
            return 'Suggestions <i class="mdi-hardware-keyboard-arrow-right"></i> St';
            break;
        case 'HoldsLiSugg' :
            return 'Suggestions <i class="mdi-hardware-keyboard-arrow-right"></i> Li';
            break;
        case 'HoldsHoSugg' :
            return 'Suggestions <i class="mdi-hardware-keyboard-arrow-right"></i> Ho';
            break;
        case 'HoldsArSugg' :
            return 'Suggestions <i class="mdi-hardware-keyboard-arrow-right"></i> Ar';
            break;
    }
};
/*-----------------------------------------------------------*/