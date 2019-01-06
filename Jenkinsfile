pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'JENKINS_NODE_COOKIE=dontKillMe node index.js &'
      }
    }
    stage('Test') {
      steps {
        sh 'sudo npm install newman -g'
        sh 'newman run ./postman/daily-bread-auth-service.postman_collection.json --reporters cli,junit --reporter-junit-export newman.xml --insecure'
      }
    }
    stage('Deploy') {
      steps {
        sh 'mkdir -p /home/jorodriguez/meritoki/dailybread/'
        sh 'sudo rm -rf auth'
        sh 'sudo git clone -b dev https://github.com/meritoki/auth.git'
        sh 'cd auth'
        sh 'git remote update'
        sh 'git fetch'
        sh 'git branch -a'
        sh 'git status'
        sh 'docker stop auth-service'
        sh 'docker rm auth-service'
        sh 'docker build -t dailybread/auth-service .'
        sh 'sudo docker run --network host -dlt --restart unless-stopped --name auth-service -p 3000:3000 dailybread/auth-service'
      }
    }
  }
  triggers {
    cron('H/15 * * * *')
  }
}