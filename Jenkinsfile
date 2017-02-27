node {

    stage ('Clear workspace') {
        step([$class: 'WsCleanup'])
    }

    stage ('Pull') {
        checkout scm
    }

    try {
        def web_image_name = "andigital/catalogue-web:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
        def web_app

        stage ('Build image') {
            web_app = docker.build("${web_image_name}", '.')
        }

        //stage
        //api_app.inside() {
        //    sh 'node install'
        //}

        if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'master') {
            stage ('Push API') {
                web_app.push()
                web_app.push("${env.BRANCH_NAME}-latest")
             }
        }

        // TODO Add tests

        stage ('Notify Slack SUCCESS') {
            withCredentials([[$class: 'StringBinding', credentialsId: 'ci-slack-url', variable: 'SLACK_URL']]) {
                sh "curl -XPOST -d 'payload={ \"color\": \"good\", \"text\": \":white_check_mark: Build succeeded for ${env.JOB_NAME} ${env.BRANCH_NAME}\" }' ${env.SLACK_URL}"
            }
        }
    } catch (error) {
        stage ('Notify Slack FAIL') {
            withCredentials([[$class: 'StringBinding', credentialsId: 'ci-slack-url', variable: 'SLACK_URL']]) {
                sh "curl -XPOST -d 'payload={ \"color\": \"danger\", \"text\": \":warning: Build failed for ${env.JOB_NAME} ${env.BRANCH_NAME}: $error (see <${env.BUILD_URL}|the build logs>)\" }' ${env.SLACK_URL}"
            }
        }

        throw error
    }
}
