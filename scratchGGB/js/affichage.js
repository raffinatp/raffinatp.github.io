/*
Utilitaire pour grossir les entrées-sorties :
	- les affichages sont redirigés vers la balise "output"
	- la question posée dans une boite de saisie standard est redirigée vers la balise "output"
	
Cet utilitaire permet également de gérer le pliage et le dépliage de Blockly

Instructions (adaptables) pour créer ensuite les balises (voir demo_affichage.html par exemple) :

	<pre id="message" class="message"></pre>
	<pre id="output"  class="output"></pre>
	<style>
		.output { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 20pt ;font-weight:normal; color:blue}
		.message { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 20pt ;font-weight:normal; color:red}
	</style>
	
Attention : ...

*/


function Print(texte) {
	var txt = (typeof texte !== 'undefined') ? texte : '';
	var mypre =document.getElementById("output");
	mypre.innerHTML = mypre.innerHTML + txt;
}
function Println(texte) {
	var txt = (typeof texte !== 'undefined') ? texte : '';
	var mypre =document.getElementById("output");
	mypre.innerHTML = mypre.innerHTML + txt + "\n";
}
function effacerOutput() {
	var mypre =document.getElementById("output");
	mypre.innerHTML = "";
}
function Message(texte) {
	var txt = (typeof texte !== 'undefined') ? texte : '';
	var mypre =document.getElementById("message");
	mypre.innerHTML =  txt;
}
function effacerMessage() {
	var mypre =document.getElementById("message");
	mypre.innerHTML = "";
}

window.alert = function(texte) {
	var txt = (typeof texte !== 'undefined') ? texte : '';
	var evaluer = false;
	try {
		if (txt.endsWith("?") && txt.length>1) {
			txt = txt.split("?").join("");
			evaluer = true;
		}
	} catch(ex) {
	}
	var mypre =document.getElementById("output");
	if (evaluer) {
		mypre.innerHTML = mypre.innerHTML + formel_jvs(txt) + "\n";	
		if (txt.indexOf("=")>0) { // équation
			mypre.innerHTML = mypre.innerHTML + ggbApplet.evalCommandCAS( "solve("+txt+")" ) + "\n";
			 if (txt.indexOf("y")>=0) ggbApplet.evalCommand(txt); // courbe			
		}
		else if (txt.indexOf("x")>=0) { // courbe
			ggbApplet.evalCommand(txt);	
		}
	}
	else {
		mypre.innerHTML = mypre.innerHTML + txt + "\n";
	}
}