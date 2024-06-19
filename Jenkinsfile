pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('151Chase%12')
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
                    dir('Frontend') {
                        sh 'docker build -t sithuminikaushalya/frontend .'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('Backend') { 
                        sh 'docker build -t sithuminikaushalya/backend .'
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.151Chase%12}") {
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