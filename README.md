const responseJson = pm.response.json();
var token = responseJson.detalles;
pm.environment.set("TOKEN", token);
