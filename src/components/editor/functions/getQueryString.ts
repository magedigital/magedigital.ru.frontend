export default function getQueryString(query: any[]): string {
    return [...query]
        .sort((a, b) => (a.name as any) - (b.name as any))
        .map((item) => `${item.name}=${item.value}`)
        .join('&');
}
