# Complete Kubernetes Developer Guide: Migrating a Microservices Monorepo to k3s

This guide provides a comprehensive, ground-zero walkthrough for deploying and managing a multi-service containerized architecture (such as a NestJS microservices monorepo backed by PostgreSQL, MongoDB, Redis, and Kafka) onto a production-ready **k3s** Kubernetes cluster.

## Part 0: Environment Installation & Setup (Ground Zero)

Before deploying any manifests, you need a running Kubernetes cluster. Here is how to install **k3s** (Lightweight Kubernetes by Rancher) on a fresh AWS EC2 Ubuntu instance.

### 1. Install k3s on AWS EC2
SSH into your EC2 instance and run the official k3s installation script. k3s automatically configures `containerd`, networking, and sets up `kubectl` out of the box:
```bash
curl -sfL https://get.k3s.io | sh -
```

### 2. Verify `kubectl` Access
By default, k3s restricts `kubectl` access to root. Grant your standard user permission to interact with the cluster:
```bash
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
```

Verify that the cluster is healthy and ready:
```bash
kubectl get nodes
```
You should see your EC2 instance listed with a status of `Ready`.

---

## Part 1: Core Architectural Concepts

Before touching deployment commands, it is essential to understand the foundational primitives of Kubernetes.

### 1. Cluster, Control Plane, and Nodes
* **Cluster:** The complete Kubernetes system comprising a control plane (managing the desired state, scheduling, and API server) and worker nodes (running your actual workloads).
* **Node:** A physical or virtual machine providing CPU, RAM, and storage. In this guide, your environment runs **k3s**, optimized for resource-constrained environments like a single AWS EC2 instance.

### 2. Namespaces
Namespaces provide logical isolation within a single cluster. Instead of deploying all applications into the shared `default` space, you isolate your workload into a dedicated namespace (e.g., `logiflow`) to separate microservices, databases, and message brokers from system-level components.

### 3. Pods
* A **Pod** is the smallest and most basic deployable unit in Kubernetes.
* Unlike Docker where you typically run a single container directly, Kubernetes wraps one or more tightly coupled containers inside a Pod sharing the same network namespace and storage volumes.

### 4. Deployments and ReplicaSets
* **Deployment:** A higher-level declarative controller that manages the lifecycle of your Pods, specifying container images, resource limits, environment variables, and replica counts.
* **ReplicaSet:** Automatically managed by the Deployment, it ensures that the exact requested number of identical Pods are running at any given time.

### 5. Services (`ClusterIP`)
Pods are ephemeral by design: when they restart or scale, their internal IP addresses change.
* A **Service** acts as a stable internal load balancer and DNS name (`service-name.namespace.svc.cluster.local`).
* A `ClusterIP` exposes the application on an internal IP accessible **only within the cluster**.

### 6. ConfigMaps and Secrets
* **ConfigMap:** A key-value storage object used to inject non-confidential configuration data into your containers as environment variables.
* **Secret:** Structurally similar to a ConfigMap, but designed to hold sensitive credentials like database passwords and JWT tokens.

---

## Part 2: Step-by-Step Deployment Workflow

When deploying a multi-service backend system to a fresh cluster, follow a strict deployment order to prevent race conditions.

### Step 1: Create the Namespace
Always create your dedicated namespace first:
```bash
kubectl apply -f k8s/namespace.yaml
```

### Step 2: Deploy Shared Configuration
Deploy your configuration map before starting applications so environment variables are available upon container initialization:
```bash
kubectl apply -f k8s/configmap.yaml
```

### Step 3: Deploy Infrastructure State
Deploy foundational infrastructure components (`postgres`, `redis`, `mongo`, `kafka`, and `kafka-ui`) first.
* **Stateful Consideration:** When running message brokers like Apache Kafka in KRaft mode inside Kubernetes, ensure you set `enableServiceLinks: false` in the pod spec. This prevents Kubernetes from automatically injecting conflicting environment variables for every active service in the namespace.
```bash
kubectl apply -f k8s/infra/infrastructure.yaml
```

### Step 4: Deploy Microservices
Once databases and message brokers report a healthy `1/1 Running` status, deploy your application microservices:
```bash
kubectl apply -f k8s/apps/
```

---

## Part 3: Operational Command Reference

Mastering day-to-day cluster administration requires a core set of `kubectl` commands.

### 1. Inspecting Cluster State
* **List all pods in your namespace:**
  ```bash
  kubectl get pods -n logiflow
  ```
* **Inspect detailed pod status and events:**
  ```bash
  kubectl describe pod <pod-name> -n logiflow
  ```

### 2. Managing Deployments and Configs
* **Apply or update manifest files:**
  ```bash
  kubectl apply -f <path-to-yaml>
  ```
* **Trigger a rolling restart:**
  ```bash
  kubectl rollout restart deployment/<deployment-name> -n logiflow
  ```

### 3. Debugging & Logs
* **Stream live container logs:**
  ```bash
  kubectl logs -l app=<app-name> -n logiflow -f --tail=50
  ```

### 4. Local Access via Port Forwarding
To access internal cluster services (such as `kafka-ui` on port `8080`) from your local laptop:
```bash
kubectl port-forward svc/kafka-ui 8080:8080 -n logiflow --address 0.0.0.0
```

## OR
Step 1. On the EC2 instance, start the port-forward and leave it running:
```bash
kubectl port-forward svc/kafka-ui 8080:8080 -n logiflow
```
By default this only listens on 127.0.0.1 of the EC2 machine, which is what you want. It’s not exposed to the internet.

Step 2. On your laptop, open a new terminal and create the SSH tunnel:
```bash
ssh -i /path/to/your-key.pem -L 8080:localhost:8080 ubuntu@<EC2-PUBLIC-IP>
```