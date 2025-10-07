# Build stage
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom first for caching
COPY pom.xml ./
RUN mvn -q -e -B -DskipTests dependency:go-offline

# Copy sources
COPY src ./src

# Build jar
RUN mvn -q -e -B -DskipTests package

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app

# JVM memory opts via env (override in compose if needed)
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

COPY --from=build /app/target/*.jar /app/app.jar
EXPOSE 8080

ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]

