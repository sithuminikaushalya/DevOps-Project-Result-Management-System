pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        GIT_REPO_URL = 'https://github.com/sithuminikaushalya/DevOps-Project-Result-Management-System'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: "${env.GIT_REPO_URL}", branch: 'main'
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('result-management-system-client') { // Adjust the directory if necessary
                        sh 'docker build -t sithuminikaushalya/frontend .'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('result-management-system-server') { // Adjust the directory if necessary
                        sh 'docker build -t sithuminikaushalya/backend .'
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_HUB_CREDENTIALS}") {
                        sh 'docker push sithuminikaushalya/frontend'
                        sh 'docker push sithuminikaushalya/backend'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
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