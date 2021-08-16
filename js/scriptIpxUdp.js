const dataIp = [];
const dataUdp = [];

var timer;

var aux = 0;
var aux2 = 0;
var aux3 = 0;
var aux4 = 0;
var aux5 = 0;
var aux6 = 0;

const data = {
  labels: [
    'Datagramas fornecidos',
    'Datagramas recebidos',
    'Datagramas recebidos e descartados',
  ],
  datasets: [{
    label: 'Todos',
    data: dataIp,
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'UDP',
    data: dataUdp,
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};

const config = {
  type: 'radar',
  data: data,
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
};

var myChart = new Chart(document.getElementById('myChart'),config);

  //Evento dos botões

  document.getElementById("btnIniciar").addEventListener('click',function(){
    console.log("Iniciando o monitoramento!");
    timer = setInterval(snmpGetIpxUdp,2000);
  });

  document.getElementById("btnParar").addEventListener('click',function(){
    console.log("Interrompendo o monitoramento!");
    clearInterval(timer);
    dataIp.length = 0;
    dataUdp.length = 0;
    myChart.update();
    
});

//Funções snmp

function snmpGetIpxUdp(){
  var host = $('#ip').val();
  $.ajax({
      url: "snmpGetIpxUdp.php",
      method: "POST",
      data: {'host':host},
      success: function(res){
        const resp = res.split("|")
        const ipOut = resp[0];
        const Ip = resp[1];
        const ipErr = resp[2]
        const udpOut = resp[3]
        const udpIn = resp[4]
        const udpErr = resp[5]
        if(aux == 0){
          aux = ipOut;
          aux2 = Ip;
          aux3 = ipErr;
          aux4 = udpOut;
          aux5 = udpIn;
          aux6 = udpErr;
        }else{
          aux = ipOut - aux;
          aux2 = Ip - aux2;
          aux3 = ipErr - aux3;
          aux4 = udpOut - aux4;
          aux5 = udpIn - aux5;
          aux6 = udpErr - aux6;
          dataIp.push(aux);
          dataIp.push(aux2);
          dataIp.push(aux3);
          dataUdp.push(aux4);
          dataUdp.push(aux5);
          dataUdp.push(aux6);
          console.log(aux2);
          console.log(aux5);
          myChart.update();
          aux = ipOut;
          aux2 = Ip;
          aux3 = ipErr;
          aux4 = udpOut;
          aux5 = udpIn;
          aux6 = udpErr;
        }
        dataIp.length = 0;
        dataUdp.length = 0;
      }
  })
}