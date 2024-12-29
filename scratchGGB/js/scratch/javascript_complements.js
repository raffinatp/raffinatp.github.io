// -----------------------------------------------
// Menu Variable : Augmenter/Diminuer 
// ------------------------------------------------

Blockly.JavaScript['sophus_change'] = function(block) {
  var argument0, varName, op, priorite, denom;
  op = block.getFieldValue('OP');
  priorite = Blockly.JavaScript.ORDER_ADDITION;
  if ( (op=='*') || (op=='/') ) priorite = Blockly.JavaScript.ORDER_MULTIPLICATION;
  argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', priorite) || '0';
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
Blockly.JavaScript['data_changevariableby'] = Blockly.JavaScript['sophus_change'];

// -----------------------------------------------
// Menu Controles : boucle Pour
// ------------------------------------------------

Blockly.JavaScript['controls_for'] = function(block) {
  var up;
  var argument0, argument1, branch, code, increment, step, up, varName;
  //varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varName = block.getFieldValue('VARIABLE');
  var blocks = Blockly.getMainWorkspace().getAllVariables();
  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
  }
  argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  increment = Blockly.JavaScript.valueToCode(block, 'BY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
  branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  if (Blockly.isNumber(increment)) {
    up = parseFloat(increment) >= 0;
    code = 'for (' + varName + ' = ' + argument0 + '; ' + varName + (up ? ' <= ' : ' >= ') + argument1 + '; ' + varName;
    step = Math.abs(parseFloat(increment));
    if (step === 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    up = true;
    code = 'for (' + varName + ' = ' + argument0 + '; ' + varName + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0;
    code += (up ? ' += ' : ' -= ') + increment;
    code += ') {\n' + branch + '}\n';
  }
  return code;
};

// -----------------------------------------------
// Menu Entrées-Sorties
// ------------------------------------------------

Blockly.JavaScript['sofuspy_entree'] = function(block) {
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
         code=varName + '=' + code + ';\n';
  } else if (op=="float") {
	  code = varName + ' = ' + 'Number(window.prompt("' + code + '"));\n';
  } else if (op=="int") {
	  code = varName + ' = ' + 'Number(window.prompt("' + code + '"));\n';
  } else if (op=="str") {
	  code = varName + ' = ' + 'window.prompt("' + code + '");\n';
  }
  return code;
};

Blockly.JavaScript['sofuspy_sortie'] = function(block) {
  var code = this.getFieldValue("code"); 
  var op = block.getFieldValue('OP');
  if (code.indexOf("return")>=0) {
	  return code + "\n";
  }
  if ((op=="renvoyer") || (op=="return")) {
	  if (code.indexOf(",")>=0) {
		code = "[" + code + "]";
	  }
	  code = "return " + code + ";\n";
  } else {
	  code = "alerte(" + code + ");\n";
  }
  return code;
};

// -----------------------------------------------
// Tortues
// ------------------------------------------------

Blockly.JavaScript['avancer_reculer'] = function(block) {
  var code, value_name, op;
  value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  op = block.getFieldValue('OP');
  if (op=='forward') {
	  op = 'avance';
  } else {
	  op = 'recule';
  }
  code = op + "(" + value_name + ");\n";
  return code;
};

Blockly.JavaScript['var_gauche_droite'] = function(block) {
  var code, value_name, op;
  value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  op = block.getFieldValue('OP');
  if (op=='left') {
	  op = 'gauche';
  } else {
	  op = 'droite';
  }
  code = op + "(" + value_name + ");\n";
  return code;
};

Blockly.JavaScript['tortue_teleport'] = function(block) {
  var code, value_abs, value_ord;
  value_abs = Blockly.JavaScript.valueToCode(block, 'ABS', Blockly.JavaScript.ORDER_ATOMIC);
  value_ord = Blockly.JavaScript.valueToCode(block, 'ORD', Blockly.JavaScript.ORDER_ATOMIC);
  //code = 'tortue().teleport(' + value_abs + '+320' + ',240-(' + value_ord + '));\n';
  code = 'sautePos(' + value_abs + ',' + value_ord + ');\n';
  return code;
};

Blockly.JavaScript['tortue_viser'] = function(block) {
  var code, value_abs, value_ord;
  value_abs = Blockly.JavaScript.valueToCode(block, 'ABS', Blockly.JavaScript.ORDER_ATOMIC);
  value_ord = Blockly.JavaScript.valueToCode(block, 'ORD', Blockly.JavaScript.ORDER_ATOMIC);
  code = 'fixeCap(vers(' + value_abs + ',' + value_ord + '));\n';
  return code;
};

Blockly.JavaScript['tortue_pos'] = function(block) {
  var op = block.getFieldValue('OP');
  var code;
  code = op + "()";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

Blockly.JavaScript['couleur_remplissage'] = function(block) {
  var code, coul;
  coul = block.getInputTargetBlock('COLOR').getFieldValue('COLOUR');
  var r = hexToRgb(coul).r;
  var g = hexToRgb(coul).g;
  var b = hexToRgb(coul).b;
  code = "";
  code += "couleurRemplissage(" + r + "," +g + "," + b + ",0.2);\n";
  code += "couleurCrayon(" + r + "," +g + "," + b + ");\n";
  return code;
};

Blockly.JavaScript['baisser_lever_stylo'] = function(block) {
  var op;
  op = block.getFieldValue('OP');
  if (op=='pendown') {
	  op = 'baisseCrayon';
  } else {
	  op = 'leveCrayon';
  }
  return op + "();\n";
};

Blockly.JavaScript['debut_fin_remplissage'] = function(block) {
  var op;
  op = block.getFieldValue('OP');
  if (op=='debut') {
	  op = 'debutRemplir';
  } else {
	  op = 'finRemplir';
  }
  return op + "();\n";
};

Blockly.JavaScript['reset'] = function(block) {return;
  if (Blockly.config.nbInitialObjets < 0) Blockly.config.nbInitialObjets = ggbApplet.getObjectNumber();
  var nbObj = Blockly.config.nbInitialObjets;
  var code = "function tracerFigure() {" + "\n"
	+ "fixerNbInitialObjets(" + nbObj + ");" + "\n"
	+ "fixerValeursAsurveiller(['n']);" + "\n"
	+ "fixerPointsAsurveiller(['P','Q']);" + "\n"
	+ "initialiser();\n";
  return code;
};

// -----------------------------------------------
// Points
// ------------------------------------------------

Blockly.JavaScript['ggb_point'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_MEMBER) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_MEMBER) || '0';
  var nom = Blockly.JavaScript.valueToCode(block, 'NOM',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var code = "commandeG('@1=(@2,@3)'," + nom + ',' + x + ',' + y + "); \n";
  return code; 
};

Blockly.JavaScript['ggb_couleur_remplissage'] = function(block) {
  var code, coul;
  coul = block.getInputTargetBlock('COLOR').getFieldValue('COLOUR');
  var obj1 = Blockly.JavaScript.valueToCode(block, 'OBJ1',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var r = hexToRgb(coul).r;
  var g = hexToRgb(coul).g;
  var b = hexToRgb(coul).b;
  code = "colorier(" + obj1 + "," + r + "," +g + "," + b + ");\n";
  return code;
};

// commandeG('@1=Segment[@2,@3]', nom, nom1, nom2);
Blockly.JavaScript['ggb_commande_2pts'] = function(block) {
  var nom = Blockly.JavaScript.valueToCode(block, 'NOM',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj1 = Blockly.JavaScript.valueToCode(block, 'OBJ1',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj2 = Blockly.JavaScript.valueToCode(block, 'OBJ2',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP');
  var code = "commandeG('@1=" + op + "(@2,@3)'," + nom + ',' + obj1 + ',' + obj2 + "); \n";
  return code; 
};

function ggb_commande_2pts_fonct(op,obj1,obj2) {
  if (op == "Point") op = "";
  if (op == " Line") op = "Line";
  commandeG(op+"(@1,@2)", obj1, obj2);
  return ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 );
}

Blockly.JavaScript['ggb_commande_2pts_fonct'] = function(block) {
  var obj1 = Blockly.JavaScript.valueToCode(block, 'OBJ1',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj2 = Blockly.JavaScript.valueToCode(block, 'OBJ2',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP');
  var code = "ggb_commande_2pts_fonct('" + op + "'," + obj1 + "," + obj2 + ")";
  return [code, Blockly.JavaScript.ORDER_MEMBER]; 
};

Blockly.JavaScript['ggb_3_arg'] = function(block) {
  var nom = Blockly.JavaScript.valueToCode(block, 'NOM',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj1 = Blockly.JavaScript.valueToCode(block, 'OBJ1',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj2 = Blockly.JavaScript.valueToCode(block, 'OBJ2',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj3 = Blockly.JavaScript.valueToCode(block, 'OBJ3',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP');
  var code = "commandeG('@1=" + op + "(@2,@3,@4)'," + nom + ',' + obj1 + ',' + obj2 + ',' + obj3 + "); \n";
  if (op=="Rotate") {
      code = "commandeG('@1=" + op + "(@2,@3*3.1416/180,@4)'," + nom + ',' + obj1 + ',' + obj2 + ',' + obj3 + "); \n";
  }	  
  return code; 
};

Blockly.JavaScript['ggb_1_arg'] = function(block) {
  var nom = Blockly.JavaScript.valueToCode(block, 'NOM',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj1 = Blockly.JavaScript.valueToCode(block, 'OBJ1',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
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

Blockly.JavaScript['ggb_point_fonct'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_MEMBER) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_MEMBER) || '0';
  var nom = Blockly.JavaScript.valueToCode(block, 'NOM',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var code = "Point(" + nom + ", " + x + ", " + y + ")"; 
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['ggb_valeur_de'] = function(block) {
  var nom = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_MEMBER) || "";
  var blocks = Blockly.getMainWorkspace().getAllVariables();
  for (var i = 0; i < blocks.length; i++) {
	if (blocks[i].name === nom) {
		nom = "'" + nom + "'"; break;
	}
  }
  //nom = nom.split("'").join("");
  //var code = "valeur('" + nom + "')";
  var code = "valeur(" + nom + ")";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['ggb_coordX'] = function(block) {
  var nom = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_MEMBER) || "";
  nom = nom.split("'").join("");
  var code = "coordX('" + nom + "')";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['ggb_coordY'] = function(block) {
  var nom = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_MEMBER) || "";
  nom = nom.split("'").join("");
  var code = "coordY('" + nom + "')";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['ggb_1_arg_fonct'] = function(block) {
  var obj1 = Blockly.JavaScript.valueToCode(block, 'OBJ1',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP');
  var code;
  code = op + "(" + obj1 + ")";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['ggb_intersections'] = function(block) {
  var nom = Blockly.JavaScript.valueToCode(block, 'NOM',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj1 = Blockly.JavaScript.valueToCode(block, 'OBJ1',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var obj2 = Blockly.JavaScript.valueToCode(block, 'OBJ2',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var op = block.getFieldValue('OP');
  //var code = "commandeG('@1=Intersect(@2,@3)'," + nom + ',' + obj1 + ',' + obj2 + "); \n";
  var code = "commandeG('@1=Intersect(@2,@3";
  if (op=="Intersect1") code = code + ",1";
  if (op=="Intersect2") code = code + ",2";
  code = code  + ")'," + nom + ',' + obj1 + ',' + obj2 + "); \n";
  return code; 
};

Blockly.JavaScript['ggb_setCell'] = function(block) {
  var col = Blockly.JavaScript.valueToCode(block, 'col',
      Blockly.JavaScript.ORDER_MEMBER) || 'A';
  var lig = Blockly.JavaScript.valueToCode(block, 'lig',
      Blockly.JavaScript.ORDER_MEMBER) || '1';
  var valeur = Blockly.JavaScript.valueToCode(block, 'valeur',
      Blockly.JavaScript.ORDER_MEMBER) || "''";
  var nom = col;
  var blocks = Blockly.getMainWorkspace().getAllVariables();
  for (var i = 0; i < blocks.length; i++) {
	if (blocks[i].name === nom) {
		nom = "'" + nom + "'"; break;
	}
  }
  nom = nom + "+" + lig;
  var code = "commandeG('@1=@2'," + nom + ',' + valeur + "); \n";
  return code;
};

Blockly.JavaScript['ggb_getCell'] = function(block) {
  var col = Blockly.JavaScript.valueToCode(block, 'col',
      Blockly.JavaScript.ORDER_MEMBER) || 'A';
  var lig = Blockly.JavaScript.valueToCode(block, 'lig',
      Blockly.JavaScript.ORDER_MEMBER) || '1';
  var nom = col;
  var blocks = Blockly.getMainWorkspace().getAllVariables();
  for (var i = 0; i < blocks.length; i++) {
	if (blocks[i].name === nom) {
		nom = "'" + nom + "'"; break;
	}
  }
  nom = nom + "+" + lig;
  var code = "valeur(" + nom + ")";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};
