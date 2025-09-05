export function findCookie(name: string): string | undefined {
    return  document.cookie.split(';').
    find(row => row.startsWith(name + '='))
}
