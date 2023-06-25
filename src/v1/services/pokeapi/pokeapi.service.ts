import ApiError from "../../../includes/library/api.error.library";
import config from "../../../includes/config/config";
import _ from "lodash";
import HttpStatus from 'http-status'


class PokeApiService {

    constructor() { }

    async findAll(limit: number = 20, page: number = 1, search: any = null) {
        const urlParams = new URLSearchParams();

        if (limit) {
            urlParams.append('limit', String(limit));
        }

        if (page) {
            urlParams.append('offset', String((page - 1) * limit));
        }

        const response = await fetch(`${config.pokeapi.url}/pokemon?${urlParams.toString()}`);
        const data = await response.json();

        if (search) {
            data.results = _.filter(data.results, obj => _.startsWith(obj.name.toLowerCase(), search));
        }

        data.results = _.orderBy(data.results, ['name']);

        return data;
    }

    async findByName(name: string) {
        try {
            const response = await fetch(`${config.pokeapi.url}/pokemon/${name}`);
            const data = await response.json();

            return data;
        } catch (error) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "No se encontro el pokemon seleccionado.");
        }
    }
}

export default new PokeApiService();