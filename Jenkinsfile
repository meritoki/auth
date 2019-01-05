
pipeline {
    agent none
    stages {
        stage('Back-end') {
            agent {
                dockerfile { filename 'Dockerfile' }
            }
            steps {
                sh 'npm -v'
            }
        }
        stage('Front-end') {
            agent {
		docker { image 'node:7-alpine' }
	    }
            steps {
		sh 'npm install newman -g'
                sh 'newman run ./postman/daily-bread-auth-service.postman_collection.json --reporters cli,junit --reporter-junit-export newman.xml --insecure'
            }
        }
    }
}

