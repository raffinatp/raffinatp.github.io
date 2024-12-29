/*
Utilitaire pour ouvrir ou sauver des fichiers Blockly.

Instructions pour créer ensuite les boutons (voir demo_fichiers.html par exemple):

	<input type="file" id="fileToLoad" style="display: none" onchange="ouvrirFichier();" />
	<input type="button" value="Ouvrir" onclick="ouvrirClick();"/>
	<button type="button" onclick="sauverFichier()">Sauver</button>
	
Attention : ne pas inclure fichiers.js avant blockly_compressed.js

*/


function ouvrirClick() {
    var fileinput = document.getElementById("fileToLoad");
    fileinput.click();
}
function ouvrirFichier() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();	
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		if (fileToLoad.name.indexOf(".ggb")>=0) {
			try {
				Blockly.config.ggbFile = textFromFileLoaded;
				recreerApplet();
				//sessionStorage.setItem("base64",textFromFileLoaded);Blockly.config.base64 = true;
			} catch (e) {
				alert("ce fichier ggb ne semble pas être lisible");
				alert(e.message);
			};
		}
		else {
			try {
				Blockly.mainWorkspace.clear();
				Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(textFromFileLoaded));
				setTimeout(() => { 
					Blockly.getMainWorkspace().refreshToolboxSelection_();
				}, 2000);	
			} catch (e) {
				alert("ce fichier ne semble pas être lisible par Blockly");
			};
		}
	}
	if (fileToLoad.name.indexOf(".ggb")>=0) {
		fileReader.readAsDataURL(fileToLoad);
	}
	else {
		fileReader.readAsText(fileToLoad, "UTF-8");
	}
}
function sauverFichier() {
	var textToWrite = Blockly.Xml.domToPrettyText( Blockly.Xml.workspaceToDom(Blockly.mainWorkspace) );
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var params = (new URL(document.location)).searchParams;
	var nomfich = "monprogramme";
	var pos;
	if (params.get('url')!=null) {	
		nomfich = params.get('url'); pos = nomfich.lastIndexOf("/"); nomfich =nomfich.substring(pos+1);
	}
	if (params.get('fin')!=null) {	
		nomfich = params.get('fin'); pos = nomfich.lastIndexOf("/"); nomfich =nomfich.substring(pos+1);
	}
	var fileNameToSaveAs = prompt("nom du fichier (sauvé dans le dossier de téléchargements) ?", nomfich);
	if (fileNameToSaveAs==null) {
		return;
	}
	fileNameToSaveAs = fileNameToSaveAs + ".xml";
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = function destroyClickedElement(event) {
									document.body.removeChild(event.target);
								};
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}