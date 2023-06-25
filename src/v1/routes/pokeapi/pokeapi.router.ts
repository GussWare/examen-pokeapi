import express from 'express'
import PokeApiController from '../../controllers/pokeapi/pokeapi.controller'
import catchAsyncHelper from '../../../includes/helpers/error.helper';
import * as PokeValidation from "../../validations/pokeapi/pokeapi.validation"

const router = express.Router()

router.get('/find', catchAsyncHelper(PokeApiController.findAll));
router.get('/find/:name', [PokeValidation.makePDF], catchAsyncHelper(PokeApiController.findByName));
router.post('/make-pdf', [PokeValidation.makePDF], catchAsyncHelper(PokeApiController.makePdf));

export default router
