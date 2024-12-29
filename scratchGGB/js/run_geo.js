	
// -----------------------------------------------
// Blockly
// ------------------------------------------------

function getBlocklyText() { 
	var code = "";
	try {
		code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
		var blocks = Blockly.getMainWorkspace().getAllVariables();
		for (var i = 0; i < blocks.length; i++) {
			code = "var " + blocks[i].name + ";\n" + code; 
			if (blocks[i].type === "list") {
				code = blocks[i].name + " = [];\n" + code;  
			}
		}
	} catch (e) {
		code = "// Blockly n'a pu etre traduit en Javascript"; Println(e);
	}
	var pos1 = code.indexOf("tracerFigure()");
	if (pos1>=0) {
		var pos2 = code.indexOf("function ", pos1+1);
		if (pos2<0) { // on ajoute l'accolade fermante à la fin
			code += "\n" + "}";
		} else { // on insere l'accolade fermante
			code = code.substr(0,pos2) + "}\n" + code.substr(pos2);
		}
		code = code + "\ntracerFigure();";
	}
	return code;
}

function changerAppelsFonctions(code) {
	var exPos=0, pos=0, posParenthese, nom;
	while (true) {
		pos = code.indexOf("function",exPos);
		if (pos == -1) {return code;}
		posParenthese = code.indexOf("(",pos);
		nom = code.substring(pos+9,posParenthese);
		code = code.replace("function "+nom,nom+"=function");
		exPos = posParenthese;
	}
}

function runBlockly() {
	effacerOutput();
	try {
		Blockly.config.formel = false;
		var code = getBlocklyText();
		code = changerAppelsFonctions(code);
		console.log(code);
		eval(code);
	} catch (e) {
		Println(e);//Println(e.stack);
	}
}

function initSousProgrammes() {
	Blockly.Procedures.externalProcedureDefCallback = function () {
		var rep = window.prompt("nom (et paramètres) du bloc", "");
		if (rep==null) return;
		rep = rep.split("(").join(" ");
		rep = rep.split(")").join("");
		rep = rep.split(",").join(" ");
		rep = rep.replace(/\s\s+/g, ' '); // on ôte les espaces multiples
		rep = rep.trim();
		if (rep=="") return;
		var i;
		var proccode = rep.split(" ");
		var nomproc = rep[0];
		var argumentids = [];
		var argumentnames = [];
		var argumentdefaults = [];
		for(i=1;i<proccode.length;i++) {
			argumentnames[i-1] = '&quot;' + proccode[i] + '&quot;';
			argumentdefaults[i-1] = '&quot;' + '&quot;';
			argumentids[i-1] = '&quot;' + "ARG" + i + '&quot;';
			proccode[i] = "%s";
		}
		proccode = proccode.join(" ");
		argumentids = "[" + argumentids.join(",") + "]";
		argumentnames = "[" + argumentnames.join(",") + "]";
		argumentdefaults = "[" + argumentdefaults.join(",") + "]";
		var s = '<xml type="procedures_prototype"><mutation proccode="' + proccode + '"'
				+ ' argumentids="' + argumentids + '"'
				+ ' argumentnames="' + argumentnames + '"'
				+ ' argumentdefaults="' + argumentdefaults + '"'
				+ ' warp="false"></mutation></xml>';
		var xml = Blockly.Xml.textToDom(s);
		block = Blockly.Xml.domToBlock(xml, Blockly.mainWorkspace);
		block.initSvg(); block.render();
		lierTarget(creerBloc('procedures_definition'), "custom_block", block);
		Blockly.getMainWorkspace().cleanUp();
		Blockly.getMainWorkspace().refreshToolboxSelection_();
	}
	Blockly.Procedures.mutateCallers = function() {}
}


Blockly.Blocks.event_whenflagclicked = {
    init: function() {
        this.jsonInit({
            id: "event_whenflagclicked",
            message0: Blockly.Msg.EVENT_WHENFLAGCLICKED,
            args0: [{
				name: "MY_ICON_BUTTON",
                type: "field_image",
                src: Blockly.mainWorkspace.options.pathToMedia + "green-flag.svg",
                width: 24,
                height: 24,
                alt: "flag"
            }],
            category: Blockly.Categories.event,
            extensions: ["colours_event", "shape_hat", "my_button_extension"]
        })
    }
};

