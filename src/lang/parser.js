const parser = (tokens) => {
  const symbols = {};
  const symbol = (id, nud, lbp, led) => {
    const sym = symbols[id] || {};
    symbols[id] = {
      lbp: sym.lbp || lbp,
      nud: sym.nud || nud,
      led: sym.led || led
    };
  };

  const interpretToken = token => {
    var sym = Object.create(symbols[token.type]);
    sym.type = token.type;
    sym.value = token.value;
    return sym;
  };

  var i = 0;
  const token = () => interpretToken(tokens[i]);
  const advance = () => { i++; return token(); };

  const expression = function (rbp) {
    var left;
    var t = token();
    advance();
    if (!t.nud) throw "Unexpected token: " + t.type;
    left = t.nud(t);
    while (rbp < token().lbp) {
      t = token();
      advance();
      if (!t.led) throw "Unexpected token: " + t.type;
      left = t.led(left);
    }
    return left;
  };

  const infix = (id, lbp, rbp, led) => {
    rbp = rbp || lbp;
    symbol(id, null, lbp, led || (left => ({
      type: id,
      left: left,
      right: expression(rbp)
    })));
  };

  const prefix = (id, rbp) => {
    symbol(id, () => ({
      type: id,
      right: expression(rbp)
    }));
  };

  //prefix("-", 7);
  //infix("^", 6, 5);
  //infix("*", 4);
  //infix("/", 4);
  //infix("%", 4);
  //infix("+", 3);
  //infix("-", 3);

  symbol(",");
  symbol(")");
  symbol("(end)");

  symbol("(", () => {
    var value = expression(2);
    if (token().type !== ")") throw "Expected closing parenthesis ')'";
    advance();
    return value;
  });

  symbol("number", number => number);

  symbol("identifier", name => {
    if (token().type === "(") {
      var args = [];
      if (tokens[i + 1].type === ")") {
        advance();
      } else {
        do {
          advance();
          args.push(expression(2));
        } while (token().type === ",");
        if (token().type !== ")") throw "Expected closing parenthesis ')'";
      }
      advance();
      return {
        type: "call",
        args: args,
        name: name.value
      };
    }
    return name;
  });

  infix("=", 1, 2, left => {
    if (left.type === "call") {
      for (var i = 0; i < left.args.length; i++) {
        if (left.args[i].type !== "identifier") throw "Invalid argument name";
      }
      return {
        type: "function",
        name: left.name,
        args: left.args,
        value: expression(2)
      };
    } else if (left.type === "identifier") {
      return {
        type: "assign",
        name: left.value,
        value: expression(2)
      };
    }
    else throw "Invalid lvalue";
  });

  // Parse
  var parseTree = [];
  while (token().type !== "(end)") {
    parseTree.push(expression(0));
  }
  return parseTree;
};

export default parser;
