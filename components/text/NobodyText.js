let noByArr = [
  "Maybe they are washing their hands",
  "Maybe they are wearing a mask",
  "Maybe they are maintaining social distance.",
  "Maybe they are self isolating.",
  "Maybe they are charging themselves.",
]

let randomNobodyText = () => noByArr[Math.floor(Math.random() * noByArr.length)]

export default randomNobodyText
