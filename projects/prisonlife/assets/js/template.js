function sendMessageToReactNative(message) {
    if (typeof message === 'object') {
        message = JSON.stringify(message);
    }

    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(message.toString());
    } else {
        console.error('modd.io is not opened inside a react native webview');
    }
}

// function captureKeyDownEven(event) {
//     console.log(event);
// }

function isDeviceMobile() {
    var check = false;
    (function(a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4),
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function adjustUIForMobile() {
    // remove d-* classes from hide-on-mobile elements and then adds d-none class
    $('.hide-on-mobile')
        .removeClass(function(index, className) {
            return (className.match(/d-\S+/g) || []).join(' ');
        })
        .addClass('d-none');

    $('.menu-row').removeClass('menu-row').addClass('menu-row-mobile');
    // $('#menu-column-main-container').addClass('main-vertical-mobile').css({boxShadow: 'none'});
    $('#menu-column-left').hide();
    $('#more-games').hide();
    $('#banner-ad-horizontal').hide();
    $('#footer-div').css({
        marginTop: '115px',
    });
    // $('#menu-column-main').css({
    //     transform: 'translate(0,50%)'
    // })
    // $(".game-title").css({
    //     transform: 'translate(0,110%)'
    // })
    $('#menu-column-right').hide();
    $('#menu-column-main').removeClass('col-sm-4');
    $('#menu-column-main').addClass('px-0 col-sm-12');
    $('#menu-footer-buttons').children().hide();
    $('#view-source-button').hide();
    $('#featured-youtuber').hide();
    $('.open-modd-shop-button').hide();
    $('#more-io-games-button').hide();
    // $(".game-title").hide();

    $('#show-chat').css('margin', '2px');
    $('#show-chat').css('font-size', '14px');
    $('#chat-history').css('font-size', '12px');

    $('#my-score-div').css('margin', '2px');
    $('#my-score-div').css('font-size', '14px');
    $('#my-score-div').css('padding', '5px');

    $('.ui-text-top').css('font-size', '16px');

    $('#coin-icon').hide();
    $('.player-coins').hide();

    $('#scoreboard').addClass('scoreboard-mobile');

    $('.h3').css('font-size', '16px');
    $('#leaderboard').css({
        top: 0,
        padding: '5px'
    });

    $('.ui-text-center-lg').css('font-size', '2em');

    $('#mobile-logout-button').removeClass('d-none');

    $('#top-menu-buttons').addClass('btn-group-sm');
    $('#mobile-chat-button').show();
    $('#mobile-chat-toggle-button').show();
    $('#toggle-dev-panels').addClass('btn-sm');
    $('#unit-status').css({
        bottom: 0
    }).show();
    $('#inventory-slots-key-stroke').hide();
    $('#menu-wrapper #right-menu').removeClass('col-9').addClass('col-12');
    $('.server-list-container').removeClass('my-2').addClass('mb-2');
    $('#server-dropdown-container').removeClass('col-10').addClass('col-12');

    // stop accepting touch inputs from leaderboard and chat when on mobile
    $('#leaderboard').addClass('pointer-events-none');
    $('#scoreboard-header').addClass('pointer-events-all');
    $('#scoreboard').css({
        overflowY: 'hidden',
    });
    $('#chat-box').addClass('pointer-events-none');
    $('#chat-history').css({
        overflowY: 'hidden',
    });
}

// nested flexbox is not working properly in chrome but works in opera so as of now
// we are using this hack to adjust height of friends div
function friendsPanelHeightHack() {
    var userDivHeight = $('#user-div').height();
    var menuDivHeight = $('#menu-div').height();
    var padding = 16 * 4;
    var friendsDivHeight = $(window).height() - (userDivHeight + menuDivHeight + padding);

    // $('#friends-div').css({
    //   maxHeight: friendsDivHeight
    // });

    var friendsPanelTitleHeight = $('#friends-panel #title-row').height();
    var friendsPanelTabsHeight = $('#friends-panel #tabs-row').height();
    var margins = 8 + 8;
    var padding = 10 + 10;

    var friendsPanelListHeight = friendsDivHeight - (friendsPanelTitleHeight + friendsPanelTabsHeight + margins + padding);
    $('#friends-panel-list').css({
        height: friendsPanelListHeight,
        maxHeight: friendsPanelListHeight,
    });
}

function adjustUIForComputer() {
    $('.hide-on-computer')
        .removeClass(function(index, className) {
            return (className.match(/d-\S+/g) || []).join(' ');
        })
        .addClass('d-none');

    $('#friends-panel').removeClass('d-none').addClass('d-flex');
    friendsPanelHeightHack();
}

if (document.readyState !== 'loading') {
    changeCSSBasedOnDevice();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        changeCSSBasedOnDevice();
    });
}

function changeCSSBasedOnDevice() {
    window.isDeviceMobile = isDeviceMobile();

    if (window.isDeviceMobile) {
        adjustUIForMobile();
    } else {
        adjustUIForComputer();
    }

    // all chat-history selectors uses id so the first element found will be returned
    // so just overwrite chat-history that has d-none class
    // d-none will be added by above functions adjustUIForXXX()
    $('#chat-history.d-none').attr('id', 'hidden-chat-history');
}

function validateUserPin(callbackFn, purchasableId, serverId) {
    const url = `${window.AUTH_SERVER_URL}/pin/validate/${userId}/${callbackFn}/${purchasableId}/${serverId}`;

    $('#validate-user-pin-modal').find('iframe').attr('src', url);
    $('#validate-user-pin-modal').modal('show');
}

