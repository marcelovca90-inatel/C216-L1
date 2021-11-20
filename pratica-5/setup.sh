#!/bin/bash

mvn archetype:generate \
-DarchetypeGroupId=com.intuit.karate \
-DarchetypeArtifactId=karate-archetype \
-DarchetypeVersion=1.0.1 \
-DgroupId=br.inatel.c201-l1 \
-DartifactId=test \
--batch-mode

rm -rf ./test/src/test/java/examples/users

mkdir ./test/src/test/java/middleware/aluno

touch ./test/src/test/java/middleware/aluno/aluno.feature
