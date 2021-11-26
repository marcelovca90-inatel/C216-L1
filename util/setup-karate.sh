#!/bin/bash

mvn archetype:generate \
-DarchetypeGroupId=com.intuit.karate \
-DarchetypeArtifactId=karate-archetype \
-DarchetypeVersion=1.0.1 \
-DgroupId=br.inatel.c216-l1 \
-DartifactId=test \
--batch-mode
