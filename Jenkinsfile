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
	docker.image('dailybread/auth-service').run {
           sh 'npm -v'
	}
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
