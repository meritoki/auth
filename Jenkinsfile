pipeline {
  agent none
  stages {
    stage('Back-end') {
      agent {
        dockerfile {
          filename 'Dockerfile'
        }

      }
      steps {
        sh 'npm -v'
      }
    }
    stage('Front-end') {
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
