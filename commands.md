Eliminar instancia de minikube previa
```
minikube delete --purge
```


Generar nueva instancia de minikube utilizando virtualbox
```
minikube start --driver=virtualbox
```

habilitar ingress para minikube
````
minikube addons enable ingress
````

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.35.0/deploy/static/provider/cloud/deploy.yaml
```

Verify the service was enabled by running the following:
```
kubectl get pods -n ingress-nginx
```

Aplicar

1. Crear el secret para la base de datos

```
kubectl create secret generic postgres-secret --from-literal POSTGRES_PASSWORD=postgres
```

2. Crear la base de datos postgres
```
kubectl apply -f k8s/database-persistent-volume-claim.yaml
```
```
kubectl apply -f k8s/postgres-deployment.yaml
```
```
kubectl apply -f k8s/postgres-cluster-ip-service.yaml
```

3. Crear Redis server
```
kubectl apply -f k8s/redis-deployment.yaml
```
```
kubectl apply -f k8s/redis-cluster-ip-service.yaml
```

4. Deploy de fibo-server
```
kubectl apply -f k8s/server-deployment.yaml
```
```
kubectl apply -f k8s/server-custer-ip-service.yaml
```

5. Deploy de fibo-worker
```
kubectl apply -f k8s/worker-deployment.yaml
```

6. Deploy de fibo-client
```
kubectl apply -f k8s/client-deployment.yaml
```
```
kubectl apply -f k8s/client-cluster-ip-service.yaml
```

7. Deploy Ingress
```
kubectl apply -f k8s/ingress-service.yaml
```

8. Verificar IP de minikube
```
minikube ip
```

9. Accdeder a esa IP desde el navegador
```
http://192.168.99.101/
```



