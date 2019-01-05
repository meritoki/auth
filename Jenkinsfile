pipeline {
    agent none
    stages {
        stage('Build & Test') {
            agent {
                dockerfile { filename 'Dockerfile' }
            }
            steps {
                sh 'npm -v'
            }
        }
    }
}