function executeFunctionByName(functionName, context /*, args */ ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split('.');
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

$(document).ready(function() {
    //use for toggle modal and dropdown
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    var credentials = {
        username: '',
        password: '',
    };

    $('#stable').click(() => {
        window.location = '/';
    });

    $('.btn-purchase-coins').on('click', function() {
        var isFromHomepage = typeof ige === 'undefined';
        window.userId && window.trackEvent && window.trackEvent('Coins Bought', {
            distinct_id: window.userId.toString(),
            amount: parseFloat($(this).attr('name')),
            // coinsReceived: parseFloat(tier.coins),
            sourceOfPurchase: 'in-game',
            gameId: window.gameId,
            status: 'initiated'
        });
        $.ajax({
            url: '/get_xsolla_token',
            data: {
                amount: $(this).attr('name'),
                gameId: isFromHomepage ? 'homepage' : ige.game.data.defaultData.parentGame || ige.client.server.gameId,
            },
            dataType: 'jsonp',
            type: 'POST',
            success: function(data) {
                openXsollaModal(data.token);
            },
        });
    });

    $('#updateUserInfo').submit(e => {
        e.preventDefault();
        var credentials = {
            username: $('#updateUsername').val(),
            email: $('#email').val(),
            oldPass: $('#oldPass').val(),
            newPass: $('#newPass').val(),
            conPass: $('#conPass').val(),
        };
        if (credentials.newPass !== credentials.conPass) {
            alert('New Password and Confirm password unmatch');
            return;
        }
        $.ajax({
            type: 'POST',
            url: '/updateuser',
            data: credentials,
            success: function(success) {
                console.log(success);
                if (success.status == 'success') {
                    alert('successfully Updated');
                    window.location = '/';
                } else {
                    alert('error in updating details');
                }
            },
        });
    });

    //handler for purchase modal removing modal-open and make shop unscrollable
    $('#purchasable-purchase-modal').on('hidden.bs.modal', function() {
        $('body').addClass('modal-open');
    });

    $('#validate-user-pin-modal').on('hidden.bs.modal', function() {
        $('#validate-user-pin-modal').find('iframe').attr('src', '');
    });

    // event listener for validate-user-pin iframe
    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
    eventer(
        messageEvent,
        function(e) {
            if (e && e.data && e.data.type === 'pinValidationToken') {
                var token = e.data.token;
                var callbackFn = e.data.callbackFn;
                var purchasableId = e.data.purchasableId;

                setTimeout(() => {
                    window.executeFunctionByName(callbackFn, window, purchasableId, token);
                    $('#validate-user-pin-modal').modal('hide');
                    $('#validate-user-pin-modal').find('iframe').attr('src', '');
                }, 500);
            } else if (e && e.data && e.data.type === 'pinValidationTokenClose') {
                setTimeout(() => {
                    $('#validate-user-pin-modal').modal('hide');
                    $('#validate-user-pin-modal').find('iframe').attr('src', '');
                }, 500);
            }
        },
        false,
    );

    (function($) {
        $.fn.writeText = function(content, duration, callback) {
            content = content || '';

            var contentArray = content.split(''),
                current = 0,
                elem = this;

            if (isNaN(duration)) {
                duration = 20;
            }

            if (duration <= 0) {
                elem.html(content);
                callback();
                return;
            }

            var handle = setInterval(function() {
                if (current < contentArray.length) {
                    var text = elem.html();
                    var newText = contentArray[current];

                    if (newText === '<' && /\w/.test(contentArray[current + 1])) {
                        do {
                            current++;
                            var nextChar = contentArray[current];
                            newText += nextChar;
                        } while (nextChar !== '>');
                    }

                    elem.html(text + newText);
                    current++;
                } else {
                    clearInterval(handle);
                    callback();
                }
            }, duration);

            return handle;
        };
    })(jQuery);

    // check for any messages in query params
    var queryParams = getQueryParams();
    var message = queryParams.error || queryParams.success || queryParams.message;
    var isError = !!queryParams.error;
    var isSuccess = !!queryParams.success;
    var isInfo = !!queryParams.message;

    message = decodeURIComponent(message);

    var swalConfig = {
        text: message,
    };

    if (isError) {
        var hasDiscordButton = /discord/i.test(message);
        swalConfig.type = 'error';
        swalConfig.title = 'Error';

        if (hasDiscordButton) {
            (swalConfig.confirmButtonColor = '#7289da'), (swalConfig.confirmButtonText = 'Contact Admin');
        }
    } else if (isSuccess) {
        swalConfig.type = 'success';
        swalConfig.title = 'Success';
    } else if (isInfo) {
        swalConfig.type = 'info';
        swalConfig.title = 'Information';
    }

    if (swalConfig.type) {
        swal(swalConfig).then(result => {
            if (result && result.value === true) {
                if (hasDiscordButton) {
                    window.open('https://discord.gg/StD2u3Y', '_blank');
                }
            }
        });
    }

    if (typeof mode !== 'undefined' && mode === 'play' && !isInMobileApp()) {
        if (os === 'AndroidOS' && gameDetails.redirectLink.android) {
            window.location = gameDetails.redirectLink.android;
        } else if (os === 'iOS' && gameDetails.redirectLink.ios) {
            window.location = gameDetails.redirectLink.ios;
        } else if (isIniFrame()) {
            var elementIdsToHide = ['left-menu', 'menu-column-left-container', 'menu-column-right-container'];

            elementIdsToHide.forEach(function(id) {
                $('#' + id).remove();
            });
        }
    }

    if (typeof gameId !== 'undefined' && typeof gameDetails !== 'undefined' && gameDetails && !gameDetails.isModdable) {
        $.getJSON('/play-page-data/' + gameId, function(data) {
            if (data.featuredModdtuber && data.featuredModdtuber.name) {
                $('#featured-youtuber-link').attr('href', data.featuredModdtuber.link);
                $('#featured-youtuber-link').text(data.featuredModdtuber.name);
                $('#featured-youtuber').show();
            }

            if (data.hostedGames && data.hostedGames.length) {
                data.hostedGames.forEach(function(game, i) {
                    $('#game-suggestions-card ul.list-group').append(
                        $(
                            '<li class="list-group-item p-2 border-top-0 bg-transparent cursor-pointer" onclick="location.href=\'/play/' +
                            game.gameSlug +
                            '\'">' +
                            '<div class="row justify-content-between align-items-center">' +
                            '<div class="col-8 d-flex align-items-center text-left">' +
                            '<div>' +
                            game.title +
                            '</div>' +
                            '</div>' +
                            '<div class="col-4">' +
                            (game.playerCount === 1 ? '1 player' : game.playerCount + ' players') +
                            '</div>' +
                            '</div>' +
                            '</li>',
                        ),
                    );

                    $('#overlay-div-game-suggestion-list').append(
                        $(
                            '<div class="p-2" id="game-samples" style="cursor:pointer;width:12.5%;">' +
                            '<a href="' +
                            game.toRedirect +
                            '" target="' +
                            (isOpenedFromIframe ? '_blank' : '_self') +
                            '" class="inherit-height" title="' +
                            game.title +
                            '">' +
                            '<div class="card game-card cursor-pointer itemscontainer">' +
                            '<div class="" style="position: relative;">' +
                            '<div class="game-overlay" id="game-overlay">' +
                            '</div>' +
                            '<div style="width:100%;height:90px;display:none;" id="div-' +
                            i +
                            '"></div>' +
                            '<img src="' +
                            game.cover +
                            '" style="width:100%;height:95px;" id="image-' +
                            i +
                            "\" onerror=\"this.style.display='none';document.getElementById('div-" +
                            i +
                            "').style.display='block';\" alt=\"" +
                            game.title +
                            '" />' +
                            '</div>' +
                            '<div class="text-center" id="game-text">' +
                            '<small style="font-size:12px;text-decoration:none !important;">' +
                            game.title.substring(0, 18) +
                            '</small>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>',
                        ),
                    );
                });
            }

            if (data.purchasables && data.purchasables.length) {
                purchasables = data.purchasables;
            }
        });
    }
});

function isInMobileApp() {
    return !!(window.ReactNativeWebView && window.ReactNativeWebView.postMessage);
}

function isIniFrame() {
    return window.location !== window.parent.location;
}

var openEditGame = function(id) {
    window.location = 'sandbox/game/' + id;
};

var openLoginModal = function() {
    document.getElementById('login-form').reset();
    openLoginOptionFrameModal();
};

var openLoginOptionFrameModal = function(open) {
    let source = open ? '' : localStorage.getItem('loginSource');
    if (open) {
        $('.google-error').append('<div class="col">' + '<div id="login-error" class="alert alert-danger"> Google account is not registered. Please sign up with Facebook, Twitter or Discord</div>' + '</div>');
    } else $('.google-error').remove();
    document.getElementById('login-option-form').reset();
    defaultLoginState();
    switch (source) {
        case 'username':
            $('.login-username').show();
            break;
        case 'google':
            $('.cache-login').show();
            $('#cache-login-option').children().remove();
            $('#cache-login-option').append('<a onclick="newTab(\'/auth/google\')"> <i class="fab fa-google fa-3x"></i><span>Google</span></a>');
            break;
        case 'twitter':
            $('.cache-login').show();
            $('#cache-login-option').children().remove();
            $('#cache-login-option').append('<a onclick="newTab(\'/auth/twitter\')"> <i class="fab fa-twitter fa-3x"></i><span>Twitter</span></a>');
            break;
        case 'facebook':
            $('.cache-login').show();
            $('#cache-login-option').children().remove();
            $('#cache-login-option').append('<a onclick="newTab(\'/auth/facebook\')"> <i class="fab fa-facebook fa-3x"></i><span>Facebook</span></a>');
            break;
        case 'discord':
            $('.cache-login').show();
            $('#cache-login-option').children().remove();
            $('#cache-login-option').append('<a onclick="newTab(\'/auth/discord\')"> <i class="fab fa-discord fa-3x"></i><span>Discord</span></a>');
            break;
        case '':
            $('.login-all-option').show();
            break;
        default:
            $('.login-all-option').show();
    }
    $('#login-options-modal').modal('show');
};

var defaultLoginState = function() {
    $('.login-username').hide();
    $('.login-all-option').hide();
    $('.reset-password').hide();
    $('.reset-username').hide();
    $('.cache-login').hide();
};

var openTOSModal = function() {
    $('#tos-modal iframe').attr({
        src: 'https://www.modd.io/agreement/tos'
    });
    $('#tos-modal').modal('show');
};

var openPPModal = function() {
    $('#pp-modal iframe').attr({
        src: 'https://www.modd.io/agreement/pp'
    });
    $('#pp-modal').modal('show');
};

var incrLowResolution = function() {
    $.ajax({
        type: 'POST',
        url: '/api/lowresolution',
        success: function(success) {},
    });
};

var addTemplate = function(id) {
    var body = {
        game: {
            title: 'New Game',
        },
        templateId: id,
    };
    $.ajax({
        type: 'POST',
        url: '/create-game-by-template',
        data: body,
        success: function(success) {
            if (success.status === 'success') {
                window.location = '/sandbox/game/' + success.message.gameSlug;
            } else {
                if (success.message.indexOf('already') > -1) {
                    $('#create-game-modal').modal('hide');
                    $('#access-denind-modal').modal('show');
                } else if (success.message === 'no email') {
                    $('#create-game-modal').modal('hide');
                    $('#no-email-modal').modal('show');
                }
            }
        },
    });
};

var openCreateGameModal = function() {
    $.ajax({
        type: 'GET',
        url: '/isemailverified',
        success: function(data) {
            if (data.status == 'success') {
                if (data.message.isEmailVerified == true) {
                    $('#create-game-modal').modal('show');
                } else {
                    openVerifyEmailModal(data.message.isEmailPresent, data.message.username);
                }
            }
        },
    });
};

var logoutUser = function() {
    $.ajax({
        type: 'GET',
        url: '/logout',
        success: function() {
            localStorage.removeItem('logged');
            window.location = '/';
        },
    });
};

var countAdImpression = function(gameId, type, count) {
    // temporarily disabled for ddos mitigation
    // $.ajax({
    //     type: "POST",
    //     url: analyticsUrl + 'api/game-report/ad-impression',
    //     data: { gameId: gameId, type: type, count: count },
    // });
};

var openYoutubeVideo = function(videoLink, videoTitle) {
    $('#youtubeModal').modal('show');
    $('#videoName').text(videoTitle);
    var height = $(window).height();

    $('#video-div').append(
        $('<iframe>', {
            allowfullscreen: true,
            width: '100%',
            height: 600,
            frameborder: '0',
            id: 'iframeYoutube',
            src: videoLink + '?autoplay=1',
        }),
    );
};

var removeVideoFromIframe = function() {
    $('#iframeYoutube').remove();
    $('#videoName').text('');
};

var renderAssetsDivs = function(id) {
    var assetsPage = document.querySelectorAll('.assets , .page');
    var links = document.querySelectorAll('.asset, .link');

    links.forEach(assetPage => {
        assetPage.classList.remove('active');
    });

    assetsPage.forEach(assetPage => {
        assetPage.style.display = 'none';
    });

    var divToShow = $('.assets.page.' + id);
    var assetLink = $('.asset.link.' + id);
    if (divToShow) {
        assetLink.addClass('active');
        divToShow.css('display', 'block');
    }
};

var redirectAssetsDivs = function(tab) {
    window.location = `/sandbox/assets/?innertab=${tab}`;
};

var toHHMMSS = function(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hours * 3600) / 60);
    var seconds = seconds - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
};

