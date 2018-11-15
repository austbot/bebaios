package permissionService

import (
	"fmt"
	"github.com/austbot/bebaios/backend/services"
	"github.com/gin-gonic/gin"
	"k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	"net/http"
)

type PermissionService struct {
	K8s     services.KubernetesService
	Context *gin.Context
	Data    map[string]ObjectData
}

type ObjectData struct {
	Roles           *rbacv1.RoleList               `json:"roles"`
	ClusterRoles    *rbacv1.ClusterRoleList        `json:"clusterRoles"`
	ClusterRolesB   *rbacv1.ClusterRoleBindingList `json:"clusterRoleBindings"`
	RolesB          *rbacv1.RoleBindingList        `json:"roleBindings"`
	ServiceAccounts *v1.ServiceAccountList         `json:"serviceAccounts"`
}

func New(K8s services.KubernetesService, Context *gin.Context) PermissionService {
	ps := PermissionService{
		K8s:     K8s,
		Context: Context,
	}
	ps.loadData()
	return ps
}

func (ps *PermissionService) loadData() {
	var namespaces *v1.NamespaceList
	namespaces, err := ps.K8s.Namespaces()
	if err != nil {
		ps.Context.Error(err)
	}
	ps.Data = map[string]ObjectData{}
	for _, ns := range namespaces.Items {
		crs, err := ps.K8s.ClusterRoles()
		if err != nil {
			ps.Context.Error(err)
		}
		crbs, err := ps.K8s.ClusterRoleBindings()
		if err != nil {
			ps.Context.Error(err)
		}
		rss, err := ps.K8s.Roles(ns.Name)
		if err != nil {
			ps.Context.Error(err)
		}
		rbs, err := ps.K8s.RoleBindings(ns.Name)
		if err != nil {
			ps.Context.Error(err)
		}
		sas, err := ps.K8s.ServiceAccounts(ns.Name)
		if err != nil {
			ps.Context.Error(err)
		}
		ps.Data[ns.Name] = ObjectData{
			Roles:           rss,
			RolesB:          rbs,
			ClusterRoles:    crs,
			ClusterRolesB:   crbs,
			ServiceAccounts: sas,
		}
	}
	if len(ps.Context.Errors) > 0 {
		ps.Context.JSON(http.StatusInternalServerError, gin.H{"Error": ps.Context.Errors})
		ps.Context.Next()
	}
}

func (ps *PermissionService) PermissionsForPod(pod v1.Pod) Permissions {
	namespace := pod.Namespace
	saName := pod.Spec.ServiceAccountName
	fmt.Println(saName)
	var perms = Permissions{
		Permissions: map[string][]rbacv1.PolicyRule{},
		Meta:        pod,
	}
	for _, roleBinding := range ps.Data[namespace].RolesB.Items {
		for _, sub := range roleBinding.Subjects {
			if sub.Kind == "ServiceAccount" && sub.Name == saName {
				fmt.Println(sub.Name)
				name := roleBinding.RoleRef.Name
				fmt.Println(name)
				if roleBinding.RoleRef.Kind == "ClusterRole" {
					for _, crole := range ps.Data[namespace].ClusterRoles.Items {
						if crole.Name == name {
							perms.Permissions[namespace] = append(perms.Permissions[namespace], crole.Rules...)
						}
					}
				}
				if roleBinding.RoleRef.Kind == "Role" {
					for _, role := range ps.Data[namespace].Roles.Items {
						if role.Name == name {
							perms.Permissions[namespace] = append(perms.Permissions[namespace], role.Rules...)
						}
					}
				}

			}
		}
	}

	for _, crRoleBinding := range ps.Data[namespace].ClusterRolesB.Items {
		for _, sub := range crRoleBinding.Subjects {
			if sub.Kind == "ServiceAccount" && sub.Name == saName {
				fmt.Println(sub.Name)
				name := crRoleBinding.RoleRef.Name
				fmt.Println(name)
				if crRoleBinding.RoleRef.Kind == "ClusterRole" {
					for _, crole := range ps.Data[namespace].ClusterRoles.Items {
						if crole.Name == name {
							perms.Permissions[namespace] = append(perms.Permissions[namespace], crole.Rules...)
						}
					}
				}
				if crRoleBinding.RoleRef.Kind == "Role" {
					for _, role := range ps.Data[namespace].Roles.Items {
						if role.Name == name {
							perms.Permissions[namespace] = append(perms.Permissions[namespace], role.Rules...)
						}
					}
				}

			}
		}
	}
	return perms
}
