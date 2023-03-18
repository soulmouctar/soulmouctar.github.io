FROM python:3.9.16-alpine
LABEL maintainer="SOULEYMANE MOUCTAR"
WORKDIR /app
RUN pip install mkdocs 
COPY . /app
RUN mkdocs build
WORKDIR /app/site
# ENTRYPOINT mkdocs serve
EXPOSE 8000
CMD python -m http.server 8000
# CMD mkdocs serve -a 0.0.0.0:8000