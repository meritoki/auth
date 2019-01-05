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
        sh 'npm install'
        sh 'npm run newman-tests'
      }
    }
  }
}