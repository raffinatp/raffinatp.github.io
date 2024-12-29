/* ---------------------------------------
Traduction en Javascript des blocs Scratch
---------------------------------------- */
// calcul formel avec GeoGebra
	function formel_jvs(argument0) {
		return ggbApplet.evalCommandCAS("simplify(" + argument0 + ")");
	}
	function operation_jvs(argument0,operator,argument1) {
		var code = ggbApplet.evalCommandCAS("simplify((" + argument0 + ")" + operator + "(" + argument1 + "))");
		return code;
	}
	function comparaison_jvs(argument0,operator,argument1) {
		var code = false;
		if (operator == "==") {
				if (argument0 == argument1) return true;
				code = ggbApplet.evalCommandCAS("simplify((" + argument0 + ")" + "-" + "(" + argument1 + "))");
				if (code == '0') return true;
				//code = (eval(argument0) == eval(argument1));
		}
		code = operation_jvs(argument0,operator,argument1);
		code = (code == '1');
		return code;
	}
	function math_jvs(operator,argument0) {	
		var code = ggbApplet.evalCommandCAS("simplify(" + operator + "(" + argument0 + "))");
		return code;
	}
// base
	Blockly.JavaScript['math_number'] = function(block) {
	  var code = parseFloat(block.getFieldValue('NUM'));
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};
	Blockly.JavaScript['math_whole_number'] = function(block) {
	  var code = parseFloat(block.getFieldValue('NUM'));
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};
	Blockly.JavaScript['math_positive_number'] = function(block) {
	  var code = parseFloat(block.getFieldValue('NUM'));
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};
	Blockly.JavaScript['math_integer'] = function(block) {
	  var code = parseInt(block.getFieldValue('NUM'));
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};
	Blockly.JavaScript['text'] = function(block) {
	  var code = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
	  var m= code.split(",").join(".");
	  if (m[0] === "'" && m[m.length - 1] === "'") m = m.substring(1, m.length - 1)
	  // nombre entier ?
	  var numberReSnippet = "(?:NaN|-?(?:(?:\\d+|\\d*\\.\\d+)(?:[E|e][+|-]?\\d+)?|Infinity))";
	  var re = new RegExp("^("+ numberReSnippet + ")$");
	  if (re.test(m)) {
		  code=m;
	  }
	  // variable ?
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].name === m) {
              code=m; break;
            }
	  }
	  // valeurs speciales
	  if (m=="reponse") code = "reponse";
	  //if (m=="x") code = "x";
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};
// looks
	Blockly.JavaScript['looks_say'] = function(block) {
	  var msg = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
	  var code = 'window.alert(' + msg + ');\n';
	  return code;
	}
	Blockly.JavaScript['looks_sayforsecs'] = function(block) {
	  var msg = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
	  var code = 'window.alert(' + msg + ');\n';
	  return code;
	}
// events
	Blockly.JavaScript["event_whenflagclicked"] = function (block) {
	  try {
		if (Blockly.config.nbInitialObjets < 0) Blockly.config.nbInitialObjets = ggbApplet.getObjectNumber();
	  } catch (ex) {
	  }
	  var nbObj = Blockly.config.nbInitialObjets;
	  var code = "function tracerFigure() {" + "\n"
		+ "fixerNbInitialObjets(" + nbObj + ");" + "\n"
		+ "fixerValeursAsurveiller(['n']);" + "\n"
		+ "fixerPointsAsurveiller(['P','Q']);" + "\n"
		+ "initialiser();\n";
	  return code;
	}
//sensing
	Blockly.JavaScript["sensing_answer"] = function (block) {
	  var code = "reponse";
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
	}
	Blockly.JavaScript['sensing_askandwait'] = function(block) {
	  var msg = Blockly.JavaScript.valueToCode(block, 'QUESTION', Blockly.JavaScript.ORDER_ATOMIC);
	  var code = 'reponse = window.prompt(' + msg + '); reponse = isNaN(reponse) ? reponse : Number(reponse);\n';
	  return code;
	}
