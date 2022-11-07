//<![CDATA[
window.onresize = function(){
reportSize();
document.getElementsByTagName("canvas")[0].style.width = newWidth + 'px';
document.getElementsByTagName("canvas")[0].style.height = newHeight + 'px';
try {document.getElementById('unityContainer').style.height = newHeight + 'px';}catch{};
try {document.getElementById('unityContainer').style.width = newWidth + 'px';}catch{};
try {document.getElementById('gameContainer').style.height = newHeight + 'px';}catch{};
try {document.getElementById('gameContainer').style.width = newWidth + 'px';}catch{};
}
	function reportSize() {
	realw = document.getElementsByTagName("canvas")[0].width;
	realh = document.getElementsByTagName("canvas")[0].height;
	myWidth = 0; myHeight = 0; newWidth = 0; newHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		myWidth = window.innerWidth;
		console.log('Fullscreen width:'+window.innerWidth)
		myHeight = window.innerHeight;
		console.log('Fullscreen width:'+window.innerHeight)
		newWidth = myWidth;
		newHeight = Math.round(newWidth*parseInt(realh)/parseInt(realw)); 
		if (newHeight >  myHeight)
			{			
			newHeight = myHeight; 
			newWidth = Math.round(newHeight*parseInt(realw)/parseInt(realh));
			}
		}
	}
//]]>