class PurchaseWindow extends TabbedPopupWindow {
    layerName = "Purchase"; // Used as key in activeLayers
    domElementId = "PURCHASED"; // ID of dom element that gets shown or hidden
    context = PU; // Canvas rendering context for popup

    buyTabIndex = 0;
    useTabIndex = 1;

    buyButtons = [];
    useButtons = [];

    constructor(boundingBox, worldIndex = 0, tabIndex = 0) {
        super(boundingBox); // Need to call base class constructor
        if (!boundingBox) {
            this.setBoundingBox();
        }

        this.setFrameImagesByWorldIndex(worldIndex)

        this.currentTabIndex = tabIndex;

        var fontToUse = "14px Verdana"
        if (language == "french") {
            fontToUse = "12px Verdana";
        }

        if (purchaseWindowTabOrder == 1) {
            this.initializeTabs([_("Use Tickets"), _("Get Tickets")]);
            this.useTabIndex = 0;
            this.buyTabIndex = 1;
        } else {
            this.initializeTabs([_("Get Tickets"), _("Use Tickets")]);
        }

        if (true || getBuildTarget() == STEAM_BUILD || platform.domain == "armorgames") {
            if (shopVariantId == 0) {
                this.buyButtons.push(this.addHitbox(new Button(
                    upgradeb, _("BUY"), fontToUse, "#000000", {
                        x: this.boundingBox.width * 0.5 - ticketImage1.width * 1.6,
                        y: ticketImage1.height * 1.6,
                        width: ticketImage1.width,
                        height: 18
                    }, {
                        onmousedown: function() {
                            platform.buyPack(1);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    'pointer',
                    "buyButton1"
                )));

                this.buyButtons.push(this.addHitbox(new Button(
                    upgradeb, _("BUY"), fontToUse, "#000000", {
                        x: this.boundingBox.width * 0.5 - ticketImage1.width * 0.5,
                        y: ticketImage1.height * 1.6,
                        width: ticketImage1.width,
                        height: 18
                    }, {
                        onmousedown: function() {
                            platform.buyPack(2);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    'pointer',
                    "buyButton2"
                )));

                this.buyButtons.push(this.addHitbox(new Button(
                    upgradeb, _("BUY"), fontToUse, "#000000", {
                        x: this.boundingBox.width * 0.5 + ticketImage1.width * 0.6,
                        y: ticketImage1.height * 1.6,
                        width: ticketImage1.width,
                        height: 18
                    }, {
                        onmousedown: function() {
                            platform.buyPack(3);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    'pointer',
                    "buyButton3"
                )));

                this.buyButtons.push(this.addHitbox(new Button(
                    upgradeb, _("BUY"), fontToUse, "#000000", {
                        x: this.boundingBox.width * 0.5 - ticketImage1.width * 1.6,
                        y: ticketImage1.height * 3.1,
                        width: ticketImage1.width,
                        height: 18
                    }, {
                        onmousedown: function() {
                            platform.buyPack(4);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    'pointer',
                    "buyButton4"
                )));

                this.buyButtons.push(this.addHitbox(new Button(
                    upgradeb, _("BUY"), fontToUse, "#000000", {
                        x: this.boundingBox.width * 0.5 - ticketImage1.width * 0.5,
                        y: ticketImage1.height * 3.1,
                        width: ticketImage1.width,
                        height: 18
                    }, {
                        onmousedown: function() {
                            platform.buyPack(5);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        },
                        onmouseenter: function() {
                            showTooltip(_("Buying this ticket pack also grants you the ability to name one of the miners in the game for all Mr.Mine players to see!<br><br>(Added to next update)"), "", mouseX, mouseY);
                        },
                        onmouseexit: function() {
                            hideTooltip();
                        }
                    },
                    'pointer',
                    "buyButton5"
                )));

                this.buyButtons.push(this.addHitbox(new Button(
                    upgradeb, _("BUY"), fontToUse, "#000000", {
                        x: this.boundingBox.width * 0.5 + ticketImage1.width * 0.6,
                        y: ticketImage1.height * 3.1,
                        width: ticketImage1.width,
                        height: 18
                    }, {
                        onmousedown: function() {
                            platform.buyPack(6);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        },
                        onmouseenter: function() {
                            showTooltip(_("Buying this ticket pack also grants you the ability to name one of the miners in the game for all Mr.Mine players to see!<br><br>(Added to next update)"), "", mouseX, mouseY);
                        },
                        onmouseexit: function() {
                            hideTooltip();
                        }
                    },
                    'pointer',
                    "buyButton6"
                )));
            } else {
                this.buyButtons.push(this.addHitbox(new Hitbox({
                        x: this.bodyContainer.boundingBox.width * .07,
                        y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02),
                        width: this.bodyContainer.boundingBox.width * .3,
                        height: this.bodyContainer.boundingBox.height * .41
                    }, {
                        onmousedown: function() {
                            platform.buyPack(1);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    "pointer",
                    "newBuyButton1"
                )));

                this.buyButtons.push(this.addHitbox(new Hitbox({
                        x: this.bodyContainer.boundingBox.width * .39,
                        y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02),
                        width: this.bodyContainer.boundingBox.width * .3,
                        height: this.bodyContainer.boundingBox.height * .41
                    }, {
                        onmousedown: function() {
                            platform.buyPack(2);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    "pointer",
                    "newBuyButton2"
                )));

                this.buyButtons.push(this.addHitbox(new Hitbox({
                        x: this.bodyContainer.boundingBox.width * .71,
                        y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02),
                        width: this.bodyContainer.boundingBox.width * .3,
                        height: this.bodyContainer.boundingBox.height * .41
                    }, {
                        onmousedown: function() {
                            platform.buyPack(3);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    "pointer",
                    "newBuyButton3"
                )));

                this.buyButtons.push(this.addHitbox(new Hitbox({
                        x: this.bodyContainer.boundingBox.width * .07,
                        y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46),
                        width: this.bodyContainer.boundingBox.width * .3,
                        height: this.bodyContainer.boundingBox.height * .41
                    }, {
                        onmousedown: function() {
                            platform.buyPack(4);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    "pointer",
                    "newBuyButton4"
                )));

                this.buyButtons.push(this.addHitbox(new Hitbox({
                        x: this.bodyContainer.boundingBox.width * .36,
                        y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46),
                        width: this.bodyContainer.boundingBox.width * .3,
                        height: this.bodyContainer.boundingBox.height * .41
                    }, {
                        onmousedown: function() {
                            platform.buyPack(5);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        },
                        onmouseenter: function() {
                            showTooltip(_("Buying this ticket pack also grants you the ability to name one of the miners in the game for all Mr.Mine players to see!<br><br>(Added to next update)"), "", this.parent.boundingBox.x + (this.parent.boundingBox.width * .62), this.parent.boundingBox.y + (this.parent.boundingBox.height * .48));
                        },
                        onmouseexit: function() {
                            hideTooltip();
                        }
                    },
                    "pointer",
                    "newBuyButton5"
                )));

                this.buyButtons.push(this.addHitbox(new Hitbox({
                        x: this.bodyContainer.boundingBox.width * .65,
                        y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46),
                        width: this.bodyContainer.boundingBox.width * .3,
                        height: this.bodyContainer.boundingBox.height * .41
                    }, {
                        onmousedown: function() {
                            platform.buyPack(6);
                            if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        },
                        onmouseenter: function() {
                            showTooltip(_("Buying this ticket pack also grants you the ability to name one of the miners in the game for all Mr.Mine players to see!<br><br>(Added to next update)"), "", this.parent.boundingBox.x + (this.parent.boundingBox.width * .91), this.parent.boundingBox.y + (this.parent.boundingBox.height * .48));
                        },
                        onmouseexit: function() {
                            hideTooltip();
                        }
                    },
                    "pointer",
                    "newBuyButton6"
                )));
            }
        } else if (getBuildTarget() == WEB_BUILD) {
            this.buyButtons.push(this.addHitbox(new Hitbox({
                    x: this.bodyContainer.boundingBox.x + this.bodyContainer.boundingBox.width / 2 - collectb.width / 2,
                    y: this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height / 2 - collectb.height / 2,
                    width: collectb.width,
                    height: collectb.height
                }, {
                    onmousedown: function() {
                        showDiv("paypalPopup", 4);
                        if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                "pointer"
            )));
            this.buyButtons[0].render = function(parentWindow) {
                var context = parentWindow.context;
                var coords = this.getRelativeCoordinates(0, 0, parentWindow);
                context.save();
                context.drawImage(collectb, coords.x, coords.y);
                context.fillStyle = "#000000"
                context.font = Math.floor(collectb.height * 0.9) + "px Verdana";
                context.textBaseline = "middle";
                fillTextShrinkToFit(context, _("BUY TICKETS"), coords.x + collectb.width * 0.11, coords.y + collectb.height / 2, collectb.width * 0.78, "center");
                context.restore();
            }.bind(this.buyButtons[0], this);
        }
        this.useButtons.push(this.addHitbox(new Hitbox({
                x: purchasedw * .06,
                y: purchasedh * .57,
                width: purchasedw * .26,
                height: purchasedh * .08
            }, {
                onmousedown: function() {
                    if (tickets > 0) {
                        if (depth < 40) {
                            var depthu = 40;
                        } else {
                            var depthu = depth;
                        }
                        chestService.spawnChest(0, Chest.purchased, ChestType.basic);
                        chestService.presentChest(0);
                        trackEvent_SpentTickets(1, "BASIC CHEST");
                        tickets--;
                    } else {
                        newNews(_("Not enough tickets. You need 1 ticket."));
                    }
                    if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            },
            "pointer"
        )));

        this.useButtons.push(this.addHitbox(new Hitbox({
                x: purchasedw * .37,
                y: purchasedh * .57,
                width: purchasedw * .26,
                height: purchasedh * .08
            }, {
                onmousedown: function() {
                    if (tickets > 9) {
                        if (depth < 40) {
                            var depthu = 40;
                        } else {
                            var depthu = depth;
                        }
                        chestService.spawnChest(0, Chest.purchased, ChestType.gold);
                        chestService.presentChest(0);
                        trackEvent_SpentTickets(10, "GOLD CHEST");
                        tickets -= 10;
                    } else {
                        newNews(_("Not enough tickets. You need 10 tickets. You have {0} tickets.", tickets));
                    }
                    if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            },
            "pointer"
        )));

        this.useButtons.push(this.addHitbox(new Hitbox({
                x: purchasedw * .67,
                y: purchasedh * .57,
                width: purchasedw * .26,
                height: purchasedh * .08
            }, {
                onmousedown: function() {
                    if (tickets >= 30) {
                        if (depth < 40) {
                            var depthu = 40;
                        } else {
                            var depthu = depth;
                        }
                        chestService.spawnChest(0, Chest.purchased, ChestType.black);
                        chestService.presentChest(0);
                        trackEvent_SpentTickets(30, "BLACK CHEST");
                        tickets -= 30;
                    } else {
                        newNews(_("Not enough tickets. You need 30 tickets. You have {0} tickets.", tickets));
                    }
                    if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            },
            "pointer"
        )));

        this.useButtons.push(this.addHitbox(new Button(
            craftb, _("REDEEM"), fontToUse, "#000000", {
                x: purchasedw * .75,
                y: purchasedh * .85,
                width: purchasedw * .20,
                height: purchasedh * .04
            }, {
                onmousedown: function() {
                    showRedeemPrompt();
                    if (!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            },
            "pointer"
        )));

        for (var i in this.buyButtons) {
            this.buyButtons[i].isVisible = () => this.currentTabIndex == this.buyTabIndex;
            this.buyButtons[i].isEnabled = () => this.currentTabIndex == this.buyTabIndex;
        }
        for (var i in this.useButtons) {
            this.useButtons[i].isVisible = () => this.currentTabIndex == this.useTabIndex;
            this.useButtons[i].isEnabled = () => this.currentTabIndex == this.useTabIndex;
        }
        this.onTabChange();

        trackEvent_logPurchaseWindowOpen();
    }

    render() {
        this.context.save();
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        this.context.restore();
        super.render();
        PU.fillStyle = "#FFFFFF";
        var fontToUse = "14px Verdana"
        if (language == "french") {
            fontToUse = "12px Verdana";
        }
        if (this.currentTabIndex == this.buyTabIndex) {
            if (true || getBuildTarget() == STEAM_BUILD || platform.domain == "armorgames") {
                if (shopVariantId == 0) {
                    this.context.drawImage(ticketImage1, this.boundingBox.width / 2 - ticketImage1.width * 1.6, this.bodyContainer.boundingBox.y);
                    this.context.drawImage(ticketImage5, this.boundingBox.width / 2 - ticketImage1.width * 0.5, this.bodyContainer.boundingBox.y);
                    this.context.drawImage(ticketImage10, this.boundingBox.width / 2 + ticketImage1.width * 0.6, this.bodyContainer.boundingBox.y);
                    this.context.drawImage(ticketImage20, this.boundingBox.width / 2 - ticketImage1.width * 1.6, this.bodyContainer.boundingBox.y + ticketImage1.height * 1.5);
                    this.context.drawImage(ticketImage50, this.boundingBox.width / 2 - ticketImage1.width * 0.5, this.bodyContainer.boundingBox.y + ticketImage1.height * 1.5);
                    this.context.drawImage(ticketImage100, this.boundingBox.width / 2 + ticketImage1.width * 0.6, this.bodyContainer.boundingBox.y + ticketImage1.height * 1.5);
                } else if (shopVariantId == 1) {
                    this.context.drawImage(v1Tix10, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix55, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix120, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix250, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix650, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix1400, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);

                    this.context.fillStyle = "#000";
                    this.context.font = "28px KanitB";
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);

                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "bold 18px Verdana";
                    strokeTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$4.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$4.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$9.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$9.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$19.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$19.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$49.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$49.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$99.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$99.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                } else if (shopVariantId == 2) {
                    this.context.drawImage(v2Tix10, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix55, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix120, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix250, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix650, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix1400, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);

                    this.context.fillStyle = "#000";
                    this.context.font = "28px KanitB";
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);

                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "bold 18px Verdana";
                    strokeTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$4.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$4.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$9.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$9.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$19.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$19.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$49.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$49.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$99.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$99.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                } else if (shopVariantId == 3) {
                    this.context.drawImage(v3Tix10, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix55, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix120, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix250, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix650, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix1400, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);

                    this.context.fillStyle = "#000";
                    this.context.font = "28px KanitB";
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);

                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "bold 18px Verdana";
                    strokeTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$4.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$4.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$9.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$9.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$19.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$19.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$49.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$49.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$99.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$99.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                } else if (shopVariantId == 4) {
                    this.context.drawImage(v4Tix10, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix55, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix120, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix250, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix650, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix1400, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);

                    this.context.fillStyle = "#000";
                    this.context.font = "28px KanitB";
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);

                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "bold 18px Verdana";
                    strokeTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$4.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$4.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$9.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$9.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$19.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$19.99", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$49.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$49.99", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$99.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$99.99", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                } else //shopVariantId == 5
                {
                    this.context.drawImage(v5Tix10, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix55, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix120, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix250, this.bodyContainer.boundingBox.width * .07, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix650, this.bodyContainer.boundingBox.width * .39, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix1400, this.bodyContainer.boundingBox.width * .71, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);

                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "22px Matiz";
                    this.context.lineWidth = 4;

                    //this.context.fillStyle = "#000";
                    //fillTextShrinkToFit(this.context, "$0.99", this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + 3 + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    this.context.fillStyle = "#FFF";
                    this.context.shadowColor = "black";
                    this.context.shadowOffsetX = 1;
                    this.context.shadowOffsetY = 4;
                    strokeTextShrinkToFit(this.context, "$1.00", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$1.00", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$5.00", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$5.00", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$10.00", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$10.00", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$20.00", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$20.00", this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$50.00", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$50.00", this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, "$100.00", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, "$100.00", this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);

                    this.context.lineWidth = 3;
                    this.context.shadowOffsetX = 0;
                    this.context.shadowOffsetY = 1;
                    this.context.font = "14px Verdana";
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 10), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 10), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 55), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 55), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 120), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 120), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 250), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 250), this.bodyContainer.boundingBox.width * .10, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 650), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 650), this.bodyContainer.boundingBox.width * .42, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 1400), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 1400), this.bodyContainer.boundingBox.width * .74, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                }
            }
            this.context.lineWidth = 1;
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;

            PU.fillStyle = "#FFF";
            PU.font = "24px KanitM";
            PU.drawImage(smallShopTicket, 0, 0, smallShopTicket.width, smallShopTicket.height, purchasedw * .45, purchasedh * .85, purchasedw * .09, purchasedh * .05);
            PU.fillText("x" + tickets, purchasedw * .55, purchasedh * .89);
        } else {
            this.context.lineWidth = 1;
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            PU.drawImage(chest1, 0, 0, chest1.width, chest1.height, purchasedw * .04, purchasedh * .2, purchasedw * .3, purchasedh * .48);
            PU.drawImage(chest2, 0, 0, chest2.width, chest2.height, purchasedw * .345, purchasedh * .2, purchasedw * .3, purchasedh * .48);
            PU.drawImage(chest3, 0, 0, chest2.width, chest2.height, purchasedw * .65, purchasedh * .2, purchasedw * .3, purchasedh * .48);
            PU.font = "24px KanitM";
            PU.fillStyle = "#1798c7";
            PU.fillText(_("BUY"), purchasedw * .05 + (purchasedw * .3 / 2) - (PU.measureText(_("BUY")).width / 2), purchasedh * .2 + purchasedh * .42);
            PU.fillText(_("BUY"), purchasedw * .345 + (purchasedw * .3 / 2) - (PU.measureText(_("BUY")).width / 2), purchasedh * .2 + purchasedh * .42);
            PU.fillText(_("BUY"), purchasedw * .65 + (purchasedw * .3 / 2) - (PU.measureText(_("BUY")).width / 2), purchasedh * .2 + purchasedh * .42);
            PU.drawImage(smallShopTicket, 0, 0, smallShopTicket.width, smallShopTicket.height, purchasedw * .45, purchasedh * .85, purchasedw * .09, purchasedh * .05);
            PU.fillStyle = "#FFF";
            PU.fillText("x" + tickets, purchasedw * .55, purchasedh * .89);
        }
    }
}