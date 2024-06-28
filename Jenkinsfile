pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('sithumini')
        GIT_REPO_URL = 'https://github.com/sithuminikaushalya/DevOps-Project-Result-Management-System'
        DOCKER_IMAGE = 'kaushalyasithumini29/DevOps-Project-Result-Management-System:DevOps'
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

        stage('Build') {
            steps {
                script {
                    // Build Docker image
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        //pushing image to dockerhub
        stage('Push') {
            steps {
                script {
                    // Log in to Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDENTIALS) {
                        // Push Docker image
                        docker.image(DOCKER_IMAGE).push()
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
