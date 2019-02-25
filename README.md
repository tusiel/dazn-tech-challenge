# The challenge

Build a service in Node.js that exposes an API which can be consumed from any client. This service must check how many video streams a given user is watching and prevent a user watching more than 3 video streams concurrently.

# Pre-requisites

- Docker

# Running the application

In a terminal, run `docker-compose up` which will:

- Build a `dazn-tech-challenge_app` image
- Build a `mongo` image
- Create a container for both images (`app` and `mongo` respectively) and runs them.

# Viewing the application

You can access the application using one of the available routes. The base URL is http://localhost:4000, unless the port is amended in the config file. 

- The `GET` request can be accessed through a browser.
- The `POST` and `DELETE` can only be used with an application such a Postman (https://www.getpostman.com/)

## Available Routes

- `POST /stream/:username` - Increments the stream count for the specified `username`. If the stream count is already 3; then an error, indicating the count has already been exhausted, will be returned.

- `GET /stream/:username`. Returns the database record for the specified `username`.

- `DELETE /stream/:username/`. Decrements the stream count for a specified `username` and `streamId`. If the stream count is already 0; then an error, indicating the count has already reached its minimum, will be returned.

# Scalability strategy

- Set-up multiple MongoDB servers/containers, working in a cluster, to improve availability and reduce strain on the database due to high load.

- Multiple application servers/containers could be spun up, sat behind a load-balancer to improve response times to the end user.

# Future improvements

- Implement a package like `nconf` for different environment settings.
- Implement a logger to help identify errors easier.
- Implemen other testing strategies such as `supertest` and an end-to-end testing strategy.
