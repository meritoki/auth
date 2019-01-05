pipeline {
  agent none
  stages {
    stage('Build') {
      agent {
        dockerfile {
          filename 'Dockerfile'
        }

      }
      steps {
        sh 'npm -v'
      }
    }
    stage('Test') {
      agent {
        dockerfile {
          filename 'postman/Dockerfile'
        }

      }
      steps {
        sh 'npm -v'
      }
    }
  }
}