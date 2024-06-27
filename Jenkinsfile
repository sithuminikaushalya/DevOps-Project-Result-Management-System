pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        GIT_REPO_URL = 'https://github.com/CPrasa/DevOps-Project-Result-Management-System'
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


        //pushing image to dockerhub
        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_HUB_CREDENTIALS}") {
                        def frontendPush = bat(script: 'docker push sithuminikaushalya/frontend', returnStatus: true)
                        if (frontendPush != 0) {
                            error "Failed to push frontend image"
                        }

                        def backendPush = bat(script: 'docker push sithuminikaushalya/backend', returnStatus: true)
                        if (backendPush != 0) {
                            error "Failed to push backend image"
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    dir('Path\\To\\Your\\Compose\\File') {
                        powershell '''
                        docker-compose down | Tee-Object -FilePath deploy_down.log
                        if ($LASTEXITCODE -ne 0) { exit 1 }
                        docker-compose up -d | Tee-Object -FilePath deploy_up.log
                        if ($LASTEXITCODE -ne 0) { exit 1 }
                        '''
                        powershell 'Get-Content deploy_down.log'
                        powershell 'Get-Content deploy_up.log'
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
