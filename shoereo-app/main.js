/*
 *     Copyright (C) 2010-2016 Marvell International Ltd.
 *     Copyright (C) 2002-2010 Kinoma, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */

/* === IMPORT STATEMENTS === */

import { selectMovesetScreen } from "select-moveset-screen";
import { selectMarksetScreen } from "select-markset-screen";
import { performanceScreen, performanceDetailsScreen, performanceExpandedScreen } from "performance-screen";
import { sharingPerformanceScreen, sharingMovesetScreen } from "sharing-screen";

/* === GLOBAL VARIABLES DECLARATION === */

var screenArray = [];
var currentScreen;

/* === SCREEN CHANGING FUNCTIONS & BACK BUTTON === */
export var changeScreen = function(newScreen) {
	screenArray.push(currentScreen);
	application.remove(currentScreen);
	currentScreen = newScreen;
	application.add(currentScreen);
}

export var backScreen = function() {
	application.remove(currentScreen);
	currentScreen = screenArray.pop();
	application.add(currentScreen);
}

export var switchTitleScreen = function() {
	screenArray = [];
	application.remove(currentScreen);
	currentScreen = titleScreen;
	application.add(currentScreen);
}

/* === TITLE SCREEN === */

var titleBackgroundColor = new Skin({ fill: "#BFBFBF" });

var menuButtonTextStyle = new Style({ font: "bold 36px", color: "white" });

var menuButtonTextTemplate = Label.template($ => ({
	string: $.string, height: 50, top: 0,
	style: menuButtonTextStyle
}));

var menuButtonTemplate = Container.template($ => ({
	top: $.top, left: ((375 - 250)/2), width: 250, active: true,
	contents: [
		new menuButtonTextTemplate({ string: $.string })
	],
	behavior: Behavior({
		onCreate: function(content) {
            this.upSkin = new Skin({ fill: "#65BEE2" });
            this.downSkin = new Skin({ fill: "#71A2B9" });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content) {
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content) {
            content.skin = this.upSkin;
            if ($.number == 1) {
				changeScreen(selectMarksetScreen);
            } else if ($.number == 2) {
            	changeScreen(selectMovesetScreen);
            } else if ($.number == 3) {
				changeScreen(performanceDetailsScreen);
            } else if ($.number == 4) {
            	changeScreen(performanceExpandedScreen);
            }
		}
	})
}));

var settingsStyle = new Style({ font: "30px", color: "white" });

var settingsButton = new Container({
	left: 20, top: 20, active: true, height: 50, width: 50,
	contents: [
		new Label({
			string: "?", style: settingsStyle, height: 50
		})
	],
	behavior: Behavior({
		onCreate: function(content) {
            this.upSkin = new Skin({ fill: "#F37D70" });
            this.downSkin = new Skin({ fill: "#C17A6F" });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content) {
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content) {
            content.skin = this.upSkin;
		}
	})
});

var marksetsButton = new menuButtonTemplate({ string: "Marksets", top: 100, number: 1 });
var movesetsButton = new menuButtonTemplate({ string: "Movesets", top: 20, number: 2 });
var profileButton = new menuButtonTemplate({ string: "Profile", top: 20, number: 3 });
var friendsButton = new menuButtonTemplate({ string: "Friends", top: 20, number: 4 });

var title = new Picture({
	top: 120, left: 35,
	url: "assets/logo.png"
});

var menuBackground = new Picture({
  top:0, bottom: 0, left: 0, right: 0,
  url: "assets/menuBackground.png"
});

export var titleScreen = new Layer({
	top: 0, bottom: 0, left: 0, right: 0,
	skin: titleBackgroundColor,
	contents: [
    menuBackground,
    new Column({
      top: 0, bottom: 0, left: 0, right: 0,
    	contents: [
        title,
    		marksetsButton, movesetsButton, profileButton, friendsButton,
    		settingsButton
      ]
    }),
	]
});
//Initialize to title screen
currentScreen = titleScreen;
application.add(currentScreen);

/* === PAGE TEMPLATES === */

let backgroundSkin = new Skin({ fill: "#333333" });

let titleStyle = new Style({ font: "bold 30px", color: "#56CCF2"});
let thinStyle = new Style({ font: "30px", color: "#56CCF2"});
