pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        GIT_REPO_URL = 'https://github.com/your-username/your-repo.git'
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
                    dir('frontend') {
                        sh 'docker build -t your-docker-hub-username/frontend .'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker build -t your-docker-hub-username/backend .'
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        sh 'docker push your-docker-hub-username/frontend'
                        sh 'docker push your-docker-hub-username/backend'
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