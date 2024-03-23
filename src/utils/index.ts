

export function arraify<T>(val: T) {
    return Array.isArray(val) ? val : [val]
}

export function arrayMergeExclude(baseArray: unknown[], newArray: unknown[]) {
    const excludedBase = baseArray.filter(bItem => !newArray.includes(bItem))
    const excludedNew = newArray.filter(nItem => !baseArray.includes(nItem))
    return [...excludedBase, ...excludedNew]
}

export function createUUID() {
    const tau = Math.trunc(performance.now())
    const random_1 = Math.trunc(Math.random() * 1E5)
    const random_2 = Math.trunc(Math.random() * 1E5)
    return [(tau % random_1).toString(16), (tau % random_2).toString(16)].join('-')
}