Blockly.Extensions.register('my_button_extension', function () {
	this.getField('MY_ICON_BUTTON').clickHandler_ = (() => {
		confirm(this.type + ' button clicked');
	});
}); 
	
// -----------------------------------------------
// éditeur
// ------------------------------------------------

function runEditor(editor) {
	effacerOutput();
	var code = editor.getValue();
	code = changerAppelsFonctions(code);
	console.log(code);
	eval(code);
}

function tabuler(code) {
	tabus="";
	for(k=1; k<=10; k++) {
		code = code.split("\n" + tabus + "  ").join("\n" + tabus + "\t");
		tabus += "\t";
	}
	return code;
}

function blocklyToEditor(editor, texte) {
	editor.setValue(tabuler(texte),-1);
	//editor.focus();
}

function blocklyInsertEditor(editor, texte) {
	editor.insert(tabuler(texte));
	//editor.focus();
}

	
// -----------------------------------------------
// chargements de programmes et de menus
// ------------------------------------------------

function loadSampleUrl(url) {
	console.log(url);
		return $.ajax({
			type: "GET",
			url: url,
			dataType: "xml",
			success: function(xml) {
				var x = xml.firstChild;
				while (x.nodeType != 1) {
					x = x.nextSibling;
				}
				Blockly.getMainWorkspace().clear();
				setTimeout(() => { 
					Blockly.getMainWorkspace().refreshToolboxSelection_();
				}, 2000);	
				return Blockly.Xml.domToWorkspace(x, Blockly.getMainWorkspace());
				//return Blockly.Xml.domToWorkspace($(xml).find("#" + name)[0], Blockly.getMainWorkspace());
			}
		});
}

function loadMenu() {
	$.ajax({
		type: "GET",
		// ----------------------------------------------------------------------------------------------
		url: Blockly.config.menu,  // le fichier xml décrivant le menu
		// ----------------------------------------------------------------------------------------------
		dataType: "xml",
		error : function(jqXhr, textStatus) {
			Println("Le menu de Blockly n'a pas pu etre téléchargé : vérifiez votre URL...");
		},
		success: function(xml) {
			// création de l'espace de travail (en particulier du menu)
			//Blockly.Toolbox.prototype.width = 210;
			workspace = Blockly.inject('blocklyDiv', {
			  comments: true,
			  disable: false,
			  collapse: false,
			  media: './js/scratch/media/',
			  //media:"http://raffinat.perso.univ-pau.fr/blockly/juliette/scratchGGB/scratch/media/",
			  readOnly: false,
			  //rtl: rtl,
			  scrollbars: true,
			  //toolbox: null,
			  toolbox: $(xml).find("#toolbox")[0],  // telechargement du menu
			  toolboxPosition: 'start',
			  horizontalLayout: false,
			  trashcan: true,
			  sounds: false,
			  zoom: {
				controls: true,
				wheel: true,
				startScale: 0.75,
				maxScale: 4,
				minScale: 0.25,
				scaleSpeed: 1.1
			  },
			  colours: {
				fieldShadow: 'rgba(255, 255, 255, 0.3)',
				dragShadowOpacity: 0.6
			  }
			});	
			deplierTout();
	if (Blockly.config.progFile.indexOf("python")>=0)  {
		bouton_python();
	}
			workspace.addChangeListener(function () {
				//Println("aaa");
				var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
				if (code.indexOf("window.prompt(")>=0) return;
				if (code.indexOf(",'');")>=0) return; // commandeG(...,''); : dernier arg non rempli
				if (Blockly.config.auto==false) return;
				runBlockly();
			});
			setTimeout(() => { 
				loadSampleUrl(Blockly.config.progFile); 
				setTimeout(() => { 
					Println("- ScratchGGB au collège : voir <a href='https://sites.google.com/view/raffinatp/scratchggb/college' target='_blank'>documentation</a>");
					Println("- ScratchGGB au lycée: voir <a href='https://sites.google.com/view/raffinatp/scratchggb/lycee' target='_blank'>documentation</a>");
					Println("- Choisis une activité dans la liste déroulante (en jaune)...");
				}, 1000);	
			}, 3000);
			loadBoutons(xml);
		} // fin success
	}); // fin ajax
}