// control
	Blockly.JavaScript['control_repeat'] = function(block) {
	  // Repeat n times.
	  if (block.getField('TIMES')) {
		// Internal number.
		var repeats = String(Number(block.getFieldValue('TIMES')));
	  } else {
		// External number.
		var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	  }
	  var branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
	  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
	  var code = '';
	  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
		  'count', Blockly.Variables.NAME_TYPE);
	  var endVar = repeats;
	  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
		var endVar = Blockly.JavaScript.variableDB_.getDistinctName('repeat_end', Blockly.Variables.NAME_TYPE);
		code += 'var ' + endVar + ' = ' + repeats + ';\n';
	  }
	  code += 'for (var ' + loopVar + ' = 0; ' +
		  loopVar + ' < ' + endVar + '; ' +
		  loopVar + '++) {\n' +
		  branch + '}\n';
	  return code;
	};
	Blockly.JavaScript['control_wait'] = function(block) {
	  if (block.getField('DURATION')) {
		// Internal number.
		var duree = Number(block.getFieldValue('DURATION'));
	  } else {
		// External number.
		var duree = Number(Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0');
	  }
	  var code = 'waitForSeconds(' + duree + ');\n';
	  return code;
	};
	Blockly.JavaScript['control_if_else'] = function(block) {
	  var code = '', branchCode, conditionCode;
      conditionCode = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
      branchCode = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
      code += 'if (' + conditionCode + ') {\n' + branchCode + '}';
	  if (block.getInput('SUBSTACK2')) {
		branchCode = Blockly.JavaScript.statementToCode(block, 'SUBSTACK2');
		code += ' else {\n' + branchCode + '}';
	  }
	  return code + '\n';
	};
	Blockly.JavaScript['control_if'] = Blockly.JavaScript['control_if_else'];
	Blockly.JavaScript['control_repeat_until'] = function(block) {
	  var code = '', branchCode, conditionCode;
      conditionCode = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'true';
      branchCode = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
      code += 'while (! ' + conditionCode + ') {\n' + branchCode + '}';
	  return code + '\n';
	};
// operator
	Blockly.JavaScript['operator_add'] = function(block) {
	  var operator = "+";
	  var order = Blockly.JavaScript.ORDER_ADDITION;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  if (Blockly.config.formel) code = "operation_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, Blockly.JavaScript.ORDER_ADDITION];
	};
	Blockly.JavaScript['operator_subtract'] = function(block) {
	  var operator = "-";
	  var order = Blockly.JavaScript.ORDER_SUBTRACTION;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  if (Blockly.config.formel) code = "operation_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, Blockly.JavaScript.ORDER_SUBTRACTION];
	};
	Blockly.JavaScript['operator_multiply'] = function(block) {
	  var operator = "*";
	  var order = Blockly.JavaScript.ORDER_MULTIPLICATION;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  if (Blockly.config.formel) code = "operation_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, Blockly.JavaScript.ORDER_MULTIPLICATION];
	};
	Blockly.JavaScript['operator_divide'] = function(block) {
	  var operator = "/";
	  var order = Blockly.JavaScript.ORDER_DIVISION;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  if (Blockly.config.formel) code = "operation_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, Blockly.JavaScript.ORDER_DIVISION];
	};
	Blockly.JavaScript['operator_mod'] = function(block) {
	  var operator = "%";
	  var order = Blockly.JavaScript.ORDER_DIVISION;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  //code = "operation_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, Blockly.JavaScript.ORDER_MODULUS];
	};
	Blockly.JavaScript['operator_equals'] = function(block) {
	  var operator = "==";
	  var order = Blockly.JavaScript.ORDER_RELATIONAL;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order) || 'false';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order) || 'false';
	  var code = argument0 + ' ' + operator + ' ' + argument1;
	  //code = "comparaison_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, order];
	};
	Blockly.JavaScript['operator_lt'] = function(block) {
	  var operator = "<";
	  var order = Blockly.JavaScript.ORDER_RELATIONAL;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order) || 'false';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order) || 'false';
	  var code = argument0 + ' ' + operator + ' ' + argument1;
	  //code = "comparaison_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, order];
	};
	Blockly.JavaScript['operator_gt'] = function(block) {
	  var operator = ">";
	  var order = Blockly.JavaScript.ORDER_RELATIONAL;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order) || 'false';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order) || 'false';
	  var code = argument0 + ' ' + operator + ' ' + argument1;
	  //code = "comparaison_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, order];
	};
	Blockly.JavaScript['operator_and'] = function(block) {
	  var operator = "&&";
	  var order = Blockly.JavaScript.ORDER_RELATIONAL;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order) || 'false';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order) || 'false';
	  var code = '(' + argument0 + ' ' + operator + ' ' + argument1 + ')';
	  //code = "comparaison_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, order];
	};
	Blockly.JavaScript['operator_or'] = function(block) {
	  var operator = "||";
	  var order = Blockly.JavaScript.ORDER_RELATIONAL;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', order) || 'false';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', order) || 'false';
	  var code = '(' + argument0 + ' ' + operator + ' ' + argument1 + ')';
	  //code = "comparaison_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, order];
	};
	Blockly.JavaScript['operator_not'] = function(block) {
	  var order = Blockly.JavaScript.ORDER_RELATIONAL;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'OPERAND', order) || 'false';
	  var code = "(!" + argument0  + ")";
	  return [code, order];
	};
	Blockly.JavaScript['operator_join'] = function(block) {
	  var operator = ">";
	  var order = Blockly.JavaScript.ORDER_ADDITION;
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'STRING1', order) || "''";
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'STRING2', order) || "''";
	  var code = '(' + argument0 + ') + (' + argument1 + ")";
	  return [code, order];
	};
	Blockly.JavaScript['operator_random'] = function(block) {
	  // Random integer between [X] and [Y].
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
		  Blockly.JavaScript.ORDER_COMMA) || '0';
	  var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
		  Blockly.JavaScript.ORDER_COMMA) || '0';
	  var functionName = Blockly.JavaScript.provideFunction_(
		  'mathRandomInt',
		  ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
			  '(a, b) {',
		   '  return Math.floor(Math.random() * (b - a + 1) + a);',
		   '}']);
	  var code = functionName + '(' + argument0 + ', ' + argument1 + ')';
	  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
	};
	Blockly.JavaScript['math_random_float'] = function(block) {
	  // Random fraction between 0 and 1.
	  return ['Math.random()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
	};
	Blockly.JavaScript['operator_round'] = function(block) {
	  var order = Blockly.JavaScript.ORDER_COMMA;
	  var arg = Blockly.JavaScript.valueToCode(block, 'NUM', order) || '0';
	  var code = 'Math.round(' + arg + ')';
	  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
	}
	Blockly.JavaScript['operator_mathop'] = function(block) {
	  var operator = block.getFieldValue('OPERATOR');
	  var order = Blockly.JavaScript.ORDER_COMMA;
	  var arg = Blockly.JavaScript.valueToCode(block, 'NUM', order) || '0';
	  var code;
	  switch (operator) {
		  case 'abs' : 
			code = 'Math.abs(' + arg + ')'; break;
		  case 'floor' : 
			code = 'Math.floor(' + arg + ')'; break;
		  case 'ceil' :  
			code = 'Math.ceil(' + arg + ')'; break;
		  case 'sqrt' :  
			code = 'Math.sqrt(' + arg + ')'; break;
		  case 'cos' :  
			code = 'Math.cos(' + arg + ')'; break;
		  case 'sin' :  
			code = 'Math.sin(' + arg + ')'; break;
		  case 'tan' :  
			code = 'Math.tan(' + arg + ')'; break;
		  case 'asin' :  
			code = 'Math.asin(' + arg + ')'; break;
		  case 'acos' :  
			code = 'Math.acos(' + arg + ')'; break;
		  case 'atan' : 
			code = 'Math.atan(' + arg + ')'; break;
		  case 'ln' :  
			code = 'Math.ln(' + arg + ')'; break;
		  case 'log' : 
			code = 'Math.log(' + arg + ') / Math.log(10)'; break;
		  case 'e ^' : 
			code = 'Math.exp(' + arg + ')'; break;
		  case '10 ^' : 
			code = 'Math.pow(10,' + arg + ')'; break;
	  };
	  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
	};
	// data
	Blockly.JavaScript['data_variable'] = function(block) {
	  var varName = block.getFieldValue('VARIABLE');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  return [varName, Blockly.JavaScript.ORDER_ATOMIC];
	};
	Blockly.JavaScript['data_setvariableto'] = function(block) {
	  var varName = block.getFieldValue('VARIABLE');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	  if ( (argument0.startsWith("'")) && (argument0.startsWith("'")) ) {
		  var evaluer=false;
		  if (argument0=="'x'") {Blockly.config.formel = true;}
		  if (argument0.indexOf("/")>0) {Blockly.config.formel = true;evaluer=true;}
		  if (argument0.indexOf("+")>0) {Blockly.config.formel = true;evaluer=true;}
		  if (argument0.indexOf("-")>0) {Blockly.config.formel = true;evaluer=true;}
		  if (argument0.indexOf("*")>0) {Blockly.config.formel = true;evaluer=true;}
		  if (evaluer) {
				return varName + ' = formel_jvs(' + argument0 + ');\n';
		  }
	  }
	  return varName + ' = ' + argument0 + ';\n';
	};
	Blockly.JavaScript['data_listcontents'] = function(block) {
	  var varName = block.getFieldValue('LIST');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  return [varName, Blockly.JavaScript.ORDER_ATOMIC];
	};
	Blockly.JavaScript['data_itemoflist'] = function(block) {
	  var varName = block.getFieldValue('LIST');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_COMMA) || '1'; 
	  index = index + "-1";
	  var code = varName + "[" + index + "]";
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};
	Blockly.JavaScript['data_addtolist'] = function(block) {
	  var varName = block.getFieldValue('LIST');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  var index = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_COMMA) || "''"; 
	  var code = varName + ".push(" + index + ");\n";
	  return code;
	};
	Blockly.JavaScript['data_lengthoflist'] = function(block) {
	  var varName = block.getFieldValue('LIST');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  var code = varName + ".length";
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};
	// procedures
	Blockly.JavaScript['procedures_prototype'] = function(block) {
		var proc = block.getProcCode().split(" ")[0];
		var args = block.displayNames_.join(",");
		var code = "function " + proc + "(" + args + ") {\n";
		return code;
	}
	Blockly.JavaScript['procedures_definition'] = function(block) {
      var code = Blockly.JavaScript.statementToCode(block, 'custom_block');
	  return code;
	}
	Blockly.JavaScript['procedures_call'] = function(block) {
		var proc = block.getProcCode().split(" ")[0];
		var args = [];
		var blocks = Blockly.getMainWorkspace().getAllBlocks();
		for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].type != "procedures_prototype") continue;
				if (blocks[i].getProcCode() == block.getProcCode()) {
					for (var j = 0; j < blocks[i].inputList.length; j++) {
						var val = Blockly.JavaScript.valueToCode(block, blocks[i].inputList[j].name, Blockly.JavaScript.ORDER_COMMA) || '$$$$';
						if (val=="$$$$") continue;
						args[args.length] = val;
					}
				}
		}
		var code = proc + "(" + args.join(",")  + ")";
		return code + ";\n";
	}
	Blockly.JavaScript['procedures_call_return'] = function(block) {
		var proc = block.getProcCode().split(" ")[0];
		var args = [];
		var blocks = Blockly.getMainWorkspace().getAllBlocks();
		for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].type != "procedures_prototype") continue;
				if (blocks[i].getProcCode() == block.getProcCode()) {
					for (var j = 0; j < blocks[i].inputList.length; j++) {
						var val = Blockly.JavaScript.valueToCode(block, blocks[i].inputList[j].name, Blockly.JavaScript.ORDER_COMMA) || '$$$$';
						if (val=="$$$$") continue;
						args[args.length] = val;
					}
				}
		}
		var code = proc + "(" + args.join(",")  + ")";
		return [code,Blockly.JavaScript.ORDER_FUNCTION_CALL];
	}
	Blockly.JavaScript['argument_reporter_string_number'] = function(block) {
		var code = block.getFieldValue('VALUE');
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	}


/* ---------------------------------------
Divers : à placer ailleurs ? 
---------------------------------------- */


function effacerOutput() {
    var mypre = document.getElementById("output")
    mypre.innerHTML="";
}
function println (texte) {
    var txt = (typeof texte !== 'undefined') ? texte : ''; //logger(txt);
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + txt + "\n";
}
  
function xml2string(node) {
   if (typeof(XMLSerializer) !== 'undefined') {
      var serializer = new XMLSerializer();
      return serializer.serializeToString(node);
   } else if (node.xml) {
      return node.xml;
   }
}

function getCodeJS () {
    var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    try {
      code = code.replace(/window\.alert\(/g, 'println(')
      return code;
    } catch (e) {
      console.error(e)
      return e;
    }
}