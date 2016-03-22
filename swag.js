var PAYMENT_OUT_AMOUNT = 1;
var TX_FEE = 8788; // current net fee at 22 Mar 2016
var OP_RETURN_ATTACHED_DATA = '';

var priv = '';
var pub = '';
var inputTx = '';

var balanceInBits;

function calcBal(bitcoins) {
	balanceInBits = bitcoins / 0.00000001;
}





var bitcoin = require('bitcoinjs-lib');
var tx = new bitcoin.TransactionBuilder();

var data = new Buffer(opret);
var dataScript = bitcoin.script.nullDataOutput(data);

tx.addInput(inputTx, 1);
tx.addOutput(dataScript, PAYMENT_OUT_AMOUNT);
var changeAmount = balanceInBits - PAYMENT_OUT_AMOUNT - TX_FEE;
tx.addOutput(pub, changeAmount);

var keyPair = bitcoin.ECPair.fromWIF(priv)
tx.sign(0, keyPair);


console.log(tx.build().toHex());