var addYoutuber = function(e) {
    e.preventDefault();
    var $inputs = $('#youtuber-form :input');
    var values = {};
    $inputs.each(function() {
        values[this.id] = $(this).val();
        if (this.id !== 'gameSlug') {
            $(this).val('');
        }
    });
    var urlValidator = RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
    var isValidLinkSubmited = urlValidator.test(values.link);
    if (isValidLinkSubmited) {
        $.ajax({
            type: 'POST',
            url: '/api/youtuber',
            data: values,
            success: function(res) {
                if (res.status == 'success') {
                    swal('Thank you for your time', 'Youtuber added. You will be featured on our site once you are approved.', 'success').then(function() {
                        window.location = '/';
                    });
                    $('#youtuber-modal').modal('hide');
                } else {
                    console.log(res.error);
                    swal('Error', 'Sorry we are unable add you due to technical issue. Please contact admin.', 'error');
                    // alert('Sorry we are unable add you due to technical issue. Please contact admin');
                    $('#youtuber-modal').modal('hide');
                }
            },
        });
    } else {
        swal('Error!!!', 'Please enter valid video link', 'error');
    }
};

var openVerifyEmailModal = function(isEmailPresent, username) {
    swal({
        title: 'Email not verified!!!',
        text: 'Please verify your email first.',
        type: 'error',
        showCancelButton: false,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Verify Email',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            if (!isEmailPresent) {
                window.location = '/user/' + username;
                return;
            }
            return emailVerification();
        },
    });
};

var getQueryParams = function() {
    var location = window.location;
    var queryParamsStartIndex = location.href.indexOf('?');
    var queryParams = {};

    if (queryParamsStartIndex > -1) {
        queryParams = location.href.slice(queryParamsStartIndex + 1);
        queryParams = queryParams.split('&');

        queryParams = queryParams.reduce(function(partialObj, queryParam) {
            var keyValuePair = queryParam.split('=');

            partialObj[keyValuePair[0]] = keyValuePair.slice(1).join('=');

            return partialObj;
        }, {});
    }

    return queryParams;
};

var loginCallback = function(res) {
    if (res.response === 'success') {
        var queryParams = getQueryParams();
        var newLocation = queryParams.redirect || '/';
        delete queryParams.redirect;
        // restore other queryparams in new location
        var queryParamsString = Object.keys(queryParams).reduce(function(partialQueryParamString, queryParamKey) {
            return partialQueryParamString + '&' + queryParamKey + '=' + queryParams[queryParamKey];
        }, '');

        var alreadyHasQueryParams = newLocation.indexOf('?') > -1;
        if (!alreadyHasQueryParams && queryParamsString) {
            newLocation += '?'; // add ? to mark start of query params
            newLocation.slice(1); // remove first '&' from queryParamString
        }

        newLocation += queryParamsString;
        localStorage.setItem('loginSource', 'username');
        //not redirecting to proper page after login
        window.location = newLocation;
    } else {
        var errorAlert = $('#login-error-option');

        if (errorAlert) {
            errorAlert.show();
            errorAlert.text(res.message);
        }
    }
};

var userLogin = function(e, options) {
    if (e) {
        e.preventDefault();
    }
    var errorAlert = $('#login-error');
    var loginButton = $('button.login-button');
    var credentials = {
        username: $('#username').val().trim(),
        password: $('#password').val(),
    };

    if (errorAlert) {
        errorAlert.hide();
    }

    var originalHtml = loginButton.html();

    loginButton.html($('<i class="fa fa-spin fa-sync"/>'));

    $.ajax({
        type: 'POST',
        url: '/login',
        data: credentials,
        success: function(res) {
            if (res.response === 'success' && options && options.reloadOnSuccess) {
                var eventData = {
                    msg: 'reload'
                };
                sendMessageToReactNative(eventData);
                window.location.reload();
                return;
            }
            loginButton.html($(originalHtml));
            loginCallback(res);
        },
    });
};

var checkGuestUserMode = function(e) {
    $('#play-game-button').addClass('d-none');
    $('#login-signup-btn').removeClass('d-none');
};

var userLoginOption = function(e, options) {
    if (e) {
        e.preventDefault();
    }
    var errorAlert = $('#login-error-option');
    var loginButton = $('button.login-option-button');
    var credentials = {
        username: $('#username-option').val().trim(),
        password: $('#password-option').val(),
    };

    if (errorAlert) {
        errorAlert.hide();
    }
    var originalHtml = loginButton.html();

    loginButton.html($('<i class="fa fa-spin fa-sync"/>'));

    $.ajax({
        type: 'POST',
        url: '/login',
        data: credentials,
        success: function(res) {
            if (res.response === 'success' && options && options.reloadOnSuccess) {
                //  if (targetWindow === "_blank") window.open(window.location.href, targetWindow);
                var eventData = {
                    msg: 'reload'
                };
                sendMessageToReactNative(eventData);
                localStorage.setItem('loginSource', 'username');
                if (window.location.href.includes('/play')) {
                    $('#play-game-button').removeClass('d-none');
                    $('#login-signup-btn').addClass('d-none');
                }
                window.location.reload();
                return;
            }
            loginButton.html($(originalHtml));
            loginCallback(res);
        },
    });
};

