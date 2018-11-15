package services

import (
	"fmt"
	"github.com/pkg/errors"
	appsv1 "k8s.io/api/apps/v1"
	"k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

type KubernetesService struct {
	Client kubernetes.Clientset
}

type NamespaceLazy struct {
	Name string
}

func (k *KubernetesService) Namespaces() (*v1.NamespaceList, error) {
	value, err := k.Client.CoreV1().Namespaces().List(metav1.ListOptions{})
	if err != nil {
		return nil, errors.Wrap(err, "Request for Namespaces Failed")
	}
	return value, err
}

func (k *KubernetesService) Roles(namespace string) (*rbacv1.RoleList, error) {
	value, err := k.Client.RbacV1().Roles(namespace).List(metav1.ListOptions{})
	if err != nil {
		return nil, errors.Wrap(err, "Request for Roles Failed")
	}
	return value, err
}

func (k *KubernetesService) ClusterRoles() (*rbacv1.ClusterRoleList, error) {
	value, err := k.Client.RbacV1().ClusterRoles().List(metav1.ListOptions{})
	if err != nil {
		return nil, errors.Wrap(err, "Request for ClusterRoles Failed")
	}
	return value, err
}

func (k *KubernetesService) RoleBindings(namespace string) (*rbacv1.RoleBindingList, error) {
	value, err := k.Client.RbacV1().RoleBindings(namespace).List(metav1.ListOptions{})
	if err != nil {
		return nil, errors.Wrap(err, "Request for RoleBindings Failed")
	}
	return value, err
}

func (k *KubernetesService) ClusterRoleBindings() (*rbacv1.ClusterRoleBindingList, error) {
	value, err := k.Client.RbacV1().ClusterRoleBindings().List(metav1.ListOptions{})
	if err != nil {
		return nil, errors.Wrap(err, "Request for ClusterRoleBindings Failed")
	}
	return value, err
}

func (k *KubernetesService) ServiceAccounts(namespace string) (*v1.ServiceAccountList, error) {
	value, err := k.Client.CoreV1().ServiceAccounts(namespace).List(metav1.ListOptions{})
	if err != nil {
		return nil, errors.Wrap(err, "Request for ServiceAccounts Failed")
	}
	return value, err
}

func (k *KubernetesService) Pods(namespace string) (*v1.PodList, error) {
	value, err := k.Client.CoreV1().Pods(namespace).List(metav1.ListOptions{})
	if err != nil {
		return nil, errors.Wrap(err, "Request for Pods Failed")
	}
	return value, err
}

func (k *KubernetesService) Pod(namespace string, name string) (*v1.Pod, error) {
	value, err := k.Client.CoreV1().Pods(namespace).Get(name, metav1.GetOptions{})
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf("Request for Pod with name %s Failed", name))
	}
	return value, err
}

func (k *KubernetesService) Deployments(namespace string) (*appsv1.DeploymentList, error) {
	value, err := k.Client.AppsV1().Deployments(namespace).List(metav1.ListOptions{})
	if err != nil {
		return nil, errors.Wrap(err, "Request for Deploymwents has Failed")
	}
	return value, err
}

func (k *KubernetesService) Deployment(namespace string, name string) (*appsv1.Deployment, error) {
	value, err := k.Client.AppsV1().Deployments(namespace).Get(name, metav1.GetOptions{})
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf("Request for Deployment with name %s Failed", name))
	}
	return value, err
}
