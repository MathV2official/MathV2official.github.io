!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var a in n)("object"==typeof exports?exports:e)[a]=n[a]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=83)}({83:function(e,t,n){"use strict";n(84)},84:function(e,t,n){"use strict";function a(){var e=h(),t=g(e);b(t),y(t),(0,d.isItemPage)()&&r(e)}function r(e){if((0,d.isItemPage)()){var t=document.querySelectorAll("["+f+"]");Array.prototype.slice.call(t).forEach(function(e){e.removeEventListener("click",o),e.addEventListener("click",o)}),v=null,(0,d.fetchData)(e,function(e){v=e,(0,d.preloadIcon)(v.id)},function(){v=null})}}function o(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t;x&&(clearTimeout(x),n=!0);var r=(0,p.isInterstitialReady)();null===v||r||(e.preventDefault(),x=window.setTimeout(function(){x=null,(0,d.replace)(v),(0,p.checkAdsRefreshOnItemChange)(),window.ga&&ga("send","pageview",window.location.pathname),window.fathom&&fathom.trackPageview&&fathom("trackPageview",{url:window.location.pathname}),w&&w(),w=(0,u.parentsRun)(),i(v.parentSlugs),l(),a()},n?0:m))}function i(e){k={},e.forEach(function(e){(0,d.fetchData)(e,function(t){k[e]=t,(0,d.preloadIcon)(t.id)},function(){return null})})}function l(){var e=document.querySelectorAll("[data-parent-link]");Array.prototype.slice.call(e).forEach(function(e){e.addEventListener("click",function(t){var n=e.getAttribute("data-parent-link");k[n]&&(v=k[n],o(t,!0),window.scrollTo(0,0))})})}var c=n(85),s=function(e){return e&&e.__esModule?e:{default:e}}(c),u=n(86),d=n(87),p=n(88),m=200,f="data-hint",h=function(){var e=Math.floor(Math.random()*s.default.length);return s.default[e]},g=function(e){return"/item/"+e},b=function(e){var t=document.querySelectorAll("["+f+"]");Array.prototype.slice.call(t).forEach(function(t){t.href=e})},y=function(e){if((0,d.isHomePage)()){var t=document.createElement("link");if(t.rel="prefetch",t.href=e,t.as="document",document.head.appendChild(t),HTMLScriptElement.supports&&HTMLScriptElement.supports("speculationrules")){var n=document.createElement("script");n.type="speculationrules";var a={prerender:[{source:"list",urls:[e]}]};n.textContent=JSON.stringify(a),document.body.append(n)}else{var r=document.createElement("link");r.rel="prerender",r.href=e,document.head.appendChild(r)}}},w=(0,u.parentsRun)(),v=null,k={},x=null;!function(){a(),window.addEventListener("load",function(){i((0,d.getCurrentItemParentsSet)()),l()}),window.addEventListener("popstate",function(){var e=document.querySelector('link[rel="canonical"]').href;window.location.href.includes(e)||window.location.reload()}),(0,p.trackAdsVisibility)()}()},85:function(e,t){e.exports=["achilles","acid-rain","aegis","aeolus","airplane","alarm-clock","alchemist","alcohol","algae","alien","allergy","alligator","alpaca","ambulance","angel","angler","animal","ankh","ant","ant-farm","antarctica","anthill","apple-of-discord","apron","aquarium","archeologist","archipelago","arctic","armadillo","armor","arrow","ash","astronaut","astronomer","atmosphere","atomic-bomb","aurora","avalanche","aviary","axe","baast","baba-yaga","babe-the-blue-ox","bacon","bacteria","baker","bakery","banana","banana-bread","bandage","bank","banshee","barn","barrel","bat","batter","battery","bayonet","bbq","beach","beaver","bee","beehive","beekeeper","beer","bell","bicycle","binoculars","bird","birdcage","birdhouse","black-hole","blade","blender","blizzard","blood","blood-bag","boat","boiler","bone","bonsai-tree","book","book-of-the-dead","bottle","boulder","bow","box","bread","brick","bridge","broom","bucket","bullet","bulletproof-vest","bunyip","bus","butcher","butter","butterfly","butterfly-net","cable-car","cactus","cage","cake","calydonian-boar","camazotz","camel","campfire","candle","candy-cane","cannon","canvas","car","caramel","carbon-dioxide","carrot","cart","cashmere","castle","cat","catnip","cauldron","cave","caviar","centaur","cereal","chain","chainsaw","chameleon","chang'e","changeling","charcoal","cheese","cheeseburger","chicken","chicken-coop","chicken-soup","chicken-wing","chill","chimera","chimney","chinese-dragon","chocolate","chocolate-milk","christmas-stocking","christmas-tree","cigarette","circus","city","clay","clock","closet","cloud","coal","cockatrice","coconut","coconut-milk","coffin","cold","combustion-engine","computer","computer-mouse","confetti","constellation","continent","cook","cookbook","cookie","cookie-cutter","cookie-dough","coral","corpse","cosmic-egg","cotton","cotton-candy","cow","crayon","crow","crystal-ball","cthulhu","cuckoo","cup","cupid","current","curse","cutting-board","cyborg","cyclist","cyclops","dam","darkness","dawn","day","death","deity","demon","desert","dew","diamond","dinosaur","dionysus","diver","djinn","doctor","dog","doge","doghouse","domestication","domovoi","don-quixote","donut","double-rainbow!","dough","dragon","drone","drum","drunk","dry-ice","dryad","duck","duckling","dune","durendal","dust","dynamite","eagle","earthquake","eclipse","egg","egg-timer","electric-car","electric-eel","electrician","electricity","elf","elixir-of-life","email","energy","engineer","epona","eruption","excalibur","excavator","explosion","fabric","factory","faerie","fairy-tale","family","family-tree","farm","farmer","father-time","faun","fence","fenrir","field","fire-extinguisher","firefighter","fireplace","firestation","firetruck","firewall","fireworks","fish","fishing-rod","flamethrower","flashlight","flood","flour","flower","flute","flying-fish","flying-squirrel","fog","force-knight","forest","fork","fortune-cookie","fossil","fountain","fountain-of-youth","fox","frankenstein's-monster","french-fries","fridge","frog","frozen-yogurt","fruit","fruit-tree","galaxy","galaxy-cluster","garage","garden","gardener","gargoyle","garuda","gas","gashadokuro","geyser","ghost","giant","gift","gingerbread-house","gingerbread-man","glacier","glass","glasses","gnome","goat","goblin","gold","golem","granite","grass","grave","gravestone","graveyard","green-man","greenhouse","gremlin","grenade","griffin","grilled-cheese","grim-reaper","gun","gunpowder","gust","hacker","hail","ham","hamburger","hammer","hamster","hangar","harp","hay","hay-bale","heat","heaven","hedge","hedgehog","helicopter","hell","hellhound","hero","hill","hippo","holy-grail","holy-water","honey","horizon","horse","horseshoe","hospital","hot-chocolate","hourglass","house","human","hummingbird","hurricane","husky","hydra","ice","ice-cream","ice-cream-truck","ice-sculpture","iceberg","iced-tea","idea","igloo","internet","island","ivy","jack-o-lantern","jackalope","jam","jar","jerky","jiangshi","jormungandr","jotunn","juice","jupiter","kaiju","kanab","kappa","katana","kelpie","kite","kitsune","knife","knight","kraken","krampus","lake","lamp","land","laptop","lasso","lava","lava-lamp","lawn","lawn-mower","leaf","leather","legend","lens","letter","librarian","library","life","light-bulb","light-sword","lighthouse","lightning","lion","liquid","little-alchemy","livestock","lizard","log-cabin","love","lumberjack","maahes","mac-and-cheese","machine","magic","magic-lamp","magma","mail-truck","mailbox","mailman","manatee","map","maple-syrup","mara","mars","marshmallows","maui","maui's-fishhook","mayonnaise","meat","medusa","mercury","mermaid","meteor","meteoroid","microscope","milk","milk-shake","mimic","mineral","minotaur","mirror","mist","mjolnir","mold","monarch","money","monkey","moon","moon-rover","moss","moth","mothman","motorcycle","mount-olympus","mountain","mountain-goat","mountain-range","mouse","mousetrap","mud","mummy","music","musician","narwhal","necromancer","necronomicon","needle","nessie","nest","net","newspaper","night","ninja","ninja-turtle","nuts","oasis","obsidian","ocean","oil","omelette","oni","ooze","optical-fiber","orc","orchard","ore","organic-matter","origami","ostrich","ouroboros","owl","oxygen","ozone","paint","painter","painting","paladin","paleontologist","palm","pan-flute","pandora's-box","paper","paper-airplane","paper-cup","parachute","paraglider","park","parrot","pasta","paul-bunyan","peach-of-immortality","peacock","peanut-butter","peat","pebble","pegasus","pencil","pencil-sharpener","penguin","penicillin","perfume","petroleum","philosopher's-stone","phoenix","picnic","pie","pig","pigeon","piggy-bank","pilot","pinocchio","pipe","piranha","pirate","pirate-ship","pitchfork","pizza","planet","plankton","plant","plasma","platypus","plow","polar-bear","pollen","pond","popsicle","poseidon","post-office","potato","potter","pottery","pressure","primordial-soup","printer","prism","prometheus","pterodactyl","puddle","pumpkin","pyramid","quetzalcoatl","quicksand","quicksilver","ra","rabbit","rain","rainbow","rainbow-serpent","rainforest","rat","recipe","reed","reindeer","restaurant","ring","river","rivulet","robot","robot-vacuum","roc","rock","rocket","roe","roller-coaster","rope","rose","ruins","ruler","rust","rv","sack","saddle","safe","safety-glasses","sailboat","sailor","salamander","salt","samurai","sand","sand-castle","sandman","sandpaper","sandstone","sandstorm","sandwich","santa","sap","saturn","scalpel","scarecrow","scissors","scorpion","scuba-tank","scythe","sea","seagull","seahorse","seal","seaplane","seasickness","seaweed","seed","selkie","sewing-machine","shark","sheep","sheet-music","shipwreck","shovel","shuriken","sickness","silo","skateboard","skeleton","ski-goggles","skier","sky","skyscraper","sleigh","sloth","smartphone","smog","smoke","smoke-signal","smoothie","snake","snow","snow-globe","snowball","snowboard","snowboarder","snowman","snowmobile","soap","soda","soil","solar-cell","solar-system","solid","sound","space","space-station","spaceship","spaghetti","sphinx","spider","spoon","spotlight","sprinkles","squirrel","star","starfish","statue","steak","steam","steam-engine","steamboat","steel","steel-wool","stethoscope","stone","storm","story","stream","string-phone","stun-gun","sugar","sun","sun-wukong","sundial","sunflower","sunglasses","supernova","surfer","sushi","swamp","sweater","swim-goggles","swimmer","swimming-pool","sword","swordfish","syringe","tablet","tailor","tank","tawaret","tea","telescope","tengu","tent","the-one-ring","thermometer","thor","thread","tide","titanic","toast","tobacco","tool","toolbox","tornado","toucan","tractor","train","trainyard","treasure","treasure-map","tree","treehouse","trojan-horse","troll","tsunami","tunnel","turtle","twilight","tyrannosaurus-rex","ufo","umbrella","unicorn","universe","vacuum-cleaner","valhalla","valkyrie","vampire","vase","vault","vegetable","venus","village","vine","vinegar","vodyanoy","volcano","vulcan","vulture","wagon","wall","wand","warmth","warrior","watch","water-gun","water-lily","water-pipe","waterfall","wave","wax","web","werewolf","wheat","wheel","wild-boar","will-o'-the-wisp","wind","wind-turbine","windmill","windsurfer","wine","wire","witch","wizard","wolf","wolpertinger","wood","woodpecker","wool","world-turtle","wrapping-paper","writer","yeti","yggdrasil","yogurt","zeus","ziz","zombie","zoo"]},86:function(e,t,n){"use strict";function a(){if(o()){b=g(),w(),l()&&(l().innerHTML=b+1),m(d()),p(u()[b],"flex"),p(i(),"flex");var e=function(){m(u()[b]),b=g(),w(),l().innerHTML=b+1,p(u()[b],"flex")};return window.addEventListener("popstate",e),c()&&s()&&(c().addEventListener("click",function(){return y(-1)}),s().addEventListener("click",function(){return y(1)})),function(){window.removeEventListener("popstate",e)}}}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.parentsRun=a;var o=function(){return window.location.pathname.includes("/item")},i=function(){return document.querySelector("[data-controls]")},l=function(){return document.querySelector("[data-current-index]")},c=function(){return document.querySelector("[data-prev]")},s=function(){return document.querySelector("[data-next]")},u=function(){return document.querySelectorAll("[data-parents]")},d=function(){return document.querySelector("[data-parents-placeholder]")},p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"block";e&&(e.style.display=t)},m=function(e){e&&(e.style.display="none")},f=function(e){e&&(e.style.visibility="visible")},h=function(e){e&&(e.style.visibility="hidden")},g=function(){var e=window.location.pathname.split("/").filter(Boolean),t=e[e.length-1];return/^\d+$/.test(t)?+t-1:0},b=0,y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=b+e;t<0||t>u().length-1||(m(u()[b]),b=t,l().innerHTML=t+1,p(u()[b],"flex"),w(),history.pushState({},null,v()))},w=function(){if(!(u().length<=1)){0===b?h(c()):f(c());b===u().length-1?h(s()):f(s())}},v=function(){var e=window.location.pathname.split("/").filter(Boolean),t=r(e,2),n=t[0],a=t[1],o=window.location.origin+"/"+n+"/"+a;return 0===b?o:o+"/"+(b+1)}},87:function(e,t,n){"use strict";function a(e){history.pushState({},null,"/item/"+e.slug),document.title="Little Alchemy 2 Official Hints and Cheats - How to make "+e.name,document.querySelector('meta[name="description"]').setAttribute("content","Little Alchemy 2 official hints and cheats guide! Use official cheats to discover "+e.name+"! Find out how to make "+e.name+" and hundreds of other items!"),document.querySelector('link[rel="canonical"]').setAttribute("href","https://hints.littlealchemy2.com/item/"+e.slug),r("icon").src="/icons/"+e.id+".svg",r("icon").alt="Little Alchemy 2 Official Hints and Cheats - "+e.name,r("name").textContent=e.name,r("hint-name").textContent=e.name,r("description").textContent=e.description,r("dlc-info").innerHTML=e.dlcInfo,r("parents").innerHTML=e.parents}function r(e){return document.querySelector("[data-replace-"+e+"]")}function o(){var e=document.querySelectorAll("[data-parent-link]"),t={};return Array.prototype.slice.call(e).forEach(function(e){t[e.getAttribute("data-parent-link")]=!0}),Object.keys(t)}function i(e,t,n){var a=new XMLHttpRequest;a.open("get","/item_data/"+e+".json",!0),a.responseType="json",a.onload=function(){200===a.status?t(a.response):n(a.status)},a.send()}function l(){return window.location.pathname.includes("/item/")}function c(){return"/"===window.location.pathname}function s(e){(new Image).src="/icons/"+e+".svg"}Object.defineProperty(t,"__esModule",{value:!0}),t.replace=a,t.get=r,t.getCurrentItemParentsSet=o,t.fetchData=i,t.isItemPage=l,t.isHomePage=c,t.preloadIcon=s},88:function(e,t,n){"use strict";function a(){s("trackAdsVisibility",window.googletag),window.googletag=window.googletag||{},googletag.cmd.push(r)}function r(){googletag.pubads().addEventListener("slotVisibilityChanged",function(e){var t=e.slot,n=e.inViewPercentage,a=i(t);s("visibility change",a,n),h[a]||(h[a]={duration:0,visibleFrom:null});var r=h[a],o=null!==r.visibleFrom,l=n>=m;s(a,"isVisible =",l,"wasVisible =",o),l!==o&&(l?r.visibleFrom=Date.now():(r.duration+=Date.now()-r.visibleFrom,r.visibleFrom=null),s(a,"data =",r))})}function o(){s("checkAdsRefreshOnItemChange"),googletag.cmd.push(function(){var e=googletag.pubads().getSlots().filter(function(e){if(e.getOutOfPage())return!1;var t=i(e),n=l(t);return s("visibilityDuration",t,n),n>=f});s("slotsToRefresh",e),s("data",h),e.length&&(c(e),e.forEach(function(e){var t=i(e);h[t]={duration:0,visibleFrom:null}}))}),p()}function i(e){return e.getSlotId().getId()}function l(e){var t=h[e];if(!t)return 0;var n=t.duration;return null===t.visibleFrom?n:n+(Date.now()-t.visibleFrom)}function c(e){googletag.pubads().refresh(e)}function s(){}function u(){return googletag.pubads().getSlots().find(function(e){return e.getAdUnitPath().includes("littlealchemy2.com_interstitial")})}function d(){try{var e=u();return!!e&&null!==e.getResponseInformation()}catch(e){return!1}}function p(){null===g&&(g=window.setTimeout(function(){g=null;var e=u();e&&(c([e]),s("refresh interstitial"))},6e4))}Object.defineProperty(t,"__esModule",{value:!0}),t.trackAdsVisibility=a,t.checkAdsRefreshOnItemChange=o,t.isInterstitialReady=d;var m=50,f=2e3,h={},g=null}})});