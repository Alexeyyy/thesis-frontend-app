export function getTopElementsFromDict(dict, topCount = 3) {
    let items = Object.keys(dict).map((key) => {
        return [key, dict[key]]
    })
    return items.sort((first, second) => {
        return second[1] - first[1]
    }).slice(0, topCount).map((element) => element[0])
}