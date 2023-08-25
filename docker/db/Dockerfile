# Použijeme oficiální obraz MySQL
FROM mysql:latest

ENV MYSQL_INITDB_SCRIPT=/docker-entrypoint-initdb.d/init.sql

COPY ../../db/schema.sql $MYSQL_INITDB_SCRIPT