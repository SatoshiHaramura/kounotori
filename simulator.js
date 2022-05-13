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
    this.numOfOvumRetrieved = this.#referNumOfOvumRetrieved(user.amh)
    this.percentageOfCopayment = this.#calculatePercentageOfCopayment(user.isInsuranceCoverage)
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

    displaySimulationResultOfAssistedReproductiveTechnology(user) {
    console.log(`
    生殖補助医療における医療費のシミュレーション結果
    ==============================================================` +
      `
      医療費の総額`.padEnd(39, ' ') + `: ${this.#formatYen(this.#calculateTotalMedicalExpenseOfCopayment(this.#calculateTotalMedicalRemunerationPoint()))} (${this.#formatRateOfCopayment()}負担)

      内訳` +
        `
        ・採卵術`.padEnd(41, ' ') + `: ${this.#formatYen(this.#calculateMedicalExpenseOfCopayment(Simulator.POINT_OF_OVUM_RETRIEVE_TECHNIQUE))}` +
        `
        ・採卵個数(${this.#formatQuantity(this.numOfOvumRetrieved)})`.padEnd(39, ' ') + `: ${this.#formatYen(this.#calculateMedicalExpenseOfCopayment(this.#referPointOfOvumRetrieved()))}` +
        `
        ・体外受精(${this.#formatQuantity(this.#calculateNumOfInVitroFertilization())})と顕微授精(${this.#formatQuantity(this.#calculateNumOfIntracytoplasmicSpermInjection())})を併用: ${this.#formatYen(this.#calculateMedicalExpenseOfCopayment(this.#calculatePointOfSplitInsemination()))}` +
        `
        ・受精卵培養個数(${this.#formatQuantity(this.#calculateNumOfFertilizedOvum())})`.padEnd(36, ' ') + `: ${this.#formatYen(this.#calculateMedicalExpenseOfCopayment(this.#referPointOfFertilizedOvum()))}` +
        `
        ・初期胚培養個数(${this.#formatQuantity(this.#calculateNumOfBlastocyst())})`.padEnd(36, ' ') + `: ${this.#formatYen(this.#calculateMedicalExpenseOfCopayment(this.#referPointOfEarlyEmbryoCultivated()))}` +
        `
        ・胚凍結保存個数(${this.#formatQuantity(this.#calculateNumOfBlastocyst())})`.padEnd(36, ' ') + `: ${this.#formatYen(this.#calculateMedicalExpenseOfCopayment(this.#referPointOfEmbryoFreezePreservation()))}` +
        `
        ・凍結胚移植`.padEnd(39, ' ') +  `: ${this.#formatYen(this.#calculateMedicalExpenseOfCopayment(Simulator.POINT_OF_FROZEN_EMBRYO_TRANSFER))}` +
        `
        ・その他(診察/検査/薬剤/注射代など)`.padEnd(30, ' ') +  `: ${this.#formatYen(Simulator.OTHER_MEDICAL_EXPENSE * this.percentageOfCopayment)}
        ` +
      `
      ----------------------------------------------------------
      シミュレーションの条件
        ・ご本人様
          ・年齢    : ${user.age}歳
          ・AMH値   : ${user.amh}
          ・負担割合: ${this.#formatRateOfCopayment()}

        ・治療内容
          ・排卵誘発方法: 未設定(主治医とご相談ください)
          ・授精方法    : 体外受精と顕微授精を併用
          ・培養方針    : 胚盤胞に育つまで培養
          ・胚凍結保存  : 全て保存する(胚盤胞のみを保存)
          ・胚移植方法  : 凍結胚移植

      ----------------------------------------------------------
      ご留意事項
        ・その他(検査料/薬剤料/注射代など)の費用につきましては
          ご本人様ごとの治療方法で異なることをご了承ください。
          (概算で${this.#formatYen(Simulator.OTHER_MEDICAL_EXPENSE * this.percentageOfCopayment)}程度は必要になるかと思われます)
    ==============================================================
    `)
  }

  calculateMaximumCopayment(user) {
    const minimum = this.#referMinimumOfCopayment(user.classificationOfHighCostMedicalExpenseBenefit)

    if (((user.classificationOfHighCostMedicalExpenseBenefit === 1) || (user.classificationOfHighCostMedicalExpenseBenefit === 2)) && (this.#calculateTotalMedicalExpense(this.#calculateTotalMedicalRemunerationPoint()) > (minimum / (Simulator.PERCENTAGE_OF_INSURANCE_COVERAGE / 100)))) {
      return minimum
    } else if (((user.classificationOfHighCostMedicalExpenseBenefit === 3) || (user.classificationOfHighCostMedicalExpenseBenefit === 4) || (user.classificationOfHighCostMedicalExpenseBenefit === 5)) && (this.#calculateTotalMedicalExpense(this.#calculateTotalMedicalRemunerationPoint()) > (minimum / (Simulator.PERCENTAGE_OF_INSURANCE_COVERAGE / 100)))) {
      return minimum + (this.#calculateTotalMedicalExpense(this.#calculateTotalMedicalRemunerationPoint()) - (minimum / (Simulator.PERCENTAGE_OF_INSURANCE_COVERAGE / 100))) * (1 / 100)
    }
    return false
  }

  displaySimulationResultOfAvailableHighCostMedicalExpenseBenefit(user) {
    console.log(`
    高額療養費制度を利用したシミュレーション結果
    ==============================================================
      医療費の総額  : ${this.#formatYen(this.#calculateTotalMedicalExpenseOfCopayment(this.#calculateTotalMedicalRemunerationPoint()))} (${this.#formatRateOfCopayment()}負担)
      軽減される額  : ${this.#formatYen(this.#calculateReducedCopayment(user))}
      ----------------------------------------------------------
      自己負担限度額: ${this.#formatYen(this.calculateMaximumCopayment(user))} (ひと月)
    ==============================================================
    `)
  }

  displaySimulationResultOfUnavailableHighCostMedicalExpenseBenefit(user) {
    console.log(`
    医療費の総額(${this.#formatYen(this.#calculateTotalMedicalExpenseOfCopayment(this.#calculateTotalMedicalRemunerationPoint()))})が自己負担限度額(${this.#formatYen(this.#referMinimumOfCopayment(user.classificationOfHighCostMedicalExpenseBenefit))})を
    超えていないため、高額療養費制度をご利用できません。`)
  }

  #referNumOfOvumRetrieved(amh) {
    if (amh < 0.5) return 2.04
    else if (0.5 <= amh && amh < 1.0) return 3.61
    else if (1.0 <= amh && amh < 1.5) return 5.45
    else if (1.5 <= amh && amh < 2.0) return 6.82
    else if (2.0 <= amh && amh < 2.5) return 8.63
    else if (2.5 <= amh && amh < 3.0) return 10.92
    else if (3.0 <= amh ) return 13.50
  }

  #calculateNumOfInVitroFertilization() {
    return Math.floor(this.numOfOvumRetrieved / 2)
  }

  #calculateNumOfIntracytoplasmicSpermInjection() {
    return Math.floor(this.numOfOvumRetrieved - this.#calculateNumOfInVitroFertilization())
  }

  #calculateNumOfFertilizedOvum() {
    return this.numOfOvumRetrieved * (Simulator.PERCENTAGE_OF_FERTILIZED_OVUM / 100)
  }

  #calculateNumOfBlastocyst() {
    let numOfBlastocyst = this.numOfOvumRetrieved * (Simulator.PERCENTAGE_OF_BLASTOCYST / 100)
    return (numOfBlastocyst < 1) ? numOfBlastocyst = 1 : numOfBlastocyst
  }

  #referPointOfOvumRetrieved() {
    const num = this.numOfOvumRetrieved
    if (1 <= num && num < 2) return 2400
    else if (2 <= num && num < 6) return 3600
    else if (6 <= num && num < 10) return 5500
    else if (10 <= num) return 7200
  }

  #referPointOfIntracytoplasmicSpermInjection() {
    const num = this.#calculateNumOfIntracytoplasmicSpermInjection()
    if (1 <= num && num < 2) return 4800
    else if (2 <= num && num < 6) return 6800
    else if (6 <= num && num < 10) return 10000
    else if (10 <= num) return 12800
  }

  #calculatePointOfSplitInsemination() {
    return (Simulator.POINT_OF_IN_VITRO_FERTILIZATION * (50 / 100)) + this.#referPointOfIntracytoplasmicSpermInjection()
  }

  #referPointOfFertilizedOvum() {
    const num = this.#calculateNumOfFertilizedOvum()
    if (1 <= num && num < 2) return 4500
    else if (2 <= num && num < 6) return 6000
    else if (6 <= num && num < 10) return 8400
    else if (10 <= num) return 10500
  }

  #referPointOfEarlyEmbryoCultivated() {
    const num = this.#calculateNumOfBlastocyst()
    if (1 <= num && num < 2) return 1500
    else if (2 <= num && num < 6) return 2000
    else if (6 <= num && num < 10) return 2500
    else if (10 <= num) return 3000
  }

  #referPointOfEmbryoFreezePreservation() {
    const num = this.#calculateNumOfBlastocyst()
    if (1 <= num && num < 2) return 5000
    else if (2 <= num && num < 6) return 7000
    else if (6 <= num && num < 10) return 10200
    else if (10 <= num) return 13000
  }

  #calculateTotalMedicalRemunerationPoint() {
    return Simulator.POINT_OF_OVUM_RETRIEVE_TECHNIQUE
      + this.#referPointOfOvumRetrieved()
      + this.#calculatePointOfSplitInsemination()
      + this.#referPointOfFertilizedOvum()
      + this.#referPointOfEarlyEmbryoCultivated()
      + this.#referPointOfEmbryoFreezePreservation()
      + Simulator.POINT_OF_FROZEN_EMBRYO_TRANSFER
  }

  #calculatePercentageOfCopayment(isInsuranceCoverage) {
    return isInsuranceCoverage ? (Simulator.PERCENTAGE_OF_INSURANCE_COVERAGE / 100) : (Simulator.PERCENTAGE_OF_NOT_INSURANCE_COVERAGE / 100)
  }

  #calculateMedicalExpense(medicalRemunerationPoint) {
    return medicalRemunerationPoint * Simulator.MEDICAL_EXPENSE_PER_MEDICAL_REMUNERATION_POINT
  }

  #calculateMedicalExpenseOfCopayment(medicalRemunerationPoint) {
    return this.#calculateMedicalExpense(medicalRemunerationPoint) * this.percentageOfCopayment
  }

  #calculateTotalMedicalExpense(medicalRemunerationPoint) {
    return this.#calculateMedicalExpense(medicalRemunerationPoint) + Simulator.OTHER_MEDICAL_EXPENSE
  }

  #calculateTotalMedicalExpenseOfCopayment(medicalRemunerationPoint) {
    return this.#calculateTotalMedicalExpense(medicalRemunerationPoint) * this.percentageOfCopayment
  }

  #formatYen(medicalExpense) {
    return `¥` + `${medicalExpense.toLocaleString()}`.padStart(7, ' ')
  }

  #formatQuantity(quantity) {
    return `${Math.floor(quantity)}個`
  }

  #formatRateOfCopayment() {
    return `${this.percentageOfCopayment * 10}割`
  }

  #referMinimumOfCopayment(classificationOfHighCostMedicalExpenseBenefit) {
    if (classificationOfHighCostMedicalExpenseBenefit === 1) return 35400
    else if (classificationOfHighCostMedicalExpenseBenefit === 2) return 57600
    else if (classificationOfHighCostMedicalExpenseBenefit === 3) return 80100
    else if (classificationOfHighCostMedicalExpenseBenefit === 4) return 167400
    else if (classificationOfHighCostMedicalExpenseBenefit === 5) return 252600
  }

  #calculateReducedCopayment(classificationOfHighCostMedicalExpenseBenefit) {
    return this.#calculateTotalMedicalExpenseOfCopayment(this.#calculateTotalMedicalRemunerationPoint()) - this.calculateMaximumCopayment(classificationOfHighCostMedicalExpenseBenefit)
  }
}

module.exports = { Simulator }
