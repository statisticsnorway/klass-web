pipeline {

    agent any

    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')
    }

    triggers {
        pollSCM('H/5 * * * *')
    }

    tools {
        jdk 'Oracle Java 8'
        maven 'Maven 3.8.5'
        git 'Default'
    }

    parameters {
        booleanParam(name: "RELEASE",
            description: "Build a release from current commit.",
            defaultValue: false)
    }

    stages {

        stage("Build") {
            steps {
                sh "mvn -B clean package"
            }
        }

        stage("Make release") {
            when {
                expression { params.RELEASE }
            }
            steps {
                sshagent(['7042ed72-89a8-417d-8c99-5b33a3ce7462']) {
                    sh "mvn -B release:prepare release:perform"
                }
            }
        }

        stage("Deploy release to Nexus") {
            when {
                expression { params.RELEASE }
            }
            steps {
                build 'Klass-Web_Deploy_Nexus_UTV'
                build 'Klass-Web_Deploy_Nexus_TEST'
                build 'Klass-Web_Deploy_Nexus_QA'
                build 'Klass-Web_Deploy_Nexus_PROD'
            }
        }

    }

}