<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Production deploy

  1. Clone repository
  
  2. Exec:
  ```
  npm install
  ```

  3. Install Nest CLI
  ```
  npm i -g @nestjs/cli
  ```

  4. Up MongoDB & Redis
  ```
  docker-compose up -d
  ```

  5. Exec dev
  ```
  npm run start:dev
  ```

  6. Navigater to
  ```
  http://localhost:3000
  ```