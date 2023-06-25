import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import _ from "lodash";
import pokeApiService from '../../services/pokeapi/pokeapi.service';
import pokeApiPDFService from '../../services/pokeapi/pokeapi.pdf.service';

class PokeApiController {


    async findAll(req: Request, res: Response) {
        const limit = _.toNumber(req.query.limit);
        const page = _.toNumber(req.query.page);
        const search = req.query.search;

        const response = await pokeApiService.findAll(limit, page, search);

        res.status(HttpStatus.OK).send(response);
    }

    async findByName(req: Request, res: Response) {
        const { name } = req.params;

        const response = await pokeApiService.findByName(name);

        res.status(HttpStatus.OK).send(response);
    }

    async makePdf(req: Request, res: Response) {
        const { name } = req.body;
        const doc = await pokeApiPDFService.makePDF(name);

        res.setHeader('Content-Type', 'application/pdf');

        doc.pipe(res);
        doc.end();
    }
}

export default new PokeApiController()