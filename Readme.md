# Bebaios

#Development

* Checkout this repo in your go path
* Install Docker For mac and enable Kubernetes integration
* set your context to the docker for desktop one
* install dep, and run dep ensure
* run `kubectl apply -f tiller.yaml`
* Install Helm
* run `helm init --service-account=tiller`
* Install skaffold from https://github.com/GoogleContainerTools/skaffold
* Run `skaffold dev --trigger manual --port-forward=false`
* jump into a new terminal and `npm install` inside the frontend directory
* run `npm start` in the frontend directory
