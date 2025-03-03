export function formatNumber(number: number) {
    if (number < 10000) return number.toLocaleString('pt-BR'); // Até 10k
    if (number < 1000000) return `${(number / 1000).toFixed(1)}k`; // Entre 10k e 1M
    if (number < 1000000000) return `${(number / 1000000).toFixed(1)}M`; // Entre 1M e 1B
    if (number < 1000000000000) return `${(number / 1000000000).toFixed(1)}B`; // Entre 1B e 1T

    // Qualquer coisa acima de 1T, possivelmente desnecessário para nossa aplicação
    return `${(number / 1000000000000).toFixed(1)}T`;
}

export function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} bytes`; // Até 1KB
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`; // Entre 1KB e 1MB
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`; // Entre 1MB e 1GB
    if (bytes < 1099511627776) return `${(bytes / 1073741824).toFixed(1)} GB`; // Entre 1GB e 1TB

    // Qualquer coisa acima de 1TB, possivelmente desnecessário para nossa aplicação
    return `${(bytes / 1099511627776).toFixed(1)} TB`;
}

export function imageUrl(url: string) {
    const isAbsolute = url.startsWith('http://') || url.startsWith('https://');
    if (isAbsolute) return url;
    const url_split = url.split('://');
    const prefix = url_split[0];
    const path = url_split[1];
    const parsers = ((import.meta.env.VITE_URL_PARSERS as string) || '').split(',');
    const parser = parsers.find(parser => parser.startsWith(prefix));
    if (!parser) return url;
    const domain = parser.split(':')[1];
    return `https://${domain}/${path}`;
}
