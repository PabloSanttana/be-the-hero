const requet = require("supertest");
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG',()=>{
    beforeEach( async ()=>{
       await connection.migrate.rollback(); // limpar BD
       await connection.migrate.latest();
    });

    afterAll( async ()=>{
       await connection.destroy();
    })

    it('should be able to create a new ONG', async()=>{
        const response = await requet(app)
                        .post('/ongs')
                        .send({
                            name: "test automatico",
	                        email: "teste@gmail.com",
	                        whatsapp: "84900000000",
	                        city: "teste city",
	                        uf:"ts"
                        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8); 
    })
})