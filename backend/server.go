package backend

import (
	"github.com/austbot/bebaios/backend/services"
	"github.com/austbot/bebaios/backend/services/permissionService"
	"github.com/gin-gonic/gin"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	k8sRest "k8s.io/client-go/rest"
	"log"
	"net/http"
)

func StartApiServer(router gin.IRouter, config *k8sRest.Config) {

	clientSet, configError := kubernetes.NewForConfig(config)
	if configError != nil {
		log.Fatal("Configuration cannot be found")
	}
	ks := services.KubernetesService{
		Client: *clientSet,
	}

	r := router.Group("/api")
	r.GET("/namespaces", func(c *gin.Context) {
		ps, err := ks.Client.CoreV1().Namespaces().List(metav1.ListOptions{})
		handleIfError(c, err)
		if err == nil {
			c.JSON(200, gin.H{
				"namespaces": ps.Items,
			})
		}
	})

	r.GET("/pods/:namespace", func(c *gin.Context) {
		namespace := c.Param("namespace")
		ps, err := ks.Client.CoreV1().Pods(namespace).List(metav1.ListOptions{})
		handleIfError(c, err)
		if err == nil {
			c.JSON(200, gin.H{
				"pods": ps.Items,
			})
		}
	})

	r.GET("/permissions-for/:namespace/:resource/:name", func(c *gin.Context) {
		ps := permissionService.New(ks, c)
		namespace := c.Param("namespace")
		resource := c.Param("resource")
		name := c.Param("name")
		if resource == "pod" {
			pod, err := ks.Pod(namespace, name)
			handleIfError(c, err)
			if err == nil {
				perms := ps.PermissionsForPod(*pod)
				c.JSON(200, perms)
			}
		} else {
			c.JSON(400, gin.H{"error": "Only pod lookup is implemented"})
		}
	})
}

func handleIfError(c *gin.Context, err error) {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": c.Error(err)})
		c.Abort()
		return
	}
}
