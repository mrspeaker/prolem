const lexer = (input) => {

  const isOperator = c => /[(),]/.test(c);
  const isDigit = c => /[0-9]/.test(c);
  const isWhiteSpace = c => /\s/.test(c);
  const isIdentifier = c => typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c);

  const tokens = [];
  var c;
  var i = 0;

  const advance = () => c = input[++i];
  const addToken = (type, value) => tokens.push({
    type: type,
    value: value
  });

  while (i < input.length) {
    c = input[i];
    if (isWhiteSpace(c)) {
      advance();
    }
    else if (isOperator(c)) {
      addToken(c);
      advance();
    }
    else if (isDigit(c)) {
      var num = c;
      while (isDigit(advance())) { num += c };
      if (c === ".") {
        do num += c;
        while (isDigit(advance()));
      }
      num = parseFloat(num);
      addToken("number", num);
    }
    else if (isIdentifier(c)) {
      var idn = c;
      while (isIdentifier(advance())) { idn += c };
      addToken("identifier", idn);
    }
    else throw "Unrecognized token.";
  }

  addToken("(end)");
  return tokens;
};

export default lexer;
