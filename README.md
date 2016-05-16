# custom-op-return-tx
Create custom Bitcoin OP_RETURN transactions

See a [real-world example](http://btc.blockr.io/tx/info/1ad6af7564901ace5c1476a83a0caad09b711800b2dd426ea29fb3906dcb4d9e):
 - original address to fund the transaction is 	
1DK9de3h3NVzWuLoHwiNeu2Ni9GyhWcPwD
 - there were two outputs: 
    - one which contained the OP_RETURN message that costed 0.000001 BTC
    - another that send the rest of the change to the original address 1DK...
    - and of course the fee for the miners is the difference
