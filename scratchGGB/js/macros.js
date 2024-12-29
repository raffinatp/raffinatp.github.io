
function macro_prepare() {
	var code_com = "";
	var c= ggbApplet.getXML();
	var lignes = c.replace("\r","").split("\n");
	var dansComm = false;
	var nom, entree, sortie, ligne;
	var noms = [], entrees = [], sorties = [];
	var entrees_possibles = [], sorties_possibles = [];
	var i1,i2;
	for(var k=0; k<lignes.length; k++) {
		if (lignes[k].indexOf("<command ")>=0) {
			dansComm = true;
			i1 = lignes[k].indexOf('"');
			i2 = lignes[k].indexOf('"',i1+1);
			nom = lignes[k].substring(i1+1,i2);
			noms.push(nom);
		}
		if (dansComm && lignes[k].indexOf("<input ")>=0) {
			ligne = lignes[k].replace("<input ", "");
			ligne = ligne.replace("/>", "");
			ligne = ligne.trim();
			ligne = ligne.split(" ");
			for(var kk=0; kk<ligne.length; kk++) {
				i1 = ligne[kk].indexOf('=');
				ligne[kk] = ligne[kk].substring(i1+1);
				ligne[kk] = ligne[kk].split('"').join('');
				if (ligne[kk]=="") {
					ligne.splice(kk); continue; 
				}
				if (entrees_possibles.indexOf(ligne[kk])<0) {
					if (isNaN(ligne[kk])) entrees_possibles.push(ligne[kk]);
				}
			}
			entree = ligne;
			entrees.push(entree);
		}
		if (dansComm && lignes[k].indexOf("<output ")>=0) {
			ligne = lignes[k].replace("<output ", "");
			ligne = ligne.replace("/>", "");
			ligne = ligne.trim();
			ligne = ligne.split(" ");
			for(var kk=ligne.length-1; kk>=0; kk--) {
				i1 = ligne[kk].indexOf('=');
				ligne[kk] = ligne[kk].substring(i1+1);
				ligne[kk] = ligne[kk].split('"').join('');
				if (ligne[kk]=="") {
					ligne.splice(kk); continue; 
				}
				sorties_possibles.push(ligne[kk]);
				//ligne[kk] = ligne[kk].replace('"','');
			}
			sortie = ligne;
			sorties.push(sortie);
		}
		if (lignes[k].indexOf("</command")>=0) {
			code_com += "// " + nom + "(" + entree + ")" + " construit " + sortie + "\n";
			dansComm = false;
		}
	}
	return [noms,entrees,sorties,entrees_possibles,sorties_possibles,code_com];
}

function macro_bloc() {
	var k,kk;
	var res = macro_prepare();
	var noms = res[0];
	var entrees = res[1];
	var sorties = res[2];
	var entrees_possibles = res[3];
	var sorties_possibles = res[4];
	var code_com = res[5];
	// choix des paramètres de la construction
	var nom_proc = prompt("nom de la construction : ", "maConstruction");
	if (nom_proc == null) return;
	if (getProc(nom_proc) != null) return;
	var params = prompt("entrees de la construction : ", entrees_possibles.join(","));
	if (params == null) return;
	params = params.split(",").join(" ");
	params = params.replace(/\s\s+/g, ' '); // on ôte les espaces multiples
	params = params.trim().split(" ");
	for(k=params.length-1; k>=0; k--) {
		kk = sorties_possibles.indexOf(params[kk]);
		if (kk >= 0) {
			sorties_possibles.splice(kk,1);
		}		
	}
	var returns = prompt("sorties de la construction : ", sorties_possibles.join(","));
	if (returns == null) return;
	returns = returns.split(",").join(" ");
	returns = returns.replace(/\s\s+/g, ' '); // on ôte les espaces multiples
	returns = returns.trim().split(" ");
	// création du code javascript
	var code_js = "";
	var outputs = {};
	for(k=0; k<noms.length; k++) {
		var entree = entrees[k];
		var sortie = sorties[k];
		// construction à garder ?
		var garder = true;
		for(kk=0; kk<entree.length; kk++) {
			if (Object.keys(outputs).indexOf(entree[kk]) >= 0) continue;
			if (params.indexOf(entree[kk]) >= 0) continue;
			if (!isNaN(entree[kk])) continue;
			// code_js += "//// " + k + ":" + entree.join(",") + ":"  + kk + "\n";
			garder = false;
		}
		for(kk=0; kk<sortie.length; kk++) {
			if (params.indexOf(sortie[kk]) < 0) continue;
			garder = false;
		}
		if (!garder) continue;
		// liste des entrées de la commande
		for(kk=0; kk<entree.length; kk++) {
			if (Object.keys(outputs).indexOf(entree[kk]) >= 0) {
				entree[kk] = outputs[entree[kk]];
			}
		}
		// liste des sorties de la commande
		for(kk=0; kk<sortie.length; kk++) {
			outputs[sortie[kk]] = "output" + k + '.split(",")' + "[" + kk + "]";
		}
		// modification du code
		code_js += "var nom" + k + " = " + '"' + noms[k] + '"' + ";\n";
		code_js += "var input" + k + " = [" + entree + "];\n";
		var commande = "nom" + k + ' + "("' + " + input" + k + ' + ")"';
		code_js += "var output" + k + " = ggbApplet.evalCommandGetLabels(" + commande + ");\n";
	}
	for(var k=0; k<Object.keys(outputs).length; k++) {
		if (returns.indexOf(Object.keys(outputs)[k]) >= 0) continue;
		// exemple : cacheObjet(output1.split(",")[0]);
		code_js += "cacheObjet(" + Object.values(outputs)[k] + ");\n"
	}
	for(k=returns.length-1; k>=0; k--) {
		if (Object.keys(outputs).indexOf(returns[k]) < 0) {
			returns.splice(k,1);
		} else {
			returns[k] = outputs[returns[k]];
		}		
	}
	code_js += "return [" + returns.join(" , ") + "];\n";
	editor.setValue(code_com+code_js);
	// construction du sous-programme
	sousProgramme(nom_proc,params.join(" "),code_js);
}

function sousProgramme(nom_proc, params, code_js) {
		var rep = nom_proc + " " + params;
		var proccode = rep.split(" ");
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
		var block = Blockly.Xml.domToBlock(xml, Blockly.mainWorkspace);
		block.initSvg(); block.render();
		var block_proc = creerBloc('procedures_definition');
		lierTarget(block_proc, "custom_block", block);
		var block_return = creerBloc('sofuspy_sortie');
		block_return.getField('code').setValue(code_js);
		marquerBloc(block_proc);
		lierNext(block_return);
		Blockly.getMainWorkspace().cleanUp();
		Blockly.getMainWorkspace().refreshToolboxSelection_();
}
