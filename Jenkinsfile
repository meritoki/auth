pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('Postman Test') {
      steps {
        sh 'npm --version'
        sh 'newman run ./postman/daily-bread-auth-service.postman_collection.json --reporters cli,junit --reporter-junit-export newman.xml --insecure'
      }
    }
  }
}