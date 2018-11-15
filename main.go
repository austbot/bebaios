package main

import (
	"github.com/austbot/bebaios/backend"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/pkg/errors"
	"k8s.io/client-go/rest"
	"log"
)

func main() {
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Fatal(errors.Wrap(err, "Cluster Config Error"))
	}
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./frontend", true)))
	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowAllOrigins:  false,
		AllowOriginFunc:  func(origin string) bool { return true },
		MaxAge:           86400,
	}))
	router.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	if config != nil {
		backend.StartApiServer(router, config)
	}
	router.Run("0.0.0.0:8080")
}
