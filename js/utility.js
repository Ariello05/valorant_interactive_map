function eraser(array) {
  const new_array = []
  array.forEach((element) => {
    if (!new_array.includes(element)) {
      new_array.push(element)
    }
  })
  return new_array
}

export { eraser }