var newTab = function(redirectUrl) {
    let targetWindow = '_self';
    try {
        targetWindow = top.window.location.href ? '_self' : '_blank';
        window.open(redirectUrl, targetWindow);
    } catch (e) {
        targetWindow = '_blank';
        let win = window.open(redirectUrl, targetWindow);
        win.focus();
        //         let inter = setInterval(function(){
        //         if(localStorage.getItem("token")) {
        //             // REMOVE INTERVAL
        //             clearInterval(inter);
        //             win.close();
        //             window.location.reload();
        //         }
        // }, 500); }
    }
};

var quickSignup = function(e, options) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    var usernameInput = $('#quick-signup-username');
    var errorAlert = $('.quick-signup-error');
    var credentials = {
        username: usernameInput.val().trim(),
        password: randomToken(15),
        quickSignup: true,
    };
    var usernamePattern = /^[A-z0-9]+$/;
    var queryParams = getQueryParams();
    var url = '/signup';

    if (errorAlert) {
        errorAlert.hide();
    }

    //if user name is blank than username will be setted as User followed by randon 4 digit number
    if (!credentials.username) {
        // errorAlert.text("Username can't be empty");
        // errorAlert.show();
        // usernameInput.focus();
        // return;
        credentials.username = 'user';
    }

    if (!usernamePattern.test(credentials.username)) {
        errorAlert.text('Please use only Alphabets and Numbers in username');
        errorAlert.show();
        return;
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: credentials,
        success: function(response) {
            if (response.status === 'error') {
                errorAlert.text(response.message);
                errorAlert.show();
            } else {
                if (options && options.reloadOnSuccess) {
                    window.location.reload();
                    return;
                }

                if (response.message) {
                    $('#login-card').html('<div><i class="fa fa-spinner fa-4x fa-spin"></i></div>');

                    swal('', response.message, 'success').then(function(result) {
                        if (result && result.value === true) {
                            window.location = queryParams.redirect || '/';
                        }
                    });
                } else {
                    window.location = queryParams.redirect || '/';
                }
            }
        },
        error: function(err) {
            console.log(err);
        },
    });
};

var facebookLogin = function(email, facebookId, token) {
    $.ajax({
        type: 'POST',
        url: '/login',
        data: {
            socialLogin: 'facebook',
            email: email,
            facebookId: facebookId,
            token: token,
        },
        success: function(res) {
            loginCallback(res);
        },
    });
};

function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}
// for /register route
var userRegister = function(e) {
    if (e) {
        e.preventDefault();
    }

    var username = $('#register-username').val().trim();
    var email = $('#register-email').val();
    var password = $('#register-password').val();
    var confirmPassword = $('#confirm-password').val();

    if (!username) {
        $('#register-error').addClass('d-block');
        $('#register-error').text('Username cannot be empty');
        $('#register-username').focus();
        return;
    }

    if (username && username.length > 12) {
        $('#register-error').addClass('d-block');
        $('#register-error').text('Username should be less than 12 characters');
        return;
    }

    if (!email) {
        $('#register-error').addClass('d-block');
        $('#register-error').text('Email cannot be empty');
        $('#register-email').focus();
        return;
    }

    if (!password) {
        $('#register-error').addClass('d-block');
        $('#register-error').text('Password cannot be empty');
        $('#register-password').focus();
        return;
    }

    if (password !== confirmPassword) {
        $('#register-error').addClass('d-block');
        $('#register-error').text('Password and Confirm Password must match');
        $('#confirm-password').focus();
    }

    var credentials = {
        username: username,
        password: password,
        email: email,
    };

    $.ajax({
        type: 'POST',
        url: '/signup',
        data: credentials,
        success: function(response) {
            if (response.status === 'error') {
                $('#register-error').addClass('d-block');
                $('#register-error').text(response.message);
            } else {
                var location = window.location;
                window.location = location.pathname && !location.pathname.includes('register') ? location.pathname : '/';
            }
        },
        error: function(err) {
            console.log(err);
        },
    });
};

var userSignup = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    $('#signup-error').hide();

    var credentials = {
        username: $('#signup_username').val().trim(),
        password: $('#signup_password').val(),
        confirmPassword: $('#signup_confirm_password').val(),
        email: $('#signup_email').val().trim(),
    };
    var usernamePattern = /^[A-z0-9]+$/;

    if (!credentials.username || credentials.username.length < 2 || credentials.username.length > 12) {
        $('#signup-error').show();
        $('#signup-error').text('Username should have 2 to 12 characters');
        $('#signup_username').focus();
        return;
    }

    if (!credentials.password) {
        $('#signup-error').show();
        $('#signup-error').text('Password cannot be empty');
        $('#signup_password').focus();
        return;
    }

    if (credentials.password !== credentials.confirmPassword) {
        $('#signup-error').show();
        $('#signup-error').text('Password and Confirm Password must match');
        $('#signup_password').focus();
        return;
    }

    if (!usernamePattern.test(credentials.username)) {
        $('#signup-error').text('Please use only Alphabets and Numbers in username');
        $('#signup-error').show();
        $('#signup_username').focus();
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/signup',
        data: credentials,
        success: function(response) {
            if (response.status === 'error') {
                $('#signup-error').show();
                $('#signup-error').text(response.message);
            } else {
                // emailVerification();
                var location = window.location;
                window.location = location.pathname && !location.pathname.includes('register') ? location.pathname : '/';
            }
        },
        error: function(err) {
            console.log(err);
        },
    });
};

var editAssets = undefined;

var forgotPasswordRequest = function(e) {
    if (e) {
        e.preventDefault();
    }

    $('#reset-email-error').addClass('d-none');

    var username = $('#reset-forgetpwd-username').val().trim();
    // var email = $('#reset-forgetpwd-email').val().trim();

    if (!username) {
        $('#reset-email-error').addClass('d-block');
        $('#reset-email-error').text('Please enter your Username');
        $('#reset-forgetpwd-username').focus();
        return;
    }
    // if (!email) {
    //     $('#reset-email-error').addClass('d-block');
    //     $('#reset-email-error').text('Please enter your Email address');
    //     $('#reset-forgetpwd-email').focus();
    //     return;
    // }

    $.ajax({
        type: 'POST',
        url: '/forgetpassword',
        data: {
            username: username,
        },
        success: function(success) {
            if (success.status === 'success') {
                $('#reset-email-success').addClass('d-block');
                $('#reset-email-success').text(success.message);
                $('#reset-email-error').removeClass('d-block');
            } else {
                $('#reset-email-error').addClass('d-block');
                $('#reset-email-error').text(success.message);
                $('#reset-email-success').removeClass('d-block');
            }
        },
        error: function() {
            $('#reset-email-error').addClass('d-block');
            $('#reset-email-error').text('Unable to send email please try again');
            $('#reset-email-success').removeClass('d-block');
        },
    });
};

var forgotPasswordSubmit = function(e) {
    if (e) {
        e.preventDefault();
    }

    $('#email-error').addClass('d-none');

    var username = $('#forgetpwd-username').val().trim();
    var email = $('#forgetpwd-email').val().trim();

    if (!username) {
        $('#email-error').addClass('d-block');
        $('#email-error').text('Please enter your Username');
        $('#forgetpwd-username').focus();
        return;
    }
    if (!email) {
        $('#email-error').addClass('d-block');
        $('#email-error').text('Please enter your Email address');
        $('#forgetpwd-email').focus();
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/forgetpassword',
        data: {
            username: username,
            email: email,
        },
        success: function(success) {
            if (success.status === 'success') {
                $('#email-success').addClass('d-block');
                $('#email-success').text(success.message);
                $('#email-error').removeClass('d-block');
            } else {
                $('#email-error').addClass('d-block');
                $('#email-error').text(success.message);
                $('#email-success').removeClass('d-block');
            }
        },
        error: function() {
            $('#email-error').addClass('d-block');
            $('#email-error').text('Unable to send email please try again');
            $('#email-success').removeClass('d-block');
        },
    });
};

