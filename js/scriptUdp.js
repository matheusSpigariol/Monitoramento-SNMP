const labels = ["Datagramas UDP fornecidos", "Datagramas UDP recebidos", "Datagramas UDP descartados por erro"];

const udpOut = [];
const udpIn = [];
const udpErr = [];

var timer;

var aux = 0;
var aux2 = 0;
var aux3 = 0; 


const data = {
  labels: labels,
  datasets: [
      {
      label: 'Monitoramento de Datgramas UDP',
      data: [udpOut, udpIn, udpErr],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    },
  ],
  options:[

  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Qtde Datagramas'
        }
      }
    }
  },
};

var myChart = new Chart(document.getElementById('myChart'),config);

  //Evento dos botões

  document.getElementById("btnIniciar").addEventListener('click',function(){
    console.log("Iniciando o monitoramento!");
    timer = setInterval(snmpGetUdp,2000);
  });

  document.getElementById("btnParar").addEventListener('click',function(){
    console.log("Interrompendo o monitoramento!");
    clearInterval(timer);
    udpOut.length = 0;
    udpIn.length = 0;
    udpErr.length = 0;
    myChart.update();
    
});

//Funções snmp

function snmpGetUdp(){
  var host = $('#ip').val();
  $.ajax({
      url: "snmpGetUdp.php",
      method: "POST",
      data: {'host':host},
      success: function(res){
        const resp = res.split("|")
        const resp2 = resp[0];
        const resp3 = resp[1];
        const resp4 = resp[2]
        if(aux == 0){
          aux = resp2;
          aux2 = resp3;
          aux3 = resp4;
        }else{
          aux = resp2 - aux;
          aux2 = resp3 - aux2;
          aux3 = resp4 - aux3;
          console.log(aux);
          console.log(aux2);
          console.log(aux3);
          udpOut.push(aux);
          udpIn.push(aux2);
          udpErr.push(aux3);
          myChart.update();
          aux = resp2;
          aux2 = resp3;
          aux3 = resp4;
        }
        udpOut.length = 0;
        udpIn.length = 0;
        udpErr.length = 0;  
      }
  })
}