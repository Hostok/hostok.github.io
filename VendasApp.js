(function () {

  const broker = document.getElementById('broker');
  const port  = document.getElementById('port');
  const topic  = document.getElementById('topic');

  /* json com configuracoes iniciais de conexao */
  let json = {
    broker: 'iot.eclipse.org',
    topic: 'SENAISPTCC/40/SIMV/Vendas',
    port: 1883
  };

  const mqttConnect = () => {
    return new Paho.MQTT.Client(
      json.broker,
      parseInt(json.port),
      "SENAISPTCC-" + Date.now()
    );
  };

  const onConnectionLost = (responseObject) => {
    let errorMessage = responseObject.errorMessage;
    console.log("Status: " + errorMessage);
    Materialize.toast(errorMessage, 2000);

  };

  const onMessageArrived = (Vendas) => {
    let msg = Vendas.payloadString;
    console.log(Vendas.destinationName, ' -- ', msg);
    
  /* Instancia o paho-mqtt */
  let mqtt              = mqttConnect();
  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;

  const onSuccess = () => {
    mqtt.subscribe(json.topic, { qos: 0 }); // Assina o Tópico
    Materialize.toast('Conectado ao broker', 2000);
  };

  const onFailure = (message) => {
    console.log("Connection failed: " + message.errorMessage);
  };

  /* função de conexão */
  const connect = () => {

    /* define aos eventos de Conexão seus respectivos callbacks*/
    let options = {
      timeout: 3,
      onSuccess: onSuccess,
      onFailure: onFailure
    };

    mqtt.connect(options); // Conecta ao Broker MQTT
  };

  /* App */
  init();

});
