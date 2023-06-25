import express from 'express'
import pokeapiRoute from "./pokeapi.router"

const router = express.Router()

const defaultRoutes = [
  {
    path: '/v1/pokemon',
    route: pokeapiRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;