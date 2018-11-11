package main

import (
	"fmt"
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
	"time"
)

func main() {
	fmt.Println("Hello World")
	time.Sleep(1000)
}
