# 1. initial setting
```bash
npm install -g @nestjs/cli
nest new luniverse-nova-multichain-apis
cd luniverse-nova-multichain-apis

// todo setting prisma

# npm i pg typeorm @nestjs/typeorm @nestjs/config

# --- skip if git clone this repo and just npm install ---
```

# 1.1 skip version : how to run
```bash
npm install
npm run start:dev
```

---

# 2. How To Create the NestJs application
- e.g
    - module : apply
    - controller : handling HTTP Req
    - service : business code
```bash
nest g module users
nest g controller users
nest g service users
touch src/users/user.entity.ts
```
- import UsersModule in `app.module.ts`

# 3. User Entity ( TypeORM )
- `src/users/user.entity.ts`

# 4. User Service
- `src/users/users.service.ts`

# 5. User Controller
- `src/users/users.controller.ts`

# 5. User Module
- `src/users/users.module.ts`

# 6. Update the Main Module
- `src/app.module.ts`

# 7. Dockerize the application
```bash
docker compose up -d db
docker compose build
docker compose up 
```

# 8. connect postgres DB
- `DBeaver`

# 9. Test the application
- `postman`
