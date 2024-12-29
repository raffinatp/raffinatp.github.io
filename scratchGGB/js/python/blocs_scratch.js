/* ---------------------------------------
Traduction en Python des blocs Scratch
---------------------------------------- */

	Blockly.Python['math_number'] = function(block) {
	  var code = parseFloat(block.getFieldValue('NUM'));
	  return [code, Blockly.Python.ORDER_ATOMIC];
	};
	Blockly.Python['math_whole_number'] = function(block) {
	  var code = parseFloat(block.getFieldValue('NUM'));
	  return [code, Blockly.Python.ORDER_ATOMIC];
	};
	Blockly.Python['math_positive_number'] = function(block) {
	  var code = parseFloat(block.getFieldValue('NUM'));
	  return [code, Blockly.Python.ORDER_ATOMIC];
	};
	Blockly.Python['math_integer'] = function(block) {
	  var code = parseInt(block.getFieldValue('NUM'));
	  return [code, Blockly.Python.ORDER_ATOMIC];
	};
	Blockly.Python['text'] = function(block) {
	  var code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
	  var m = code;
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
	  if (m=="x") code = "x";
	  return [code, Blockly.Python.ORDER_ATOMIC];
	};
// looks
	Blockly.Python['looks_say'] = function(block) {
	  var msg = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC);
	  var code = 'print(' + msg + ')\n';
	  return code;
	}
	Blockly.Python['looks_sayforsecs'] = function(block) {
	  var msg = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC);
	  var code = 'print(' + msg + ')\n';
	  return code;
	}
// events
	Blockly.Python["event_whenflagclicked"] = function (block) {
		return "";
	}
// sensing	
	Blockly.Python["sensing_answer"] = function (block) {
	  var code = "reponse";
	  return [code, Blockly.Python.ORDER_ATOMIC];
	}
	Blockly.Python['sensing_askandwait'] = function(block) {
	  var msg = Blockly.Python.valueToCode(block, 'QUESTION', Blockly.Python.ORDER_ATOMIC);
	  var code = 'reponse = float(input(' + msg + '))\n';
	  return code;
	}
// control
	Blockly.Python['control_repeat'] = function(block) {
	  // Repeat n times.
	  if (block.getField('TIMES')) {
		// Internal number.
		var repeats = String(Number(block.getFieldValue('TIMES')));
	  } else {
		// External number.
		var repeats = Blockly.Python.valueToCode(block, 'TIMES', Blockly.Python.ORDER_ASSIGNMENT) || '0';
	  }  
	  if (Blockly.isNumber(repeats)) {
		repeats = parseInt(repeats, 10);
	  } else {
		repeats = 'int(' + repeats + ')';
	  }
	  var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
	  branch = Blockly.Python.addLoopTrap(branch, block.id) ||
		  Blockly.Python.PASS;
	  var loopVar = Blockly.Python.variableDB_.getDistinctName(
		  'count', Blockly.Variables.NAME_TYPE);
	  var code = 'for ' + loopVar + ' in range(' + repeats + '):\n' + branch;
	  return code;
	};
	Blockly.Python['control_wait'] = function(block) {
	  return "";;
	};	
	Blockly.Python['control_if_else'] = function(block) {
	  var code = '', branchCode, conditionCode;
      conditionCode = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'False';
      branchCode = Blockly.Python.statementToCode(block, 'SUBSTACK') || Blockly.Python.PASS;
      code += 'if (' + conditionCode + ') :\n' + branchCode;
	  if (block.getInput('SUBSTACK2')) {
		branchCode = Blockly.Python.statementToCode(block, 'SUBSTACK2') || Blockly.Python.PASS;
		code += 'else :\n' + branchCode;
	  }
	  return code + '\n';
	};
	Blockly.Python['control_if']=Blockly.Python['control_if_else'];
	Blockly.Python['control_repeat_until'] = function(block) {
	  var code = '', branchCode, conditionCode;
      conditionCode = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'True';
      branchCode = Blockly.Python.statementToCode(block, 'SUBSTACK') || Blockly.Python.PASS;
      code += 'while (not ' + conditionCode + ') :\n' + branchCode;
	  return code + '\n';
	};
