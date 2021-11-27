const RchilliCompany = require('../models/company.model')
const Company = require('../models/company2.model')

const { ObjectId } = require('mongodb');

/*
 * It creates a company in DB
 */
const createCompany = async (data) => {
  try {
    data.active = true;

    return await new Company(data).save();
  } catch (error) {
    throw error;
  }
};

/*
 * It looks for a company according to the name
 */
const getCompanyByName = async (name) => {
  try {
    return await Company.findOne({ name, active: true });
  } catch (error) {
    throw error;
  }
};

/*
 * It looks for a company according to the id
 */
const getCompanyById = async (id) => {
  try {
    return await Company.findOne({ '_id': new ObjectId(id), active: true });
  } catch (error) {
    throw error;
  }
};

/*
 * It looks for a company according to the domain
 */
const getCompanyByDomain = async (domain) => {
  try {
    return await Company.findOne({ domain, active: true });
  } catch (error) {
    throw error;
  }
};

/*
 * It looks for a company according to the domain or name
 */
const getCompanyByDomainOrName = async (name, domain) => {
  try {
    return await Company.findOne({
      $or: [
             { name },
             { domain }
           ],
      $and: [{ active: true }],
    });
  } catch (error) {
    throw error;
  }
};

/*
 * It updates the data of a company
 */
const updateCompanyById = async (id, data) => {
  try {
    return await Company.updateOne(
      { _id: id },
      {
        $set: {
          name: data.name,
          domain: data.domain,
        }
      }
    );
  } catch (error) {
    throw error;
  }
};

/*
 * It deletes a company
 */
const deleteCompanyById = async (id, data) => {
  try {
    return await Company.updateOne(
      { _id: id },
      {
        $set: {
          active: false,
        }
      }
    );
  } catch (error) {
    throw error;
  }
};

const createRecord = async function (rchilliData) {
  try {
    const rchilliRecord = new RchilliCompany(rchilliData)
    const response = await rchilliRecord.save()
    return response
  } catch (error) {
    throw validateError(error)
  }
}

const getByEmail = async function (email) {
  try {
    const response = await RchilliCompany.find({ email }).lean()
    return response
  } catch (error) {
    throw error
  }
}

module.exports = {
  createRecord,
  getByEmail,
  createCompany,
  getCompanyByName,
  getCompanyById,
  getCompanyByDomain,
  getCompanyByDomainOrName,
  updateCompanyById,
  deleteCompanyById,
};