function loadBoutons(xml) {
	try {
		Blockly.boutons = {};
		Blockly.boutons.cles = {};
		Blockly.boutons.enonces = {};
		Blockly.boutons.geos = {};
		Blockly.boutons.progs = {};
		var i,j;
		var x = xml.getElementsByTagName("button");
		var cle, legende, geo, prog;
		for (i = 0; i <x.length; i++) {
			cle = x[i].getAttribute('callbackKey');
			legende = x[i].getAttribute('text');
			Blockly.boutons.cles[legende] = cle;
			geo = x[i].getAttribute('geo');
			Blockly.boutons.geos[legende] = geo;
			prog = x[i].getAttribute('prog');
			Blockly.boutons.progs[legende] = prog;
			var y = x[i].childNodes;
			var nb_cdata = 0;
			console.log("------"); console.log(cle); console.log(legende);
			for (j = 0; j <y.length; j++) {
				if (y[j].nodeType == 4) {
					nb_cdata = nb_cdata+1;
					if (nb_cdata==1) {
						Blockly.boutons.enonces[legende] = y[j].nodeValue;
					}
				}
			}
			Blockly.getMainWorkspace().registerButtonCallback(cle, function(button) {
				console.log(button.text_);
				effacerOutput();
				if (Blockly.boutons.cles[button.text_]) {
					if (Blockly.boutons.enonces[button.text_]) {
						Message(Blockly.boutons.enonces[button.text_].substring(1));
					}
					if (Blockly.boutons.progs[button.text_]) {
						Blockly.config.progFile = Blockly.boutons.progs[button.text_];
						loadSampleUrl(Blockly.boutons.progs[button.text_]);
					}
					if (Blockly.boutons.geos[button.text_]) {
						Blockly.config.ggbFile = Blockly.boutons.geos[button.text_];
						recreerApplet();
					}
				}
			});
			Blockly.getMainWorkspace().refreshToolboxSelection_();
		}
	} catch(ex) {
	}
}
	
// -----------------------------------------------
// applette 
// ------------------------------------------------

function creerAppletParameters() {
	var parameters = {
		"id": "ggbApplet",
		//"width":document.getElementById("panel-right").style.width, //918,
		// "height":document.getElementById("panel-left").style.height*0.8, // 858,
		"width":918,
		"height":828,
		"algebraInputPosition":"bottom",
		"appName":"classic",
		"buttonRounding":0.7,
		"buttonShadows":false,
		"clickToLoad":false,
		//"customToolBar":"0 39 73 62 | 1 501 67 , 5 19 , 72 75 76 | 2 15 45 , 18 65 , 7 37 | 4 3 8 9 , 13 44 , 58 , 47 | 16 51 64 , 70 | 10 34 53 11 , 24  20 22 , 21 23 | 55 56 57 , 12 | 36 46 , 38 49  50 , 71  14  68 | 30 29 54 32 31 33 | 25 17 26 60 52 61 | 40 41 42 , 27 28 35 , 6",
		"disableAutoScale":false,
		"enableLabelDrags":false,
		"enableShiftDragZoom":true,
		"enableRightClick":true,
		"errorDialogsActive":false,
		//"filename":"polygones1.ggb",
		"language":"fr",
		"preventFocus":false,
		"scale":1,
		"showAlgebraInput":false,
		"showFullscreenButton":true,
		"showLogging":false,
		"showMenuBar":true,
		"showResetIcon":false,
		"showSuggestionButtons":false,
		"showToolBar":true,
		"showToolBarHelp":false,
		"showZoomButtons":false,
		"useBrowserForJS":false
	};
	if (Blockly.config.ggbFile.indexOf(".ggb")<0) {
		parameters.ggbBase64 = Blockly.config.ggbFile;
		//parameters.filename = null;
	}
	else {
		parameters.filename = Blockly.config.ggbFile;
		//parameters.ggbBase64 = null;
	}
	return parameters;
}

function creerApplet() {
	var parameters = creerAppletParameters();
	// is3D=is 3D applet using 3D view, AV=Algebra View, SV=Spreadsheet View, CV=CAS View, EV2=Graphics View 2, CP=Construction Protocol, PC=Probability Calculator, DA=Data Analysis, FI=Function Inspector, PV=Python, macro=Macro View
	var views = {'is3D': 0,'AV': 0,'SV': 0,'CV': 0,'EV2': 0,'CP': 0,'PC': 0,'DA': 0,'FI': 0,'macro': 0};
	var applet = new GGBApplet(parameters, '5.0', views);
	//confirm(ggbApplet.getObjectNumber());
	return applet;
}

