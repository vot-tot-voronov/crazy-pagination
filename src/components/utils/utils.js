export function createPages(pages, pagesCount, currentPage) {
    if(pagesCount > 10) {
        if(currentPage > 5) {
            for (let i = currentPage-4; i <= currentPage+5; i++) {
                pages.push(i)
                if(i === pagesCount) break
            }
        }
        else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if(i === pagesCount) break
            }
        }
    }  else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}
export function getRandom() {
    return Math.ceil(Math.random() * 10000);
}
export function tableRow (id, number, title) {
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{number}</td>
            <td>{title}</td>
        </tr>
    )
}