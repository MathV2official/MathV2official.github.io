(function() {
  'use strict';
  var View = Laya.View;
  var Scene = Laya.Scene;
  var REG = Laya.ClassUtils.regClass;
  var ui; (function(ui) {
      class AdUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(AdUI.uiView)
          }
      }
      AdUI.uiView = {
          "type": "View",
          "props": {
              "y": 0,
              "x": 0,
              "width": 750,
              "top": 0,
              "right": 0,
              "name": "adView",
              "left": 0,
              "height": 1334,
              "bottom": 0,
              "alpha": 1
          },
          "compId": 2,
          "child": [{
              "type": "Panel",
              "props": {
                  "var": "panel_bg",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.7
              },
              "compId": 29
          },
          {
              "type": "Box",
              "props": {
                  "var": "box_native",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "alpha": 1
              },
              "compId": 7,
              "child": [{
                  "type": "Image",
                  "props": {
                      "width": 660,
                      "var": "ad_bg",
                      "height": 340,
                      "centerY": -120,
                      "centerX": 0
                  },
                  "compId": 17,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "var": "img_ad_bg",
                          "top": 0,
                          "skin": "res/Ad/img_ad_box.png",
                          "sizeGrid": "15,15,15,15",
                          "right": 0,
                          "left": 0,
                          "bottom": 0
                      },
                      "compId": 18,
                      "child": [{
                          "type": "Image",
                          "props": {
                              "width": 640,
                              "var": "img_ad",
                              "top": 8.5,
                              "skin": "res/Ad/img_mask.png",
                              "left": 8.5,
                              "height": 320
                          },
                          "compId": 19
                      },
                      {
                          "type": "Button",
                          "props": {
                              "zOrder": 10,
                              "y": 30,
                              "x": 30,
                              "var": "btn_adx",
                              "stateNum": 1,
                              "skin": "res/Ad/btn_ad_close.png",
                              "anchorY": 0.5,
                              "anchorX": 0.5
                          },
                          "compId": 20
                      },
                      {
                          "type": "Box",
                          "props": {
                              "zOrder": 999999,
                              "y": 30,
                              "x": 30,
                              "width": 48,
                              "var": "btn_ad_close",
                              "styleSkin": "res/ad/btn_ad_close.png",
                              "stateNum": 1,
                              "scaleY": 1,
                              "scaleX": 1,
                              "mouseEnabled": true,
                              "height": 48,
                              "anchorY": 0.5,
                              "anchorX": 0.5
                          },
                          "compId": 27
                      },
                      {
                          "type": "Image",
                          "props": {
                              "y": 9,
                              "x": 599,
                              "skin": "res/Ad/img_ad_logo.png"
                          },
                          "compId": 21
                      },
                      {
                          "type": "Image",
                          "props": {
                              "width": 40,
                              "var": "img_ad_icon",
                              "skin": "res/Ad/img_mask.png",
                              "right": 11,
                              "height": 40,
                              "bottom": 11
                          },
                          "compId": 22
                      },
                      {
                          "type": "Label",
                          "props": {
                              "y": 19,
                              "width": 400,
                              "var": "lab_ad_title",
                              "valign": "middle",
                              "text": "广告详情",
                              "overflow": "scroll",
                              "height": 35,
                              "fontSize": 35,
                              "font": "Helvetica",
                              "centerX": 0,
                              "bold": true,
                              "align": "center"
                          },
                          "compId": 23
                      },
                      {
                          "type": "Label",
                          "props": {
                              "wordWrap": true,
                              "width": 550,
                              "var": "lab_ad_des",
                              "valign": "middle",
                              "text": "广告详情",
                              "overflow": "scroll",
                              "height": 39,
                              "fontSize": 35,
                              "font": "Helvetica",
                              "centerY": 138,
                              "centerX": 0,
                              "bold": true,
                              "align": "center"
                          },
                          "compId": 24
                      }]
                  }]
              },
              {
                  "type": "Button",
                  "props": {
                      "width": 333,
                      "var": "btn_ad",
                      "stateNum": 1,
                      "skin": "res/Ad/lu.png",
                      "scaleY": 0.75,
                      "scaleX": 0.75,
                      "pivotY": 64,
                      "pivotX": 167,
                      "labelStrokeColor": "#00b52e",
                      "labelStroke": 3,
                      "labelSize": 40,
                      "labelFont": "Microsoft YaHei",
                      "labelColors": "#ffffff",
                      "labelBold": true,
                      "label": "查看广告",
                      "height": 128,
                      "centerY": 184,
                      "centerX": 0
                  },
                  "compId": 25
              }]
          }],
          "animations": [{
              "nodes": [{
                  "target": 6,
                  "keyframes": {
                      "scaleY": [{
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 6,
                          "key": "scaleY",
                          "index": 0
                      },
                      {
                          "value": 0.8,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 6,
                          "key": "scaleY",
                          "index": 25
                      },
                      {
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 6,
                          "key": "scaleY",
                          "index": 30
                      }],
                      "scaleX": [{
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 6,
                          "key": "scaleX",
                          "index": 0
                      },
                      {
                          "value": 0.8,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 6,
                          "key": "scaleX",
                          "index": 25
                      },
                      {
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 6,
                          "key": "scaleX",
                          "index": 30
                      }]
                  }
              }],
              "name": "ani1",
              "id": 1,
              "frameRate": 24,
              "action": 2
          },
          {
              "nodes": [{
                  "target": 5,
                  "keyframes": {
                      "scaleY": [{
                          "value": 0.8,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "scaleY",
                          "index": 0
                      },
                      {
                          "value": 0.7,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "scaleY",
                          "index": 20
                      },
                      {
                          "value": 0.8,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "scaleY",
                          "index": 40
                      }],
                      "scaleX": [{
                          "value": 0.8,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "scaleX",
                          "index": 0
                      },
                      {
                          "value": 0.7,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "scaleX",
                          "index": 20
                      },
                      {
                          "value": 0.8,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "scaleX",
                          "index": 40
                      }]
                  }
              }],
              "name": "checkBtnani",
              "id": 2,
              "frameRate": 24,
              "action": 0
          }],
          "loadList": ["res/Ad/img_ad_box.png", "res/Ad/img_mask.png", "res/Ad/btn_ad_close.png", "res/ad/btn_ad_close.png", "res/Ad/img_ad_logo.png", "res/Ad/lu.png"],
          "loadList3D": []
      };
      ui.AdUI = AdUI;
      REG("ui.AdUI", AdUI);
      class BattleViewUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(BattleViewUI.uiView)
          }
      }
      BattleViewUI.uiView = {
          "type": "View",
          "props": {
              "width": 750,
              "height": 1334
          },
          "compId": 2,
          "child": [{
              "type": "Image",
              "props": {
                  "y": 750,
                  "x": 375,
                  "var": "background",
                  "skin": "res/battle/img_joystick_back.png",
                  "anchorY": 0.5,
                  "anchorX": 0.5,
                  "alpha": 0.5
              },
              "compId": 11
          },
          {
              "type": "Image",
              "props": {
                  "y": 750,
                  "x": 375,
                  "var": "forground",
                  "skin": "res/battle/img_joystick_knob.png",
                  "anchorY": 0.5,
                  "anchorX": 0.5,
                  "alpha": 0.5
              },
              "compId": 12
          },
          {
              "type": "Box",
              "props": {
                  "zOrder": 99999999,
                  "y": 0,
                  "x": 0,
                  "var": "box_scene3D",
                  "top": 0,
                  "right": 0,
                  "mouseThrough": true,
                  "left": 0,
                  "bottom": 0
              },
              "compId": 28
          },
          {
              "type": "Button",
              "props": {
                  "y": 0,
                  "x": 0,
                  "var": "btnView",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0
              },
              "compId": 13
          },
          {
              "type": "Box",
              "props": {
                  "width": 440,
                  "var": "boxHand",
                  "height": 239,
                  "centerX": 4,
                  "bottom": 264
              },
              "compId": 3,
              "child": [{
                  "type": "Image",
                  "props": {
                      "var": "img_guide",
                      "skin": "res/battle/img_guide.png"
                  },
                  "compId": 4
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 89,
                      "x": 202,
                      "var": "img_hand",
                      "skin": "res/battle/img_hand.png"
                  },
                  "compId": 5
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 0,
                  "x": 0,
                  "width": 195,
                  "var": "boxGold",
                  "top": 30,
                  "left": 30,
                  "height": 59
              },
              "compId": 14,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 8,
                      "x": 23,
                      "skin": "res/common/img_gold_bg.png"
                  },
                  "compId": 16
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 0,
                      "x": 0,
                      "skin": "res/common/img_gold_ico.png"
                  },
                  "compId": 17
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 14,
                      "x": 42,
                      "width": 144,
                      "var": "txt_gold",
                      "valign": "middle",
                      "text": "1000",
                      "strokeColor": "#000000",
                      "stroke": 1,
                      "height": 36,
                      "fontSize": 30,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 18
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 180,
                  "x": 525,
                  "width": 195,
                  "var": "boxMoney",
                  "top": 30,
                  "right": 30,
                  "height": 59
              },
              "compId": 15,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 8,
                      "skin": "res/common/img_gold_bg.png"
                  },
                  "compId": 19
              },
              {
                  "type": "Image",
                  "props": {
                      "y": -6,
                      "x": 120,
                      "skin": "res/common/img_money_ico.png",
                      "scaleY": 0.5,
                      "scaleX": 0.5
                  },
                  "compId": 20
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 14,
                      "x": 0,
                      "width": 144,
                      "var": "txt_money",
                      "valign": "middle",
                      "text": "1000",
                      "strokeColor": "#000000",
                      "stroke": 1,
                      "height": 36,
                      "fontSize": 30,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 21
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 762,
                  "x": 690,
                  "width": 100,
                  "var": "boxTip",
                  "height": 100,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 22,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 50,
                      "x": 50,
                      "var": "img_tip",
                      "skin": "res/battle/img_tip_open.png",
                      "rotation": 0,
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 25
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 50,
                      "x": 50,
                      "skin": "res/battle/img_tip_himmer.png",
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 24
              }]
          },
          {
              "type": "Button",
              "props": {
                  "y": 10,
                  "x": 10,
                  "var": "btnShop",
                  "stateNum": 1,
                  "skin": "res/battle/btn_shop.png",
                  "right": 30,
                  "centerY": 60
              },
              "compId": 26
          },
          {
              "type": "Image",
              "props": {
                  "y": 485,
                  "x": 628.5,
                  "var": "AddGoldBtn",
                  "skin": "res/Ad/Main_0012_purple_button.png",
                  "right": 35,
                  "centerY": -100
              },
              "compId": 29,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 44,
                      "x": 44,
                      "skin": "res/common/img_gold_ico.png",
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 30
              }]
          },
          {
              "type": "Button",
              "props": {
                  "y": 372,
                  "width": 142,
                  "var": "btn_skin",
                  "stateNum": 1,
                  "scaleY": 1.3,
                  "scaleX": 1.3,
                  "left": 556,
                  "height": 136,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 34,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 68,
                      "x": 70,
                      "width": 128,
                      "visible": true,
                      "skin": "res/Ad/light.png",
                      "height": 128,
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 35
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 68,
                      "x": 80,
                      "var": "img_skin_try",
                      "skin": "res/shop/skin_0.png",
                      "scaleY": 0.6,
                      "scaleX": 0.6,
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 36
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 108,
                      "x": 31,
                      "visible": true,
                      "text": "Try It",
                      "strokeColor": "#000000",
                      "stroke": 1,
                      "fontSize": 20,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "runtime": "Laya.Text"
                  },
                  "compId": 37
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 9.5,
                      "x": 97,
                      "visible": true,
                      "skin": "res/common/img_video_ico.png",
                      "scaleY": 0.5,
                      "scaleX": 0.5,
                      "alpha": 0.6
                  },
                  "compId": 38
              }]
          },
          {
              "type": "Image",
              "props": {
                  "y": 961,
                  "x": 114,
                  "var": "timeBox",
                  "skin": "res/common/img_gold_bg.png"
              },
              "compId": 44,
              "child": [{
                  "type": "Label",
                  "props": {
                      "x": 90,
                      "var": "timeLable",
                      "text": "00:00",
                      "stroke": 2,
                      "fontSize": 25,
                      "color": "#ffffff",
                      "centerY": 0
                  },
                  "compId": 45
              }]
          },
          {
              "type": "Image",
              "props": {
                  "y": 921,
                  "var": "bagBtn",
                  "skin": "res/Ad/btn_doubleMoney2.png",
                  "scaleY": 1.5,
                  "scaleX": 1.5,
                  "right": 550
              },
              "compId": 39,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": -20,
                      "x": 110,
                      "skin": "res/Ad/img_arrow.png"
                  },
                  "compId": 40
              },
              {
                  "type": "Label",
                  "props": {
                      "y": 12,
                      "text": "Speed +30%",
                      "stroke": 2,
                      "fontSize": 20,
                      "color": "#ffffff",
                      "centerX": 0
                  },
                  "compId": 41
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 48,
                      "x": 14,
                      "skin": "res/common/img_video_ico.png",
                      "scaleY": 0.4,
                      "scaleX": 0.4,
                      "alpha": 0.6
                  },
                  "compId": 42
              },
              {
                  "type": "Label",
                  "props": {
                      "y": 48,
                      "x": 40,
                      "text": "3 minutes",
                      "stroke": 2,
                      "fontSize": 15,
                      "color": "#ffffff"
                  },
                  "compId": 43
              }]
          },
          {
              "type": "Image",
              "props": {
                  "y": 0,
                  "x": 0,
                  "width": 750,
                  "visible": false,
                  "var": "ad_bg",
                  "height": 240,
                  "centerX": 0,
                  "bottom": 0,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 47,
              "child": [{
                  "type": "Image",
                  "props": {
                      "var": "img_ad_bg",
                      "top": 0,
                      "skin": "res/Ad/img_ad_box.png",
                      "sizeGrid": "15,15,15,15",
                      "right": 0,
                      "left": 0,
                      "bottom": 0
                  },
                  "compId": 48,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "y": 43,
                          "x": 10,
                          "width": 300,
                          "var": "img_ad",
                          "skin": "res/Ad/img_mask.png",
                          "height": 150
                      },
                      "compId": 49
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 24,
                          "x": 24,
                          "var": "btn_ad_close",
                          "stateNum": 1,
                          "skin": "res/Ad/btn_ad_close.png",
                          "scaleY": 0.8,
                          "scaleX": 0.8,
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 50
                  },
                  {
                      "type": "Button",
                      "props": {
                          "x": 632,
                          "width": 164,
                          "var": "btn_ad",
                          "stateNum": 1,
                          "skin": "res/Ad/btn_green.png",
                          "labelStrokeColor": "#fbfbfb",
                          "labelStroke": 2,
                          "labelSize": 20,
                          "labelFont": "Microsoft YaHei",
                          "labelColors": "#fffff",
                          "labelBold": true,
                          "label": "查看广告",
                          "height": 79.5,
                          "centerY": 0,
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 51
                  },
                  {
                      "type": "Label",
                      "props": {
                          "y": 6,
                          "x": 352,
                          "width": 200,
                          "var": "lab_ad_title",
                          "valign": "middle",
                          "text": "广告详情",
                          "overflow": "hidden",
                          "fontSize": 35,
                          "font": "Helvetica",
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 52
                  },
                  {
                      "type": "Label",
                      "props": {
                          "y": 53.5,
                          "x": 321,
                          "wordWrap": true,
                          "width": 210,
                          "var": "lab_ad_des",
                          "valign": "middle",
                          "text": "广告详情",
                          "overflow": "scroll",
                          "height": 139,
                          "fontSize": 30,
                          "font": "Helvetica",
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 53
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 210,
                          "x": 700,
                          "skin": "res/Ad/img_ad_logo.png"
                      },
                      "compId": 54
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 0,
                          "x": 710,
                          "width": 40,
                          "var": "img_ad_icon",
                          "skin": "res/Ad/img_mask.png",
                          "height": 40
                      },
                      "compId": 55
                  }]
              }]
          },
          {
              "type": "Button",
              "props": {
                  "var": "btnTask",
                  "stateNum": 1,
                  "skin": "res/battle/btn_task.png",
                  "left": 45,
                  "top": 430
                //   "centerY": -152
              },
              "compId": 56,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": -10,
                      "x": 78,
                      "var": "img_task_red",
                      "skin": ""
                  },
                  "compId": 62
              }]
          },
          {
              "type": "Box",
              "props": {
                  "width": 149,
                  "var": "boxCar",
                  "left": 30,
                  "height": 151,
                  "top": 580
                //   "centerY": 0
              },
              "compId": 57,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 75,
                      "x": 74,
                      "skin": "res/battle/btn_car_eff.png",
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 63
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 10,
                      "x": 10,
                      "skin": "res/battle/btn_car.png",
                      "scaleY": 0.7,
                      "scaleX": 0.7
                  },
                  "compId": 64
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 119,
                      "x": 0,
                      "width": 149,
                      "var": "txt_car",
                      "valign": "middle",
                      "text": "Try it",
                      "strokeColor": "#000000",
                      "stroke": 2,
                      "height": 31,
                      "fontSize": 28,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 65
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 5,
                      "x": 80.5,
                      "skin": "res/common/img_video_ico.png",
                      "scaleY": 0.8,
                      "scaleX": 0.8,
                      "alpha": 0.5
                  },
                  "compId": 66
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 4,
                      "x": 0,
                      "width": 136,
                      "visible": false,
                      "var": "txt_car_time",
                      "valign": "middle",
                      "text": "00:00",
                      "strokeColor": "#000000",
                      "stroke": 2,
                      "height": 31,
                      "fontSize": 28,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 67
              }]
          },
          {
              "type": "Button",
              "props": {
                  "var": "btnIndustry",
                  "stateNum": 1,
                  "skin": "res/battle/btn_industry.png",
                  "left": 30,
                  "top": 280
                //   "centerY": -304
              },
              "compId": 58,
              "child": [{
                  "type": "Text",
                  "props": {
                      "y": 0,
                      "x": 0,
                      "width": 136,
                      "var": "txt_industry_time",
                      "valign": "middle",
                      "text": "00:00",
                      "strokeColor": "#000000",
                      "stroke": 2,
                      "height": 31,
                      "fontSize": 28,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 68
              }]
          },
          {
              "type": "Button",
              "props": {
                  "var": "btnUpgrade",
                  "stateNum": 1,
                  "skin": "res/battle/btn_upgrade.png",
                  "right": 591,
                  "top": 130
                //   "centerY": -457
              },
              "compId": 59
          },
          {
              "type": "Image",
              "props": {
                  "y": 572,
                  "x": -179,
                  "var": "godbox",
                  "skin": "res/Investment/tc54.png"
              },
              "compId": 60
          },
          {
              "type": "Box",
              "props": {
                  "width": 539,
                  "visible": false,
                  "var": "angleBox",
                  "height": 470,
                  "centerY": -5,
                  "centerX": 4
              },
              "compId": 61,
              "child": [{
                  "type": "Image",
                  "props": {
                      "skin": "res/Investment/zhu14.png"
                  },
                  "compId": 69
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 358,
                      "var": "angleBtn",
                      "skin": "res/Investment/zhu15.png",
                      "centerX": 0
                  },
                  "compId": 70
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 10,
                      "x": 467,
                      "var": "angleClose",
                      "skin": "res/Investment/zhu16.png"
                  },
                  "compId": 71
              },
              {
                  "type": "Label",
                  "props": {
                      "y": 235,
                      "var": "AngleLable",
                      "text": "+50",
                      "stroke": 2,
                      "fontSize": 45,
                      "color": "#ffffff",
                      "centerX": 0
                  },
                  "compId": 72
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 0,
                  "x": 0,
                  "visible": false,
                  "var": "mask1",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.8
              },
              "compId": 73
          }],
          "animations": [{
              "nodes": [{
                  "target": 5,
                  "keyframes": {
                      "y": [{
                          "value": 89,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 0
                      },
                      {
                          "value": 0,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 10
                      },
                      {
                          "value": 89,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 20
                      },
                      {
                          "value": 168.5,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 30
                      },
                      {
                          "value": 87,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 40
                      },
                      {
                          "value": 0,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 50
                      },
                      {
                          "value": 86,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 60
                      },
                      {
                          "value": 168.5,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 70
                      },
                      {
                          "value": 89,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "y",
                          "index": 80
                      }],
                      "x": [{
                          "value": 202,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 0
                      },
                      {
                          "value": 307,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 10
                      },
                      {
                          "value": 379,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 20
                      },
                      {
                          "value": 316,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 30
                      },
                      {
                          "value": 209,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 40
                      },
                      {
                          "value": 99,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 50
                      },
                      {
                          "value": 28,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 60
                      },
                      {
                          "value": 102,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 70
                      },
                      {
                          "value": 202,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 80
                      }]
                  }
              }],
              "name": "ani1",
              "id": 1,
              "frameRate": 24,
              "action": 2
          },
          {
              "nodes": [{
                  "target": 30,
                  "keyframes": {
                      "scaleY": [{
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleY",
                          "index": 0
                      },
                      {
                          "value": 0.2,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleY",
                          "index": 15
                      },
                      {
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleY",
                          "index": 20
                      },
                      {
                          "value": 0.2,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleY",
                          "index": 25
                      },
                      {
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleY",
                          "index": 30
                      }],
                      "scaleX": [{
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleX",
                          "index": 0
                      },
                      {
                          "value": 0.2,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleX",
                          "index": 5
                      },
                      {
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleX",
                          "index": 10
                      },
                      {
                          "value": 0.2,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleX",
                          "index": 25
                      },
                      {
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 30,
                          "key": "scaleX",
                          "index": 30
                      }]
                  }
              }],
              "name": "ani2",
              "id": 2,
              "frameRate": 24,
              "action": 2
          },
          {
              "nodes": [{
                  "target": 33,
                  "keyframes": {
                      "rotation": [{
                          "value": 38,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 33,
                          "key": "rotation",
                          "index": 0
                      },
                      {
                          "value": 10,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 33,
                          "key": "rotation",
                          "index": 5
                      },
                      {
                          "value": -22,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 33,
                          "key": "rotation",
                          "index": 10
                      },
                      {
                          "value": 10,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 33,
                          "label": null,
                          "key": "rotation",
                          "index": 15
                      },
                      {
                          "value": 38,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 33,
                          "label": null,
                          "key": "rotation",
                          "index": 20
                      }]
                  }
              }],
              "name": "ani3",
              "id": 3,
              "frameRate": 24,
              "action": 2
          },
          {
              "nodes": [{
                  "target": 35,
                  "keyframes": {
                      "rotation": [{
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 35,
                          "key": "rotation",
                          "index": 0
                      },
                      {
                          "value": 180,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 35,
                          "key": "rotation",
                          "index": 5
                      },
                      {
                          "value": 361,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 35,
                          "key": "rotation",
                          "index": 10
                      }]
                  }
              }],
              "name": "ani4",
              "id": 4,
              "frameRate": 24,
              "action": 2
          },
          {
              "nodes": [{
                  "target": 40,
                  "keyframes": {
                      "y": [{
                          "value": -19,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 40,
                          "key": "y",
                          "index": 0
                      },
                      {
                          "value": -40,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 40,
                          "key": "y",
                          "index": 10
                      },
                      {
                          "value": -19,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 40,
                          "key": "y",
                          "index": 20
                      }]
                  }
              }],
              "name": "ani5",
              "id": 5,
              "frameRate": 24,
              "action": 2
          },
          {
              "nodes": [{
                  "target": 60,
                  "keyframes": {
                      "y": [{
                          "value": 572,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "y",
                          "index": 0
                      },
                      {
                          "value": 695,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "y",
                          "index": 30
                      },
                      {
                          "value": 549.5,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "y",
                          "index": 60
                      },
                      {
                          "value": 673,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "y",
                          "index": 90
                      },
                      {
                          "value": 549.5,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "y",
                          "index": 120
                      }],
                      "x": [{
                          "value": -177,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "x",
                          "index": 0
                      },
                      {
                          "value": 88.5,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "x",
                          "index": 30
                      },
                      {
                          "value": 297.5,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "x",
                          "index": 60
                      },
                      {
                          "value": 503,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "x",
                          "index": 90
                      },
                      {
                          "value": 760,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 60,
                          "key": "x",
                          "index": 120
                      }]
                  }
              }],
              "name": "ani6",
              "id": 6,
              "frameRate": 24,
              "action": 0
          },
          {
              "nodes": [{
                  "target": 63,
                  "keyframes": {
                      "rotation": [{
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 63,
                          "key": "rotation",
                          "index": 0
                      },
                      {
                          "value": 180,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 63,
                          "key": "rotation",
                          "index": 10
                      },
                      {
                          "value": 361,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 63,
                          "key": "rotation",
                          "index": 20
                      }]
                  }
              }],
              "name": "ani7",
              "id": 7,
              "frameRate": 24,
              "action": 2
          }],
          "loadList": ["res/battle/img_joystick_back.png", "res/battle/img_joystick_knob.png", "res/battle/img_guide.png", "res/battle/img_hand.png", "res/common/img_gold_bg.png", "res/common/img_gold_ico.png", "res/common/img_money_ico.png", "res/battle/img_tip_open.png", "res/battle/img_tip_himmer.png", "res/battle/btn_shop.png", "res/Ad/Main_0012_purple_button.png", "res/Ad/icon_hand.png", "res/Ad/light.png", "res/shop/skin_0.png", "res/common/img_video_ico.png", "res/Ad/btn_doubleMoney2.png", "res/Ad/img_arrow.png", "res/Ad/img_ad_box.png", "res/Ad/img_mask.png", "res/Ad/btn_ad_close.png", "res/Ad/btn_green.png", "res/Ad/img_ad_logo.png", "res/battle/btn_task.png", "res/battle/btn_car_eff.png", "res/battle/btn_car.png", "res/battle/btn_industry.png", "res/battle/btn_upgrade.png", "res/Investment/tc54.png", "res/Investment/zhu14.png", "res/Investment/zhu15.png", "res/Investment/zhu16.png"],
          "loadList3D": []
      };
      ui.BattleViewUI = BattleViewUI;
      REG("ui.BattleViewUI", BattleViewUI);
      class HomeViewUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(HomeViewUI.uiView)
          }
      }
      HomeViewUI.uiView = {
          "type": "View",
          "props": {
              "width": 750,
              "height": 1334
          },
          "compId": 2,
          "child": [{
              "type": "Box",
              "props": {
                  "width": 195,
                  "var": "boxGold",
                  "top": 30,
                  "left": 30,
                  "height": 59
              },
              "compId": 6,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 8,
                      "x": 23,
                      "skin": "res/common/img_gold_bg.png"
                  },
                  "compId": 7
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 0,
                      "x": 0,
                      "skin": "res/common/img_gold_ico.png"
                  },
                  "compId": 8
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 14,
                      "x": 42,
                      "width": 144,
                      "var": "txt_gold",
                      "valign": "middle",
                      "text": "1000",
                      "strokeColor": "#000000",
                      "stroke": 1,
                      "height": 36,
                      "fontSize": 30,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 9
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 180,
                  "x": 525,
                  "width": 195,
                  "var": "boxMoney",
                  "top": 30,
                  "right": 30,
                  "height": 59
              },
              "compId": 18,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 8,
                      "skin": "res/common/img_gold_bg.png"
                  },
                  "compId": 19
              },
              {
                  "type": "Image",
                  "props": {
                      "y": -6,
                      "x": 120,
                      "skin": "res/common/img_money_ico.png",
                      "scaleY": 0.5,
                      "scaleX": 0.5
                  },
                  "compId": 20
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 14,
                      "x": 0,
                      "width": 144,
                      "var": "txt_money",
                      "valign": "middle",
                      "text": "1000",
                      "strokeColor": "#000000",
                      "stroke": 1,
                      "height": 36,
                      "fontSize": 30,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 21
              }]
          },
          {
              "type": "Button",
              "props": {
                  "var": "btnBegin",
                  "stateNum": 1,
                  "skin": "res/home/btn_start.png",
                  "centerX": 0,
                  "bottom": 260,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 4
          },
          {
              "type": "Button",
              "props": {
                  "var": "btnShop",
                  "stateNum": 1,
                  "skin": "res/home/btn_shop.png",
                  "right": 30,
                  "centerY": 60
              },
              "compId": 5
          }],
          "loadList": ["res/common/img_gold_bg.png", "res/common/img_gold_ico.png", "res/common/img_money_ico.png", "res/home/btn_start.png", "res/home/btn_shop.png"],
          "loadList3D": []
      };
      ui.HomeViewUI = HomeViewUI;
      REG("ui.HomeViewUI", HomeViewUI);
      class InitSceneUI extends Scene {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.loadScene("InitScene")
          }
      }
      ui.InitSceneUI = InitSceneUI;
      REG("ui.InitSceneUI", InitSceneUI);
      class investmentUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(investmentUI.uiView)
          }
      }
      investmentUI.uiView = {
          "type": "View",
          "props": {
              "width": 750,
              "top": 0,
              "right": 0,
              "left": 0,
              "height": 1334,
              "bottom": 0
          },
          "compId": 2,
          "child": [{
              "type": "Panel",
              "props": {
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0
              },
              "compId": 69
          },
          {
              "type": "Box",
              "props": {
                  "width": 669,
                  "scaleY": 1,
                  "scaleX": 1,
                  "centerY": -133,
                  "centerX": 0,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 117,
              "child": [{
                  "type": "Image",
                  "props": {
                      "skin": "res/Investment/bgm.png",
                      "sizeGrid": "249,0,212,0",
                      "height": 900,
                      "centerY": 18,
                      "centerX": 0
                  },
                  "compId": 125,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "y": 166,
                          "x": 112,
                          "skin": "res/Investment/linght.png"
                      },
                      "compId": 193
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 53,
                          "x": 154.5,
                          "visible": false
                      },
                      "compId": 192
                  },
                  {
                      "type": "Image",
                      "props": {
                          "x": 310,
                          "var": "img_staff",
                          "skin": "res/common/img_gold_ico.png",
                          "sizeGrid": "125,0,212,0",
                          "scaleY": 3,
                          "scaleX": 3,
                          "centerY": -100,
                          "centerX": 0,
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 180
                  },
                  {
                      "type": "Label",
                      "props": {
                          "var": "lab_reward",
                          "text": "22 Coin",
                          "stroke": 2,
                          "fontSize": 55,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "centerY": 121,
                          "centerX": 0,
                          "bold": true,
                          "align": "left"
                      },
                      "compId": 134
                  },
                  {
                      "type": "Button",
                      "props": {
                          "var": "btn_video",
                          "stateNum": 1,
                          "skin": "res/Box/btn_yellow.png",
                          "scaleY": 0.85,
                          "scaleX": 0.85,
                          "centerX": 4,
                          "bottom": 170
                      },
                      "compId": 143,
                      "child": [{
                          "type": "Image",
                          "props": {
                              "x": 47,
                              "var": "btn0_icon",
                              "skin": "res/common/img_video_ico.png",
                              "scaleY": 1,
                              "scaleX": 1,
                              "centerY": 0,
                              "alpha": 0.6
                          },
                          "compId": 144
                      },
                      {
                          "type": "Label",
                          "props": {
                              "var": "btn0_lable",
                              "text": "Get Coin",
                              "stroke": 2,
                              "fontSize": 40,
                              "font": "Microsoft YaHei",
                              "color": "#ffffff",
                              "centerY": 0,
                              "centerX": 33,
                              "bold": true
                          },
                          "compId": 145
                      }]
                  },
                  {
                      "type": "Label",
                      "props": {
                          "y": 41,
                          "x": 178,
                          "text": "Get Coin",
                          "stroke": 2,
                          "fontSize": 65,
                          "color": "#ffffff",
                          "centerX": 0,
                          "bold": true
                      },
                      "compId": 194
                  },
                  {
                      "type": "Button",
                      "props": {
                          "var": "btn_ad1",
                          "stateNum": 1,
                          "skin": "res/Ad/btn_green.png",
                          "scaleY": 0.85,
                          "scaleX": 0.85,
                          "centerY": 349,
                          "centerX": 0,
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 196,
                      "child": [{
                          "type": "Label",
                          "props": {
                              "text": "查看广告",
                              "strokeColor": "#fdf060",
                              "stroke": 2,
                              "fontSize": 45,
                              "font": "Microsoft YaHei",
                              "color": "#ffffff",
                              "centerY": 0,
                              "centerX": 0,
                              "bold": true,
                              "anchorY": 0.5,
                              "anchorX": 0.5
                          },
                          "compId": 205
                      }]
                  }]
              }]
          },
          {
              "type": "Image",
              "props": {
                  "y": 0,
                  "x": 0,
                  "width": 660,
                  "var": "ad_bg1",
                  "scaleY": 0.9,
                  "scaleX": 0.9,
                  "height": 340,
                  "centerX": 0,
                  "bottom": 53
              },
              "compId": 195,
              "child": [{
                  "type": "Image",
                  "props": {
                      "var": "img_ad_bg1",
                      "top": 0,
                      "skin": "res/Ad/img_ad_box.png",
                      "sizeGrid": "15,15,15,15",
                      "right": 0,
                      "left": 0,
                      "bottom": 0
                  },
                  "compId": 197,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "width": 640,
                          "var": "img_ad1",
                          "top": 8.5,
                          "skin": "res/Ad/img_mask.png",
                          "left": 8.5,
                          "height": 320
                      },
                      "compId": 198
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 0,
                          "x": 599,
                          "skin": "res/Ad/img_ad_logo.png"
                      },
                      "compId": 199
                  },
                  {
                      "type": "Image",
                      "props": {
                          "width": 40,
                          "var": "img_ad_icon1",
                          "skin": "res/Ad/img_mask.png",
                          "right": 11,
                          "height": 49,
                          "bottom": 11
                      },
                      "compId": 200
                  },
                  {
                      "type": "Label",
                      "props": {
                          "y": 19,
                          "width": 400,
                          "var": "lab_ad_title1",
                          "valign": "middle",
                          "text": "广告详情",
                          "overflow": "scroll",
                          "height": 35,
                          "fontSize": 35,
                          "font": "Helvetica",
                          "centerX": 0,
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 201
                  },
                  {
                      "type": "Label",
                      "props": {
                          "wordWrap": true,
                          "width": 550,
                          "visible": false,
                          "var": "lab_ad_des1",
                          "valign": "middle",
                          "text": "广告详情",
                          "height": 39,
                          "fontSize": 35,
                          "font": "Helvetica",
                          "centerY": 138,
                          "centerX": 0,
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 202
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 38,
                          "x": 54,
                          "var": "btn_ad_close2",
                          "stateNum": 1,
                          "skin": "res/Ad/btn_ad_close.png",
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 203
                  },
                  {
                      "type": "Box",
                      "props": {
                          "y": 38,
                          "x": 54,
                          "width": 48,
                          "var": "btn_ad_close1",
                          "scaleY": 1,
                          "scaleX": 1,
                          "height": 48,
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 204
                  }]
              }]
          },
          {
              "type": "Button",
              "props": {
                  "x": 267,
                  "width": 242,
                  "var": "box_get",
                  "stateNum": 1,
                  "scaleY": 0.85,
                  "scaleX": 0.85,
                  "height": 61,
                  "centerX": -5,
                  "bottom": 250
              },
              "compId": 177,
              "child": [{
                  "type": "Label",
                  "props": {
                      "var": "btn1_lable",
                      "text": "No,thanks",
                      "stroke": 2,
                      "fontSize": 33,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "centerY": 0,
                      "centerX": 0,
                      "bold": true
                  },
                  "compId": 179
              }]
          },
          {
              "type": "Box",
              "props": {
                  "visible": false,
                  "var": "mask1",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.8
              },
              "compId": 206
          }],
          "loadList": ["res/Investment/bgm.png", "res/Investment/linght.png", "res/common/img_gold_ico.png", "res/Box/btn_yellow.png", "res/common/img_video_ico.png", "res/Ad/btn_green.png", "res/Ad/img_ad_box.png", "res/Ad/img_mask.png", "res/Ad/img_ad_logo.png", "res/Ad/btn_ad_close.png"],
          "loadList3D": []
      };
      ui.investmentUI = investmentUI;
      REG("ui.investmentUI", investmentUI);
      class LoadingViewUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(LoadingViewUI.uiView)
          }
      }
      LoadingViewUI.uiView = {
          "type": "View",
          "props": {
              "y": 0,
              "x": 0,
              "width": 750,
              "height": 1334
          },
          "compId": 2,
          "child": [{
              "type": "Image",
              "props": {
                  "visible": true,
                  "var": "img_bg",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0
              },
              "compId": 3
          },
          {
              "type": "Image",
              "props": {
                  "width": 539,
                  "var": "img_pro_bg",
                  "centerX": 0,
                  "bottom": 480
              },
              "compId": 5,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 5,
                      "x": 5,
                      "width": 528,
                      "var": "img_pro",
                      "height": 34
                  },
                  "compId": 6
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 56,
                      "var": "img_pro_txt"
                  },
                  "compId": 7
              }]
          },
          {
              "type": "Image",
              "props": {
                  "var": "img_logo",
                  "centerY": -360,
                  "centerX": 0
              },
              "compId": 8
          },
          {
              "type": "Image",
              "props": {
                  "y": 881,
                  "x": 645,
                  "skin": ""
              },
              "compId": 9
          },
          {
              "type": "Image",
              "props": {
                  "x": 179,
                  "var": "health",
                  "skin": "",
                  "bottom": 722
              },
              "compId": 10,
              "child": [{
                  "type": "Box",
                  "props": {
                      "var": "boxzqr"
                  },
                  "compId": 13,
                  "child": [{
                      "type": "Label",
                      "props": {
                          "y": 225,
                          "x": -14,
                          "text": "",
                          "stroke": 2,
                          "fontSize": 20,
                          "color": "#ffffff",
                          "centerX": 0
                      },
                      "compId": 11
                  },
                  {
                      "type": "Label",
                      "props": {
                          "y": 254,
                          "x": 81,
                          "text": "",
                          "stroke": 2,
                          "fontSize": 20,
                          "color": "#ffffff",
                          "centerX": 0
                      },
                      "compId": 12
                  }]
              }]
          }],
          "animations": [{
              "nodes": [],
              "name": "ani1",
              "id": 1,
              "frameRate": 24,
              "action": 0
          },
          {
              "nodes": [{
                  "target": 8,
                  "keyframes": {
                      "alpha": [{
                          "value": 0,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 8,
                          "key": "alpha",
                          "index": 0
                      },
                      {
                          "value": 1,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 8,
                          "key": "alpha",
                          "index": 24
                      }]
                  }
              }],
              "name": "ani2",
              "id": 2,
              "frameRate": 24,
              "action": 1
          }],
          "loadList": [],
          "loadList3D": []
      };
      ui.LoadingViewUI = LoadingViewUI;
      REG("ui.LoadingViewUI", LoadingViewUI);
      class ShopItemUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(ShopItemUI.uiView)
          }
      }
      ShopItemUI.uiView = {
          "type": "View",
          "props": {
              "width": 189,
              "height": 189
          },
          "compId": 2,
          "child": [{
              "type": "Image",
              "props": {
                  "y": 94,
                  "x": 94,
                  "var": "imgBg",
                  "skin": "res/shop/img_item_bg.png",
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 3
          },
          {
              "type": "Image",
              "props": {
                  "y": 94,
                  "x": 94,
                  "var": "imgIcon",
                  "skin": "res/shop/skin_0.png",
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 4
          },
          {
              "type": "Image",
              "props": {
                  "y": 94,
                  "x": 94,
                  "var": "imgNo",
                  "skin": "res/shop/img_item_no.png",
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 5
          },
          {
              "type": "Image",
              "props": {
                  "y": 161,
                  "x": 94.5,
                  "width": 175,
                  "var": "imgCount",
                  "skin": "res/shop/img_item_bg2.png",
                  "height": 42,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 7,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 3.5,
                      "x": 37,
                      "skin": "res/common/img_video_ico.png"
                  },
                  "compId": 8
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 8.5,
                      "x": 86.5,
                      "var": "txt_video_count",
                      "valign": "middle",
                      "text": "1/3",
                      "fontSize": 32,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 9
              }]
          },
          {
              "type": "Image",
              "props": {
                  "y": 0,
                  "x": 0,
                  "var": "imgSelect",
                  "skin": "res/shop/img_select.png"
              },
              "compId": 6
          }],
          "loadList": ["res/shop/img_item_bg.png", "res/shop/skin_0.png", "res/shop/img_item_no.png", "res/shop/img_item_bg2.png", "res/common/img_video_ico.png", "res/shop/img_select.png"],
          "loadList3D": []
      };
      ui.ShopItemUI = ShopItemUI;
      REG("ui.ShopItemUI", ShopItemUI);
      class ShopViewUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(ShopViewUI.uiView)
          }
      }
      ShopViewUI.uiView = {
          "type": "View",
          "props": {
              "width": 750,
              "height": 1334
          },
          "compId": 2,
          "child": [{
              "type": "Panel",
              "props": {
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#0099e3"
              },
              "compId": 3
          },
          {
              "type": "Box",
              "props": {
                  "width": 475,
                  "var": "boxRole",
                  "top": 180,
                  "height": 475,
                  "centerX": 0
              },
              "compId": 4,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 237,
                      "x": 237,
                      "skin": "res/shop/img_light.png",
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 5
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 237,
                      "x": 237,
                      "var": "unLockSpri"
                  },
                  "compId": 6
              }]
          },
          {
              "type": "Button",
              "props": {
                  "var": "btnBack",
                  "top": 140,
                  "stateNum": 1,
                  "skin": "res/shop/btn_back.png",
                  "left": 50
              },
              "compId": 13
          },
          {
              "type": "Box",
              "props": {
                  "width": 750,
                  "var": "boxList",
                  "height": 780,
                  "centerX": 0,
                  "bottom": 0
              },
              "compId": 14,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 0,
                      "x": 0,
                      "width": 750,
                      "var": "img_list_bg",
                      "skin": "res/shop/img_list_bg.png",
                      "height": 780
                  },
                  "compId": 15
              },
              {
                  "type": "Box",
                  "props": {
                      "width": 580,
                      "var": "boxTab",
                      "height": 146,
                      "centerX": 0,
                      "bottom": 0
                  },
                  "compId": 16,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "var": "img_tap_bg",
                          "skin": "res/shop/img_tap_bg.png"
                      },
                      "compId": 17
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 22.6,
                          "x": 66,
                          "var": "btnTab1",
                          "stateNum": 1,
                          "skin": "res/shop/img_tap1_1.png"
                      },
                      "compId": 18
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 22.5,
                          "x": 224,
                          "var": "btnTab2",
                          "stateNum": 1,
                          "skin": "res/shop/img_tap2_0.png"
                      },
                      "compId": 19
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 22.5,
                          "x": 424,
                          "var": "btnTab3",
                          "stateNum": 1,
                          "skin": "res/shop/img_tap3_0.png"
                      },
                      "compId": 20
                  }]
              },
              {
                  "type": "List",
                  "props": {
                      "y": 37,
                      "x": 40,
                      "width": 661,
                      "var": "list",
                      "spaceY": 15,
                      "spaceX": 40,
                      "repeatY": 3,
                      "repeatX": 3,
                      "height": 608
                  },
                  "compId": 21,
                  "child": [{
                      "type": "ShopItem",
                      "props": {
                          "renderType": "render",
                          "runtime": "ui.ShopItemUI"
                      },
                      "compId": 22
                  }]
              },
              {
                  "type": "Button",
                  "props": {
                      "y": 660,
                      "x": 98,
                      "width": 230,
                      "var": "btnRand",
                      "stateNum": 1,
                      "skin": "res/common/img_btn_yellow.png",
                      "height": 98
                  },
                  "compId": 23,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "y": 62,
                          "x": 53,
                          "skin": "res/common/img_gold_ico.png",
                          "scaleY": 0.5,
                          "scaleX": 0.5
                      },
                      "compId": 26
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 8,
                          "x": 30,
                          "width": 171,
                          "var": "txt_rand_text",
                          "valign": "middle",
                          "text": "Unlock",
                          "strokeColor": "#1b1b1b",
                          "stroke": 1,
                          "height": 57,
                          "fontSize": 36,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 27
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 64,
                          "x": 88,
                          "width": 114,
                          "var": "txt_rand_gold",
                          "valign": "bottom",
                          "text": "500",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 30,
                          "fontSize": 32,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "left",
                          "runtime": "Laya.Text"
                      },
                      "compId": 28
                  }]
              },
              {
                  "type": "Button",
                  "props": {
                      "y": 660,
                      "x": 408,
                      "width": 230,
                      "var": "btnVideo",
                      "stateNum": 1,
                      "skin": "res/common/img_btn_green.png",
                      "height": 98
                  },
                  "compId": 24,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "y": 63,
                          "x": 71,
                          "skin": "res/common/img_gold_ico.png",
                          "scaleY": 0.5,
                          "scaleX": 0.5
                      },
                      "compId": 29
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 26.5,
                          "x": 15,
                          "skin": "res/common/img_video_ico.png",
                          "alpha": 0.8
                      },
                      "compId": 30
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 8,
                          "x": 48,
                          "width": 171,
                          "valign": "middle",
                          "text": "Get Coin",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "name": "txt_video_text",
                          "height": 57,
                          "fontSize": 36,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 31
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 65,
                          "x": 106,
                          "width": 114,
                          "var": "txt_video_gold",
                          "valign": "middle",
                          "text": "100",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 30,
                          "fontSize": 32,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "left",
                          "runtime": "Laya.Text"
                      },
                      "compId": 32
                  }]
              },
              {
                  "type": "Button",
                  "props": {
                      "y": 660,
                      "x": 220,
                      "width": 280,
                      "var": "btnWall",
                      "stateNum": 1,
                      "skin": "res/common/img_btn_green.png",
                      "height": 98
                  },
                  "compId": 25,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "y": 30.5,
                          "x": 35,
                          "skin": "res/common/img_video_ico.png",
                          "alpha": 0.8
                      },
                      "compId": 33
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 21,
                          "x": 74,
                          "width": 171,
                          "valign": "middle",
                          "text": "Adv Unlock",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 57,
                          "fontSize": 36,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 34
                  }]
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 0,
                  "width": 195,
                  "var": "boxGold",
                  "top": 180,
                  "right": 30,
                  "height": 59
              },
              "compId": 35,
              "child": [{
                  "type": "Image",
                  "props": {
                      "y": 8,
                      "x": 23,
                      "skin": "res/common/img_gold_bg.png"
                  },
                  "compId": 36
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 0,
                      "x": 0,
                      "skin": "res/common/img_gold_ico.png"
                  },
                  "compId": 37
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 14,
                      "x": 42,
                      "width": 144,
                      "var": "txt_gold",
                      "valign": "middle",
                      "text": "1000",
                      "strokeColor": "#000000",
                      "stroke": 1,
                      "height": 36,
                      "fontSize": 30,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 38
              }]
          }],
          "animations": [{
              "nodes": [{
                  "target": 5,
                  "keyframes": {
                      "x": [{
                          "value": 237,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "x",
                          "index": 0
                      }],
                      "rotation": [{
                          "value": 0,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "rotation",
                          "index": 0
                      },
                      {
                          "value": 90,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "rotation",
                          "index": 20
                      },
                      {
                          "value": 180,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "rotation",
                          "index": 40
                      },
                      {
                          "value": 270,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "rotation",
                          "index": 60
                      },
                      {
                          "value": 360,
                          "tweenMethod": "linearNone",
                          "tween": true,
                          "target": 5,
                          "key": "rotation",
                          "index": 80
                      }]
                  }
              }],
              "name": "ani1",
              "id": 1,
              "frameRate": 24,
              "action": 2
          }],
          "loadList": ["res/shop/img_light.png", "res/shop/btn_back.png", "res/shop/img_list_bg.png", "res/shop/img_tap_bg.png", "res/shop/img_tap1_1.png", "res/shop/img_tap2_0.png", "res/shop/img_tap3_0.png", "res/common/img_btn_yellow.png", "res/common/img_gold_ico.png", "res/common/img_btn_green.png", "res/common/img_video_ico.png", "res/common/img_gold_bg.png"],
          "loadList3D": []
      };
      ui.ShopViewUI = ShopViewUI;
      REG("ui.ShopViewUI", ShopViewUI);
      class SureViewUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(SureViewUI.uiView)
          }
      }
      SureViewUI.uiView = {
          "type": "View",
          "props": {
              "width": 750,
              "height": 1334
          },
          "compId": 2,
          "child": [{
              "type": "Panel",
              "props": {
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.5
              },
              "compId": 3
          },
          {
              "type": "Button",
              "props": {
                  "y": 574,
                  "x": 68,
                  "var": "btnClose",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0
              },
              "compId": 16
          },
          {
              "type": "Box",
              "props": {
                  "width": 615,
                  "var": "boxSure",
                  "height": 476,
                  "centerY": 0,
                  "centerX": 0
              },
              "compId": 4,
              "child": [{
                  "type": "Image",
                  "props": {
                      "skin": "res/sure/img_sure_bg.png"
                  },
                  "compId": 5
              },
              {
                  "type": "Text",
                  "props": {
                      "y": 28,
                      "x": 90,
                      "width": 471,
                      "var": "txt_title",
                      "valign": "middle",
                      "text": "Revolution",
                      "strokeColor": "#000000",
                      "stroke": 2,
                      "height": 71,
                      "fontSize": 52,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "runtime": "Laya.Text"
                  },
                  "compId": 6
              },
              {
                  "type": "Label",
                  "props": {
                      "y": 89,
                      "x": 60,
                      "wordWrap": true,
                      "width": 533,
                      "var": "txt_desc",
                      "valign": "middle",
                      "text": "Factory speed & NPC speed X2,3 minutes",
                      "leading": 12,
                      "height": 141,
                      "fontSize": 32,
                      "font": "Arial",
                      "color": "#ffffff",
                      "align": "center"
                  },
                  "compId": 8
              },
              {
                  "type": "Button",
                  "props": {
                      "y": 353,
                      "x": 200,
                      "var": "btn_ad1",
                      "stateNum": 1,
                      "skin": "res/sure/img_sure_btn_green.png",
                      "scaleY": 0.8,
                      "scaleX": 0.8
                  },
                  "compId": 9,
                  "child": [{
                      "type": "Text",
                      "props": {
                          "y": 35.5,
                          "x": 95,
                          "text": "查看广告",
                          "fontSize": 32,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "runtime": "Laya.Text"
                      },
                      "compId": 10
                  }]
              },
              {
                  "type": "Button",
                  "props": {
                      "y": 238,
                      "x": 200,
                      "var": "btnSure",
                      "stateNum": 1,
                      "skin": "res/sure/img_sure_btn_yellow.png",
                      "scaleY": 0.8,
                      "scaleX": 0.8
                  },
                  "compId": 13,
                  "child": [{
                      "type": "Text",
                      "props": {
                          "y": 35.5,
                          "x": 95,
                          "text": "Use Now",
                          "fontSize": 32,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "runtime": "Laya.Text"
                      },
                      "compId": 14
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 37.5,
                          "x": 46,
                          "skin": "res/common/img_video_ico.png",
                          "scaleY": 0.8,
                          "scaleX": 0.8,
                          "alpha": 0.5
                      },
                      "compId": 15
                  }]
              }]
          },
          {
              "type": "Image",
              "props": {
                  "width": 660,
                  "var": "ad_bg1",
                  "scaleY": 0.9,
                  "scaleX": 0.9,
                  "height": 340,
                  "centerX": 1,
                  "bottom": 113
              },
              "compId": 17,
              "child": [{
                  "type": "Image",
                  "props": {
                      "var": "img_ad_bg1",
                      "top": 0,
                      "skin": "res/Ad/img_ad_box.png",
                      "sizeGrid": "15,15,15,15",
                      "right": 0,
                      "left": 0,
                      "bottom": 0
                  },
                  "compId": 20,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "width": 640,
                          "var": "img_ad1",
                          "top": 8.5,
                          "skin": "res/Ad/img_mask.png",
                          "left": 8.5,
                          "height": 320
                      },
                      "compId": 21
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 0,
                          "x": 599,
                          "skin": "res/Ad/img_ad_logo.png"
                      },
                      "compId": 22
                  },
                  {
                      "type": "Image",
                      "props": {
                          "width": 40,
                          "var": "img_ad_icon1",
                          "skin": "res/Ad/img_mask.png",
                          "right": 11,
                          "height": 49,
                          "bottom": 11
                      },
                      "compId": 23
                  },
                  {
                      "type": "Label",
                      "props": {
                          "y": 19,
                          "width": 400,
                          "var": "lab_ad_title1",
                          "valign": "middle",
                          "text": "广告详情",
                          "overflow": "scroll",
                          "height": 35,
                          "fontSize": 35,
                          "font": "Helvetica",
                          "centerX": 0,
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 24
                  },
                  {
                      "type": "Label",
                      "props": {
                          "wordWrap": true,
                          "width": 550,
                          "visible": false,
                          "var": "lab_ad_des1",
                          "valign": "middle",
                          "text": "广告详情",
                          "height": 39,
                          "fontSize": 35,
                          "font": "Helvetica",
                          "centerY": 138,
                          "centerX": 0,
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 25
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 38,
                          "x": 54,
                          "var": "btn_ad_close2",
                          "stateNum": 1,
                          "skin": "res/Ad/btn_ad_close.png",
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 26
                  },
                  {
                      "type": "Box",
                      "props": {
                          "y": 38,
                          "x": 54,
                          "width": 48,
                          "var": "btn_ad_close1",
                          "scaleY": 1,
                          "scaleX": 1,
                          "height": 48,
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 27
                  }]
              }]
          },
          {
              "type": "Button",
              "props": {
                  "width": 305,
                  "stateNum": 1,
                  "skin": "res/Ad/btn_green.png",
                  "scaleY": 0.8,
                  "scaleX": 0.8,
                  "height": 138,
                  "centerY": 315,
                  "centerX": -798,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 18,
              "child": [{
                  "type": "Label",
                  "props": {
                      "text": "查看广告",
                      "strokeColor": "#fdf060",
                      "stroke": 2,
                      "fontSize": 45,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "centerY": 0,
                      "centerX": 0,
                      "bold": true,
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 28
              }]
          },
          {
              "type": "Button",
              "props": {
                  "width": 198,
                  "var": "btnCancel",
                  "stateNum": 1,
                  "height": 42,
                  "centerX": 0,
                  "bottom": 480
              },
              "compId": 19,
              "child": [{
                  "type": "Label",
                  "props": {
                      "var": "lab_3",
                      "valign": "middle",
                      "text": "Cancel",
                      "stroke": 3,
                      "fontSize": 33,
                      "font": "SimHei",
                      "color": "#ffffff",
                      "centerY": -5,
                      "centerX": 0,
                      "bold": true,
                      "align": "center"
                  },
                  "compId": 29
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 0,
                      "x": 31,
                      "visible": false,
                      "var": "icon_3",
                      "scaleY": 0.4,
                      "scaleX": 0.4,
                      "centerY": -6
                  },
                  "compId": 30
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 0,
                  "x": 0,
                  "visible": false,
                  "var": "mask1",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.8
              },
              "compId": 45
          }],
          "loadList": ["res/sure/img_sure_bg.png", "res/sure/img_sure_btn_green.png", "res/sure/img_sure_btn_yellow.png", "res/common/img_video_ico.png", "res/Ad/img_ad_box.png", "res/Ad/img_mask.png", "res/Ad/img_ad_logo.png", "res/Ad/btn_ad_close.png", "res/Ad/btn_green.png"],
          "loadList3D": []
      };
      ui.SureViewUI = SureViewUI;
      REG("ui.SureViewUI", SureViewUI);
      class TaskViewUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(TaskViewUI.uiView)
          }
      }
      TaskViewUI.uiView = {
          "type": "View",
          "props": {
              "width": 750,
              "height": 1334
          },
          "compId": 2,
          "child": [{
              "type": "Panel",
              "props": {
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.5
              },
              "compId": 3
          },
          {
              "type": "Box",
              "props": {
                  "width": 621,
                  "var": "boxTask",
                  "height": 786,
                  "centerY": -50,
                  "centerX": 13
              },
              "compId": 4,
              "child": [{
                  "type": "Image",
                  "props": {
                      "var": "img_bg",
                      "skin": "res/task/img_task_bg.png"
                  },
                  "compId": 5
              },
              {
                  "type": "Button",
                  "props": {
                      "y": 78.5,
                      "x": 1029,
                      "stateNum": 1,
                      "skin": "res/task/img_task_close.png"
                  },
                  "compId": 6
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 29,
                      "x": 142,
                      "skin": "res/task/img_task_title.png"
                  },
                  "compId": 7
              },
              {
                  "type": "Box",
                  "props": {
                      "y": 160,
                      "x": 26.5,
                      "width": 568,
                      "var": "boxTask0",
                      "height": 173
                  },
                  "compId": 8,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "skin": "res/task/img_task_item.png"
                      },
                      "compId": 9
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 24.5,
                          "x": 401,
                          "var": "btnTask0",
                          "stateNum": 1,
                          "skin": "res/task/img_task_btn.png"
                      },
                      "compId": 10,
                      "child": [{
                          "type": "Text",
                          "props": {
                              "y": 5,
                              "x": 0,
                              "width": 141,
                              "var": "txt_btn_task0",
                              "valign": "middle",
                              "text": "Get",
                              "strokeColor": "#000000",
                              "stroke": 1,
                              "height": 48,
                              "fontSize": 28,
                              "font": "Microsoft YaHei",
                              "color": "#ffffff",
                              "bold": true,
                              "align": "center",
                              "runtime": "Laya.Text"
                          },
                          "compId": 11
                      }]
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 124,
                          "x": 425,
                          "width": 139,
                          "var": "txt_gold_0",
                          "valign": "middle",
                          "text": "1000",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 32,
                          "fontSize": 28,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 13
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 70,
                          "x": 62,
                          "width": 310,
                          "var": "txt_task_0",
                          "valign": "middle",
                          "text": "carry 0/100 bulb",
                          "height": 45,
                          "fontSize": 28,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "align": "left",
                          "runtime": "Laya.Text"
                      },
                      "compId": 15
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 22.5,
                          "x": 24,
                          "width": 136,
                          "text": "Task 1:",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 39,
                          "fontSize": 36,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "runtime": "Laya.Text"
                      },
                      "compId": 18
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 107,
                          "x": 387,
                          "skin": "res/common/img_gold_ico.png"
                      },
                      "compId": 40
                  }]
              },
              {
                  "type": "Box",
                  "props": {
                      "y": 370,
                      "x": 26,
                      "width": 568,
                      "var": "boxTask1",
                      "height": 173
                  },
                  "compId": 26,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "skin": "res/task/img_task_item.png"
                      },
                      "compId": 27
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 24.5,
                          "x": 401,
                          "var": "btnTask1",
                          "stateNum": 1,
                          "skin": "res/task/img_task_btn.png"
                      },
                      "compId": 28,
                      "child": [{
                          "type": "Text",
                          "props": {
                              "y": 5,
                              "x": 0,
                              "width": 141,
                              "var": "txt_btn_task1",
                              "valign": "middle",
                              "text": "Get",
                              "strokeColor": "#000000",
                              "stroke": 1,
                              "height": 48,
                              "fontSize": 28,
                              "font": "Microsoft YaHei",
                              "color": "#ffffff",
                              "bold": true,
                              "align": "center",
                              "runtime": "Laya.Text"
                          },
                          "compId": 29
                      }]
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 124,
                          "x": 425,
                          "width": 139,
                          "var": "txt_gold_1",
                          "valign": "middle",
                          "text": "1000",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 32,
                          "fontSize": 28,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 30
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 70,
                          "x": 62,
                          "width": 310,
                          "var": "txt_task_1",
                          "valign": "middle",
                          "text": "亲自搬运0/100个灯泡",
                          "height": 45,
                          "fontSize": 28,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "align": "left",
                          "runtime": "Laya.Text"
                      },
                      "compId": 31
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 22.5,
                          "x": 24,
                          "width": 136,
                          "text": "Task 2:",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 39,
                          "fontSize": 36,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "runtime": "Laya.Text"
                      },
                      "compId": 32
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 107,
                          "x": 387,
                          "skin": "res/common/img_gold_ico.png"
                      },
                      "compId": 41
                  }]
              },
              {
                  "type": "Box",
                  "props": {
                      "y": 580,
                      "x": 26,
                      "width": 568,
                      "var": "boxTask2",
                      "height": 173
                  },
                  "compId": 33,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "skin": "res/task/img_task_item.png"
                      },
                      "compId": 34
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 24.5,
                          "x": 401,
                          "var": "btnTask2",
                          "stateNum": 1,
                          "skin": "res/task/img_task_btn.png"
                      },
                      "compId": 35,
                      "child": [{
                          "type": "Text",
                          "props": {
                              "y": 5,
                              "x": 0,
                              "width": 141,
                              "var": "txt_btn_task2",
                              "valign": "middle",
                              "text": "Get",
                              "strokeColor": "#000000",
                              "stroke": 1,
                              "height": 48,
                              "fontSize": 28,
                              "font": "Microsoft YaHei",
                              "color": "#ffffff",
                              "bold": true,
                              "align": "center",
                              "runtime": "Laya.Text"
                          },
                          "compId": 36
                      }]
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 124,
                          "x": 425,
                          "width": 139,
                          "var": "txt_gold_2",
                          "valign": "middle",
                          "text": "1000",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 32,
                          "fontSize": 28,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 37
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 70,
                          "x": 62,
                          "width": 310,
                          "var": "txt_task_2",
                          "valign": "middle",
                          "text": "亲自搬运0/100个灯泡",
                          "height": 45,
                          "fontSize": 28,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "align": "left",
                          "runtime": "Laya.Text"
                      },
                      "compId": 38
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 22.5,
                          "x": 24,
                          "width": 136,
                          "text": "Task 3:",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "height": 39,
                          "fontSize": 36,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "runtime": "Laya.Text"
                      },
                      "compId": 39
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 107,
                          "x": 387,
                          "skin": "res/common/img_gold_ico.png"
                      },
                      "compId": 42
                  }]
              }]
          },
          {
              "type": "Image",
              "props": {
                  "y": 0,
                  "x": 0,
                  "width": 660,
                  "var": "ad_bg1",
                  "scaleY": 0.9,
                  "scaleX": 0.9,
                  "height": 340,
                  "centerX": 0,
                  "bottom": 53
              },
              "compId": 43,
              "child": [{
                  "type": "Image",
                  "props": {
                      "var": "img_ad_bg1",
                      "top": 0,
                      "skin": "res/Ad/img_ad_box.png",
                      "sizeGrid": "15,15,15,15",
                      "right": 0,
                      "left": 0,
                      "bottom": 0
                  },
                  "compId": 46,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "width": 640,
                          "var": "img_ad1",
                          "top": 8.5,
                          "skin": "res/Ad/img_mask.png",
                          "left": 8.5,
                          "height": 320
                      },
                      "compId": 47
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 0,
                          "x": 599,
                          "skin": "res/Ad/img_ad_logo.png"
                      },
                      "compId": 48
                  },
                  {
                      "type": "Image",
                      "props": {
                          "width": 40,
                          "var": "img_ad_icon1",
                          "skin": "res/Ad/img_mask.png",
                          "right": 11,
                          "height": 49,
                          "bottom": 11
                      },
                      "compId": 49
                  },
                  {
                      "type": "Label",
                      "props": {
                          "y": 19,
                          "width": 400,
                          "var": "lab_ad_title1",
                          "valign": "middle",
                          "text": "广告详情",
                          "overflow": "scroll",
                          "height": 35,
                          "fontSize": 35,
                          "font": "Helvetica",
                          "centerX": 0,
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 50
                  },
                  {
                      "type": "Label",
                      "props": {
                          "wordWrap": true,
                          "width": 550,
                          "visible": false,
                          "var": "lab_ad_des1",
                          "valign": "middle",
                          "text": "广告详情",
                          "height": 39,
                          "fontSize": 35,
                          "font": "Helvetica",
                          "centerY": 138,
                          "centerX": 0,
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 51
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 38,
                          "x": 54,
                          "var": "btn_ad_close2",
                          "stateNum": 1,
                          "skin": "res/Ad/btn_ad_close.png",
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 52
                  },
                  {
                      "type": "Box",
                      "props": {
                          "y": 38,
                          "x": 54,
                          "width": 48,
                          "var": "btn_ad_close1",
                          "scaleY": 1,
                          "scaleX": 1,
                          "height": 48,
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 53
                  }]
              }]
          },
          {
              "type": "Button",
              "props": {
                  "y": 0,
                  "x": 0,
                  "width": 305,
                  "var": "btn_ad1",
                  "stateNum": 1,
                  "skin": "res/Ad/btn_green.png",
                  "scaleY": 0.8,
                  "scaleX": 0.8,
                  "height": 138,
                  "centerY": 365,
                  "centerX": 0,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 44,
              "child": [{
                  "type": "Label",
                  "props": {
                      "text": "查看广告",
                      "strokeColor": "#fdf060",
                      "stroke": 2,
                      "fontSize": 45,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "centerY": 0,
                      "centerX": 0,
                      "bold": true,
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 54
              }]
          },
          {
              "type": "Button",
              "props": {
                  "y": 0,
                  "x": 0,
                  "width": 198,
                  "var": "btnClose",
                  "stateNum": 1,
                  "height": 42,
                  "centerX": 0,
                  "centerY": 370
                //   "bottom": 350
              },
              "compId": 45,
              "child": [{
                  "type": "Label",
                  "props": {
                      "var": "lab_3",
                      "valign": "middle",
                      "text": "Cancel",
                      "stroke": 3,
                      "fontSize": 33,
                      "font": "SimHei",
                      "color": "#ffffff",
                      "centerY": -5,
                      "centerX": 0,
                      "bold": true,
                      "align": "center"
                  },
                  "compId": 55
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 0,
                      "x": 31,
                      "visible": false,
                      "var": "icon_3",
                      "scaleY": 0.4,
                      "scaleX": 0.4,
                      "centerY": -6
                  },
                  "compId": 56
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 0,
                  "x": 0,
                  "visible": false,
                  "var": "mask1",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.8
              },
              "compId": 57
          }],
          "loadList": ["res/task/img_task_bg.png", "res/task/img_task_close.png", "res/task/img_task_title.png", "res/task/img_task_item.png", "res/task/img_task_btn.png", "res/common/img_gold_ico.png", "res/Ad/img_ad_box.png", "res/Ad/img_mask.png", "res/Ad/img_ad_logo.png", "res/Ad/btn_ad_close.png", "res/Ad/btn_green.png"],
          "loadList3D": []
      };
      ui.TaskViewUI = TaskViewUI;
      REG("ui.TaskViewUI", TaskViewUI);
      class UpgradeViewUI extends View {
          constructor() {
              super()
          }
          createChildren() {
              super.createChildren();
              this.createView(UpgradeViewUI.uiView)
          }
      }
      UpgradeViewUI.uiView = {
          "type": "View",
          "props": {
              "width": 750,
              "height": 1334
          },
          "compId": 2,
          "child": [{
              "type": "Panel",
              "props": {
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.8
              },
              "compId": 3
          },
          {
              "type": "Box",
              "props": {
                  "width": 621,
                  "var": "boxUpgrade",
                  "height": 556,
                  "centerY": 0,
                  "centerX": 0
              },
              "compId": 4,
              "child": [{
                  "type": "Image",
                  "props": {
                      "skin": "res/upgrade/img_upgrade_bg.png"
                  },
                  "compId": 5
              },
              {
                  "type": "Button",
                  "props": {
                      "y": 40,
                      "x": 881,
                      "stateNum": 1,
                      "skin": "res/upgrade/img_upgrade_close.png"
                  },
                  "compId": 6
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 40,
                      "x": 255,
                      "skin": "res/upgrade/img_upgrade_title.png"
                  },
                  "compId": 7
              },
              {
                  "type": "Box",
                  "props": {
                      "y": 180,
                      "x": 26.5,
                      "width": 568,
                      "var": "boxSpeed",
                      "rotation": 0,
                      "height": 137
                  },
                  "compId": 8,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "skin": "res/upgrade/img_upgrade_item.png"
                      },
                      "compId": 9
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 54,
                          "x": 151,
                          "valign": "middle",
                          "text": "Speed",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "fontSize": 24,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 10
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 44.5,
                          "x": 261,
                          "var": "txt_speed_lv",
                          "valign": "middle",
                          "text": "lv.0",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "fontSize": 42,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 12
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 21,
                          "x": 368.283203125,
                          "var": "btn_speed",
                          "stateNum": 1,
                          "skin": "res/upgrade/img_upgrade_btn.png"
                      },
                      "compId": 13,
                      "child": [{
                          "type": "Image",
                          "props": {
                              "y": 27.5,
                              "x": 20,
                              "skin": "res/common/img_video_ico.png",
                              "scaleY": 0.8,
                              "scaleX": 0.8,
                              "alpha": 0.5
                          },
                          "compId": 15
                      },
                      {
                          "type": "Text",
                          "props": {
                              "y": 30,
                              "x": 67,
                              "valign": "middle",
                              "text": "Upgrade",
                              "strokeColor": "#000000",
                              "stroke": 1,
                              "fontSize": 24,
                              "font": "Microsoft YaHei",
                              "color": "#ffffff",
                              "bold": true,
                              "align": "center",
                              "runtime": "Laya.Text"
                          },
                          "compId": 17
                      }]
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 28.5,
                          "x": 37,
                          "skin": "res/upgrade/img_upgrade_speed.png"
                      },
                      "compId": 14
                  }]
              },
              {
                  "type": "Box",
                  "props": {
                      "y": 360,
                      "x": 26.5,
                      "width": 568,
                      "var": "boxBag",
                      "height": 137
                  },
                  "compId": 18,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "skin": "res/upgrade/img_upgrade_item.png"
                      },
                      "compId": 19
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 54,
                          "x": 151,
                          "valign": "middle",
                          "text": "Capcity",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "fontSize": 24,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 20
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 44.5,
                          "x": 261,
                          "var": "txt_bag_lv",
                          "valign": "middle",
                          "text": "lv.0",
                          "strokeColor": "#000000",
                          "stroke": 1,
                          "fontSize": 42,
                          "font": "Microsoft YaHei",
                          "color": "#ffffff",
                          "bold": true,
                          "align": "center",
                          "runtime": "Laya.Text"
                      },
                      "compId": 21
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 21,
                          "x": 368.283203125,
                          "var": "btn_bag",
                          "stateNum": 1,
                          "skin": "res/upgrade/img_upgrade_btn.png"
                      },
                      "compId": 22,
                      "child": [{
                          "type": "Image",
                          "props": {
                              "y": 27.5,
                              "x": 20,
                              "skin": "res/common/img_video_ico.png",
                              "scaleY": 0.8,
                              "scaleX": 0.8,
                              "alpha": 0.5
                          },
                          "compId": 23
                      },
                      {
                          "type": "Text",
                          "props": {
                              "y": 30,
                              "x": 67,
                              "valign": "middle",
                              "text": "Upgrade",
                              "strokeColor": "#000000",
                              "stroke": 1,
                              "fontSize": 24,
                              "font": "Microsoft YaHei",
                              "color": "#ffffff",
                              "bold": true,
                              "align": "center",
                              "runtime": "Laya.Text"
                          },
                          "compId": 24
                      }]
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 28.5,
                          "x": 37,
                          "skin": "res/upgrade/img_upgrade_bag.png"
                      },
                      "compId": 25
                  }]
              }]
          },
          {
              "type": "Image",
              "props": {
                  "y": 0,
                  "x": 0,
                  "width": 660,
                  "var": "ad_bg1",
                  "scaleY": 0.9,
                  "scaleX": 0.9,
                  "height": 340,
                  "centerX": 0,
                  "bottom": 53
              },
              "compId": 26,
              "child": [{
                  "type": "Image",
                  "props": {
                      "var": "img_ad_bg1",
                      "top": 0,
                      "skin": "res/Ad/img_ad_box.png",
                      "sizeGrid": "15,15,15,15",
                      "right": 0,
                      "left": 0,
                      "bottom": 0
                  },
                  "compId": 28,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "width": 640,
                          "var": "img_ad1",
                          "top": 8.5,
                          "skin": "res/Ad/img_mask.png",
                          "left": 8.5,
                          "height": 320
                      },
                      "compId": 29
                  },
                  {
                      "type": "Image",
                      "props": {
                          "y": 0,
                          "x": 599,
                          "skin": "res/Ad/img_ad_logo.png"
                      },
                      "compId": 30
                  },
                  {
                      "type": "Image",
                      "props": {
                          "width": 40,
                          "var": "img_ad_icon1",
                          "skin": "res/Ad/img_mask.png",
                          "right": 11,
                          "height": 49,
                          "bottom": 11
                      },
                      "compId": 31
                  },
                  {
                      "type": "Label",
                      "props": {
                          "y": 19,
                          "width": 400,
                          "var": "lab_ad_title1",
                          "valign": "middle",
                          "text": "广告详情",
                          "overflow": "scroll",
                          "height": 35,
                          "fontSize": 35,
                          "font": "Helvetica",
                          "centerX": 0,
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 32
                  },
                  {
                      "type": "Label",
                      "props": {
                          "wordWrap": true,
                          "width": 550,
                          "visible": false,
                          "var": "lab_ad_des1",
                          "valign": "middle",
                          "text": "广告详情",
                          "height": 39,
                          "fontSize": 35,
                          "font": "Helvetica",
                          "centerY": 138,
                          "centerX": 0,
                          "bold": true,
                          "align": "center"
                      },
                      "compId": 33
                  },
                  {
                      "type": "Button",
                      "props": {
                          "y": 38,
                          "x": 54,
                          "var": "btn_ad_close2",
                          "stateNum": 1,
                          "skin": "res/Ad/btn_ad_close.png",
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 34
                  },
                  {
                      "type": "Box",
                      "props": {
                          "y": 38,
                          "x": 54,
                          "width": 48,
                          "var": "btn_ad_close1",
                          "scaleY": 1,
                          "scaleX": 1,
                          "height": 48,
                          "anchorY": 0.5,
                          "anchorX": 0.5
                      },
                      "compId": 35
                  }]
              }]
          },
          {
              "type": "Button",
              "props": {
                  "width": 305,
                  "var": "btn_ad1",
                  "stateNum": 1,
                  "skin": "res/Ad/btn_green.png",
                  "scaleY": 0.8,
                  "scaleX": 0.8,
                  "height": 138,
                  "centerY": 365,
                  "centerX": 0,
                  "anchorY": 0.5,
                  "anchorX": 0.5
              },
              "compId": 27,
              "child": [{
                  "type": "Label",
                  "props": {
                      "text": "查看广告",
                      "strokeColor": "#fdf060",
                      "stroke": 2,
                      "fontSize": 45,
                      "font": "Microsoft YaHei",
                      "color": "#ffffff",
                      "centerY": 0,
                      "centerX": 0,
                      "bold": true,
                      "anchorY": 0.5,
                      "anchorX": 0.5
                  },
                  "compId": 36
              }]
          },
          {
              "type": "Button",
              "props": {
                  "y": 0,
                  "x": 0,
                  "width": 198,
                  "var": "btnClose",
                  "stateNum": 1,
                  "height": 42,
                  "centerX": 0,
                  "centerY": 350
                //   "bottom": 300
              },
              "compId": 37,
              "child": [{
                  "type": "Label",
                  "props": {
                      "var": "lab_3",
                      "valign": "middle",
                      "text": "Cancel",
                      "stroke": 3,
                      "fontSize": 33,
                      "font": "SimHei",
                      "color": "#ffffff",
                      "centerY": -5,
                      "centerX": 0,
                      "bold": true,
                      "align": "center"
                  },
                  "compId": 38
              },
              {
                  "type": "Image",
                  "props": {
                      "y": 0,
                      "x": 31,
                      "visible": false,
                      "var": "icon_3",
                      "scaleY": 0.4,
                      "scaleX": 0.4,
                      "centerY": -6
                  },
                  "compId": 39
              }]
          },
          {
              "type": "Box",
              "props": {
                  "y": 0,
                  "x": 0,
                  "visible": false,
                  "var": "mask1",
                  "top": 0,
                  "right": 0,
                  "left": 0,
                  "bottom": 0,
                  "bgColor": "#000000",
                  "alpha": 0.8
              },
              "compId": 40
          }],
          "loadList": ["res/upgrade/img_upgrade_bg.png", "res/upgrade/img_upgrade_close.png", "res/upgrade/img_upgrade_title.png", "res/upgrade/img_upgrade_item.png", "res/upgrade/img_upgrade_btn.png", "res/common/img_video_ico.png", "res/upgrade/img_upgrade_speed.png", "res/upgrade/img_upgrade_bag.png", "res/Ad/img_ad_box.png", "res/Ad/img_mask.png", "res/Ad/img_ad_logo.png", "res/Ad/btn_ad_close.png", "res/Ad/btn_green.png"],
          "loadList3D": []
      };
      ui.UpgradeViewUI = UpgradeViewUI;
      REG("ui.UpgradeViewUI", UpgradeViewUI)
  })(ui || (ui = {})); (function(ui) {
      var Item; (function(Item) {
          class UnlockPriceItemUI extends View {
              constructor() {
                  super()
              }
              createChildren() {
                  super.createChildren();
                  this.createView(UnlockPriceItemUI.uiView)
              }
          }
          UnlockPriceItemUI.uiView = {
              "type": "View",
              "props": {
                  "width": 259,
                  "mouseThrough": true,
                  "height": 212
              },
              "compId": 2,
              "child": [{
                  "type": "Image",
                  "props": {
                      "var": "btn_free_money",
                      "skin": "res/Ad/btn_free.png",
                      "mouseThrough": true
                  },
                  "compId": 3,
                  "child": [{
                      "type": "Image",
                      "props": {
                          "y": 55,
                          "x": 58,
                          "skin": "res/common/img_gold_ico.png",
                          "scaleY": 0.5,
                          "scaleX": 0.5
                      },
                      "compId": 4
                  },
                  {
                      "type": "Text",
                      "props": {
                          "y": 46,
                          "x": 104,
                          "text": "+50",
                          "fontSize": 45,
                          "color": "#ffffff",
                          "runtime": "Laya.Text"
                      },
                      "compId": 5
                  }]
              }],
              "loadList": ["res/Ad/btn_free.png", "res/common/img_gold_ico.png"],
              "loadList3D": []
          };
          Item.UnlockPriceItemUI = UnlockPriceItemUI;
          REG("ui.Item.UnlockPriceItemUI", UnlockPriceItemUI)
      })(Item = ui.Item || (ui.Item = {}))
  })(ui || (ui = {}));
  var ResPath; (function(ResPath) {
      const LOADING_URL = "loading/";
      ResPath.LOADING_BG = LOADING_URL + "img_bg.jpg";
      ResPath.LOADING_LOGO = LOADING_URL + "img_logo.png";
      ResPath.LOADING_PRO_TXT = LOADING_URL + "img_progress_txt.png";
      ResPath.LOADING_PRO_BG = LOADING_URL + "img_progress_bg.png";
      ResPath.LOADING_PRO = LOADING_URL + "img_progress.png";
      ResPath.CDN_MESH_PATH = "";
      const H5Scene = "h5Scene/";
      const H51 = "h51/";
      const H52 = "h52/";
      ResPath.Mesh_Scene = H5Scene + "scene.ls";
      ResPath.Mesh_Hero = H51 + "s_hero.lh";
      ResPath.Mesh_Skin_0 = H51 + "000.lh";
      ResPath.Mesh_Skin_1 = H51 + "001.lh";
      ResPath.Mesh_Skin_2 = H51 + "002.lh";
      ResPath.Mesh_Skin_3 = H51 + "003.lh";
      ResPath.Mesh_Skin_4 = H51 + "004.lh";
      ResPath.Mesh_Skin_5 = H51 + "005.lh";
      ResPath.Mesh_Skin_6 = H51 + "006.lh";
      ResPath.Mesh_Skin_Car = H51 + "pc.lh";
      ResPath.Mesh_Customer = H51 + "s_customer.lh";
      ResPath.Mesh_Bot = H51 + "s_bot.lh";
      ResPath.Mesh_Ico_Money = H51 + "ico_money.lh";
      ResPath.Mesh_Ico_Iron = H51 + "ico_iron.lh";
      ResPath.Mesh_Ico_Screw = H51 + "ico_screw.lh";
      ResPath.Mesh_Ico_Battery = H51 + "ico_battery.lh";
      ResPath.Mesh_Ico_Glass = H51 + "ico_glass.lh";
      ResPath.Mesh_Ico_Bulb = H51 + "ico_bulb.lh";
      ResPath.Mesh_Ico_Monitor = H51 + "ico_monitor.lh";
      ResPath.Mesh_Ico_Laptop = H51 + "ico_laptop.lh";
      ResPath.Mesh_Money_Stack = H51 + "s_money_stack.lh";
      ResPath.Mesh_Guide = H51 + "s_guide.lh";
      ResPath.Mesh_SmokeUp = H51 + "smokeUp.lh";
      ResPath.Mesh_Iron_Factory = H52 + "s_iron_factory.lh";
      ResPath.Mesh_Iron_Store = H52 + "s_iron_store.lh";
      ResPath.Mesh_Iron_Rail = H52 + "s_iron_rail.lh";
      ResPath.Mesh_Screw_Factory = H52 + "s_screw_factory.lh";
      ResPath.Mesh_Screw_Store = H52 + "s_screw_store.lh";
      ResPath.Mesh_Screw_Rail = H52 + "s_screw_rail.lh";
      ResPath.Mesh_Screw_Belt = H52 + "s_screw_belt.lh";
      ResPath.Mesh_Battery_Factory = H52 + "s_battery_factory.lh";
      ResPath.Mesh_Battery_Store = H52 + "s_battery_store.lh";
      ResPath.Mesh_Battery_Rail = H52 + "s_battery_rail.lh";
      ResPath.Mesh_Battery_Belt = H52 + "s_battery_belt.lh";
      ResPath.Mesh_Glass_Factory = H52 + "s_glass_factory.lh";
      ResPath.Mesh_Glass_Store = H52 + "s_glass_store.lh";
      ResPath.Mesh_Glass_Rail = H52 + "s_glass_rail.lh";
      ResPath.Mesh_Bulb_Factory = H52 + "s_bulb_factory.lh";
      ResPath.Mesh_Bulb_Store = H52 + "s_bulb_store.lh";
      ResPath.Mesh_Bulb_Rail = H52 + "s_bulb_rail.lh";
      ResPath.Mesh_Bulb_Belt = H52 + "s_bulb_belt.lh";
      ResPath.Mesh_Monitor_Factory = H52 + "s_monitor_factory.lh";
      ResPath.Mesh_Monitor_Store = H52 + "s_monitor_store.lh";
      ResPath.Mesh_Monitor_Rail = H52 + "s_monitor_rail.lh";
      ResPath.Mesh_Monitor_Belt = H52 + "s_monitor_belt.lh";
      ResPath.Mesh_Laptop_Factory = H52 + "s_laptop_factory.lh";
      ResPath.Mesh_Laptop_Store = H52 + "s_laptop_store.lh";
      ResPath.Mesh_Laptop_Rail = H52 + "s_laptop_rail.lh";
      ResPath.Mesh_Laptop_Relt1 = H52 + "s_laptop_belt1.lh";
      ResPath.Mesh_Laptop_Relt2 = H52 + "s_laptop_belt2.lh";
      ResPath.Mesh_Arrow = H52 + "arrow.lh";
      ResPath.Mesh_Trash = H52 + "s_trash.lh";
      ResPath.Res_Texture = "res/Texture/";
      ResPath.Res_Home = "res/home/";
      ResPath.Res_Shop = "res/shop/";
      ResPath.Res_Battle = "res/battle/";
      ResPath.Res_Commmon = "res/common/";
      ResPath.UI_SOUND = "res/sound/";
      ResPath.Sound_Bgm = ResPath.UI_SOUND + "bgm.mp3";
      ResPath.Sound_Button = ResPath.UI_SOUND + "click.mp3";
      ResPath.Sound_Success = ResPath.UI_SOUND + "success.mp3";
      ResPath.Sound_Fail = ResPath.UI_SOUND + "fail.mp3";
      ResPath.Sound_Home = ResPath.UI_SOUND + "home.mp3";
      ResPath.Sound_Money = ResPath.UI_SOUND + "money.mp3";
      ResPath.Sound_Res = ResPath.UI_SOUND + "res.mp3"
  })(ResPath || (ResPath = {}));
  class GameEvent {}
  GameEvent.SUB_PRESS = "SUB_PRESS";
  GameEvent.RES_PRESS = "RES_PRESS";
  GameEvent.JSON_PRESS = "JSON_PRESS";
  GameEvent.GAME_GOLD = "GAME_GOLD";
  GameEvent.GAME_SUCCESS = "GAME_SUCCESS";
  GameEvent.GAME_FAIL = "GAME_FAIL";
  GameEvent.REFRESH_GOLD = "Refresh_gold";
  GameEvent.REFRESH_MONEY = "Refresh_money";
  GameEvent.REFRESH_SCENE_BG = "Refresh_Scene_Bg";
  GameEvent.REFRESH_WUQI = "Refresh_wuqi";
  GameEvent.REFRESH_TASK = "Refresh_Task";
  GameEvent.EVENT_DIE = "EVENT_DIE";
  GameEvent.MOUSE_INPUT_DOWN = "MouseInputDown";
  GameEvent.MOUSE_INPUT_MOVE = "MouseInputMove";
  GameEvent.MOUSE_INPUT_UP = "MouseInputUp";
  class CommonUtils {
      static onGetRandomNum(Min, Max) {
          var Range = Max - Min;
          var Rand = Math.random();
          return (Min + Math.round(Rand * Range))
      }
      static onGetRandom(Min, Max) {
          var Range = Max - Min;
          var Rand = Math.random();
          return Math.floor(Min + Rand * Range)
      }
      static onTimeToStr(times) {
          var timeStr = "";
          var time = Math.floor(times / 1000);
          var second = time % 60;
          var minute = Math.floor(time / 60);
          if (minute > 99) {
              timeStr = "99:"
          } else if (minute >= 10) {
              timeStr = minute + ":"
          } else {
              timeStr = "0" + minute + ":"
          }
          if (second >= 10) {
              timeStr += second
          } else {
              timeStr += "0" + second
          }
          return timeStr
      }
      static onDegreesToRadians(y) {
          return (y / 180.0) * Math.PI
      }
      static onRadiansToDegrees(y) {
          return (y / Math.PI) * 180.0
      }
      static onGetPosByAngle(a, r, centerX, centerZ) {
          var pt = new Laya.Point();
          var angle = (360 - (a - 90)) % 360;
          pt.x = Math.round((centerX + r * Math.cos(angle * 3.14 / 180)) * 100) / 100;
          pt.y = Math.round((centerZ + r * Math.sign(angle * 3.14 / 180)) * 100) / 100;
          return pt
      }
      static onCountAngle(startX, startY, endX, endY) {
          var x = Math.abs(startX - endX);
          var y = Math.abs(startY - endY);
          var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          var cos = y / z;
          var radina = Math.acos(cos);
          var angle = Math.floor(180 / (Math.PI / radina));
          if (endX > startX && endY > startY) {
              angle = 180 - angle
          } else if (endX == startX && endY > startY) {
              angle = 180
          } else if (endX > startX && endY == startY) {
              angle = 90
          } else if (endX < startX && endY > startY) {
              angle = 180 + angle
          } else if (endX < startX && endY == startY) {
              angle = 270
          } else if (endX < startX && endY < startY) {
              angle = 360 - angle
          }
          return angle
      }
      static onAngleToArc360(angle) {
          return angle * Math.PI / 360
      }
      static onAngleToArc(angle) {
          return angle * Math.PI / 180
      }
      static onGetAngleTo360(angel) {
          return CommonUtils.onDoWhileAngle(angel) % 360
      }
      static onDoWhileAngle(angle) {
          while (angle < 360) {
              angle += 360
          }
          return angle
      }
      static onDistanceSquared2D(pos1, pos2) {
          var a = Math.abs(pos1.x - pos2.x);
          var b = Math.abs(pos1.z - pos2.z);
          return a * a + b * b
      }
      static onDistanceSquaredYZ(pos1, pos2) {
          var b = Math.abs(pos1.y - pos2.y);
          var c = Math.abs(pos1.z - pos2.z);
          return b * b + c * c
      }
      static onDistanceSquaredYX(pos1, pos2) {
          var a = Math.abs(pos1.x - pos2.x);
          var b = Math.abs(pos1.y - pos2.y);
          return a * a + b * b
      }
      static onNumToThousand(num) {
          var num = Math.floor(num / 100) / 10;
          var str = "";
          if ((num * 10) % 10 == 0) {
              str = num + ".0K"
          } else {
              str = num + "k"
          }
          return str
      }
      static distance(X, Y, mouseX, mouseY) {
          let dx = X - mouseX;
          let dy = Y - mouseY;
          let distance = Math.sqrt(dx * dx + dy * dy);
          return distance
      }
      static onFindModel(sprite, name) {
          if (sprite.name == name) {
              return sprite
          } else {
              return CommonUtils.findChild(sprite['_children'], name)
          }
      }
      static onSetMatrialColor(mat3D, color, bSkinMesh = false) {
          if (!mat3D) {
              return
          }
          var material = null;
          if (bSkinMesh) {
              var skinMesh = mat3D;
              material = skinMesh.skinnedMeshRenderer.material
          } else {
              var mesh3D = mat3D;
              material = mesh3D.meshRenderer.material
          }
          material.albedoColor = color
      }
      static findChild(spArr, name) {
          var arr = [];
          for (var i = 0; i < spArr.length; i++) {
              var child = spArr[i];
              if (child.name == name) {
                  return child
              } else if (child.numChildren) {
                  arr = arr.concat(child._children)
              }
          }
          if (!arr.length) {
              return null
          }
          return CommonUtils.findChild(arr, name)
      }
  }
  class Sound {
      constructor() {
          this.pre = "";
          this.gameSoundManager = new GameSoundManager();
          this.onSetGameSoundManager(this.gameSoundManager)
      }
      onRegBtnSound(btnStr) {
          this.gameSoundManager.onReg("BTN", btnStr)
      }
      onSetPre(str) {
          this.pre = str
      }
      onSetMusicVolume(value) {
          this.gameSoundManager.onSetBgmMuted(value == 0)
      }
      onSetSoundVolume(value) {
          this.gameSoundManager.onSetEffMuted(value == 0)
      }
      onPlay(soundName, isMusic = false, bLoop = false) {
          this.isMusic = isMusic;
          var url = this.pre + soundName;
          if (Laya.loader.getRes(url)) {
              this.onPlayInfo(url, isMusic, soundName, bLoop)
          } else {
              Laya.loader.load(url, new Laya.Handler(this, this.onPlayInfo, [url, isMusic, soundName, bLoop]))
          }
      }
      onPlayByOnce(soundName) {
          var url = this.pre + soundName;
          if (Laya.loader.getRes(url)) {
              this.onPlayOnce(url)
          } else {
              Laya.loader.load(url, new Laya.Handler(this, this.onPlayOnce, [url]))
          }
      }
      onStopEffect(soundName) {
          this.gameSoundManager.onStopEffectByTool(this.pre, soundName)
      }
      onStopBgm() {
          this.gameSoundManager.onStopBgm()
      }
      onSetGameSoundManager(gameSoundManager) {
          this.gameSoundManager = gameSoundManager
      }
      onPlayInfo(url, isMusic, soundName, bLoop) {
          if (isMusic) {
              this.gameSoundManager.onPlayBgm(url)
          } else {
              this.gameSoundManager.onPlayEffectByTool(this.pre, soundName, bLoop)
          }
      }
      onPlayOnce(url) {
          this.gameSoundManager.onPlayEffectOnce(url)
      }
      onLoadCom(url, isMusic) {
          if (isMusic) {
              Laya.SoundManager.playMusic(url, 0)
          } else {
              Laya.SoundManager.playSound(url, 1)
          }
      }
  }
  class GameSoundManager {
      constructor() {
          this.bgmMap = {};
          this.currentWxSound = null;
          this.bgmUrl = null;
          this.noBgm = false;
          this.noEff = false;
          this.mapSound = new Map()
      }
      onReg(url, bgm) {
          this.bgmMap[url] = bgm;
          if (url == "BTN") {
              Laya.stage.on(Laya.Event.CLICK, this, this.onClickFun)
          }
      }
      onClickFun(e) {
          if (e.target instanceof Laya.Button) {
              this.onPlayEffect(this.bgmMap["BTN"])
          }
      }
      onPlayBgm(url) {
          this.bgmUrl = url;
          if (Laya.Browser.onMiniGame) {
              if (this.currentWxSound) {
                  this.currentWxSound.stop();
                  this.currentWxSound.destroy();
                  this.currentWxSound = null
              }
              var wxSound = Laya.Browser.window.wx.createInnerAudioContext();
              wxSound.autoplay = true;
              wxSound.loop = true;
              wxSound.src = Laya.URL.basePath + url;
              this.currentWxSound = wxSound;
              this.onSetBgmMuted(this.noBgm)
          } else {
              Laya.SoundManager.playMusic(url);
              Laya.SoundManager.autoStopMusic = true
          }
      }
      onSetBgmMuted(v) {
          this.noBgm = v;
          if (Laya.Browser.onMiniGame && this.currentWxSound) {
              if (v) {
                  this.currentWxSound.volume = 0
              } else {
                  this.currentWxSound.volume = 1
              }
          } else {
              Laya.SoundManager.musicMuted = v
          }
      }
      onSetEffMuted(v) {
          this.noEff = v
      }
      onStopBgm() {
          if (Laya.Browser.onMiniGame) {
              if (this.currentWxSound) {
                  this.currentWxSound.stop();
                  this.currentWxSound.destroy();
                  this.currentWxSound = null
              }
          } else {
              Laya.SoundManager.stopMusic()
          }
      }
      onPlayEffect(url, bLoop = false) {
          if (this.noEff) {
              return
          }
          if (Laya.Browser.onMiniGame) {
              if (this.isHaveMap(url)) {
                  var wx = this.onGetMap(url);
                  if (wx) {
                      wx.onPlay()
                  }
              } else {
                  this.onAddMap(url, new WXSound(url, bLoop))
              }
          } else {
              Laya.SoundManager.playSound(url, bLoop ? 0 : 1)
          }
      }
      onPlayEffectOnce(url) {
          if (this.noEff) {
              return
          }
          if (Laya.Browser.onMiniGame) {
              if (this.isHaveMap(url)) {
                  var wx = this.onGetMap(url);
                  if (wx) {
                      wx.onStopToRePlay()
                  }
              } else {
                  this.onAddMap(url, new WXSound(url, false))
              }
          } else {
              Laya.SoundManager.playSound(url, 1)
          }
      }
      onStopEffect(url) {
          if (Laya.Browser.onMiniGame) {
              var wx = this.onGetMap(url);
              if (null != wx) {
                  wx.onStop()
              }
          } else {
              Laya.SoundManager.stopSound(url)
          }
      }
      onPlayEffectByTool(pre, soundName, bLoop) {
          var url = pre + soundName;
          this.onPlayEffect(url, bLoop)
      }
      onStopEffectByTool(pre, soundName) {
          var url = pre + soundName;
          this.onStopEffect(url)
      }
      isHaveMap(url) {
          if (this.mapSound.has(url)) {
              return true
          }
          return false
      }
      onGetMap(url) {
          if (this.isHaveMap(url)) {
              return this.mapSound.get(url)
          }
          return null
      }
      onAddMap(url, ws) {
          this.mapSound.set(url, ws)
      }
  }
  class WXSound {
      constructor(url, bLoop = false) {
          this.bEnd = false;
          this.url = url;
          this.bLoop = bLoop;
          this.wxSound = Laya.Browser.window.wx.createInnerAudioContext();
          this.wxSound.autoplay = true;
          this.wxSound.loop = bLoop;
          this.wxSound.src = url;
          this.wxSound.onEnded(() =>{
              this.wxSound.stop()
          })
      }
      onStopToRePlay() {
          this.wxSound = Laya.Browser.window.wx.createInnerAudioContext();
          this.wxSound.autoplay = false;
          this.wxSound.src = this.url;
          this.wxSound.play()
      }
      onPlay() {
          if (this.wxSound.loop) {
              if (this.bEnd) {
                  this.wxSound.play();
                  this.bEnd = false
              }
          } else {
              this.wxSound = Laya.Browser.window.wx.createInnerAudioContext();
              this.wxSound.autoplay = true;
              this.wxSound.loop = this.bLoop;
              this.wxSound.src = this.url
          }
      }
      onStop(bRePlay = false) {
          if (null == this.wxSound) {
              return
          }
          this.bEnd = true;
          this.wxSound.stop()
      }
  }
  class Sp {
      constructor() {
          this.sp3D = null
      }
      onCreate(path, spPath) {
          if (!path) {
              var sp3D_ = new Laya.Sprite3D();
              spPath.addChild(sp3D_);
              this.sp3D = sp3D_
          } else {
              var sp3D_ = Laya.Sprite3D.instantiate(Laya.loader.getRes(path));
              if (sp3D_) {
                  spPath.addChild(sp3D_);
                  this.sp3D = sp3D_
              }
          }
      }
      onCopy(spPath, sp) {
          var spNew = Laya.Sprite3D.instantiate(sp);
          if (spNew) {
              spPath.addChild(spNew);
              this.sp3D = spNew
          }
      }
      onGetSp3d() {
          return this.sp3D
      }
      onGetChildNum() {
          return this.sp3D.numChildren
      }
      onSetActive(bVis) {
          this.sp3D.active = bVis
      }
      onGetTargetId() {
          return this.sp3D.id
      }
      onRemoveSelf() {
          if (this.sp3D) {
              this.sp3D.removeChildren();
              this.sp3D.removeSelf()
          }
      }
      onReMoveChildByName(str) {
          var sp3D_ = this.onFindChildByName(str);
          if (sp3D_) {
              sp3D_.removeSelf()
          }
      }
      onAddNode(node) {
          return this.sp3D.addChild(node)
      }
      onGetSprChildByName(str) {
          return this.sp3D.getChildByName(str)
      }
      onFindChildByIndex(iIndex) {
          return this.sp3D.getChildAt(iIndex)
      }
      onFindOnceChildByName(name) {
          for (var i = 0; i < this.sp3D.numChildren; i++) {
              var child = this.sp3D.getChildAt(i);
              if (child.name == name) {
                  return child
              }
          }
          return null
      }
      onFindChildByName(name) {
          return this.onFindChild(this.sp3D['_children'], name)
      }
      onFindIncludesChildByName(name) {
          return this.onFindIncludesChild(this.sp3D['_children'], name)
      }
      onAddSprite3dToPath(spr, spPath) {
          var sp3D_ = Laya.Sprite3D.instantiate(spr);
          if (sp3D_) {
              spPath.addChild(sp3D_);
              this.sp3D = sp3D_
          }
      }
      onMeshSetColor(colorVc4) {
          var mesh3D = this.sp3D;
          if (!mesh3D) {
              return
          }
          var material = mesh3D.meshRenderer.material;
          if (!material) {
              return
          }
          material.albedoColor = colorVc4
      }
      onFindChildToSetSkinTex(strChildName, strTexName) {
          var child = this.onFindChildByName(strChildName);
          if (child) {
              var MeshSpr = child.skinnedMeshRenderer.material;
              Laya.Texture2D.load(strTexName, Laya.Handler.create(this, (tex) =>{
                  if (MeshSpr) {
                      MeshSpr.albedoTexture = tex
                  }
              }))
          }
      }
      onFindChildToSetSkinAlpha(strChildName, num, bSkinMesh = false) {
          var child = null;
          if (bSkinMesh) {
              if (strChildName == "") {
                  child = this.sp3D
              } else {
                  child = this.onFindChildByName(strChildName)
              }
          } else {
              if (strChildName == "") {
                  child = this.sp3D
              } else {
                  child = this.onFindChildByName(strChildName)
              }
          }
          if (!child) {
              console.error("FindChildToSetSkinAlpha error");
              return
          }
          if (bSkinMesh) {
              var MeshSpr = child.skinnedMeshRenderer.material;
              MeshSpr.albedoColorA = num
          } else {
              var MeshSpr = child.meshRenderer.material;
              MeshSpr.albedoColorA = num
          }
      }
      onFindChild(spArr, name) {
          var arr = [];
          for (var i = 0; i < spArr.length; i++) {
              var child = spArr[i];
              if (child.name == name) {
                  return child
              } else if (child.numChildren) {
                  arr = arr.concat(child._children)
              }
          }
          if (!arr.length) {
              return null
          }
          return this.onFindChild(arr, name)
      }
      onFindIncludesChild(spArr, name) {
          var arr = [];
          for (var i = 0; i < spArr.length; i++) {
              var child = spArr[i];
              if (child.name.includes(name)) {
                  return child
              } else if (child.numChildren) {
                  arr = arr.concat(child._children)
              }
          }
          if (!arr.length) {
              return null
          }
          return this.onFindIncludesChild(arr, name)
      }
      onGetChildByName(str) {
          return this.sp3D.getChildByName(str)
      }
      onGetChildAtIndex(iIndex) {
          return this.sp3D.getChildAt(iIndex)
      }
      onGetComp(any) {
          return this.sp3D.getComponent(any)
      }
      onGetBallP() {
          return this.sp3D.transform.localPosition
      }
      onGetWorldPX() {
          return this.sp3D.transform.position.x
      }
      onGetWorldPY() {
          return this.sp3D.transform.position.y
      }
      onGetWorldPZ() {
          return this.sp3D.transform.position.z
      }
      onGetWorldP() {
          return this.sp3D.transform.position
      }
      onGetWorldR() {
          return this.sp3D.transform.rotationEuler
      }
      onGetPX() {
          return this.sp3D.transform.localPositionX
      }
      onGetPY() {
          return this.sp3D.transform.localPositionY
      }
      onGetPZ() {
          return this.sp3D.transform.localPositionZ
      }
      onGetP() {
          return this.sp3D.transform.localPosition
      }
      onGetRX() {
          return this.sp3D.transform.localRotationEulerX
      }
      onGetRY() {
          return this.sp3D.transform.localRotationEulerY
      }
      onGetRZ() {
          return this.sp3D.transform.localRotationEulerZ
      }
      onGetR() {
          return this.sp3D.transform.localRotationEuler
      }
      onGetSX() {
          return this.sp3D.transform.localScaleX
      }
      onGetSY() {
          return this.sp3D.transform.localScaleY
      }
      onGetSZ() {
          return this.sp3D.transform.localScaleZ
      }
      onGetRig() {
          return this.sp3D.getComponent(Laya.Rigidbody3D)
      }
      onAddComp(any) {
          return this.sp3D.addComponent(any)
      }
      onSetName(str) {
          this.sp3D.name = str
      }
      onGetName() {
          return this.sp3D.name
      }
      onSetStadic() {
          Laya.StaticBatchManager.combine(this.sp3D)
      }
      onSetWorldP(v3) {
          this.sp3D.transform.position = new Laya.Vector3(v3.x, v3.y, v3.z)
      }
      onSetWorldR(v3) {
          this.sp3D.transform.rotationEuler = new Laya.Vector3(v3.x, v3.y, v3.z)
      }
      onSetPX(x) {
          this.sp3D.transform.localPositionX = x
      }
      onSetPY(y) {
          this.sp3D.transform.localPositionY = y
      }
      onSetPZ(z) {
          this.sp3D.transform.localPositionZ = z
      }
      onSetP(x, y, z) {
          this.sp3D.transform.localPositionX = x;
          this.sp3D.transform.localPositionY = y;
          this.sp3D.transform.localPositionZ = z
      }
      onAddP(x, y, z) {
          this.sp3D.transform.localPositionX += x;
          this.sp3D.transform.localPositionY += y;
          this.sp3D.transform.localPositionZ += z
      }
      onAddPX(x) {
          if (null == this.sp3D) {
              console.error("[Error] AddPX");
              return
          }
          this.sp3D.transform.localPositionX += x
      }
      onAddPY(y) {
          if (null == this.sp3D) {
              console.error("[Error] AddPY");
              return
          }
          this.sp3D.transform.localPositionY += y
      }
      onAddPZ(z) {
          if (null == this.sp3D) {
              console.error("[Error] AddPZ");
              return
          }
          this.sp3D.transform.localPositionZ += z
      }
      onAddWorldPZ(z) {
          if (null == this.sp3D) {
              return
          }
          var v3 = new Laya.Vector3(this.sp3D.transform.position.x, this.sp3D.transform.position.y, this.sp3D.transform.position.z);
          this.sp3D.transform.position = new Laya.Vector3(v3.x, v3.y, v3.z += z)
      }
      onSetS(fScaleX, fScaleY, fScaleZ) {
          if (null == this.sp3D) {
              console.error("[Error] SetS");
              return
          }
          this.sp3D.transform.localScaleX = fScaleX;
          this.sp3D.transform.localScaleY = fScaleY;
          this.sp3D.transform.localScaleZ = fScaleZ
      }
      onSetSXYZ(fScale) {
          if (null == this.sp3D) {
              console.error("[Error] SetS");
              return
          }
          this.sp3D.transform.localScaleX = fScale;
          this.sp3D.transform.localScaleY = fScale;
          this.sp3D.transform.localScaleZ = fScale
      }
      onSetSX(fScale) {
          if (null == this.sp3D) {
              console.error("[Error] SetSX");
              return
          }
          this.sp3D.transform.localScaleX = fScale
      }
      onSetSY(fScale) {
          if (null == this.sp3D) {
              console.error("[Error] SetSY");
              return
          }
          this.sp3D.transform.localScaleY = fScale
      }
      onSetSZ(fScale) {
          if (null == this.sp3D) {
              console.error("[Error] SetSZ");
              return
          }
          this.sp3D.transform.localScaleZ = fScale
      }
      onSetR(x, y, z) {
          if (null == this.sp3D) {
              console.error("[Error] SetR");
              return
          }
          this.sp3D.transform.localRotationEulerX = x;
          this.sp3D.transform.localRotationEulerY = y;
          this.sp3D.transform.localRotationEulerZ = z
      }
      onSetRX(x) {
          if (null == this.sp3D) {
              console.error("[Error] SetRX");
              return
          }
          this.sp3D.transform.localRotationEulerX = x
      }
      onSetRY(y) {
          if (null == this.sp3D) {
              console.error("[Error] SetRY");
              return
          }
          this.sp3D.transform.localRotationEulerY = y
      }
      onSetRZ(z) {
          if (null == this.sp3D) {
              console.error("[Error] SetRZ");
              return
          }
          this.sp3D.transform.localRotationEulerZ = z
      }
      onAddRX(y) {
          if (null == this.sp3D) {
              console.error("[Error] AddRX");
              return
          }
          this.sp3D.transform.localRotationEulerY += y
      }
      onAddRY(y) {
          if (null == this.sp3D) {
              console.error("[Error] AddRY");
              return
          }
          this.sp3D.transform.localRotationEulerY += y
      }
      onAddRZ(z) {
          if (null == this.sp3D) {
              console.error("[Error] AddRZ");
              return
          }
          this.sp3D.transform.localRotationEulerZ += z
      }
      onAddR(x, y, z) {
          if (null == this.sp3D) {
              console.error("[Error] AddR");
              return
          }
          this.sp3D.transform.rotate(new Laya.Vector3(x, y, z), true, false)
      }
      onAddSXZ(fScale) {
          if (null == this.sp3D) {
              console.error("[Error] SetS");
              return
          }
          this.sp3D.transform.localScaleX += fScale;
          this.sp3D.transform.localScaleZ += fScale
      }
  }
  class CtlSp {
      constructor() {
          this.sp3DBuild = new Laya.Sprite3D();
          this.sp3DPath = new Laya.Sprite3D();
          this.sp3DFly = new Laya.Sprite3D();
          this.spParticlePath = new Laya.Sprite3D();
          this.sp3DScene = null
      }
      onCreateBg(strResPathScene) {
          var url = strResPathScene;
          if (!url) {
              return null
          }
          var scene3d = Laya.loader.getRes(url);
          if (!scene3d) {
              return null
          }
          scene3d.name = "scene3D";
          Laya.stage.addChild(scene3d);
          this.onSetRoot(scene3d)
      }
      onGetScene() {
          return this.sp3DScene
      }
      onCopyTo(path, copyInfo) {
          var mesh = new Sp();
          mesh.onCopy(path, copyInfo);
          return mesh
      }
      onCreateTo(spr, str) {
          var mesh = new Sp();
          mesh.onCreate(str, spr);
          return mesh
      }
      onCreateSpPath(str) {
          var mesh = new Sp();
          mesh.onCreate(str, this.sp3DPath);
          return mesh
      }
      onCreateSpFly(str) {
          var flyMesh = new Sp();
          flyMesh.onCreate(str, this.sp3DFly);
          return flyMesh
      }
      onCreateParticle(str) {
          var mesh = new Sp();
          mesh.onCreate(str, this.spParticlePath);
          mesh.onSetName(str);
          return mesh
      }
      onGet3DBuild() {
          return this.sp3DBuild
      }
      onGet3DPath() {
          return this.sp3DPath
      }
      onGet3DFly() {
          return this.sp3DFly
      }
      onGetPartPath() {
          return this.spParticlePath
      }
      onAddToMesh(sp) {
          return this.sp3DPath.addChild(sp)
      }
      onClearToMesh(sp) {
          return this.sp3DPath.removeChild(sp)
      }
      onDelMeshByName(nameStr) {
          var sp3d = this.sp3DPath.getChildByName(nameStr);
          if (null != sp3d) {
              sp3d.removeSelf()
          }
      }
      onDelPathDMesh() {
          this.sp3DPath.destroyChildren();
          this.sp3DPath.removeChildren()
      }
      onDelFlyMesh() {
          this.sp3DFly.destroyChildren();
          this.sp3DFly.removeChildren()
      }
      onDelPartMesh() {
          this.spParticlePath.destroyChildren();
          this.spParticlePath.removeChildren()
      }
      onSetRoot(scene3d) {
          this.sp3DBuild.name = "sp3DBuild";
          this.sp3DPath.name = "sp3DPath";
          this.sp3DFly.name = "sp3DFly";
          this.spParticlePath.name = "sp3DParPath";
          scene3d.addChild(this.sp3DBuild);
          scene3d.addChild(this.sp3DPath);
          scene3d.addChild(this.sp3DFly);
          scene3d.addChild(this.spParticlePath);
          this.sp3DScene = scene3d
      }
  }
  CtlSp.Inst = new CtlSp();
  var GameEnum; (function(GameEnum) {
      let E_RES; (function(E_RES) {
          E_RES[E_RES["NONE"] = 0] = "NONE";
          E_RES[E_RES["IN_CREATE"] = 1] = "IN_CREATE";
          E_RES[E_RES["IN_WAITER"] = 2] = "IN_WAITER";
          E_RES[E_RES["IN_HERO"] = 3] = "IN_HERO";
          E_RES[E_RES["IN_STORE_INPUT"] = 4] = "IN_STORE_INPUT";
          E_RES[E_RES["IN_FACTORY_FINPUT"] = 5] = "IN_FACTORY_FINPUT";
          E_RES[E_RES["IN_STORE"] = 6] = "IN_STORE";
          E_RES[E_RES["IN_RAIL"] = 7] = "IN_RAIL";
          E_RES[E_RES["IN_BELT"] = 8] = "IN_BELT";
          E_RES[E_RES["IN_TRASH"] = 9] = "IN_TRASH"
      })(E_RES = GameEnum.E_RES || (GameEnum.E_RES = {}));
      let E_AI; (function(E_AI) {
          E_AI[E_AI["NONE"] = 0] = "NONE";
          E_AI[E_AI["ROT"] = 1] = "ROT";
          E_AI[E_AI["TAR"] = 2] = "TAR";
          E_AI[E_AI["TAR_ROT"] = 3] = "TAR_ROT";
          E_AI[E_AI["MOVE_X"] = 4] = "MOVE_X"
      })(E_AI = GameEnum.E_AI || (GameEnum.E_AI = {}));
      let E_TASK; (function(E_TASK) {
          E_TASK[E_TASK["TASK_1"] = 1] = "TASK_1";
          E_TASK[E_TASK["TASK_2"] = 2] = "TASK_2";
          E_TASK[E_TASK["TASK_3"] = 3] = "TASK_3";
          E_TASK[E_TASK["TASK_4"] = 4] = "TASK_4";
          E_TASK[E_TASK["TASK_5"] = 5] = "TASK_5";
          E_TASK[E_TASK["TASK_6"] = 6] = "TASK_6";
          E_TASK[E_TASK["TASK_7"] = 7] = "TASK_7";
          E_TASK[E_TASK["TASK_8"] = 8] = "TASK_8";
          E_TASK[E_TASK["TASK_9"] = 9] = "TASK_9"
      })(E_TASK = GameEnum.E_TASK || (GameEnum.E_TASK = {}));
      let E_CITY; (function(E_CITY) {
          E_CITY[E_CITY["NONE"] = 0] = "NONE";
          E_CITY[E_CITY["CITY1IRON"] = 1] = "CITY1IRON";
          E_CITY[E_CITY["CITY2SCREW"] = 2] = "CITY2SCREW";
          E_CITY[E_CITY["CITY3BATTERY"] = 3] = "CITY3BATTERY";
          E_CITY[E_CITY["CITY4GLASS"] = 4] = "CITY4GLASS";
          E_CITY[E_CITY["CITY5BULB"] = 5] = "CITY5BULB";
          E_CITY[E_CITY["CITY6MONITOR"] = 6] = "CITY6MONITOR";
          E_CITY[E_CITY["CITY7LAPTOP"] = 7] = "CITY7LAPTOP"
      })(E_CITY = GameEnum.E_CITY || (GameEnum.E_CITY = {}));
      let E_TYPE; (function(E_TYPE) {
          E_TYPE[E_TYPE["NONE"] = 0] = "NONE";
          E_TYPE[E_TYPE["FACTORY"] = 1] = "FACTORY";
          E_TYPE[E_TYPE["STORE"] = 2] = "STORE";
          E_TYPE[E_TYPE["RAIL"] = 3] = "RAIL";
          E_TYPE[E_TYPE["BELT1"] = 4] = "BELT1";
          E_TYPE[E_TYPE["BELT2"] = 5] = "BELT2"
      })(E_TYPE = GameEnum.E_TYPE || (GameEnum.E_TYPE = {}))
  })(GameEnum || (GameEnum = {}));
  class GameData {
      constructor() {
          this.roleSpeed = 0.2;
          this.accSpeed = 0;
          this.maxTaskMoney = 3000;
          this.endSpeed = 3.2;
          this.maxInitBag = 4;
          this.maxTaskMoveRes = 100;
          this.archersAITime = 300;
          this.propShowTime = 10;
          this.maxHome = 27;
          this.maxTaskGetMoney = 500;
          this.wallZoonTime = 800;
          this.maxTaskMoveScrew = 100;
          this.maxTaskBuyBattery = 100;
          this.industrySpeed = 0;
          this.crossbowOpenLv = 4;
          this.maxTaskLoginTime = 10;
          this.aiRandTarCrossbow = 6;
          this.homeList = [];
          this.wallList = [];
          this.maxStoreInput = 8;
          this.maxFactoryInput = 4;
          this.maxFactoryOput = 4;
          this.maxStoreMoney = 200;
          this.minMoveX = -56;
          this.maxMoveX = 11;
          this.minMoveZ = -33;
          this.maxMoveZ = 33;
          this.whileColor = [255, 255, 255];
          this.playerREBArr = ["#18ccf6", "#e500c1", "#df0003", "#25ff0b", "#faff22", "#5f22ff"];
          this.levelOpenColor = [212, 212, 212];
          this.levelNoColor = [100, 100, 100];
          this.beltColor = [152, 152, 152];
          this.railColor = [34, 34, 34]
      }
      onGetTaskStrByID(taskIndex) {
          var taskStr = "";
          switch (taskIndex) {
          case GameEnum.E_TASK.TASK_1:
              taskStr = "Unlock new building";
              break;
          case GameEnum.E_TASK.TASK_2:
              taskStr = "Upgrade building";
              break;
          case GameEnum.E_TASK.TASK_3:
              taskStr = "Get money count/max";
              break;
          case GameEnum.E_TASK.TASK_4:
              taskStr = "Carry count/max materials";
              break;
          case GameEnum.E_TASK.TASK_5:
              taskStr = "Carry count/max screw";
              break;
          case GameEnum.E_TASK.TASK_6:
              taskStr = "Sell count/max batteries";
              break;
          case GameEnum.E_TASK.TASK_7:
              taskStr = "Get money count/max";
              break;
          case GameEnum.E_TASK.TASK_8:
              taskStr = "Play count/max minutes";
              break;
          case GameEnum.E_TASK.TASK_9:
              taskStr = "Finish 2 tasks";
              break;
          default:
              break
          }
          return taskStr
      }
      onInitData() {
          this.homeList = [];
          this.wallList = []
      }
      onGetWhileColor() {
          return new Laya.Vector4(this.whileColor[0] / 255, this.whileColor[1] / 255, this.whileColor[2] / 255, 1)
      }
      onHomeNameByID(id) {
          var namStr = "";
          switch (id) {
          case 0:
              namStr = "s_iron_factory";
              break;
          case 1:
              namStr = "s_iron_store";
              break;
          case 2:
              namStr = "s_screw_factory";
              break;
          case 3:
              namStr = "s_screw_store";
              break;
          case 4:
              namStr = "s_iron_rail";
              break;
          case 5:
              namStr = "s_screw_rail";
              break;
          case 6:
              namStr = "s_screw_belt";
              break;
          case 7:
              namStr = "s_battery_factory";
              break;
          case 8:
              namStr = "s_battery_store";
              break;
          case 9:
              namStr = "s_battery_rail";
              break;
          case 10:
              namStr = "s_battery_belt";
              break;
          case 11:
              namStr = "s_glass_factory";
              break;
          case 12:
              namStr = "s_glass_store";
              break;
          case 13:
              namStr = "s_bulb_factory";
              break;
          case 14:
              namStr = "s_bulb_store";
              break;
          case 15:
              namStr = "s_glass_rail";
              break;
          case 16:
              namStr = "s_bulb_rail";
              break;
          case 17:
              namStr = "s_bulb_belt";
              break;
          case 18:
              namStr = "s_monitor_factory";
              break;
          case 19:
              namStr = "s_monitor_store";
              break;
          case 20:
              namStr = "s_monitor_rail";
              break;
          case 21:
              namStr = "s_monitor_belt";
              break;
          case 22:
              namStr = "s_laptop_factory";
              break;
          case 23:
              namStr = "s_laptop_store";
              break;
          case 24:
              namStr = "s_laptop_rail";
              break;
          case 25:
              namStr = "s_laptop_belt1";
              break;
          case 26:
              namStr = "s_laptop_belt2";
              break;
          default:
              namStr = "";
              console.log("GameData HomeName=null id=" + id);
              break
          }
          return namStr
      }
      onHomeIDByName(nameStr) {
          var homeID = 0;
          switch (nameStr) {
          case "s_iron_factory":
              homeID = 0;
              break;
          case "s_iron_store":
              homeID = 1;
              break;
          case "s_screw_factory":
              homeID = 2;
              break;
          case "s_screw_store":
              homeID = 3;
              break;
          case "s_iron_rail":
              homeID = 4;
              break;
          case "s_screw_rail":
              homeID = 5;
              break;
          case "s_screw_belt":
              homeID = 6;
              break;
          case "s_battery_factory":
              homeID = 7;
              break;
          case "s_battery_store":
              homeID = 8;
              break;
          case "s_battery_rail":
              homeID = 9;
              break;
          case "s_battery_belt":
              homeID = 10;
              break;
          case "s_glass_factory":
              homeID = 11;
              break;
          case "s_glass_store":
              homeID = 12;
              break;
          case "s_bulb_factory":
              homeID = 13;
              break;
          case "s_bulb_store":
              homeID = 14;
              break;
          case "s_glass_rail":
              homeID = 15;
              break;
          case "s_bulb_rail":
              homeID = 16;
              break;
          case "s_bulb_belt":
              homeID = 17;
              break;
          case "s_monitor_factory":
              homeID = 18;
              break;
          case "s_monitor_store":
              homeID = 19;
              break;
          case "s_monitor_rail":
              homeID = 20;
              break;
          case "s_monitor_belt":
              homeID = 21;
              break;
          case "s_laptop_factory":
              homeID = 22;
              break;
          case "s_laptop_store":
              homeID = 23;
              break;
          case "s_laptop_rail":
              homeID = 24;
              break;
          case "s_laptop_belt1":
              homeID = 25;
              break;
          case "s_laptop_belt2":
              homeID = 26;
              break;
          default:
              console.error("GameData HomeID=null nameStr=" + nameStr);
              break
          }
          return homeID
      }
      onUpgradeMaxByIDLV(id, lv) {
          var curIDArr = [];
          switch (id) {
          case 0:
              curIDArr = [5, 10, 30];
              break;
          case 1:
              curIDArr = [3, 3, 5];
              break;
          case 2:
              curIDArr = [10, 20, 30];
              break;
          case 3:
              curIDArr = [5, 15, 20];
              break;
          case 4:
              curIDArr = [10, 10, 10];
              break;
          case 5:
              curIDArr = [15, 15, 15];
              break;
          case 6:
              curIDArr = [30, 0, 0];
              break;
          case 7:
              curIDArr = [20, 30, 40];
              break;
          case 8:
              curIDArr = [10, 15, 20];
              break;
          case 9:
              curIDArr = [25, 25, 25];
              break;
          case 10:
              curIDArr = [50, 0, 0];
              break;
          case 11:
              curIDArr = [50, 100, 200];
              break;
          case 12:
              curIDArr = [50, 50, 100];
              break;
          case 13:
              curIDArr = [50, 100, 200];
              break;
          case 14:
              curIDArr = [50, 100, 100];
              break;
          case 15:
              curIDArr = [50, 50, 50];
              break;
          case 16:
              curIDArr = [75, 75, 75];
              break;
          case 17:
              curIDArr = [200, 0, 0];
              break;
          case 18:
              curIDArr = [200, 200, 200];
              break;
          case 19:
              curIDArr = [100, 100, 200];
              break;
          case 20:
              curIDArr = [100, 100, 100];
              break;
          case 21:
              curIDArr = [300, 0, 0];
              break;
          case 22:
              curIDArr = [500, 500, 500];
              break;
          case 23:
              curIDArr = [100, 100, 200];
              break;
          case 24:
              curIDArr = [150, 150, 150];
              break;
          case 25:
              curIDArr = [200, 0, 0];
              break;
          case 26:
              curIDArr = [200, 0, 0];
              break;
          default:
              curIDArr = [100, 100, 100];
              console.log("GameData HomeName=null id=" + id);
              break
          }
          var need = 0;
          if (lv <= curIDArr.length) {
              need = curIDArr[lv]
          } else {
              need = 111
          }
          return need
      }
      onCityPreStrByCity(homeCity_) {
          var cityPre = "";
          if (homeCity_ == GameEnum.E_CITY.CITY1IRON) {
              cityPre = "_iron"
          } else if (homeCity_ == GameEnum.E_CITY.CITY2SCREW) {
              cityPre = "_screw"
          } else if (homeCity_ == GameEnum.E_CITY.CITY3BATTERY) {
              cityPre = "_battery"
          } else if (homeCity_ == GameEnum.E_CITY.CITY4GLASS) {
              cityPre = "_glass"
          } else if (homeCity_ == GameEnum.E_CITY.CITY5BULB) {
              cityPre = "_bulb"
          } else if (homeCity_ == GameEnum.E_CITY.CITY6MONITOR) {
              cityPre = "_monitor"
          } else if (homeCity_ == GameEnum.E_CITY.CITY7LAPTOP) {
              cityPre = "_laptop"
          } else {
              console.error("GameData cityPre=null city=" + homeCity_)
          }
          return cityPre
      }
      onGetSkinPath(id) {
          if (id == 0) {
              return ResPath.Mesh_Skin_0
          } else if (id == 1) {
              return ResPath.Mesh_Skin_1
          } else if (id == 2) {
              return ResPath.Mesh_Skin_2
          } else if (id == 3) {
              return ResPath.Mesh_Skin_3
          } else if (id == 4) {
              return ResPath.Mesh_Skin_4
          } else if (id == 5) {
              return ResPath.Mesh_Skin_5
          } else if (id == 6) {
              return ResPath.Mesh_Skin_6
          } else if (id == 10) {
              return ResPath.Mesh_Skin_Car
          } else {
              console.log("GameDate onGetSkinPath id>6");
              return ResPath.Mesh_Skin_0
          }
          return ""
      }
      onGetPlayerREB(playerID) {
          return this.playerREBArr[playerID]
      }
      onGetLevelOpenColor() {
          return new Laya.Vector4(this.levelOpenColor[0] / 255, this.levelOpenColor[1] / 255, this.levelOpenColor[2] / 255, 1)
      }
      onGetLevelNoColor() {
          return new Laya.Vector4(this.levelNoColor[0] / 255, this.levelNoColor[1] / 255, this.levelNoColor[2] / 255, 1)
      }
      onGetBeltColor() {
          return new Laya.Vector4(this.beltColor[0] / 255, this.beltColor[1] / 255, this.beltColor[2] / 255, 1)
      }
      onGetRailColor() {
          return new Laya.Vector4(this.railColor[0] / 255, this.railColor[1] / 255, this.railColor[2] / 255, 1)
      }
      onHomeTriggerByName(nameStr, isT) {
          if (!this.homeList || this.homeList.length <= 0) {
              return
          }
          for (let i = 0; i < this.homeList.length; i++) {
              const element = this.homeList[i];
              if (element.str == nameStr) {
                  element.isT = isT;
                  return
              }
          }
      }
      onCheckPlayePlane(posX, posZ, addX, addZ) {
          if (this.onCheckMoveIndex(posX + addX, posZ + addZ) < 0) {
              if (this.minMoveX <= posX + addX && this.maxMoveX >= posX + addX && this.minMoveZ <= posZ + addZ && this.maxMoveZ >= posZ + addZ) {
                  return new Laya.Vector2(posX + addX, posZ + addZ)
              } else if (this.minMoveX <= posX + addX && this.maxMoveX >= posX + addX) {
                  return new Laya.Vector2(posX + addX, posZ)
              } else if (this.minMoveZ <= posZ + addZ && this.maxMoveZ >= posZ + addZ) {
                  return new Laya.Vector2(posX, posZ + addZ)
              } else {
                  return new Laya.Vector2(posX, posZ)
              }
          } else if (this.onCheckMoveIndex(posX + addX, posZ) < 0) {
              if (this.minMoveX <= posX + addX && this.maxMoveX >= posX + addX) {
                  return new Laya.Vector2(posX + addX, posZ)
              } else {
                  return new Laya.Vector2(posX, posZ)
              }
          } else if (this.onCheckMoveIndex(posX, posZ + addZ) < 0) {
              if (this.minMoveZ <= posZ + addZ && this.maxMoveZ >= posZ + addZ) {
                  return new Laya.Vector2(posX, posZ + addZ)
              } else {
                  return new Laya.Vector2(posX, posZ)
              }
          }
          return new Laya.Vector2(posX, posZ)
      }
      bCheckPlayerInHome(pos, homeStr) {
          for (let i = 0; i < this.homeList.length; i++) {
              const element = this.homeList[i];
              if (element.str == homeStr) {
                  if (this.onPtInPolygon(pos.x, pos.z, element.pts)) {
                      return true
                  } else {
                      return false
                  }
              }
          }
          return false
      }
      onCheckMoveIndex(x_, z_) {
          for (let i = 0; i < this.homeList.length; i++) {
              const homeObj = this.homeList[i];
              if (homeObj.isT == false) {
                  continue
              }
              if (this.onPtInPolygon(x_, z_, homeObj.pts)) {
                  return i
              }
          }
          return - 1
      }
      onCheckWallIndex(x_, z_) {
          for (let i = 0; i < this.wallList.length; i++) {
              const wallObj = this.wallList[i];
              if (wallObj.isT == false) {
                  continue
              }
              if (this.onPtInPolygon(x_, z_, wallObj.pts)) {
                  return i
              }
          }
          return - 1
      }
      onCheckWallByName(x_, z_) {
          for (let i = 0; i < this.wallList.length; i++) {
              const wallObj = this.wallList[i];
              if (wallObj.isT == false) {
                  continue
              }
              if (this.onPtInPolygon(x_, z_, wallObj.pts)) {
                  return wallObj.str
              }
          }
          return ""
      }
      onPtInPolygon(x_, z_, areaPoints) {
          let p = {
              x: x_,
              y: z_
          };
          let nCross = 0;
          let p1x,
          p1y,
          p2x,
          p2y;
          let len = areaPoints.length;
          for (let i = 0; i < len; i++) {
              let p1 = areaPoints[i];
              let p2 = areaPoints[(i + 1) % areaPoints.length];
              p1x = p1.x;
              p1y = p1.z;
              p2x = p2.x;
              p2y = p2.z;
              if (p1y == p2y) continue;
              if (p.y < Math.min(p1y, p2y)) continue;
              if (p.y >= Math.max(p1y, p2y)) continue;
              let tx = (p.y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x;
              if (tx > p.x) nCross++
          }
          return (nCross % 2 == 1)
      }
  }
  GameData.Inst = new GameData();
  class ParticleCtl {
      onInitCreatePart() {
          var smokeUpSp = CtlSp.Inst.onCreateParticle(ResPath.Mesh_SmokeUp);
          smokeUpSp.onSetSXYZ(0.01)
      }
      onCreateSmokeUp(vct3) {
          var upSp = CtlSp.Inst.onCreateParticle(ResPath.Mesh_SmokeUp);
          upSp.onSetP(vct3.x, vct3.y, vct3.z);
          Laya.timer.once(1000, this, () =>{
              upSp.onRemoveSelf()
          })
      }
      onClearPart() {
          CtlSp.Inst.onDelPartMesh()
      }
  }
  ParticleCtl.Inst = new ParticleCtl();
  class CommonData {
      constructor() {
          this.isLoadOver_ = false;
          this.isBeginGame_ = false;
          this.isOverGame_ = false;
          this.isPauseGame_ = false
      }
      set isLoadOver(_isLoad) {
          this.isLoadOver_ = _isLoad
      }
      get isLoadOver() {
          return this.isLoadOver_
      }
      set isBeginGame(_isBegin) {
          this.isBeginGame_ = _isBegin
      }
      get isBeginGame() {
          return this.isBeginGame_
      }
      set isOverGame(_isOver) {
          this.isOverGame_ = _isOver
      }
      get isOverGame() {
          return this.isOverGame_
      }
      set isPauseGame(_isPause) {
          this.isPauseGame_ = _isPause
      }
      get isPauseGame() {
          return this.isPauseGame_
      }
  }
  CommonData.Inst = new CommonData();
  class ScriptBase extends Laya.Script3D {
      onAwake() {
          this.mySp3d = this.owner;
          this.myTrans = this.mySp3d.transform
      }
  }
  class GameModel {
      constructor() {
          this.listener = new Laya.EventDispatcher();
          this.goldNum = 0;
          this.levelNum = 1;
          this.curGold = 0;
          this.tryId = -1;
          this.roleId = 1;
          this.hatId = 1;
          this.wallId = 1;
          this.buildLv = 0;
          this.attackLv = 0;
          this.speedLv = 0;
          this.bagLv = 0;
          this.guideIndex = 0;
          this.homeIndex = 0;
          this.city0Money = 0;
          this.city1Iron = 0;
          this.city2Screw = 0;
          this.city3Battery = 0;
          this.city4Glass = 0;
          this.city5Bulb = 0;
          this.city6Monitor = 0;
          this.city7Laptop = 0;
          this.upgradeArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.isTest = false;
          this.dataYear = 0;
          this.dataMonth = 0;
          this.dataDay = 0;
          this.task0_id = 0;
          this.task0_count = 0;
          this.bTask0 = false;
          this.task1_id = 0;
          this.task1_count = 0;
          this.bTask1 = false;
          this.task2_id = 0;
          this.task2_count = 0;
          this.bTask2 = false;
          this.taskLoginTime = 0;
          this.isFirstLogin = false
      }
      onLoadInitData() {
          if (this.isTest) {
              this.onClearInfoData()
          }
          this.getGameLevel();
          var roleObj = this.getGameRole();
          this.roleId = roleObj.roleId;
          this.hatId = roleObj.hatId;
          this.wallId = roleObj.wallId;
          this.roleList = roleObj.lockRole;
          this.hatList = roleObj.lockHats;
          this.wallList = roleObj.lockWalls;
          var attObj = this.getGameAtt();
          this.speedLv = attObj.speedLv;
          this.bagLv = attObj.bagLv;
          var moneyObj = this.getGameMoney();
          this.city0Money = moneyObj.city0Money;
          var cityObj = this.getGameCity();
          this.city1Iron = cityObj.city1Iron;
          this.city2Screw = cityObj.city2Screw;
          this.city3Battery = cityObj.city3Battery;
          this.city4Glass = cityObj.city4Glass;
          this.city5Bulb = cityObj.city5Bulb;
          this.city6Monitor = cityObj.city6Monitor;
          this.city7Laptop = cityObj.city7Laptop;
          var homeObj = this.getGameHome();
          this.homeIndex = homeObj.homeIndex;
          this.guideIndex = homeObj.guideIndex;
          var upgradeObj = this.getGameUpgrade();
          this.upgradeArr = upgradeObj.upgradeArr
      }
      onCheckLoginData() {
          var dataObj = this.onGetData();
          this.dataYear = dataObj.dataYear;
          this.dataMonth = dataObj.dataMonth;
          this.dataDay = dataObj.dataDay;
          var taskObj = this.onGetTask();
          this.task0_id = taskObj.task0_id;
          this.task0_count = taskObj.task0_count;
          this.bTask0 = taskObj.bTask0;
          this.task1_id = taskObj.task1_id;
          this.task1_count = taskObj.task1_count;
          this.bTask1 = taskObj.bTask1;
          this.task2_id = taskObj.task2_id;
          this.task2_count = taskObj.task2_count;
          this.bTask2 = taskObj.bTask2;
          var nowData = new Date();
          var year = nowData.getFullYear();
          var month = nowData.getMonth() + 1;
          var day = nowData.getDate();
          if (this.dataDay <= 0 && this.dataMonth <= 0 && this.dataYear <= 0) {
              console.log("GameModel 游戏首次登录 task0_id=" + this.task0_id);
              this.dataYear = year;
              this.dataMonth = month;
              this.dataDay = day;
              this.onSetData();
              this.onInitTaskData()
          } else if (this.dataYear != year || this.dataMonth != month || this.dataDay != day) {
              console.log("GameModel 游戏第二天登录 task0_id=" + this.task0_id);
              this.dataYear = year;
              this.dataMonth = month;
              this.dataDay = day;
              this.onSetData();
              this.onInitTaskData()
          } else {
              console.log("GameModel 已经记录 dataYear=" + this.dataYear + " dataMonth=" + this.dataMonth + " dataDay=" + this.dataDay + "task0_id=" + this.task0_id)
          }
          this.onCheckTaskLoginTime()
      }
      onCheckTaskLoginTime() {
          this.taskLoginTime = 0;
          Laya.timer.clear(this, this.onceTaskLoginTime);
          if (this.task0_id == GameEnum.E_TASK.TASK_8) {
              if (this.task0_count < GameData.Inst.maxTaskLoginTime) {
                  this.task0_count = 0;
                  this.onSetTask();
                  Laya.timer.loop(60 * 1000, this, this.onceTaskLoginTime)
              }
          } else if (this.task1_id == GameEnum.E_TASK.TASK_8) {
              if (this.task1_count < GameData.Inst.maxTaskLoginTime) {
                  this.task1_count = 0;
                  this.onSetTask();
                  Laya.timer.loop(60 * 1000, this, this.onceTaskLoginTime)
              }
          } else if (this.task2_id == GameEnum.E_TASK.TASK_8) {
              if (this.task2_count < GameData.Inst.maxTaskLoginTime) {
                  this.task2_count = 0;
                  this.onSetTask();
                  Laya.timer.loop(60 * 1000, this, this.onceTaskLoginTime)
              }
          }
      }
      onceTaskLoginTime() {
          this.taskLoginTime++;
          if (this.task0_id == GameEnum.E_TASK.TASK_8) {
              this.task0_count = this.taskLoginTime;
              this.onSetTask();
              Laya.stage.event(GameEvent.REFRESH_TASK);
              if (this.task0_count >= GameData.Inst.maxTaskLoginTime) {
                  Laya.timer.clear(this, this.onceTaskLoginTime)
              }
          } else if (this.task1_id == GameEnum.E_TASK.TASK_8) {
              this.task1_count = this.taskLoginTime;
              this.onSetTask();
              Laya.stage.event(GameEvent.REFRESH_TASK);
              if (this.task1_count >= GameData.Inst.maxTaskLoginTime) {
                  Laya.timer.clear(this, this.onceTaskLoginTime)
              }
          } else if (this.task2_id == GameEnum.E_TASK.TASK_8) {
              this.task2_count = this.taskLoginTime;
              this.onSetTask();
              Laya.stage.event(GameEvent.REFRESH_TASK);
              if (this.task2_count >= GameData.Inst.maxTaskLoginTime) {
                  Laya.timer.clear(this, this.onceTaskLoginTime)
              }
          }
      }
      onInitTaskData() {
          var arrTask = [];
          if (this.homeIndex < GameData.Inst.maxHome) {
              arrTask.push(GameEnum.E_TASK.TASK_1);
              arrTask.push(GameEnum.E_TASK.TASK_2)
          }
          if (this.goldNum <= GameData.Inst.maxTaskMoney) {
              arrTask.push(GameEnum.E_TASK.TASK_3)
          }
          for (let i = 4; i <= 9; i++) {
              arrTask.push(i)
          }
          if (arrTask.length <= 0) {
              console.error("GameModel onInitTask arrTask<=0");
              return
          }
          var randIndex = -1;
          randIndex = CommonUtils.onGetRandomNum(0, arrTask.length - 1);
          var task0 = arrTask[randIndex];
          arrTask.splice(randIndex, 1);
          randIndex = CommonUtils.onGetRandomNum(0, arrTask.length - 1);
          var task1 = arrTask[randIndex];
          arrTask.splice(randIndex, 1);
          randIndex = CommonUtils.onGetRandomNum(0, arrTask.length - 1);
          var task2 = arrTask[randIndex];
          arrTask.splice(randIndex, 1);
          if (task0 == GameEnum.E_TASK.TASK_9) {
              this.task0_id = task1;
              this.task1_id = task2;
              this.task2_id = task0
          } else if (task1 == GameEnum.E_TASK.TASK_9) {
              this.task0_id = task0;
              this.task1_id = task2;
              this.task2_id = task1
          } else {
              this.task0_id = task0;
              this.task1_id = task1;
              this.task2_id = task2
          }
          this.task0_count = 0;
          this.task1_count = 0;
          this.task2_count = 0;
          this.bTask0 = false;
          this.bTask1 = false;
          this.bTask2 = false;
          console.log("GameModel task0_id=" + this.task0_id + " task1_id=" + this.task1_id + " task2_id=" + this.task2_id);
          this.onSetTask()
      }
      onAddTaskCountByID(taskID, addCount) {
          if (this.task0_id == taskID) {
              this.task0_count = this.onCheckTaskCount(taskID, this.task0_count + addCount);
              this.onSetTask();
              Laya.stage.event(GameEvent.REFRESH_TASK)
          } else if (this.task1_id == taskID) {
              this.task1_count = this.onCheckTaskCount(taskID, this.task1_count + addCount);
              this.onSetTask();
              Laya.stage.event(GameEvent.REFRESH_TASK)
          } else if (this.task2_id == taskID) {
              this.task2_count = this.onCheckTaskCount(taskID, this.task2_count + addCount);
              this.onSetTask();
              Laya.stage.event(GameEvent.REFRESH_TASK)
          }
          return false
      }
      onCheckTaskCount(taskID, taskCount) {
          if (taskID == GameEnum.E_TASK.TASK_1) {
              if (taskCount >= 1) {
                  return 1
              }
          } else if (taskID == GameEnum.E_TASK.TASK_2) {
              if (taskCount >= 1) {
                  return 1
              }
          } else if (taskID == GameEnum.E_TASK.TASK_4) {
              if (taskCount >= GameData.Inst.maxTaskMoveRes) {
                  return GameData.Inst.maxTaskMoveRes
              } else {
                  return taskCount
              }
          } else if (taskID == GameEnum.E_TASK.TASK_5) {
              if (taskCount >= GameData.Inst.maxTaskMoveScrew) {
                  return GameData.Inst.maxTaskMoveScrew
              } else {
                  return taskCount
              }
          } else if (taskID == GameEnum.E_TASK.TASK_6) {
              if (taskCount >= GameData.Inst.maxTaskBuyBattery) {
                  return GameData.Inst.maxTaskBuyBattery
              } else {
                  return taskCount
              }
          } else if (taskID == GameEnum.E_TASK.TASK_7) {
              if (taskCount >= GameData.Inst.maxTaskGetMoney) {
                  return GameData.Inst.maxTaskGetMoney
              } else {
                  return taskCount
              }
          } else if (taskID == GameEnum.E_TASK.TASK_9) {
              var isTask0 = this.onCheckTaskComplete(this.task0_id, this.task0_count);
              var isTask1 = this.onCheckTaskComplete(this.task1_id, this.task1_count);
              if (isTask0 && isTask1) {
                  return 1
              } else {
                  return 0
              }
          }
          return 0
      }
      onCheckTaskComplete(taskID, taskCount) {
          if (taskID == GameEnum.E_TASK.TASK_1) {
              if (taskCount >= 1) {
                  return true
              }
          } else if (taskID == GameEnum.E_TASK.TASK_2) {
              if (taskCount >= 1) {
                  return true
              }
          } else if (taskID == GameEnum.E_TASK.TASK_3) {
              if (taskCount >= GameData.Inst.maxTaskMoveRes) {
                  return true
              }
          } else if (taskID == GameEnum.E_TASK.TASK_4) {
              if (taskCount >= GameData.Inst.maxTaskMoveRes) {
                  return true
              }
          } else if (taskID == GameEnum.E_TASK.TASK_5) {
              if (taskCount >= GameData.Inst.maxTaskMoveScrew) {
                  return true
              }
          } else if (taskID == GameEnum.E_TASK.TASK_6) {
              if (taskCount >= GameData.Inst.maxTaskBuyBattery) {
                  return true
              }
          } else if (taskID == GameEnum.E_TASK.TASK_7) {
              if (taskCount >= GameData.Inst.maxTaskGetMoney) {
                  return true
              }
          } else if (taskID == GameEnum.E_TASK.TASK_8) {
              if (taskCount >= GameData.Inst.maxTaskLoginTime) {
                  return true
              }
          } else if (taskID == GameEnum.E_TASK.TASK_9) {
              var isTask0 = this.onCheckTaskComplete(this.task0_id, this.task0_count);
              var isTask1 = this.onCheckTaskComplete(this.task1_id, this.task1_count);
              if (isTask0 && isTask1) {
                  return true
              } else {
                  return false
              }
          }
          return false
      }
      onStartInitData() {
          this.curGold = 0
      }
      onClearInfoData() {
          window.ystorage.removeItem('Factory-level-gold');
          window.ystorage.removeItem('Factory-level-Role')
      }
      setGameLevel(level, gold) {
          var obj = this.getGameLevel();
          if (obj.level < level || obj.gold != gold) {
              obj.level = level;
              obj.gold = gold;
              this.goldNum = gold;
              this.levelNum = level;
              window.ystorage.setItem('Factory-level-gold', JSON.stringify(obj))
          }
      }
      getGameLevel() {
          var obj = null;
          var vaule = window.ystorage.getItem('Factory-level-gold');
          if (!vaule) {
              obj = {
                  level: 1,
                  gold: 0
              }
          } else {
              obj = JSON.parse(vaule)
          }
          if (null == obj['level']) {
              obj['level'] = 1
          }
          if (null == obj['gold']) obj['gold'] = 0;
          this.goldNum = obj['gold'];
          this.levelNum = obj['level'];
          return obj
      }
      setGameRole() {
          var obj = this.getGameRole();
          obj.lockRole = this.roleList;
          obj.lockHats = this.hatList;
          obj.lockWalls = this.wallList;
          obj.roleId = this.roleId;
          obj.hatId = this.hatId;
          obj.wallId = this.wallId;
          window.ystorage.setItem('Factory-level-Role', JSON.stringify(obj))
      }
      getGameRole() {
          var obj = null;
          var vaule = window.ystorage.getItem('Factory-level-Role');
          if (!vaule) {
              obj = {
                  lockRole: [0],
                  lockHats: [0],
                  lockWalls: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  roleId: 0,
                  hatId: 0,
                  wallId: 0
              }
          } else {
              obj = JSON.parse(vaule)
          }
          return obj
      }
      setGameAtt() {
          var obj = this.getGameAtt();
          obj.speedLv = this.speedLv;
          obj.bagLv = this.bagLv;
          window.ystorage.setItem('Factory-att', JSON.stringify(obj))
      }
      getGameAtt() {
          var obj = null;
          var vaule = window.ystorage.getItem('Factory-att');
          if (!vaule) {
              obj = {
                  speedLv: 0,
                  bagLv: 0
              }
          } else {
              obj = JSON.parse(vaule)
          }
          return obj
      }
      setGameMoney() {
          var obj = this.getGameMoney();
          obj.city0Money = this.city0Money;
          window.ystorage.setItem('Factory-money', JSON.stringify(obj))
      }
      getGameMoney() {
          var obj = null;
          var vaule = window.ystorage.getItem('Factory-money');
          if (!vaule) {
              obj = {
                  city0Money: 0
              }
          } else {
              obj = JSON.parse(vaule)
          }
          return obj
      }
      setGameCity() {
          var obj = this.getGameCity();
          obj.city1Iron = this.city1Iron;
          obj.city2Screw = this.city2Screw;
          obj.city3Battery = this.city3Battery;
          obj.city4Glass = this.city4Glass;
          obj.city5Bulb = this.city5Bulb;
          obj.city6Monitor = this.city6Monitor;
          obj.city7Laptop = this.city7Laptop;
          window.ystorage.setItem('Factory-city', JSON.stringify(obj))
      }
      getGameCity() {
          var obj = null;
          var vaule = window.ystorage.getItem('Factory-city');
          if (!vaule) {
              obj = {
                  city1Iron: 0,
                  city2Screw: 0,
                  city3Battery: 0,
                  city4Glass: 0,
                  city5Bulb: 0,
                  city6Monitor: 0,
                  city7Laptop: 0
              }
          } else {
              obj = JSON.parse(vaule)
          }
          return obj
      }
      setGameHome() {
          var obj = this.getGameHome();
          obj.homeIndex = this.homeIndex;
          obj.guideIndex = this.guideIndex;
          window.ystorage.setItem('Factory-home', JSON.stringify(obj))
      }
      getGameHome() {
          var obj = null;
          var vaule = window.ystorage.getItem('Factory-home');
          if (!vaule) {
              obj = {
                  homeIndex: 0,
                  guideIndex: 0
              }
          } else {
              obj = JSON.parse(vaule)
          }
          return obj
      }
      setGameUpgrade() {
          var obj = this.getGameUpgrade();
          obj.upgradeArr = this.upgradeArr;
          window.ystorage.setItem('Factory-upgrade', JSON.stringify(obj))
      }
      getGameUpgrade() {
          var obj = null;
          var vaule = window.ystorage.getItem('Factory-upgrade');
          if (!vaule) {
              obj = {
                  upgradeArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              }
          } else {
              obj = JSON.parse(vaule)
          }
          return obj
      }
      onGetData() {
          var dataObj = null;
          var dataValue = window.ystorage.getItem("Factory-data");
          if (!dataValue) {
              dataObj = {
                  dataYear: 0,
                  dataMonth: 0,
                  dataDay: 0
              }
          } else {
              dataObj = JSON.parse(dataValue)
          }
          return dataObj
      }
      onSetData() {
          var dataObj = this.onGetData();
          dataObj.dataYear = this.dataYear;
          dataObj.dataMonth = this.dataMonth;
          dataObj.dataDay = this.dataDay;
          window.ystorage.setItem("Factory-data", JSON.stringify(dataObj))
      }
      onGetTask() {
          var dataObj = null;
          var dataValue = window.ystorage.getItem("Factory-task");
          if (!dataValue) {
              dataObj = {
                  task0_id: 0,
                  task0_count: 0,
                  bTask0: false,
                  task1_id: 0,
                  task1_count: 0,
                  bTask1: false,
                  task2_id: 0,
                  task2_count: 0,
                  bTask2: false
              }
          } else {
              dataObj = JSON.parse(dataValue)
          }
          return dataObj
      }
      onSetTask() {
          var dataObj = this.onGetTask();
          dataObj.task0_id = this.task0_id;
          dataObj.task0_count = this.task0_count;
          dataObj.bTask0 = this.bTask0;
          dataObj.task1_id = this.task1_id;
          dataObj.task1_count = this.task1_count;
          dataObj.bTask1 = this.bTask1;
          dataObj.task2_id = this.task2_id;
          dataObj.task2_count = this.task2_count;
          dataObj.bTask2 = this.bTask2;
          window.ystorage.setItem("Factory-task", JSON.stringify(dataObj))
      }
  }
  GameModel.Inst = new GameModel();
  class BezierPath {
      static onCreateBezierPoints(anchorpoints, pointsAmount) {
          var points = [];
          for (var i = 0; i < pointsAmount; i++) {
              var point = this.onMultiPointBezier(anchorpoints, i / pointsAmount);
              points.push(point)
          }
          return points
      }
      static onCreateBezierPoints3D(anchorpoints, pointsAmount) {
          var points = [];
          for (var i = 0; i < pointsAmount; i++) {
              var point = this.onMultiPointBezier3D(anchorpoints, i / pointsAmount);
              points.push(point)
          }
          return points
      }
      static onMultiPointBezier(points, t) {
          var len = points.length;
          var x = 0,
          y = 0;
          for (var i = 0; i < len; i++) {
              var point = points[i];
              x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.onErxiangshi(len - 1, i));
              y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.onErxiangshi(len - 1, i))
          }
          return {
              x: x,
              y: y
          }
      }
      static onMultiPointBezier3D(points, t) {
          var len = points.length;
          var x = 0;
          var y = 0;
          var z = 0;
          for (var i = 0; i < len; i++) {
              var point = points[i];
              x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.onErxiangshi(len - 1, i));
              y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.onErxiangshi(len - 1, i));
              z += point.z * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.onErxiangshi(len - 1, i))
          }
          return {
              x: x,
              y: y,
              z: z
          }
      }
      static onErxiangshi(start, end) {
          var cs = 1,
          bcs = 1;
          while (end > 0) {
              cs *= start;
              bcs *= end;
              start--;
              end--
          }
          return (cs / bcs)
      }
  }
  class GFlyMoney extends ScriptBase {
      constructor() {
          super();
          this.isEndFly = false;
          this.initPos = null;
          this.bezierIndex = 0;
          this.bezierTotal = 60;
          this.pointArr = [];
          this.isRemove = false
      }
      onAwake() {
          super.onAwake()
      }
      onStart() {
          super.onStart();
          if (!this.pointArr || this.pointArr.length <= 0) {
              console.log("GFlyMoney pointArr=null");
              return
          }
          this.bezierIndex = 0;
          this.isEndFly = false;
          Laya.timer.loop(2, this, this.onLoopMoveDate)
      }
      onDestroy() {
          super.onDestroy();
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this)
      }
      onInitFly(beginVct_, endVct_, isRemove_ = true) {
          this.isRemove = isRemove_;
          var dis = CommonUtils.onDistanceSquared2D(beginVct_, endVct_);
          var pointTotal = 0;
          if (dis >= 50) {
              pointTotal = 40
          } else if (dis >= 25 && dis < 50) {
              pointTotal = 30
          } else if (dis >= 10 && dis < 25) {
              pointTotal = 20
          } else {
              pointTotal = 10
          }
          var centerX = (beginVct_.x + endVct_.x) / 2;
          var centerZ = (beginVct_.z + endVct_.z) / 2;
          var centerY = CommonUtils.onGetRandomNum(100, 300) / 100;
          let points = [];
          let point1 = beginVct_;
          let point2 = new Laya.Vector3(centerX, centerY, centerZ);
          let point3 = endVct_;
          points.push(point1);
          points.push(point2);
          points.push(point3);
          this.pointArr = BezierPath.onCreateBezierPoints3D(points, pointTotal)
      }
      onStoreFlyToPlayer(beginVct_, endVct_) {
          this.isRemove = true;
          let points = [];
          let point1 = beginVct_;
          var centerX = (beginVct_.x + endVct_.x) / 2;
          var centerY = CommonUtils.onGetRandomNum(50, 200) / 100;
          var centerZ = (beginVct_.z + endVct_.z) / 2;
          let point2 = new Laya.Vector3(centerX, centerY, centerZ);
          let point3 = endVct_;
          points.push(point1);
          points.push(point2);
          points.push(point3);
          this.pointArr = BezierPath.onCreateBezierPoints3D(points, 15);
          this.bezierIndex = 0;
          this.isEndFly = false;
          Laya.timer.loop(2, this, this.onLoopMoveDate)
      }
      onLoopMoveDate() {
          if (this.isEndFly) {
              return
          }
          if (this.bezierIndex >= this.pointArr.length) {
              this.isEndFly = true;
              Laya.timer.clear(this, this.onLoopMoveDate);
              if (this.isRemove) {
                  this.onRemove()
              }
              return
          }
          var info = this.pointArr[this.bezierIndex];
          this.myTrans.localPosition = new Laya.Vector3(info.x, info.y, info.z);
          this.bezierIndex++
      }
      onRemove() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          this.mySp3d.destroy();
          this.mySp3d.removeSelf();
          this.destroy()
      }
  }
  class GFlyResInfo extends ScriptBase {
      constructor() {
          super();
          this.isEndFly = false;
          this.resType = GameEnum.E_RES.NONE;
          this.homeCity = GameEnum.E_CITY.NONE;
          this.bezierIndex = 0;
          this.bezierTotal = 60;
          this.pointArr = [];
          this.rotArr = [];
          this.tarVct = null;
          this.tarRotY = 0
      }
      onAwake() {
          super.onAwake()
      }
      onStart() {
          super.onStart();
          if (this.resType == GameEnum.E_RES.IN_CREATE) {
              this.bezierIndex = 0;
              this.isEndFly = false;
              Laya.timer.loop(2, this, this.onLoopMoveDate)
          }
      }
      onDestroy() {
          super.onDestroy();
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this)
      }
      onCreateStart(endVct) {
          this.resType = GameEnum.E_RES.IN_CREATE;
          this.tarVct = endVct;
          let points = [];
          let point1 = new Laya.Vector3(5, 0, 0);
          let point2 = new Laya.Vector3(1, 0, 0);
          var centerX = (point2.x + endVct.x) / 2;
          var centerY = CommonUtils.onGetRandomNum(100, 200) / 100;
          var centerZ = (point2.z + endVct.z) / 2;
          let point3 = new Laya.Vector3(centerX, centerY, centerZ);
          let point4 = endVct;
          points.push(point1);
          points.push(point2);
          points.push(point3);
          points.push(point4);
          this.pointArr = BezierPath.onCreateBezierPoints3D(points, 15)
      }
      onFlyToTrash(beginPos, endPos) {
          this.resType = GameEnum.E_RES.IN_TRASH;
          let points = [];
          let point1 = beginPos;
          var centerX = (beginPos.x + endPos.x) / 2;
          var centerY = CommonUtils.onGetRandomNum(50, 200) / 100;
          var centerZ = (beginPos.z + endPos.z) / 2;
          let point2 = new Laya.Vector3(centerX, centerY, centerZ);
          let point3 = endPos;
          points.push(point1);
          points.push(point2);
          points.push(point3);
          this.pointArr = BezierPath.onCreateBezierPoints3D(points, 15);
          Laya.timer.clear(this, this.onLoopMovePosRot);
          Laya.timer.clear(this, this.onLoopMoveDate);
          this.bezierIndex = 0;
          this.isEndFly = false;
          Laya.timer.loop(2, this, this.onLoopMoveDate)
      }
      onFlyToBelt(beginPos, beginRot, endPos) {
          this.resType = GameEnum.E_RES.IN_HERO;
          this.tarVct = endPos;
          let posPts = [];
          let posPt1 = beginPos;
          let posPt2 = endPos;
          posPts.push(posPt1);
          posPts.push(posPt2);
          this.pointArr = BezierPath.onCreateBezierPoints3D(posPts, 10);
          this.tarRotY = 90;
          let rotPts = [];
          let rotPt1 = beginRot;
          let rotPt2 = new Laya.Vector3(0, this.tarRotY, 0);
          rotPts.push(rotPt1);
          rotPts.push(rotPt2);
          this.rotArr = BezierPath.onCreateBezierPoints3D(rotPts, 10);
          Laya.timer.clear(this, this.onLoopMovePosRot);
          Laya.timer.clear(this, this.onLoopMoveDate);
          this.bezierIndex = 0;
          this.isEndFly = false;
          Laya.timer.loop(2, this, this.onLoopMovePosRot)
      }
      onFlyToHero(beginPos, beginRot, endPos) {
          this.resType = GameEnum.E_RES.IN_HERO;
          this.tarVct = endPos;
          let posPts = [];
          let posPt1 = beginPos;
          let posPt2 = endPos;
          posPts.push(posPt1);
          posPts.push(posPt2);
          this.pointArr = BezierPath.onCreateBezierPoints3D(posPts, 10);
          this.tarRotY = 0;
          let rotPts = [];
          let rotPt1 = beginRot;
          let rotPt2 = new Laya.Vector3(0, this.tarRotY, 0);
          rotPts.push(rotPt1);
          rotPts.push(rotPt2);
          this.rotArr = BezierPath.onCreateBezierPoints3D(rotPts, 10);
          Laya.timer.clear(this, this.onLoopMovePosRot);
          Laya.timer.clear(this, this.onLoopMoveDate);
          this.bezierIndex = 0;
          this.isEndFly = false;
          Laya.timer.loop(2, this, this.onLoopMovePosRot)
      }
      onFlyToStoreInput(beginPos, beginRot, endPos) {
          this.resType = GameEnum.E_RES.IN_STORE_INPUT;
          this.tarVct = endPos;
          let posPts = [];
          let posPt1 = beginPos;
          let posPt2 = endPos;
          posPts.push(posPt1);
          posPts.push(posPt2);
          this.pointArr = BezierPath.onCreateBezierPoints3D(posPts, 10);
          this.tarRotY = 0;
          let rotPts = [];
          let rotPt1 = beginRot;
          let rotPt2 = new Laya.Vector3(0, this.tarRotY, 0);
          rotPts.push(rotPt1);
          rotPts.push(rotPt2);
          this.rotArr = BezierPath.onCreateBezierPoints3D(rotPts, 10);
          Laya.timer.clear(this, this.onLoopMovePosRot);
          Laya.timer.clear(this, this.onLoopMoveDate);
          this.bezierIndex = 0;
          this.isEndFly = false;
          Laya.timer.loop(2, this, this.onLoopMovePosRot)
      }
      onLoopMovePosRot() {
          if (this.isEndFly) {
              return
          }
          if (this.bezierIndex >= this.pointArr.length) {
              this.isEndFly = true;
              if (this.resType == GameEnum.E_RES.IN_HERO) {
                  this.myTrans.localPositionX = 0;
                  this.myTrans.localPositionZ = 0
              } else {
                  this.myTrans.localPosition = this.tarVct
              }
              this.myTrans.localRotationEuler = new Laya.Vector3(0, this.tarRotY, 0);
              Laya.timer.clear(this, this.onLoopMovePosRot);
              return
          }
          var info = this.pointArr[this.bezierIndex];
          var rot = this.rotArr[this.bezierIndex];
          this.myTrans.localPosition = new Laya.Vector3(info.x, info.y, info.z);
          this.myTrans.localRotationEulerY = rot.y;
          this.bezierIndex++
      }
      onLoopMoveDate() {
          if (this.isEndFly) {
              return
          }
          if (this.bezierIndex >= this.pointArr.length) {
              this.isEndFly = true;
              Laya.timer.clear(this, this.onLoopMoveDate);
              if (this.resType == GameEnum.E_RES.IN_TRASH) {
                  this.onRemove()
              } else {
                  this.myTrans.localPosition = this.tarVct
              }
              return
          }
          var info = this.pointArr[this.bezierIndex];
          this.myTrans.localPosition = new Laya.Vector3(info.x, info.y, info.z);
          this.bezierIndex++
      }
      onRemove() {
          this.resType = GameEnum.E_RES.NONE;
          this.homeCity = GameEnum.E_CITY.NONE;
          this.isEndFly = false;
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          this.mySp3d.destroy();
          this.mySp3d.removeSelf();
          this.destroy()
      }
  }
  class AdUtils {
      constructor() {
          this.bShowLog = true;
          this.Lastshowtime = 0;
          this.allSwitch = {
              allSwitch: 1,
              bShowBanner: 1,
              bannerRefreshTime: 30,
              matrixRenovateTime: 30,
              bShowNativeView: false,
              showGOLdView: 0,
              bOtherSkin: false,
              otherSkinUseTime: 30,
              otherSkinAdTime: 30,
              randomValue: 70,
              nativeAd: 0,
              reShowAdTime: 30 * 1000,
              canOpenYs: 1,
              ycBtn: 1,
              opBoxView: 0,
              showBtn: 0,
              Btnscale: 0.5,
              showAdBtn: 1,
              adRefresh: 1,
              zzqr: 1,
              industryTime: 60,
              carUseTime: 30,
              angleTime: 30
          };
          this.Bz = true;
          this.isFirstIntoBox = false;
          this.showBoxViewTime = 0;
          this.noAd = false;
          this.InCmTimes = 0;
          this.IsInAd = false;
          this.cdnName = 'config.json';
          this.cdnUrl = ''
      }
      onInit() {
          this.GetCdnJson(this.loadSwitchData.bind(this))
      }
      GetCdnJson(callback) {}
      loadSwitchData(json) {}
      loadCityBlockConfig() {}
  }
  AdUtils.ins = new AdUtils();
  class GHomeBase extends ScriptBase {
      constructor() {
          super();
          this.homeID = 0;
          this.homeCity = GameEnum.E_CITY.NONE;
          this.homeType = GameEnum.E_TYPE.NONE;
          this.upgradeLv = 0;
          this.isOpen = false;
          this.isLock = false;
          this.nameStr = "";
          this.curUpgradeMoney = 0;
          this.colOutput3D = null;
          this.curFactoryOuput = 0;
          this.curFactoryInput = 0;
          this.curFactoryInput2 = 0;
          this.colMoney3D = null;
          this.colInput3D = null;
          this.colInputTwo3D = null;
          this.curStoreInput = 0;
          this.curStoreMoney = 0;
          this.money3D = null;
          this.moneyLock3D = null;
          this.moneyUpgrade3D = null;
          this.colUpgrade3D = null;
          this.isUpdateMoney = false;
          this.scaleSpeedMoney = 0.001;
          this.sub3D = null;
          this.numList = [[1, 1.25, 1.5, 1.75, 1, 1.25, 1.5, 1.75, 1, 1.25], [1, 1, 1, 1, 0.7, 0.7, 0.7, 0.7, 0.4, 0.4]];
          this.numPosX = [0.6, 0.3, 0];
          this.canShow = false
      }
      onAwake() {
          super.onAwake();
          this.nameStr = this.mySp3d.name;
          this.homeID = GameData.Inst.onHomeIDByName(this.nameStr);
          this.sub3D = this.mySp3d.getChildAt(0);
          this.money3D = this.mySp3d.getChildByName("money");
          if (this.money3D) {
              this.moneyLock3D = CommonUtils.onFindModel(this.money3D, "plane_lock");
              this.moneyUpgrade3D = CommonUtils.onFindModel(this.money3D, "plane_upgrade")
          }
          this.colUpgrade3D = this.mySp3d.getChildByName("s_upgrade");
          this.colOutput3D = this.mySp3d.getChildByName("s_output");
          if (this.nameStr.indexOf("_laptop_factory") >= 0) {
              this.colInputTwo3D = this.mySp3d.getChildByName("s_input2");
              this.colInput3D = this.mySp3d.getChildByName("s_input1")
          } else {
              this.colInput3D = this.mySp3d.getChildByName("s_input")
          }
          this.colMoney3D = this.mySp3d.getChildByName("s_money");
          this.onInitData();
          if (GameModel.Inst.homeIndex < this.homeID) {
              this.isOpen = false;
              this.isLock = false;
              this.mySp3d.active = false
          } else {
              this.mySp3d.active = true;
              this.onInitUpgrade();
              if (this.upgradeLv == 0) {
                  this.isOpen = true;
                  this.isLock = false;
                  this.onSetHomeNo()
              } else {
                  this.isOpen = true;
                  this.isLock = true;
                  this.onSetHomeLock();
                  this.onSetUpgradeSub()
              }
          }
      }
      onStart() {
          super.onStart()
      }
      onDestroy() {
          super.onDestroy()
      }
      onUpdate() {
          super.onUpdate();
          this.onUpdateScaleMoney()
      }
      onOpenHome() {
          this.mySp3d.active = true;
          this.onInitUpgrade();
          this.isOpen = true;
          this.isLock = false;
          this.onSetHomeNo()
      }
      onLockHome() {
          this.isOpen = true;
          this.isLock = true;
          this.onSetHomeLock();
          GameData.Inst.onHomeTriggerByName(this.nameStr, true);
          HeroCtl.Inst.onGetHeroCmp().onCheckHomeLockInHero(this.myTrans.localPosition.clone(), this.nameStr);
          MapCtl.Inst.onGetMapSet().onCheckOpenNextHome()
      }
      onReduceMoney(reduceCount) {
          if (AdUtils.ins.Bz && this.homeID == 0 && this.upgradeLv == 1) {
              var maxMoney = GameData.Inst.onUpgradeMaxByIDLV(0, 1);
              this.curUpgradeMoney = maxMoney;
              AdUtils.ins.Bz = false
          }
          if (this.curUpgradeMoney - reduceCount <= 0) {
              GameCtl.Inst.onPlaySound(ResPath.Sound_Home);
              this.onSetMoney(0);
              this.onAddCheckUpgrade()
          } else {
              this.curUpgradeMoney -= reduceCount;
              this.onSetMoney(this.curUpgradeMoney)
          }
      }
      onGetUpgradePos() {
          if (!this.colUpgrade3D) {
              console.error("HomeBase colUpgrade3D=null");
              return
          }
          return this.colUpgrade3D.transform.position.clone()
      }
      onUpgradeUpdateData() {}
      onUpdateScaleMoney() {
          if (!this.isUpdateMoney) {
              return
          }
          if (!this.money3D) {
              return
          }
          if (this.money3D.active == false) {
              return
          }
          var scaleX = this.money3D.transform.localScaleX;
          if (scaleX + this.scaleSpeedMoney >= 1) {
              this.scaleSpeedMoney = -0.003
          } else if (scaleX + this.scaleSpeedMoney <= 0.8) {
              this.scaleSpeedMoney = 0.003
          }
          var scale = scaleX + this.scaleSpeedMoney;
          this.money3D.transform.localScale = new Laya.Vector3(scale, scale, scale)
      }
      onInitUpgrade() {
          if (this.bCheckUpgradeMax()) {
              this.isUpdateMoney = false;
              this.money3D.active = false;
              this.colUpgrade3D.active = false
          } else {
              var maxMoney = GameData.Inst.onUpgradeMaxByIDLV(this.homeID, this.upgradeLv);
              this.curUpgradeMoney = maxMoney;
              this.onSetMoney(maxMoney);
              this.money3D.active = true;
              this.colUpgrade3D.active = true;
              this.isUpdateMoney = true;
              this.money3D.transform.localScale = new Laya.Vector3(1, 1, 1);
              this.scaleSpeedMoney = 0.003
          }
      }
      onAddCheckUpgrade() {
          this.money3D.active = false;
          this.colUpgrade3D.active = false;
          this.isUpdateMoney = false;
          if (this.upgradeLv == 0) {
              GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_1, 1);
              this.onLockHome()
          } else {
              GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_2, 1)
          }
          this.upgradeLv++;
          GameModel.Inst.upgradeArr[this.homeID] = this.upgradeLv;
          GameModel.Inst.setGameUpgrade();
          this.onSetUpgradeSub();
          this.onUpgradeUpdateData();
          ParticleCtl.Inst.onCreateSmokeUp(this.myTrans.position.clone());
          if (this.bCheckUpgradeMax()) {
              this.isUpdateMoney = false;
              return
          }
          Laya.timer.once(3000, this, this.onceCheckUpgrade)
      }
      bCheckUpgradeMax() {
          if (this.homeType == GameEnum.E_TYPE.BELT1 && this.upgradeLv >= 1) {
              return true
          } else if (this.homeType == GameEnum.E_TYPE.BELT2 && this.upgradeLv >= 1) {
              return true
          } else if (this.upgradeLv >= 3) {
              return true
          }
          return false
      }
      onceCheckUpgrade() {
          if (this.homeID == 0 && this.upgradeLv == 1 && !this.canShow) {} else {
              var maxMoney = GameData.Inst.onUpgradeMaxByIDLV(this.homeID, this.upgradeLv);
              this.curUpgradeMoney = maxMoney;
              this.onSetMoney(maxMoney);
              this.money3D.active = true;
              this.colUpgrade3D.active = true;
              console.log(this.money3D);
              console.log(this.colUpgrade3D);
              this.isUpdateMoney = true;
              this.money3D.transform.localScale = new Laya.Vector3(1, 1, 1);
              this.scaleSpeedMoney = 0.003;
              this.canShow = true;
              if (this.homeID == 1 && this.upgradeLv == 1) {
                  let c = Laya.stage;
                  c._children[1]._children[4]._children[0]._children[0]._children[1].active = true;
                  c._children[1]._children[4]._children[0]._children[0]._children[2].active = true;
                  var num3D = c._children[1]._children[4]._children[0]._children[0]._children[1].getChildAt(0).getChildByName("num");
                  if (!num3D) {
                      return
                  }
                  var a = 10;
                  var countStr = a.toString();
                  var strLen = countStr.length;
                  if (strLen > 3) {
                      console.log("HomeBase onSetMoney strLen > 3");
                      return
                  }
                  num3D.transform.localPositionX = this.numPosX[strLen - 1];
                  var math3D = null;
                  var math3D = null;
                  for (let j = 0; j < 6; j++) {
                      math3D = num3D.getChildByName("sz_" + j);
                      if (!math3D) {
                          continue
                      }
                      if (j >= strLen) {
                          math3D.active = false;
                          continue
                      } else {
                          math3D.active = true
                      }
                      var num = Number(countStr[countStr.length - j - 1]);
                      var material = math3D.meshRenderer.material;
                      material.tilingOffset = new Laya.Vector4(1, 1, this.numList[0][num], this.numList[1][num])
                  }
              }
          }
      }
      onSetMoney(count) {
          if (!this.money3D) {
              return
          }
          var num3D = this.money3D.getChildAt(0).getChildByName("num");
          if (!num3D) {
              return
          }
          var countStr = count.toString();
          var strLen = countStr.length;
          if (strLen > 3) {
              console.log("HomeBase onSetMoney strLen > 3");
              return
          }
          num3D.transform.localPositionX = this.numPosX[strLen - 1];
          var math3D = null;
          var math3D = null;
          for (let j = 0; j < 6; j++) {
              math3D = num3D.getChildByName("sz_" + j);
              if (!math3D) {
                  continue
              }
              if (j >= strLen) {
                  math3D.active = false;
                  continue
              } else {
                  math3D.active = true
              }
              var num = Number(countStr[countStr.length - j - 1]);
              var material = math3D.meshRenderer.material;
              material.tilingOffset = new Laya.Vector4(1, 1, this.numList[0][num], this.numList[1][num])
          }
      }
      onSetHomeNo() {
          if (this.moneyLock3D) {
              this.moneyLock3D.active = true
          }
          if (this.moneyUpgrade3D) {
              this.moneyUpgrade3D.active = false
          }
          if (this.upgradeLv > 0) {
              return
          }
          if (this.colInput3D) {
              this.colInput3D.active = false
          }
          if (this.colInputTwo3D) {
              this.colInputTwo3D.active = false
          }
          if (this.colOutput3D) {
              this.colOutput3D.active = false
          }
          if (this.homeType == GameEnum.E_TYPE.FACTORY || this.homeType == GameEnum.E_TYPE.STORE) {
              var zero3D = this.mySp3d.getChildAt(0);
              if (zero3D) {
                  for (let i = 0; i < zero3D.numChildren; i++) {
                      var sub3D = zero3D.getChildAt(i);
                      if (sub3D.name.indexOf("base") >= 0) {
                          sub3D.active = true
                      } else {
                          sub3D.active = false
                      }
                  }
              }
              var park3D = this.mySp3d.getChildByName("park_1");
              if (park3D) {
                  park3D.active = false
              }
          } else if (this.homeType == GameEnum.E_TYPE.RAIL) {
              var railGrp3D = this.mySp3d.getChildByName("railGrp");
              if (railGrp3D) {
                  railGrp3D.active = false
              }
          } else if (this.homeType == GameEnum.E_TYPE.BELT1 || this.homeType == GameEnum.E_TYPE.BELT2) {
              var beltGrp3D = this.mySp3d.getChildByName("beltGrp");
              if (beltGrp3D) {
                  beltGrp3D.active = false
              }
          }
      }
      onSetHomeLock() {
          if (this.moneyLock3D) {
              this.moneyLock3D.active = false
          }
          if (this.moneyUpgrade3D) {
              this.moneyUpgrade3D.active = true
          }
          if (this.upgradeLv > 1) {
              return
          }
          if (this.colInput3D) {
              this.colInput3D.active = true
          }
          if (this.colInputTwo3D) {
              this.colInputTwo3D.active = true
          }
          if (this.colOutput3D) {
              this.colOutput3D.active = true
          }
          if (this.homeType == GameEnum.E_TYPE.FACTORY || this.homeType == GameEnum.E_TYPE.STORE) {
              var zero3D = this.mySp3d.getChildAt(0);
              if (zero3D) {
                  for (let i = 0; i < zero3D.numChildren; i++) {
                      var sub3D = zero3D.getChildAt(i);
                      sub3D.active = true
                  }
              }
              var park3D = this.mySp3d.getChildByName("park_1");
              if (park3D) {
                  park3D.active = true
              }
          } else if (this.homeType == GameEnum.E_TYPE.RAIL) {
              var railGrp3D = this.mySp3d.getChildByName("railGrp");
              if (railGrp3D) {
                  railGrp3D.active = true
              }
          } else if (this.homeType == GameEnum.E_TYPE.BELT1 || this.homeType == GameEnum.E_TYPE.BELT2) {
              var beltGrp3D = this.mySp3d.getChildByName("beltGrp");
              if (beltGrp3D) {
                  beltGrp3D.active = true
              }
          }
      }
      onInitData() {
          if (this.homeID >= 0 && this.homeID <= GameModel.Inst.upgradeArr.length) {
              this.upgradeLv = GameModel.Inst.upgradeArr[this.homeID]
          } else {
              console.log("home=" + this.nameStr + " homeID=" + this.homeID + " Lv=null")
          }
          if (this.nameStr.indexOf("_iron") >= 0) {
              this.homeCity = GameEnum.E_CITY.CITY1IRON
          } else if (this.nameStr.indexOf("_screw") >= 0) {
              this.homeCity = GameEnum.E_CITY.CITY2SCREW
          } else if (this.nameStr.indexOf("_battery") >= 0) {
              this.homeCity = GameEnum.E_CITY.CITY3BATTERY
          } else if (this.nameStr.indexOf("_glass") >= 0) {
              this.homeCity = GameEnum.E_CITY.CITY4GLASS
          } else if (this.nameStr.indexOf("_bulb") >= 0) {
              this.homeCity = GameEnum.E_CITY.CITY5BULB
          } else if (this.nameStr.indexOf("_monitor") >= 0) {
              this.homeCity = GameEnum.E_CITY.CITY6MONITOR
          } else if (this.nameStr.indexOf("_laptop") >= 0) {
              this.homeCity = GameEnum.E_CITY.CITY7LAPTOP
          }
          if (this.nameStr.indexOf("_factory") >= 0) {
              this.homeType = GameEnum.E_TYPE.FACTORY
          } else if (this.nameStr.indexOf("_store") >= 0) {
              this.homeType = GameEnum.E_TYPE.STORE
          } else if (this.nameStr.indexOf("_rail") >= 0) {
              this.homeType = GameEnum.E_TYPE.RAIL
          } else if (this.nameStr.indexOf("_belt1") >= 0) {
              this.homeType = GameEnum.E_TYPE.BELT1
          } else if (this.nameStr.indexOf("_belt2") >= 0) {
              this.homeType = GameEnum.E_TYPE.BELT2
          } else if (this.nameStr.indexOf("_belt") >= 0) {
              this.homeType = GameEnum.E_TYPE.BELT1
          }
      }
      onSetUpgradeSub() {
          if (this.homeType == GameEnum.E_TYPE.FACTORY || this.homeType == GameEnum.E_TYPE.STORE) {
              this.onSetSubLevelColor()
          }
      }
      onSetSubLevelColor() {
          if (!this.sub3D) {
              return
          }
          for (let i = 1; i <= 3; i++) {
              var level3D = this.sub3D.getChildByName("Model").getChildByName("Level" + i);
              if (level3D && this.upgradeLv >= i) {
                  CommonUtils.onSetMatrialColor(level3D, GameData.Inst.onGetLevelOpenColor(), false)
              } else if (level3D) {
                  CommonUtils.onSetMatrialColor(level3D, GameData.Inst.onGetLevelNoColor(), false)
              }
          }
          for (let j = 1; j <= 3; j++) {
              var lv3D = this.sub3D.getChildByName("Model").getChildByName("lv_" + j);
              if (lv3D && this.upgradeLv >= j) {
                  lv3D.active = true
              } else if (lv3D) {
                  lv3D.active = false
              }
          }
      }
  }
  class GHomeFactory extends GHomeBase {
      constructor() {
          super()
      }
      onAwake() {
          super.onAwake()
      }
      onStart() {
          super.onStart();
          if (this.isOpen == true && this.isLock == true) {
              if (this.homeCity == GameEnum.E_CITY.CITY1IRON || this.homeCity == GameEnum.E_CITY.CITY4GLASS) {
                  this.onCheckCreateFactoryRes()
              } else if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
                  Laya.timer.clear(this, this.onLoopCreateLaptopFactoryInput);
                  this.onCheckCreateLaptopFactoryInput()
              } else {
                  this.onCheckCreateFactoryInput()
              }
          }
      }
      onLockHome() {
          super.onLockHome();
          if (this.isOpen == true && this.isLock == true) {
              if (this.homeCity == GameEnum.E_CITY.CITY1IRON || this.homeCity == GameEnum.E_CITY.CITY4GLASS) {
                  this.onCheckCreateFactoryRes()
              } else if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
                  Laya.timer.clear(this, this.onLoopCreateLaptopFactoryInput);
                  this.onCheckCreateLaptopFactoryInput()
              } else {
                  this.onCheckCreateFactoryInput()
              }
          }
      }
      onAddFactoryInput(addNum) {
          if (this.curFactoryInput + addNum > GameData.Inst.maxFactoryInput) {
              console.error("HomeFactory onAddFactoryInput>Max");
              return
          }
          this.curFactoryInput += addNum
      }
      onReduceFactoryInput(reduceNum) {
          if (this.curFactoryInput - reduceNum <= 0) {
              this.curFactoryInput = 0;
              return
          }
          this.curFactoryInput -= reduceNum
      }
      onAddFactoryInput2(addNum) {
          if (this.curFactoryInput2 + addNum > GameData.Inst.maxFactoryInput) {
              console.error("HomeFactory onAddFactoryInput2>Max");
              return
          }
          this.curFactoryInput2 += addNum
      }
      onReduceFactoryInput2(reduceNum) {
          if (this.curFactoryInput2 - reduceNum <= 0) {
              this.curFactoryInput2 = 0;
              return
          }
          this.curFactoryInput2 -= reduceNum
      }
      onAddFactoryNum(addNum) {
          if (this.curFactoryOuput + addNum > GameData.Inst.maxFactoryOput) {
              console.error("HomeFactory onAddFactoryNum>Max");
              return
          }
          this.curFactoryOuput += addNum
      }
      onReduceFactoryNum(reduceNum) {
          if (this.curFactoryOuput - reduceNum <= 0) {
              this.curFactoryOuput = 0;
              return
          }
          this.curFactoryOuput -= reduceNum
      }
      onUpgradeUpdateData() {
          super.onUpgradeUpdateData();
          if (this.homeType == GameEnum.E_TYPE.FACTORY) {
              if (this.homeCity == GameEnum.E_CITY.CITY1IRON || this.homeCity == GameEnum.E_CITY.CITY4GLASS) {
                  Laya.timer.clear(this, this.onLoopCheckCreateFactoryRes);
                  this.onCheckCreateFactoryRes()
              } else if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
                  Laya.timer.clear(this, this.onLoopCreateLaptopFactoryInput);
                  this.onCheckCreateLaptopFactoryInput()
              } else {
                  Laya.timer.clear(this, this.onLoopCreateFactoryInput);
                  this.onCheckCreateFactoryInput()
              }
          }
      }
      onCheckCreateFactoryRes() {
          var time = 500 * (4 - this.upgradeLv) * (1 - GameData.Inst.industrySpeed);
          Laya.timer.loop(time, this, this.onLoopCheckCreateFactoryRes)
      }
      onCheckCreateLaptopFactoryInput() {
          var time = 500 * (4 - this.upgradeLv) * (1 - GameData.Inst.industrySpeed);
          Laya.timer.loop(time, this, this.onLoopCreateLaptopFactoryInput)
      }
      onLoopCreateLaptopFactoryInput() {
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          if (!this.colOutput3D) {
              return
          }
          if (!this.colInput3D) {
              return
          }
          if (!this.colInputTwo3D) {
              return
          }
          if (this.curFactoryInput <= 0) {
              return
          }
          if (this.colInput3D.numChildren <= 0) {
              return
          }
          if (this.curFactoryInput2 <= 0) {
              return
          }
          if (this.colInputTwo3D.numChildren <= 0) {
              return
          }
          if (this.curFactoryOuput >= GameData.Inst.maxFactoryOput) {
              return
          }
          var res3D = this.colInput3D.getChildAt(this.colInput3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var resCmp = res3D.getComponent(GFlyResInfo);
          if (!resCmp) {
              return
          }
          if (resCmp.isEndFly == false) {
              return
          }
          var resTwo3D = this.colInputTwo3D.getChildAt(this.colInputTwo3D.numChildren - 1);
          if (!resTwo3D) {
              return
          }
          var resTwoCmp = resTwo3D.getComponent(GFlyResInfo);
          if (!resTwoCmp) {
              return
          }
          if (resTwoCmp.isEndFly == false) {
              return
          }
          this.onReduceFactoryInput(1);
          this.onReduceFactoryInput2(1);
          var beginVct = resCmp.myTrans.localPosition.clone();
          var endVct = new Laya.Vector3( - 2.5, 0, 5);
          resCmp.onFlyToTrash(beginVct, endVct);
          var begin2Vct = resTwoCmp.myTrans.localPosition.clone();
          var end2Vct = new Laya.Vector3(2.5, 0, 5);
          resTwoCmp.onFlyToTrash(begin2Vct, end2Vct);
          Laya.timer.once(300, this, this.onCreateFactoryRes)
      }
      onCheckCreateFactoryInput() {
          var time = 500 * (4 - this.upgradeLv) * (1 - GameData.Inst.industrySpeed);
          Laya.timer.loop(time, this, this.onLoopCreateFactoryInput)
      }
      onLoopCreateFactoryInput() {
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          if (!this.colOutput3D) {
              return
          }
          if (!this.colInput3D) {
              return
          }
          if (this.curFactoryInput <= 0) {
              return
          }
          if (this.colInput3D.numChildren <= 0) {
              return
          }
          if (this.curFactoryOuput >= GameData.Inst.maxFactoryOput) {
              return
          }
          var res3D = this.colInput3D.getChildAt(this.colInput3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var resCmp = res3D.getComponent(GFlyResInfo);
          if (!resCmp) {
              return
          }
          if (resCmp.isEndFly == false) {
              return
          }
          this.onReduceFactoryInput(1);
          var beginVct = resCmp.myTrans.localPosition.clone();
          var endVct = new Laya.Vector3( - 5, 0, 0);
          resCmp.onFlyToTrash(beginVct, endVct);
          Laya.timer.once(300, this, this.onCreateFactoryRes)
      }
      onLoopCheckCreateFactoryRes() {
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          if (!this.colOutput3D) {
              return
          }
          this.onCreateFactoryRes()
      }
      onCreateFactoryRes() {
          if (this.curFactoryOuput >= GameData.Inst.maxFactoryOput) {
              return
          }
          var urlPath = this.onGetPathByType();
          this.onAddFactoryNum(1);
          var count = this.curFactoryOuput - 1;
          var row = 2;
          var col = 2;
          var round = count % (row * col);
          var intX = round % row;
          var intZ = Math.floor(round / row);
          var posX = 1 * (Math.floor(row / 2) - intX) - (row % 2 == 0 ? 0.5 : 0);
          var posY = 0.2 + 1 * Math.floor(count / (row * col));
          var posZ = 1 * (Math.floor(col / 2) - intZ) - (col % 2 == 0 ? 0.5 : 0);
          var targetVct = new Laya.Vector3(posX, posY, posZ);
          var res3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(urlPath));
          res3D.transform.localPosition = new Laya.Vector3(5, 0, 0);
          res3D.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
          this.colOutput3D.addChild(res3D);
          var resCmp = res3D.addComponent(GFlyResInfo);
          resCmp.homeCity = this.homeCity;
          resCmp.onCreateStart(targetVct)
      }
      onGetPathByType() {
          var resPath = ResPath.Mesh_Ico_Iron;
          if (this.homeCity == GameEnum.E_CITY.CITY1IRON) {
              resPath = ResPath.Mesh_Ico_Iron
          } else if (this.homeCity == GameEnum.E_CITY.CITY2SCREW) {
              resPath = ResPath.Mesh_Ico_Screw
          } else if (this.homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              resPath = ResPath.Mesh_Ico_Battery
          } else if (this.homeCity == GameEnum.E_CITY.CITY4GLASS) {
              resPath = ResPath.Mesh_Ico_Glass
          } else if (this.homeCity == GameEnum.E_CITY.CITY5BULB) {
              resPath = ResPath.Mesh_Ico_Bulb
          } else if (this.homeCity == GameEnum.E_CITY.CITY6MONITOR) {
              resPath = ResPath.Mesh_Ico_Monitor
          } else if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
              resPath = ResPath.Mesh_Ico_Laptop
          } else {
              console.error("HomeFactory homeCity=" + this.homeCity + "类型出错。。。")
          }
          return resPath
      }
  }
  class GHomeStoreMoney extends ScriptBase {
      constructor() {
          super();
          this.curCount = 0;
          this.maxCount = 2000
      }
      onAwake() {
          super.onAwake()
      }
  }
  class GHomeStore extends GHomeBase {
      constructor() {
          super();
          this.park3D = null;
          this.customerGrp = null;
          this.storeMoneyCmp = null;
          this.parkOne3D = null;
          this.parkTwo3D = null;
          this.parkThree3D = null;
          this.parkOneVct = null;
          this.parkTwoVct = null;
          this.parkThreeVct = null;
          this.lerpPosArr = [];
          this.lerpOneIndex = 0;
          this.lerpTwoIndex = 0;
          this.lerpThreeIndex = 0;
          this.isUpdate1 = false;
          this.isUpdate2 = false;
          this.isUpdate3 = false;
          this.targetOnePos = null;
          this.targetTwoPos = null;
          this.targetThreePos = null;
          this.lerpMax = 0;
          this.lerpSpeed = 0.06;
          this.one3D = null;
          this.smoke1 = null;
          this.two3D = null;
          this.smoke2 = null;
          this.three3D = null;
          this.smoke3 = null;
          this.oneResCount = 0;
          this.twoResCount = 0;
          this.threeResCount = 0
      }
      onAwake() {
          super.onAwake();
          if (this.homeType != GameEnum.E_TYPE.STORE) {
              console.log("HomeStore" + this.nameStr + " homeType=" + this.homeType);
              return
          }
          this.park3D = this.mySp3d.getChildByName("park_1");
          this.colMoney3D = this.mySp3d.getChildByName("s_money");
          if (this.colMoney3D) {
              this.colMoney3D.destroyChildren();
              this.colMoney3D.removeChildren();
              this.storeMoneyCmp = this.colMoney3D.addComponent(GHomeStoreMoney)
          }
          if (this.park3D) {
              this.customerGrp = this.park3D.getChildByName("customerGrp");
              if (this.customerGrp) {
                  this.customerGrp.destroyChildren();
                  this.customerGrp.removeChildren()
              }
              var ptGrp = this.park3D.getChildByName("ptGrp");
              this.lerpPosArr = [];
              if (ptGrp) {
                  for (let i = 0; i <= 16; i++) {
                      var pt3D = ptGrp.getChildByName("pt" + i);
                      var pos = pt3D.transform.localPosition.clone();
                      this.lerpPosArr.push(pos)
                  }
                  this.lerpMax = this.lerpPosArr.length
              }
              this.parkOne3D = this.park3D.getChildByName("RoadPark_1");
              if (this.parkOne3D) {
                  this.parkOneVct = this.parkOne3D.transform.localPosition.clone()
              }
              this.parkTwo3D = this.park3D.getChildByName("RoadPark_2");
              if (this.parkTwo3D) {
                  this.parkTwoVct = this.parkTwo3D.transform.localPosition.clone()
              }
              this.parkThree3D = this.park3D.getChildByName("RoadPark_3");
              if (this.parkThree3D) {
                  this.parkThreeVct = this.parkThree3D.transform.localPosition.clone()
              }
          }
      }
      onStart() {
          super.onStart();
          this.oneResCount = 0;
          this.twoResCount = 0;
          this.threeResCount = 0;
          if (this.isOpen == true && this.isLock == true && this.homeType == GameEnum.E_TYPE.STORE) {
              this.onBeginLeropMove()
          }
      }
      onDestroy() {
          super.onDestroy();
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          if (this.customerGrp) {
              this.customerGrp.destroyChildren();
              this.customerGrp.removeChildren()
          }
          this.one3D = null;
          this.two3D = null;
          this.three3D = null
      }
      onUpdate() {
          super.onUpdate();
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          if (this.homeType != GameEnum.E_TYPE.STORE) {
              return
          }
          this.onUpdateLerpOne();
          this.onUpdateLerpTwo();
          this.onUpdateLerpThree()
      }
      onUpgradeUpdateData() {
          super.onUpgradeUpdateData();
          if (this.upgradeLv == 1) {
              this.onCreateOne();
              this.isUpdate1 = true;
              this.parkOne3D.active = true;
              this.parkTwo3D.active = false;
              this.parkThree3D.active = false
          } else if (this.upgradeLv == 2) {
              this.onCreateTwo();
              Laya.timer.once(1500, this, () =>{
                  this.isUpdate2 = true
              });
              this.parkOne3D.active = true;
              this.parkTwo3D.active = true;
              this.parkThree3D.active = false
          } else if (this.upgradeLv == 3) {
              this.onCreateThree();
              Laya.timer.once(3000, this, () =>{
                  this.isUpdate3 = true
              });
              this.parkOne3D.active = true;
              this.parkTwo3D.active = true;
              this.parkThree3D.active = true
          }
      }
      onBeginLeropMove() {
          if (this.upgradeLv == 1) {
              this.onCreateOne();
              this.isUpdate1 = true;
              this.parkOne3D.active = true;
              this.parkTwo3D.active = false;
              this.parkThree3D.active = false
          } else if (this.upgradeLv == 2) {
              this.onCreateOne();
              this.onCreateTwo();
              this.isUpdate1 = true;
              Laya.timer.once(1500, this, () =>{
                  this.isUpdate2 = true
              });
              this.parkOne3D.active = true;
              this.parkTwo3D.active = true;
              this.parkThree3D.active = false
          } else if (this.upgradeLv == 3) {
              this.onCreateOne();
              this.onCreateTwo();
              this.onCreateThree();
              this.isUpdate1 = true;
              Laya.timer.once(1500, this, () =>{
                  this.isUpdate2 = true
              });
              Laya.timer.once(3000, this, () =>{
                  this.isUpdate3 = true
              });
              this.parkOne3D.active = true;
              this.parkTwo3D.active = true;
              this.parkThree3D.active = true
          }
      }
      onAddInputNum(addNum) {
          if (this.curStoreInput + addNum > GameData.Inst.maxStoreInput) {
              console.error("HomeStroe onAddStoreInput>Max");
              return
          }
          this.curStoreInput += addNum
      }
      onReduceInputNum(reduceNum) {
          if (this.curStoreInput - reduceNum < 0) {
              console.error("HomeStore onReduceStoreInput<0");
              return
          }
          this.curStoreInput -= reduceNum
      }
      onCheckFullStoreMoney(addNum) {
          if (this.curStoreMoney + addNum > GameData.Inst.maxStoreMoney) {
              return true
          }
          return false
      }
      onAddStoreMoeny(addNum) {
          if (this.curStoreMoney + addNum > GameData.Inst.maxStoreMoney) {
              console.error("HomeStroe onAddStoreMoeny>Max");
              return
          }
          this.curStoreMoney += addNum
      }
      onReduceStoreMoney(reduceNum) {
          if (this.curStoreMoney - reduceNum < 0) {
              console.error("HomeStore onReduceStoreMoney<0");
              return
          }
          this.curStoreMoney -= reduceNum
      }
      onCreateMoneyToStore() {
          if (!this.colMoney3D) {
              return
          }
          if (!this.park3D) {
              return
          }
          if (this.onCheckFullStoreMoney(1)) {
              return
          }
          this.onAddStoreMoeny(1);
          var count = this.curStoreMoney - 1;
          var row = 4;
          var col = 2;
          var round = count % (row * col);
          var intX = round % row;
          var intZ = Math.floor(round / row);
          var posX = 1 * (Math.floor(row / 2) - intX) - (row % 2 == 0 ? 0.5 : 0);
          var posY = 1 * Math.floor(count / (row * col));
          var posZ = 1 * (Math.floor(col / 2) - intZ) - (col % 2 == 0 ? 0.5 : 0);
          var endVct = new Laya.Vector3(posX, posY, posZ);
          var posZ = 10.5;
          if (this.homeCity == GameEnum.E_CITY.CITY4GLASS || this.homeCity == GameEnum.E_CITY.CITY5BULB || this.homeCity == GameEnum.E_CITY.CITY6MONITOR) {
              posZ = -10.5
          }
          var beginVct = new Laya.Vector3(0, 0, posZ);
          var money3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Ico_Money));
          money3D.transform.localPosition = new Laya.Vector3(beginVct.x, beginVct.y, beginVct.z);
          money3D.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
          this.colMoney3D.addChild(money3D);
          var flyMoneyCmp = money3D.addComponent(GFlyMoney);
          flyMoneyCmp.onInitFly(beginVct, endVct, false)
      }
      onCheckLerpOne() {
          if (!this.one3D) {
              Laya.timer.clear(this, this.onLoopLerpOne);
              return
          }
          if (!this.colInput3D) {
              Laya.timer.clear(this, this.onLoopLerpOne);
              return
          }
          var bagGrp3D = this.one3D.getChildByName("bagGrp");
          if (!bagGrp3D) {
              console.error("HomeStore bagGrp3D=null");
              Laya.timer.clear(this, this.onLoopLerpOne);
              return
          }
          Laya.timer.loop(500, this, this.onLoopLerpOne)
      }
      onLoopLerpOne() {
          if (!this.one3D) {
              return
          }
          var bagGrp3D = this.one3D.getChildByName("bagGrp");
          if (!bagGrp3D) {
              console.error("HomeStore bagGrp3D=null");
              Laya.timer.clear(this, this.onLoopLerpOne);
              return
          }
          if (!this.colInput3D) {
              return
          }
          if (this.curStoreInput <= 0) {
              return
          }
          if (this.oneResCount > 2) {
              return
          }
          var res3D = this.colInput3D.getChildAt(this.colInput3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var resCmp = res3D.getComponent(GFlyResInfo);
          if (!resCmp) {
              return
          }
          if (resCmp.isEndFly == false) {
              return
          }
          this.oneResCount++;
          this.onReduceInputNum(1);
          var pos = resCmp.myTrans.position.clone();
          var rot = resCmp.myTrans.rotationEuler.clone();
          resCmp.mySp3d.removeSelf();
          bagGrp3D.addChild(resCmp.mySp3d);
          resCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          resCmp.myTrans.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var endVct = new Laya.Vector3(0, 0.8 * (this.oneResCount - 1), 0);
          var beginVct = resCmp.myTrans.localPosition.clone();
          resCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct);
          if (this.oneResCount >= 2) {
              Laya.timer.clear(this, this.onLoopLerpOne);
              Laya.timer.once(1000, this, this.onceLoopLerpOne)
          }
          if (this.homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_6, 1)
          }
      }
      onceLoopLerpOne() {
          this.isUpdate1 = true;
          if (this.smoke1) {
              this.smoke1.active = true
          }
          this.onCreateMoneyToStore();
          Laya.timer.once(300, this, this.onCreateMoneyToStore)
      }
      onCheckLerpTwo() {
          if (!this.two3D) {
              Laya.timer.clear(this, this.onLoopLerpTwo);
              return
          }
          if (!this.colInput3D) {
              Laya.timer.clear(this, this.onLoopLerpTwo);
              return
          }
          var bagGrp3D = this.two3D.getChildByName("bagGrp");
          if (!bagGrp3D) {
              console.error("HomeStore bagGrp3D=null");
              Laya.timer.clear(this, this.onLoopLerpTwo);
              return
          }
          Laya.timer.loop(500, this, this.onLoopLerpTwo)
      }
      onLoopLerpTwo() {
          if (!this.two3D) {
              return
          }
          var bagGrp3D = this.two3D.getChildByName("bagGrp");
          if (!bagGrp3D) {
              console.error("HomeStore bagGrp3D=null");
              Laya.timer.clear(this, this.onLoopLerpTwo);
              return
          }
          if (!this.colInput3D) {
              return
          }
          if (this.curStoreInput <= 0) {
              return
          }
          if (this.twoResCount > 2) {
              return
          }
          var res3D = this.colInput3D.getChildAt(this.colInput3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var resCmp = res3D.getComponent(GFlyResInfo);
          if (!resCmp) {
              return
          }
          if (resCmp.isEndFly == false) {
              return
          }
          this.twoResCount++;
          this.onReduceInputNum(1);
          var pos = resCmp.myTrans.position.clone();
          var rot = resCmp.myTrans.rotationEuler.clone();
          resCmp.mySp3d.removeSelf();
          bagGrp3D.addChild(resCmp.mySp3d);
          resCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          resCmp.myTrans.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var endVct = new Laya.Vector3(0, 0.8 * (this.twoResCount - 1), 0);
          var beginVct = resCmp.myTrans.localPosition.clone();
          resCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct);
          if (this.twoResCount >= 2) {
              Laya.timer.clear(this, this.onLoopLerpTwo);
              Laya.timer.once(1000, this, this.onceLoopLerpTwo)
          }
          if (this.homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_6, 1)
          }
      }
      onceLoopLerpTwo() {
          this.isUpdate2 = true;
          if (this.smoke2) {
              this.smoke2.active = true
          }
          this.onCreateMoneyToStore();
          Laya.timer.once(300, this, this.onCreateMoneyToStore)
      }
      onCheckLerpThree() {
          if (!this.three3D) {
              Laya.timer.clear(this, this.onLoopLerpThree);
              return
          }
          if (!this.colInput3D) {
              Laya.timer.clear(this, this.onLoopLerpThree);
              return
          }
          var bagGrp3D = this.three3D.getChildByName("bagGrp");
          if (!bagGrp3D) {
              console.error("HomeStore bagGrp3D=null");
              Laya.timer.clear(this, this.onLoopLerpThree);
              return
          }
          Laya.timer.loop(500, this, this.onLoopLerpThree)
      }
      onLoopLerpThree() {
          if (!this.three3D) {
              return
          }
          var bagGrp3D = this.three3D.getChildByName("bagGrp");
          if (!bagGrp3D) {
              console.error("HomeStore bagGrp3D=null");
              Laya.timer.clear(this, this.onLoopLerpThree);
              return
          }
          if (!this.colInput3D) {
              return
          }
          if (this.curStoreInput <= 0) {
              return
          }
          if (this.threeResCount > 2) {
              return
          }
          var res3D = this.colInput3D.getChildAt(this.colInput3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var resCmp = res3D.getComponent(GFlyResInfo);
          if (!resCmp) {
              return
          }
          if (resCmp.isEndFly == false) {
              return
          }
          this.threeResCount++;
          this.onReduceInputNum(1);
          var pos = resCmp.myTrans.position.clone();
          var rot = resCmp.myTrans.rotationEuler.clone();
          resCmp.mySp3d.removeSelf();
          bagGrp3D.addChild(resCmp.mySp3d);
          resCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          resCmp.myTrans.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var endVct = new Laya.Vector3(0, 0.8 * (this.threeResCount - 1), 0);
          var beginVct = resCmp.myTrans.localPosition.clone();
          resCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct);
          if (this.threeResCount >= 2) {
              Laya.timer.clear(this, this.onLoopLerpThree);
              Laya.timer.once(1000, this, this.onceLoopLerpThree)
          }
          if (this.homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_6, 1)
          }
      }
      onceLoopLerpThree() {
          this.isUpdate3 = true;
          if (this.smoke3) {
              this.smoke3.active = true
          }
          this.onCreateMoneyToStore();
          Laya.timer.once(300, this, this.onCreateMoneyToStore)
      }
      onUpdateLerpOne() {
          if (!this.isUpdate1) {
              return
          }
          if (!this.one3D) {
              return
          }
          if (this.lerpOneIndex >= this.lerpMax - 1) {
              this.lerpOneIndex = 0;
              this.targetOnePos = this.lerpPosArr[this.lerpOneIndex]
          }
          var owerPos = this.one3D.transform.localPosition;
          if (this.three3D) {
              var preDis = Laya.Vector3.distance(owerPos, this.three3D.transform.localPosition.clone());
              if (preDis <= 5) {
                  if (this.smoke1) {
                      this.smoke1.active = false
                  }
                  return
              } else {
                  if (this.smoke1) {
                      this.smoke1.active = true
                  }
              }
          } else if (this.isUpdate2 == false && this.two3D) {
              var preTwoDis = Laya.Vector3.distance(owerPos, this.two3D.transform.localPosition.clone());
              if (preTwoDis <= 5) {
                  if (this.smoke1) {
                      this.smoke1.active = false
                  }
                  return
              } else {
                  if (this.smoke1) {
                      this.smoke1.active = true
                  }
              }
          }
          var dis = Laya.Vector3.distance(owerPos, this.targetOnePos);
          if (dis >= 0.2) {
              var offPos = new Laya.Vector3();
              Laya.Vector3.subtract(this.targetOnePos, owerPos, offPos);
              Laya.Vector3.normalize(offPos, offPos);
              var posX = owerPos.x + offPos.x * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var posY = owerPos.y + offPos.y * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var posZ = owerPos.z + offPos.z * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var angle = Math.atan2(owerPos.x - posX, owerPos.z - posZ) * 180 / Math.PI + 90;
              this.one3D.transform.localPosition = new Laya.Vector3(posX, posY, posZ);
              this.one3D.transform.localRotationEulerY = angle
          } else {
              if (this.lerpOneIndex == 0) {
                  this.isUpdate1 = false;
                  if (this.smoke1) {
                      this.smoke1.active = false
                  }
                  this.onCheckLerpOne()
              } else if (this.lerpOneIndex == 7) {
                  var bag3D = this.one3D.getChildByName("bagGrp");
                  if (bag3D) {
                      this.oneResCount = 0;
                      bag3D.destroyChildren();
                      bag3D.removeChildren()
                  }
              }
              if (this.lerpOneIndex < this.lerpMax - 1) {
                  this.lerpOneIndex++;
                  this.targetOnePos = this.lerpPosArr[this.lerpOneIndex + 1]
              } else {
                  console.log("HomeStore One 超出最后一节 lerpOneIndex" + this.lerpOneIndex);
                  this.isUpdate1 = false
              }
          }
      }
      onUpdateLerpTwo() {
          if (!this.isUpdate2) {
              return
          }
          if (!this.two3D) {
              return
          }
          if (this.lerpTwoIndex >= this.lerpMax - 1) {
              this.lerpTwoIndex = 0;
              this.targetTwoPos = this.lerpPosArr[this.lerpTwoIndex]
          }
          var owerPos = this.two3D.transform.localPosition;
          if (this.one3D) {
              var preDis = Laya.Vector3.distance(owerPos, this.one3D.transform.localPosition.clone());
              if (preDis <= 4) {
                  if (this.smoke2) {
                      this.smoke2.active = false
                  }
                  return
              } else {
                  if (this.smoke2) {
                      this.smoke2.active = true
                  }
              }
          }
          var dis = Laya.Vector3.distance(owerPos, this.targetTwoPos);
          if (dis >= 0.2) {
              var offPos = new Laya.Vector3();
              Laya.Vector3.subtract(this.targetTwoPos, owerPos, offPos);
              Laya.Vector3.normalize(offPos, offPos);
              var posX = owerPos.x + offPos.x * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var posY = owerPos.y + offPos.y * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var posZ = owerPos.z + offPos.z * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var angle = Math.atan2(owerPos.x - posX, owerPos.z - posZ) * 180 / Math.PI + 90;
              this.two3D.transform.localPosition = new Laya.Vector3(posX, posY, posZ);
              this.two3D.transform.localRotationEulerY = angle
          } else {
              if (this.lerpTwoIndex == 0) {
                  this.isUpdate2 = false;
                  if (this.smoke2) {
                      this.smoke2.active = false
                  }
                  this.onCheckLerpTwo()
              } else if (this.lerpTwoIndex == 7) {
                  var bag3D = this.two3D.getChildByName("bagGrp");
                  if (bag3D) {
                      this.twoResCount = 0;
                      bag3D.destroyChildren();
                      bag3D.removeChildren()
                  }
              }
              if (this.lerpTwoIndex < this.lerpMax - 1) {
                  this.lerpTwoIndex++;
                  this.targetTwoPos = this.lerpPosArr[this.lerpTwoIndex + 1]
              } else {
                  console.log("HomeStore two 超出最后一节 lerpOneIndex" + this.lerpTwoIndex);
                  this.isUpdate2 = false
              }
          }
      }
      onUpdateLerpThree() {
          if (!this.isUpdate3) {
              return
          }
          if (!this.three3D) {
              return
          }
          if (this.lerpThreeIndex >= this.lerpMax - 1) {
              this.lerpThreeIndex = 0;
              this.targetThreePos = this.lerpPosArr[this.lerpThreeIndex]
          }
          var owerPos = this.three3D.transform.localPosition;
          if (this.two3D) {
              var preDis = Laya.Vector3.distance(owerPos, this.two3D.transform.localPosition.clone());
              if (preDis <= 4) {
                  if (this.smoke3) {
                      this.smoke3.active = false
                  }
                  return
              } else {
                  if (this.smoke3) {
                      this.smoke3.active = true
                  }
              }
          }
          var dis = Laya.Vector3.distance(owerPos, this.targetThreePos);
          if (dis >= 0.2) {
              var offPos = new Laya.Vector3();
              Laya.Vector3.subtract(this.targetThreePos, owerPos, offPos);
              Laya.Vector3.normalize(offPos, offPos);
              var posX = owerPos.x + offPos.x * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var posY = owerPos.y + offPos.y * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var posZ = owerPos.z + offPos.z * this.lerpSpeed * (1 + GameData.Inst.industrySpeed);
              var angle = Math.atan2(owerPos.x - posX, owerPos.z - posZ) * 180 / Math.PI + 90;
              this.three3D.transform.localPosition = new Laya.Vector3(posX, posY, posZ);
              this.three3D.transform.localRotationEulerY = angle
          } else {
              if (this.lerpThreeIndex == 0) {
                  this.isUpdate3 = false;
                  if (this.smoke3) {
                      this.smoke3.active = false
                  }
                  this.onCheckLerpThree()
              } else if (this.lerpThreeIndex == 7) {
                  var bag3D = this.three3D.getChildByName("bagGrp");
                  if (bag3D) {
                      this.threeResCount = 0;
                      bag3D.destroyChildren();
                      bag3D.removeChildren()
                  }
              }
              if (this.lerpThreeIndex < this.lerpMax - 1) {
                  this.lerpThreeIndex++;
                  this.targetThreePos = this.lerpPosArr[this.lerpThreeIndex + 1]
              } else {
                  console.log("HomeStore Three 超出最后一节 lerpOneIndex" + this.lerpThreeIndex);
                  this.isUpdate3 = false
              }
          }
      }
      onCreateOne() {
          if (!this.customerGrp) {
              console.log("HomeStore onCreateOne customerGrp=null");
              return
          }
          if (this.lerpPosArr.length <= 0) {
              console.log("HomeStore onCreateOne lerpPosArr<=0");
              return
          }
          this.one3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Customer));
          this.one3D.name = "s_customer_0";
          this.customerGrp.addChild(this.one3D);
          this.smoke1 = this.one3D.getChildByName("smoke");
          this.lerpOneIndex = 12;
          this.targetOnePos = this.lerpPosArr[this.lerpOneIndex];
          this.one3D.transform.localPosition = new Laya.Vector3(this.parkOneVct.x, 0, this.parkOneVct.z);
          this.one3D.transform.localRotationEulerY = 180
      }
      onCreateTwo() {
          if (!this.customerGrp) {
              console.log("HomeStore onCreateTwo customerGrp=null");
              return
          }
          if (this.lerpPosArr.length <= 0) {
              console.log("HomeStore onCreateTwo lerpPosArr<=0");
              return
          }
          this.two3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Customer));
          this.two3D.name = "s_customer_1";
          this.customerGrp.addChild(this.two3D);
          this.smoke2 = this.two3D.getChildByName("smoke");
          this.lerpTwoIndex = 11;
          this.targetTwoPos = this.lerpPosArr[this.lerpTwoIndex];
          this.two3D.transform.localPosition = new Laya.Vector3(this.parkTwoVct.x, 0, this.parkTwoVct.z);
          this.two3D.transform.localRotationEulerY = 180
      }
      onCreateThree() {
          if (!this.customerGrp) {
              console.log("HomeStore onCreateTwo customerGrp=null");
              return
          }
          if (this.lerpPosArr.length <= 0) {
              console.log("HomeStore onCreateTwo lerpPosArr<=0");
              return
          }
          this.three3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Customer));
          this.three3D.name = "s_customer_2";
          this.customerGrp.addChild(this.three3D);
          this.smoke3 = this.three3D.getChildByName("smoke");
          this.lerpThreeIndex = 10;
          this.targetThreePos = this.lerpPosArr[this.lerpThreeIndex];
          this.three3D.transform.localPosition = new Laya.Vector3(this.parkThreeVct.x, 0, this.parkThreeVct.z);
          this.three3D.transform.localRotationEulerY = 180
      }
  }
  class GHeroCmp extends ScriptBase {
      constructor() {
          super();
          this.moveRatio = new Laya.Point(0, 0);
          this.curSpeed = 0;
          this.accSpeed = 0;
          this.bodyGrp = null;
          this.body3D = null;
          this.heroAni = null;
          this.smoke3D = null;
          this.particle3D = null;
          this.bagGrp3D = null;
          this.zd3D = null;
          this.arrowGrp = null;
          this.curEnterMoneyStack = null;
          this.curEnterTrash = null;
          this.colHomeUpgradeCmp = null;
          this.colHomeOutputCmp = null;
          this.colHomeInputStoreCmp = null;
          this.colHomeInputFactoryCmp = null;
          this.colHomeInput2FactoryCmp = null;
          this.colHomeMoneyStoreCmp = null;
          this.posTween = null;
          this.tryTotalTime = 0;
          this.initBagPos = null
      }
      onAwake() {
          super.onAwake();
          this.smoke3D = this.mySp3d.getChildByName("smoke");
          if (this.smoke3D) {
              this.smoke3D.active = false
          }
          this.zd3D = this.mySp3d.getChildByName("zdGrp");
          if (this.zd3D) {
              this.zd3D.transform.localPositionY = 0.7 + (GameData.Inst.maxInitBag + GameModel.Inst.bagLv) * 0.8;
              this.zd3D.active = false
          }
          this.bodyGrp = this.mySp3d.getChildByName("bodyGrp");
          if (this.bodyGrp) {
              this.body3D = this.bodyGrp.getChildAt(0);
              this.heroAni = this.body3D.getComponent(Laya.Animator)
          }
          this.particle3D = this.mySp3d.getChildByName("particleGrp");
          this.bagGrp3D = this.mySp3d.getChildByName("bagGrp");
          if (this.bagGrp3D) {
              this.initBagPos = this.bagGrp3D.transform.localPosition.clone();
              this.bagGrp3D.destroyChildren();
              this.bagGrp3D.removeChildren()
          }
      }
      onStart() {
          super.onStart();
          if (GameModel.Inst.roleId > 0) {
              this.onSetSkin(GameModel.Inst.roleId)
          }
      }
      onUpdate() {
          super.onUpdate();
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          this.onUpdateMove()
      }
      onUpdateMove() {
          if (Math.abs(this.moveRatio.x) == 0 && Math.abs(this.moveRatio.y) == 0) {
              return
          }
          if (this.curSpeed <= 0) {
              return
          }
          var dis = this.curSpeed * (1 + GameData.Inst.accSpeed);
          var addX = -dis * this.moveRatio.x;
          var addZ = -dis * this.moveRatio.y;
          var angel = Math.atan2(this.moveRatio.x, this.moveRatio.y) * 180 / Math.PI - 180;
          var posX = Number(this.myTrans.localPosition.x);
          var posY = Number(this.myTrans.localPosition.y);
          var posZ = Number(this.myTrans.localPosition.z);
          var moveVct = GameData.Inst.onCheckPlayePlane(posX, posZ, addX, addZ);
          if (!moveVct || moveVct.x == null) {
              console.error("heroCmp posX=" + posX + " posZ=" + posZ + " addX=" + addX + " addZ=" + addZ)
          }
          this.myTrans.localPosition = new Laya.Vector3(moveVct.x, posY, moveVct.y);
          if (angel < 0) {
              angel += 360
          }
          this.myTrans.localRotationEulerY = angel;
          this.zd3D.transform.localRotationEulerY = 370 - angel;
          ViewControl.Inst.onBattleUpdateBoxTip()
      }
      onTriggerEnter(other) {
          var enter3D = other.owner;
          if (enter3D.name.indexOf("s_money_stack") >= 0) {
              this.curEnterMoneyStack = enter3D;
              this.onCheckTriggerMoneyStack();
              if (GameModel.Inst.guideIndex == 0) {
                  MapCtl.Inst.onGetMapSet().onNextGuild()
              }
          } else if (enter3D.name.indexOf("s_trash") >= 0) {
              this.curEnterTrash = enter3D;
              this.onCheckTriggerTrash()
          } else if (enter3D.name.indexOf("s_upgrade") >= 0) {
              var factory3D = enter3D.parent;
              var homeBaseCmp = factory3D.getComponent(GHomeBase);
              if (homeBaseCmp) {
                  this.colHomeUpgradeCmp = homeBaseCmp;
                  this.onCheckTriggerUpgrade();
                  if (homeBaseCmp.nameStr == "s_iron_factory" && GameModel.Inst.guideIndex == 1) {
                      MapCtl.Inst.onGetMapSet().onNextGuild()
                  } else if (homeBaseCmp.nameStr == "s_iron_store" && GameModel.Inst.guideIndex == 2) {
                      MapCtl.Inst.onGetMapSet().onNextGuild()
                  } else if (homeBaseCmp.nameStr == "s_iron_store" && GameModel.Inst.guideIndex == 6) {
                      MapCtl.Inst.onGetMapSet().onNextGuild()
                  } else if (homeBaseCmp.nameStr == "s_screw_factory" && GameModel.Inst.guideIndex == 7) {
                      MapCtl.Inst.onGetMapSet().onNextGuild()
                  }
              }
          } else if (enter3D.name.indexOf("s_money") >= 0) {
              var colMoneyPre3D = enter3D.parent;
              if (colMoneyPre3D.name.indexOf("_store") >= 0) {
                  this.colHomeMoneyStoreCmp = colMoneyPre3D.getComponent(GHomeStore);
                  this.onCheckTriggerMoneyStore();
                  if (this.colHomeMoneyStoreCmp.nameStr == "s_iron_store" && GameModel.Inst.guideIndex == 5) {
                      MapCtl.Inst.onGetMapSet().onNextGuild()
                  }
              }
          } else if (enter3D.name.indexOf("s_output") >= 0) {
              var outputPre3D = enter3D.parent;
              if (outputPre3D.name.indexOf("_factory") >= 0) {
                  this.colHomeOutputCmp = outputPre3D.getComponent(GHomeFactory);
                  this.onCheckTriggerOutput();
                  if (this.colHomeOutputCmp.nameStr == "s_iron_factory" && GameModel.Inst.guideIndex == 3) {
                      MapCtl.Inst.onGetMapSet().onNextGuild()
                  }
              }
          } else if (enter3D.name.indexOf("s_input1") >= 0) {
              var inpout1Pre3D = enter3D.parent;
              if (inpout1Pre3D.name.indexOf("_factory") >= 0) {
                  this.colHomeInputFactoryCmp = inpout1Pre3D.getComponent(GHomeFactory);
                  this.onCheckTriggerInputFactory()
              }
          } else if (enter3D.name.indexOf("s_input2") >= 0) {
              var inpout2Pre3D = enter3D.parent;
              if (inpout2Pre3D.name.indexOf("_factory") >= 0) {
                  this.colHomeInput2FactoryCmp = inpout2Pre3D.getComponent(GHomeFactory);
                  this.onCheckTriggerInput2Factory()
              }
          } else if (enter3D.name.indexOf("s_input") >= 0) {
              var parent3D = enter3D.parent;
              if (parent3D.name.indexOf("_store") >= 0) {
                  this.colHomeInputStoreCmp = parent3D.getComponent(GHomeStore);
                  this.onCheckTriggerInputStore();
                  if (this.colHomeInputStoreCmp.nameStr == "s_iron_store" && GameModel.Inst.guideIndex == 4) {
                      MapCtl.Inst.onGetMapSet().onNextGuild()
                  }
              } else if (parent3D.name.indexOf("_factory") >= 0) {
                  this.colHomeInputFactoryCmp = parent3D.getComponent(GHomeFactory);
                  this.onCheckTriggerInputFactory()
              }
          }
      }
      onTriggerStay(other) {}
      JT() {}
      onTriggerExit(other) {
          var exit3D = other.owner;
          if (exit3D.name.indexOf("s_money_stack") >= 0) {
              this.curEnterMoneyStack = null;
              Laya.timer.clear(this, this.onLoopTriggerMoneyStack)
          } else if (exit3D.name.indexOf("s_trash") >= 0) {
              this.curEnterTrash = null;
              Laya.timer.clear(this, this.onLoopTriggerTrash)
          } else if (exit3D.name.indexOf("s_upgrade") >= 0) {
              this.colHomeUpgradeCmp = null;
              Laya.timer.clear(this, this.onLoopTriggerUpgrade)
          } else if (exit3D.name.indexOf("s_output") >= 0) {
              this.colHomeOutputCmp = null;
              Laya.timer.clear(this, this.onLoopTriggerOutput)
          } else if (exit3D.name.indexOf("s_input1") >= 0) {
              this.colHomeInputFactoryCmp = null;
              Laya.timer.clear(this, this.onLoopTriggerInputFactory)
          } else if (exit3D.name.indexOf("s_input2") >= 0) {
              this.colHomeInput2FactoryCmp = null;
              Laya.timer.clear(this, this.onLoopTriggerInput2Factory)
          } else if (exit3D.name.indexOf("s_input") >= 0) {
              var parent3D = exit3D.parent;
              if (parent3D.name.indexOf("_store") >= 0) {
                  this.colHomeInputStoreCmp = null;
                  Laya.timer.clear(this, this.onLoopTriggerInputStore)
              } else if (parent3D.name.indexOf("_factory") >= 0) {
                  this.colHomeInputFactoryCmp = null;
                  Laya.timer.clear(this, this.onLoopTriggerInputFactory)
              }
          } else if (exit3D.name.indexOf("s_money") >= 0) {
              var parent3D = exit3D.parent;
              if (parent3D.name.indexOf("_store") >= 0) {
                  this.colHomeMoneyStoreCmp = null;
                  Laya.timer.clear(this, this.onLoopTriggerMoneyStore)
              }
          }
      }
      onCollisionEnter(col) {
          console.log("HeroCmp:[" + col.other.owner.name + "]")
      }
      onCheckTriggerMoneyStore() {
          if (!this.colHomeMoneyStoreCmp) {
              console.error("Hero TriggerMoneyStore colHomeMoneyStoreCmp=null");
              Laya.timer.clear(this, this.onLoopTriggerMoneyStore);
              return
          }
          if (!this.colHomeMoneyStoreCmp.colMoney3D) {
              console.error("Hero TriggerMoneyStore colMoney3D=null");
              Laya.timer.clear(this, this.onLoopTriggerMoneyStore);
              return
          }
          Laya.timer.loop(50, this, this.onLoopTriggerMoneyStore)
      }
      onLoopTriggerMoneyStore() {
          if (!this.colHomeMoneyStoreCmp) {
              console.error("Hero LoopMoneyStore colHomeMoneyStoreCmp=null");
              Laya.timer.clear(this, this.onLoopTriggerMoneyStore);
              return
          }
          if (!this.colHomeMoneyStoreCmp.colMoney3D) {
              console.error("Hero LoopMoneyStore colMoney3D=null");
              Laya.timer.clear(this, this.onLoopTriggerMoneyStore);
              return
          }
          if (this.colHomeMoneyStoreCmp.curStoreMoney <= 0) {
              return
          }
          var flyMoney3D = this.colHomeMoneyStoreCmp.colMoney3D.getChildAt(this.colHomeMoneyStoreCmp.colMoney3D.numChildren - 1);
          if (!flyMoney3D) {
              console.error("Hero LoopMoneyStore flyMoney3D=null");
              return
          }
          var flyResCmp = flyMoney3D.getComponent(GFlyMoney);
          if (!flyResCmp) {
              console.error("Hero LoopMoneyStore flyResCmp=null");
              return
          }
          if (flyResCmp.isEndFly == false) {
              return
          }
          GameCtl.Inst.onPlaySound(ResPath.Sound_Money);
          this.colHomeMoneyStoreCmp.onReduceStoreMoney(1);
          GameModel.Inst.city0Money++;
          GameModel.Inst.setGameMoney();
          Laya.stage.event(GameEvent.REFRESH_MONEY);
          var pos = flyResCmp.myTrans.position.clone();
          var rot = flyResCmp.myTrans.rotationEuler.clone();
          flyResCmp.mySp3d.removeSelf();
          this.particle3D.addChild(flyResCmp.mySp3d);
          flyResCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          flyResCmp.myTrans.rotationEuler = new Laya.Vector3(rot.x, rot.y, rot.z);
          var beginVct = flyResCmp.myTrans.localPosition.clone();
          var endVct = new Laya.Vector3(0, 0, 0);
          flyResCmp.onStoreFlyToPlayer(beginVct, endVct);
          GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_7, 1)
      }
      onCheckTriggerInputStore() {
          if (!this.colHomeInputStoreCmp) {
              console.error("Hero TriggerInputStore ==null");
              Laya.timer.clear(this, this.onLoopTriggerInputStore);
              return
          }
          if (!this.colHomeInputStoreCmp.colInput3D) {
              console.error("Hero TriggerInputStore colInput3D==null");
              Laya.timer.clear(this, this.onLoopTriggerInputStore);
              return
          }
          if (this.onGetCountByCity(this.colHomeInputStoreCmp.homeCity) <= 0) {
              return
          }
          this.onLoopTriggerInputStore();
          Laya.timer.loop(100, this, this.onLoopTriggerInputStore)
      }
      onLoopTriggerInputStore() {
          if (!this.colHomeInputStoreCmp) {
              console.error("Hero LoopInputStore ==null");
              Laya.timer.clear(this, this.onLoopTriggerInputStore);
              return
          }
          if (!this.colHomeInputStoreCmp.colInput3D) {
              console.error("Hero TriggerInputStore colInput3D==null");
              Laya.timer.clear(this, this.onLoopTriggerInputStore);
              return
          }
          if (this.colHomeInputStoreCmp.curStoreInput >= GameData.Inst.maxStoreInput) {
              return
          }
          var count = this.onGetCountByCity(this.colHomeInputStoreCmp.homeCity);
          if (count <= 0) {
              Laya.timer.clear(this, this.onLoopTriggerInputStore);
              return
          }
          var resCmp = this.onFindResByCity(this.colHomeInputStoreCmp.homeCity);
          if (!resCmp) {
              console.error("Hero LoopInputStor 未找着该种类资源");
              Laya.timer.clear(this, this.onLoopTriggerInputStore);
              return
          }
          if (resCmp.isEndFly == false) {
              return
          }
          GameCtl.Inst.onPlaySound(ResPath.Sound_Res);
          this.onReduceResCountByCity(this.colHomeInputStoreCmp.homeCity, 1);
          this.colHomeInputStoreCmp.onAddInputNum(1);
          var pos = resCmp.myTrans.position.clone();
          var rot = resCmp.myTrans.rotationEuler.clone();
          resCmp.mySp3d.removeSelf();
          this.colHomeInputStoreCmp.colInput3D.addChild(resCmp.mySp3d);
          resCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          resCmp.myTrans.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var count = this.colHomeInputStoreCmp.curStoreInput - 1;
          var row = 4;
          var col = 2;
          var round = count % (row * col);
          var intX = round % row;
          var intZ = Math.floor(round / row);
          var posX = 1 * (Math.floor(row / 2) - intX) - (row % 2 == 0 ? 0.5 : 0);
          var posY = 0.1 + 1 * Math.floor(count / (row * col));
          var posZ = 1 * (Math.floor(col / 2) - intZ) - (col % 2 == 0 ? 0.5 : 0);
          var endVct = new Laya.Vector3(posX, posY, posZ);
          var beginVct = resCmp.myTrans.localPosition.clone();
          resCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct);
          this.onResUpdatePos();
          if (this.colHomeInputStoreCmp.homeCity == GameEnum.E_CITY.CITY2SCREW) {
              GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_5, 1)
          }
      }
      onFindResByCity(homeCity_) {
          if (!this.bagGrp3D) {
              return null
          }
          var len = this.bagGrp3D.numChildren;
          if (len <= 0) {
              return null
          }
          for (let i = len - 1; i >= 0; i--) {
              var res3D = this.bagGrp3D.getChildAt(i);
              if (res3D) {
                  var resCmp = res3D.getComponent(GFlyResInfo);
                  if (resCmp && resCmp.homeCity == homeCity_) {
                      return resCmp
                  }
              }
          }
          return null
      }
      onCheckTriggerInput2Factory() {
          if (!this.colHomeInput2FactoryCmp) {
              console.error("Hero TriggerInput2Factory ==null");
              Laya.timer.clear(this, this.onLoopTriggerInput2Factory);
              return
          }
          Laya.timer.loop(100, this, this.onLoopTriggerInput2Factory)
      }
      onLoopTriggerInput2Factory() {
          if (!this.colHomeInput2FactoryCmp) {
              console.error("Hero LoopInput2Factory ==null");
              Laya.timer.clear(this, this.onLoopTriggerInput2Factory);
              return
          }
          if (this.colHomeInput2FactoryCmp.curFactoryInput2 >= GameData.Inst.maxFactoryInput) {
              return
          }
          var inputCity = this.onGetFactoryInputCity(this.colHomeInput2FactoryCmp.homeCity, true);
          var count = this.onGetCountByCity(inputCity);
          if (count <= 0) {
              console.log("Hero LoopInputFactory count<= 0");
              Laya.timer.clear(this, this.onLoopTriggerInput2Factory);
              return
          }
          var resCmp = this.onFindResByCity(inputCity);
          if (!resCmp) {
              console.error("Hero LoopInputFactory 未找着该种类资源");
              Laya.timer.clear(this, this.onLoopTriggerInput2Factory);
              return
          }
          if (resCmp.isEndFly == false) {
              return
          }
          GameCtl.Inst.onPlaySound(ResPath.Sound_Res);
          this.onReduceResCountByCity(inputCity, 1);
          this.colHomeInput2FactoryCmp.onAddFactoryInput2(1);
          var pos = resCmp.myTrans.position.clone();
          var rot = resCmp.myTrans.rotationEuler.clone();
          resCmp.mySp3d.removeSelf();
          this.colHomeInput2FactoryCmp.colInputTwo3D.addChild(resCmp.mySp3d);
          resCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          resCmp.myTrans.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var count = this.colHomeInput2FactoryCmp.curFactoryInput2 - 1;
          var row = 2;
          var col = 2;
          var round = count % (row * col);
          var intX = round % row;
          var intZ = Math.floor(round / row);
          var posX = 1 * (Math.floor(row / 2) - intX) - (row % 2 == 0 ? 0.5 : 0);
          var posY = 0.1 + 1 * Math.floor(count / (row * col));
          var posZ = 1 * (Math.floor(col / 2) - intZ) - (col % 2 == 0 ? 0.5 : 0);
          var endVct = new Laya.Vector3(posX, posY, posZ);
          var beginVct = resCmp.myTrans.localPosition.clone();
          resCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct);
          this.onResUpdatePos()
      }
      onCheckTriggerInputFactory() {
          if (!this.colHomeInputFactoryCmp) {
              console.error("Hero TriggerInputFactory ==null");
              Laya.timer.clear(this, this.onLoopTriggerInputFactory);
              return
          }
          Laya.timer.loop(100, this, this.onLoopTriggerInputFactory)
      }
      onLoopTriggerInputFactory() {
          if (!this.colHomeInputFactoryCmp) {
              console.error("Hero LoopInputFactory ==null");
              Laya.timer.clear(this, this.onLoopTriggerInputFactory);
              return
          }
          if (this.colHomeInputFactoryCmp.curFactoryInput >= GameData.Inst.maxFactoryInput) {
              return
          }
          var inputCity = this.onGetFactoryInputCity(this.colHomeInputFactoryCmp.homeCity);
          var count = this.onGetCountByCity(inputCity);
          if (count <= 0) {
              console.log("Hero LoopInputFactory count<= 0");
              Laya.timer.clear(this, this.onLoopTriggerInputFactory);
              return
          }
          var resCmp = this.onFindResByCity(inputCity);
          if (!resCmp) {
              console.error("Hero LoopInputFactory 未找着该种类资源");
              Laya.timer.clear(this, this.onLoopTriggerInputFactory);
              return
          }
          if (resCmp.isEndFly == false) {
              return
          }
          GameCtl.Inst.onPlaySound(ResPath.Sound_Res);
          this.onReduceResCountByCity(inputCity, 1);
          this.colHomeInputFactoryCmp.onAddFactoryInput(1);
          var pos = resCmp.myTrans.position.clone();
          var rot = resCmp.myTrans.rotationEuler.clone();
          resCmp.mySp3d.removeSelf();
          this.colHomeInputFactoryCmp.colInput3D.addChild(resCmp.mySp3d);
          resCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          resCmp.myTrans.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var count = this.colHomeInputFactoryCmp.curFactoryInput - 1;
          var row = 2;
          var col = 2;
          var round = count % (row * col);
          var intX = round % row;
          var intZ = Math.floor(round / row);
          var posX = 1 * (Math.floor(row / 2) - intX) - (row % 2 == 0 ? 0.5 : 0);
          var posY = 0.1 + 1 * Math.floor(count / (row * col));
          var posZ = 1 * (Math.floor(col / 2) - intZ) - (col % 2 == 0 ? 0.5 : 0);
          var endVct = new Laya.Vector3(posX, posY, posZ);
          var beginVct = resCmp.myTrans.localPosition.clone();
          resCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct);
          this.onResUpdatePos()
      }
      onCheckTriggerOutput() {
          if (!this.colHomeOutputCmp) {
              console.error("Hero TriOutput colHomeOutputCmp=null");
              return
          }
          Laya.timer.loop(100, this, this.onLoopTriggerOutput)
      }
      onLoopTriggerOutput() {
          if (!this.colHomeOutputCmp) {
              console.error("Hero LoopOutput colHomeOutputCmp=null");
              Laya.timer.clear(this, this.onLoopTriggerOutput);
              return
          }
          if (this.onCheckResFull()) {
              return
          }
          if (this.colHomeOutputCmp.curFactoryOuput <= 0) {
              return
          }
          if (!this.colHomeOutputCmp.colOutput3D) {
              console.error("Hero LoopOutput colOutput3D == null");
              Laya.timer.clear(this, this.onLoopTriggerOutput);
              return
          }
          var res3D = this.colHomeOutputCmp.colOutput3D.getChildAt(this.colHomeOutputCmp.colOutput3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var flyResCmp = res3D.getComponent(GFlyResInfo);
          if (!flyResCmp) {
              return
          }
          if (flyResCmp.isEndFly == false) {
              return
          }
          if (flyResCmp.homeCity != this.colHomeOutputCmp.homeCity) {
              console.error("Hero LoopOutput 资源与工厂类型不同");
              Laya.timer.clear(this, this.onLoopTriggerOutput);
              return
          }
          GameCtl.Inst.onPlaySound(ResPath.Sound_Res);
          this.onAddResCountByCity(this.colHomeOutputCmp.homeCity, 1);
          this.colHomeOutputCmp.onReduceFactoryNum(1);
          var pos = res3D.transform.position.clone();
          var rot = res3D.transform.rotationEuler.clone();
          res3D.removeSelf();
          this.bagGrp3D.addChild(res3D);
          res3D.transform.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          res3D.transform.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var count = this.onGetResTotal();
          var endVct = new Laya.Vector3(0, 0.8 * (count - 1), 0);
          var beginVct = res3D.transform.localPosition.clone();
          flyResCmp.onFlyToHero(beginVct, new Laya.Vector3(0, rot.y, 0), endVct)
      }
      onCheckTriggerUpgrade() {
          if (!this.colHomeUpgradeCmp) {
              console.error("Hero TriUpgrade colHomeUpgradeCmp=null");
              return
          }
          if (this.colHomeUpgradeCmp.curUpgradeMoney <= 0) {
              console.error("Hero TriUpgrade curUpgradeMoney<=0");
              return
          }
          if (GameModel.Inst.city0Money <= 0) {
              return
          }
          this.onLoopTriggerUpgrade();
          Laya.timer.loop(60, this, this.onLoopTriggerUpgrade)
      }
      onLoopTriggerUpgrade() {
          if (!this.colHomeUpgradeCmp) {
              console.error("Hero LoopUpgrade colHomeUpgradeCmp=null");
              return
          }
          if (this.colHomeUpgradeCmp.curUpgradeMoney <= 0) {
              Laya.timer.clear(this, this.onLoopTriggerUpgrade);
              return
          }
          if (GameModel.Inst.city0Money <= 0) {
              Laya.timer.clear(this, this.onLoopTriggerUpgrade);
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          GameCtl.Inst.onPlaySound(ResPath.Sound_Money);
          GameModel.Inst.city0Money--;
          GameModel.Inst.setGameMoney();
          Laya.stage.event(GameEvent.REFRESH_MONEY);
          this.colHomeUpgradeCmp.onReduceMoney(1);
          var tar = this.colHomeUpgradeCmp.onGetUpgradePos();
          this.onCreateFlyToTarget(tar)
      }
      onCreateFlyToTarget(tar) {
          var beginVct = new Laya.Vector3(this.myTrans.position.x, this.myTrans.position.y, this.myTrans.position.z);
          var upgrade3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Ico_Money));
          upgrade3D.transform.localPosition = beginVct;
          upgrade3D.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
          CtlSp.Inst.onGet3DFly().addChild(upgrade3D);
          var upgradeFly = upgrade3D.addComponent(GFlyMoney);
          upgradeFly.onInitFly(beginVct, tar)
      }
      onCheckTriggerMoneyStack() {
          if (!this.curEnterMoneyStack) {
              console.error("Hero MoneyStack = null");
              return
          }
          if (this.curEnterMoneyStack.numChildren <= 0) {
              return
          }
          this.onLoopTriggerMoneyStack();
          Laya.timer.loop(100, this, this.onLoopTriggerMoneyStack)
      }
      onLoopTriggerMoneyStack() {
          if (!this.curEnterMoneyStack) {
              console.error("Hero LoopMoneyStack = null");
              Laya.timer.clear(this, this.onLoopTriggerMoneyStack);
              return
          }
          if (this.curEnterMoneyStack.numChildren <= 0) {
              Laya.timer.clear(this, this.onLoopTriggerMoneyStack);
              return
          }
          GameCtl.Inst.onPlaySound(ResPath.Sound_Money);
          GameModel.Inst.city0Money++;
          GameModel.Inst.setGameMoney();
          Laya.stage.event(GameEvent.REFRESH_MONEY);
          var statckSub = this.curEnterMoneyStack.getChildAt(this.curEnterMoneyStack.numChildren - 1);
          if (!statckSub) {
              console.log("Hero LoopMoneyStack statckSub==null");
              return
          }
          var statckPos = statckSub.transform.position.clone();
          var statckRot = statckSub.transform.rotationEuler.clone();
          statckSub.removeSelf();
          this.particle3D.addChild(statckSub);
          statckSub.transform.position = new Laya.Vector3(statckPos.x, statckPos.y, statckPos.z);
          statckSub.transform.rotationEuler = new Laya.Vector3(statckRot.x, statckRot.y, statckRot.z);
          var beginVct = statckSub.transform.localPosition.clone();
          var endVct = new Laya.Vector3(0, 0, 0);
          var flyCmp = statckSub.addComponent(GFlyMoney);
          flyCmp.onInitFly(beginVct, endVct);
          GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_7, 1)
      }
      onCheckTriggerTrash() {
          if (!this.curEnterTrash) {
              console.error("Hero TriggerTrash = null");
              return
          }
          if (!this.bagGrp3D) {
              console.error("Hero TriggerTrash bagGrp3D = null");
              return
          }
          if (this.onGetResTotal() <= 0) {
              Laya.timer.clear(this, this.onLoopTriggerTrash);
              return
          }
          Laya.timer.loop(200, this, this.onLoopTriggerTrash)
      }
      onLoopTriggerTrash() {
          if (!this.curEnterTrash) {
              console.error("Hero TriggerTrash = null");
              return
          }
          if (!this.bagGrp3D) {
              console.error("Hero TriggerTrash bagGrp3D = null");
              return
          }
          if (this.onGetResTotal() <= 0) {
              Laya.timer.clear(this, this.onLoopTriggerTrash);
              return
          }
          if (this.bagGrp3D.numChildren <= 0) {
              Laya.timer.clear(this, this.onLoopTriggerTrash);
              return
          }
          var res3D = this.bagGrp3D.getChildAt(this.bagGrp3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var flyResCmp = res3D.getComponent(GFlyResInfo);
          if (!flyResCmp) {
              return
          }
          if (flyResCmp.isEndFly == false) {
              return
          }
          GameCtl.Inst.onPlaySound(ResPath.Sound_Res);
          this.onReduceResCountByCity(flyResCmp.homeCity, 1);
          var pos = res3D.transform.position.clone();
          var rot = res3D.transform.rotationEuler.clone();
          res3D.removeSelf();
          CtlSp.Inst.onGet3DFly().addChild(res3D);
          res3D.transform.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          res3D.transform.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var endVct = this.curEnterTrash.transform.localPosition.clone();
          var beginVct = res3D.transform.localPosition.clone();
          flyResCmp.onFlyToTrash(beginVct, endVct)
      }
      onBattleTryCarHeroSin(tryCarID) {
          GameModel.Inst.tryId = tryCarID;
          Laya.timer.clear(this, this.onLoopTrySkin);
          var addTime = AdUtils.ins.allSwitch.otherSkinUseTime * 1000;
          if (addTime <= 1000) {
              return
          }
          GameData.Inst.accSpeed = 0.2;
          this.bagGrp3D.transform.localPosition = new Laya.Vector3(0, 0.9, -0.9);
          this.onSetSkin(GameModel.Inst.tryId);
          this.tryTotalTime = Date.now() + addTime;
          ViewControl.Inst.onBattleShowCarTime(addTime);
          Laya.timer.clear(this, this.onLoopTrySkin);
          this.onLoopTrySkin();
          Laya.timer.loop(1000, this, this.onLoopTrySkin)
      }
      onLoopTrySkin() {
          if (this.tryTotalTime <= 0) {
              Laya.timer.clear(this, this.onLoopTrySkin);
              return
          }
          var time = this.tryTotalTime - Date.now();
          if (time <= 0) {
              console.log("Hero Car试用结束");
              GameModel.Inst.tryId = -1;
              GameData.Inst.accSpeed = 0;
              this.bagGrp3D.transform.localPosition = this.initBagPos;
              this.onSetSkin(GameModel.Inst.roleId);
              ViewControl.Inst.onBattleCloseCarTime();
              Laya.timer.clear(this, this.onLoopTrySkin)
          } else {
              ViewControl.Inst.onBattleShowCarTime(time)
          }
      }
      onCheckHomeLockInHero(homePos, homeStr) {
          var inHome = GameData.Inst.bCheckPlayerInHome(this.myTrans.localPosition.clone(), homeStr);
          if (inHome) {
              CommonData.Inst.isPauseGame = true;
              var posX = this.myTrans.localPositionX;
              var moveX = 0;
              if (posX > homePos.x) {
                  moveX = homePos.x + 4
              } else {
                  moveX = homePos.x - 4
              }
              this.posTween = Laya.Tween.to(this.myTrans, {
                  localPositionX: moveX
              },
              500, null, Laya.Handler.create(this, this.onCompleteHomeLockInHero))
          }
      }
      onCompleteHomeLockInHero() {
          CommonData.Inst.isPauseGame = false
      }
      onUpdateArrow() {
          if (GameModel.Inst.homeIndex >= GameData.Inst.maxHome) {
              return
          }
          if (!this.arrowGrp) {
              return
          }
          var targetVct = MapCtl.Inst.onGetMapSet().onGetOpenHomePos();
          if (!targetVct) {
              return
          }
          var arrowAngle = this.onGetAngle(this.myTrans.position.x, this.myTrans.position.z, targetVct.x, targetVct.z);
          this.arrowGrp.transform.rotationEuler = new Laya.Vector3(0, arrowAngle, 0);
          if (this.arrowGrp.numChildren <= 0) {
              this.onCreateArrow();
              return
          }
          for (let i = 0; i < this.arrowGrp.numChildren; i++) {
              let child = this.arrowGrp.getChildAt(i);
              child.transform.localPositionZ += 0.08
          }
          var lastChild = this.arrowGrp.getChildAt(this.arrowGrp.numChildren - 1);
          if (lastChild.transform.localPositionZ >= 1.5) {
              this.onCreateArrow()
          }
          var firstChild = this.arrowGrp.getChildAt(0);
          var moveDis = CommonUtils.onDistanceSquared2D(firstChild.transform.position, targetVct);
          if (moveDis <= 0.5) {
              firstChild.removeSelf()
          }
      }
      onCreateArrow() {
          var arrow3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Arrow));
          this.arrowGrp.addChild(arrow3D);
          arrow3D.transform.localPosition = new Laya.Vector3(0, 0, 0);
          arrow3D.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
          arrow3D.transform.localScale = new Laya.Vector3(1, 1, 1);
          var color = GameData.Inst.onGetWhileColor();
          CommonUtils.onSetMatrialColor(arrow3D, color, false)
      }
      onGetAngle(x, z, targetX, targetZ) {
          let angle = Math.atan2(x - targetX, z - targetZ) * 180 / Math.PI - 180;
          return angle
      }
      onSetSkin(roleID) {
          if (!this.bodyGrp) {
              return
          }
          this.bodyGrp.destroyChildren();
          this.bodyGrp.removeChildren();
          var path = GameData.Inst.onGetSkinPath(roleID);
          this.body3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(path));
          this.body3D.transform.localPosition = new Laya.Vector3(0, 0, 0);
          this.bodyGrp.addChild(this.body3D);
          this.heroAni = this.body3D.getComponent(Laya.Animator)
      }
      onGetFactoryInputCity(curHomeCity, isInput2 = false) {
          if (curHomeCity == GameEnum.E_CITY.CITY2SCREW) {
              return GameEnum.E_CITY.CITY1IRON
          } else if (curHomeCity == GameEnum.E_CITY.CITY3BATTERY) {
              return GameEnum.E_CITY.CITY1IRON
          } else if (curHomeCity == GameEnum.E_CITY.CITY5BULB) {
              return GameEnum.E_CITY.CITY4GLASS
          } else if (curHomeCity == GameEnum.E_CITY.CITY6MONITOR) {
              return GameEnum.E_CITY.CITY4GLASS
          } else if (curHomeCity == GameEnum.E_CITY.CITY7LAPTOP) {
              if (isInput2) {
                  return GameEnum.E_CITY.CITY3BATTERY
              } else {
                  return GameEnum.E_CITY.CITY6MONITOR
              }
          } else {
              console.error("Hero onGetFactoryInputCity HomeCity" + curHomeCity + "类型不对")
          }
          return GameEnum.E_CITY.NONE
      }
      onReduceResCountByCity(homeCity, reduceNum) {
          if (homeCity == GameEnum.E_CITY.CITY1IRON) {
              this.onReduceCity1Iron(reduceNum)
          } else if (homeCity == GameEnum.E_CITY.CITY2SCREW) {
              this.onReduceCity2Screw(reduceNum)
          } else if (homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              this.onReduceCity3Battery(reduceNum)
          } else if (homeCity == GameEnum.E_CITY.CITY4GLASS) {
              this.onReduceCity4Glass(reduceNum)
          } else if (homeCity == GameEnum.E_CITY.CITY5BULB) {
              this.onReduceCity5Bulb(reduceNum)
          } else if (homeCity == GameEnum.E_CITY.CITY6MONITOR) {
              this.onReduceCity6Monitor(reduceNum)
          } else if (homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
              this.onReduceCity7Laptop(reduceNum)
          }
          GameModel.Inst.onAddTaskCountByID(GameEnum.E_TASK.TASK_4, 1)
      }
      onAddResCountByCity(homeCity, addNum) {
          if (homeCity == GameEnum.E_CITY.CITY1IRON) {
              this.onAddCity1Iron(addNum)
          } else if (homeCity == GameEnum.E_CITY.CITY2SCREW) {
              this.onAddCity2Screw(addNum)
          } else if (homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              this.onAddCity3Battery(addNum)
          } else if (homeCity == GameEnum.E_CITY.CITY4GLASS) {
              this.onAddCity4Glass(addNum)
          } else if (homeCity == GameEnum.E_CITY.CITY5BULB) {
              this.onAddCity5Bulb(addNum)
          } else if (homeCity == GameEnum.E_CITY.CITY6MONITOR) {
              this.onAddCity6Monitor(addNum)
          } else if (homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
              this.onAddCity7Laptop(addNum)
          }
      }
      onGetCountByCity(homeCity) {
          if (homeCity == GameEnum.E_CITY.CITY1IRON) {
              return GameModel.Inst.city1Iron
          } else if (homeCity == GameEnum.E_CITY.CITY2SCREW) {
              return GameModel.Inst.city2Screw
          } else if (homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              return GameModel.Inst.city3Battery
          } else if (homeCity == GameEnum.E_CITY.CITY4GLASS) {
              return GameModel.Inst.city4Glass
          } else if (homeCity == GameEnum.E_CITY.CITY5BULB) {
              return GameModel.Inst.city5Bulb
          } else if (homeCity == GameEnum.E_CITY.CITY6MONITOR) {
              return GameModel.Inst.city6Monitor
          } else if (homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
              return GameModel.Inst.city7Laptop
          }
          return 0
      }
      onResUpdatePos() {
          if (!this.bagGrp3D) {
              return
          }
          var len = this.bagGrp3D.numChildren;
          if (len <= 0) {
              return
          }
          for (let i = 0; i < len; i++) {
              var sub3D = this.bagGrp3D.getChildAt(i);
              if (sub3D) {
                  sub3D.transform.localPositionY = 0.8 * i
              }
          }
      }
      onGetResTotal() {
          var total = GameModel.Inst.city1Iron + GameModel.Inst.city2Screw + GameModel.Inst.city3Battery + GameModel.Inst.city4Glass + GameModel.Inst.city5Bulb + GameModel.Inst.city6Monitor + GameModel.Inst.city7Laptop;
          return total
      }
      onCheckResFull() {
          var total = GameModel.Inst.city1Iron + GameModel.Inst.city2Screw + GameModel.Inst.city3Battery + GameModel.Inst.city4Glass + GameModel.Inst.city5Bulb + GameModel.Inst.city6Monitor + GameModel.Inst.city7Laptop;
          var isFull = false;
          if (total >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              isFull = true
          } else {
              isFull = false
          }
          return isFull
      }
      onAddCity1Iron(addNum) {
          if (this.onGetResTotal() + addNum > GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              console.error("Hero onAddCity1Iron 超过了");
              return
          }
          GameModel.Inst.city1Iron += addNum;
          if (this.onGetResTotal() >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = true
          }
      }
      onReduceCity1Iron(reduceNum) {
          if (GameModel.Inst.city1Iron - reduceNum < 0) {
              console.error("Hero onReduceCity1Iron 不足");
              return
          }
          GameModel.Inst.city1Iron -= reduceNum;
          if (this.onGetResTotal() < 4) {
              this.zd3D.active = false
          }
      }
      onAddCity2Screw(addNum) {
          if (this.onGetResTotal() + addNum > GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              console.error("Hero onAddCity2Screw 超过了");
              return
          }
          GameModel.Inst.city2Screw += addNum;
          if (this.onGetResTotal() >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = true
          }
      }
      onReduceCity2Screw(reduceNum) {
          if (GameModel.Inst.city2Screw - reduceNum < 0) {
              console.error("Hero onReduceCity2Screw 不足");
              return
          }
          GameModel.Inst.city2Screw -= reduceNum;
          if (this.onGetResTotal() < GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = false
          }
      }
      onAddCity3Battery(addNum) {
          if (this.onGetResTotal() + addNum > GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              console.error("Hero onAddCity3Battery 超过了");
              return
          }
          GameModel.Inst.city3Battery += addNum;
          if (this.onGetResTotal() >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = true
          }
      }
      onReduceCity3Battery(reduceNum) {
          if (GameModel.Inst.city3Battery - reduceNum < 0) {
              console.error("Hero onReduceCity3Battery 不足");
              return
          }
          GameModel.Inst.city3Battery -= reduceNum;
          if (this.onGetResTotal() < GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = false
          }
      }
      onAddCity4Glass(addNum) {
          if (this.onGetResTotal() + addNum > GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              console.error("Hero onAddCity4Glass 超过了");
              return
          }
          GameModel.Inst.city4Glass += addNum;
          if (this.onGetResTotal() >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = true
          }
      }
      onReduceCity4Glass(reduceNum) {
          if (GameModel.Inst.city4Glass - reduceNum < 0) {
              console.error("Hero onReduceCity4Glass 不足");
              return
          }
          GameModel.Inst.city4Glass -= reduceNum;
          if (this.onGetResTotal() < GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = false
          }
      }
      onAddCity5Bulb(addNum) {
          if (this.onGetResTotal() + addNum > GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              console.error("Hero onAddCity5Bulb 超过了");
              return
          }
          GameModel.Inst.city5Bulb += addNum;
          if (this.onGetResTotal() >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = true
          }
      }
      onCheckBagFull() {
          this.zd3D.transform.localPositionY = 0.7 + (GameData.Inst.maxInitBag + GameModel.Inst.bagLv) * 0.8;
          if (this.onGetResTotal() >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = true
          } else {
              this.zd3D.active = false
          }
      }
      onReduceCity5Bulb(reduceNum) {
          if (GameModel.Inst.city5Bulb - reduceNum < 0) {
              console.error("Hero onReduceCity5Bulb 不足");
              return
          }
          GameModel.Inst.city5Bulb -= reduceNum;
          if (this.onGetResTotal() < GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = false
          }
      }
      onAddCity6Monitor(addNum) {
          if (this.onGetResTotal() + addNum > GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              console.error("Hero onAddCity6Monitor 超过了");
              return
          }
          GameModel.Inst.city6Monitor += addNum;
          if (this.onGetResTotal() >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = true
          }
      }
      onReduceCity6Monitor(reduceNum) {
          if (GameModel.Inst.city6Monitor - reduceNum < 0) {
              console.error("Hero onReduceCity6Monitor 不足");
              return
          }
          GameModel.Inst.city6Monitor -= reduceNum;
          if (this.onGetResTotal() < 4) {
              this.zd3D.active = false
          }
      }
      onAddCity7Laptop(addNum) {
          if (this.onGetResTotal() + addNum > GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              console.error("Hero onAddCity7Laptopr 超过了");
              return
          }
          GameModel.Inst.city7Laptop += addNum;
          if (this.onGetResTotal() >= GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = true
          }
      }
      onReduceCity7Laptop(reduceNum) {
          if (GameModel.Inst.city7Laptop - reduceNum < 0) {
              console.error("Hero onReduceCity7Laptop 不足");
              return
          }
          GameModel.Inst.city7Laptop -= reduceNum;
          if (this.onGetResTotal() < GameData.Inst.maxInitBag + GameModel.Inst.bagLv) {
              this.zd3D.active = false
          }
      }
  }
  class HeroCtl {
      constructor() {
          this.isMouseTouch = false;
          this.heroSp = null;
          this.heroCmp = null;
          this.touchId = -1
      }
      onCreateHero(stage3D, path = ResPath.Mesh_Hero) {
          this.heroSp = CtlSp.Inst.onCreateTo(stage3D, path);
          this.heroSp.onSetP(0, 0, 0);
          this.heroCmp = this.heroSp.onAddComp(GHeroCmp)
      }
      onStartGame() {
          this.onRregiestEvent()
      }
      onRestHero() {}
      onGetRolePos() {
          if (!this.heroSp) {
              return new Laya.Vector3(0, 0, 0)
          }
          return this.heroSp.onGetP()
      }
      onGetHeroCmp() {
          return this.heroCmp
      }
      onRregiestEvent() {
          Laya.stage.on(GameEvent.MOUSE_INPUT_DOWN, this, this.onMouseInputDown);
          Laya.stage.on(GameEvent.MOUSE_INPUT_MOVE, this, this.onMouseInputMove);
          Laya.stage.on(GameEvent.MOUSE_INPUT_UP, this, this.onMouseInputUp)
      }
      onUnRegiestEvent() {
          Laya.stage.off(GameEvent.MOUSE_INPUT_DOWN, this, this.onMouseInputDown);
          Laya.stage.off(GameEvent.MOUSE_INPUT_MOVE, this, this.onMouseInputMove);
          Laya.stage.off(GameEvent.MOUSE_INPUT_UP, this, this.onMouseInputUp)
      }
      onMouseInputDown(down) {
          if (this.heroCmp.curSpeed == 0) {
              this.heroCmp.curSpeed = GameData.Inst.roleSpeed * (1 + GameModel.Inst.speedLv * 0.05)
          }
          if (this.heroCmp.smoke3D) {
              this.heroCmp.smoke3D.active = true
          }
          if (this.heroCmp.heroAni) {
              this.heroCmp.heroAni.speed = 2.5
          }
      }
      onMouseInputMove(move) {
          this.heroCmp.moveRatio = move
      }
      onMouseInputUp() {
          this.heroCmp.curSpeed = 0;
          if (this.heroCmp.smoke3D) {
              this.heroCmp.smoke3D.active = false
          }
          if (this.heroCmp.heroAni) {
              this.heroCmp.heroAni.speed = 1
          }
      }
  }
  HeroCtl.Inst = new HeroCtl();
  class GHomeRail extends GHomeBase {
      constructor() {
          super();
          this.isUpdate = false;
          this.railGrp3D = null;
          this.rail3D = null;
          this.smokeRail = null;
          this.bagGrp3D = null;
          this.startPos = null;
          this.endPos = null;
          this.startRotY = 0;
          this.endRotY = 0;
          this.posTween = null;
          this.rotTween = null;
          this.homeFactory = null;
          this.homeStore = null;
          this.lv0_arrow = null;
          this.lv1_arrow = null;
          this.lv2_arrow = null;
          this.tweenTimePos = 3000;
          this.curCount = 0
      }
      onAwake() {
          super.onAwake();
          if (this.homeType != GameEnum.E_TYPE.RAIL) {
              console.log("HomeRail" + this.nameStr + " homeType=" + this.homeType);
              return
          }
          this.railGrp3D = this.mySp3d.getChildByName("railGrp");
          if (this.railGrp3D) {
              var start3D = this.railGrp3D.getChildByName("pt_0");
              if (start3D) {
                  this.startPos = start3D.transform.localPosition.clone();
                  start3D.removeSelf()
              }
              var end3D = this.railGrp3D.getChildByName("pt_1");
              if (end3D) {
                  this.endPos = end3D.transform.localPosition.clone();
                  end3D.removeSelf()
              }
              this.lv0_arrow = this.railGrp3D.getChildByName("arrow_0");
              CommonUtils.onSetMatrialColor(this.lv0_arrow, GameData.Inst.onGetRailColor(), false);
              this.lv1_arrow = this.railGrp3D.getChildByName("arrow_1");
              CommonUtils.onSetMatrialColor(this.lv1_arrow, GameData.Inst.onGetRailColor(), false);
              this.lv2_arrow = this.railGrp3D.getChildByName("arrow_2");
              CommonUtils.onSetMatrialColor(this.lv2_arrow, GameData.Inst.onGetRailColor(), false)
          }
      }
      onStart() {
          super.onStart();
          if (this.isOpen == true && this.isLock == true && this.homeType == GameEnum.E_TYPE.RAIL) {
              this.onCreateRail();
              this.isUpdate = true;
              this.onsSetLvArrow()
          }
      }
      onDestroy() {
          super.onDestroy();
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this)
      }
      onLockHome() {
          super.onLockHome();
          this.onCreateRail();
          this.isUpdate = true
      }
      onUpgradeUpdateData() {
          super.onUpgradeUpdateData();
          this.onsSetLvArrow()
      }
      onsSetLvArrow() {
          if (this.upgradeLv == 1) {
              this.lv0_arrow.active = true;
              this.lv1_arrow.active = false;
              this.lv2_arrow.active = false
          } else if (this.upgradeLv == 2) {
              this.lv0_arrow.active = true;
              this.lv1_arrow.active = true;
              this.lv2_arrow.active = false
          } else if (this.upgradeLv == 3) {
              this.lv0_arrow.active = true;
              this.lv1_arrow.active = true;
              this.lv2_arrow.active = true
          } else {
              this.lv0_arrow.active = false;
              this.lv1_arrow.active = false;
              this.lv2_arrow.active = false
          }
      }
      onCreateRail() {
          if (!this.railGrp3D) {
              return
          }
          if (this.homeCity == GameEnum.E_CITY.CITY4GLASS || this.homeCity == GameEnum.E_CITY.CITY5BULB || this.homeCity == GameEnum.E_CITY.CITY6MONITOR) {
              this.startRotY = 180
          } else {
              this.startRotY = 0
          }
          if (this.homeCity == GameEnum.E_CITY.CITY2SCREW || this.homeCity == GameEnum.E_CITY.CITY5BULB) {
              this.tweenTimePos = 6000
          } else {
              this.tweenTimePos = 3000
          }
          this.rail3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Bot));
          this.railGrp3D.addChild(this.rail3D);
          this.rail3D.transform.localPosition = this.startPos;
          this.rail3D.transform.localRotationEulerY = 0;
          this.smokeRail = this.rail3D.getChildByName("smoke");
          this.bagGrp3D = this.rail3D.getChildByName("bagGrp");
          if (this.bagGrp3D) {
              this.bagGrp3D.destroyChildren();
              this.bagGrp3D.removeChildren()
          }
          this.homeFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(this.homeCity);
          this.homeStore = MapCtl.Inst.onGetMapSet().onGetStoreCmp(this.homeCity);
          this.onTweenStartPos()
      }
      onTweenStartPos() {
          if (!this.rail3D) {
              return
          }
          if (!this.endPos) {
              return
          }
          if (this.smokeRail) {
              this.smokeRail.active = true
          }
          this.posTween = Laya.Tween.to(this.rail3D.transform, {
              localPositionX: this.endPos.x,
              localPositionZ: this.endPos.z
          },
          3000, Laya.Ease.linearNone, Laya.Handler.create(this, this.onCompleteStartPos))
      }
      onCompleteStartPos() {
          if (this.smokeRail) {
              this.smokeRail.active = false
          }
          this.rail3D.transform.localRotationEulerY = 0;
          if (!this.homeFactory) {
              console.error("HomeRail homeFactory=null");
              return
          }
          if (!this.bagGrp3D) {
              console.error("HomeRail bagGrp3D=null");
              return
          }
          this.curCount = 0;
          Laya.timer.loop(500, this, this.onLoopCheckFactory)
      }
      onLoopCheckFactory() {
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          if (!this.homeFactory.colOutput3D) {
              return
          }
          if (this.curCount > this.upgradeLv) {
              return
          }
          if (this.homeFactory.curFactoryOuput <= 0) {
              return
          }
          var res3D = this.homeFactory.colOutput3D.getChildAt(this.homeFactory.colOutput3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var flyResCmp = res3D.getComponent(GFlyResInfo);
          if (!flyResCmp) {
              return
          }
          if (flyResCmp.isEndFly == false) {
              return
          }
          if (flyResCmp.homeCity != this.homeFactory.homeCity) {
              console.error("HomeRail CheckFactory 资源与工厂类型不同");
              Laya.timer.clear(this, this.onLoopCheckFactory);
              return
          }
          this.curCount++;
          this.homeFactory.onReduceFactoryNum(1);
          var pos = res3D.transform.position.clone();
          var rot = res3D.transform.rotationEuler.clone();
          res3D.removeSelf();
          this.bagGrp3D.addChild(res3D);
          res3D.transform.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          res3D.transform.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var endVct = new Laya.Vector3(0, 0.8 * (this.curCount - 1), 0);
          var beginVct = res3D.transform.localPosition.clone();
          flyResCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct);
          if (this.curCount >= this.upgradeLv) {
              Laya.timer.clear(this, this.onLoopCheckFactory);
              this.onTweenEnd()
          }
      }
      onTweenEnd() {
          if (this.smokeRail) {
              this.smokeRail.active = true
          }
          var rotTime = 1500 * (1 - GameData.Inst.industrySpeed);
          var posTime = this.tweenTimePos * (1 - GameData.Inst.industrySpeed);
          this.rotTween = Laya.Tween.to(this.rail3D.transform, {
              localRotationEulerY: 180
          },
          rotTime, null);
          this.posTween = Laya.Tween.to(this.rail3D.transform, {
              localPositionX: this.startPos.x,
              localPositionZ: this.startPos.z
          },
          posTime, Laya.Ease.linearNone, Laya.Handler.create(this, this.onCompleteTweenEnd), rotTime)
      }
      onCompleteTweenEnd() {
          if (!this.homeStore) {
              console.error("HomeRail homeStore=null");
              return
          }
          if (!this.bagGrp3D) {
              console.error("HomeRail TweenEnd bagGrp3D=null");
              return
          }
          if (this.smokeRail) {
              this.smokeRail.active = false
          }
          Laya.timer.loop(500, this, this.onLoopCheckStore)
      }
      onLoopCheckStore() {
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          if (!this.homeStore.colInput3D) {
              return
          }
          if (this.curCount <= 0) {
              console.error("HomeRail 删除 curCount<=0");
              Laya.timer.clear(this, this.onLoopCheckStore);
              return
          }
          if (this.homeStore.curStoreInput >= GameData.Inst.maxStoreInput) {
              return
          }
          var res3D = this.bagGrp3D.getChildAt(this.bagGrp3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var flyResCmp = res3D.getComponent(GFlyResInfo);
          if (!flyResCmp) {
              return
          }
          if (flyResCmp.isEndFly == false) {
              return
          }
          if (flyResCmp.homeCity != this.homeFactory.homeCity) {
              console.error("HomeRail CheckFactory 资源与工厂类型不同");
              Laya.timer.clear(this, this.onLoopCheckFactory);
              return
          }
          this.homeStore.onAddInputNum(1);
          this.curCount--;
          var pos = flyResCmp.myTrans.position.clone();
          var rot = flyResCmp.myTrans.rotationEuler.clone();
          flyResCmp.mySp3d.removeSelf();
          this.homeStore.colInput3D.addChild(flyResCmp.mySp3d);
          flyResCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          flyResCmp.myTrans.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var count = this.homeStore.curStoreInput - 1;
          var row = 4;
          var col = 2;
          var round = count % (row * col);
          var intX = round % row;
          var intZ = Math.floor(round / row);
          var posX = 1 * (Math.floor(row / 2) - intX) - (row % 2 == 0 ? 0.5 : 0);
          var posY = 0.1 + 1 * Math.floor(count / (row * col));
          var posZ = 1 * (Math.floor(col / 2) - intZ) - (col % 2 == 0 ? 0.5 : 0);
          var endVct = new Laya.Vector3(posX, posY, posZ);
          var beginVct = flyResCmp.myTrans.localPosition.clone();
          flyResCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct);
          if (this.curCount <= 0) {
              Laya.timer.clear(this, this.onLoopCheckStore);
              this.onTweenStart()
          }
      }
      onTweenStart() {
          if (this.smokeRail) {
              this.smokeRail.active = true
          }
          var rotTime = 1500 * (1 - GameData.Inst.industrySpeed);
          var posTime = this.tweenTimePos * (1 - GameData.Inst.industrySpeed);
          this.rotTween = Laya.Tween.to(this.rail3D.transform, {
              localRotationEulerY: 360
          },
          rotTime, null);
          this.posTween = Laya.Tween.to(this.rail3D.transform, {
              localPositionX: this.endPos.x,
              localPositionZ: this.endPos.z
          },
          posTime, Laya.Ease.linearNone, Laya.Handler.create(this, this.onCompleteStartPos), rotTime)
      }
  }
  class GHomeBelt extends GHomeBase {
      constructor() {
          super();
          this.isUpdate = false;
          this.beltGrp3D = null;
          this.arrowGrp3D = null;
          this.ptArr = [];
          this.beltArr = [];
          this.lerpIndex = 0;
          this.lerpIndexArr = [];
          this.lerpMax = 0;
          this.targetPosArr = [];
          this.targetPos = null;
          this.startFactory = null;
          this.endFactory = null
      }
      onAwake() {
          super.onAwake();
          if (this.homeType != GameEnum.E_TYPE.BELT1 && this.homeType != GameEnum.E_TYPE.BELT2) {
              return
          }
          this.beltGrp3D = this.mySp3d.getChildByName("beltGrp");
          if (this.beltGrp3D) {
              this.beltArr = [];
              this.lerpIndexArr = [];
              this.arrowGrp3D = this.beltGrp3D.getChildByName("arrowGrp");
              if (this.arrowGrp3D) {
                  var len = this.arrowGrp3D.numChildren;
                  for (let i = 0; i < len; i++) {
                      var arrow3D = this.arrowGrp3D.getChildAt(i);
                      if (arrow3D) {
                          var indexOfCount = arrow3D.name.indexOf("_lv");
                          var index = Number(arrow3D.name.slice(indexOfCount + 3, arrow3D.name.length));
                          this.lerpIndexArr.push(index);
                          var arrowRotY = CommonUtils.onGetAngleTo360(arrow3D.transform.localRotationEulerY);
                          arrow3D.transform.localRotationEulerY = arrowRotY;
                          this.beltArr.push(arrow3D)
                      }
                  }
              }
              this.ptArr = [];
              var ptGrp = this.beltGrp3D.getChildByName("ptGrp");
              if (ptGrp) {
                  var ptLen = ptGrp.numChildren;
                  for (let j = 0; j < ptLen; j++) {
                      var pt3D = ptGrp.getChildByName("pt_" + j);
                      if (pt3D) {
                          var pos = pt3D.transform.localPosition.clone();
                          var rotY = CommonUtils.onGetAngleTo360(pt3D.transform.localRotationEulerY);
                          this.ptArr.push(new Laya.Vector4(pos.x, pos.y, pos.z, rotY))
                      }
                  }
                  ptGrp.removeSelf()
              }
          }
      }
      onStart() {
          super.onStart();
          if (this.isOpen == true && this.isLock == true && (this.homeType == GameEnum.E_TYPE.BELT1 || this.homeType == GameEnum.E_TYPE.BELT2)) {
              this.onInitStartLerp()
          }
      }
      onDestroy() {
          super.onDestroy();
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this)
      }
      onLockHome() {
          super.onLockHome();
          if (this.isOpen == true && this.isLock == true && (this.homeType == GameEnum.E_TYPE.BELT1 || this.homeType == GameEnum.E_TYPE.BELT2)) {
              this.onInitStartLerp()
          }
      }
      onUpdate() {
          super.onUpdate();
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          if (this.homeType != GameEnum.E_TYPE.BELT1 && this.homeType != GameEnum.E_TYPE.BELT2) {
              return
          }
          this.onUpdateLerp()
      }
      onInitStartLerp() {
          if (this.beltArr.length <= 0) {
              return
          }
          if (this.lerpIndexArr.length <= 0) {
              return
          }
          if (this.beltArr.length != this.lerpIndexArr.length) {
              console.log("HomeBase onInitStartLerp beltArr!=lerpIndexArr");
              return
          }
          var sub3D = this.mySp3d.getChildAt(0);
          if (sub3D) {
              if (sub3D.name.indexOf("cs_1") >= 0) {
                  var cs3D = sub3D.getChildByName("Model_2");
                  if (cs3D) {
                      CommonUtils.onSetMatrialColor(cs3D, GameData.Inst.onGetBeltColor(), false)
                  }
              } else {
                  CommonUtils.onSetMatrialColor(sub3D, GameData.Inst.onGetBeltColor(), false)
              }
          }
          if (this.homeCity == GameEnum.E_CITY.CITY2SCREW || this.homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              this.startFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY1IRON)
          } else if (this.homeCity == GameEnum.E_CITY.CITY5BULB || this.homeCity == GameEnum.E_CITY.CITY6MONITOR) {
              this.startFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY4GLASS)
          } else if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
              if (this.nameStr.indexOf("_belt2") >= 0) {
                  this.startFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY3BATTERY)
              } else {
                  this.startFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY6MONITOR)
              }
          }
          if (this.homeCity == GameEnum.E_CITY.CITY2SCREW) {
              this.endFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY2SCREW)
          } else if (this.homeCity == GameEnum.E_CITY.CITY3BATTERY) {
              this.endFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY3BATTERY)
          } else if (this.homeCity == GameEnum.E_CITY.CITY5BULB) {
              this.endFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY5BULB)
          } else if (this.homeCity == GameEnum.E_CITY.CITY6MONITOR) {
              this.endFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY6MONITOR)
          } else if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
              this.endFactory = MapCtl.Inst.onGetMapSet().onGetFactoryCmp(GameEnum.E_CITY.CITY7LAPTOP)
          }
          this.isUpdate = true;
          this.targetPosArr = [];
          this.lerpMax = this.ptArr.length;
          for (let i = 0; i < this.lerpIndexArr.length; i++) {
              var index = this.lerpIndexArr[i];
              var tarPos = this.ptArr[index];
              if (tarPos) {
                  this.targetPosArr.push(tarPos)
              } else {
                  console.log("HomeBase onInitStartLerp tarPos=null i=" + i + " index=" + index)
              }
          }
      }
      onUpdateLerp() {
          if (!this.isUpdate) {
              return
          }
          if (this.beltArr.length <= 0) {
              return
          }
          for (let i = 0; i < this.beltArr.length; i++) {
              var once3D = this.beltArr[i];
              if (!once3D) {
                  continue
              }
              if (this.lerpIndexArr[i] >= this.lerpMax - 1) {
                  this.lerpIndexArr[i] = 1;
                  var pos0 = this.ptArr[0];
                  this.targetPosArr[i] = this.ptArr[1];
                  once3D.transform.localPosition = new Laya.Vector3(pos0.x, 0, pos0.z);
                  once3D.transform.localRotationEulerY = pos0.w;
                  this.onCheckStartBelt(once3D)
              }
              var owerPos = once3D.transform.localPosition;
              var tarPos = new Laya.Vector3(this.targetPosArr[i].x, this.targetPosArr[i].y, this.targetPosArr[i].z);
              var tarRotY = this.targetPosArr[i].w;
              var dis = Laya.Vector3.distance(owerPos, tarPos);
              if (dis >= 0.04) {
                  var offPos = new Laya.Vector3();
                  Laya.Vector3.subtract(tarPos, owerPos, offPos);
                  Laya.Vector3.normalize(offPos, offPos);
                  var posX = owerPos.x + offPos.x * 0.02 * (1 + GameData.Inst.industrySpeed);
                  var posZ = owerPos.z + offPos.z * 0.02 * (1 + GameData.Inst.industrySpeed);
                  var rotY = Math.floor(once3D.transform.localRotationEulerY);
                  var rotLerpY = tarRotY - rotY;
                  var rotAddY = rotLerpY * 0.05 * (1 + GameData.Inst.industrySpeed);
                  once3D.transform.localPosition = new Laya.Vector3(posX, 0, posZ);
                  once3D.transform.localRotationEulerY = rotY + rotAddY
              } else {
                  if (this.lerpIndexArr[i] < this.lerpMax - 1) {
                      if (this.homeCity == GameEnum.E_CITY.CITY2SCREW || this.homeCity == GameEnum.E_CITY.CITY5BULB) {
                          if (this.lerpIndexArr[i] >= 2) {
                              once3D.transform.localRotationEulerY = 270
                          }
                      } else if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP) {
                          if (this.lerpIndexArr[i] >= 5) {
                              once3D.transform.localRotationEulerY = 180
                          }
                      }
                      this.lerpIndexArr[i]++;
                      this.targetPosArr[i] = this.ptArr[this.lerpIndexArr[i] + 1];
                      if (this.lerpIndexArr[i] + 1 == this.lerpMax) {
                          this.onCheckEndBelt(once3D)
                      }
                  } else {
                      console.log("HomeBelet two 超出最后一节 lerpOneIndex" + this.lerpIndexArr[i]);
                      this.isUpdate = false
                  }
              }
          }
      }
      onCheckEndBelt(arrow3D_) {
          if (!arrow3D_) {
              return
          }
          if (arrow3D_.numChildren <= 0) {
              return
          }
          if (!this.endFactory) {
              return
          }
          if (this.bMaxFactoryInput()) {
              this.isUpdate = false;
              Laya.timer.loop(500, this, this.onLoopEndBelt, [arrow3D_]);
              return
          }
          this.onCheckEndBeltArrow(arrow3D_)
      }
      bMaxFactoryInput() {
          if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP && this.nameStr.indexOf("_belt2") >= 0) {
              if (this.endFactory.curFactoryInput2 >= GameData.Inst.maxFactoryInput) {
                  return true
              } else {
                  return false
              }
          }
          if (this.endFactory.curFactoryInput >= GameData.Inst.maxFactoryInput) {
              return true
          }
          return false
      }
      onLoopEndBelt(arrow_) {
          if (!arrow_) {
              console.error("HomeStore onLoopEndBelt arrow_");
              return
          }
          if (!this.endFactory) {
              return
          }
          if (this.isUpdate == true) {
              console.error("HomeStore onLoopEndBelt isUpdate=true");
              return
          }
          if (this.bMaxFactoryInput()) {
              return
          }
          this.onCheckEndBeltArrow(arrow_);
          Laya.timer.clear(this, this.onLoopEndBelt);
          Laya.timer.once(500, this, this.onceEndBelt)
      }
      onceEndBelt() {
          this.isUpdate = true
      }
      onCheckEndBeltArrow(arrow_) {
          var res3D = arrow_.getChildAt(0);
          if (!res3D) {
              return
          }
          var flyResCmp = res3D.getComponent(GFlyResInfo);
          if (!flyResCmp) {
              return
          }
          if (flyResCmp.isEndFly == false) {
              return
          }
          if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP && this.nameStr.indexOf("_belt2") >= 0) {
              this.endFactory.onAddFactoryInput2(1)
          } else {
              this.endFactory.onAddFactoryInput(1)
          }
          var pos = flyResCmp.myTrans.position.clone();
          var rot = flyResCmp.myTrans.rotationEuler.clone();
          flyResCmp.mySp3d.removeSelf();
          if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP && this.nameStr.indexOf("_belt2") >= 0) {
              this.endFactory.colInputTwo3D.addChild(flyResCmp.mySp3d)
          } else {
              this.endFactory.colInput3D.addChild(flyResCmp.mySp3d)
          }
          flyResCmp.myTrans.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          flyResCmp.myTrans.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var count = 0;
          if (this.homeCity == GameEnum.E_CITY.CITY7LAPTOP && this.nameStr.indexOf("_belt2") >= 0) {
              count = this.endFactory.curFactoryInput2 - 1
          } else {
              count = this.endFactory.curFactoryInput - 1
          }
          var row = 2;
          var col = 2;
          var round = count % (row * col);
          var intX = round % row;
          var intZ = Math.floor(round / row);
          var posX = 1 * (Math.floor(row / 2) - intX) - (row % 2 == 0 ? 0.5 : 0);
          var posY = 0.1 + 1 * Math.floor(count / (row * col));
          var posZ = 1 * (Math.floor(col / 2) - intZ) - (col % 2 == 0 ? 0.5 : 0);
          var endVct = new Laya.Vector3(posX, posY, posZ);
          var beginVct = flyResCmp.myTrans.localPosition.clone();
          flyResCmp.onFlyToStoreInput(beginVct, new Laya.Vector3(0, rot.y, 0), endVct)
      }
      onCheckStartBelt(arrow3D_) {
          if (!arrow3D_) {
              return
          }
          if (arrow3D_.numChildren > 0) {
              return
          }
          if (!this.startFactory) {
              return
          }
          if (!this.startFactory.colOutput3D) {
              return
          }
          if (this.startFactory.curFactoryOuput <= 0) {
              return
          }
          var res3D = this.startFactory.colOutput3D.getChildAt(this.startFactory.colOutput3D.numChildren - 1);
          if (!res3D) {
              return
          }
          var flyResCmp = res3D.getComponent(GFlyResInfo);
          if (!flyResCmp) {
              return
          }
          if (flyResCmp.isEndFly == false) {
              return
          }
          this.startFactory.onReduceFactoryNum(1);
          var pos = res3D.transform.position.clone();
          var rot = res3D.transform.rotationEuler.clone();
          res3D.removeSelf();
          arrow3D_.addChild(res3D);
          res3D.transform.position = new Laya.Vector3(pos.x, pos.y, pos.z);
          res3D.transform.rotationEuler = new Laya.Vector3(0, rot.y, 0);
          var endVct = new Laya.Vector3(0, 0, 0);
          var beginVct = res3D.transform.localPosition.clone();
          flyResCmp.onFlyToBelt(beginVct, new Laya.Vector3(0, rot.y, 0), endVct)
      }
  }
  class Scene3DUIEntity extends Laya.Script {
      constructor() {
          super();
          this.target = null;
          this.uiItem = null;
          this.upY = 0
      }
      onAwake() {}
      onStart() {}
      Init3DUI(target, upY) {
          this.uiItem = this.owner;
          this.target = target;
          this.upY = upY
      }
      onUpdate() {}
      onLateUpdate() {
          this.updatePos()
      }
      updatePos() {
          if (!this.uiItem) {
              return
          }
          let a = CtlSp.Inst.onGetScene().getChildByName("CameraFather");
          let camera = a.getChildByName("Main Camera");
          let outPos = new Laya.Vector4();
          let vect3 = new Laya.Vector3(this.target.transform.position.x, this.upY, this.target.transform.position.z);
          camera.worldToViewportPoint(vect3, outPos);
          this.uiItem.pos(outPos.x - (this.uiItem.width / 2), outPos.y - this.uiItem.height)
      }
      onDestroy() {
          Laya.timer.clearAll(this);
          this.target = null;
          this.uiItem = null;
          this.upY = 0;
          super.onDestroy()
      }
  }
  class UnlockPriceItem extends ui.Item.UnlockPriceItemUI {
      constructor() {
          super()
      }
      onAwake() {}
      onDestroy() {
          super.onDestroy()
      }
  }
  class Tip {
      static showTips(content, color = "#ffffff") {
          var labBox = Laya.Pool.getItemByClass("tips", Laya.Box);
          labBox.name = "tipsManager";
          var labTpis = labBox.getChildByName('labTpis');
          if (labTpis == null) {
              labTpis = new Laya.Text()
          }
          labTpis.fontSize = 35;
          labTpis.bold = true;
          labTpis.height = 35;
          labTpis.width = 750;
          labTpis.x = 0;
          labTpis.removeChildren();
          labTpis.align = "center";
          labTpis.y = 0;
          labTpis.name = 'labTpis';
          labTpis.color = color;
          labTpis.text = content;
          var img = labBox.getChildByName('img');
          var iWidth = labTpis.textWidth + 15;
          if (img == null) {
              img = new Laya.Sprite();
              img.graphics.drawRect(0, 0, iWidth, 45, "#000000");
              img.alpha = 0.7;
              img.name = 'img';
              img.x = 375 - iWidth / 2;
              img.y = -5
          } else {
              img.graphics.clear(true);
              img.graphics.drawRect(0, 0, iWidth, 45, "#000000");
              img.x = 375 - iWidth / 2;
              img.y = -5
          }
          labBox.anchorX = 0.5;
          labBox.anchorY = 0.5;
          labBox.width = 750;
          labBox.height = img.height;
          labBox.x = Laya.stage.width / 2;
          labBox.y = Laya.stage.height / 3;
          labBox.addChild(img);
          labBox.addChild(labTpis);
          labBox.alpha = 0;
          Laya.stage.addChild(labBox);
          labBox.zOrder = 1000000;
          Laya.Tween.to(labBox, {
              alpha: 1
          },
          200);
          Laya.Tween.to(labBox, {
              y: Laya.stage.height / 3 - 100
          },
          1000, null, null, 700);
          Laya.Tween.to(labBox, {
              alpha: 0
          },
          500, null, Laya.Handler.create(this, this.removeLabel, [labBox]), 1300, false)
      }
      static removeLabel(labBox) {
          labBox.removeSelf();
          Laya.Tween.clearAll(labBox);
          Laya.Pool.recover("tips", labBox);
          this.labels.pop()
      }
      static showTipsImg(url) {
          var img = new Laya.Image();
          img.skin = url;
          img.anchorX = 0.5;
          img.anchorY = 0.5;
          img.x = Laya.stage.width / 2;
          img.y = Laya.stage.height / 3;
          img.alpha = 0;
          Laya.stage.addChild(img);
          img.zOrder = 1000000;
          Laya.Tween.to(img, {
              alpha: 1
          },
          200);
          Laya.Tween.to(img, {
              y: Laya.stage.height / 3 - 100
          },
          1000, null, null, 700);
          Laya.Tween.to(img, {
              alpha: 0
          },
          500, null, Laya.Handler.create(this, this.removeLabel, [img]), 1300, false)
      }
      static showMask() {
          if (this.mask == null) {
              this.mask = new Laya.Sprite();
              this.mask.width = Laya.stage.width;
              this.mask.height = 2000;
              this.mask.alpha = 0.5;
              this.mask.pos(0, 0);
              this.mask.graphics.clear();
              this.mask.name = 'mask';
              this.mask.graphics.drawRect(0, 0, Laya.stage.width, 2000, "#000000");
              this.mask.on(Laya.Event.CLICK, this, this.onMask);
              this.mask.on(Laya.Event.MOUSE_DOWN, this, this.onMask);
              this.mask.on(Laya.Event.MOUSE_MOVE, this, this.onMask);
              Laya.stage.addChild(this.mask);
              this.mask.zOrder = 1000000
          } else {
              this.mask.visible = true
          }
      }
      static onMask(e) {
          e.stopPropagation();
          return false
      }
      static hideMask() {
          if (this.mask) {
              this.mask.visible = false
          }
      }
  }
  Tip.labels = [];
  class OPPOAdapter {
      constructor() {
          this.className = "OPPOAdapter().";
          this.bannerAdArr = [];
          this.bannerAdIdx = 0;
          this.bannerIdxLength = 1;
          this.videoAdIdx = 0;
          this.videoIdxLength = 2;
          this.interAdIdx = 0;
          this.interAdIdxLength = 2;
          this.nativeAd = null;
          this.nativeAdIdx = 0;
          this.nativeIdxLength = 1;
          this.gameFiveBannerAd = null;
          this.gamePortalAd = null;
          this.gameBannerAdPoolLunBo = null;
          this.gameDrawerAd = null;
          this.isPlayVideo = false;
          this.isShowVideo = false;
          this.addDesk = false;
          this.alliconIndex = 0;
          this.otherIndex = 0;
          this.refreshAdNum()
      }
      createCustomAd(type, top, pos) {
          if (!Laya.Browser.window.qg.createCustomAd) {
              return
          }
          if (this.customAd) {
              this.onHideDestroyCustomAd(1);
              return
          }
          if (type == 7) {
              this.customAd = Laya.Browser.window.qg.createCustomAd({
                  posId: "615288",
                  style: {
                      top: top,
                  },
              })
          } else {
              this.customAd = Laya.Browser.window.qg.createCustomAd({
                  posId: "615288"
              })
          }
          this.customAd.onLoad((err) =>{
              this.customAd && this.customAd.offLoad(() =>{})
          });
          this.customAd.show().then(() =>{
              pos(true);
              console.log("原生模板广告展示完成")
          }).
          catch((err) =>{
              pos(false);
              console.log("原生模板广告展示失败", JSON.stringify(err))
          });
          this.customAd.onError((err) =>{
              pos(false);
              console.log("原生模板广告加载失败", err);
              this.customAd && this.customAd.offError(() =>{})
          });
          this.customAd.onHide((err) =>{
              pos(false);
              console.log("原生模板广告关闭", err);
              this.customAd.offClose(() =>{});
              this.onHideDestroyCustomAd(1)
          })
      }
      onHideDestroyCustomAd(state) {
          if (!this.customAd) {
              return
          }
          if (state == 0) {
              this.customAd.hide()
          } else {
              this.customAd.destroy();
              this.customAd = null
          }
      }
      init() {
          Laya.Browser.window.qg.onShow((res) =>{
              GameCtl.Inst.onPlaySound(ResPath.Sound_Bgm, true);
              Laya.timer.scale = 1;
              if (!this.isShowVideo) {}
          });
          Laya.Browser.window.qg.onHide((res) =>{
              Laya.timer.scale = 0;
              GameCtl.Inst.onStopSound(ResPath.Sound_Bgm, true)
          });
          this.createNativeAd()
      }
      getAdJson() {
          let adJson = [{
              "id": 1,
              "adUnitId": "360381",
              "type": 1,
              "showType": 0,
              "isload": true
          },
          {
              "id": 3,
              "adUnitId": "615290",
              "type": 2,
              "showType": 0,
              "isload": false
          },
          {
              "id": 4,
              "adUnitId": "615291",
              "type": 2,
              "showType": 1,
              "isload": false
          },
          {
              "id": 6,
              "adUnitId": "615286",
              "type": 4,
              "showType": 0,
              "isload": false
          },
          {
              "id": 7,
              "adUnitId": "615287",
              "type": 4,
              "showType": 1,
              "isload": false
          },
          {
              "id": 9,
              "adUnitId": "615292",
              "type": 6,
              "showType": 0,
              "isload": false
          },
          {
              "id": 9,
              "adUnitId": "615294",
              "type": 7,
              "showType": 0,
              "isload": false
          },
          {
              "id": 9,
              "adUnitId": "572828",
              "type": 8,
              "showType": 0,
              "isload": false
          },
          ];
          return adJson
      }
      refreshAdNum() {
          this.bannerIdxLength = 0;
          this.videoIdxLength = 0;
          this.interAdIdxLength = 0;
          this.nativeIdxLength = 0;
          var data = this.getAdJson();
          for (var key in data) {
              if (data.hasOwnProperty(key)) {
                  var element = data[key];
                  if (element.type == 1) {
                      this.bannerIdxLength++
                  } else if (element.type == 2) {
                      this.videoIdxLength++
                  } else if (element.type == 3) {
                      this.interAdIdxLength++
                  } else if (element.type == 4) {
                      this.nativeIdxLength++
                  }
              }
          }
      }
      getAdConfig(type, showType) {
          var obj = null;
          var data = this.getAdJson();
          for (var key in data) {
              if (data.hasOwnProperty(key)) {
                  var element = data[key];
                  if (element.type == type && element.showType == showType) {
                      obj = element;
                      break
                  }
              }
          }
          console.log(this.className + "getAdConfig(" + type + ", " + showType + ") =  ", obj);
          return obj
      }
      showBanner(isShow, banner, callBack) {
          var self = this;
          var config;
          if (banner) {
              config = this.getAdConfig(1, banner)
          } else {
              var lastBannerIdx = (this.bannerAdIdx + this.bannerIdxLength - 1) % this.bannerIdxLength;
              if (isShow) {
                  this.clearAllBanner();
                  config = this.getAdConfig(1, this.bannerAdIdx);
                  this.bannerAdIdx++;
                  this.bannerAdIdx %= this.bannerIdxLength
              } else {
                  config = this.getAdConfig(1, lastBannerIdx)
              }
          }
          var bannerId = config.adUnitId;
          if (bannerId) {
              this.adBannerId = bannerId
          } else {
              this.adBannerId = "332698"
          }
          if (isShow) {
              if (this.bannerAdArr[this.adBannerId] == null || this.bannerAdArr[this.adBannerId].banner == null) {
                  this.bannerAdArr[this.adBannerId] = {
                      banner: null,
                      state: 1,
                      isShow: false,
                      time: new Date().getTime() + 200000
                  };
                  this.bannerAdArr[this.adBannerId].banner = Laya.Browser.window.qg.createBannerAd({
                      adUnitId: this.adBannerId,
                      style: {}
                  });
                  this.bannerAdArr[this.adBannerId].banner.show().then(() =>{
                      this.bannerAdArr[this.adBannerId].isShow = true;
                      this.bannerAdArr[this.adBannerId].state = 1
                  }).
                  catch((err) =>{
                      console.log(err)
                  })
              } else {
                  if (!this.bannerAdArr[this.adBannerId].isShow) {
                      this.bannerAdArr[this.adBannerId].banner.show().then(() =>{
                          this.bannerAdArr[this.adBannerId].isShow = true;
                          this.bannerAdArr[this.adBannerId].state = 1
                      }).
                      catch((err) =>{
                          console.log(err)
                      })
                  }
                  return
              }
              this.bannerAdArr[this.adBannerId].banner.onLoad(function(res) {
                  console.log("banner下载", res)
              }.bind(this.bannerAdArr[this.adBannerId]));
              this.bannerAdArr[this.adBannerId].banner.onError(function(res) {
                  console.log("banner出错", res);
                  console.log(JSON.stringify(res))
              });
              this.bannerAdArr[this.adBannerId].banner.onResize(function(res) {
                  console.log("onResize", res)
              })
          } else {
              this.clearAllBanner()
          }
      }
      clearAllBanner() {
          for (var idx in this.bannerAdArr) {
              console.log(idx);
              if (this.bannerAdArr[idx] && this.bannerAdArr[idx].banner) {
                  if (this.bannerAdArr[idx].state == 1) {
                      console.log("消毁banner " + idx);
                      this.bannerAdArr[idx].banner.hide();
                      this.bannerAdArr[idx].banner.state = 2;
                      this.bannerAdArr[idx].banner.destroy();
                      this.bannerAdArr[idx] = null
                  }
              }
          }
      }
      getVideoAd(callback, video) {
          if (this.videoAd) {
              this.destoryVideoAd()
          }
          console.log(this.className + "getVideoAd()");
          var self = this;
          this.isShowVideo = true;
          var adUnitId = this.getAdConfig(2, this.videoAdIdx).adUnitId;
          this.videoAd = Laya.Browser.window.qg.createRewardedVideoAd({
              adUnitId: adUnitId
          });
          this.videoAd.onError((err) =>{
              Tip.showTips('暂无视频,请稍后再试');
              callback(false);
              callback = null;
              self.destoryVideoAd()
          });
          this.videoAd.onLoad(function(res) {
              console.log('激励视频广告加载完成-onload触发', JSON.stringify(res));
              self.videoAd.show().then(() =>{
                  console.log('激励视频广告展示完成')
              }).
              catch((err) =>{
                  Tip.showTips('暂无视频,请稍后再试');
                  callback(false);
                  callback = null;
                  self.destoryVideoAd();
                  console.log('激励视频广告展示失败', JSON.stringify(err))
              });
              self.videoAd.offLoad()
          });
          this.videoAd.onClose((res) =>{
              if (res) {
                  if (res.isEnded) {
                      console.log("激励视频广告完成，发放奖励");
                      if (callback != undefined) {
                          callback(res.isEnded);
                          callback = null
                      }
                  } else {
                      console.log("激励视频广告取消关闭，不发放奖励");
                      if (callback != undefined) {
                          callback(res.isEnded);
                          callback = null
                      }
                  }
              }
              self.isShowVideo = false;
              self.videoAd.offClose();
              self.destoryNativeAd()
          });
          this.videoAd.load();
          this.videoAdIdx++;
          this.videoAdIdx %= this.videoIdxLength
      }
      destoryVideoAd() {
          this.videoAd.offLoad();
          this.videoAd.offError();
          this.videoAd.offClose();
          this.videoAd.destroy();
          this.videoAd = null
      }
      createNativeAd(callFun) {
          if (this.nativeAd != null) {
              this.destoryNativeAd()
          }
          console.info(this.className + 'createNativeAd(): nativeAdIdx = ' + this.nativeAdIdx);
          let adUnitId = this.getAdConfig(4, this.nativeAdIdx).adUnitId;
          this.nativeAd = Laya.Browser.window.qg.createNativeAd({
              adUnitId: adUnitId
          });
          var self = this;
          this.nativeAd.onLoad(function(res) {
              console.log('原生广告拉新', res.adList);
              if (SdkAdapter_OPPO.ins.nativeAd) {
                  SdkAdapter_OPPO.ins.nativeAd = null
              }
              SdkAdapter_OPPO.ins.nativeAd = self.nativeAd;
              SdkAdapter_OPPO.ins.nativeData = res;
              SdkAdapter_OPPO.ins.nativeUpdateTimer = 0;
              if (callFun) {
                  callFun()
              }
              self.nativeAd.offLoad();
              self.nativeAd.offError()
          });
          this.nativeAd.onError(function(err) {
              console.log('原生广告拉新失败' + JSON.stringify(err));
              if (SdkAdapter_OPPO.ins.nativeData) {
                  self.reportAdShow();
                  SdkAdapter_OPPO.ins.nativeUpdateTimer++
              }
          });
          this.nativeAd.load();
          this.nativeAdIdx++;
          this.nativeAdIdx %= this.nativeIdxLength
      }
      reportAdShow() {
          console.log(this.className + "reportAdShow()", SdkAdapter_OPPO.ins.nativeAd);
          SdkAdapter_OPPO.ins.nativeAd.reportAdShow({
              adId: SdkAdapter_OPPO.ins.nativeData.adList[0]['adId']
          })
      }
      reportAdClick() {
          SdkAdapter_OPPO.ins.nativeAd.reportAdClick({
              adId: SdkAdapter_OPPO.ins.nativeData.adList[0]['adId']
          })
      }
      destoryNativeAd() {
          if (this.nativeAd) {
              this.nativeAd.offLoad();
              this.nativeAd.offError();
              this.nativeAd = null
          }
      }
      hasShortcutInstalled(callback) {
          Laya.Browser.window.qg.hasShortcutInstalled({
              success: function(res) {
                  callback(!res)
              },
              fail: function(err) {
                  console.error('判断桌面图标是否存在 error:', err)
              },
              complete: function() {}
          })
      }
      installShortcut() {
          var self = this;
          Laya.Browser.window.qg.installShortcut({
              success: function(res) {
                  Laya.timer.once(500, this, () =>{
                      Laya.stage.event('check')
                  });
                  self.addDesk = true
              },
              fail: function(err) {
                  Laya.timer.once(500, this, () =>{
                      Laya.stage.event('check')
                  });
                  console.error('提醒用户创建桌面图标 error:', err)
              },
              complete: function() {}
          })
      }
      createDesk(res) {
          if (!res) {
              Laya.stage.event("AddSucess")
          }
      }
      createGameBannerAd(state) {
          if (Laya.Browser.window.qg.getSystemInfoSync().platformVersionCode >= 1076) {
              var self = this;
              var adUnitId = this.getAdConfig(6, 0).adUnitId;
              if (this.gamePortalAd == null && state == 0) {
                  this.gamePortalAd = Laya.Browser.window.qg.createGamePortalAd({
                      adUnitId: adUnitId
                  });
                  this.gamePortalAd.onLoad(function(res) {
                      console.log('互推盒子九宫格广告加载成功', res);
                      self.gamePortalAd.offLoad()
                  });
                  this.gamePortalAd.onError(function(err) {
                      console.log('互推盒子九宫格广告加载失败', err)
                  });
                  this.gamePortalAd.onClose(function(err) {
                      self.gamePortalAd.offClose();
                      self.gamePortalAd.destroy();
                      self.gamePortalAd = null;
                      self.createGameBannerAd(0)
                  });
                  this.gamePortalAd.show().then(function() {})
              } else {
                  if (this.gamePortalAd == null || state == 0) {
                      console.log("广告未加载完成无法展示九宫格>>>");
                      Tip.showTips('暂无更多游戏!');
                      this.createGameBannerAd(0);
                      return
                  }
                  this.gamePortalAd.show().then(function() {
                      console.log('显示成功')
                  }).
                  catch(function(error) {
                      console.log('显示失败：' + error.errCode + ',' + error.errMsg);
                      Tip.showTips('暂无更多游戏');
                      self.gamePortalAd.destroy();
                      self.gamePortalAd = null;
                      self.createGameBannerAd(0)
                  })
              }
          } else {
              console.log('快应用平台版本号低于1076，暂不支持互推盒子相关 API')
          }
      }
      createFiveGameBannerAd() {
          if (Laya.Browser.window.qg.getSystemInfoSync().platformVersionCode >= 1076) {
              let self = this;
              var data = this.getAdConfig(5, 0);
              this.gameFiveBannerAd = Laya.Browser.window.qg.createGameBannerAd({
                  adUnitId: data.adUnitId
              });
              this.gameFiveBannerAd.onLoad(function() {
                  console.log('互推五宫格盒子横幅广告加载成功');
                  self.gameFiveBannerAd.offLoad()
              });
              this.gameFiveBannerAd.onError(function(res) {
                  console.log("互推盒子加载失败：：>>>>>" + res);
                  self.gameFiveBannerAd.offError();
                  self.gameFiveBannerAd.destroy();
                  self.gameFiveBannerAd = null
              })
          } else {
              console.log('快应用平台版本号低于1076，暂不支持互推盒子相关 API')
          }
      }
      visibleFiveGameBannerAd(flag) {
          if (this.gameFiveBannerAd) {
              if (flag == false) {
                  this.gameFiveBannerAd.hide();
                  console.log('五宫格广告隐藏成功')
              } else {
                  this.gameFiveBannerAd.show().then(function() {
                      console.log('五宫格广告显示成功')
                  }).
                  catch(function(error) {
                      console.log('五宫格广告显示失败:' + error.errCode + ',' + error.errMsg)
                  })
              }
          } else {
              this.createFiveGameBannerAd()
          }
      }
      createGameBannerAdLunBo() {
          console.log("createGameBannerAdLunBo():" + Laya.Browser.window.qg.getSystemInfoSync().platformVersionCode);
          if (Laya.Browser.window.qg.getSystemInfoSync().platformVersionCode >= 1090) {
              var self = this;
              var adUnitId = this.getAdConfig(7, 0).adUnitId;
              this.gameBannerAdPoolLunBo = Laya.Browser.window.qg.createGameBannerAd({
                  adUnitId: adUnitId,
                  style: {
                      top: Laya.stage.displayHeight - 120,
                      left: Laya.stage.displayWidth / 2 - 150,
                      orientation: 'horizontal'
                  }
              });
              this.gameBannerAdPoolLunBo.onLoad(function(res) {
                  console.log('横幅轮播广告加载成功', res);
                  self.gameBannerAdPoolLunBo.offLoad()
              });
              this.gameBannerAdPoolLunBo.onError(function(err) {
                  console.log('横幅轮播广告加载失败', err);
                  self.gameBannerAdPoolLunBo.destroy();
                  self.gameBannerAdPoolLunBo = null
              });
              this.gameBannerAdPoolLunBo.onShow(() =>{
                  console.log('横幅轮播广告显示成功')
              })
          } else {
              console.log('快应用平台版本号低于1090，暂不支持轮播广告相关 API : 当前版本号' + Laya.Browser.window.qg.getSystemInfoSync().platformVersionCode)
          }
      }
      showGameBannerAdLunBo(bShow) {
          console.log(this.className + "showGameBannerAdLunBo(" + bShow + ")");
          var self = this;
          if (!this.gameBannerAdPoolLunBo) {
              this.createGameBannerAdLunBo()
          } else {
              console.log("showGameBannerAdLunBo 显示(" + bShow + ")");
              if (bShow) {
                  this.gameBannerAdPoolLunBo.show().then(function() {
                      console.log('横幅轮播广告显示成功')
                  }).
                  catch(function(error) {
                      console.log('横幅轮播广告显示失败：', error);
                      self.gameBannerAdPoolLunBo.destroy();
                      self.gameBannerAdPoolLunBo = null;
                      self.createGameBannerAdLunBo()
                  })
              } else {
                  this.gameBannerAdPoolLunBo.destroy();
                  this.gameBannerAdPoolLunBo = null;
                  this.createGameBannerAdLunBo()
              }
          }
      }
      createGameDrawerAd() {
          console.log(this.className + "createGameDrawerAd()");
          if (Laya.Browser.window.qg.getSystemInfoSync().platformVersionCode >= 1090) {
              let self = this;
              var data = this.getAdConfig(8, 0);
              this.gameDrawerAd = Laya.Browser.window.qg.createGameDrawerAd({
                  adUnitId: data.adUnitId,
                  style: {
                      top: (Laya.stage.displayHeight - 970)
                  }
              });
              this.gameDrawerAd.onShow(function() {
                  console.log('drawer 广告显示')
              });
              this.gameDrawerAd.onError(function(err) {
                  console.log("drawer err: ", err);
                  self.destroyGameDrawerAd();
                  self.createGameDrawerAd()
              });
              SdkAdapter_OPPO.ins.showGameDrawerAd(false);
              console.log(this.className + "createGameDrawerAd()", this.gameDrawerAd)
          } else {
              console.log('快应用平台版本号低于1090，暂不支持互推盒子相关 API')
          }
      }
      showGameDrawerAd(bShow) {
          console.log(this.className + "showGameDrawerAd(" + bShow + ")");
          var self = this;
          if (this.gameDrawerAd) {
              if (bShow) {
                  this.gameDrawerAd.show()
              } else {
                  this.gameDrawerAd.hide().then(function() {
                      console.log('drawer hide success')
                  }).
                  catch(function(error) {
                      console.log('drawer hide fail with:' + error.errCode + ',' + error.errMsg)
                  })
              }
          } else {
              if (bShow) {
                  Tip.showTips("游戏正在加速赶来..");
                  this.createGameDrawerAd()
              }
          }
      }
      destroyGameDrawerAd() {
          if (this.gameDrawerAd) {
              this.gameDrawerAd.offLoad();
              this.gameDrawerAd.offError();
              this.gameDrawerAd.destroy();
              this.gameDrawerAd = null
          }
      }
      onVibrateShort() {
          Laya.Browser.window.qg.vibrateShort({
              type: "light",
              success(res) {},
              fail(res) {},
              complete(res) {}
          })
      }
      onVibrateLong() {
          Laya.Browser.window.qg.vibrateLong({
              success(res) {},
              fail(res) {},
              complete(res) {}
          })
      }
  }
  class SdkAdapter_OPPO {
      constructor() {
          this.platform = Laya.Browser.window.qg;
          this.sdk = null;
          this._nativeAd = null;
          this._nativeData = null;
          this.nativeUpdateNum = 2;
          this.nativeUpdateTimer = 0;
          this.wxurl = "oppo.json"
          this.fullAdTime = 0;
      }
      static get ins() {
          if (SdkAdapter_OPPO._instance == null) {
              SdkAdapter_OPPO._instance = new SdkAdapter_OPPO();
              if (window["qg"]) {
                  SdkAdapter_OPPO._instance.sdk = new OPPOAdapter()
              }
          }
          return SdkAdapter_OPPO._instance
      }
      initURL(callback) {
          if (window['cdnUrl']) {
              var url = window['cdnUrl'] + "oppo.json" + '?' + Math.random();
              Laya.loader.load([{
                  url: url,
                  type: Laya.Loader.JSON
              }], Laya.Handler.create(this, callback, [url]), null, Laya.Loader.JSON)
          } else {
              callback(null)
          }
      }
      init() {
          if (this.sdk) {
              this.sdk.init();
              this.createGameBannerAd()
          }
      }
      createCustomAd(type, top, pos = null) {
          if (type == 7 && (AdUtils.ins.allSwitch.bShowNativeView || !AdUtils.ins.allSwitch.nativeAd)) {
              console.log("被拦截");
              return
          }
          if (this.sdk) {
              this.sdk.createCustomAd(type, top, pos)
          }
      }
      onHideDestroyCustomAd(state) {
          if (this.sdk) {
              this.sdk.onHideDestroyCustomAd(state)
          }
      }
      showBanner(bShow, banner, callBack) {
          if (this.sdk) {}
      }
      showVideo(callback, data) {
				my.r(() => {
				callback && callback(true, data)
				});		
      }
      showFullScreenAd(name) {
        var currentTime = Math.round(new Date().getTime() / 1000);
       
      }
      getVideoAd(callback, myData) {
          if (this.sdk) {
              this.sdk.getVideoAd(callback, myData)
          }
      }
      hasShortcutInstalled(callback) {
          if (this.sdk) this.sdk.hasShortcutInstalled(callback)
      }
      installShortcut() {
          if (this.sdk) this.sdk.installShortcut()
      }
      createNativeAd(callFun) {
          if (this.sdk) {}
      }
      reportAdShow(callFun) {
          if (this.sdk) {
              if (this.nativeUpdateTimer < AdUtils.ins.allSwitch.adRefresh) {
                  this.sdk.reportAdShow();
                  this.nativeUpdateTimer++
              } else {
                  this.sdk.createNativeAd(callFun)
              }
          }
      }
      reportAdClick() {
          if (this.sdk) {
              this.sdk.reportAdClick()
          }
      }
      createGameBannerAd(state) {
          if (state == null) {
              state = 1
          }
          if (this.sdk) {
              this.sdk.createGameBannerAd(state)
          }
      }
      createFiveGameBannerAd() {
          if (this.sdk) {
              this.sdk.createFiveGameBannerAd()
          }
      }
      visibleFiveGameBannerAd(flag) {
          if (this.sdk) {
              this.sdk.visibleFiveGameBannerAd(flag)
          }
      }
      createGameDrawerAd() {
          if (this.sdk) {
              this.sdk.createGameDrawerAd()
          }
      }
      showGameDrawerAd(bShow) {
          if (this.sdk) {
              this.sdk.showGameDrawerAd(bShow)
          }
      }
      createGameBannerAdLunBo() {
          if (this.sdk) {
              this.sdk.createGameBannerAdLunBo()
          }
      }
      showGameBannerAdLunBo(bShow) {
          if (this.sdk) {
              if (Laya.Browser.window.qg.getSystemInfoSync().platformVersionCode >= 1090) {
                  this.sdk.showGameBannerAdLunBo(bShow)
              } else {
                  this.visibleFiveGameBannerAd(bShow)
              }
          }
      }
      OnMaiDian(iType, info = 0) {
          return
      }
      get nativeAd() {
          return this._nativeAd
      }
      set nativeAd(value) {
          this._nativeAd = value
      }
      get nativeData() {
          return this._nativeData
      }
      set nativeData(value) {
          this._nativeData = value
      }
  }
  class ColLock3DEntity extends Laya.Script3D {
      constructor() {
          super();
          this.unlockPriceItem = null;
          this.scene3DUIEntity = null
      }
      onAwake() {
          this.unlockPriceItem = new UnlockPriceItem();
          var viewBase = ViewControl.Inst.onShowBattleView();
          if (viewBase) {
              viewBase.box_scene3D.addChild(this.unlockPriceItem)
          }
          this.scene3DUIEntity = this.unlockPriceItem.addComponent(Scene3DUIEntity);
          this.unlockPriceItem.btn_free_money.visible = false;
          this.unlockPriceItem.btn_free_money.on(Laya.Event.CLICK, this, this.onBtnFreeMoneyClick);
          this.showUnlockPriceUI()
      }
      onLateUpdate() {}
      onTriggerEnter(other) {
          var enter3D = other.owner;
          if (enter3D.name.indexOf("s_hero") < 0) {
              console.log('被拦截');
              return
          }
          Laya.timer.clear(this, this.hideBtn);
          if (this.unlockPriceItem && AdUtils.ins.allSwitch.showGOLdView) { (this.unlockPriceItem.btn_free_money.visible = true)
          }
      }
      onTriggerStay(other) {
          if (other.owner.name != "hero") {
              return
          }
      }
      onTriggerExit(other) {
          var enter3D = other.owner;
          if (enter3D.name.indexOf("s_hero") < 0) {
              console.log('被拦截');
              return
          }
          Laya.timer.clear(this, this.hideBtn);
          Laya.timer.once(3000, this, this.hideBtn)
      }
      hideBtn() {
          Laya.timer.clear(this, this.hideBtn);
          this.unlockPriceItem && AdUtils.ins.allSwitch.showGOLdView && (this.unlockPriceItem.btn_free_money.visible = false)
      }
      showUnlockPriceUI() {
          this.scene3DUIEntity.Init3DUI(this.owner, 1)
      }
      onBtnFreeMoneyClick() {
          console.log('点击');
          SdkAdapter_OPPO.ins.showVideo((isEnd) =>{
              if (!isEnd) {
                  return
              }
              var viewBase = ViewControl.Inst.onShowBattleView();
              GameModel.Inst.goldNum += 50;
              GameModel.Inst.setGameLevel(GameModel.Inst.levelNum, GameModel.Inst.goldNum);
              viewBase.txt_gold.text = GameModel.Inst.goldNum + "";
              Tip.showTips('Get 50 coins')
          })
      }
      onDestroy() {
          Laya.timer.clearAll(this);
          this.unlockPriceItem = null;
          this.scene3DUIEntity = null;
          super.onDestroy()
      }
  }
  class MapSet {
      constructor() {
          this.spStage = new Laya.Sprite3D();
          this.spPlayer = new Laya.Sprite3D();
          this.spBlock = new Laya.Sprite3D();
          this.map = null;
          this.arrLH = [];
          this.guildPosArr = [];
          this.guild3D = null;
          this.guildTween = null
      }
      onInitMap() {
          this.spStage.name = "spStage";
          this.spPlayer.name = "spPlayer";
          this.spBlock.name = "spBlock";
          CtlSp.Inst.onAddToMesh(this.spStage);
          CtlSp.Inst.onAddToMesh(this.spPlayer);
          CtlSp.Inst.onAddToMesh(this.spBlock)
      }
      onLoadMap(map_) {
          this.onClearMap();
          ParticleCtl.Inst.onClearPart();
          this.map = map_;
          GameData.Inst.onInitData();
          this.onInitArrLH();
          HeroCtl.Inst.onCreateHero(this.spPlayer);
          this.onAddLH("", true)
      }
      onCheckOpenNextHome() {
          GameModel.Inst.homeIndex++;
          GameModel.Inst.setGameHome();
          if (GameModel.Inst.homeIndex >= 27) {
              console.log("MapSet OpenNextHome 无下一建筑开启");
              return
          }
          var nextHomeName = GameData.Inst.onHomeNameByID(GameModel.Inst.homeIndex);
          var nextHome3D = this.spStage.getChildByName(nextHomeName);
          if (!nextHome3D) {
              console.log("MapSet OpenNextHome =null");
              return
          }
          var homeCmp = nextHome3D.getComponent(GHomeBase);
          if (!homeCmp) {
              console.log("MapSet OpenNextHome cmp=null");
              return
          }
          if (homeCmp.isOpen != false && homeCmp.isLock != false) {
              console.log("MapSet OpenNextHome index" + GameModel.Inst.homeIndex + " 该建筑已开启或已解锁");
              return
          }
          if (GameModel.Inst.homeIndex != homeCmp.homeID) {
              console.log("MapSet OpenNextHome 开启与本建筑ID不同");
              return
          }
          homeCmp.onOpenHome()
      }
      onGetOpenHomePos() {
          var homeStr = GameData.Inst.onHomeNameByID(GameModel.Inst.homeIndex);
          var home3D = this.spStage.getChildByName(homeStr);
          if (!home3D) {
              console.log("MapSet GetOpenHomePos =null");
              return null
          }
          var homeCmp = home3D.getComponent(GHomeBase);
          if (!homeCmp) {
              console.log("MapSet GetOpenHomePos cmp=null");
              return null
          }
          if (homeCmp.isOpen == false) {
              return null
          }
          if (!homeCmp.colUpgrade3D) {
              return null
          }
          var pos = homeCmp.colUpgrade3D.transform.position.clone();
          return pos
      }
      onGetFactoryCmp(homeCity_) {
          var cityPre = GameData.Inst.onCityPreStrByCity(homeCity_);
          if (cityPre == "") {
              return null
          }
          var homeName = "s" + cityPre + "_factory";
          var factory3D = this.spStage.getChildByName(homeName);
          if (!factory3D) {
              return null
          }
          var factoryCmp = factory3D.getComponent(GHomeFactory);
          if (!factoryCmp) {
              return
          }
          return factoryCmp
      }
      onGetStoreCmp(homeCity_) {
          var cityPre = GameData.Inst.onCityPreStrByCity(homeCity_);
          if (cityPre == "") {
              return null
          }
          var homeName = "s" + cityPre + "_store";
          var factory3D = this.spStage.getChildByName(homeName);
          if (!factory3D) {
              return null
          }
          var storeCmp = factory3D.getComponent(GHomeStore);
          if (!storeCmp) {
              return
          }
          return storeCmp
      }
      onNextGuild() {
          if (!this.guild3D) {
              return
          }
          GameModel.Inst.guideIndex++;
          GameModel.Inst.setGameHome();
          if (GameModel.Inst.guideIndex >= this.guildPosArr.length) {
              console.log("MapSet 引导结束");
              this.guild3D.active = false;
              return
          }
          this.guildTween = Laya.Tween.to(this.guild3D.transform, {
              localScaleX: 0.01,
              localScaleY: 0.01,
              localScaleZ: 0.01
          },
          500, Laya.Ease.expoIn, Laya.Handler.create(this, this.onCompleteNextGuild), 500)
      }
      onCompleteNextGuild() {
          var pos = this.guildPosArr[GameModel.Inst.guideIndex];
          this.guild3D.transform.localPosition = new Laya.Vector3(pos.x, pos.y, pos.z);
          this.guild3D.transform.localScale = new Laya.Vector3(0.01, 0.01, 0.01);
          this.guildTween = Laya.Tween.to(this.guild3D.transform, {
              localScaleX: 1,
              localScaleY: 1,
              localScaleZ: 1
          },
          500, Laya.Ease.expoOut)
      }
      onInitGuild() {
          if (GameModel.Inst.guideIndex >= this.guildPosArr.length - 1) {
              return
          }
          if (this.guildPosArr.length <= 0) {
              return
          }
          this.guild3D = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Guide));
          var pos = this.guildPosArr[GameModel.Inst.guideIndex];
          this.guild3D.transform.localPosition = new Laya.Vector3(pos.x, pos.y, pos.z);
          this.spBlock.addChild(this.guild3D)
      }
      onAddLH(str_, isOver_ = false) {
          if (str_ != "") {
              if (!Laya.loader.getRes(str_)) {
                  this.arrLH.push(str_)
              }
          }
          if (isOver_) {
              this.onDealResMap()
          }
      }
      onClearMap() {
          CommonData.Inst.isLoadOver = false;
          this.guildPosArr = []
      }
      onInitArrLH() {
          this.arrLH = []
      }
      onDealResMap() {
          if (this.arrLH.length == 0) {
              this.onCreateMap(true)
          } else {
              Laya.loader.create(this.arrLH, Laya.Handler.create(this, this.onCreateMap))
          }
      }
      onCreateMap(isCom) {
          if (!isCom) {
              this.onDealFailMap()
          }
          GameData.Inst.homeList = [];
          this.onCreateHome();
          this.onCreateTrash();
          this.onCreateStack();
          this.onCreateGuide()
      }
      onCreateHome() {
          if (!this.map) {
              return
          }
          var arrHome = this.map.homeGrp;
          if (!arrHome) {
              return
          }
          for (let i = 0; i < arrHome.length; i++) {
              var info = arrHome[i];
              var nameStr = info.n;
              var path = this.onGetPathByName(nameStr);
              var sp3D = CtlSp.Inst.onCreateTo(this.spStage, path);
              sp3D.onSetName(nameStr);
              this.onSetSpInfo(sp3D, info);
              this.onCreateHomeGrp(sp3D.onGetSp3d(), nameStr);
              if (nameStr.indexOf("_factory") >= 0) {
                  let b = sp3D.onAddComp(GHomeFactory);
                  b.owner._children[2].addComponent(ColLock3DEntity);
                  console.log(b)
              } else if (nameStr.indexOf("_store") >= 0) {
                  let b = sp3D.onAddComp(GHomeStore);
                  b.owner._children[4].addComponent(ColLock3DEntity);
                  console.log(b)
              } else if (nameStr.indexOf("_rail") >= 0) {
                  let b = sp3D.onAddComp(GHomeRail);
                  b.owner._children[3].addComponent(ColLock3DEntity);
                  console.log(b)
              } else if (nameStr.indexOf("_belt") >= 0) {
                  let b = sp3D.onAddComp(GHomeBelt);
                  b.owner._children[3].addComponent(ColLock3DEntity);
                  console.log(b)
              } else {
                  sp3D.onAddComp(GHomeBase)
              }
          }
      }
      onCreateHomeGrp(grp3D, nameStr) {
          if (!grp3D) {
              return
          }
          if (grp3D.name.indexOf("_factory") < 0 && grp3D.name.indexOf("_store") < 0) {
              return
          }
          var colGrp = grp3D.getChildByName("colGrp");
          if (!colGrp) {
              return
          }
          var isOpen = false;
          var homeID = GameData.Inst.onHomeIDByName(nameStr);
          if (GameModel.Inst.homeIndex > homeID) {
              isOpen = true
          } else {
              isOpen = false
          }
          var ptsArr = [];
          for (let i = 0; i < colGrp.numChildren; i++) {
              var pt3D = colGrp.getChildAt(i);
              var ptPos = pt3D.transform.position.clone();
              ptsArr.push(ptPos)
          }
          GameData.Inst.homeList.push({
              pts: ptsArr,
              isT: isOpen,
              str: nameStr
          });
          colGrp.removeSelf()
      }
      onCreateTrash() {
          if (!this.map) {
              return
          }
          var arrTrash = this.map.trashGrp;
          if (!arrTrash) {
              return
          }
          for (let i = 0; i < arrTrash.length; i++) {
              var info = arrTrash[i];
              var nameStr = info.n;
              var path = this.onGetPathByName(nameStr);
              var sp3D = CtlSp.Inst.onCreateTo(this.spStage, path);
              sp3D.onSetName(nameStr);
              this.onSetSpInfo(sp3D, info);
              this.onCreateTrashGrp(sp3D.onGetSp3d(), nameStr)
          }
      }
      onCreateTrashGrp(grp3D, nameStr) {
          if (!grp3D) {
              return
          }
          var colGrp = grp3D.getChildByName("colGrp");
          if (!colGrp) {
              return
          }
          var ptsArr = [];
          for (let i = 0; i < colGrp.numChildren; i++) {
              var pt3D = colGrp.getChildAt(i);
              var ptPos = pt3D.transform.position.clone();
              ptsArr.push(ptPos)
          }
          GameData.Inst.homeList.push({
              pts: ptsArr,
              isT: true,
              str: nameStr
          });
          colGrp.removeSelf()
      }
      onCreateStack() {
          if (!this.map) {
              return
          }
          if (GameModel.Inst.homeIndex > 4) {
              return
          }
          var arrStack = this.map.stackGrp;
          if (!arrStack) {
              return
          }
          for (let i = 0; i < arrStack.length; i++) {
              var info = arrStack[i];
              var nameStr = info.n;
              var path = this.onGetPathByName(nameStr);
              var sp3D = CtlSp.Inst.onCreateTo(this.spStage, path);
              sp3D.onSetName(nameStr);
              this.onSetSpInfo(sp3D, info)
          }
      }
      onCreateGuide() {
          if (!this.map) {
              return
          }
          var arrGuide = this.map.guideGrp;
          if (!arrGuide) {
              return
          }
          for (let i = 0; i < arrGuide.length; i++) {
              var info = arrGuide[i];
              var nameStr = info.n;
              var posX = Number(info.p[0]);
              var posY = Number(info.p[1]);
              var posZ = Number(info.p[2]);
              var pos = new Laya.Vector3( - 1 * posX, posY, posZ);
              var count = Number(nameStr.slice(8, nameStr.length));
              this.guildPosArr[count] = pos
          }
          this.onInitGuild()
      }
      onGetPathByName(nameStr_) {
          var strPath = "";
          switch (nameStr_) {
          case "s_iron_factory":
              strPath = ResPath.Mesh_Iron_Factory;
              break;
          case "s_iron_store":
              strPath = ResPath.Mesh_Iron_Store;
              break;
          case "s_iron_rail":
              strPath = ResPath.Mesh_Iron_Rail;
              break;
          case "s_screw_factory":
              strPath = ResPath.Mesh_Screw_Factory;
              break;
          case "s_screw_store":
              strPath = ResPath.Mesh_Screw_Store;
              break;
          case "s_screw_rail":
              strPath = ResPath.Mesh_Screw_Rail;
              break;
          case "s_screw_belt":
              strPath = ResPath.Mesh_Screw_Belt;
              break;
          case "s_battery_factory":
              strPath = ResPath.Mesh_Battery_Factory;
              break;
          case "s_battery_store":
              strPath = ResPath.Mesh_Battery_Store;
              break;
          case "s_battery_rail":
              strPath = ResPath.Mesh_Battery_Rail;
              break;
          case "s_battery_belt":
              strPath = ResPath.Mesh_Battery_Belt;
              break;
          case "s_glass_factory":
              strPath = ResPath.Mesh_Glass_Factory;
              break;
          case "s_glass_store":
              strPath = ResPath.Mesh_Glass_Store;
              break;
          case "s_glass_rail":
              strPath = ResPath.Mesh_Glass_Rail;
              break;
          case "s_bulb_factory":
              strPath = ResPath.Mesh_Bulb_Factory;
              break;
          case "s_bulb_store":
              strPath = ResPath.Mesh_Bulb_Store;
              break;
          case "s_bulb_rail":
              strPath = ResPath.Mesh_Bulb_Rail;
              break;
          case "s_bulb_belt":
              strPath = ResPath.Mesh_Bulb_Belt;
              break;
          case "s_monitor_factory":
              strPath = ResPath.Mesh_Monitor_Factory;
              break;
          case "s_monitor_store":
              strPath = ResPath.Mesh_Monitor_Store;
              break;
          case "s_monitor_rail":
              strPath = ResPath.Mesh_Monitor_Rail;
              break;
          case "s_monitor_belt":
              strPath = ResPath.Mesh_Monitor_Belt;
              break;
          case "s_laptop_factory":
              strPath = ResPath.Mesh_Laptop_Factory;
              break;
          case "s_laptop_store":
              strPath = ResPath.Mesh_Laptop_Store;
              break;
          case "s_laptop_rail":
              strPath = ResPath.Mesh_Laptop_Rail;
              break;
          case "s_laptop_belt1":
              strPath = ResPath.Mesh_Laptop_Relt1;
              break;
          case "s_laptop_belt2":
              strPath = ResPath.Mesh_Laptop_Relt2;
              break;
          case "s_trash":
              strPath = ResPath.Mesh_Trash;
              break;
          case "s_money_stack":
              strPath = ResPath.Mesh_Money_Stack;
              break;
          default:
              console.error("Mapset PathByName null nameStr_=" + nameStr_);
              break
          }
          return strPath
      }
      onSetSpInfo(mesh_, info_) {
          if (!mesh_) {
              console.log("MapSet SpInfo mesh_=null;");
              return
          }
          if (!info_) {
              console.log("MapSet SpInfo info_=null;");
              return
          }
          if (info_.p) {
              var vP = info_.p;
              mesh_.onSetP( - 1 * vP[0], vP[1], vP[2])
          }
          if (info_.r) {
              var vR = info_.r;
              mesh_.onSetR(vR[0], -1 * vR[1], vR[2])
          }
          if (info_.s) {
              var vS = info_.s;
              mesh_.onGetSp3d().transform.localScale = new Laya.Vector3(vS[0], vS[1], vS[2])
          }
      }
      onDealFailMap() {}
  }
  class JsonUtils {
      constructor() {
          this._cfg = []
      }
      static get ins() {
          if (JsonUtils._instance == null) {
              JsonUtils._instance = new JsonUtils()
          }
          return JsonUtils._instance
      }
      load(arr) {
          Laya.loader.load(arr, Laya.Handler.create(this, this.complete), Laya.Handler.create(this, this.onProgress, null, false), null, 1, true, null, true);
          this._arrData = arr
      }
      onProgress(evt) {
          Laya.stage.event(GameEvent.JSON_PRESS, evt)
      }
      parseJsonToCfg(jsonName, jsonData) {
          if (!jsonData) {
              console.warn("cant`t find jsondata by name = [%s]", jsonName);
              return
          }
          var names = jsonName.split("/");
          if (names.length == 0) {
              return
          }
          var nameWithSuffix = names[names.length - 1];
          var realNames = nameWithSuffix.split('.');
          if (realNames.length != 2) {
              return
          }
          var realName = realNames[0];
          var realData = jsonData[realName];
          this._cfg[realNames[0]] = realData ? realData: jsonData
      }
      complete(evt) {
          let arr = [];
          if (this._arrData == null || this._arrData.length <= 0) {
              return
          }
          for (let index = 0; index < this._arrData.length; index++) {
              const element = this._arrData[index];
              console.log(this._arrData[index].url);
              let zip = new JSZip(Laya.loader.getRes(this._arrData[index].url));
              console.log(zip.files);
              for (let key in zip.files) {
                  var obj = zip.files[key];
                  if (obj.dir) {
                      continue
                  }
                  if (key.indexOf('.json') >= 0) {
                      this.parseJsonToCfg(key, JSON.parse(zip.file(key).asText()))
                  } else {
                      if (key.indexOf('.lm') >= 0 && key.indexOf('.lmat') < 0 || key.indexOf('.lani') >= 0 || key.indexOf('.ltcb') >= 0) {
                          arr[key] = zip.file(key).asArrayBuffer()
                      } else if (key.indexOf('.jpg') >= 0 || key.indexOf('.png') >= 0) {} else {
                          arr[key] = JSON.parse(zip.file(key).asText())
                      }
                  }
              }
              Laya.loader.clearRes(this._arrData[0].url)
          }
          this._arrData = [];
          console.log(arr);
          Laya.Browser.window.jszipArr = arr;
          Laya.Browser.window.getZipArr = this.getZipArr
      }
      getZipArr(key) {
          var arr = null;
          if (Laya.Browser.window.jszipArr != null && Laya.Browser.window.jszipArr[key]) {
              arr = [];
              arr = arr.concat(Laya.Browser.window.jszipArr[key])
          }
          return arr ? arr[0] : arr
      }
      getCfg(name) {
          return window._cfg[name]
      }
      getDataByName(name) {
          return window._cfg[name]
      }
      GetLength() {
          return window._cfg.length - 1
      }
  }
  class MapCtl {
      constructor() {
          this.map = null;
          this.mapSet = new MapSet()
      }
      onInitMap() {
          this.mapSet.onInitMap();
          this.onResetMap()
      }
      onGetMapSet() {
          return this.mapSet
      }
      onResetMap() {
          var map = JsonUtils.ins.getCfg("map");
          this.mapSet.onLoadMap(map)
      }
  }
  MapCtl.Inst = new MapCtl();
  class GCameraCmp extends ScriptBase {
      constructor() {
          super()
      }
      onAwake() {
          super.onAwake()
      }
      onLateUpdate() {
          super.onLateUpdate();
          if (!CommonData.Inst.isBeginGame) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          var posVct = HeroCtl.Inst.onGetRolePos();
          this.myTrans.localPosition = posVct
      }
  }
  class CameraCtl {
      constructor() {
          this.cameraFather = null;
          this.initFatPos = new Laya.Vector3(0, 0, 0);
          this.cam3D = null;
          this.cmpCam = null
      }
      onInitCamera() {
          this.cameraFather = CtlSp.Inst.onGetScene().getChildByName("CameraFather");
          this.cam3D = this.cameraFather.getChildByName("Main Camera");
          this.cam3D.clearFlag = Laya.BaseCamera.CLEARFLAG_SOLIDCOLOR;
          this.cameraFather.transform.localPosition = this.initFatPos;
          this.cmpCam = this.cameraFather.addComponent(GCameraCmp);
          this.cam3D.enableHDR = false;
          this.cam3D.nearPlane = 0.3;
          this.cam3D.farPlane = 1200
      }
      onGetCameraWorldPoint(pos) {
          var vct4 = new Laya.Vector4();
          this.cam3D.worldToNormalizedViewportPoint(pos, vct4);
          return vct4
      }
  }
  CameraCtl.Inst = new CameraCtl();
  class GameCtl {
      constructor() {
          this.soundCmp = new Sound()
      }
      onInitGame() {
          CtlSp.Inst.onCreateBg(ResPath.Mesh_Scene);
          this.onPlaySound(ResPath.Sound_Bgm, true);
          GameData.Inst.onInitData();
          CameraCtl.Inst.onInitCamera();
          ParticleCtl.Inst.onInitCreatePart();
          MapCtl.Inst.onInitMap();
          ViewControl.Inst.onShowBattleView()
      }
      onNextGame() {}
      onResetGame() {}
      onStartGame() {
          CommonData.Inst.isBeginGame = true;
          CommonData.Inst.isPauseGame = false;
          GameModel.Inst.onCheckLoginData();
          HeroCtl.Inst.onStartGame()
      }
      onFailGame() {}
      onPlaySound(str, bBgm = false, bLoop = false) {
          this.soundCmp.onPlay(str, bBgm, bLoop)
      }
      onPlaySoundOnce(str) {
          this.soundCmp.onPlayByOnce(str)
      }
      onStopSound(str, bBgm = false) {
          if (bBgm) {
              this.soundCmp.onStopBgm()
          } else {
              this.soundCmp.onStopEffect(str)
          }
      }
      onSetSound(bSet) {
          if (bSet) {
              this.soundCmp.onSetMusicVolume(1);
              this.soundCmp.onSetSoundVolume(1)
          } else {
              this.soundCmp.onSetMusicVolume(0);
              this.soundCmp.onSetSoundVolume(0)
          }
      }
  }
  GameCtl.Inst = new GameCtl();
  class investment extends ui.investmentUI {
      constructor(cb) {
          super();
          this.cb = null;
          this.reward = 50;
          this.cb = cb
      }
      onAwake() {
          AdUtils.ins.InCmTimes++;
          AdUtils.ins.noAd = true;
          if (AdUtils.ins.allSwitch.allSwitch) {
              Laya.timer.once(2 * 1000, this, () =>{})
          }
          this.reward = (AdUtils.ins.InCmTimes - 1) * 10 + 50;
          this.lab_reward.text = this.reward + " Coins";
          this.box_get.on(Laya.Event.CLICK, this, this.onBtnGetClick);
          this.btn_video.on(Laya.Event.CLICK, this, this.onBtnVideoClick);
          this.btn_ad1.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.img_ad_bg1.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.btn_ad_close1.on(Laya.Event.CLICK, this, this.onBtnAdClose);
          this.mask1.on(Laya.Event.CLICK, this, () =>{});
          this.ad_bg1.visible = false;
          this.btn_ad1.visible = false;
        SdkAdapter_OPPO.ins.showFullScreenAd("investmentUI");
        Laya.stage.event('closeAd')
      }
      onBtnAdClose(e) {
          this.ad_bg1.visible = false;
          this.btn_ad1.visible = false;
          if (e) {
              e.stopPropagation()
          }
      }
      showHireInfo() {}
      onBtnGetClick() {
          this.onCloseView(false)
      }
      onBtnVideoClick() {
          SdkAdapter_OPPO.ins.showVideo((isEnd) =>{
              if (!isEnd) {
                  return
              }
              GameModel.Inst.goldNum += Number(this.reward);
              GameModel.Inst.setGameLevel(GameModel.Inst.levelNum, GameModel.Inst.goldNum);
              Tip.showTips('Get ' + this.reward + ' coins');
              this.onCloseView(true);
              var viewBase = ViewControl.Inst.onShowBattleView();
              viewBase.txt_gold.text = GameModel.Inst.goldNum + ""
          })
      }
      onCloseView(isVideo) {
          Laya.stage.event('showAd');
          Laya.timer.clearAll(this);
          this.box_get.off(Laya.Event.CLICK, this, this.onBtnGetClick);
          this.btn_video.off(Laya.Event.CLICK, this, this.onBtnVideoClick);
          Laya.stage.removeChild(this);
          AdUtils.ins.noAd = false;
          this.cb && this.cb()
      }
      onDestroy() {}
  }
  class AdView extends ui.AdUI {
      constructor(cb) {
          super();
          this.className = "AdView.";
          this.a = 0;
          this.b = 0;
          this.callback = null;
          this.onInit();
          this.callback = cb
      }
      close() {
          super.close();
          Laya.timer.clearAll(this)
      }
      onInit(func) {
          AdUtils.ins.IsInAd = true;
          this.a = 0;
          this.b = 0;
          this.btn_ad_close.scaleX = AdUtils.ins.allSwitch.Btnscale;
          this.btn_ad_close.scaleY = AdUtils.ins.allSwitch.Btnscale;
          this.btn_ad_close.zOrder = 9999;
          this.visible = true;
          this.btn_ad.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.img_ad_bg.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.btn_ad_close.on(Laya.Event.CLICK, this, this.onBtnAdClose);
          this.panel_bg.on(Laya.Event.CLICK, this, () =>{});
          SdkAdapter_OPPO.ins.showFullScreenAd("AdUI");
          Laya.stage.event('closeAd')
      }
      onBtnAdClose(e) {
          this.a++;
          this.btn_ad_close.off(Laya.Event.CLICK, this, this.onBtnAdClose);
          this.ad_bg.visible = false;
          this.btn_ad.visible = false;
          console.log("关闭广告");
          if (e) {
              e.stopPropagation()
          }
          this.onClose()
      }
      onClose() {
          if (!AdUtils.ins.noAd) {
              Laya.stage.event('showAd')
          }
          AdUtils.ins.IsInAd = false;
          SdkAdapter_OPPO.ins.showGameBannerAdLunBo(false);
          Laya.timer.clearAll(this);
          this.btn_ad.off(Laya.Event.CLICK, this, this.reportAdClick);
          this.img_ad_bg.off(Laya.Event.CLICK, this, this.reportAdClick);
          this.btn_ad_close.off(Laya.Event.CLICK, this, this.onBtnAdClose);
          Laya.stage.removeChild(this);
          this.callback && this.callback()
      }
  }
  class BattleControl extends ui.BattleViewUI {
      constructor() {
          super();
          this.curTouchId = -1;
          this.maxDistance = 0;
          this.moveRatio = new Laya.Point;
          this.moveTargrt = new Laya.Point;
          this.initPos = null;
          this.isHand = true;
          this.countIndustryTime = 0;
          this.SeedTime = 0;
          this.tryId = 0
      }
      onCloseCarTime() {
          this.txt_car_time.visible = false
      }
      onShowCarTime(time) {
          this.txt_car_time.visible = true;
          this.txt_car_time.text = CommonUtils.onTimeToStr(time)
      }
      onInit() {
          this.onRefreshTask();
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.background.anchorX = 0.5;
          this.background.anchorY = 0.5;
          this.forground.anchorX = 0.5;
          this.forground.anchorY = 0.5;
          this.background.visible = false;
          this.forground.visible = false;
          GameCtl.Inst.onStartGame();
          this.onRefreshGold();
          this.onRefreshMoney();
          this.boxTip.visible = false;
          this.curTouchId = -1;
          this.initPos = new Laya.Vector2(this.background.x, this.background.y);
          this.maxDistance = this.background.width / 2;
          this.txt_industry_time.visible = false;
          this.btnShop.on(Laya.Event.CLICK, this, this.onShopBtn);
          this.btnView.on(Laya.Event.MOUSE_DOWN, this, this.onViewDown);
          Laya.stage.on(GameEvent.REFRESH_TASK, this, this.onRefreshTask);
          Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onStageUp);
          this.boxCar.on(Laya.Event.CLICK, this, this.onClickCarBtn);
          Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onStageUp);
          this.AddGoldBtn.visible = !!AdUtils.ins.allSwitch.showBtn;
          this.btn_skin.visible = !!AdUtils.ins.allSwitch.showBtn;
          this.bagBtn.visible = !!AdUtils.ins.allSwitch.showBtn;
          this.btn_ad.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.img_ad_bg.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.btn_ad_close.on(Laya.Event.CLICK, this, this.onBtnAdClose);
          Laya.stage.on(GameEvent.REFRESH_GOLD, this, this.onRefreshGold);
          this.btnIndustry.on(Laya.Event.CLICK, this, this.onIndustryBtn);
          Laya.stage.on(GameEvent.REFRESH_MONEY, this, this.onRefreshMoney);
          this.btnUpgrade.on(Laya.Event.CLICK, this, this.onUpgradeBtn);
          this.btnTask.on(Laya.Event.CLICK, this, this.onTaskBtn);
          this.AddGoldBtn.visible = false;
          Laya.timer.once(30 * 1000, this, () =>{
              this.AddGoldBtn.visible = true
          });
          this.AddGoldBtn.on(Laya.Event.CLICK, this, this.onOpenTz);
          if (!window.ystorage.getItem('privacy')) {
              window.ystorage.setItem('privacy', "0")
          }
          this.mask1.on(Laya.Event.CLICK, this, () =>{});
          this.bagBtn.on(Laya.Event.CLICK, this, this.setSpeed);
          this.btn_skin.on(Laya.Event.CLICK, this, this.onTryskinBtn);
          this.timeBox.visible = false;
          Laya.timer.once(10 * 1000, this, () =>{
              if (!AdUtils.ins.allSwitch.nativeAd || AdUtils.ins.allSwitch.bShowNativeView) {
                  return
              }
              if (!Laya.Browser.window.qg) {
                  return
              }
              if (this.CheckView() && SdkAdapter_OPPO.ins.nativeData) {
                  Laya.stage.addChild(new AdView(() =>{
                      this.reShowAd()
                  }))
              } else {
                  this.reShowAd()
              }
          });
          this.randomSKin();
          Laya.timer.loop(30 * 1000, this, this.randomSKin);
          this.godbox.on(Laya.Event.CLICK, this, () =>{
              this.angleBox.visible = !0;
              let a = GameModel.Inst.getGameHome();
              AdUtils.ins.InCmTimes = a.homeIndex;
              let b = (AdUtils.ins.InCmTimes - 1) * 5 + 5;
              this.AngleLable.text = '+' + (b * 2);
              SdkAdapter_OPPO.ins.showFullScreenAd("godbox");
          });
          this.angleBtn.on(Laya.Event.CLICK, this, () =>{
              SdkAdapter_OPPO.ins.showVideo((res) =>{
                  if (!res) {
                      return
                  };
                  let a = GameModel.Inst.getGameHome();
                  AdUtils.ins.InCmTimes = a.homeIndex;
                  let b = (AdUtils.ins.InCmTimes - 1) * 5 + 5;
                  this.AngleLable.text = '+' + (b * 2);
                  GameModel.Inst.city0Money += Number(b) * 2;
                  GameModel.Inst.setGameMoney();
                  this.txt_money.text = GameModel.Inst.city0Money.toString();
                  AdUtils.ins.noAd = false;
                  this.angleBox.visible = !1;
                  Tip.showTips('Get ' + (b * 2) + ' money')
              },
              '天使投资')
          });
          this.angleClose.on(Laya.Event.CLICK, this, () =>{
              AdUtils.ins.noAd = false;
              this.angleBox.visible = !1
          });
          Laya.timer.loop(AdUtils.ins.allSwitch.angleTime * 1000, this, this.playAni)
      }
      playAni() {
          if (this.angleBox.visible) {
              return
          }
          this.ani6.play(0, false)
      }
      onRefreshTask() {
          this.img_task_red.visible = true;
          if (GameModel.Inst.bTask0 == false) {
              var isComplete0 = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task0_id, GameModel.Inst.task0_count);
              if (isComplete0) {
                  return
              }
          }
          if (GameModel.Inst.bTask1 == false) {
              var isComplete1 = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task1_id, GameModel.Inst.task1_count);
              if (isComplete1) {
                  return
              }
          }
          if (GameModel.Inst.bTask2 == false) {
              var isComplete2 = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task2_id, GameModel.Inst.task2_count);
              if (isComplete2) {
                  return
              }
          }
          this.img_task_red.visible = false
      }
      onCheckTaskMoney() {
          if (GameModel.Inst.city0Money < GameData.Inst.maxTaskMoney) {
              return
          }
          if (GameModel.Inst.task0_id == GameEnum.E_TASK.TASK_3) {
              GameModel.Inst.task0_count = GameData.Inst.maxTaskMoney
          } else if (GameModel.Inst.task1_id == GameEnum.E_TASK.TASK_3) {
              GameModel.Inst.task1_count = GameData.Inst.maxTaskMoney
          } else if (GameModel.Inst.task2_id == GameEnum.E_TASK.TASK_3) {
              GameModel.Inst.task2_count = GameData.Inst.maxTaskMoney
          }
          Laya.stage.event(GameEvent.REFRESH_TASK)
      }
      onTaskBtn() {
          ViewControl.Inst.onShowTaskView()
      }
      onClickCarBtn() {
          SdkAdapter_OPPO.ins.showVideo((res) =>{
              if (res) {
                  var titleStr = "跑车试用";
                  var descStr = "车辆换成跑车，可持续" + AdUtils.ins.allSwitch.carUseTime + "秒";
                  HeroCtl.Inst.onGetHeroCmp().onBattleTryCarHeroSin(10)
              }
          },
          "跑车试用")
      }
      onIndustryBtn() {
          var titleStr = "Revolution";
          var descStr = "所有生产速度和NPC移动速度翻倍，可持续" + AdUtils.ins.allSwitch.industryTime + "秒";
          ViewControl.Inst.onShowSureView(titleStr, descStr, () =>{
              console.log("Battle 工业革命 开始");
              this.onStartIndustryTime()
          })
      }
      onStartIndustryTime() {
          if (this.txt_industry_time.visible == true) {
              return
          }
          this.txt_industry_time.visible = true;
          GameData.Inst.industrySpeed = 0.5;
          this.countIndustryTime = Date.now() + AdUtils.ins.allSwitch.industryTime * 1000;
          this.txt_industry_time.text = CommonUtils.onTimeToStr(AdUtils.ins.allSwitch.industryTime * 1000);
          Laya.timer.clear(this, this.onLoopIndustryTotal);
          this.onLoopIndustryTotal();
          Laya.timer.loop(1000, this, this.onLoopIndustryTotal)
      }
      onLoopIndustryTotal() {
          var time = this.countIndustryTime - Date.now();
          if (time <= 0) {
              console.log("Battle 工业革命 时间到");
              this.txt_industry_time.text = "00:00";
              Laya.timer.clear(this, this.onLoopIndustryTotal);
              GameData.Inst.industrySpeed = 0;
              this.txt_industry_time.visible = false
          } else {
              this.txt_industry_time.text = CommonUtils.onTimeToStr(time)
          }
      }
      onUpgradeBtn() {
          ViewControl.Inst.onShowUpgradeView()
      }
      onBtnAdClose(e) {
          this.ad_bg.visible = false;
          this.btn_ad.visible = false;
          if (e) {
              e.stopPropagation()
          }
      }
      setSpeed() {
          SdkAdapter_OPPO.ins.showVideo((res) =>{
              if (res) {
                  GameData.Inst.roleSpeed = 0.3;
                  Tip.showTips('Speed Up');
                  this.SeedTime += 180 * 1000;
                  this.timeBox.visible = true;
                  this.setSpeedOver();
                  Laya.timer.clear(this, this.setSpeedOver);
                  Laya.timer.loop(1000, this, this.setSpeedOver)
              }
          })
      }
      onTimeToStr(times) {
          var timeStr = "";
          var time = Math.floor(times / 1000);
          var second = time % 60;
          var minute = Math.floor(time / 60);
          if (minute > 99) {
              timeStr = "99:"
          } else if (minute >= 10) {
              timeStr = minute + ":"
          } else {
              timeStr = "0" + minute + ":"
          }
          if (second >= 10) {
              timeStr += second
          } else {
              timeStr += "0" + second
          }
          return timeStr
      }
      setSpeedOver() {
          if (this.SeedTime <= 0) {
              GameData.Inst.roleSpeed = 0.2;
              this.timeBox.visible = false;
              Laya.timer.clear(this, this.setSpeedOver);
              return
          }
          this.SeedTime -= 1000;
          let a = this.onTimeToStr(this.SeedTime);
          this.timeLable.text = a
      }
      onTryskinBtn() {
          SdkAdapter_OPPO.ins.showVideo((res) =>{
              if (res) {
                  Laya.timer.clear(this, this.TrySkinTimeOver);
                  GameModel.Inst.roleId = this.tryId;
                  HeroCtl.Inst.onGetHeroCmp().onSetSkin(GameModel.Inst.roleId);
                  Laya.timer.once(60 * 1000, this, this.TrySkinTimeOver);
                  Tip.showTips('Try 1 minutes')
              }
          })
      }
      TrySkinTimeOver() {
          GameModel.Inst.roleId = 0;
          HeroCtl.Inst.onGetHeroCmp().onSetSkin(GameModel.Inst.roleId)
      }
      randomSKin() {
          this.tryId = Math.floor(Math.random() * 5);
          this.img_skin_try.skin = "res/shop/skin_" + this.tryId + ".png"
      }
      reShowAd() {
          if (!AdUtils.ins.allSwitch.nativeAd || AdUtils.ins.allSwitch.bShowNativeView) {
              return
          }
          Laya.timer.once(AdUtils.ins.allSwitch.reShowAdTime, this, () =>{
              if (this.CheckView() && SdkAdapter_OPPO.ins.nativeData) {
                  Laya.stage.addChild(new AdView(() =>{
                      this.reShowAd()
                  }))
              } else {
                  this.reShowAd()
              }
          })
      }
      CheckView() {
          if (AdUtils.ins.noAd) {
              return false
          }
          return true
      }
      onOpenTz() {
          Laya.stage.addChild(new investment(() =>{
              this.AddGoldBtn.visible = false;
              Laya.timer.once(20 * 1000, this, () =>{
                  this.AddGoldBtn.visible = true
              })
          }))
      }
      onCloseView() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          this.btnShop.off(Laya.Event.CLICK, this, this.onShopBtn);
          this.btnView.off(Laya.Event.MOUSE_DOWN, this, this.onViewDown);
          Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onStageUp);
          Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onStageUp);
          Laya.stage.off(GameEvent.REFRESH_GOLD, this, this.onRefreshGold);
          Laya.stage.off(GameEvent.REFRESH_MONEY, this, this.onRefreshMoney)
      }
      onTestMoney() {
          GameModel.Inst.city0Money += 100;
          this.onRefreshMoney()
      }
      onShopBtn() {
          ViewControl.Inst.onShowShopView()
      }
      onRefreshGold() {
          this.txt_gold.text = GameModel.Inst.goldNum.toString();
          this.onSetData()
      }
      onSetData() {}
      onRefreshMoney() {
          this.txt_money.text = GameModel.Inst.city0Money.toString();
          this.onCheckTaskMoney()
      }
      onUpdateBoxTip() {
          if (GameModel.Inst.homeIndex < 1) {
              this.boxTip.visible = false;
              return
          }
          if (GameModel.Inst.homeIndex >= 27) {
              this.boxTip.visible = false;
              return
          }
          var pos = MapCtl.Inst.onGetMapSet().onGetOpenHomePos();
          if (!pos) {
              this.boxTip.visible = false;
              return
          }
          this.boxTip.visible = true;
          var heroPos = HeroCtl.Inst.onGetRolePos();
          var angle = CommonUtils.onCountAngle(heroPos.x, heroPos.z, pos.x, pos.z);
          this.img_tip.rotation = ((angle + 180) % 360);
          var vc4 = CameraCtl.Inst.onGetCameraWorldPoint(pos);
          var posX = vc4.x / Laya.stage.clientScaleX;
          var posY = vc4.y / Laya.stage.clientScaleY;
          var imgW = this.width * posX;
          var imgH = this.height * posY;
          if (imgW <= 50) {
              this.boxTip.x = 50
          } else if (imgW >= this.width - 50) {
              this.boxTip.x = this.width - 50
          } else {
              this.boxTip.x = imgW
          }
          if (imgH <= 50) {
              this.boxTip.y = 50
          } else if (imgH >= this.height - 450) {
              this.boxTip.y = this.height - 450
          } else {
              this.boxTip.y = imgH
          }
          if (imgW >= 100 && imgW <= this.width - 100 && imgH >= 200 && imgH <= this.height - 600) {
              this.boxTip.visible = false
          } else {
              this.boxTip.visible = true
          }
      }
      onViewDown(event) {
          if (this.curTouchId != -1) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
          if (this.isHand) {
              this.isHand = false;
              this.boxHand.visible = false
          }
          this.curTouchId = event.touchId;
          this.background.x = Laya.stage.mouseX;
          this.background.y = Laya.stage.mouseY;
          this.forground.x = Laya.stage.mouseX;
          this.forground.y = Laya.stage.mouseY;
          this.background.visible = true;
          this.forground.visible = true;
          Laya.stage.event(GameEvent.MOUSE_INPUT_DOWN, this.moveRatio)
      }
      onTouchMove(event) {
          if (this.curTouchId != event.touchId) {
              return
          }
          if (CommonData.Inst.isPauseGame) {
              return
          }
          var locationPos = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY);
          if (this.maxDistance >= CommonUtils.distance(locationPos.x, locationPos.y, this.background.x, this.background.y)) {
              this.moveTargrt.x = locationPos.x;
              this.moveTargrt.y = locationPos.y
          } else {
              var deltaX = locationPos.x - this.background.x;
              var deltaY = locationPos.y - this.background.y;
              var angle = Math.atan2(deltaY, deltaX);
              this.moveTargrt.x = this.background.x + Math.cos(angle) * this.maxDistance;
              this.moveTargrt.y = this.background.y + Math.sin(angle) * this.maxDistance
          }
          this.forground.pos(this.moveTargrt.x, this.moveTargrt.y);
          this.moveRatio.x = (this.forground.x - this.background.x) / this.maxDistance;
          this.moveRatio.y = (this.forground.y - this.background.y) / this.maxDistance;
          Laya.stage.event(GameEvent.MOUSE_INPUT_MOVE, this.moveRatio)
      }
      onStageUp(event) {
          if (event.touchId != this.curTouchId) {
              return
          }
          this.curTouchId = -1;
          Laya.stage.event(GameEvent.MOUSE_INPUT_UP);
          Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
          this.background.x = this.initPos.x;
          this.background.y = this.initPos.y;
          this.forground.x = this.initPos.x;
          this.forground.y = this.initPos.y;
          this.background.visible = false;
          this.forground.visible = false
      }
  }
  class LoadingControl extends ui.LoadingViewUI {
      constructor() {
          super();
          this.curProgress = 0;
          this.jsonProgress = 0;
          this.subPackProgress = 0;
          this.pro = 0
      }
      onInit() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.img_bg.skin = ResPath.LOADING_BG;
          this.img_logo.skin = "";
          this.img_logo.visible = true;
          this.img_pro.skin = ResPath.LOADING_PRO;
          this.img_pro_bg.skin = ResPath.LOADING_PRO_BG;
          this.img_pro_txt.skin = ResPath.LOADING_PRO_TXT;
          this.img_pro.visible = false;
          this.img_pro_bg.visible = false;
          this.img_pro_txt.visible = false;
          this.health.visible = false;
          Laya.timer.once(800, this, () =>{
              this.img_pro.visible = true;
              this.img_pro_bg.visible = true;
              this.img_pro_txt.visible = true;
              this.health.visible = true;
              this.boxzqr.visible = !!AdUtils.ins.allSwitch.zzqr
          });
          this.onUpdataProgress();
          Laya.stage.on(GameEvent.SUB_PRESS, this, this.onSubPress);
          Laya.stage.on(GameEvent.JSON_PRESS, this, this.onJson);
          Laya.stage.on(GameEvent.RES_PRESS, this, this.onResPress)
      }
      onUpdataProgress() {
          var _width = 528;
          var pross = this.curProgress + this.jsonProgress + this.subPackProgress;
          this.img_pro.width = pross <= 0 ? 1 / 100 * _width: pross / 100 * _width
      }
      onSubPress(data) {
          this.subPackProgress = Math.floor(data * 30);
          this.onUpdataProgress()
      }
      onJson(data) {
          this.jsonProgress = Math.floor(data * 10);
          this.onUpdataProgress()
      }
      onResPress(data) {
          this.curProgress = Math.floor(data * 60);
          this.onUpdataProgress()
      }
      onRemove() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          this.pro = 0;
          Laya.stage.off(GameEvent.SUB_PRESS, this, this.onSubPress);
          Laya.stage.off(GameEvent.JSON_PRESS, this, this.onJson);
          Laya.stage.off(GameEvent.RES_PRESS, this, this.onResPress);
          ViewControl.Inst.onClearLoadingView()
      }
  }
  class HomeControl extends ui.HomeViewUI {
      constructor() {
          super()
      }
      onInit() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.onRefreshGold();
          this.onRefreshMoney();
          this.btnBegin.on(Laya.Event.CLICK, this, this.onBeginBtn);
          Laya.stage.on(GameEvent.REFRESH_GOLD, this, this.onRefreshGold);
          Laya.stage.on(GameEvent.REFRESH_MONEY, this, this.onRefreshMoney)
      }
      onCloseView() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          this.btnBegin.off(Laya.Event.CLICK, this, this.onBeginBtn);
          Laya.stage.off(GameEvent.REFRESH_GOLD, this, this.onRefreshGold);
          Laya.stage.off(GameEvent.REFRESH_MONEY, this, this.onRefreshMoney);
          ViewControl.Inst.onClearHomeView()
      }
      onRefreshGold() {
          this.txt_gold.text = GameModel.Inst.goldNum.toString();
          this.onSetData()
      }
      onSetData() {}
      onRefreshMoney() {
          this.txt_money.text = GameModel.Inst.city0Money.toString()
      }
      onBeginBtn() {
          ViewControl.Inst.onShowBattleView();
          this.onCloseView()
      }
  }
  class ShopControl extends ui.ShopViewUI {
      constructor() {
          super();
          this.roleID = -1;
          this.hatID = -1;
          this.wallID = -1;
          this.showHatID = -1;
          this.showRoleID = -1;
          this.showWallID = -1;
          this.clickRoleID = -1;
          this.selectID = -1;
          this.isAni = false;
          this.Anitime = 50;
          this.type = 0;
          this.playerGrp = null;
          this.playerAni = null;
          this.player3D = null;
          this.carGrp = null;
          this.cloth3D = null;
          this.wall3D = null;
          this.moneyCount = 1000
      }
      onInit() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.type = 0;
          this.showHatID = -1;
          this.showRoleID = -1;
          this.showWallID = -1;
          this.roleID = GameModel.Inst.roleId;
          this.hatID = GameModel.Inst.hatId;
          this.wallID = GameModel.Inst.wallId;
          this.boxTab.visible = false;
          this.txt_video_gold.text = this.moneyCount + "";
          this.list.vScrollBarSkin = "";
          this.list.renderHandler = new Laya.Handler(this, this.gameHandler);
          this.setBtnState();
          this.onUpdateGold();
          this.btnRand.visible = GameModel.Inst.roleList.length < 7;
          this.btnVideo.visible = GameModel.Inst.roleList.length < 7;
          this.btnBack.on(Laya.Event.CLICK, this, this.onBackBtn);
          this.btnRand.on(Laya.Event.CLICK, this, this.onRandBtn);
          this.btnVideo.on(Laya.Event.CLICK, this, this.onVideoBtn);
          this.btnTab1.on(Laya.Event.CLICK, this, this.onTab1Btn);
          this.btnTab2.on(Laya.Event.CLICK, this, this.onTab2Btn);
          this.btnTab3.on(Laya.Event.CLICK, this, this.onTab3Btn);
          AdUtils.ins.noAd = true;
          SdkAdapter_OPPO.ins.showFullScreenAd("ShopViewUI");
      }
      onCloseView() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          var lastScene = this.getChildByName("d3Shop");
          if (lastScene) {
              lastScene.removeChildren()
          }
          AdUtils.ins.noAd = false;
          this.btnBack.off(Laya.Event.CLICK, this, this.onBackBtn);
          this.btnRand.off(Laya.Event.CLICK, this, this.onRandBtn);
          this.btnVideo.off(Laya.Event.CLICK, this, this.onVideoBtn);
          this.btnTab1.off(Laya.Event.CLICK, this, this.onTab1Btn);
          this.btnTab2.off(Laya.Event.CLICK, this, this.onTab2Btn);
          this.btnTab3.off(Laya.Event.CLICK, this, this.onTab3Btn);
          ViewControl.Inst.onClearShopView()
      }
      onUpdateGold() {
          this.txt_gold.text = GameModel.Inst.goldNum.toString();
          var needGold = 1000 + 500 * GameModel.Inst.roleList.length;
          if (GameModel.Inst.goldNum >= needGold) {
              this.btnRand.gray = false
          } else {
              this.btnRand.gray = true
          }
      }
      setBtnState() {
          this.setListDate()
      }
      setListDate() {
          var arr = [];
          for (let j = 0; j <= 6; j++) {
              arr.push({
                  id: j,
                  lock: false
              })
          }
          arr.forEach(element =>{
              if (GameModel.Inst.roleList.indexOf(element.id) != -1) {
                  element.lock = true
              }
          });
          this.txt_rand_gold.text = (1000 + 500 * GameModel.Inst.roleList.length) + '';
          this.btnRand.visible = GameModel.Inst.roleList.length < 10;
          this.btnVideo.visible = GameModel.Inst.roleList.length < 10;
          this.showArr = arr;
          this.list.array = this.showArr;
          this.list.refresh()
      }
      gameHandler(cell, index) {
          cell.off(Laya.Event.CLICK, this, this.onClick);
          cell.imgSelect.visible = false;
          var role = this.showRoleID < 0 ? this.roleID: this.showRoleID;
          if (cell.dataSource.id == role) {
              this.onClick(cell, false)
          }
          cell.imgIcon.skin = "res/shop/skin_" + cell.dataSource.id + ".png";
          if (cell.dataSource.lock) {
              cell.imgNo.visible = false;
              cell.imgCount.visible = false;
              cell.imgIcon.alpha = 1
          } else {
              cell.imgNo.visible = true;
              cell.imgCount.visible = true;
              cell.txt_video_count.text = "0/1";
              cell.imgIcon.alpha = 0.5
          }
          cell.on(Laya.Event.CLICK, this, this.onClick, [cell, true])
      }
      onClick(cell, isClick = false) {
          var data = cell.dataSource;
          if (data.lock) {
              this.roleID = cell.dataSource.id;
              this.clickRoleID = -1;
              this.btnWall.visible = false
          } else {
              this.btnWall.visible = false;
              this.clickRoleID = cell.dataSource.id;
              this.onClickBtn(isClick)
          }
          this.loadModel(cell);
          for (let index = 0; index < cell.parent.numChildren; index++) {
              const element = cell.parent.getChildAt(index);
              if (element.visible && element.dataSource) {
                  element.imgSelect.visible = element.dataSource.id == data.id
              }
          }
      }
      loadModel(cell) {
          var scene = this.unLockSpri.getChildByName("d3Shop");
          if (!scene) {
              scene = new Laya.Scene3D();
              scene.name = "d3Shop";
              this.unLockSpri.addChild(scene);
              scene.ambientColor = new Laya.Vector3(176 / 255, 176 / 255, 176 / 255);
              var camera = new Laya.Camera(0, 0.3, 1000);
              scene.addChild(camera);
              camera.clearFlag = Laya.CameraClearFlags.DepthOnly;
              camera.transform.translate(new Laya.Vector3(0, 5, 10));
              camera.transform.rotate(new Laya.Vector3( - 40, 0, 0), true, false);
              let directionLight = new Laya.DirectionLight();
              scene.addChild(directionLight);
              directionLight.color = new Laya.Vector3(204 / 255, 204 / 255, 204 / 255);
              directionLight.intensity = 0.7;
              directionLight.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
              directionLight.transform.position = new Laya.Vector3(0, 0, 0);
              this.playerGrp = Laya.Sprite3D.instantiate(Laya.loader.getRes(ResPath.Mesh_Hero));
              this.playerGrp.active = true;
              this.playerGrp.transform.localPosition = new Laya.Vector3(0, 0, 0);
              this.playerGrp.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
              this.playerGrp.transform.localScale = new Laya.Vector3(1, 1, 1);
              if (this.playerGrp) {
                  this.player3D = this.playerGrp.getChildByName("bodyGrp")
              }
              this.onSetActivePlayer();
              scene.addChild(this.playerGrp)
          }
          this.onSetSkin(cell.dataSource.id);
          Laya.timer.frameLoop(1, this, this.onLoopRotY)
      }
      onSetModelRoleID(dataID_) {
          this.onSetSkinCar(this.showHatID < 0 ? this.hatID: this.showHatID)
      }
      onSetSkin(roleID_) {
          if (!this.player3D) {
              return
          }
          this.showRoleID = roleID_;
          this.player3D.destroyChildren();
          this.player3D.removeChildren();
          var path = GameData.Inst.onGetSkinPath(this.showRoleID);
          var body = Laya.Sprite3D.instantiate(Laya.loader.getRes(path));
          body.transform.localPosition = new Laya.Vector3(0, 0, 0);
          this.player3D.addChild(body)
      }
      onSetSkinCar(hatID_) {
          if (!this.carGrp) {
              return
          }
          this.showHatID = hatID_;
          for (let i = 0; i <= 15; i++) {
              var car3D = this.carGrp.getChildAt(i);
              if (car3D && i == hatID_) {
                  car3D.active = true
              } else if (car3D) {
                  car3D.active = false
              }
          }
      }
      onSetSkinWall(wallID_) {
          if (!this.wall3D) {
              return
          }
          if (this.wall3D.name.indexOf("block_1") < 0) {
              return
          }
          this.showWallID = wallID_;
          var mesh3D = this.wall3D;
          var skinMat = mesh3D.meshRenderer.material;
          var wallStr = wallID_ >= 10 ? wallID_.toString() : "0" + wallID_;
          var skinPath = "res/skin/tas_" + wallStr + ".png";
          Laya.Texture2D.load(skinPath, Laya.Handler.create(this,
          function(txt) {
              skinMat.albedoTexture = txt
          }))
      }
      onSetActivePlayer() {
          if (!this.playerGrp) {
              return
          }
          var smoke3D = this.playerGrp.getChildByName("smoke");
          if (smoke3D) {
              smoke3D.active = false
          }
          var zd3D = this.playerGrp.getChildByName("zdGrp");
          if (zd3D) {
              zd3D.active = false
          }
      }
      onLoopRotY() {
          if (this.playerGrp) {
              var rotY = this.playerGrp.transform.localRotationEulerY;
              if (rotY > 360) {
                  rotY = rotY - 360
              }
              this.playerGrp.transform.localRotationEulerY = rotY + 1
          }
      }
      onRandBtn() {
          if (this.isAni) {
              console.log("解锁动画中不可点击");
              return
          }
          if (GameModel.Inst.goldNum < 1000 + 500 * GameModel.Inst.roleList.length) {
              console.log("金币不足");
              return
          }
          var arr = [];
          for (let i = 2; i <= 6; i++) {
              if (GameModel.Inst.roleList.indexOf(i) == -1) {
                  arr.push(i)
              }
          }
          if (arr.length > 1) {
              var arr1 = [];
              for (let j = 0; j < this.list.cells.length; j++) {
                  const element = this.list.cells[j];
                  if (element.visible && element.dataSource) {
                      if (!element.dataSource.lock) {
                          arr1.push(element)
                      } else {
                          element.imgSelect.visible = false
                      }
                  }
              }
              arr1.sort(() =>{
                  return (Math.random() - 0.5)
              });
              this.showAniId = 0;
              this.aniType = 0;
              this.Anitime = 200;
              this.isAni = true;
              this.showLockAni(arr1)
          } else {
              var arr2 = [];
              for (let index = 0; index < this.list.cells.length; index++) {
                  const element = this.list.cells[index];
                  if (element.visible && element.dataSource) {
                      if (!element.dataSource.lock) {
                          arr2.push(element)
                      } else {
                          element.imgSelect.visible = false
                      }
                  }
              }
              this.lockAni(arr2[0])
          }
      }
      lockAni(cell) {
          this.isAni = false;
          var id = cell.dataSource.id;
          this.roleID = id;
          this.showRoleID = id;
          GameModel.Inst.goldNum -= (1000 + 500 * GameModel.Inst.roleList.length);
          GameModel.Inst.setGameLevel(GameModel.Inst.levelNum, GameModel.Inst.goldNum);
          GameModel.Inst.roleList.push(id);
          GameModel.Inst.setGameRole();
          this.onUpdateGold();
          Laya.stage.event(GameEvent.REFRESH_GOLD);
          this.setListDate();
          this.txt_rand_gold.text = (1000 + 500 * GameModel.Inst.roleList.length) + '';
          this.btnRand.visible = GameModel.Inst.roleList.length < 7;
          this.btnVideo.visible = GameModel.Inst.roleList.length < 7
      }
      showLockAni(arr) {
          for (let index = 0; index < arr.length; index++) {
              const element = arr[index];
              if (index == this.showAniId) {
                  element.imgSelect.visible = true
              } else {
                  element.imgSelect.visible = false
              }
          }
          var cell = arr[this.showAniId];
          this.showAniId++;
          if (this.showAniId >= arr.length) {
              this.showAniId = 0
          }
          if (this.aniType == 0) {
              if (this.Anitime >= 70) {
                  this.Anitime -= 10
              } else if (this.Anitime < 70 && this.Anitime >= 40) {
                  this.Anitime -= 2
              } else {
                  this.aniType = 1;
                  this.Anitime += 2
              }
              Laya.timer.once(this.Anitime, this, this.showLockAni.bind(this, arr))
          } else if (this.aniType == 1) {
              if (this.Anitime >= 40 && this.Anitime < 70) {
                  this.Anitime += 2
              } else if (this.Anitime >= 70 && this.Anitime < 300) {
                  this.Anitime += 20
              } else {
                  this.aniType = 2
              }
              Laya.timer.once(this.Anitime, this, this.showLockAni.bind(this, arr))
          } else {
              Laya.timer.once(100, this,
              function() {
                  this.lockAni(cell)
              }.bind(this, cell))
          }
      }
      onClickBtn(isClick) {
          if (this.isAni) {
              return
          }
          if (!isClick) {
              return
          }
          var that = this;
          SdkAdapter_OPPO.ins.showVideo(res =>{
              if (res) {
                  that.videoClickSucess(true)
              }
          })
      }
      videoClickSucess(isEnd) {
          if (!isEnd) {
              return
          }
          if (GameModel.Inst.roleList.indexOf(this.clickRoleID) >= 0) {
              console.log("Shop clickRoleID=" + this.clickRoleID + "已解锁");
              return
          }
          console.log("Shop 视频观看成功 解锁clickRoleID=" + this.clickRoleID);
          this.roleID = this.clickRoleID;
          GameModel.Inst.roleList.push(this.clickRoleID);
          GameModel.Inst.setGameRole();
          this.setListDate();
          this.txt_rand_gold.text = (1000 + 500 * GameModel.Inst.roleList.length) + '';
          this.btnRand.visible = GameModel.Inst.roleList.length < 7;
          this.btnVideo.visible = GameModel.Inst.roleList.length < 7
      }
      onVideoBtn() {
          if (this.isAni) {
              return
          }
          var that = this;
          SdkAdapter_OPPO.ins.showVideo(res =>{
              if (res) that.videoSucess(true)
          })
      }
      videoSucess(isEnd) {
          if (!isEnd) {
              return
          }
          GameModel.Inst.goldNum += this.moneyCount;
          GameModel.Inst.setGameLevel(GameModel.Inst.levelNum, GameModel.Inst.goldNum);
          this.onUpdateGold();
          Laya.stage.event(GameEvent.REFRESH_GOLD)
      }
      onTab1Btn() {
          if (this.isAni) {
              return
          }
          this.type = 0;
          this.setBtnState()
      }
      onTab2Btn() {
          if (this.isAni) {
              return
          }
          this.type = 1;
          this.setBtnState()
      }
      onTab3Btn() {
          if (this.isAni) {
              return
          }
          this.type = 2;
          this.setBtnState()
      }
      onBackBtn() {
          if (this.roleID != GameModel.Inst.roleId) {
              GameModel.Inst.roleId = this.roleID;
              HeroCtl.Inst.onGetHeroCmp().onSetSkin(GameModel.Inst.roleId)
          }
          GameModel.Inst.setGameRole();
          this.onCloseView()
      }
  }
  class UpgradeControl extends ui.UpgradeViewUI {
      constructor() {
          super()
      }
      onInit() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          AdUtils.ins.noAd = true;
          Laya.stage.event('closeAd');
          this.onSetData();
          this.btn_bag.on(Laya.Event.CLICK, this, this.onBagBtn);
          this.btn_speed.on(Laya.Event.CLICK, this, this.onSpeedBtn);
          this.btnClose.on(Laya.Event.CLICK, this, this.onCloseBtn);
          this.btn_ad1.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.img_ad_bg1.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.btn_ad_close1.on(Laya.Event.CLICK, this, this.onBtnAdClose);
          this.ad_bg1.visible = false;
          this.btn_ad1.visible = false;
          this.mask1.on(Laya.Event.CLICK, this, () =>{});
          SdkAdapter_OPPO.ins.showFullScreenAd("UpgradeViewUI");
      }
      onBtnAdClose(e) {
          this.ad_bg1.visible = false;
          this.btn_ad1.visible = false;
          if (e) {
              e.stopPropagation()
          }
      }
      onCloseView() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          AdUtils.ins.noAd = false;
          Laya.stage.event('showAd');
          this.btn_bag.off(Laya.Event.CLICK, this, this.onBagBtn);
          this.btn_speed.off(Laya.Event.CLICK, this, this.onSpeedBtn);
          this.btnClose.off(Laya.Event.CLICK, this, this.onCloseBtn);
          ViewControl.Inst.onClearUpgradeView()
      }
      onSetData() {
          this.txt_bag_lv.text = "Lv." + GameModel.Inst.bagLv;
          this.txt_speed_lv.text = "Lv." + GameModel.Inst.speedLv;
          if (GameModel.Inst.bagLv >= 10) {
              this.btn_bag.gray = true
          } else {
              this.btn_bag.gray = false
          }
          if (GameModel.Inst.speedLv >= 10) {
              this.btn_speed.gray = true
          } else {
              this.btn_speed.gray = false
          }
      }
      onBagBtn() {
          if (GameModel.Inst.bagLv >= 10) {
              return
          }
          SdkAdapter_OPPO.ins.showVideo((res) =>{
              if (res) {
                  this.videoBagSucess(true)
              }
          },
          '背包容量')
      }
      videoBagSucess(isEnd) {
          if (!isEnd) {
              return
          }
          GameModel.Inst.bagLv++;
          GameModel.Inst.setGameAtt();
          this.onSetData();
          HeroCtl.Inst.onGetHeroCmp().onCheckBagFull()
      }
      onSpeedBtn() {
          if (GameModel.Inst.speedLv >= 10) {
              return
          }
          SdkAdapter_OPPO.ins.showVideo((res) =>{
              if (res) {
                  this.videoSpeedSucess(true)
              }
          },
          '载具速度')
      }
      videoSpeedSucess(isEnd) {
          if (!isEnd) {
              return
          }
          GameModel.Inst.speedLv++;
          GameModel.Inst.setGameAtt();
          this.onSetData();
          HeroCtl.Inst.onGetHeroCmp().onCheckBagFull()
      }
      onCloseBtn() {
          this.onCloseView()
      }
  }
  class SureControl extends ui.SureViewUI {
      constructor() {
          super()
      }
      onInit(titleStr, descStr, func) {
          if (func) {
              this.func = func
          }
          this.txt_title.text = titleStr;
          this.txt_desc.text = descStr;
          this.btnClose.on(Laya.Event.CLICK, this, this.onCloseBtn);
          this.btnCancel.on(Laya.Event.CLICK, this, this.onCloseBtn);
          this.btnSure.on(Laya.Event.CLICK, this, this.onCannelBtn);
          this.mask1.on(Laya.Event.CLICK, this, () =>{});
          this.txt_desc.text = 'Factory speed X2\nNPC speed X2\n' + AdUtils.ins.allSwitch.industryTime + ' seconds';
          this.btn_ad1.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.img_ad_bg1.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.btn_ad_close1.on(Laya.Event.CLICK, this, this.onBtnAdClose);
          this.ad_bg1.visible = false;
          this.btn_ad1.visible = false;
          SdkAdapter_OPPO.ins.showFullScreenAd("SureViewUI");
          Laya.stage.event('closeAd')
      }
      onBtnAdClose(e) {
          this.ad_bg1.visible = false;
          this.btn_ad1.visible = false;
          if (e) {
              e.stopPropagation()
          }
      }
      onCloseView() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          AdUtils.ins.noAd = false;
          Laya.stage.event('showAd');
          this.btnClose.off(Laya.Event.CLICK, this, this.onCloseBtn);
          this.btnCancel.off(Laya.Event.CLICK, this, this.onCloseBtn);
          this.btnSure.off(Laya.Event.CLICK, this, this.onCannelBtn);
          ViewControl.Inst.onClearSureView()
      }
      onCannelBtn() {
          SdkAdapter_OPPO.ins.showVideo((res) =>{
              if (res) {
                  this.videoSucess(true)
              }
          },
          "工业革命")
      }
      videoSucess(isEnd) {
          if (!isEnd) {
              return
          }
          if (this.func) {
              this.func()
          }
          this.onCloseView()
      }
      onCloseBtn() {
          this.onCloseView()
      }
  }
  class TaskControl extends ui.TaskViewUI {
      constructor() {
          super()
      }
      onInit() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.onSetData();
          this.btnClose.on(Laya.Event.CLICK, this, this.onCloseBtn);
          this.btnTask0.on(Laya.Event.CLICK, this, this.onTask0Btn);
          this.btnTask1.on(Laya.Event.CLICK, this, this.onTask1Btn);
          this.btnTask2.on(Laya.Event.CLICK, this, this.onTask2Btn);
          Laya.stage.on(GameEvent.REFRESH_TASK, this, this.onRefreshTask);
          this.btn_ad1.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.img_ad_bg1.on(Laya.Event.CLICK, this, this.reportAdClick);
          this.btn_ad_close1.on(Laya.Event.CLICK, this, this.onBtnAdClose);
          this.ad_bg1.visible = false;
          this.mask1.on(Laya.Event.CLICK, this, () =>{});
          this.btn_ad1.visible = false;
          SdkAdapter_OPPO.ins.showFullScreenAd("TaskViewUI");
          Laya.stage.event('closeAd')
      }
      onBtnAdClose(e) {
          this.ad_bg1.visible = false;
          this.btn_ad1.visible = false;
          if (e) {
              e.stopPropagation()
          }
      }
      onCloseView() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this);
          AdUtils.ins.noAd = false;
          Laya.stage.event('showAd');
          this.btnClose.off(Laya.Event.CLICK, this, this.onCloseBtn);
          this.btnTask0.off(Laya.Event.CLICK, this, this.onTask0Btn);
          this.btnTask1.off(Laya.Event.CLICK, this, this.onTask1Btn);
          this.btnTask2.off(Laya.Event.CLICK, this, this.onTask2Btn);
          Laya.stage.off(GameEvent.REFRESH_TASK, this, this.onRefreshTask);
          ViewControl.Inst.onClearTaskView()
      }
      onRefreshTask() {
          this.onSetData()
      }
      onSetData() {
          if (GameModel.Inst.bTask0) {
              this.btnTask0.gray = true;
              this.txt_btn_task0.text = "Got"
          } else {
              var isComplete0 = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task0_id, GameModel.Inst.task0_count);
              if (isComplete0) {
                  this.btnTask0.gray = false;
                  this.txt_btn_task0.text = "Get"
              } else {
                  this.btnTask0.gray = true;
                  this.txt_btn_task0.text = "Unfinish"
              }
          }
          if (GameModel.Inst.bTask1) {
              this.btnTask1.gray = true;
              this.txt_btn_task1.text = "Got"
          } else {
              var isComplete1 = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task1_id, GameModel.Inst.task1_count);
              if (isComplete1) {
                  this.btnTask1.gray = false;
                  this.txt_btn_task1.text = "Get"
              } else {
                  this.btnTask1.gray = true;
                  this.txt_btn_task1.text = "Unfinish"
              }
          }
          if (GameModel.Inst.bTask2) {
              this.btnTask2.gray = true;
              this.txt_btn_task2.text = "Got"
          } else {
              var isComplete2 = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task2_id, GameModel.Inst.task2_count);
              if (isComplete2) {
                  this.btnTask2.gray = false;
                  this.txt_btn_task2.text = "Get"
              } else {
                  this.btnTask2.gray = true;
                  this.txt_btn_task2.text = "Unfinish"
              }
          }
          this.txt_task_0.text = this.onGetTaskStr(GameModel.Inst.task0_id, GameModel.Inst.task0_count);
          this.txt_task_1.text = this.onGetTaskStr(GameModel.Inst.task1_id, GameModel.Inst.task1_count);
          this.txt_task_2.text = this.onGetTaskStr(GameModel.Inst.task2_id, GameModel.Inst.task2_count)
      }
      onGetTaskStr(taskID, taskCount) {
          var taskStr = "";
          taskStr = GameData.Inst.onGetTaskStrByID(taskID);
          if (taskID == GameEnum.E_TASK.TASK_3) {
              var isComplete3 = GameModel.Inst.onCheckTaskComplete(taskID, taskCount);
              if (isComplete3) {
                  taskStr = taskStr.replace("count", taskCount.toString());
                  taskStr = taskStr.replace("max", GameData.Inst.maxTaskMoney + "")
              } else {
                  taskStr = taskStr.replace("count", GameModel.Inst.city0Money + "");
                  taskStr = taskStr.replace("max", GameData.Inst.maxTaskMoney + "")
              }
          } else if (taskID == GameEnum.E_TASK.TASK_4) {
              taskStr = taskStr.replace("count", taskCount.toString());
              taskStr = taskStr.replace("max", GameData.Inst.maxTaskMoveRes + "")
          } else if (taskID == GameEnum.E_TASK.TASK_5) {
              taskStr = taskStr.replace("count", taskCount.toString());
              taskStr = taskStr.replace("max", GameData.Inst.maxTaskMoveScrew + "")
          } else if (taskID == GameEnum.E_TASK.TASK_6) {
              taskStr = taskStr.replace("count", taskCount.toString());
              taskStr = taskStr.replace("max", GameData.Inst.maxTaskBuyBattery + "")
          } else if (taskID == GameEnum.E_TASK.TASK_7) {
              taskStr = taskStr.replace("count", taskCount.toString());
              taskStr = taskStr.replace("max", GameData.Inst.maxTaskGetMoney + "")
          } else if (taskID == GameEnum.E_TASK.TASK_8) {
              taskStr = taskStr.replace("count", taskCount.toString());
              taskStr = taskStr.replace("max", GameData.Inst.maxTaskLoginTime + "")
          }
          return taskStr
      }
      onTask0Btn() {
          if (GameModel.Inst.bTask0) {
              return
          }
          var isComplete = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task0_id, GameModel.Inst.task0_count);
          if (!isComplete) {
              return
          }
          GameModel.Inst.bTask0 = true;
          GameModel.Inst.onSetTask();
          Laya.stage.event(GameEvent.REFRESH_TASK);
          GameModel.Inst.goldNum += 1000;
          GameModel.Inst.setGameLevel(GameModel.Inst.levelNum, GameModel.Inst.goldNum);
          Laya.stage.event(GameEvent.REFRESH_GOLD);
          this.onSetData()
      }
      onTask1Btn() {
          if (GameModel.Inst.bTask1) {
              return
          }
          var isComplete = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task1_id, GameModel.Inst.task1_count);
          if (!isComplete) {
              return
          }
          GameModel.Inst.bTask1 = true;
          GameModel.Inst.onSetTask();
          Laya.stage.event(GameEvent.REFRESH_TASK);
          GameModel.Inst.goldNum += 1000;
          GameModel.Inst.setGameLevel(GameModel.Inst.levelNum, GameModel.Inst.goldNum);
          Laya.stage.event(GameEvent.REFRESH_GOLD);
          this.onSetData()
      }
      onTask2Btn() {
          if (GameModel.Inst.bTask2) {
              return
          }
          var isComplete = GameModel.Inst.onCheckTaskComplete(GameModel.Inst.task2_id, GameModel.Inst.task2_count);
          if (!isComplete) {
              return
          }
          GameModel.Inst.bTask2 = true;
          GameModel.Inst.onSetTask();
          Laya.stage.event(GameEvent.REFRESH_TASK);
          GameModel.Inst.goldNum += 1000;
          GameModel.Inst.setGameLevel(GameModel.Inst.levelNum, GameModel.Inst.goldNum);
          Laya.stage.event(GameEvent.REFRESH_GOLD);
          this.onSetData()
      }
      onCloseBtn() {
          this.onCloseView()
      }
  }
  class ViewControl {
      constructor() {
          this.loading = null;
          this.home = null;
          this.battle = null;
          this.Box = null;
          this.shop = null;
          this.sure = null;
          this.task = null;
          this.upgrade = null
      }
      onBattleShowCarTime(time) {
          if (this.battle) {
              this.battle.onShowCarTime(time)
          }
      }
      onShowTaskView() {
          if (!this.task) {
              this.task = new TaskControl();
              this.task.onInit();
              Laya.stage.addChild(this.task)
          }
          return this.task
      }
      onClearTaskView() {
          if (!this.task) {
              return
          }
          Laya.stage.removeChild(this.task);
          this.task = null
      }
      onBattleCloseCarTime() {
          if (this.battle) {
              this.battle.onCloseCarTime()
          }
      }
      onShowLoadingView() {
          if (!this.loading) {
              this.loading = new LoadingControl();
              this.loading.onInit();
              Laya.stage.addChild(this.loading)
          }
          return this.loading
      }
      onClearLoadingView() {
          if (!this.loading) {
              return
          }
          Laya.stage.removeChild(this.loading);
          this.loading = null
      }
      onShowUpgradeView() {
          if (!this.upgrade) {
              this.upgrade = new UpgradeControl();
              this.upgrade.onInit();
              Laya.stage.addChild(this.upgrade)
          }
          return this.upgrade
      }
      onClearUpgradeView() {
          if (!this.upgrade) {
              return
          }
          Laya.stage.removeChild(this.upgrade);
          this.upgrade = null
      }
      onShowSureView(titleStr, descStr, func) {
          if (!this.sure) {
              this.sure = new SureControl();
              this.sure.onInit(titleStr, descStr, func);
              Laya.stage.addChild(this.sure)
          }
          return this.sure
      }
      onClearSureView() {
          if (!this.sure) {
              return
          }
          Laya.stage.removeChild(this.sure);
          this.sure = null
      }
      onShowHomeView() {
          if (!this.home) {
              this.home = new HomeControl();
              this.home.onInit();
              Laya.stage.addChild(this.home)
          }
          return this.home
      }
      onClearHomeView() {
          if (!this.home) {
              return
          }
          Laya.stage.removeChild(this.home);
          this.home = null
      }
      onShowBattleView() {
          if (!this.battle) {
              this.battle = new BattleControl();
              this.battle.onInit();
              Laya.stage.addChild(this.battle)
          }
          return this.battle
      }
      onClearBattleView() {
          if (!this.battle) {
              return
          }
          this.battle.onCloseView();
          Laya.stage.removeChild(this.battle);
          this.battle = null
      }
      onClearBoxView() {
          if (!this.Box) {
              return
          }
          this.Box.onClose();
          Laya.stage.removeChild(this.Box);
          this.Box = null
      }
      onBattleUpdateBoxTip() {
          if (this.battle) {
              this.battle.onUpdateBoxTip()
          }
      }
      onShowShopView() {
          if (!this.shop) {
              this.shop = new ShopControl();
              this.shop.onInit();
              Laya.stage.addChild(this.shop)
          }
          return this.shop
      }
      onClearShopView() {
          if (!this.shop) {
              return
          }
          Laya.stage.removeChild(this.shop);
          this.shop = null
      }
  }
  ViewControl.Inst = new ViewControl();
  class InitScene extends ui.InitSceneUI {
      constructor() {
          super();
          this.isOver2D = false;
          this.isOver3D = false;
          this.arr3d = [ResPath.Mesh_Scene, ResPath.Mesh_Hero, ResPath.Mesh_Skin_0, ResPath.Mesh_Skin_1, ResPath.Mesh_Skin_2, ResPath.Mesh_Skin_3, ResPath.Mesh_Skin_4, ResPath.Mesh_Skin_5, ResPath.Mesh_Skin_6, ResPath.Mesh_Skin_Car, ResPath.Mesh_Customer, ResPath.Mesh_Bot, ResPath.Mesh_Ico_Money, ResPath.Mesh_Ico_Iron, ResPath.Mesh_Ico_Screw, ResPath.Mesh_Ico_Battery, ResPath.Mesh_Ico_Glass, ResPath.Mesh_Ico_Bulb, ResPath.Mesh_Ico_Monitor, ResPath.Mesh_Ico_Laptop, ResPath.Mesh_Money_Stack, ResPath.Mesh_Guide, ResPath.Mesh_SmokeUp, ResPath.Mesh_Iron_Factory, ResPath.Mesh_Iron_Store, ResPath.Mesh_Iron_Rail, ResPath.Mesh_Screw_Factory, ResPath.Mesh_Screw_Store, ResPath.Mesh_Screw_Rail, ResPath.Mesh_Screw_Belt, ResPath.Mesh_Battery_Factory, ResPath.Mesh_Battery_Store, ResPath.Mesh_Battery_Rail, ResPath.Mesh_Battery_Belt, ResPath.Mesh_Glass_Factory, ResPath.Mesh_Glass_Store, ResPath.Mesh_Glass_Rail, ResPath.Mesh_Bulb_Factory, ResPath.Mesh_Bulb_Store, ResPath.Mesh_Bulb_Rail, ResPath.Mesh_Bulb_Belt, ResPath.Mesh_Monitor_Factory, ResPath.Mesh_Monitor_Store, ResPath.Mesh_Monitor_Rail, ResPath.Mesh_Monitor_Belt, ResPath.Mesh_Laptop_Factory, ResPath.Mesh_Laptop_Store, ResPath.Mesh_Laptop_Rail, ResPath.Mesh_Laptop_Relt1, ResPath.Mesh_Laptop_Relt2, ResPath.Mesh_Trash, ResPath.Mesh_Arrow];
          this.arr2d = [{
              url: 'res/atlas/res/common.atlas',
              type: "atlas"
          },
          {
              url: 'res/atlas/res/battle.atlas',
              type: "atlas"
          },
          {
              url: 'res/atlas/res/home.atlas',
              type: "atlas"
          },
          {
              url: 'res/atlas/res/shop.atlas',
              type: "atlas"
          }];
          this.configList = [{
              url: 'config/00.json',
              type: "json"
          },
          {
              url: 'config/1.json',
              type: "json"
          },
          {
              url: 'config/1_test.json',
              type: "json"
          },
          {
              url: 'config/2.json',
              type: "json"
          },
          {
              url: 'config/3.json',
              type: "json"
          },
          {
              url: 'config/4.json',
              type: "json"
          },
          {
              url: 'config/5.json',
              type: "json"
          },
          {
              url: 'config/6.json',
              type: "json"
          },
          {
              url: 'config/7.json',
              type: "json"
          },
          {
              url: 'config/8.json',
              type: "json"
          },
          {
              url: 'config/9.json',
              type: "json"
          },
          {
              url: 'config/10.json',
              type: "json"
          },
          {
              url: 'config/11.json',
              type: "json"
          },
          {
              url: 'config/12.json',
              type: "json"
          },
          {
              url: 'config/13.json',
              type: "json"
          },
          {
              url: 'config/14.json',
              type: "json"
          },
          {
              url: 'config/15.json',
              type: "json"
          },
          {
              url: 'config/banner.json',
              type: "json"
          },
          {
              url: 'config/level.json',
              type: "json"
          },
          {
              url: 'config/level1.json',
              type: "json"
          },
          {
              url: 'config/levelGun.json',
              type: "json"
          },
          {
              url: 'config/load.json',
              type: "json"
          },
          {
              url: 'config/lock.json',
              type: "json"
          },
          {
              url: 'config/map.json',
              type: "json"
          }];
          this.onLoadRes()
      }
      onLoadRes() {
          ViewControl.Inst.onShowLoadingView();
          SdkAdapter_OPPO.ins.init();
          AdUtils.ins.onInit();
          Laya.loader.load(this.configList, Laya.Handler.create(this, () =>{
              window._cfg = [];
              window._cfg["00"] = Laya.loader.getRes('config/00.json');
              window._cfg["1"] = Laya.loader.getRes('config/1.json'),
              window._cfg["2"] = Laya.loader.getRes('config/2.json'),
              window._cfg["3"] = Laya.loader.getRes('config/3.json'),
              window._cfg["4"] = Laya.loader.getRes('config/4.json'),
              window._cfg["5"] = Laya.loader.getRes('config/5.json'),
              window._cfg["6"] = Laya.loader.getRes('config/6.json'),
              window._cfg["7"] = Laya.loader.getRes('config/7.json'),
              window._cfg["8"] = Laya.loader.getRes('config/8.json'),
              window._cfg["9"] = Laya.loader.getRes('config/9.json'),
              window._cfg["10"] = Laya.loader.getRes('config/10.json'),
              window._cfg["11"] = Laya.loader.getRes('config/11.json'),
              window._cfg["12"] = Laya.loader.getRes('config/12.json'),
              window._cfg["13"] = Laya.loader.getRes('config/13.json'),
              window._cfg["14"] = Laya.loader.getRes('config/14.json'),
              window._cfg["15"] = Laya.loader.getRes('config/15.json'),
              window._cfg["banner"] = Laya.loader.getRes('config/banner.json'),
              window._cfg["level"] = Laya.loader.getRes('config/level.json'),
              window._cfg["level1"] = Laya.loader.getRes('config/level1.json'),
              window._cfg["levelGun"] = Laya.loader.getRes('config/levelGun.json'),
              window._cfg["load"] = Laya.loader.getRes('config/load.json'),
              window._cfg["lock"] = Laya.loader.getRes('config/lock.json'),
              window._cfg["map"] = Laya.loader.getRes('config/map.json'),
              window._cfg["1_test"] = Laya.loader.getRes('config/1_test.json');
              this.onCompleteLoading()
          }))
      }
      onCompleteLoading() {
          console.log("zip解压成功");
          Laya.loader.off(Laya.Event.COMPLETE, this, this.onCompleteLoading);
          GameModel.Inst.onLoadInitData();
          if (this.arr3d.length == 0) {
              this.onLoadOver3D()
          } else {
              Laya.loader.create(this.arr3d, Laya.Handler.create(this, this.onLoadOver3D), Laya.Handler.create(this, this.onProgress, null, false))
          }
          if (this.arr2d.length == 0) {
              this.onLoadOver2D()
          } else {
              Laya.loader.load(this.arr2d, Laya.Handler.create(this, this.onLoadOver2D))
          }
      }
      onLoadOver3D() {
          this.isOver3D = true;
          if (this.isOver3D && this.isOver2D) {
              this.onInitScene()
          }
      }
      onLoadOver2D() {
          this.isOver2D = true;
          if (this.isOver3D && this.isOver2D) {
              this.onInitScene()
          }
      }
      onProgress(data) {
          Laya.stage.event(GameEvent.RES_PRESS, data)
      }
      onInitScene() {
          ViewControl.Inst.onClearLoadingView();
          GameCtl.Inst.onInitGame()
      }
  }
  class GameConfig {
      constructor() {}
      static init() {
          var reg = Laya.ClassUtils.regClass;
          reg("script/InitScene.ts", InitScene)
      }
  }
  GameConfig.width = 750;
  GameConfig.height = 1334;
  GameConfig.scaleMode = window.isPhone?"fixedwidth":"showall";
  GameConfig.screenMode = "none";
  GameConfig.alignV = "middle";
  GameConfig.alignH = "center";
  GameConfig.startScene = "InitScene.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;
  GameConfig.init();
  class Main {
      constructor() {
        //   Config.useRetinalCanvas = true;
        window.ystorage = Laya.LocalStorage;
        Config.isAntialias = true;
        if (window["Laya3D"]) {
            Laya3D.init(GameConfig.width, GameConfig.height, null, Laya.Handler.create(this, this.initMain));
        }
        else {
            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            this.initMain()
        }
      }
      initMain() {
          Laya["Physics"] && Laya["Physics"].enable();
          Laya["DebugPanel"] && Laya["DebugPanel"].enable();
          Laya.stage.scaleMode = GameConfig.scaleMode;
          Laya.stage.screenMode = GameConfig.screenMode;
          Laya.stage.alignV = GameConfig.alignV;
          Laya.stage.alignH = GameConfig.alignH;
          Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
          if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
          if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
          if (GameConfig.stat) Laya.Stat.show();
          Laya.alertGlobalError(true);
          Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION)
      }
      onVersionLoaded() {
				setTimeout(function(){
                            my.i(() => {});
                        }, 500);
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded))
		my.init({
                 gamemonetizeId: "lhvjpt6jwirquallmo8gnrbul6ozui36",
                 complete: () => {
          console.log('gamemonetizeId');
	}
	         })		
      }
      onConfigLoaded() {
        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene)
      }
  }
  new Main()
} ());