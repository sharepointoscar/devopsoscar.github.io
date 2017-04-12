node {
nodejs(nodeJSInstallationName: 'NodeJS 7.7.4') {
    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){
            checkout scm
       }

       stage ('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm prune'
         sh 'npm install'
         sh 'bower install'
         sh 'grunt build'
         sh 'grunt mochaTest'
       }

       stage ('Build Docker') {

         print"building application would happen here via executing a bash script"
         sh './dockerBuild.sh'
       }

       stage('Deploy') {

         print"deploying application would happen here"
         echo 'Push to Repo'
         //sh './dockerPushToRepo.sh'

         echo 'ssh to web server and tell it to pull new image'
         //sh 'ssh deploy@xxxxx.xxxxx.com running/xxxxxxx/dockerRun.sh'

       }

       stage ('Cleanup'){

         echo 'prune and cleanup'
         sh 'npm prune'
         sh 'rm node_modules -rf'

       }

    }
    catch (err) {

        currentBuild.result = "FAILURE"
        print "project build error is here: ${env.BUILD_URL}"

        throw err
    }

  }
}
