const {
  getCompanyByDomainOrName,
  createCompany,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
} = require('../repositories/company.repository');

/*
 * It creates a company after verifying that it could be created
 */
const createNewCompany = async(companyData) => {
  try {
    // Verify whether or not a company with the same name already exists
    const previousCompany = await getCompanyByDomainOrName(companyData.name, companyData.domain);
    if (previousCompany) throw 'A company with the same name or domain already exists'

    // Create company
    return await createCompany(companyData);
  } catch (error) {
    throw error;
  }
};

/*
 * It looks for a company according to its id
 */
const readCompanyData = async(id) => {
  try {
    const company = await getCompanyById(id);
    if (!company) throw 'The company does not exist';

    return company;
  } catch (error) {
    throw error;
  }
};

/*
 * It looks for a company according to its id
 */
const updateCompanyData = async(id, companyData) => {
  try {
    const [company, duplicatedData] = await Promise.all([
      getCompanyById(id),
      getCompanyByDomainOrName(companyData.name, companyData.domain),
    ]);
    if (!company) throw 'The company does not exist';
    if (duplicatedData) throw 'There is already a company with similar data';

    return await updateCompanyById(id, companyData);
  } catch (error) {
    throw error;
  }
};

/*
 * It looks for a company according to its id
 */
const deleteCompany = async(id) => {
  try {
    const company = await getCompanyById(id);
    if (!company) throw 'The company does not exist';

    await deleteCompanyById(id);

    return { result: 'The company has been deleted' };
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createNewCompany,
  readCompanyData,
  updateCompanyData,
  deleteCompany,
};
