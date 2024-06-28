pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('sithumini')
        GIT_REPO_URL = 'https://github.com/sithuminikaushalya/DevOps-Project-Result-Management-System'
        DOCKER_IMAGE = 'kaushalyasithumini29/devops-project-result-management-system:devops'
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

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'sithumini', variable: 'docker_hub_password')]) {
                    script {
                        bat "docker login -u kaushalyasithumini29 -p %docker_hub_password%"
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
    }

    post {
        always {
            bat 'docker logout'
            cleanWs()
        }
    }
}
