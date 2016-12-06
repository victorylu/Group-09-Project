/* === IMPORT STATEMENTS === */import { Button, ButtonBehavior } from 'buttons';import { backScreen, switchTitleScreen, changeScreen } from "main";import { Navbar } from "navbar";/* === NEW MARKSET SCREEN === */let blueSkin = new Skin({ fill: "#56CCF2" });let greenSkin = new Skin({ fill: "#27ae60", borders: {left: 1, right:1 , top: 1, bottom: 1},						stroke: "#000000"});let redSkin = new Skin({ fill: "#eb5757", borders: {left: 1, right:1 , top: 1, bottom: 1},						stroke: "#000000"});let greySkin = new Skin({ fill: "#4f4f4f", borders: {left: 1, right:1 , top: 1, bottom: 1},						stroke: "#000000"});let backgroundSkin = new Skin({ fill: "#333333" });let textStyle = new Style({ font: "bold 14px", color: "white" });let num = 1;let max_num = 1;let markset = new Picture({	top: 50, left: 0, right: 0,	url:"assets/markset/markset"+num+".png",	Behavior: class extends ButtonBehavior {    onTap(button){      update('Canvas');    }  }});let ButtonTemplate = Button.template($ => ({    left: 5, right: 5, skin: "",    contents: [			Picture($, {				left: 0, right: 0, url: $.url			})    ],    Behavior: class extends ButtonBehavior {        onTap(button){            update($.buttonText);        }    }}));/* Main screen layout */export var newMarksetScreen = new Layer({	left: 0, right: 0, top: 0, bottom: 0,	contents: [		new Picture({			top: 0, bottom: 0, right: 0, left: 0,			url: "assets/menuBackground.png"		}),		new Column({			top: 0, bottom: 0, right: 0, left: 0,			contents: [				new Navbar(),				markset,				new Column({ top: 50, left: 0, right: 0,					contents: [						new Container({top: 30, left: 0, right: 0,							contents: [								new ButtonTemplate({url: 'assets/markset/addTeammate.png', downURL: 'assets/markset/addTeammateSelect.png', buttonText: 'Add Teammate'}),							]						}),						new Container({top: 30, left: 0, right: 0,							contents: [								new ButtonTemplate({url: 'assets/markset/createPath.png', downURL: 'assets/markset/createPathSelect.png', buttonText: 'Create Path'}),							]						}),						new Line({ top: 30, left: 30, right: 30,							contents: [								new ButtonTemplate({url: 'assets/markset/prevStep.png', downURL: 'assets/markset/prevStepSelect.png', buttonText: 'Prev'}),								new ButtonTemplate({url: 'assets/markset/nextStep.png', downURL: 'assets/markset/nextStepSelect.png', buttonText: 'Next'}),							]						}),						new Line({ top: 30, left: 30, right: 30,							contents: [								new ButtonTemplate({url: 'assets/markset/cancelMarkset.png', downURL: 'assets/markset/cancelMarkset.png', buttonText: 'Cancel'}),								new ButtonTemplate({url: 'assets/markset/saveMarkset.png', downURL: 'assets/markset/saveMarkset.png', buttonText: 'Save'}),							]						})					]				})			]		})	]});var update = function(func){	if (func == "Prev"){		if (num > 1) {			num = num - 1;		}	} else if (func == "Next"){		if (num < 8 && num < max_num) {			num = num + 1;		}	} else if (func == "Save"){		switchTitleScreen();		num = 1;		max_num = 1;	} else if (func == "Cancel"){		backScreen();		num = 1;		max_num = 1;	} else if (func == "Add Teammate"){		if (num == 1) {			num = 2;			max_num = 2;		}	} else if (func == "Create Path"){		if (num > 1 && num < 8) {			num = num + 1;			max_num = num;		}	}	markset.url = "assets/markset/markset"+num+".png";}