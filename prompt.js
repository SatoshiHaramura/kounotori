const { NumberPrompt, Select } = require('enquirer')

const agePrompt = new NumberPrompt({
  message: '年齢を入力してください',
  hint: '18 ~ 69歳の範囲で入力してください',
  validate (value) { return (18 <= value && value <= 69) ? true : '18 ~ 69歳の範囲で入力してください' }
})

const confirmAmhPrompt = new Select({
  message: 'AMH値の測定はお済みでしょうか?',
  choices: [{ name: 'はい', value: true }, { name: 'いいえ', value: false }],
  result () {
    return this.focused.value
  }
})

const amhPrompt = new NumberPrompt({
  message: 'AMH値を入力してください',
  hint: '0より大きい値を入力してください',
  validate (value) { return (0 < value) ? true : '0より大きい値を入力してください' }
})

const confirmHighCostMedicalExpenseBenefitPrompt = new Select({
  message: '高額療養費制度の利用をご検討されますか?',
  choices: [{ name: 'はい', value: true }, { name: 'いいえ', value: false }],
  result () {
    return this.focused.value
  }
})

const classificationOfHighCostMedicalExpenseBenefitPrompt = new Select({
  message: '適用区分を選択してください',
  choices: [
    { name: '住民税が非課税の方', value: 1 },
    { name: '年収370万円未満', value: 2 },
    { name: '年収370万円以上 ~ 770万円未満', value: 3 },
    { name: '年収770万円以上 ~ 1,160万円未満', value: 4 },
    { name: '年収1,160万円以上', value: 5 }
  ],
  result () {
    return this.focused.value
  }
})

module.exports = {
  agePrompt,
  confirmAmhPrompt,
  amhPrompt,
  confirmHighCostMedicalExpenseBenefitPrompt,
  classificationOfHighCostMedicalExpenseBenefitPrompt
}
