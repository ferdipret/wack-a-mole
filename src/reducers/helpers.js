export function getRandomHoles() {
  const getValue = () => Math.floor(Math.random() * 16)

  let array = []
  do {
    const newValue = getValue()
    if(array.indexOf(newValue) === -1) {
      array = array.concat(newValue)
    }
  } while (array.length !== 4) 

  return array
}

export function calculateScore(hits)  {
  // Not so much a calculation but rather a get
  switch(hits) {
    case 1: return 1
    case 2: return 4
    case 3: return 16
    case 4: return 256
    default: return 0
  }
}
