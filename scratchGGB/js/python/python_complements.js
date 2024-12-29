// -----------------------------------------------
// Menu Variable : Augmenter/Diminuer 
// ------------------------------------------------

Blockly.Python['sophus_change'] = function(block) {
  var argument0, varName, op, priorite, denom;
  op = block.getFieldValue('OP');
  priorite = Blockly.Python.ORDER_ADDITION;
  if ( (op=='*') || (op=='/') ) priorite = Blockly.Python.ORDER_MULTIPLICATION;
  argument0 = Blockly.Python.valueToCode(block, 'VALUE', priorite) || '0';
  var varName = block.getFieldValue('VARIABLE');
  var blocks = Blockly.getMainWorkspace().getAllVariables();
  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
  }
  switch(op) {
	  case '+pct' :
		return varName + ' = ' + varName + ' * (1 + ' + argument0 + ' / 100)' + ';\n';
	  case '-pct' :
		return varName + ' = ' + varName + ' * (1 - ' + argument0 + ' / 100)' + ';\n';
	  case '**' :
		return varName + ' = Math.pow(' + varName + ' , ' + argument0 + ');\n';
	  case 'inverser' :
		return varName + ' = 1 / ' + varName + ';\n';
	  default :
		if (Blockly.config.formel) {
			return varName + "= operation_jvs(" + varName + ",'" + op + "'," + argument0 + ");\n";
		}
		return varName + ' = ' + varName + ' ' + op + ' ' + argument0 + ';\n';
  }
};
Blockly.Python['data_changevariableby'] = Blockly.Python['sophus_change'];

// -----------------------------------------------
// Menu Controles : boucle Pour
// ------------------------------------------------

Blockly.Python['controls_for'] = function(block) {
  // For loop.
  // var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varName = block.getFieldValue('VARIABLE');
  var blocks = Blockly.getMainWorkspace().getAllVariables();
  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
  }
  var argument0 = Blockly.Python.valueToCode(block, 'FROM',
      Blockly.Python.ORDER_NONE) || '0';
  var argument1 = Blockly.Python.valueToCode(block, 'TO',
      Blockly.Python.ORDER_NONE) || '0';
  var increment = Blockly.Python.valueToCode(block, 'BY',
      Blockly.Python.ORDER_NONE) || '1';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block.id) ||
      Blockly.Python.PASS;
  var code = '';
  var range = '';
  if (!Blockly.isNumber(argument0)) {
		argument0 = "int(" + argument0 + ")";
  }
  if (Blockly.isNumber(increment)) {
    increment = parseFloat(increment);
	if (Blockly.isNumber(argument1)) {
		argument1 = parseFloat(argument1);
		if (increment>0) {
			argument1 = argument1 + 1;
		}
		else if (increment<0) {
			argument1 = argument1 - 1;
		}
	}
	else {
		if (argument1.endsWith("- 1")) {
			argument1 = argument1.substring(0,argument1.length-3);
		}
		else if (argument1.endsWith("-1")) {
			argument1 = argument1.substring(0,argument1.length-2);
		}
		else {	
			argument1 = argument1 + " + 1";
		}
		argument1 = "int(" + argument1 + ")";
	}
	if (increment==1) {
		range = "range(" + argument0 + "," + argument1 + ")";
	}
	else {
		range = "range(" + argument0 + "," + argument1 + "," + increment + ")";
	}
  }
  else { // increment n'est pas un nombre
	increment = "int(" + increment + ")";
	if (Blockly.isNumber(argument1)) {
		argument1 = parseFloat(argument1);
		argument1 = argument1 + 1;
	}
	else {	
		if (argument1.endsWith("- 1")) {
			argument1 = argument1.substring(0,argument1.length-3);
		}
		else if (argument1.endsWith("-1")) {
			argument1 = argument1.substring(0,argument1.length-2);
		}
		else {	
			argument1 = argument1 + " + 1";
		}
		argument1 = "int(" + argument1 + ")";
	}
	range = "range(" + argument0 + "," + argument1 + "," + increment + ")";
  }
  code = 'for ' + varName + ' in ' + range + ':\n' + branch;
  return code;
};


