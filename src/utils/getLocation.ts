type LocationT = {
    search: Record<string, string | string[]>;
};

export default function getLocation(): LocationT {
    const search = window.location.search.slice(1);
    const searchData: LocationT['search'] = {};

    search.split('&').forEach((item) => {
        if (item) {
            const [key, value] = item.split('=');

            if (typeof searchData[key] === 'string') {
                searchData[key] = [searchData[key]];
            }

            if (Array.isArray(searchData[key])) {
                searchData[key].push(value);
            } else {
                searchData[key] = value;
            }
        }
    });

    const location: LocationT = {
        search: searchData,
    };

    return location;
}