var forgotUsernameSubmit = function(e) {
    if (e) {
        e.preventDefault();
    }

    $('#email-error').addClass('d-none');

    var email = $('#forget-username-email').val().trim();

    if (!email) {
        $('#email-error').addClass('d-block');
        $('#email-error').text('Please enter your Email address');
        $('#forget-username-email').focus();
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/api/user/forget-username',
        data: {
            email: email,
        },
        success: function(success) {
            if (success.status === 'success') {
                $('#forget-username-success').addClass('d-block');
                $('#forget-username-success').text(success.message);
                $('#forget-username-error').removeClass('d-block');
            } else {
                $('#forget-username-error').addClass('d-block');
                $('#forget-username-error').text(success.message);
                $('#forget-username-success').removeClass('d-block');
            }
        },
        error: function() {
            $('#forget-username-error').addClass('d-block');
            $('#forget-username-error').text('Unable to send email please try again');
            $('#forget-username-success').removeClass('d-block');
        },
    });
};
var forgotUsernameRequest = function(e) {
    if (e) {
        e.preventDefault();
    }

    $('#reset-username-error').addClass('d-none');

    var email = $('#forgot-username-email').val().trim();

    if (!email) {
        $('#forgot-username-error').addClass('d-block');
        $('#forgot-username-error').text('Please enter your Email address');
        $('#forgot-username-email').focus();
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/api/user/forget-username',
        data: {
            email: email,
        },
        success: function(success) {
            if (success.status === 'success') {
                $('#forgot-username-success').addClass('d-block');
                $('#forgot-username-success').text(success.message);
                $('#forgot-username-error').removeClass('d-block');
            } else {
                $('#forgot-username-error').addClass('d-block');
                $('#forgot-username-error').text(success.message);
                $('#forgot-username-success').removeClass('d-block');
            }
        },
        error: function() {
            $('#forgot-username-error').addClass('d-block');
            $('#forgot-username-error').text('Unable to send email please try again');
            $('#forgot-username-success').removeClass('d-block');
        },
    });
};

var forgetPassword = function(e) {
    if (e) {
        e.preventDefault();
    }
    var credentials = {
        username: $('#forgetpwd-username').val().trim(),
    };
    $.ajax({
        type: 'POST',
        url: '/forgetpassword',
        data: credentials,
        success: function(success) {
            if (success.status === 'success') {
                $('#email-success').text(success.message);
                $('#email-error').text('');
            } else {
                $('#email-success').text('');
                $('#email-error').text(success.message);
            }
        },
        error: function() {
            $('#email-success').text('');
            $('#email-error').text('unable to send email please try again.');
        },
    });
};

var forgetPassword = function(e) {
    if (e) {
        e.preventDefault();
    }
    var credentials = {
        username: $('#forgetpwd-username').val().trim(),
    };
    $.ajax({
        type: 'POST',
        url: '/forgetpassword',
        data: credentials,
        success: function(success) {
            if (success.status === 'success') {
                $('#email-success').text(success.message);
                $('#email-error').text('');
            } else {
                $('#email-success').text('');
                $('#email-error').text(success.message);
            }
        },
        error: function() {
            $('#email-success').text('');
            $('#email-error').text('unable to send email please try again.');
        },
    });
};

var openAssetsModal = function() {
    $('#assets-modal').modal('show');
};

var showImage = function(src) {
    var fr = new FileReader();
    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function() {
        $('#add-assets-src').attr('src', this.result);
    };
    src.addEventListener('change', function() {
        console.log(src.files[0]);
        var file = src.files[0];
        var fileType = file['type'];
        console.log(file);
        $('#error-text').text('');
        var ValidImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
        if ($.inArray(fileType, ValidImageTypes) < 0) {
            $('#error-text').text('file extension not supported');
            document.getElementById('add-assets-file').value = '';
            return;
        }
        //file size 300kb;
        if (file.size / 1000 > 300) {
            document.getElementById('add-assets-file').value = '';
            $('#error-text').text('file size exceed 300kb');
        }
        fr.readAsDataURL(src.files[0]);
    });
};

var onImageChange = function() {
    var file = document.getElementById('add-assets-file');
    showImage(file);
};
var selectedType = '';
var addNewAssets = function(type) {
    selectedType = type;
    editAssets = undefined;
    $('#asset-add-button').text('Add Asset');
    var file = document.getElementById('add-assets-file');
    showImage(file);
    $('#error-text').text('');
    document.getElementById('add-asset-form').reset();
    $('#addEditAssetTItle').text('Add New Assets');
    $('#add-assets-src').attr('src', '');
    $('#add-assets-modal').modal('show');
};

var addAssetsSubmit = function(e) {
    if (e) {
        e.preventDefault();
    }
    var copyRight = $('#copyrightCheckbox').is(':checked');
    if (copyRight) {
        var file = document.getElementById('add-assets-file');
        file = file.files[0];
        if (!editAssets && !file) {
            $('#error-text').text('Please upload content for assets');
            return;
        }
        var assets = {
            name: $('#add-assets-name').val(),
            keywords: $('#add-assets-keywords').val(),
            price: $('#add-assets-price').val(),
            type: selectedType,
        };

        if (editAssets) {
            assets._id = editAssets._id;
            assets.url = editAssets.url;
            assets.type = editAssets.type;
        }

        if (file) {
            var getSignedUrl = {
                filename: `${new Date().getTime()}_${file.name}`,
                filetype: file.type,
                isAsset: true,
                assetType: assets.type,
            };
            $.ajax({
                type: 'POST',
                url: '/getsignedurl',
                data: getSignedUrl,
                success: function(result) {
                    if (result.status === 'success') {
                        $.ajax({
                                url: result.message.signedRequest,
                                type: 'PUT',
                                data: file,
                                dataType: 'text',
                                cache: false,
                                contentType: file.type,
                                processData: false,
                            })
                            .done(() => fileUploadedToS3(assets, result.message.url))
                            .fail(function() {
                                console.error('damn...');
                            });
                    }
                },
                error: function(err) {
                    console.log(err);
                    // $('#email-success').text('');
                    // $('#email-error').text("unable to send email please try again.");
                },
            });
        } else {
            fileUploadedToS3(assets, assets.url);
        }
    } else {
        $('#error-text').text('Please checked terms and condition');
    }
};
var fileUploadedToS3 = function(assets, url) {
    assets.url = url;
    var imageName = url.split('/').pop();
    if (assets.keywords && assets.keywords.indexOf(imageName) === -1) {
        assets.keywords = ',' + url.split('/').pop();
    }
    $.ajax({
        url: '/createassets',
        type: 'POST',
        data: assets,
        success: function(response) {
            if (response.status === 'success') {
                window.location.reload();
            } else {
                $('#error-text').text("you're not authorized");
            }
        },
        error: function(err) {
            console.log(err);
        },
    });
};

//this is reloaded on page request - allows one game to get launched in current window
let isOpeningGame = false;

function openGame(e) {
    if (e.button === 2) {
        return;
    }
    e.preventDefault();
    if (isOpeningGame) {
        return;
    }
    //this '+' is a shorthand for getting the numeric representation of the variable - as it is returned as a string
    var publishedServerCount = +e.currentTarget.dataset.serverCount;
    var gameSlug = e.currentTarget.dataset.gameSlug;
    var url = e.currentTarget.querySelector('#game-card-game-link').href;
    if (window.event.ctrlKey) {
        window.open(url, '_blank');
        return;
    }
    $(e.currentTarget.querySelector('.loading-overlay')).css({
        display: 'inline',
    });
    isOpeningGame = true;
    if (publishedServerCount < 1) {
        $.post('/publish-on-demand/' + gameSlug);
        setTimeout(function() {
            $('.loading-overlay').hide();
            location.href = url;
        }, 5000);
    } else {
        $('.loading-overlay').hide();
        location.href = url;
    }
}

