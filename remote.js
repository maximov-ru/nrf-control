/**
 * Created by maximov on 05.03.16.
 */
var NRF24 = require("nrf"),
    queue = require('queue-async');
var pipes = [0xF1F0F0F0E1, 0xF1F0F0F0D2];
var radiocfg = {spiDev:"/dev/spidev0.0", cePin:25};
var radio = NRF24.connect(radiocfg.spiDev, radiocfg.cePin);

radio.dataRate('1Mbps').crcBytes(2);
radio.transmitPower('PA_MAX').autoRetransmit({count:15, delay:4000});
radio.begin(function (e) {
    var rx = radio.openPipe('rx', pipes[1]),
        tx = radio.openPipe('tx', pipes[0]);
    tx.on('ready', function () {
        var ret = tx.write(Buffer(8));
        console.log(ret);
        //tx.write("Hello?");
        //tx.write("blah blah blah");
        //tx.write("the number 4");
        //setInterval(tx.write.bind(tx, "beep"), 2e3);
        //setInterval(tx.write.bind(tx, "boop"), 2e3);
    });

    rx.on('data', function (d) {
        console.log("Got data:", d.toString());
    });
});