const { Simulator } = require('./simulator.js')

class Terminal {
  constructor(simulator) {
    this.simulator = simulator
  }

  displayAssistedReproductiveTechnology() {
    console.log(`
    生殖補助医療における医療費のシミュレーション結果
    ==============================================================` +
      `
      医療費の総額`.padEnd(39, ' ') + `: ${this.#formatYen(this.simulator.calculateTotalMedicalExpenseOfCopayment(this.simulator.calculateTotalMedicalRemunerationPoint()))} (${this.#formatRateOfCopayment()}負担)

      内訳` +
        `
        ・採卵術`.padEnd(41, ' ') + `: ${this.#formatYen(this.simulator.calculateMedicalExpenseOfCopayment(Simulator.POINT_OF_OVUM_RETRIEVE_TECHNIQUE))}` +
        `
        ・採卵個数(${this.#formatQuantity(this.simulator.numOfOvumRetrieved)})`.padEnd(39, ' ') + `: ${this.#formatYen(this.simulator.calculateMedicalExpenseOfCopayment(this.simulator.referPointOfOvumRetrieved()))}` +
        `
        ・体外受精(${this.#formatQuantity(this.simulator.calculateNumOfInVitroFertilization())})と顕微授精(${this.#formatQuantity(this.simulator.calculateNumOfIntracytoplasmicSpermInjection())})を併用: ${this.#formatYen(this.simulator.calculateMedicalExpenseOfCopayment(this.simulator.calculatePointOfSplitInsemination()))}` +
        `
        ・受精卵培養個数(${this.#formatQuantity(this.simulator.calculateNumOfFertilizedOvum())})`.padEnd(36, ' ') + `: ${this.#formatYen(this.simulator.calculateMedicalExpenseOfCopayment(this.simulator.referPointOfFertilizedOvum()))}` +
        `
        ・初期胚培養個数(${this.#formatQuantity(this.simulator.calculateNumOfBlastocyst())})`.padEnd(36, ' ') + `: ${this.#formatYen(this.simulator.calculateMedicalExpenseOfCopayment(this.simulator.referPointOfEarlyEmbryoCultivated()))}` +
        `
        ・胚凍結保存個数(${this.#formatQuantity(this.simulator.calculateNumOfBlastocyst())})`.padEnd(36, ' ') + `: ${this.#formatYen(this.simulator.calculateMedicalExpenseOfCopayment(this.simulator.referPointOfEmbryoFreezePreservation()))}` +
        `
        ・凍結胚移植`.padEnd(39, ' ') +  `: ${this.#formatYen(this.simulator.calculateMedicalExpenseOfCopayment(Simulator.POINT_OF_FROZEN_EMBRYO_TRANSFER))}` +
        `
        ・その他(診察/検査/薬剤/注射代など)`.padEnd(30, ' ') +  `: ${this.#formatYen(Simulator.OTHER_MEDICAL_EXPENSE * this.simulator.percentageOfCopayment)}
        ` +
      `
      ----------------------------------------------------------
      シミュレーションの条件
        ・ご本人様
          ・年齢    : ${this.simulator.user.age}歳
          ・AMH値   : ${this.simulator.user.amh}
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
          (概算で${this.#formatYen(Simulator.OTHER_MEDICAL_EXPENSE * this.simulator.percentageOfCopayment)}程度は必要になるかと思われます)
    ==============================================================
    `)
  }

  displayAvailableHighCostMedicalExpenseBenefit() {
    console.log(`
    高額療養費制度を利用したシミュレーション結果
    ==============================================================
      医療費の総額  : ${this.#formatYen(this.simulator.calculateTotalMedicalExpenseOfCopayment(this.simulator.calculateTotalMedicalRemunerationPoint()))} (${this.#formatRateOfCopayment()}負担)
      軽減される額  : ${this.#formatYen(this.simulator.calculateReducedCopayment())}
      ----------------------------------------------------------
      自己負担限度額: ${this.#formatYen(this.simulator.calculateMaximumCopayment())} (ひと月)
    ==============================================================
    `)
  }

  displayUnavailableHighCostMedicalExpenseBenefit() {
    console.log(`
    医療費の総額(${this.#formatYen(this.simulator.calculateTotalMedicalExpenseOfCopayment(this.simulator.calculateTotalMedicalRemunerationPoint()))})が自己負担限度額(${this.#formatYen(this.simulator.referMinimumOfCopayment())})を
    超えていないため、高額療養費制度をご利用できません。`)
  }

  #formatYen(medicalExpense) {
    return `¥` + `${medicalExpense.toLocaleString()}`.padStart(7, ' ')
  }

  #formatQuantity(quantity) {
    return `${Math.floor(quantity)}個`
  }

  #formatRateOfCopayment() {
    return `${this.simulator.percentageOfCopayment * 10}割`
  }
}

module.exports = { Terminal }
