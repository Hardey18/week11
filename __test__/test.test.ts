import app from "../app";
import supertest from "supertest";
import { doesNotMatch } from "assert";
import { Response } from "express";
import mongoose from 'mongoose';

beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})

const request: any = supertest(app);
describe("Test all routes", () => {
  it("Test Status code for Correct Query", async () => {
    try {
      const response = request("/graphql2")
        .post("/graphql")
        .send({ query: "{organizations{ceo}}" })
        .expect(200);
    } catch (error) {
      console.log(`error ${error.toString()}`);
    }
  });

  it("Test Status code for Wrong Query", async (done) => {
    request.post("/graphql")
        .send({ query: "{organizations{cu}}" })
        .expect(400)
        .end((err,res:Response)=>{
          if(err) done(err)
          expect(res.status).toBe(400)
          done()
    });
  })
  it("Gets all organizations", async (done) => {
    request
      .post("/graphql2")
      .send({ query: "{organizations{organization}}" })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if(err) done(err)
        expect(res.body).toBeInstanceOf(Object);
        done();
      });
  });

  it("Get Organization using ID", async (done) => {
    request
      .post("/graphql2")
      .send({
        query:
          '{ organization(id: "5f722f3e8eb09e3bbe184512") { organization address country id } }',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        let val = res.body.data.organization;
        expect(val).toHaveProperty("address", "lekki, ajah")
        expect(val).toHaveProperty("organization", "Node Ninja");
        done();
      });
  });

  it("Add new Organization", async (done) => {
    request
      .post("/graphql2")
      .send({
        query:
          'mutation{addOrganization(organization: "Facebook Inc.", ceo: "Robert", country: "Germany", marketValue: "12%", employees: ["Clark", "Martin"], products: ["React", "Native"], address: "Oshogbo") { id organization address country }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let val = res.body.data.addOrganization;
        expect(val).toHaveProperty("address", "Oshogbo")
        expect(val).toHaveProperty("organization", "Facebook Inc.");
        done();
      });
    });
    
    it("Update Organization", async (done) => {
      request
      .post("/graphql2")
      .send({
        query:
        'mutation{updateOrganization(organization: "Facebook Inc.", ceo: "Mugabe", country: "Nigeria", products: ["first", "second"], employees: ["React", "Computer"], marketValue: "25%", address: "Lagos") { ceo country }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        console.log(res.body);
        let val = res.body.data.updateOrganization;
        expect(val).toHaveProperty("ceo", "Mugabe")
        expect(val).toHaveProperty("country", "Nigeria")
        done();
      });
  });

  it("Delete Organization", async (done) => {
    request
      .post("/graphql2")
      .send({
        query:
          'mutation{deleteOrganization(organization: "Facebook Inc.") { id organization ceo country }}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let val = res.body.data.deleteOrganization;
        expect(val).toHaveProperty("organization", "Facebook Inc.")
        expect(val).toHaveProperty("country", "Nigeria")
        done();
      });
  });
});