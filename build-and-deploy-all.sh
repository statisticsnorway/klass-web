#!/usr/bin/env bash
#mvn clean && mvn deploy -Pprod && mvn deploy -Pqa && mvn deploy -Ptest
 mvn clean deploy -Pprod && mvn clean deploy -Pqa && mvn clean deploy -Ptest
