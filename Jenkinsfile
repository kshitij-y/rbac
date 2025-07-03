pipeline {
  agent any

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main',
            url: 'https://github.com/kshitij-y/rbac.git'
      }
    }

    stage('Inject env files') {
      steps {
        sh '''
          cp /home/ubuntu/rbac/frontend/.env frontend/.env
          cp /home/ubuntu/rbac/backend/.env backend/.env
        '''
      }
    }

    stage('Docker Compose Up') {
      steps {
        sh '''
          docker-compose down --remove-orphans
          docker-compose up --build -d
        '''
      }
    }
  }

  post {
    failure {
      echo "Build failed. Shutting down containers."
      sh 'docker-compose down'
    }
    success {
      echo "Build succeeded. App is up."
    }
    always {
      echo "Cleaning up unused containers."
      sh 'docker container prune -f || true'
    }
  }
}
