import pokeapiService from "./pokeapi.service";
import PDFDocument from 'pdfkit';

class PokeApiPDFService {
    constructor() { }

    async makePDF(name: string) {

        const data = await pokeapiService.findByName(name);

        const doc = new PDFDocument();

        doc.fontSize(20).text(`Name: ${data.name}`);
        doc.fontSize(14).text(`Height: ${data.height}`);
        doc.fontSize(14).text(`Weight: ${data.weight}`);


        return doc;
    }
}

export default new PokeApiPDFService();