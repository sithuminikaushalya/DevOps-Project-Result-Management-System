pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = 'kaushalyasithumini29'
        GIT_REPO_URL = 'https://github.com/sithuminikaushalya/DevOps-Project-Result-Management-System'
        PATH = "C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\Program Files\\Docker Compose;${env.PATH}"
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

        stage('Static Code Analysis') {
            steps {
                bat 'sonar-scanner' // Adjust this command based on your setup
            }
        }

        stage('Unit Testing') {
            steps {
                dir('Backend') {
                    bat 'npm test' // Or the appropriate command for your testing framework
                }
            }
        }

        stage('Integration Testing') {
            steps {
                dir('IntegrationTests') {
                    bat 'run-integration-tests' // Adjust according to your setup
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

        stage('Security Scanning') {
            steps {
                bat 'trivy image kaushalyasithumini29/frontend:%BUILD_NUMBER%'
                bat 'trivy image kaushalyasithumini29/backend:%BUILD_NUMBER%'
                bat 'trivy image kaushalyasithumini29/mongodb:%BUILD_NUMBER%'
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

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig', serverUrl: 'https://your-k8s-cluster-url']) {
                    bat 'kubectl apply -f k8s/deployment.yaml' // Adjust according to your setup
                }
            }
        }

        stage('Smoke Testing') {
            steps {
                bat 'run-smoke-tests' // Adjust according to your setup
            }
        }

        stage('Notification') {
            steps {
                script {
                    def buildStatus = currentBuild.result ?: 'SUCCESS'
                    emailext(
                        to: 'team@example.com',
                        subject: "Build ${buildStatus}: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                        body: "The build ${buildStatus} for job ${env.JOB_NAME} build number ${env.BUILD_NUMBER}.",
                    )
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
