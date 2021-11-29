const express = require('express');
const router = express.Router();
const { createNewCompany, readCompanyData, updateCompanyData, deleteCompany } = require('../services/company');
const { newCompanySchema } = require('../schemas/company');
const { joiValidation } = require('../middlewares');

/*
 * POST /company
 * It creates a company
 */
router.post('/', joiValidation(newCompanySchema), async (req, res) => {
  try {
    const company = await createNewCompany(req.body);
    res.send(company);
  } catch (error) {
    console.log('Error: ', error);
    res.send({ error }).status(400);
  }
});

/*
 * GET /company
 * It looks for a company data
 */
router.get('/:id', async (req, res) => {
  try {
    const company = await readCompanyData(req.params.id);
    res.send(company);
  } catch (error) {
    console.log('Error: ', error);
    res.send({ error }).status(400);
  }
});

/*
 * PUT /company
 * It updates data of a company
 */
router.put('/:id', joiValidation(newCompanySchema), async (req, res) => {
  try {
    const company = await updateCompanyData(req.params.id, req.body);
    res.send(company);
  } catch (error) {
    console.log('Error: ', error);
    res.send({ error }).status(400);
  }
});

/*
 * DELETE /company
 * It deltes a company logically
 */
router.delete('/:id', async (req, res) => {
  try {
    const company = await deleteCompany(req.params.id);
    res.send(company);
  } catch (error) {
    console.log('Error: ', error);
    res.send({ error }).status(400);
  }
});

module.exports = router
