var CalcApp = {availOps : ['+', '-', '/', '*']};
var $screen = $('#screen');
var $cureentInput = $('#cureentInput');

function updateCurrentIp(e) {
  var currentValue = $(e.currentTarget).html();
  var screenValue = $cureentInput.html();
  if (CalcApp.prevResult) {
    CalcApp.prevResult = 0;
    $screen.html("0");
  }
  if (currentValue === '.') {
    if (/^\d+(\.){1}$/.test(screenValue+currentValue)) {
      $cureentInput.append(currentValue);
    }
  } else if(screenValue === '0' || CalcApp.prevOp === '=' || CalcApp.availOps.indexOf(CalcApp.prevOp) > -1) {
    $cureentInput.html(currentValue);
    CalcApp.prevResult = 0;
  } else {
    $cureentInput.append(currentValue);
  }
  CalcApp.prevOp = currentValue;
}

$('.num').click(updateCurrentIp);

$('.ops').click(function(e){
  var op = $(e.currentTarget).html();
  var screenValue = $screen.html();
  switch (op) {
    case '+':
    case '-':
    case '*':
    case '/':
      if (screenValue.slice(-1) === '0' && /^\d+(\.\d+){0,1}$/.test($cureentInput.html())) {
        $screen.html("");
      }
      if (CalcApp.availOps.indexOf(CalcApp.prevOp) === -1 && /^\d+(\.\d+){0,1}$/.test($cureentInput.html())) {
        if (CalcApp.prevResult) {
          $screen.html(CalcApp.prevResult + op);
          CalcApp.prevResult = 0;
        } else {
          $screen.append($cureentInput.html()+op);
          var result = eval($screen.html().slice(0, -1));
          $cureentInput.html(result);
          // CalcApp.prevResult = result;
        }
        CalcApp.prevOp = op;
      }
      break;
    case '=':
      if (CalcApp.availOps.indexOf(screenValue.slice(-1)) > -1 && /^\d+(\.\d+){0,1}$/.test($cureentInput.html())) {
        var result = eval($screen.html() + $cureentInput.html());
        $cureentInput.html(result);
        $screen.html("0");
        CalcApp.prevOp = op;
        CalcApp.prevResult = result;
      }
      break;
    case 'AC':
      $screen.html(0);
      $cureentInput.html(0);
      break;
    case 'CE':
      $cureentInput.html(0);
  }
});