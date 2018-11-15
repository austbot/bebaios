package permissionService

import (
	"k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
)

type RulesByNameSpace = map[string][]rbacv1.PolicyRule

type Permissions struct {
	Permissions RulesByNameSpace `json:"permissions"`
	Meta        v1.Pod           `json:"meta"`
}
