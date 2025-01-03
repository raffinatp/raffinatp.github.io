function getPythonText() { 
		var code = ""; 
		try {
			var entrees = [], entrees_tests = [];
			var nom, val, i1, i2,i_entree; 
			code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace);
			var liste = code.split("\n");
			for(var i=liste.length-1; i>=0; i--) {
				if (liste[i].indexOf("= None")>=0) {
					liste.splice(i,1);
				}
				else if (liste[i].indexOf("global ")>=0) {
					liste.splice(i,1);
				}
				else if (liste[i].trim()=="") {
					liste.splice(i,1);
				}
				else if (liste[i].indexOf("#entrée")==0) {
					i1 = liste[i].indexOf(" ");
					i2 = liste[i].indexOf(":");
					nom = liste[i].substring(i1,i2).trim(); 
					entrees.push(nom);
					val = liste[i].substring(i2+2); 
					entrees_tests.push(val);
				}
			}
			code = liste.join("\n");
			if (entrees.length>0) {
				entrees = entrees.reverse();
				entrees_tests = entrees_tests.reverse();
				liste = code.split("\n");
				i_entree=-1;
				for(var i=liste.length-1; i>=0; i--) { 
					if (liste[i].indexOf("#entrée")==0) {
						i_entree=i;
					}
				}
				var avec_return = false;
				for(var i=liste.length-1; i>i_entree; i--) { 
				if (liste[i].indexOf("return ")>=0) avec_return = true;
					if (liste[i].indexOf("#entrée")==0) {
						liste.splice(i,1);
					}
					else {
						liste[i]="\t"+liste[i];
					}
				}
				liste[i_entree] = "def algo(" + entrees.join(",") + ") :";
				code = liste.join("\n");
				if (avec_return) {
					code += "\n\nprint(algo(" + entrees_tests.join(",") + "))";
				} else {
					code += "\n\nalgo(" + entrees_tests.join(",") + ")";
				} 
			}
			var blocks = Blockly.getMainWorkspace().getAllVariables();
			for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].type === "list") {
					code = blocks[i].name + " = []\n" + code  
				}
			}
		}catch (e) {
			code = "# Scratch n'a pu etre traduit en Python"; Println(e);
		}
		return code;
}

function outf(text) {
	var mypre = document.getElementById("output");
	mypre.innerHTML = mypre.innerHTML + text;
}

function builtinRead(x) {
	if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
	throw "File not found: '" + x + "'";
	return Sk.builtinFiles["files"][x];
}

function runPython0(editor) {
	effacerOutput(); 
	prog = editor.getValue();
	prog = prog.split("é").join("e");
	prog = prog.split("è").join("e");
	prog = prog.split("ê").join("e");
	prog = prog.split("à").join("a");
	if (prog.indexOf("scratchggb")>=0) {
		effacer(); 
//fixerNbInitialObjets(0);
		initialiser();
	}
	try {
		eval(Sk.importMainWithBody("<stdin>",false,prog));
	}
	catch(e) {
		Println(e.toString());
		try {
			var lig = e.lineno;
			Println("erreur ligne " + lig);
			editor.gotoLine(lig);
		}
		catch(e1) {
		}
	}
}

function runPython(editor) {
	effacerOutput(); 
	prog = editor.getValue();
	prog = prog.split("é").join("e");
	prog = prog.split("è").join("e");
	prog = prog.split("ê").join("e");
	prog = prog.split("à").join("a");
	try {
		var nbObj = Blockly.config.nbInitialObjets;
		var code = "tracerFigure = function() {" + "\n"
			+ "fixerNbInitialObjets(" + nbObj + ");" + "\n"
			+ "fixerValeursAsurveiller(['n']);" + "\n"
			+ "fixerPointsAsurveiller(['P','Q']);" + "\n"
			+ "initialiser();\n"
			+ "eval(Sk.importMainWithBody('<stdin>',false,prog));\n"
			+ "}\n";
		eval(code+"tracerFigure();\n");
		//Println(tracerFigure.toString());
	}
	catch(e) {
		Println(e.toString());
		try {
			var lig = e.lineno;
			Println("erreur ligne " + lig);
			editor.gotoLine(lig);
		}
		catch(e1) {
		}
	}
}

function initPython() {
	editor.getSession().setMode("ace/mode/python");	
	Sk.configure({output:outf, read:builtinRead,python3:true, retainglobals: true});
	Sk.pre = "output";
	// librairies Python
	Sk.externalLibraries = {
	   "scratchggb": {path: './js/python/bnm1/init.js'}
	}; 
}

