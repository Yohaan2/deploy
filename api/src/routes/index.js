const express = require('express');
const allrecipe = require('./getRoutes/routeRecipe');
const RecipeByName = require('./getRoutes/routeRecipeByName');
const RecipeById = require('./getRoutes/routeRecibeById');
const postRecipe = require('./postRoutes/routeCreate');
const Diets = require('./getRoutes/routeDiets');

// const getRecipeById = require('../controllers/getRecipeById');
// const getRecipeByName = require('../controllers/getRecipeByName');
// const postRecipe = require('../controllers/postRecipe');
// const getDiets = require('../controllers/getDiets');
// const getRecipe = require('../controllers/getRecipe');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const server = express();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/recipe/name', async (req, res) => {
// 	getRecipeByName(req, res);
// });

server.use(allrecipe);
server.use(RecipeByName);
server.use(RecipeById);
server.use(postRecipe);
server.use(Diets);

// router.get('/recipe/:idRecipe', async (req, res) => {
// 	getRecipeById(req, res);
// });

// router.post('/recipe', async (req, res) => {
// 	postRecipe(req, res);
// });

// router.get('/diets', (req, res) => {
// 	getDiets(req, res);
// });
module.exports = server;