function recreerApplet() {
	var applet = creerApplet(); applet.inject('ggbApplet'); Blockly.config.nbInitialObjets = -1;
	setTimeout(() => { 
		Blockly.config.nbInitialObjets = ggbApplet.getObjectNumber();
		runBlockly();
	}, 3000);	
}

		
// ----------------------------------------------------------------------------------------------
// initialisation de ScratchGGB
// ----------------------------------------------------------------------------------------------

function deplierTout() {
	document.getElementById("panel-left").style.height=(window.innerHeight-50) + "px";
	//Blockly.svgResize(Blockly.mainWorkspace); editor.resize();
	var pct = document.getElementById("myRange").value/100;
	if (pct==0) {	
		document.getElementById("boutons_blockly_demo").style.visibility = 'hidden';
		document.getElementById("boutons_editor_demo").style.visibility = 'visible';
	} else if (pct==1) {
		document.getElementById("boutons_blockly_demo").style.visibility = 'visible'; 
		document.getElementById("boutons_editor_demo").style.visibility = 'hidden';
	} else {
		document.getElementById("boutons_blockly_demo").style.visibility = 'visible';
		document.getElementById("boutons_editor_demo").style.visibility = 'visible';
	}
	document.getElementById("editor").style.height=(1-pct)*(window.innerHeight-100) + "px";
	document.getElementById("blocklyDiv").style.height=pct*(window.innerHeight - 100) + "px";
	Blockly.svgResize(Blockly.mainWorkspace); editor.resize();
}

function initScratchGGB() {
	// editeur
	editor = ace.edit("editor");
	editor.getSession().setUseSoftTabs(false); 
	editor.getSession().setMode("ace/mode/javascript");	
	// configuration
	Blockly.config = {};
	Blockly.config.menu = "demos/menus0.xml";
	Blockly.config.ggbFile = "demos/vide.ggb";
	Blockly.config.nbInitialObjets = -1;
	Blockly.config.progFile = "demos/prog0.xml";
	Blockly.config.auto = true;
	Blockly.ScratchMsgs.setLocale("fr");
	var params = (new URL(document.location)).searchParams;
	if (params.get('geo')!=null) {	
		Blockly.config.ggbFile = params.get('geo');
	}
	if (params.get('prog')!=null) {	
		Blockly.config.progFile = params.get('prog');
	}
	if (params.get('menu')!=null) {	
		Blockly.config.menu = params.get('menu');
	}
	if (params.get('url')!=null) {	
		Blockly.config.url = params.get('url');
		Blockly.config.ggbFile = Blockly.config.url + "/geogebra.ggb"
		Blockly.config.menu = Blockly.config.url + "/menu.xml"
		Blockly.config.progFile = Blockly.config.url + "/prog.xml"
	}
	if (params.get('fin')!=null) {	
		Blockly.config.url = params.get('fin');
		Blockly.config.ggbFile = Blockly.config.url + "/geogebra.ggb"
		Blockly.config.menu = Blockly.config.url + "/menu.xml"
		Blockly.config.progFile = Blockly.config.url + "/prog_final.xml"
	}
	
	loadMenu();
	initSousProgrammes();	

	// redimensionnement fenêtres
	var slider = document.getElementById("myRange");
	slider.onchange = function() {
		deplierTout(); 
	}
	$(".panel-left").resizable({
        handleSelector: ".splitter",
        resizeHeight: false,
		onDragEnd: function() { 
			Blockly.svgResize(Blockly.mainWorkspace); 
			editor.resize();
			//confirm(window.innerWidth);
			//confirm(document.getElementById("panel-left").style.width);
			//var largeur = window.innerWidth + 250 - parseInt(document.getElementById("panel-left").style.width);
			//var hauteur = parseInt(document.getElementById("panel-left").style.height);
			//confirm(largeur);
			//confirm(hauteur);
			//ggbApplet.setSize(largeur, 858);
		}
    });
	// geogebra
	var applet = creerApplet();
	window.onload = function() {
		//var applet = creerApplet();
		applet.inject('ggbApplet');	//return;
		setTimeout(() => { 	
			//loadMenu();
			//initSousProgrammes();
		}, 1000);
	};	
}