// -----------------------------------------------
// Menu Entrées-Sorties
// ------------------------------------------------

Blockly.Python['sofuspy_entree'] = function(block) {
  var code = this.getFieldValue("code"); 
  var op = block.getFieldValue('OP');
  var varName = block.getFieldValue('VAR');
  var blocks = Blockly.getMainWorkspace().getAllVariables();
  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
  }
  if (op=="in") {
	  code = "#entrée " + varName + ' : ' + code + '\n';
  } else if (op=="float") {
	  code = varName + ' = ' + 'float(input("' + code + '"))\n';
  } else if (op=="int") {
	  code = varName + ' = ' + 'int(input("' + code + '"))\n';
  } else if (op=="str") {
	  code = varName + ' = ' + 'raw_input("' + code + '")\n';
  }
  return code;
};

Blockly.Python['sofuspy_sortie'] = function(block) {
  var code = this.getFieldValue("code"); 
  var op = block.getFieldValue('OP');
  if (code.indexOf("return")>=0) {
	  return code + "\n";
  }
  if ((op=="renvoyer") || (op=="return")) {
	  if (code.indexOf(",")>=0) {
		code = "[" + code + "]";
	  }
	  code = "return " + code + "\n";
  } else {
	  code = "print(" + code + ")\n";
  }
  return code;
};

// -----------------------------------------------
// Tortues
// ------------------------------------------------

Blockly.Python['avancer_reculer'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var code, value_name, op;
  value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  op = block.getFieldValue('OP');
  code = op + "(" + value_name + ")\n";
  return code;
};

Blockly.Python['var_gauche_droite'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var code, value_name, op;
  value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  op = block.getFieldValue('OP');
  code = op + "(" + value_name + ")\n";
  return code;
};

Blockly.Python['mettre_angle'] = function(block) {
  var code = "", value_angle;
  value_angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
  // code = 'tortue().orient(' + value_angle + ');\n';
  return code;
};

Blockly.Python['tortue_teleport'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var code, value_abs, value_ord;
  value_abs = Blockly.Python.valueToCode(block, 'ABS', Blockly.Python.ORDER_ATOMIC);
  value_ord = Blockly.Python.valueToCode(block, 'ORD', Blockly.Python.ORDER_ATOMIC);
  code = 'setposition(' + value_abs + ',' + value_ord + ')\n';
  return code;
};

Blockly.Python['tortue_viser'] = function(block) {
  var code = "", value_abs, value_ord;
  value_abs = Blockly.Python.valueToCode(block, 'ABS', Blockly.Python.ORDER_ATOMIC);
  value_ord = Blockly.Python.valueToCode(block, 'ORD', Blockly.Python.ORDER_ATOMIC);
  // code = 'fixeCap(vers(' + value_abs + ',' + value_ord + '));\n';
  return code;
};

