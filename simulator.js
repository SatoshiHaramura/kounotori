class Simulator {
  static PERCENTAGE_OF_FERTILIZED_OVUM = 60
  static PERCENTAGE_OF_BLASTOCYST = 30

  static MEDICAL_EXPENSE_PER_MEDICAL_REMUNERATION_POINT = 10
  static POINT_OF_OVUM_RETRIEVE_TECHNIQUE = 3200
  static POINT_OF_IN_VITRO_FERTILIZATION = 4200
  static POINT_OF_FROZEN_EMBRYO_TRANSFER = 12000

  static PERCENTAGE_OF_INSURANCE_COVERAGE = 30
  static PERCENTAGE_OF_NOT_INSURANCE_COVERAGE = 100

  static OTHER_MEDICAL_EXPENSE = 300000

  constructor(user) {
    this.user = user

    this.numOfOvumRetrieved = this.#referNumOfOvumRetrieved()
    this.percentageOfCopayment = this.#calculatePercentageOfCopayment()
  }

  static referAntiMullerianHormone(age) {
    if (age <= 27) return 4.69
    else if (age === 28) return 4.27
    else if (age === 29) return 4.14
    else if (age === 30) return 4.02
    else if (age === 31) return 3.85
    else if (age === 32) return 3.54
    else if (age === 33) return 3.32
    else if (age === 34) return 3.14
    else if (age === 35) return 2.62
    else if (age === 36) return 2.50
    else if (age === 37) return 2.27
    else if (age === 38) return 1.90
    else if (age === 39) return 1.80
    else if (age === 40) return 1.47
    else if (age === 41) return 1.30
    else if (age === 42) return 1.00
    else if (age === 43) return 0.72
    else if (age === 44) return 0.66
    else if (age === 45) return 0.41
    else if (46 <= age) return 0.30
  }

  calculateMaximumCopayment() {
    const minimum = this.referMinimumOfCopayment()

    if (((this.user.classificationOfHighCostMedicalExpenseBenefit === 1) || (this.user.classificationOfHighCostMedicalExpenseBenefit === 2)) && (this.calculateTotalMedicalExpense(this.calculateTotalMedicalRemunerationPoint()) > (minimum / (Simulator.PERCENTAGE_OF_INSURANCE_COVERAGE / 100)))) {
      return minimum
    } else if (((this.user.classificationOfHighCostMedicalExpenseBenefit === 3) || (this.user.classificationOfHighCostMedicalExpenseBenefit === 4) || (this.user.classificationOfHighCostMedicalExpenseBenefit === 5)) && (this.calculateTotalMedicalExpense(this.calculateTotalMedicalRemunerationPoint()) > (minimum / (Simulator.PERCENTAGE_OF_INSURANCE_COVERAGE / 100)))) {
      return minimum + (this.calculateTotalMedicalExpense(this.calculateTotalMedicalRemunerationPoint()) - (minimum / (Simulator.PERCENTAGE_OF_INSURANCE_COVERAGE / 100))) * (1 / 100)
    }
    return false
  }

  calculateNumOfInVitroFertilization() {
    return Math.floor(this.numOfOvumRetrieved / 2)
  }

  calculateNumOfIntracytoplasmicSpermInjection() {
    return Math.floor(this.numOfOvumRetrieved - this.calculateNumOfInVitroFertilization())
  }

  calculateNumOfFertilizedOvum() {
    return this.numOfOvumRetrieved * (Simulator.PERCENTAGE_OF_FERTILIZED_OVUM / 100)
  }

  calculateNumOfBlastocyst() {
    let numOfBlastocyst = this.numOfOvumRetrieved * (Simulator.PERCENTAGE_OF_BLASTOCYST / 100)
    return (numOfBlastocyst < 1) ? numOfBlastocyst = 1 : numOfBlastocyst
  }

  referPointOfOvumRetrieved() {
    const num = this.numOfOvumRetrieved
    if (1 <= num && num < 2) return 2400
    else if (2 <= num && num < 6) return 3600
    else if (6 <= num && num < 10) return 5500
    else if (10 <= num) return 7200
  }

  calculatePointOfSplitInsemination() {
    return (Simulator.POINT_OF_IN_VITRO_FERTILIZATION * (50 / 100)) + this.#referPointOfIntracytoplasmicSpermInjection()
  }

  referPointOfFertilizedOvum() {
    const num = this.calculateNumOfFertilizedOvum()
    if (1 <= num && num < 2) return 4500
    else if (2 <= num && num < 6) return 6000
    else if (6 <= num && num < 10) return 8400
    else if (10 <= num) return 10500
  }

  referPointOfEarlyEmbryoCultivated() {
    const num = this.calculateNumOfBlastocyst()
    if (1 <= num && num < 2) return 1500
    else if (2 <= num && num < 6) return 2000
    else if (6 <= num && num < 10) return 2500
    else if (10 <= num) return 3000
  }

  referPointOfEmbryoFreezePreservation() {
    const num = this.calculateNumOfBlastocyst()
    if (1 <= num && num < 2) return 5000
    else if (2 <= num && num < 6) return 7000
    else if (6 <= num && num < 10) return 10200
    else if (10 <= num) return 13000
  }

  calculateTotalMedicalRemunerationPoint() {
    return Simulator.POINT_OF_OVUM_RETRIEVE_TECHNIQUE
      + this.referPointOfOvumRetrieved()
      + this.calculatePointOfSplitInsemination()
      + this.referPointOfFertilizedOvum()
      + this.referPointOfEarlyEmbryoCultivated()
      + this.referPointOfEmbryoFreezePreservation()
      + Simulator.POINT_OF_FROZEN_EMBRYO_TRANSFER
  }

  calculateMedicalExpense(medicalRemunerationPoint) {
    return medicalRemunerationPoint * Simulator.MEDICAL_EXPENSE_PER_MEDICAL_REMUNERATION_POINT
  }

  calculateMedicalExpenseOfCopayment(medicalRemunerationPoint) {
    return this.calculateMedicalExpense(medicalRemunerationPoint) * this.percentageOfCopayment
  }

  calculateTotalMedicalExpense(medicalRemunerationPoint) {
    return this.calculateMedicalExpense(medicalRemunerationPoint) + Simulator.OTHER_MEDICAL_EXPENSE
  }

  calculateTotalMedicalExpenseOfCopayment(medicalRemunerationPoint) {
    return this.calculateTotalMedicalExpense(medicalRemunerationPoint) * this.percentageOfCopayment
  }

  referMinimumOfCopayment() {
    const classification = this.user.classificationOfHighCostMedicalExpenseBenefit
    if (classification === 1) return 35400
    else if (classification === 2) return 57600
    else if (classification === 3) return 80100
    else if (classification === 4) return 167400
    else if (classification === 5) return 252600
  }

  calculateReducedCopayment() {
    return this.calculateTotalMedicalExpenseOfCopayment(this.calculateTotalMedicalRemunerationPoint()) - this.calculateMaximumCopayment()
  }

  #referNumOfOvumRetrieved() {
    const amh = this.user.amh
    if (amh < 0.5) return 2.04
    else if (0.5 <= amh && amh < 1.0) return 3.61
    else if (1.0 <= amh && amh < 1.5) return 5.45
    else if (1.5 <= amh && amh < 2.0) return 6.82
    else if (2.0 <= amh && amh < 2.5) return 8.63
    else if (2.5 <= amh && amh < 3.0) return 10.92
    else if (3.0 <= amh ) return 13.50
  }

  #calculatePercentageOfCopayment() {
    return this.user.isInsuranceCoverage ? (Simulator.PERCENTAGE_OF_INSURANCE_COVERAGE / 100) : (Simulator.PERCENTAGE_OF_NOT_INSURANCE_COVERAGE / 100)
  }

  #referPointOfIntracytoplasmicSpermInjection() {
    const num = this.calculateNumOfIntracytoplasmicSpermInjection()
    if (1 <= num && num < 2) return 4800
    else if (2 <= num && num < 6) return 6800
    else if (6 <= num && num < 10) return 10000
    else if (10 <= num) return 12800
  }
}

module.exports = { Simulator }
