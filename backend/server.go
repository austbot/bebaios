package backend

import (
	"github.com/gin-gonic/gin"
	"k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	k8sRest "k8s.io/client-go/rest"
	"net/http"
)

type DumpResp struct {
	Namespaces DumpNsMap `json:"namespaces"`
}
type DumpNsMap = map[string]DumpNs
type DumpNs struct {
	Namespace v1.Namespace    `json:"namespace"`
	Roles     rbacv1.RoleList `json:"roles"`
}

func StartApiServer(router gin.IRouter, config *k8sRest.Config) {
	r := router.Group("/api")
	r.GET("/dump", func(c *gin.Context) {
		clienSet, configError := kubernetes.NewForConfig(config)
		handleIfError(c, configError)
		ns, nsError := clienSet.CoreV1().Namespaces().List(metav1.ListOptions{})
		handleIfError(c, nsError)
		var roles = map[string]DumpNs{}
		for _, namespace := range ns.Items {
			roleList, error := clienSet.RbacV1().Roles(namespace.Name).List(metav1.ListOptions{})
			handleIfError(c, error)
			roles[namespace.Name] = DumpNs{
				Namespace: namespace,
				Roles:     *roleList,
			}
		}
		c.JSON(200, DumpResp{
			Namespaces: roles,
		})
	})

	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
}

func handleIfError(c *gin.Context, err error) {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": c.Error(err)})
		c.Next()
		return
	}
}