Blockly.Python['tortue_pos'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var op = block.getFieldValue('OP');
  var code = "pos()[0]";
  if (op == "posY") code = "pos()[1]";
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['couleur_remplissage'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var code = "", coul;
  coul = block.getInputTargetBlock('COLOR').getFieldValue('COLOUR');
  code += "fillcolor('" + coul + "')\n";
  code += "color('" +coul + "')\n";
  return code;
};

Blockly.Python['cacher_montrer_tortue'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var op;
  op = block.getFieldValue('OP');
  return op + "()\n";
};

Blockly.Python['baisser_lever_stylo'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var op;
  op = block.getFieldValue('OP');
  return op + "()\n";
};

Blockly.Python['debut_fin_remplissage'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var op;
  op = block.getFieldValue('OP');
  if (op=='debut') {
	  op = 'begin_fill';
  } else {
	  op = 'end_fill';
  }
  return op + "()\n";
};

function tortue_write(x) { tortue().write(x);  }
Blockly.Python['scribe'] = function(block) {
  var code, value_texte;
  value_texte = Blockly.Python.valueToCode(block, 'texte', Blockly.Python.ORDER_ATOMIC);
  return code = "write(" + value_texte + ")\n";
};

// -----------------------------------------------
// Points
// ------------------------------------------------

Blockly.Python['ggb_point'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var x = Blockly.Python.valueToCode(block, 'X',
      Blockly.Python.ORDER_MEMBER) || '0';
  var y = Blockly.Python.valueToCode(block, 'Y',
      Blockly.Python.ORDER_MEMBER) || '0';
  var nom = Blockly.Python.valueToCode(block, 'NOM',
      Blockly.Python.ORDER_MEMBER) || "''";
  // var code = "commandeG('@1=(@2,@3)'," + nom + ',' + x + ',' + y + "); \n";
  var code = nom + "=Point(" + x + "," + y + ")\n";
  code = code.replaceAll("'","");
  if (code.startsWith("=")) code = code.substring(1);
  return code; 
};

Blockly.Python['ggb_couleur_remplissage'] = function(block) {
  var code, coul;
  coul = block.getInputTargetBlock('COLOR').getFieldValue('COLOUR');
  var obj1 = Blockly.Python.valueToCode(block, 'OBJ1',
      Blockly.Python.ORDER_MEMBER) || "''";
  var r = hexToRgb(coul).r;
  var g = hexToRgb(coul).g;
  var b = hexToRgb(coul).b;
  code = "colorier(" + obj1 + "," + r + "," +g + "," + b + ");\n";
  return code;
};

Blockly.Python['ggb_commande_2pts'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var nom = Blockly.Python.valueToCode(block, 'NOM',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj1 = Blockly.Python.valueToCode(block, 'OBJ1',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj2 = Blockly.Python.valueToCode(block, 'OBJ2',
      Blockly.Python.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP').trim();
  // var code = "commandeG('@1=" + op + "(@2,@3)'," + nom + ',' + obj1 + ',' + obj2 + "); \n"; 
  var code = nom + "=" + op + "(" + obj1 + "," + obj2 + ")\n";
  code = code.replaceAll("'","");
  if (code.startsWith("=")) code = code.substring(1);
  return code; 
};

Blockly.Python['ggb_commande_2pts_fonct'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var obj1 = Blockly.Python.valueToCode(block, 'OBJ1',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj2 = Blockly.Python.valueToCode(block, 'OBJ2',
      Blockly.Python.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP').trim();
  // var code = "commandeG('@1=" + op + "(@2,@3)'," + nom + ',' + obj1 + ',' + obj2 + "); \n"; 
  var code = op + "(" + obj1 + "," + obj2 + ")";
  code = code.replaceAll("'","");
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['ggb_3_arg'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var nom = Blockly.Python.valueToCode(block, 'NOM',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj1 = Blockly.Python.valueToCode(block, 'OBJ1',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj2 = Blockly.Python.valueToCode(block, 'OBJ2',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj3 = Blockly.Python.valueToCode(block, 'OBJ3',
      Blockly.Python.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP');
  // var code = "commandeG('@1=" + op + "(@2,@3,@4)'," + nom + ',' + obj1 + ',' + obj2 + ',' + obj3 + "); \n";  
  var code = nom + "=" + op + "(" + obj1 + "," + obj2 + "," + obj3 + ")\n";
  if (op=="Polygon") code = nom + "=" + op + "([" + obj1 + "," + obj2 + "," + obj3 + "])\n";
  code = code.replaceAll("'","");
  if (code.startsWith("=")) code = code.substring(1);
  if (op=="CircleArc") code = "#" + code;
  if (op=="Rotate") {
      // code = "commandeG('@1=" + op + "(@2,@3*3.1416/180,@4)'," + nom + ',' + obj1 + ',' + obj2 + ',' + obj3 + "); \n";
  }	  
  return code; 
};

Blockly.Python['ggb_1_arg'] = function(block) {
  var nom = Blockly.Python.valueToCode(block, 'NOM',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj1 = Blockly.Python.valueToCode(block, 'OBJ1',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj2 = true;
  var op = block.getFieldValue('OP');
  var code;
  if (op=="Point") {
	code = "commandeG('@1=" + op + "(@2)'," + nom + ',' + obj1 + "); ";
	code += "ggbApplet.setAnimating(" + nom + "," + obj2 + ");\n";
	return code;
  }
  if ((op=="")||(op=="fixer_cellule")) {
	code = "commandeG('@1=@2'," + nom + ',' + obj1 + "); \n";
	return code;
  }
  code = op + "(" + nom + "," + obj1 + ");\n";
  return code; 
};

Blockly.Python['ggb_point_fonct'] = function(block) {
  var x = Blockly.Python.valueToCode(block, 'X',
      Blockly.Python.ORDER_MEMBER) || '0';
  var y = Blockly.Python.valueToCode(block, 'Y',
      Blockly.Python.ORDER_MEMBER) || '0';
  var nom = Blockly.Python.valueToCode(block, 'NOM',
      Blockly.Python.ORDER_MEMBER) || "''";
  var code = "Point(" + nom + ", " + x + ", " + y + ")"; 
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['ggb_valeur_de'] = function(block) {
  var nom = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_MEMBER) || "";
  var blocks = Blockly.getMainWorkspace().getAllVariables();
  for (var i = 0; i < blocks.length; i++) {
	if (blocks[i].name === nom) {
		nom = "'" + nom + "'"; break;
	}
  }
  //nom = nom.split("'").join("");
  //var code = "valeur('" + nom + "')";
  var code = "float(valeur(" + nom + "))";
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['ggb_coordX'] = function(block) {
  var nom = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_MEMBER) || "";
  nom = nom.split("'").join("");
  var code = "posX('" + nom + "')";
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['ggb_coordY'] = function(block) {
  var nom = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_MEMBER) || "";
  nom = nom.split("'").join("");
  var code = "posY('" + nom + "')";
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['ggb_1_arg_fonct'] = function(block) {
  var obj1 = Blockly.Python.valueToCode(block, 'OBJ1',
      Blockly.Python.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP');
  var code;
  code = op + "(" + obj1 + ")";
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['ggb_intersections'] = function(block) {
  var nom = Blockly.Python.valueToCode(block, 'NOM',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj1 = Blockly.Python.valueToCode(block, 'OBJ1',
      Blockly.Python.ORDER_MEMBER) || "''";
  var obj2 = Blockly.Python.valueToCode(block, 'OBJ2',
      Blockly.Python.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP');
  //var code = "commandeG('@1=Intersect(@2,@3)'," + nom + ',' + obj1 + ',' + obj2 + "); \n";
  var code = "commandeG('@1=Intersect(@2,@3";
  if (op=="Intersect1") code = code + ",1";
  if (op=="Intersect2") code = code + ",2";
  code = code  + ")'," + nom + ',' + obj1 + ',' + obj2 + "); \n";
  return code; 
};


Blockly.Python['ggb_setCell'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var col = Blockly.Python.valueToCode(block, 'col',
      Blockly.Python.ORDER_MEMBER) || 'A';
  var lig = Blockly.Python.valueToCode(block, 'lig',
      Blockly.Python.ORDER_MEMBER) || '1';
  var valeur = Blockly.Python.valueToCode(block, 'valeur',
      Blockly.Python.ORDER_MEMBER) || "''";
  var code = "setCell(" + col + ',' + lig + "," + valeur + ") \n";
  return code;
};

Blockly.Python['ggb_getCell'] = function(block) {
  Blockly.Python.definitions_['import_scratchggb'] = 'from scratchggb import *';
  var col = Blockly.Python.valueToCode(block, 'col',
      Blockly.Python.ORDER_MEMBER) || 'A';
  var lig = Blockly.Python.valueToCode(block, 'lig',
      Blockly.Python.ORDER_MEMBER) || '1';
  var code = "float(getCell(" + col + ',' + lig + "))";
  return [code, Blockly.Python.ORDER_MEMBER];
};