var editAssetsModal = function(assetId) {
    var file = document.getElementById('add-assets-file');
    showImage(file);
    $('#copyrightCheckbox').attr('checked', true);
    $('#error-text').text('');
    $('#asset-add-button').text('Edit Asset');

    $.ajax({
        url: `/getAssets?assetId=${assetId}`,
        type: 'GET',
        success: function(response) {
            if (response.status === 'success') {
                var asset = response.message;
                editAssets = response.message;
                document.getElementById('add-asset-form').reset();
                $('#add-assets-modal').modal('show');
                $('#addEditAssetTItle').text('Edit Assets');
                $('#add-assets-name').val(asset.name);
                $('#add-assets-keywords').val(asset.keywords);
                $('#add-assets-type').val(asset.type);
                $('#add-assets-src').attr('src', asset.url);
                $('#add-assets-price').val(asset.price);
            }
        },
        error: function(err) {
            console.log(err);
        },
    });
};

var searchPublicGames = function(e) {
    if (e.keyCode === 13) {
        var searchBy = $('#search').val();
        if (searchBy) {
            window.location = `/sandbox/games?search=${searchBy}`;
        } else {
            window.location = `/sandbox/games`;
        }
    }
};

var gotoNextPage = function(page, searchBy, isAssetLibrary) {
    var url = `/sandbox/games`;
    const queryParams = [];

    if (isAssetLibrary) {
        var innerTab = $('.asset.link.active').text();
        if (!innerTab || innerTab === 'Sprite Images') {
            innerTab = 'spriteImage';
        } else if (innerTab === 'Sound') {
            innerTab = 'sound';
        }

        url = `sandbox/assets`;
        queryParams.push(`innertab=${innerTab}`);
    }
    if (searchBy) {
        queryParams.push(`search=${searchBy}`);
    }
    if (page) {
        queryParams.push(`page=${page}`);
    }

    const firstQueryParam = queryParams.shift();
    const remainingQueryParams = queryParams.join('&');

    if (firstQueryParam) {
        url += `?${firstQueryParam}`;
    }
    if (remainingQueryParams) {
        url += `&${remainingQueryParams}`;
    }

    window.location = url;
};

var initFacebookSdk = function() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: '121830861823869',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v2.10',
        });
        FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
};

var refreshIn = function(id, durationSeconds) {
    window.refreshInterval = setInterval(function() {
        if (durationSeconds <= 0) {
            clearInterval(window.refreshInterval);
            location.reload();
        }

        $('#' + id).text('Reloading in ' + durationSeconds--);
    }, 1000);
};
var clearRefreshInterval = function() {
    if (window.refreshInterval) {
        clearInterval(window.refreshInterval);
    }
};

initFacebookSdk();
var shareOnFacebook = function(item, from, config, cb) {
    var params = {
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
            object: {
                'og:url': config.url || 'http://modd.io',
                'og:title': config.caption || 'Modd.io',
                'og:image': config.image || assetsProvider + '/assets/images/moddio_logo.png',
                'og:image:type': 'image/jpeg',
            },
        }),
    };

    FB.ui(params, function(response) {
        if (response) {
            notifyServer('facebook', item, from);

            if (cb) {
                cb(response);
            }
        }
    });
};

var promoteGameOnFacebook = function() {
    FB.ui({
            method: 'share',
            href: location.href,
            quote: 'Hey guys, please help me test my game ' + gameDetails.name,
            hastag: '#gaming #multiplayer #mmo #sandbox #memes',
        },
        function(response) {},
    );
};
var promoteGameOnTwitter = function() {
    var textToTweet = 'Need more players!! Join me in ' + gameDetails.name + ' (' + location.href + ')';
    var hashTags = ['games', 'moddio'];
    var mentions = ['moddio'];
    var twitterUrl = 'https://twitter.com/intent/tweet?url=share.url&text=' + textToTweet + '&hashtags=' + hashTags.join(',') + '&via=' + mentions.join(',');

    window.open(twitterUrl);
};

// bind single listener for 'tweet' event
// every twitter share element should have 'data-item-data' and 'data-from' attributes

$(document).ready(function() {
    var initTwitterSdk = function() {
        window.twttr = (function(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };

            return t;
        })(document, 'script', 'twitter-wjs');
    };

    initTwitterSdk();

    var twitterInitTimer = setInterval(function() {
        if (twttr && twttr.events) {
            clearInterval(twitterInitTimer);

            twttr.events.bind('tweet', function(event) {
                var source = event.target;
                var data = {
                    item: $(source).data('itemData'),
                    from: $(source).data('from'),
                    unauthenticated: $(source).data('unauthenticated'),
                };

                notifyServer('twitter', data.item, data.from, data.unauthenticated);
            });
        }
    }, 1000);
});

var shareCallback = function(data, errorResponse, successResponse) {
    if (errorResponse) {
        console.log('got ', errorResponse, 'when shared from', from);
        return;
    }

    var from = data.from;

    switch (from) {
        default:
            case 'menubar':
        {
            console.log('from ', from);
            break;
        }

        case 'shop-modal':
            {
                $('.share-modal').modal('hide');
                break;
            }

        case 'marketplace':
            {
                break;
            }
        case 'marketplace-item':
            {
                if (data.sharedOn === 'twitter') {
                    if (data.unauthenticated === 'true') {
                        openLoginOptionFrameModal();
                    } else {
                        $('[id=' + data.item.itemId + '][data-price=twitter]').addClass('disabled');
                        ige.shop.buySkin(data.item.itemId, 'twitter');
                    }
                }
                break;
            }

        case 'game':
            {
                if (successResponse.coins) {
                    $('.player-coins').text(successResponse.coins);
                }
            }
    }
};

var notifyServer = function(sharedOn, itemShared, from, unauthenticated) {
    var xhttp = null;
    var body = {
        sharedOn: sharedOn,
        item: itemShared,
        from: from,
        unauthenticated: unauthenticated
    };

    if (window.XMLHttpRequest) {
        // Mozilla, Safari, IE7+ ...
        xhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // IE 6 and older
        xhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (!xhttp) {
        return;
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //notify user about the coins
        }
    };

    xhttp.open('POST', '/promoted-modd', true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhttp.onload = function() {
        shareCallback(body, null, JSON.parse(xhttp.response));
    };
    xhttp.onerror = function() {
        shareCallback(body, xhttp.response);
    };
    xhttp.send(JSON.stringify(body));
};

var emailVerification = function() {
    return jQuery.ajax({
        type: 'GET',
        url: '/api/user/emailverificationtoken',
        success: function(res) {
            if (res.status === 'success') {
                setTimeout(() => {
                    swal('Thank you', 'Verification link sent successfully', 'success');
                }, 300);
            } else if (res.message.indexOf('unable to send email') > -1) {
                setTimeout(() => {
                    alert(res.message);
                }, 300);
            } else {
                setTimeout(() => {
                    alert('Invalid Email Address');
                }, 300);
            }
        },
    });
};

var handleReportSubmit = function(e) {
    if (e) {
        e.preventDefault();
    }
    var report = {
        issue: $('#issue').val(),
        description: $('#description').val(),
        whoareyou: $('#whoareyou').val(),
        contactEmail: $('#contactEmail').val(),
    };

    $.ajax({
        type: 'POST',
        url: 'api/reports/create-issue',
        data: report,
        success: function(data) {
            document.getElementById('report-issue-form').reset();
            $('#report-issue-modal').modal('hide');
            alert('Reported successfully. We will contact you shortly');
        },
        error: function(err) {
            console.log('err', err);
        },
    });
};

function randomToken(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function fallbackCopyTextToClipboard(text) {
    return new Promise((resolve, reject) => {
        var textArea = document.createElement('textarea');
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            if (successful) {
                resolve();
            } else {
                reject();
            }
        } catch (err) {
            reject(err);
        }

        document.body.removeChild(textArea);
    });
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }

    return navigator.clipboard.writeText(text);
}

