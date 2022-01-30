type BooleanDictionary = { isTrue: string, isFalse: string }

const useBooleanBeautifier = (dictionary: BooleanDictionary) => {
  return {
    beautify: (assertion: boolean) => assertion ? dictionary["isTrue"] : dictionary["isFalse"]
  }
}

export default useBooleanBeautifier;