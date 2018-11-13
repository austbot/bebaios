package backend

import (
	"github.com/gin-gonic/gin"
	k8sRest "k8s.io/client-go/rest"
)

func StartApiServer(router gin.IRouter, config *k8sRest.Config) {
	//clientset, err := kubernetes.NewForConfig(config)
	//if err != nil {
	//	log.Fatal(err)
	//}

	//sa, error := clientset.RbacV1().ClusterRoles().List(v1.ListOptions{})
	r := router.Group("/api")
	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
}