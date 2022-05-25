#!/usr/bin/env node

const { User } = require('./user.js')
const { Simulator } = require('./simulator.js')
const { Terminal } = require('./terminal.js')
const { agePrompt,
  confirmAmhPrompt,
  amhPrompt,
  confirmHighCostMedicalExpenseBenefitPrompt,
  classificationOfHighCostMedicalExpenseBenefitPrompt
} = require('./prompt.js')

async function main() {
  const age = await agePrompt.run()
  const amh = await confirmAmhPrompt.run() ? await amhPrompt.run() : Simulator.referAntiMullerianHormone(age)

  const user = new User(age, amh)
  const simulator = new Simulator(user)
  const terminal = new Terminal(simulator)

  terminal.displayAssistedReproductiveTechnology()

  if (user.isInsuranceCoverage && await confirmHighCostMedicalExpenseBenefitPrompt.run()) {
    user.classificationOfHighCostMedicalExpenseBenefit = await classificationOfHighCostMedicalExpenseBenefitPrompt.run()
    simulator.calculateMaximumCopayment() ? terminal.displayAvailableHighCostMedicalExpenseBenefit() : terminal.displayUnavailableHighCostMedicalExpenseBenefit()
  }
}

main()