function displayPurchaseModal(modal) {
    var data = modal.data();
    var loader = '<div class="text-center"><span class="fa fa-spin fa-sync fa-2x"></span></div>';
    var modalBody = modal.find('.purchasable-info-container');
    var coinOffers = modal.find('.coin-offers');
    var modalTitle = modal.find('.modal-title');

    coinOffers.addClass('d-none');

    modalBody.html('');
    var coins = ige.client.myPlayer ? ige.client.myPlayer._stats.coins : user.coins;
    modalTitle.text('You have ' + coins + ' coins');

    if (data.purchasable) {
        modalBody.html(loader);

        $.ajax({
            type: 'GET',
            url: '/api/purchasable/' + data.purchasable,
            success: function(data) {
                var purchasableInfo = data.result;
                var ownerName = purchasableInfo.ownerData && purchasableInfo.ownerData.local && purchasableInfo.ownerData.local.username;
                var entityName = purchasableInfo.target && purchasableInfo.target.name;

                modalBody.html('');

                let itemDetails = null;
                let clipping = 'height:60px';
                let clippingClass = null;
                if (purchasableInfo.target.entityType == 'unit') {
                    itemDetails = ige.game.getAsset('unitTypes', purchasableInfo.target.key);
                }
                if (itemDetails && itemDetails.cellSheet && (itemDetails.cellSheet.columnCount > 1 || itemDetails.cellSheet.rowCount > 1)) {
                    clipping = 'clip:rect(0px,' + itemDetails.cellSheet.originalWidth + 'px,' + itemDetails.cellSheet.originalHeight + 'px,0px);position:absolute';
                    clippingClass = 'm-2';
                }
                modalBody.append(
                    $('<div/>', {
                        class: 'col-12 text-center'
                    }).append(
                        $('<span/>', {
                            class: clippingClass,
                        })
                        .append(
                            $('<img/>', {
                                src: purchasableInfo.image,
                                style: clipping,
                            }),
                        )
                        .append($('<h5>' + purchasableInfo.name + (entityName ? ' (' + entityName + ')' : '') + '</h5>'))
                        .append($(ownerName ? '<h6> Created by: ' + ownerName + '</h6>' : ''))
                        .append(
                            $("<div class='d-inline-flex'>")
                            .append(
                                $('<img/>', {
                                    src: assetsProvider + '/assets/images/coin.png',
                                    style: 'width:20px; height: 20px',
                                }),
                            )
                            .append('<h6>' + purchasableInfo.price + '</h6>'),
                        ),
                    ),
                );

                if (user.coins < purchasableInfo.price) {
                    coinOffers.removeClass('d-none');

                    modalBody.append(`<div class="alert alert-danger text-center">You don't have enough coins, you need ${parseInt(purchasableInfo.price - user.coins)} more coins to get this item.`);

                    $('#purchase-skin-button').attr('disabled', true);

                    return;
                }
            },
            error: function(err) {
                var error = '<div class="alert alert-danger text-center">' + err.data + '</div>';
                modalBody.html(error);
            },
        });
    }
}

function purchaseSkin(event) {
    var data = $('#purchasable-purchase-modal').data();

    if (data.price && window.userId && window.userId.toString() !== window.gameJson ? .data ? .defaultData ? .owner ? .toString()) {
        window.userId && window.trackEvent && window.trackEvent('Coin Purchase', {
            coins: parseFloat(data.price),
            distinct_id: window.userId.toString(),
            type: "skin",
            // purchaseId: purchasableId,
            gameId: window.gameId ? .toString(),
            status: "initiated"
        });
    }

    if (typeof window.validateUserPin === 'function') {
        window.validateUserPin('purchaseSkinCallback', data.purchasable, '');
    } else {
        purchaseSkinCallback(data.purchasable);
    }
}

function purchaseSkinCallback(purchasable, token) {
    $('#purchase-skin-button').attr('disabled', true);
    var loader = '<div class="text-center"><span class="fa fa-spin fa-sync fa-2x"></span></div><div class="text-center mt-3">Please wait, We\'re processing your transaction.</div>';
    var modalBody = $('#purchasable-purchase-modal').find('.purchasable-info-container');

    modalBody.html(loader);

    ige.shop.buySkin(purchasable, '', token);
}

function selectDisableAdPackage(coinPackage) {
    $('#disable-ad-modal').data('coinPackage', coinPackage);
    $('#disable-ad-modal').modal('show');
}

function displayDisableAdModal(modal) {
    var data = modal.data();
    var durationText = '';
    var coinPackage = data.coinPackage;

    var modalTitle = modal.find('.modal-title');
    var modalBody = modal.find('.disable-ad-info-container');
    var coinOffers = modal.find('.coin-offers');

    modal.addClass('absolute-vertical-center');
    modal.find('.modal-dialog').addClass('modal-lg');
    modalBody.html('');
    modalTitle.text('You have ' + user.coins + ' coins');

    if (coinPackage === 300) {
        durationText = '1 month';
    }

    coinOffers.addClass('d-none');
    modalBody.text('Are you sure you want to disable ads in all games for ' + durationText + ' ?');

    if (user.coins <= coinPackage) {
        modal.removeClass('absolute-vertical-center');
        coinOffers.removeClass('d-none');
    } else {
        modal.find('.modal-dialog').removeClass('modal-lg').addClass('modal-sm');
    }
}

function hideSidebarSuggestions() {
    $('#game-suggestion-sidebar').hide();
    $('#login-div').css({
        right: '0px',
    });
    $('#leaderboard').css({
        right: '0px',
    });
    $('#my-score-div').css({
        right: '0px',
    });
}

function openLinkAndRecordCount(link) {
    $.ajax({
        type: 'POST',
        url: analyticsUrl + 'api/game-report/side-bar-game-suggestion',
    });
    var newtab = window.open(link, '_blank');
    newtab.focus();
}

function disableAd() {
    var data = $('#disable-ad-modal').data();
    var coinsSpent = data.coinPackage || 300;
    var durationText = '';

    if (coinsSpent === 300) {
        durationText = '1 month';
    }

    $.ajax({
        type: 'POST',
        url: '/api/user/disable-ads/' + gameId,
        data: {
            coins: coinsSpent,
        },
        success: function(response) {
            $('#disable-ad-modal').modal('hide');
            if (response.status === 'success') {
                if (typeof response.message.coins === 'number') {
                    $('.player-coins').text(response.message.coins);
                }

                swal({
                    type: 'success',
                    title: 'Success',
                    text: 'You will not see any ads in any game on modd.io for ' + durationText,
                }).then(result => {
                    if (result && result.value === true) {
                        window.location.reload();
                    }
                });
            } else {
                swal({
                    type: 'error',
                    title: 'Error',
                    text: response.message || 'An error had occurred please contact admin',
                });
            }
        },
    });
}

function openChest(chestType, gameId) {
    var isUsingMobileApp = isInMobileApp();
    if (chestType === 'big' && !isUsingMobileApp) {
        var moddioLink = {
            android: 'https://play.google.com/store/apps/details?id=com.moddio.moddioapp',
            // ios: 'https://itunes.apple.com/us/app/braains-io/id1177022124?mt=8',
        };
        var androidLink = moddioLink.android;
        var iosLink = moddioLink.ios;

        var iosButton = '<div>' + '<span class="btn btn-lg opacity-50">' + '<img src="/assets/images/appstore.svg" />' + '</span>' + '<div>coming soon</div>' + '</div>';
        var androidButton = '<div>' + '<a class="btn btn-lg" href="' + androidLink + '" target="_blank">' + '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" style="height: 40px;" />' + '</a>' + '</div>';

        swal.fire({
            html: '<div class="p-2">Big Treasure Chest can only be opened from our mobile app.</div>' + '<div class="d-flex justify-content-around mt-3">' + androidButton + iosButton + '</div>',
            showCloseButton: true,
            confirmButtonText: 'Close',
            confirmButtonColor: '#dc3545',
        });
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/api/user/open-chest/' + gameId,
        data: {
            chestType: chestType,
        },
        success: function(response) {
            if (response.status === 'success') {
                var openChestImageUrl = assetsProvider + '/assets/images/' + chestType + '-chest-opened.png';

                $('.' + chestType + '-chest-button').addClass('pointer-events-none cursor-not-allowed');
                $('.' + chestType + '-chest-image').attr('src', openChestImageUrl);
                $('.' + chestType + '-chest-text').html(response.message.message);

                $('.menu-' + chestType + '-chest-image').css({
                    background: 'url(' + openChestImageUrl + ') 50% 100% / contain'
                });
                $('.menu-' + chestType + '-chest-image .coin-offer-text').addClass('d-none');

                if (response.message.reward && response.message.reward.coins) {
                    user.coins = response.message.reward.totalCoins;
                    $('.player-coins').text(response.message.reward.totalCoins);
                    swal({
                        title: 'Congratulations!!!',
                        text: response.message.message,
                        imageWidth: 150,
                        imageUrl: openChestImageUrl,
                    });
                }
            }
        },
    });
}

