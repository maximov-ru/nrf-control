/**
 * Created by maximov on 05.03.16.
 */
var NRF24 = require("nrf"),
    queue = require('queue-async');
var pipes = [0xF0F0F0F0E1, 0xF0F0F0F0D2];
var radiocfg = {spiDev:"/dev/spidev0.0", cePin:25};
var radio = NRF24.connect(radiocfg.spiDev, radiocfg.cePin);
try {
    radio._debug = false;
    radio.dataRate('1Mbps').crcBytes(2);
    radio.transmitPower('PA_MAX').autoRetransmit({count:5, delay:4000});
    //radio.setStates({DYNPD:0x00, FEATURE:0x00,EN_DPL:0});

    radio.begin(function (e) {
        var rx = radio.openPipe('rx', pipes[0],{size: 'auto',autoAck:true}),
            tx = radio.openPipe('tx', pipes[1],{size: 'auto',autoAck:true});
        //radio.setStates({DYNPD:0x00, FEATURE:0x00,EN_DPL:0});
        tx.on('ready', function () {
            radio.printDetails();
            var buf = new Uint32Array(1);
            buf[0] = 81;
            var ret = 'hz';
            try {
                ret = tx.write(new Buffer(buf));
            }catch(e) {
               console.log('=((');
            }
            console.log('myret',ret);
            if(ret === true){
                //tx.
            }
            //tx.write("Hello?");
            //tx.write("blah blah blah");
            //tx.write("the number 4");
            //setInterval(tx.write.bind(tx, "beep"), 2e3);
            //setInterval(tx.write.bind(tx, "boop"), 2e3);
        });
        tx.on('error',function(e){
            console.log('err',e);
        });

        rx.on('data', function (d) {
            console.log("Got data:", d.toString());
        });
        rx.on('error',function(e){
            console.log('err2',e);
        });
    });
}catch(e) {
    console.log('hm....');
}