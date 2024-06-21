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
                        powershell '''
                        Start-Process -FilePath "powershell.exe" -ArgumentList "docker build -t sithuminikaushalya/frontend ." -Verb RunAs -Wait
                        '''
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('Backend') {
                        powershell '''
                        Start-Process -FilePath "powershell.exe" -ArgumentList "docker build -t sithuminikaushalya/backend ." -Verb RunAs -Wait
                        '''
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_HUB_CREDENTIALS}") {
                        powershell '''
                        Start-Process -FilePath "powershell.exe" -ArgumentList "docker push sithuminikaushalya/frontend" -Verb RunAs -Wait
                        Start-Process -FilePath "powershell.exe" -ArgumentList "docker push sithuminikaushalya/backend" -Verb RunAs -Wait
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    dir('Path\\To\\Your\\Compose\\File') {
                        powershell '''
                        Start-Process -FilePath "powershell.exe" -ArgumentList "docker-compose down" -Verb RunAs -Wait
                        Start-Process -FilePath "powershell.exe" -ArgumentList "docker-compose up -d" -Verb RunAs -Wait
                        '''
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
