const getAllPets = `SELECT * FROM pets_table ORDER BY pets_id`;
const getPetById = `SELECT * FROM pets_table WHERE pets_id = $1`;
const addPet = "INSERT INTO pets_table (age, kind, name) VALUES ($1, $2, $3)";

module.exports = {
    getAllPets,
    getPetById,
    addPet
};