export default function getQueryString(query: FilterQueryT[]): string {
    return [...query]
        .sort((a, b) => (a.name as any) - (b.name as any))
        .map((item) => `${item.name}=${item.value}`)
        .join('&');
}
