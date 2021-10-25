export function filterTags(tagsArr) {
    let arr = [];
    if (tagsArr.length > 2) {
        let firstFew = tagsArr.slice(0, 6);
        firstFew.map((obj) => {
            arr.push(...obj.tags.slice(0, 2));
        });
    } else {
        arr.push(...tagsArr[0].tags.slice(0, 6));
    }
    return arr;
}
