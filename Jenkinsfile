pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'node index.js &'
      }
    }
    stage('Test') {
      steps {
	sh 'npm install -g newman
        sh 'newman run ./postman/daily-bread-auth-service.postman_collection.json --reporters cli,junit --reporter-junit-export newman.xml --insecure'
      }
    }
  }
}