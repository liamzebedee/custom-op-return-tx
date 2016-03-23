var request = require('request');
var Q = require('q');
var bitcoin = require('bitcoinjs-lib');


var PAYMENT_OUT_AMOUNT = 1;
var TX_FEE = 9000;

var priv = '';
var pub = '1DK9de3h3NVzWuLoHwiNeu2Ni9GyhWcPwD';
var OP_RETURN_ATTACHED_DATA = 'jnk';


var balanceInBits = 0;
var inputTx = '';

function bitcoinsToSatoshis(bitcoins) {
	return bitcoins / 0.00000001;
}

function getBalanceAndTxsForAddress() {
	var dfd = new Q.defer();

	var options = {
		url: "http://btc.blockr.io/api/v1/address/txs/" + pub
	}
	request(options, function(error, response, body) {
		var data = JSON.parse(body);
		dfd.resolve(data);
	});

	return dfd.promise;
}


getBalanceAndTxsForAddress()
.then(function(balanceAndTxs) {
	var txs = balanceAndTxs.data.txs;
	txs.sort(function compare(a, b){
		return b.amount - a.amount;
	});

	var chosenTx = txs[0];
	inputTx = chosenTx.tx;
	balanceInBits = bitcoinsToSatoshis(chosenTx.amount);

	console.log("Loaded transaction "+inputTx+"\n with " + balanceInBits + " satoshis");
})
.then(function(){
try{

	var tx = new bitcoin.TransactionBuilder();
	var data = new Buffer(OP_RETURN_ATTACHED_DATA);
	var dataScript = bitcoin.script.nullDataOutput(data);

	tx.addInput(inputTx, 1);
	tx.addOutput(dataScript, PAYMENT_OUT_AMOUNT);
	var changeAmount = balanceInBits - PAYMENT_OUT_AMOUNT - TX_FEE;
	console.log("Outputs: "+changeAmount);
	tx.addOutput(pub, changeAmount);

	var keyPair = bitcoin.ECPair.fromWIF(priv)
	tx.sign(0, keyPair);


	console.log(tx.build().toHex());

}catch(err){console.error(err)}
})

