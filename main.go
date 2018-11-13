package main

import (
	"github.com/austbot/rbacViewer/backend"
	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
	"k8s.io/client-go/rest"
	"log"
)

func main() {
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Println(errors.Wrap(err, "Cluster Config Error"))
	}
	router := gin.Default()
	if config != nil {
		backend.StartApiServer(router, config)
	}
	router.Static("/","./frontend")
	router.Run("0.0.0.0:8080")
}
