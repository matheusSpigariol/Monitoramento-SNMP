const labelsInX = [];
const dataInY = [];
const dataOutY = [];


var timer;
var aux = 0;
var aux2 = 0;
  const data = {
    labels: labelsInX,
    datasets: [
        {
            label: 'Quantidade de Segmentos TCPs recebidos',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataInY,
        },
        {
            label: 'Quantidade de Segmentos TCPs enviados',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: dataOutY,
        }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Data/Hora'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Qtde segmentos TCPs'
          }
        }
      }
    },
  };

  var myChart = new Chart(document.getElementById('myChart'),config);

  //Evento dos botões

  document.getElementById("btnIniciar").addEventListener('click',function(){
    console.log("Iniciando o monitoramento!");
    timer = setInterval(snmpGetTcpIn,1000);
  });

  document.getElementById("btnParar").addEventListener('click',function(){
    console.log("Interrompendo o monitoramento!");
    clearInterval(timer);
    labelsInX.length = 0;
    dataInY.length = 0;
    dataOutY.length = 0;
    myChart.update();
    
});


//Funções snmp


function snmpGetTcpIn(){
    var host = $('#ip').val();
    $.ajax({
        url: "snmpGetTcpIn.php",
        method: "POST",
        data: {'host':host},
        success: function(res){
            var dateTime = new Date();
            labelsInX.push(dateTime.toLocaleTimeString());
            const resp = res.split("|")
            console.log(resp);
            const resp2 = resp[1];
            if(aux == 0){
                aux = resp[0];
                aux2 = resp2;
            }else{
                aux = resp[0] - aux;
                aux2 = resp2 - aux2;
                dataInY.push(aux);
                dataOutY.push(aux2);
                aux = resp[0];
                aux2 = resp2;
                myChart.update();
            }
            aux = resp[0];
            aux2 = resp2;
        }
    })
}