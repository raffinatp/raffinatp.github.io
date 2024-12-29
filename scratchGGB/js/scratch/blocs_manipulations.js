
function marquerBloc(block) {
	if (block==null) {
		Blockly.bloc_courant = null;
	}
	else {
		Blockly.bloc_courant = block;
	}
}

function creerBloc(prototypeName) {
	//var block = Blockly.Block.obtain(Blockly.getMainWorkspace(), prototypeName);
	//confirm(prototypeName);
	if (prototypeName=="data_variable") return null;
	var block;
	try {
		block = Blockly.getMainWorkspace().newBlock(prototypeName);
	} catch(err) {
		confirm(err + "\n\n" + err.stack);
		return null;
	}
	if ((prototypeName=="text")||(prototypeName=="math_number")||(prototypeName=="math_whole_number")) {
		block.setShadow(true);
		//block.setColour("#ffffff");
	}
	block.initSvg();
	block.render();
	return block;
}

function renommerVariable(block, newName) {
	if (block==null) return;
    var blocks = Blockly.getMainWorkspace().getAllVariables();
	for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].name === newName) {
			  //confirm("setvalue " + newName);confirm(block.getField('VARIABLE').getText());
              block.getField('VARIABLE').setText(newName);
              block.getField('VARIABLE').setValue(blocks[i].id_);
			  return;
            }
	}
	for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === block.getFieldValue('VARIABLE')) {
			  Blockly.getMainWorkspace().renameVariableById(blocks[i].id_, newName);
            }
	}
}

function lierOutput(block, inputName, childBlock) {
	if (block==null) return;
	if (childBlock==null) return;
	try {
		var parentConnection = block.getInput(inputName).connection;
		var childConnection = childBlock.outputConnection;
		parentConnection.connect(childConnection);
	} catch(e) {
	}
}

function lierNext(block) {
	if (block==null) return;
	try {
		if (Blockly.bloc_courant) {
			if (Blockly.bloc_courant.nextConnection) {
				block.previousConnection.connect(Blockly.bloc_courant.nextConnection);
			}
		}
		marquerBloc(block);
	} catch(e) {
	}
}

function lierTarget(block, inputName, childBlock) {
	if (block==null) return;
	if (childBlock==null) return;
	try {
		var parentConnection = block.getInput(inputName).connection;
		var childConnection = childBlock.previousConnection;
		parentConnection.connect(childConnection);
	} catch(e) {
	}
}

function nomDeVariable(nom) {
	return (Blockly.getMainWorkspace().variableIndexOf(nom)>=0);
}

function getProc(nom) {
	// Println("sb2_getProc:"+nom);
		var blocks = Blockly.getMainWorkspace().getAllBlocks();
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i].getProcedureDef) {
				var tuple = blocks[i].getProcedureDef();
				if (tuple) { // nom, arguments, estFonction
					if (tuple[0]==nom) {
						return blocks[i];
					}
				}
			}
		}
		return null;
}

function getNbProc() {
		var total = 0;
		var blocks = Blockly.getMainWorkspace().getAllBlocks();
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i].getProcedureDef) {
				total = total+1;
			}
		}
		return total;
}

function creerBlocProcDef(nom, args) {
		var block = null;
		var childBlock = null;
		//var xml = Blockly.Xml.textToDom("<xml type='procedures_defnoreturn'><field name='NAME'>f</field><mutation><arg name='x'></arg></mutation></xml>");
		var xml = document.createElement('xml');
		xml.setAttribute('type','procedures_defnoreturn');
		container = document.createElement('mutation');
		for (var i = 0; i < args.length; i++) {
			var parameter = document.createElement('arg');
			parameter.setAttribute('name', args[i]);
			if (Blockly.getMainWorkspace().variableIndexOf(args[i]) == -1) {
				Blockly.getMainWorkspace().createVariable(args[i]);
			}
			container.appendChild(parameter);
		}
		xml.appendChild(container);
		block = Blockly.Xml.domToBlock(xml, Blockly.getMainWorkspace());
		if (nom.indexOf(" ")>=0) nom = nom.substr(0, nom.indexOf(" "));
		block.setFieldValue(nom,'NAME');
		return block;
}

function creerBlocFoncDef(nom, args) {
		var block = null;
		var childBlock = null;
		//var xml = Blockly.Xml.textToDom("<xml type='procedures_defnoreturn'><field name='NAME'>f</field><mutation><arg name='x'></arg></mutation></xml>");
		var xml = document.createElement('xml');
		xml.setAttribute('type','procedures_defreturn');
		container = document.createElement('mutation');
		for (var i = 0; i < args.length; i++) {
			var parameter = document.createElement('arg');
			parameter.setAttribute('name', args[i]);
			if (Blockly.getMainWorkspace().variableIndexOf(args[i]) == -1) {
				Blockly.getMainWorkspace().createVariable(args[i]);
			}
			container.appendChild(parameter);
		}
		xml.appendChild(container);
		block = Blockly.Xml.domToBlock(xml, Blockly.getMainWorkspace());
		if (nom.indexOf(" ")>=0) nom = nom.substr(0, nom.indexOf(" "));
		block.setFieldValue(nom,'NAME');
		return block;
}
