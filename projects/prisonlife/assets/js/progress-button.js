/**
 * progressButton.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;
(function(window) {

    'use strict';

    // https://gist.github.com/edankwan/4389601
    Modernizr.addTest('csstransformspreserve3d', function() {
        var prop = Modernizr.prefixed('transformStyle');
        var val = 'preserve-3d';
        var computedStyle;
        if (!prop) return false;

        prop = prop.replace(/([A-Z])/g, function(str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');

        Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function(el, rule) {
            computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
        });

        return (computedStyle === val);
    });

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    // support
    var support = {
            transitions: Modernizr.csstransitions,
            transforms3d: Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d
        },
        // transition end event name
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

    function ProgressButton(el, options) {
        this.button = el;
        this.progressValue = 0;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    ProgressButton.prototype.options = {
        statusTime: 100
    };

    ProgressButton.prototype._init = function() {
        var self = this;
        // create structure
        this._create();
    };

    ProgressButton.prototype._create = function() {
        var textEl = document.createElement('span');
        textEl.className = 'content';
        textEl.innerHTML = this.button.innerHTML;
        var progressEl = document.createElement('span');
        progressEl.className = 'progress';

        var progressInnerEl = document.createElement('span');
        progressInnerEl.className = 'progress-text d-flex align-items-center justify-content-center w-100';
        progressInnerEl.innerText = 'Powered by modd.io';
        progressEl.appendChild(progressInnerEl);

        var progressInnerEl = document.createElement('span');
        progressInnerEl.className = 'progress-inner';
        progressEl.appendChild(progressInnerEl);
        // clear content
        this.button.innerHTML = '';

        if (this.button.getAttribute('data-perspective') !== null) {
            var progressWrapEl = document.createElement('span');
            progressWrapEl.className = 'progress-wrap';
            progressWrapEl.appendChild(textEl);
            progressWrapEl.appendChild(progressEl);
            this.button.appendChild(progressWrapEl);
        } else {
            this.button.appendChild(textEl);
            this.button.appendChild(progressEl);
        }

        // the element that serves as the progress bar
        this.progress = progressInnerEl;

        // property to change on the progress element
        if (this.button.getAttribute('data-horizontal') !== null) {
            this.progressProp = 'width';
        } else if (this.button.getAttribute('data-vertical') !== null) {
            this.progressProp = 'height';
        }

        this._enable();
    };

    ProgressButton.prototype._setProgress = function(val) {
        this.progressValue = val;
        this.progress.style[this.progressProp] = 100 * val + '%';
    };

    ProgressButton.prototype._startLoading = function() {
        var self = this;
        // disable the button
        self.button.setAttribute('disabled', '');
        // add class state-loading to the button (applies a specific transform to the button depending which data-style is defined - defined in the stylesheets)
        $(self.progress).removeClass('notransition');
        $(self.button).addClass('state-loading');

        self.options.callback(self);
    };

    ProgressButton.prototype._stop = function(status, doneLoading) {
        var self = this;

        setTimeout(function() {
            // fade out progress bar
            self.progress.style.opacity = 0;
            var onEndTransFn = function(ev) {
                if (support.transitions && ev.propertyName !== 'opacity') return;
                this.removeEventListener(transEndEventName, onEndTransFn);
                $(self.progress).addClass('notransition');
                self.progress.style[self.progressProp] = '0%';
                self.progress.style.opacity = 1;
            };

            if (support.transitions) {
                self.progress.addEventListener(transEndEventName, onEndTransFn);
            } else {
                onEndTransFn.call();
            }

            if (typeof status === 'number') {
                setTimeout(function() {
                    self._enable(doneLoading);
                }, self.options.statusTime);
            } else {
                self._enable(doneLoading);
            }

            if (self.options.preActiveMode) {
                self.options.preActiveMode(self);
            }
            // remove class state-loading from the button
            $(self.button).removeClass('state-loading');
        });
    };

    // enable button
    ProgressButton.prototype._enable = function(sendRequest) {
        var buttonContent = $('#play-game-button .content');
        var buttonHtml = buttonContent && buttonContent.html();
        if (sendRequest && buttonHtml && buttonHtml.indexOf('gamepad') > -1 && gameId && user && user._id) {
            $.get(`https://www.modd.io/get-game/${gameId}`).then(data => {
                if (data.result[0].solanaWalletLoginEnabled) {
                    document.getElementById('p1').innerHTML = " <img  style='width: 20px; height: 20px; margin-right: 7px; border-radius: 10px;' src='https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png'/> Connect Wallet";
                    document.getElementById('p1').style.display = 'block';
                }
            }).catch((err) => console.log('checking error', err))
        }

        // checking if guest playing is allowed to the game
        if (sendRequest && !user._id && !gameDetails.isGuestPlayerAllowed) {
            $(self.button).addClass('d-none');
            checkGuestUserMode();
        }
        $('#refresh-modal').modal('hide');
        this.button.removeAttribute('disabled');
    };


    // add to global namespace
    window.ProgressButton = ProgressButton;

})(window);