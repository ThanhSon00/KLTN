export const removeFalsyProperties = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};

    function processObject(source: Record<string, any>, target: Record<string, any>): void {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                const value = source[key];
                if (value !== null && value !== undefined) {
                    if (typeof value === 'object') {
                        if (Object.keys(value).length > 0) {
                            target[key] = {};
                            processObject(value, target[key]);
                        }
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
    }

    processObject(obj, result);
    return result;
}