// operator
	Blockly.Python['operator_add'] = function(block) {
	  var operator = "+";
	  var order = Blockly.Python.ORDER_ADDITIVE;
	  var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  return [code, Blockly.Python.ORDER_ADDITIVE];
	};
	Blockly.Python['operator_subtract'] = function(block) {
	  var operator = "-";
	  var order = Blockly.Python.ORDER_ADDITIVE;
	  var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  return [code, Blockly.Python.ORDER_ADDITIVE];
	};
	Blockly.Python['operator_multiply'] = function(block) {
	  var operator = "*";
	  var order = Blockly.Python.ORDER_MULTIPLICATIVE;
	  var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
	};
	Blockly.Python['operator_divide'] = function(block) {
	  var operator = "/";
	  var order = Blockly.Python.ORDER_MULTIPLICATIVE;
	  var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
	};
	Blockly.Python['operator_mod'] = function(block) {
	  var operator = "%";
	  var order = Blockly.Python.ORDER_DIVISION;
	  var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
	  var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
	  var code;
	  code = argument0 + operator + argument1;
	  //code = "operation_jvs(" + argument0 + ",'" + operator + "'," + argument1 + ")";
	  return [code, Blockly.Python.ORDER_MODULUS];
	};
	Blockly.Python['operator_equals'] = function(block) {
	  var operator = "==";
	  var order = Blockly.Python.ORDER_RELATIONAL;
	  var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || 'False';
	  var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || 'False';
	  var code = argument0 + ' ' + operator + ' ' + argument1;
	  return [code, order];
	};
	Blockly.Python['operator_lt'] = function(block) {
	  var operator = "<";
	  var order = Blockly.Python.ORDER_RELATIONAL;
	  var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || 'False';
	  var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || 'False';
	  var code = argument0 + ' ' + operator + ' ' + argument1;
	  return [code, order];
	};
	Blockly.Python['operator_gt'] = function(block) {
	  var operator = ">";
	  var order = Blockly.Python.ORDER_RELATIONAL;
	  var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || 'False';
	  var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || 'False';
	  var code = argument0 + ' ' + operator + ' ' + argument1;
	  return [code, order];
	};
	Blockly.Python['operator_and'] = function(block) {
	  var operator = "and";
	  var order = Blockly.Python.ORDER_RELATIONAL;
	  var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || 'False';
	  var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || 'False';
	  var code = '(' + argument0 + ' ' + operator + ' ' + argument1 + ')';
	  return [code, order];
	};
	Blockly.Python['operator_or'] = function(block) {
	  var operator = "or";
	  var order = Blockly.Python.ORDER_RELATIONAL;
	  var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || 'False';
	  var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || 'False';
	  var code = '(' + argument0 + ' ' + operator + ' ' + argument1 + ')';
	  return [code, order];
	};
	Blockly.Python['operator_join'] = function(block) {
	  var operator = ">";
	  var order = Blockly.Python.ORDER_FUNCTION_CALL;
	  var argument0 = Blockly.Python.valueToCode(block, 'STRING1', order) || "''";
	  var argument1 = Blockly.Python.valueToCode(block, 'STRING2', order) || "''";
	  var code = 'str(' + argument0 + ') + str(' + argument1 + ')';
	  return [code, order];
	};
	Blockly.Python['operator_not'] = function(block) {
	  var order = Blockly.Python.ORDER_RELATIONAL;
	  var argument0 = Blockly.Python.valueToCode(block, 'OPERAND', order) || 'False';
	  var code = "(not " + argument0 + ')';
	  return [code, order];
	};
	Blockly.Python['operator_random'] = function(block) {
	  // Random integer between [X] and [Y].
	  Blockly.Python.definitions_['import_random'] = 'import random';
	  var argument0 = Blockly.Python.valueToCode(block, 'FROM',
		  Blockly.Python.ORDER_NONE) || '0';
	  var argument1 = Blockly.Python.valueToCode(block, 'TO',
		  Blockly.Python.ORDER_NONE) || '0';
	  var code = 'random.randint(' + argument0 + ', ' + argument1 + ')';
	  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
	};
	Blockly.Python['math_random_float'] = function(block) {
	  // Random fraction between 0 and 1.
	  Blockly.Python.definitions_['import_random'] = 'import random';
	  return ['random.random()', Blockly.Python.ORDER_FUNCTION_CALL];
	};
	Blockly.Python['operator_letter_of'] = function(block) {
	  var mot = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_ATOMIC) || "''";
	  var index = Blockly.Python.valueToCode(block, 'LETTER', Blockly.Python.ORDER_COMMA) || '1'; 
	  index = index + "-1";
	  var code = mot + "[" + index + "]";
	  return [code, Blockly.Python.ORDER_ATOMIC];
	};
	Blockly.Python['operator_length'] = function(block) {
	  var mot = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_ATOMIC) || "''";
	  var code = "len(" + mot + ")";
	  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
	};
	Blockly.Python['operator_round'] = function(block) {
	  var order = Blockly.Python.ORDER_COMMA;
	  var arg = Blockly.Python.valueToCode(block, 'NUM', order) || '0';
	  var code = 'round(' + arg + ')';
	  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
	}
	Blockly.Python['operator_mathop'] = function(block) {
	  Blockly.Python.definitions_['import_math'] = 'import math';
	  var operator = block.getFieldValue('OPERATOR');
	  var order = Blockly.Python.ORDER_COMMA;
	  var arg = Blockly.Python.valueToCode(block, 'NUM', order) || '0';
	  var code;
	  switch (operator) {
		  case 'abs' : 
			code = 'math.abs(' + arg + ')'; break;
		  case 'floor' : 
			code = 'math.floor(' + arg + ')'; break;
		  case 'ceil' :  
			code = 'math.ceil(' + arg + ')'; break;
		  case 'sqrt' :  
			code = 'math.sqrt(' + arg + ')'; break;
		  case 'cos' :  
			code = 'math.cos(' + arg + ')'; break;
		  case 'sin' :  
			code = 'math.sin(' + arg + ')'; break;
		  case 'tan' :  
			code = 'math.tan(' + arg + ')'; break;
		  case 'asin' :  
			code = 'math.asin(' + arg + ')'; break;
		  case 'acos' :  
			code = 'math.acos(' + arg + ')'; break;
		  case 'atan' : 
			code = 'math.atan(' + arg + ')'; break;
		  case 'ln' :  
			code = 'math.log(' + arg + ')'; break;
		  case 'log' : 
			code = 'math.log(' + arg + ') / math.log(10)'; break;
		  case 'e ^' : 
			code = 'math.exp(' + arg + ')'; break;
		  case '10 ^' : 
			code = 'math.pow(10,' + arg + ')'; break;
	  };
	  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
	};
	// data
	Blockly.Python['data_variable'] = function(block) {
	  var varName = block.getFieldValue('VARIABLE');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  return [varName, Blockly.Python.ORDER_ATOMIC];
	};
	Blockly.Python['data_setvariableto'] = function(block) {
	  var varName = block.getFieldValue('VARIABLE');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',Blockly.Python.ORDER_ASSIGNMENT) || '0';
	  return varName + ' = ' + argument0 + '\n';
	};
	Blockly.Python['data_listcontents'] = function(block) {
	  var varName = block.getFieldValue('LIST');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  return [varName, Blockly.Python.ORDER_ATOMIC];
	};
	Blockly.Python['data_itemoflist'] = function(block) {
	  var varName = block.getFieldValue('LIST');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  var index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_COMMA); // || '1';
	  index = index + "-1";
	  var code = varName + "[" + index + "]";
	  return [code, Blockly.Python.ORDER_ATOMIC];
	};
	Blockly.Python['data_addtolist'] = function(block) {
	  var varName = block.getFieldValue('LIST');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  var index = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_COMMA) || "''"; 
	  var code = varName + ".append(" + index + ")\n";
	  return code;
	};
	Blockly.Python['data_lengthoflist'] = function(block) {
	  var varName = block.getFieldValue('LIST');
      var blocks = Blockly.getMainWorkspace().getAllVariables();
	  for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].id_ === varName) {
              varName = blocks[i].name;
            }
	  }
	  var code = "len(" + varName + ")";
	  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
	};
	
	// procedures
	Blockly.Python['procedures_prototype'] = function(block) {
		var proc = block.getProcCode().split(" ")[0];
		var args = block.displayNames_.join(",");
		var code = "def " + proc + "(" + args + ") :\n";
		return code;
	}
	Blockly.Python['procedures_definition'] = function(block) {
      var code = Blockly.Python.statementToCode(block, 'custom_block');
	  return code;
	}
	Blockly.Python['procedures_call'] = function(block) {
		var proc = block.getProcCode().split(" ")[0];
		var args = [];
		var blocks = Blockly.getMainWorkspace().getAllBlocks();
		for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].type != "procedures_prototype") continue;
				if (blocks[i].getProcCode() == block.getProcCode()) {
					for (var j = 0; j < blocks[i].inputList.length; j++) {
						var val = Blockly.Python.valueToCode(block, blocks[i].inputList[j].name, Blockly.Python.ORDER_COMMA) || '$$$$';
						if (val=="$$$$") continue;
						args[args.length] = val;
					}
				}
		}
		var code = proc + "(" + args.join(",")  + ")";
		return code + "\n";
	}
	Blockly.Python['procedures_call_return'] = function(block) {
		var proc = block.getProcCode().split(" ")[0];
		var args = [];
		var blocks = Blockly.getMainWorkspace().getAllBlocks();
		for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].type != "procedures_prototype") continue;
				if (blocks[i].getProcCode() == block.getProcCode()) {
					for (var j = 0; j < blocks[i].inputList.length; j++) {
						var val = Blockly.Python.valueToCode(block, blocks[i].inputList[j].name, Blockly.Python.ORDER_COMMA) || '$$$$';
						if (val=="$$$$") continue;
						args[args.length] = val;
					}
				}
		}
		var code = proc + "(" + args.join(",")  + ")";
		return [code,Blockly.Python.ORDER_FUNCTION_CALL];
	}
	Blockly.Python['argument_reporter_string_number'] = function(block) {
		var code = block.getFieldValue('VALUE');
		return [code, Blockly.Python.ORDER_ATOMIC];
	}
	//Blockly.Python.init (Blockly.getMainWorkspace());
