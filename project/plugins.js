var plugins_bb40132b_638b_4a9f_b028_d3fe47acc8d1 = 
{
    "init": function () {

	console.log("插件编写测试");

	this._afterLoadResources = function () {
		// 本函数将在所有资源加载完毕后，游戏开启前被执行
		// 可以在这个函数里面对资源进行一些操作。
		// 若需要进行切分图片，可以使用 core.splitImage() 函数，或直接在全塔属性-图片切分中操作
		// 
		core.ui.statusBar.init();
	}

	// 可以在任何地方（如afterXXX或自定义脚本事件）调用函数，方法为 core.plugin.xxx();
	// 从V2.6开始，插件中用this.XXX方式定义的函数也会被转发到core中，详见文档-脚本-函数的转发。
},
    "resizeTo11": function () {
	if (main.mode == 'editor') {
		return;
	}

	// 在不修改libs的情况下将页面适配为11x11
	core.__SIZE__ = 11;
	core.__PIXELS__ = core.__SIZE__ * 32;
	core.__HALF_SIZE__ = 5;
	// core.bigmap.width = core.__SIZE__;
	// core.bigmap.height = core.__SIZE__;
	core.actions.SIZE = core.__SIZE__;
	core.actions.HSIZE = core.__HALF_SIZE__;
	core.actions.LAST = core.__SIZE__ - 1;
	core.actions.CHOICES_LEFT = 3;
	core.actions.CHOICES_RIGHT = core.actions.LAST - core.actions.CHOICES_LEFT;
	core.ui.SIZE = core.__SIZE__;
	core.ui.HSIZE = core.__HALF_SIZE__;
	core.ui.LAST = core.__SIZE__ - 1;
	core.ui.PIXEL = core.__PIXELS__;
	core.ui.HPIXEL = core.__PIXELS__ / 2;
},
    "statusBar": function () {
	main.dom.floorMsgGroup.style.display = 'none';
	main.dom.statusBar.style.display = 'none';
	main.dom.toolBar.style.display = 'none';

	const GAMEVIEW_WIDTH = 640;
	const GAMEVIEW_HEIGHT = 422;

	const GAMEVIEW_WIDTH_VERTICAL = 388;
	const GAMEVIEW_HEIGHT_VERTICAL = 630;

	const BAR_WIDTH = 125;
	const BAR_HEIGHT_VERTICAL = 130;
	const BORDER_WIDTH = 18;
	const BORDER_HEIGHT = 24;
	
	const ITEM_BOX_LEFT = 13;
	const ITEM_BOX_TOP = 190;
	const ITEM_BOX_LEFT_VERTICAL = 219;
	const ITEM_BOX_TOP_VERTICAL = 10;

	const ITEM_ICON_OUTER_SIZE = 33;

	const EQUIP_BLOCK_LEFT = 525;
	const EQUIP_BLOCK_TOP = 40;
	const EQUIP_BLOCK_LEFT_VERTICAL = 108;
	const EQUIP_BLOCK_TOP_VERTICAL = 0;

	const KEY_BLOCK_LEFT = EQUIP_BLOCK_LEFT;
	const KEY_BLOCK_LEFT_VERTICAL = EQUIP_BLOCK_LEFT_VERTICAL;
	const KEY_BLOCK_TOP_VERTICAL = 86;

	const INFO_BLOCK_LEFT = EQUIP_BLOCK_LEFT;
	const INFO_BLOCK_TOP = 220;
	const INFO_BLOCK_LEFT_VERTICAL = 8;
	const INFO_BLOCK_TOP_VERTICAL = 538;

	const TOOL_BOX_LEFT = EQUIP_BLOCK_LEFT;
	const TOOL_BOX_TOP = 318;
	const TOOL_BOX_LEFT_VERTICAL = 278;
	const TOOL_BOX_TOP_VERTICAL = INFO_BLOCK_TOP_VERTICAL;

	const TOOL_ICON_OUTER_SIZE = 34;

	const INFO_BAR_HEIGHT = 22;
	const INFO_BAR_HEIGHT_VERTICAL = 18;
	const INFO_BAR_TOP = GAMEVIEW_HEIGHT - INFO_BAR_HEIGHT;
	const INFO_BAR_TOP_VERTICAL = GAMEVIEW_HEIGHT_VERTICAL - INFO_BAR_HEIGHT_VERTICAL;

	const TEXT_COLOR = "#E1E1E1";

	const FORCE_COUNTABLE_ITEMS = ["centerFly"];

	const outerBackground = document.createElement('canvas');
	outerBackground.style.position = 'absolute';
	outerBackground.style.zIndex = 5;
	outerBackground.id = 'outerBackground';
	main.dom.outerBackground = outerBackground;
	main.dom.startPanel.insertAdjacentElement('afterend', outerBackground);

	const outerUI = document.createElement('canvas');
	outerUI.style.position = 'absolute';
	outerUI.style.zIndex = 165;
	outerUI.id = 'outerUI';
	main.dom.outerUI = outerUI;
	outerBackground.insertAdjacentElement('afterend', outerUI);
	setTimeout(function () {
		// Should be executed immediately after init()
		main.canvas.outerUI = outerUI.getContext('2d');
	});
	outerUI.onclick = function (e) {
		try {
			e.preventDefault();
			if (!core.isPlaying()) return false;
			const left = core.dom.gameGroup.offsetLeft;
			const top = core.dom.gameGroup.offsetTop;
			const px = parseInt((e.clientX - left) / core.domStyle.scale),
				py = parseInt((e.clientY - top) / core.domStyle.scale);
			core.ui.statusBar.onclick(px, py);
		} catch (ee) {
			main.log(ee);
		}
	}

	const _resize_gameGroup = function (obj) {
		const gameGroup = core.dom.gameGroup;
		gameGroup.style.width = obj.totalWidth + "px";
		gameGroup.style.height = obj.totalHeight + "px";
		gameGroup.style.left = (obj.clientWidth - obj.totalWidth) / 2 + "px";
		gameGroup.style.top = (obj.clientHeight - obj.totalHeight) / 2 + "px";

		core.dom.musicBtn.style.right = (obj.clientWidth - obj.totalWidth) / 2 + "px";
		core.dom.musicBtn.style.bottom = (obj.clientHeight - obj.totalHeight) / 2 - 27 + "px";
		core.dom.enlargeBtn.style.right = (obj.clientWidth - obj.totalWidth) / 2 + 31 + "px";
		core.dom.enlargeBtn.style.bottom = (obj.clientHeight - obj.totalHeight) / 2 - 27 + "px";

		main.dom.startBackground.src = main.styles.startBackground;
	}

	const _resize_canvas = function (obj) {
		main.dom.outerBackground.style.width = obj.totalWidth + 'px';
		main.dom.outerBackground.style.height = obj.totalHeight + 'px';
		main.dom.outerUI.style.width = obj.totalWidth + 'px';
		main.dom.outerUI.style.height = obj.totalHeight + 'px';

		const innerSize = (obj.canvasWidth * core.domStyle.scale) + "px";
		for (let i = 0; i < core.dom.gameCanvas.length; ++i)
			core.dom.gameCanvas[i].style.width = core.dom.gameCanvas[i].style.height = innerSize;
		core.dom.gif.style.width = core.dom.gif.style.height = innerSize;
		core.dom.gif2.style.width = core.dom.gif2.style.height = innerSize;
		core.dom.gameDraw.style.width = core.dom.gameDraw.style.height = innerSize;
		core.dom.gameDraw.style.top = obj.gameDrawBox.top * core.domStyle.scale + "px";
		core.dom.gameDraw.style.left = (obj.gameDrawBox.left) * core.domStyle.scale + "px";

		// resize bigmap
		core.bigmap.canvas.forEach(function (cn) {
			const ratio = core.canvas[cn].canvas.hasAttribute('isHD') ? core.domStyle.ratio : 1;
			core.canvas[cn].canvas.style.width = core.canvas[cn].canvas.width / ratio * core.domStyle.scale + "px";
			core.canvas[cn].canvas.style.height = core.canvas[cn].canvas.height / ratio * core.domStyle.scale + "px";
		});
		// resize dynamic canvas
		for (const name in core.dymCanvas) {
			const ctx = core.dymCanvas[name],
				canvas = ctx.canvas;
			const ratio = canvas.hasAttribute('isHD') ? core.domStyle.ratio : 1;
			canvas.style.width = canvas.width / ratio * core.domStyle.scale + "px";
			canvas.style.height = canvas.height / ratio * core.domStyle.scale + "px";
			canvas.style.left = parseFloat(canvas.getAttribute("_left")) * core.domStyle.scale + "px";
			canvas.style.top = parseFloat(canvas.getAttribute("_top")) * core.domStyle.scale + "px";
		}
		// resize next
		main.dom.next.style.width = main.dom.next.style.height = 5 * core.domStyle.scale + "px";
		main.dom.next.style.borderBottomWidth = main.dom.next.style.borderRightWidth = 4 * core.domStyle.scale + "px";

	}

	core.control.resize = function () {
		if (main.mode == 'editor') return;

		const clientWidth = main.dom.body.clientWidth,
			clientHeight = main.dom.body.clientHeight;
		const canvasWidth = core.__PIXELS__;

		const isVertical = clientHeight > clientWidth;
		core.domStyle.isVertical = isVertical;

		const totalWidth = isVertical ? GAMEVIEW_WIDTH_VERTICAL : GAMEVIEW_WIDTH,
			totalHeight = isVertical ? GAMEVIEW_HEIGHT_VERTICAL : GAMEVIEW_HEIGHT;

		const maxRatio = Math.min(clientWidth / totalWidth, clientHeight / totalHeight);

		core.domStyle.availableScale = [];
		[1, 1.25, 1.5, 1.75, 2].forEach(function (v) {
			if (maxRatio >= v) {
				core.domStyle.availableScale.push(v);
			}
		});

		if (core.domStyle.availableScale.indexOf(core.domStyle.scale) < 0) {
			core.domStyle.scale = Math.min(1, maxRatio);
		} else if (core.getLocalStorage('scale') == null && core.domStyle.availableScale.length >= 2) {
			core.domStyle.scale = core.domStyle.availableScale[core.domStyle.availableScale.length - 2];
			core.setLocalStorage('scale', core.domStyle.scale);
		}

		const totalWidthScaled = totalWidth * core.domStyle.scale,
			totalHeightScaled = totalHeight * core.domStyle.scale;

		const gameDrawBox = isVertical ? { left: BORDER_WIDTH, top: BAR_HEIGHT_VERTICAL + BORDER_HEIGHT } : { left: BAR_WIDTH + BORDER_WIDTH, top: BORDER_HEIGHT };

		const obj = {
			clientWidth: clientWidth,
			clientHeight: clientHeight,
			canvasWidth: canvasWidth,
			totalWidth: totalWidthScaled,
			totalHeight: totalHeightScaled,
			gameDrawBox: gameDrawBox,
			globalAttribute: core.status.globalAttribute || core.initStatus.globalAttribute,
		};

		_resize_gameGroup(obj);
		_resize_canvas(obj);

		if (core.status.automaticRoute == null) core.status.automaticRoute = {};
		core.control.setViewport(32, 32);
		core.updateStatusBar();
	}

	class StatusBar {
		constructor() {
			this.itemMx = [
				["book", "wand", "fly"],
				["cross", "superPotion", "pickaxe"],
				["bomb", "centerFly", "upFly"],
				["downFly", "knife", "snow"],
				["bigKey", "earthquake", "coin"],
			];
		}
		init() {
			this.toolbarAction = [
				[main.core.openKeyBoard, main.core.openQuickShop, function () { core.insertAction([{ type: "insert", name: "游戏说明" }]); } ],
				[main.core.save, main.core.load, main.core.openSettings]
			];
			this.replayAction = [
				[core.triggerReplay, core.stopReplay, core.rewindReplay],
				[core.speedDownReplay, core.speedUpReplay, core.saveReplay]
			];
		}
		update() {
			this._update_background();
			this._update_props();
			this._update_items();
			this._update_equips();
			this._update_keys();
			this._update_infoWindow();
			this._update_infoBar();
		}
		_update_background(updatedFloorTitle) {
			const bgctx = main.dom.outerBackground.getContext("2d");
			const uictx = main.dom.outerUI.getContext("2d");
			if (core.domStyle.isVertical) {
				bgctx.canvas.width = GAMEVIEW_WIDTH_VERTICAL;
				bgctx.canvas.height = GAMEVIEW_HEIGHT_VERTICAL;
				uictx.canvas.width = GAMEVIEW_WIDTH_VERTICAL;
				uictx.canvas.height = GAMEVIEW_HEIGHT_VERTICAL;
				const bg = core.material.images.images["statusBackground_vertical.png"];
				bgctx.drawImage(bg, 0, 0, GAMEVIEW_WIDTH_VERTICAL, GAMEVIEW_HEIGHT_VERTICAL);
				core.setTextAlign('outerUI', 'center');
			} else {
				bgctx.canvas.width = GAMEVIEW_WIDTH;
				bgctx.canvas.height = GAMEVIEW_HEIGHT;
				uictx.canvas.width = GAMEVIEW_WIDTH;
				uictx.canvas.height = GAMEVIEW_HEIGHT;
				const bg = core.material.images.images["statusBackground.jpg"];
				bgctx.drawImage(bg, 0, 0, GAMEVIEW_WIDTH, GAMEVIEW_HEIGHT - INFO_BAR_HEIGHT);
				bgctx.fillStyle = "#676767";
				bgctx.fillRect(0, INFO_BAR_TOP, GAMEVIEW_WIDTH, INFO_BAR_HEIGHT);
				core.setTextAlign('outerUI', 'center');
			}
		}
		// 更新属性
		_update_props(updatedFloorTitle) {
			if (!updatedFloorTitle && core.status.floorId) {
				updatedFloorTitle = core.status.maps[core.status.floorId].title;
			}
			const statusList = ['hp', 'atk', 'def', 'money'];
			const drawStatusList = (baseX, baseY) => {
				let curh = baseY;
				core.setTextAlign('outerUI', 'right');
				statusList.forEach((item) => {
					// 四舍五入
					core.status.hero[item] = Math.round(core.status.hero[item]);
					// 大数据格式化
					core.fillText("outerUI", core.getRealStatus(item), baseX, curh, TEXT_COLOR);
					curh += 24;
				});
				core.setTextAlign('outerUI', 'center');
			};
			if (core.domStyle.isVertical) {
				core.clearMap("outerUI", 10, 0, 105, 120);
				core.setFont("outerUI", 'bold 14px Verdana');
				if (updatedFloorTitle) {
					core.fillText("outerUI", updatedFloorTitle, 54, 22, TEXT_COLOR);
				}
				drawStatusList(96, 46);
			} else {
				core.clearMap("outerUI", 10, 40, 105, 130);
				core.setFont("outerUI", 'bold 16px Verdana');
				if (updatedFloorTitle) {
					core.fillText("outerUI", updatedFloorTitle, 62, 61, TEXT_COLOR);
				}
				drawStatusList(110, 93);
			}
		}
		_update_items(){
			const drawItemMx = (drawFn) => {
				for (let i = 0; i < this.itemMx.length; i++) {
					for (let j = 0; j < this.itemMx[i].length; j++) {
						var item = this.itemMx[i][j];
						drawFn(i, j, item);
					}
				}
			};
			const drawItem = (item, posx, posy) => {
				const icon = core.material.icons.items[item], image = core.material.images.items;
				core.drawImage('outerUI', image, 0, 32 * icon, 32, 32, posx, posy, 32, 32);
				const cnt = core.itemCount(item);
				if ((core.items.items[item].cls === "tools" && cnt > 1) || FORCE_COUNTABLE_ITEMS.includes(item)) {
					core.fillText('outerUI', cnt, posx + 25, posy + 28, '#FFFFFF', "bold 12px Verdana");
				}
				// if (this.selectId == item)
				//     core.strokeRect('outerUI', posx + 17, posy - 4, 40, 40, '#FFD700');
			}
			if (core.domStyle.isVertical) {
				core.clearMap("outerUI", ITEM_BOX_LEFT_VERTICAL, ITEM_BOX_TOP_VERTICAL, 105, 185);
				drawItemMx((i, j, item) => {
					if (core.hasItem(item)) {
						const posx = ITEM_BOX_LEFT_VERTICAL + i * 33, posy = ITEM_BOX_TOP_VERTICAL + j * 32;
						drawItem(item, posx, posy);
					}
				});
			} else {
				core.clearMap("outerUI", ITEM_BOX_LEFT, ITEM_BOX_TOP, 105, 185);
				drawItemMx((i, j, item) => {
					if (core.hasItem(item)) {
						const posx = ITEM_BOX_LEFT + j * 33, posy = ITEM_BOX_TOP + i * 32;
						drawItem(item, posx, posy);
					}
				});
			}
		}
		_update_equips() {
			core.setFont("outerUI", 'bold 16px Verdana');
			const drawEquip = (baseX, baseY, id, color, back) => {
				if (!id) core.fillText("outerUI", back, baseX + 50, baseY + 22, color);
				else {
					core.fillText("outerUI", core.material.items[id].name, baseX + 32, baseY + 22, color);
					var icon = core.material.icons.items[id];
					core.drawImage('outerUI', core.material.images.items, 0, 32 * icon, 32, 32, baseX + 64, baseY, 32, 32);
				}
			};
			if (core.domStyle.isVertical) {
				core.clearMap("outerUI", EQUIP_BLOCK_LEFT_VERTICAL, EQUIP_BLOCK_TOP_VERTICAL, 105, 95);
				drawEquip(EQUIP_BLOCK_LEFT_VERTICAL, EQUIP_BLOCK_TOP_VERTICAL + 9, core.getFlag("nowWeapon"), "#FFCFAE", "无武器");
				drawEquip(EQUIP_BLOCK_LEFT_VERTICAL, EQUIP_BLOCK_TOP_VERTICAL + 49, core.getFlag("nowShield"), "#D1CEFF", "无防具");
			} else {
				core.clearMap("outerUI", EQUIP_BLOCK_LEFT, EQUIP_BLOCK_TOP, 105, 95);
				drawEquip(EQUIP_BLOCK_LEFT, EQUIP_BLOCK_TOP + 8, core.getFlag("nowWeapon"), "#FFCFAE", "无武器");
				drawEquip(EQUIP_BLOCK_LEFT, EQUIP_BLOCK_TOP + 56, core.getFlag("nowShield"), "#D1CEFF", "无防具");
			}
		}
		_update_keys() {
			const drawKeyList = (baseX, baseY, lines, rows) => {
				const todraw = [], keyList = ['yellowKey', 'blueKey', 'redKey'];
				let total = 0;
				keyList.forEach(function (key, i) {
					todraw[i] = core.itemCount(key);
					total += todraw[i];
				});
				if (total > lines * rows) {
					let dn = 2;
					for (let i = 0; i <= dn; i++) {
						let deltaX = i * 32, deltaY = parseInt((lines - 1) / 2 * 14);
						this.drawKey(keyList[i], baseX + deltaX, baseY + deltaY);
						core.setFont("outerUI", 'bold 14px Verdana');
						core.setTextAlign("outerUI", "left");
						core.fillText("outerUI", todraw[i], baseX + deltaX + 10, baseY + deltaY + 20, TEXT_COLOR);
					}
				} else {
					let dn = 2, dc = 0;
					while (dn >= 0 && dc < lines * rows) {
						if (todraw[dn]) {
							this.drawKey(keyList[dn], baseX + (dc % rows) * 14, baseY + parseInt(dc / rows) * 17);
							todraw[dn]--, dc++;
						} else dn--;
					}
				}
			};
			if (core.domStyle.isVertical) {
				core.clearMap("outerUI", KEY_BLOCK_LEFT_VERTICAL, KEY_BLOCK_TOP_VERTICAL, 105, 75);
				drawKeyList(KEY_BLOCK_LEFT_VERTICAL + 3, KEY_BLOCK_TOP_VERTICAL + 2, 2, 7);
			} else {
				core.clearMap("outerUI", KEY_BLOCK_LEFT, 140, 105, 75);
				drawKeyList(KEY_BLOCK_LEFT + 3, 142, 3, 7);
			}
		}
		drawKey(key, x, y) {
			let sx = 3, sy = 0;
			if (key == "blueKey") sx += 16;
			else if (key == "yellowKey") sy += 16;
			core.drawImage("outerUI", core.statusBar.icons.keys, sx, sy, 10, 16, x, y, 10, 16);
		}
		_update_infoWindow() {
			const itemId = this.selectedItem;
			if (core.domStyle.isVertical) {
				core.clearMap("outerUI", INFO_BLOCK_LEFT_VERTICAL, INFO_BLOCK_TOP_VERTICAL, 260, 64);
				if (this.selectedItem) {
					const icon = core.material.icons.items[itemId];
					core.fillText("outerUI", core.material.items[itemId].name, INFO_BLOCK_LEFT_VERTICAL + 32, INFO_BLOCK_TOP_VERTICAL + 35, "#D1CEFF");
					core.drawImage('outerUI', core.material.images.items, 0, 32 * icon, 32, 32, INFO_BLOCK_LEFT_VERTICAL + 64, INFO_BLOCK_TOP_VERTICAL + 15, 32, 32);
					core.ui.drawTextContent("outerUI", core.material.items[itemId].text, {
						left: INFO_BLOCK_LEFT_VERTICAL + 100,
						top: INFO_BLOCK_TOP_VERTICAL + 3,
						maxWidth: 160,
						color: "#D1CEFF"
					});
				}
			} else {
				core.clearMap("outerUI", INFO_BLOCK_LEFT, INFO_BLOCK_TOP, 105, 100);
				if (this.selectedItem) {
					const icon = core.material.icons.items[itemId];
					core.fillText("outerUI", core.material.items[itemId].name, INFO_BLOCK_LEFT + 32, INFO_BLOCK_TOP + 25, "#D1CEFF");
					core.drawImage('outerUI', core.material.images.items, 0, 32 * icon, 32, 32, INFO_BLOCK_LEFT + 64, INFO_BLOCK_TOP + 4, 32, 32);
					core.ui.drawTextContent("outerUI", core.material.items[itemId].text, {
						left: INFO_BLOCK_LEFT + 1,
						top: INFO_BLOCK_TOP + 36,
						maxWidth: 105,
						color: "#D1CEFF"
					});
				}
			}
		}
		showItemInfo(itemId) {
			this.selectedItem = itemId;
			this._update_infoWindow();
		}
		clearItemInfo() {
			this.selectedItem = null;
			this._update_infoWindow();
		}
		_update_toolBox() {
			const tools = core.isReplaying() ?
				[
					[core.status.replay.pausing ? "play" : "pause", "stop", "rewind"],
					["speedDown", "speedUp", "save"],
				] : [
					["keyboard", "shop", "help"],
					["save", "load", "settings"],
				];
			if (core.domStyle.isVertical) {
				core.clearMap("outerUI", TOOL_BOX_LEFT_VERTICAL, TOOL_BOX_TOP_VERTICAL, 115, 80);
				for (let i = 0; i < tools.length; i++) {
					for (let j = 0; j < tools[i].length; j++) {
						core.drawIcon("outerUI", tools[i][j], TOOL_BOX_LEFT_VERTICAL + j * 34, TOOL_BOX_TOP_VERTICAL + i * 34, 32, 32);
					}
				}
			} else {
				core.clearMap("outerUI", TOOL_BOX_LEFT, TOOL_BOX_TOP, 115, 80);
				for (let i = 0; i < tools.length; i++) {
					for (let j = 0; j < tools[i].length; j++) {
						core.drawIcon("outerUI", tools[i][j], TOOL_BOX_LEFT + j * 34, TOOL_BOX_TOP + i * 34, 32, 32);
					}
				}
			}
		}
		onclick(x, y) {
			const makeBox = ([x, y], [w, h]) => {
				return [[x, y], [x + w, y + h]];
			}
			const gridify = ([x, y], [gw, gh]) => {
				return [parseInt(x / gw), parseInt(y / gh)];
			}
			const useItem = (itemId) => {
				if (!core.hasItem(itemId)) return;
				if (core.material.items[itemId].cls == "constants") {
					switch (itemId) {
						case "book":
							core.openBook(true);
							break;
						case "fly":
							core.useFly(true);
							break;
						case "wand":
							core.insertAction({
								type: "useItem",
								id: itemId
							});
							break;
						case "snow":
							core.useItem("snow");
							break;
						default:
							this.showItemInfo(itemId);
					}
				} else if (itemId != this.selectedItem) {
					this.showItemInfo(itemId);
				} else {
					switch (itemId) {
						case "centerFly":
							core.ui._drawCenterFly();
							break;
						default:
							core.useItem(itemId);
					}
				}
			}
			const inRect = ([x, y], [[sx, sy], [dx, dy]]) => {
				return sx <= x && x <= dx && sy <= y && y <= dy;
			};
			const relativeTo = ([x, y], [ax, ay]) => {
				return [x - ax, y - ay];
			}
			const pos = [x, y];
			if (core.domStyle.isVertical) {
				const itemBox = makeBox([ITEM_BOX_LEFT_VERTICAL, ITEM_BOX_TOP_VERTICAL], [32 * 5, 33 * 3]);
				if (inRect(pos, itemBox)) {
					if (core.isReplaying() || core.status.lockControl || core.isMoving()) return;
					const [gx, gy] = gridify(relativeTo(pos, itemBox[0]), [32, 33]);
					const itemId = this.itemMx[gx][gy];
					useItem(itemId);
					return;
				}
				const toolBox = makeBox([TOOL_BOX_LEFT_VERTICAL, TOOL_BOX_TOP_VERTICAL], [34 * 3, 34 * 2]);
				if (inRect(pos, toolBox)) {
					const [row, col] = gridify(relativeTo(pos, toolBox[0]), [34, 34]);
					if (core.isReplaying()) {
						this.replayAction[col][row].call(core);
					} else if (core.isPlaying()) {
						this.toolbarAction[col][row].call(core, true);
					}
					return;
				}
			} else {
				const itemBox = makeBox([ITEM_BOX_LEFT, ITEM_BOX_TOP], [33 * 3, 32 * 5]);
				if (inRect(pos, itemBox)) {
					if (core.isReplaying() || core.status.lockControl || core.isMoving()) return;
					const [gx, gy] = gridify(relativeTo(pos, itemBox[0]), [33, 32]);
					const itemId = this.itemMx[gy][gx];
					useItem(itemId);
					return;
				}
				const toolBox = makeBox([TOOL_BOX_LEFT, TOOL_BOX_TOP], [34 * 3, 34 * 2]);
				if (inRect(pos, toolBox)) {
					const [row, col] = gridify(relativeTo(pos, toolBox[0]), [34, 34]);
					if (core.isReplaying()) {
						this.replayAction[col][row].call(core);
					} else if (core.isPlaying()) {
						this.toolbarAction[col][row].call(core, true);
					}
					return;
				}
			}
		}
		infoText;
		infocnt = 0;
		_update_infoBar() {
			core.setTextAlign('outerUI', 'left');
			const text = this.infoText;
			if (core.domStyle.isVertical) {
				core.clearMap("outerUI", 0, INFO_BAR_TOP_VERTICAL, GAMEVIEW_WIDTH, INFO_BAR_HEIGHT_VERTICAL);
				core.setFont("outerUI", 'bold 14px Verdana');
				if (text) {
					core.fillText("outerUI", text, 10, INFO_BAR_TOP_VERTICAL + 14, TEXT_COLOR);
				}
			} else {
				core.clearMap("outerUI", 0, INFO_BAR_TOP, GAMEVIEW_WIDTH, INFO_BAR_HEIGHT);
				core.setFont("outerUI", 'bold 16px Verdana');
				if (text) {
					core.fillText("outerUI", text, 10, INFO_BAR_TOP + 16, TEXT_COLOR);
				}
			}
			core.setTextAlign('outerUI', 'center');
		}
		print(text, cnt = 1) {
			this.infoText = text;
			this.infocnt = cnt;
			this._update_infoBar();
		}
		static infoRules = [
			{ id: "lava", text: "岩浆好热啊!" },
			{ id: "upFloor", text: "你看到了楼梯" },
			{ id: "downFloor", text: "你看到了楼梯" },
			{ id: "blueShop", text: "你看到了一个祭坛" },
			{ id: "man", text: "你看到了一个老人" },
			{ id: "woman", text: "你看到了一个商人" },
			{ id: "fairy", text: "你看到了一个商人" },
			{ id: "thief", text: "你看到了一个小偷" },
		]
		printEnvironmentInfo() {
			if (!this.infocnt) {
				return;
			}
			const ids = [];
			for (const block of core.status.thisMap.blocks) {
				if (!block.disable && core.nearHero(block.x, block.y)) ids.push(block.event.id);
			}
			for (const infoRule of StatusBar.infoRules) {
				if (ids.indexOf(infoRule.id) >= 0) {
					this.print(infoRule.text);
					return;
				}
			}
		}
		clearInfo(etype) {
			this.clearItemInfo();
			if (this.infocnt == 1) {
				setTimeout(() => {
					if (this.infocnt === 0) {
						this.infoText = void 0;
						this._update_infoBar();
					}
				}, 200);
				this.infocnt = 0;
			} else if (this.infocnt > 1) {
				this.infocnt--;
			}
		}
	}

	core.ui.statusBar = new StatusBar();

	core.control.clearStatusBar = function () {
		core.clearMap("outerUI");
	}
	// init() called in `afterLoadResources`.
},
    "override": function () {

	core.statusBar.icons = {
		'floor': 0,
		'name': null,
		'lv': 1,
		'hpmax': 2,
		'hp': 3,
		'atk': 4,
		'def': 5,
		'mdef': 6,
		'money': 7,
		'experience': 8,
		'up': 9,
		'book': 10,
		'fly': 11,
		'toolbox': 12,
		'keyboard': 13,
		'shop': 14,
		'save': 15,
		'load': 16,
		'settings': 17,
		'play': 18,
		'pause': 19,
		'stop': 20,
		'speedDown': 21,
		'speedUp': 22,
		'rewind': 23,
		'equipbox': 24,
		'mana': 25,
		'skill': 26,
		'paint': 27,
		'erase': 28,
		'empty': 29,
		'exit': 30,
		'btn1': 31,
		'btn2': 32,
		'btn3': 33,
		'btn4': 34,
		'btn5': 35,
		'btn6': 36,
		'btn7': 37,
		'btn8': 38,
		'keys': 39,
		'help': 40,
		'battle': 41
	};

	core.actions._clickCenterFly = function (x, y) {
		var posX = core.status.event.data.posX,
			posY = core.status.event.data.posY;
		core.ui.closePanel();
		if (x == posX && y == posY) {
			if (core.canUseItem('centerFly')) {
				core.useItem('centerFly');
			} else {
				core.drawTip('当前不能使用中心对称飞行器');
			}
		} else core.drawTip('取消使用');
	}

	var _clickSL = core.actions._clickSL;
	core.actions._clickSL = function (x, y) {
		var page = core.status.event.data.page,
			offset = core.status.event.data.offset;
		var index = page * 10 + offset;

		// 上一页
		if ((x == this.HSIZE - 1 || x == this.HSIZE - 2) && y == this.LAST) {
			core.ui._drawSLPanel(10 * (page - 1) + offset);
			return;
		}
		// 下一页
		if ((x == this.HSIZE + 1 || x == this.HSIZE + 2) && y == this.LAST) {
			core.ui._drawSLPanel(10 * (page + 1) + offset);
			return;
		}
		if ((x == this.HSIZE - 3 || x == this.HSIZE + 3) && y == this.LAST) {
			return;
		}
		_clickSL.call(this, x, y);
	}

	var _sys_longClick_lockControl = core.actions._sys_longClick_lockControl;
	core.actions._sys_longClick_lockControl = function (x, y) {
		if (!core.status.lockControl) return false;

		// 长按SL上下页快速翻页
		if (["save", "load", "replayLoad", "replayRemain"].indexOf(core.status.event.id) >= 0) {
			if (y == this.LAST && x <= this.HSIZE + 3 && x >= this.HSIZE - 3) {
				core.actions._clickSL(x, y);
				return true;
			}
		}
		return _sys_longClick_lockControl.call(this, x, y);
	}
	core.registerAction('longClick', '_sys_longClick_lockControl', core.actions._sys_longClick_lockControl, 50);

	core.control._moveHero_moving = function () {
		core.status.heroStop = false;
		core.status.automaticRoute.moveDirectly = false;
		var move = function () {
			if (!core.status.heroStop) {
				if (core.hasFlag('debug') && core.status.ctrlDown) {
					if (core.status.heroMoving != 0) return;
					// 检测是否穿出去
					var nx = core.nextX(),
						ny = core.nextY();
					if (nx < 1 || nx >= core.bigmap.width - 1 || ny < 1 || ny >= core.bigmap.height - 1) return;
					core.eventMoveHero([core.getHeroLoc('direction')], core.values.moveSpeed, move);
				} else {
					core.moveAction();
					setTimeout(move, 50);
				}
			}
		}
		move();
	}

	core.control._drawHero_updateViewport = function (x, y, offset) {}

	var _drawThumbnail_drawTempCanvas = core.maps._drawThumbnail_drawTempCanvas;
	core.maps._drawThumbnail_drawTempCanvas = function (floorId, blocks, options) {
		if (main.mode == 'editor') {
			_drawThumbnail_drawTempCanvas.call(this, floorId, blocks, options);
			return;
		}

		var width = core.floors[floorId].width;
		var height = core.floors[floorId].height;
		// 绘制到tempCanvas上面
		var tempCanvas = core.bigmap.tempCanvas;
		options.v2 = false;
		tempCanvas.canvas.width = width * 32;
		tempCanvas.canvas.height = height * 32;
		options.ctx = tempCanvas;

		var hasHero = core.status.hero != null,
			flags = null;
		if (options.flags) {
			if (!hasHero) core.status.hero = {};
			flags = core.status.hero.flags;
			core.status.hero.flags = options.flags;
		}
		this._drawThumbnail_realDrawTempCanvas(floorId, blocks, options);

		if (!hasHero) delete core.status.hero;
		else if (flags != null) core.status.hero.flags = flags;
		tempCanvas.setTransform(1, 0, 0, 1, 0, 0);
	}

	var _drawThumbnail_drawToTarget = core.maps._drawThumbnail_drawToTarget;
	core.maps._drawThumbnail_drawToTarget = function (floorId, options) {
		if (main.mode == 'editor') {
			_drawThumbnail_drawToTarget.call(this, floorId, options);
			return;
		}

		var ctx = core.getContextByName(options.ctx);
		if (ctx == null) return;
		var x = options.x || 0,
			y = options.y || 0,
			size = options.size || core.__PIXELS__;
		var tempCanvas = core.bigmap.tempCanvas;
		core.drawImage(ctx, tempCanvas.canvas, 32, 32, core.__PIXELS__, core.__PIXELS__, x, y, size, size);
	}

	var _drawWindowSkin = core.ui.drawWindowSkin;
	core.ui.drawWindowSkin = function (background, ctx, x, y, w, h, direction, px, py) {
		_drawWindowSkin.call(this, background, ctx, x, y, w, h, direction, px, py);

		var c = parseInt(w / 2);
		core.drawImage(ctx, background, 160, 90, 16, 6, x + c - 8, y, 16, 6);
	}

	var _drawPagination = ui.prototype.drawPagination;
	core.ui.drawPagination = function (page, totalPage, y) {
		if (["save", "load", "replayLoad", "replayRemain", "replaySince"].indexOf(core.status.event.id) >= 0) {
			if (totalPage <= 1) return;
			if (y == null) y = this.LAST;

			core.setFillStyle('ui', '#DDDDDD');
			var length = core.calWidth('ui', page, this._buildFont(15, true));

			core.setTextAlign('ui', 'left');
			core.fillText('ui', page, parseInt((this.PIXEL - length) / 2), y * 32 + 19);

			core.setTextAlign('ui', 'center');
			if (page > 1)
				core.fillText('ui', '上一页', this.HPIXEL - 48, y * 32 + 19);
			if (page < totalPage)
				core.fillText('ui', '下一页', this.HPIXEL + 48, y * 32 + 19);
			return;
		}
		_drawPagination.call(this, page, totalPage, y);
	}

	core.ui._drawCenterFly = function () {
		core.lockControl();
		core.status.event.id = 'centerFly';
		var fillstyle = 'rgba(255,0,0,0.5)';
		if (core.canUseItem('centerFly')) fillstyle = 'rgba(0,255,0,0.5)';
		var toX = core.bigmap.width - 1 - core.getHeroLoc('x'),
			toY = core.bigmap.height - 1 - core.getHeroLoc('y');
		this.clearUI();
		core.fillRect('ui', 0, 0, this.PIXEL, this.PIXEL, '#000000');
		core.drawThumbnail(null, null, { heroLoc: core.status.hero.loc, heroIcon: core.status.hero.image, ctx: 'ui', centerX: toX, centerY: toY });
		var offsetX = 1,
			offsetY = 1;
		core.fillRect('ui', (toX - offsetX) * 32, (toY - offsetY) * 32, 32, 32, fillstyle);
		core.status.event.data = { "x": toX, "y": toY, "posX": toX - offsetX, "posY": toY - offsetY };
		core.playSound('打开界面');
		core.drawTip("请确认当前" + core.material.items['centerFly'].name + "的位置", 'centerFly');
		return;
	}

	core.ui.drawHelp = function () {
		core.clearUI();
		core.status.event.id = 'help';
		core.lockControl();
		core.setAlpha('ui', 1);
		core.fillRect('ui', 0, 0, this.PIXEL, this.PIXEL, '#FFFFFF');
		core.drawImage('ui', core.material.images.keyboard, 0, 0, 416, 416, 0, 0, 352, 352);
	}

	core.actions._getClickLoc = function (x, y) {
		var size = 32 * core.domStyle.scale;
		var left = main.dom.gameDraw.offsetLeft + main.dom.gameGroup.offsetLeft;
		var top = main.dom.gameDraw.offsetTop + main.dom.gameGroup.offsetTop;
		var loc = { 'x': Math.max(x - left, 0), 'y': Math.max(y - top, 0), 'size': size };
		return loc;
	}

	core.enemys.getDamageString = function (enemy, x, y, floorId) {
		if (typeof enemy == 'string') enemy = core.material.enemys[enemy];
		var damage = this.getDamage(enemy, x, y, floorId);

		var color = '#000000';

		if (damage == null) {
			damage = "???";
			color = '#FF2222';
		} else {
			if (core.hasFlag('addhp')) {
				if (damage < core.status.hero.hp) color = '#11FF11';
				else color = '#FF2222';
			} else if (damage <= 0) color = '#11FF11';
			else if (damage < core.status.hero.hp / 3) color = '#FFFFFF';
			else if (damage < core.status.hero.hp * 2 / 3) color = '#FFFF00';
			else if (damage < core.status.hero.hp) color = '#FF9933';
			else color = '#FF2222';

			damage = core.formatBigNumber(damage, true);
			if (core.enemys.hasSpecial(enemy, 19))
				damage += "+";
			if (core.enemys.hasSpecial(enemy, 21))
				damage += "-";
			if (core.enemys.hasSpecial(enemy, 11))
				damage += "^";
		}

		return {
			"damage": damage,
			"color": color
		};
	}

	core.ui._drawBook_drawDamage = function (index, enemy, offset, position) {
		core.setTextAlign('ui', 'center');
		var damage = enemy.damage,
			color = '#FFFF00';
		if (damage == null) {
			damage = '不可攻击';
			color = '#FF2222';
		}
		if (damage == 0) {
			damage = '无危险';
			color = '#11FF11';
		} else {
			if (damage >= core.status.hero.hp) color = '#FF2222';
			else if (damage >= core.status.hero.hp * 2 / 3) color = '#FF9933';
			else if (damage <= 0) color = '#11FF11';
			damage = core.formatBigNumber(damage);
			if (core.enemys.hasSpecial(enemy, 19)) damage += "+";
			if (core.enemys.hasSpecial(enemy, 21)) damage += "-";
			if (core.enemys.hasSpecial(enemy, 11)) damage += "^";
		}
		if (enemy.notBomb) damage += "[b]";
		core.fillText('ui', damage, offset, position, color, this._buildFont(13, true));
	}

	core.control.checkBlock = function () {
		var x = core.getHeroLoc('x'),
			y = core.getHeroLoc('y'),
			loc = x + "," + y;
		var damage = core.status.checkBlock.damage[loc];
		if (damage) {
			core.status.hero.hp -= damage;
			core.drawTip("你没有神圣盾不能防御，受到 " + damage + " 点魔法伤害");
			core.playSound('zone.mp3');
			this._checkBlock_disableQuickShop();
			core.status.hero.statistics.extraDamage += damage;
			if (core.status.hero.hp <= 0) {
				core.status.hero.hp = 0;
				core.updateStatusBar();
				core.events.lose();
				return;
			} else {
				core.updateStatusBar();
			}
		}
		this._checkBlock_ambush(core.status.checkBlock.ambush[loc]);
		this._checkBlock_repulse(core.status.checkBlock.repulse[loc]);
	}

	core.registerSystemEvent("man", function (data, callback) {
		var a = parseInt(core.status.floorId.substring(2));
		var b = core.nextX();
		var c = core.nextY();
		core.insertAction([
			{ "type": "insert", "name": "对话", "args": [a, b, c, 0] },
		]);
		//console.log(data);
		if (callback) callback();
	});

	core.registerSystemEvent("woman", function (data, callback) {
		var name = core.status.floorId + '@' + core.nextX() + '@' + core.nextY() + '@' + 'A';
		if (core.getFlag(name, 0) == 1) {
			var a = parseInt(core.status.floorId.substring(2));
			var b = core.nextX();
			var c = core.nextY();
			core.insertAction([
				{ "type": "insert", "name": "对话", "args": [a, b, c, 1] },
			]);
		} else {
			core.insertAction([
				{ "type": "insert", "name": "商人", "args": [0] },
			]);
		}
		//console.log(data);
		if (callback) callback();
	});

	core.registerSystemEvent("specialwall", function (data, callback) {
		if (data.event.id == 'whiteWall' || core.getFlag('talking') > 0) {
			core.insertAction({ 'type': 'openDoor', loc: [data.x, data.y] });
			if (data.event.id != 'whiteWall') {
				core.setFlag('end', 1);
			}
			core.setFlag('talking', 0); //穿墙之后不能再次穿墙
		}
		//console.log(data);
		if (callback) callback();
	});

	core.registerSystemEvent("fakeWall", function (data, callback) {
		if (data.event.id == 'blueWall') {
			core.insertAction([
				{ "type": "openDoor", loc: [data.x, data.y] },
			]);
		}
		//console.log(data);
		if (callback) callback();
	});

	core.ui._drawWindowSelector = function (background, x, y, w, h) {
		w = Math.round(w) + 48;
		h = Math.round(h);
		var ctx = core.ui.createCanvas("_selector", x - 24, y, w, h, 165);
		ctx.canvas.id = '';
		this._drawSelector(ctx, background, w, h);
	}

	core.ui._drawSelector = function (ctx, background, w, h, left, top) {
		left = left || 0;
		top = top || 0;
		ctx = this.getContextByName(ctx);
		if (!ctx) return;
		if (typeof background == 'string')
			background = core.material.images.images[background];
		if (!(background instanceof Image)) return;
		// badge
		ctx.drawImage(background, 132, 68, 24, 24, left + 4, top + 4, 24, 24);
		ctx.drawImage(background, 132, 68, 24, 24, w - left - 28, top + 4, 24, 24);
	}

	core.ui.drawTip = function (text, id, clear) {
		core.ui.statusBar.print(text);
	}

	core.ui.clearMap = function (name, x, y, width, height) {
		if (name == 'all') {
			for (var m in core.canvas) {
				core.canvas[m].clearRect(0, 0, core.bigmap.width * 32, core.bigmap.height * 32);
			}
			core.clearMap("outerUI");
			core.dom.gif.innerHTML = "";
			core.removeGlobalAnimate();
		} else {
			var ctx = this.getContextByName(name);
			if (ctx) ctx.clearRect(x || 0, y || 0, width || ctx.canvas.width, height || ctx.canvas.height);
		}
	}

	core.control._updateStatusBar_setToolboxIcon = function () {
		core.ui.statusBar._update_toolBox();
	}

	var _changeFloor_getInfo = core.events._changeFloor_getInfo;
	core.events._changeFloor_getInfo = function (floorId, stair, heroLoc, time) {
		var info = _changeFloor_getInfo.call(this, floorId, stair, heroLoc, time);
		if (info == null) return null;
		info.time = 0;
		info.origin = floorId;
		return info;
	}

	core.events._changeFloor_afterChange = function (info, callback) {
		if (!info.locked) core.unlockControl();
		core.status.replay.animate = false;
		core.events.afterChangeFloor(info.floorId);

		if (info.origin == ':before') core.ui.statusBar.print('走下了楼梯')
		else if (info.origin == ':next') core.ui.statusBar.print('登上了楼梯')
		if (callback) callback();
	}

	if (window.jsinterface && window.jsinterface.requestLandscape) {
		window.jsinterface.requestLandscape();
	}
},
    "shop": function () {
	// 【全局商店】相关的功能
	// 
	// 打开一个全局商店
	// shopId：要打开的商店id；noRoute：是否不计入录像
	this.openShop = function (shopId, noRoute) {
		var shop = core.status.shops[shopId];
		// Step 1: 检查能否打开此商店
		if (!this.canOpenShop(shopId)) {
			core.drawTip("该商店尚未开启");
			return false;
		}

		// Step 2: （如有必要）记录打开商店的脚本事件
		if (!noRoute) {
			core.status.route.push("shop:" + shopId);
		}

		// Step 3: 检查道具商店 or 公共事件
		if (shop.item) {
			if (core.openItemShop) {
				core.openItemShop(shopId);
			} else {
				core.playSound('操作失败');
				core.insertAction("道具商店插件不存在！请检查是否存在该插件！");
			}
			return;
		}
		if (shop.commonEvent) {
			core.insertCommonEvent(shop.commonEvent, shop.args);
			return;
		}

		_shouldProcessKeyUp = true;

		// Step 4: 执行标准公共商店    
		core.insertAction(this._convertShop(shop));
		return true;
	}

	////// 将一个全局商店转变成可预览的公共事件 //////
	this._convertShop = function (shop) {
		return [
			{ "type": "function", "function": "function() {core.addFlag('@temp@shop', 1);}" },
			{
				"type": "while",
				"condition": "true",
				"data": [
					// 检测能否访问该商店
					{
						"type": "if",
						"condition": "core.isShopVisited('" + shop.id + "')",
						"true": [
							// 可以访问，直接插入执行效果
							{ "type": "function", "function": "function() { core.plugin._convertShop_replaceChoices('" + shop.id + "', false) }" },
						],
						"false": [
							// 不能访问的情况下：检测能否预览
							{
								"type": "if",
								"condition": shop.disablePreview,
								"true": [
									// 不可预览，提示并退出
									{ "type": "playSound", "name": "操作失败" },
									"当前无法访问该商店！",
									{ "type": "break" },
								],
								"false": [
									// 可以预览：将商店全部内容进行替换
									{ "type": "tip", "text": "当前处于预览模式，不可购买" },
									{ "type": "function", "function": "function() { core.plugin._convertShop_replaceChoices('" + shop.id + "', true) }" },
								]
							}
						]
					}
				]
			},
			{ "type": "function", "function": "function() {core.addFlag('@temp@shop', -1);}" }
		];
	}

	this._convertShop_replaceChoices = function (shopId, previewMode) {
		var shop = core.status.shops[shopId];
		var choices = (shop.choices || []).filter(function (choice) {
			if (choice.condition == null || choice.condition == '') return true;
			try { return core.calValue(choice.condition); } catch (e) { return true; }
		}).map(function (choice) {
			var ableToBuy = core.calValue(choice.need);
			return {
				"text": choice.text,
				"icon": choice.icon,
				"color": ableToBuy && !previewMode ? choice.color : [153, 153, 153, 1],
				"action": ableToBuy && !previewMode ? [{ "type": "playSound", "name": "商店" }].concat(choice.action) : [
					{ "type": "playSound", "name": "操作失败" },
					{ "type": "tip", "text": previewMode ? "预览模式下不可购买" : "购买条件不足" }
				]
			};
		}).concat({ "text": "离开", "action": [{ "type": "playSound", "name": "取消" }, { "type": "break" }] });
		core.insertAction({ "type": "choices", "text": shop.text, "choices": choices });
	}

	/// 是否访问过某个快捷商店
	this.isShopVisited = function (id) {
		if (!core.hasFlag("__shops__")) core.setFlag("__shops__", {});
		var shops = core.getFlag("__shops__");
		if (!shops[id]) shops[id] = {};
		return shops[id].visited;
	}

	/// 当前应当显示的快捷商店列表
	this.listShopIds = function () {
		return Object.keys(core.status.shops).filter(function (id) {
			return core.isShopVisited(id) || !core.status.shops[id].mustEnable;
		});
	}

	/// 是否能够打开某个商店
	this.canOpenShop = function (id) {
		if (this.isShopVisited(id)) return true;
		var shop = core.status.shops[id];
		if (shop.item || shop.commonEvent || shop.mustEnable) return false;
		return true;
	}

	/// 启用或禁用某个快捷商店
	this.setShopVisited = function (id, visited) {
		if (!core.hasFlag("__shops__")) core.setFlag("__shops__", {});
		var shops = core.getFlag("__shops__");
		if (!shops[id]) shops[id] = {};
		if (visited) shops[id].visited = true;
		else delete shops[id].visited;
	}

	/// 能否使用快捷商店
	this.canUseQuickShop = function (id) {
		// 如果返回一个字符串，表示不能，字符串为不能使用的提示
		// 返回null代表可以使用

		// 检查当前楼层的canUseQuickShop选项是否为false
		if (core.status.thisMap.canUseQuickShop === false)
			return '当前楼层不能使用快捷商店。';
		return null;
	}

	var _shouldProcessKeyUp = true;

	/// 允许商店X键退出
	core.registerAction('keyUp', 'shops', function (keycode) {
		if (!core.status.lockControl || core.status.event.id != 'action') return false;
		if ((keycode == 13 || keycode == 32) && !_shouldProcessKeyUp) {
			_shouldProcessKeyUp = true;
			return true;
		}

		if (!core.hasFlag("@temp@shop") || core.status.event.data.type != 'choices') return false;
		var data = core.status.event.data.current;
		var choices = data.choices;
		var topIndex = core.actions._getChoicesTopIndex(choices.length);
		if (keycode == 88 || keycode == 27) { // X, ESC
			core.actions._clickAction(core.actions.HSIZE, topIndex + choices.length - 1);
			return true;
		}
		return false;
	}, 60);

	/// 允许长按空格或回车连续执行操作
	core.registerAction('keyDown', 'shops', function (keycode) {
		if (!core.status.lockControl || !core.hasFlag("@temp@shop") || core.status.event.id != 'action') return false;
		if (core.status.event.data.type != 'choices') return false;
		var data = core.status.event.data.current;
		var choices = data.choices;
		var topIndex = core.actions._getChoicesTopIndex(choices.length);
		if (keycode == 13 || keycode == 32) { // Space, Enter
			core.actions._clickAction(core.actions.HSIZE, topIndex + core.status.event.selection);
			_shouldProcessKeyUp = false;
			return true;
		}
		return false;
	}, 60);

	// 允许长按屏幕连续执行操作
	core.registerAction('longClick', 'shops', function (x, y, px, py) {
		if (!core.status.lockControl || !core.hasFlag("@temp@shop") || core.status.event.id != 'action') return false;
		if (core.status.event.data.type != 'choices') return false;
		var data = core.status.event.data.current;
		var choices = data.choices;
		var topIndex = core.actions._getChoicesTopIndex(choices.length);
		if (x >= core.actions.CHOICES_LEFT && x <= core.actions.CHOICES_RIGHT && y >= topIndex && y < topIndex + choices.length) {
			core.actions._clickAction(x, y);
			return true;
		}
		return false;
	}, 60);
}
}