function openXsollaModal(token) {
    var options = {
        access_token: token, //TODO use access token, received on previous step
        // sandbox: true
    };
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://static.xsolla.com/embed/paystation/1.0.7/widget.min.js';
    s.addEventListener(
        'load',
        function(e) {
            XPayStationWidget.init(options);
            XPayStationWidget.open();
        },
        false,
    );
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(s);
}

function sendFriendRequest() {
    var friendInput = $('#add-friend-typeahead');
    var addFrientButton = $('#add-friend');

    var data = friendInput.data();
    addFrientButton.addClass('disabled');

    if (!data || !data.userId) {
        return;
    }

    sendFriendRequestToUser(data.userId).then(function() {
        addFrientButton.removeClass('disabled');
        friendInput.data({
            userId: ''
        });
        friendInput.val('');
    });
}

function sendFriendRequestToUser(userId) {
    return $.post('/api/user/request/' + userId);
}

function unfriendUser(userId) {
    return $.post('/api/user/request/' + userId + '/unfriend');
}

function addFriendFromUnitContextMenu() {
    var data = $('#unit-context-menu').data();

    if (!data || !data.user) {
        return;
    }

    return sendFriendRequestToUser(data.user).then(() => {
        swal({
            text: 'Request sent successuflly',
        });
    });
}

function removeFriendFromUnitContextMenu() {
    var data = $('#unit-context-menu').data();

    if (!data || !data.user) {
        return;
    }

    swal.fire({
        title: 'Are you sure, you want to unfriend ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
    }).then(result => {
        if (result.value) {
            return unfriendUser(data.user);
        }

        return Promise.resolve(false);
    });
}

function closeGamesSuggestionCard() {
    $('#game-suggestions-card').removeClass('d-xl-block');
}

function closeInvitePlayersCard() {
    $('#invite-players-card').addClass('d-none');
}

function toggleDevConsole() {
    if (['1', '5'].includes(window.gameDetails.tier)) {
        const isEditorVisible = $('#game-editor').is(':visible');
        $('#kick-player').toggle(!isEditorVisible);
    }
}

function publishPrivateServer() {
    var privateGameButton = $('#launch-private-game-button');

    privateGameButton.attr('disabled', 'disabled');
    privateGameButton.html(`
        <span>
            <i class="fa fa-sync fa-spin mr-2"></i>
            <span>Launching....</span>
        </span>
    `);

    $.post('/api/game/private/' + gameId + '/publish')
        .then(function(data) {
            var gameLink = window.location.protocol + '//' + window.location.host + '/lobby/' + data.message.code;
            location.href = gameLink;
        })
        .catch(function(err) {
            console.log(err);
            var swalConfig = {
                type: 'error',
                title: 'Error',
                text: 'Something went wrong while publishing private server for this game',
                confirmButtonColor: '#7289da',
                confirmButtonText: 'Contact Admin',
            };

            privateGameButton.html('Launch a Private Server');
            privateGameButton.removeAttr('disabled');

            swal(swalConfig).then(result => {
                if (result && result.value === true) {
                    window.open('https://discord.gg/StD2u3Y', '_blank');
                }
            });
        });
}

function viewAllGames(index) {
    switch (index) {
        case 'popular':
            window.location = '/games/popular';
            break;
        case 'all-time':
            window.location = '/games/all-time';
            break;
        case 'upcoming':
            window.location = '/games/upcoming';
            break;
        case 'updated':
            window.location = '/games/updated';
            break;
        case 'new':
            window.location = '/games/new';
            break;
        case 'featured-games':
            window.location = '/games/featured-games';
            break;
    }
}

function goBack() {
    window.history.back();
}

function tabClick(index) {
    $('#pills-tab').each(function() {
        $(this)
            .find('.nav-link')
            .each(function() {
                $(this).removeClass('active');
            });
    });
    $('#pills-tabContent').each(function() {
        $(this)
            .find('.tab-pane')
            .each(function() {
                $(this).removeClass('active show');
            });
    });
    $('#pills-tab')
        .find('#' + index)
        .addClass('active');
    $('#pills-tabContent')
        .find('#' + index)
        .addClass('active show');
    window.history.replaceState('', '', '/games/' + index);
    resizeGameCards();
}

function resizeGameCards() {
    // check max height from list of elements
    const heights = $('.game-row-grid>.col.col')
        .map(function() {
            return $(this).height();
        })
        .get();
    const fontSize = Math.max.apply(null, heights) * 0.075 + 'px';
    $('.game-author-name').css('font-size', fontSize);
    $('.game-card-title').css('font-size', fontSize);
}

function backToLoginOptions() {
    $('.cache-login').hide();
    $('.login-username').hide();
    $('.login-all-option').show();
    $('.reset-password').hide();
    $('.reset-username').hide();
}

function openLoginWithUsername() {
    $('.cache-login').hide();
    $('.login-username').show();
    $('.login-all-option').hide();
    $('.reset-password').hide();
    $('.reset-username').hide();
}

function openResetPasswordModal() {
    $('.login-username').hide();
    $('.reset-password').show();
    $('.reset-username').hide();
}

function openResetUsernameModal() {
    $('.login-username').hide();
    $('.reset-password').hide();
    $('.reset-username').show();
}

function checkLoginSource(url) {
    let loginSource = localStorage.getItem('loginSource') || '';
    if (url && url === '/auth/discord') loginSource = 'discord';
    else if (url && url == '/auth/facebook') loginSource = 'facebook';
    else if (url && url == '/auth/twitter') loginSource = 'twitter';
    else if (url && url == '/auth/google') loginSource = 'google';
    localStorage.setItem('loginSource', loginSource);
    localStorage.setItem('logged', true);
}

function reloadPlayPageOnPublish(gameId) {
    let counter = 0;
    const fetchGameServers = gameId => {
        if (counter > 20) {
            if (window.gameSlug) {
                // post request to /publish-on-demand/:gameSlug with no payload
                $.ajax({
                    url: `/publish-gs-on-demand/${window.gameSlug}`,
                    type: 'POST',
                    success: function(result) {
                        // we can add additional cases here later, for now we will leave these black
                    },
                });
            }
        }

        $.ajax({
            url: `/api/game-server/${gameId}`,
            type: 'GET',
            success: function(gameServers) {
                if (gameServers && gameServers.status == 'success' && gameServers.message && gameServers.message.length) {
                    let servers = gameServers.message;

                    servers = servers.filter(server => {
                        return server.gameId === gameId.toString() && server.tier !== '0' && server.isReachable && server.maxPlayers && server.maxPlayers > 0;
                    });
                    if (servers && servers.length) {
                        clearInterval(serverInterval);
                        // check if inGameEditor is loaded
                        if (window.inGameEditor && window.inGameEditor.gameServersLoaded) {
                            window.inGameEditor.gameServersLoaded();
                        } else {
                            clearInterval(serverInterval);
                            window.location.reload();
                        }
                    }
                }
                counter++;
            },
        });
    };
    const serverInterval = setInterval(() => {
        fetchGameServers(gameId);
    }, 1000);
}
$(document).ready(function() {
    if ($('a.publishing-on-demand').length) {
        var gameId = $('a.publishing-on-demand').data('game-id');
        reloadPlayPageOnPublish(gameId);
    }
});