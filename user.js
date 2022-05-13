class User {
  constructor(age, amh) {
    this.age = age
    this.amh = amh
    this.isInsuranceCoverage = (age < 43) ? true : false
    this.classificationOfHighCostMedicalExpenseBenefit = undefined
  }
}

module.exports = { User }
