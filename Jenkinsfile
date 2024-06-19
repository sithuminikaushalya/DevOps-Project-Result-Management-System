pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
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
                git url: "${env.GIT_REPO_URL}", branch: 'main'
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('Frontend') {
                        bat 'docker build -t sithuminikaushalya/frontend .'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('Backend') {
                        bat 'docker build -t sithuminikaushalya/backend .'
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_HUB_CREDENTIALS}") {
                        bat 'docker push sithuminikaushalya/frontend'
                        bat 'docker push sithuminikaushalya/backend'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    dir('Path\\To\\Your\\Compose\\File') {
                        bat 'docker-compose down'
                        bat 'docker-compose up -d'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}