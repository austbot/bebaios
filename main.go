package main

import (
	"github.com/pkg/errors"
	"github.com/austbot/rbacViewer/backend"
	"github.com/gin-gonic/gin"
	"k8s.io/client-go/rest"
	"log"
)

func main() {
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Fatal(errors.Wrap(err, "Cluster Config Error"))
	}
	backendRouter := gin.Default()
	backend.StartApiServer(backendRouter, config)
	backendRouter.Run("0.0.0.0:8080")
}
