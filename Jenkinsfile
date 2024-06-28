pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = 'kaushalyasithumini29'
        GIT_REPO_URL = 'https://github.com/sithuminikaushalya/DevOps-Project-Result-Management-System'
        GOOGLE_APPLICATION_CREDENTIALS = credentials('google-cloud-key')
        PROJECT_ID = 'argon-computer-427810-u7'
        CLUSTER_NAME = 'results-management-system'
        CLUSTER_ZONE = 'us-central1-a'
    }

    stages {
        stage('Verify PATH') {
            steps {
                script {
                    bat 'echo %PATH%'
                }
            }
        }

        stage('Verify Docker and Docker-Compose') {
            steps {
                script {
                    bat 'docker --version'
                    bat 'docker-compose --version'
                }
            }
        }

        stage('Checkout') {
            steps {
                retry(3) {
                    git url: "${env.GIT_REPO_URL}", branch: 'main'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('Frontend') {
                    bat 'docker build -t kaushalyasithumini29/frontend:%BUILD_NUMBER% .'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('Backend') {
                    bat 'docker build -t kaushalyasithumini29/backend:%BUILD_NUMBER% .'
                }
            }
        }

        stage('Build MongoDB Docker Image') {
            steps {
                dir('MongoDB') {
                    script {
                        bat 'docker build -t kaushalyasithumini29/mongodb:%BUILD_NUMBER% .'
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'sithumini', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        bat "docker login -u ${env.DOCKER_HUB_USERNAME} -p ${env.DOCKER_HUB_PASSWORD}"
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat 'docker push kaushalyasithumini29/frontend:%BUILD_NUMBER%'
            }
        }

        stage('Push Backend Image') {
            steps {
                bat 'docker push kaushalyasithumini29/backend:%BUILD_NUMBER%'
            }
        }

        stage('Push MongoDB Image') {
            steps {
                bat 'docker push kaushalyasithumini29/mongodb:%BUILD_NUMBER%'
            }
        }

        stage('Configure Google Cloud SDK') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'google-cloud-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                        bat """
                            gcloud auth activate-service-account --key-file=${env.GOOGLE_APPLICATION_CREDENTIALS}
                            gcloud config set project ${env.PROJECT_ID}
                            gcloud container clusters get-credentials ${env.CLUSTER_NAME} --zone ${env.CLUSTER_ZONE}
                        """
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    bat 'kubectl apply -f k8s/namespace.yaml'
                    bat 'kubectl apply -f k8s/frontend-deployment.yaml'
                    bat 'kubectl apply -f k8s/frontend-service.yaml'
                    bat 'kubectl apply -f k8s/backend-deployment.yaml'
                    bat 'kubectl apply -f k8s/backend-service.yaml'
                    bat 'kubectl apply -f k8s/mongo-deployment.yaml'
                    bat 'kubectl apply -f k8s/mongo-service.yaml'
                }
            }
        }
    }

    post {
        always {
            bat 'docker logout'
            cleanWs()
        }
    }
}
