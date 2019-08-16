/* json com configuracoes iniciais de conexao */
var json = {
    broker: 'iot.eclipse.org',
    topic: 'SENAISPTCC/40/SIMV/Vendas',
    port: 1883
};

/* Instancia o paho-mqtt */
var client = new Paho.MQTT.Client(
    json.broker,
    parseInt(json.port),
    "SENAISPTCC-" + Date.now()
);

/* define aos eventos seus respectivos callbacks*/
mqtt.onConnectionLost = onConnectionLost;
mqtt.onMessageArrived = onMessageArrived;

function onConnectionLost(responseObject) {
    return console.log("Status: " + responseObject.errorMessage);
}
function onMessageArrived(message) {
    var msg = message.payloadString;
    console.log(message.destinationName, ' -- ', msg);

}

/* define aos eventos de Conexão seus respectivos callbacks*/
var options = {
    timeout: 3,
    onSuccess: onSuccess,
    onFailure: onFailure
};
function onSuccess() {
    console.log("Conectado com o Broker MQTT");
    mqtt.subscribe(json.topic, {qos: 0}); // Assina o Tópico
    Materialize.toast('Conectado ao broker', 1000);
}

function onFailure(message) {
    console.log("Connection failed: " + message.errorMessage);
}

/* função de conexão */
function init() {
    mqtt.connect(options); // Conecta ao Broker MQTT
}

/* App */
$(document).ready(function () {
    $('#broker').val(json.broker);
    $('#port').val(json.port);
    $('#topic').val(json.topic);

    /* Eventos de configuração */
    $('#save').on('click', function () {
        var broker, topic;
        broker = $('#broker').val();
        port = $('#port').val();
        topic = $('#topic').val();

        /* salva no localStorage os dados do formulário */
        localStorage.setItem("mqtt", JSON.stringify({broker: broker, port: port, topic: topic}));

        location.reload();
        return false;
    });

    $('#connect').on('click', function () {
        init();
    });
});
