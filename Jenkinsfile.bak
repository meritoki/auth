pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
      args '--network host'
    }

  }
  stages {
    stage('Postman Test') {
      steps {
        sh 'exit'
        sh 'newman run ./postman/daily-bread-auth-service.postman_collection.json --reporters cli,junit --reporter-junit-export newman.xml --insecure'
      }
    }
  }
}
