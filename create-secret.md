Create Secrets

```
kubectl create secret generic <secret-name> --from-literal key=value
```

- ***create***: comando imperativo para crear un objeto

- ***secret***: tipo de objeto que vamos a crear

- ***generic***: tipo de secreto

- <***secret-name***>: nombre del objeto secreto, luego lo refenciaremos de algun pod

- ***--from-literal***: indica que vamos a asignar el valor key/value como argumento de este comando

- ***key***: nombre de la key, por lo general se corresponde con el nombre una variable de entorno

- ***value***: el valor para la key.

```
kubectl create secret generic postgres-secret --from-literal POSTGRES_PASSWORD=postgres
```
