# Quiz App

## Requirement
- node 18
- npm 9
- postgres 14

## Instalation (development)
1. `npm install`
2. copy .env.example to .env fill based on your postgres configuration
3. migrate database `npx prisma migrate dev`
4. seed database `npx prima db seed`
4. run the application `npm run dev`

## TODO
- [ ] E2E testing using playwright
- [ ] redirect to quiz after login if user not login yet
- [ ] show score to user
- [ ] Better Home Page to describe what quiz app is
