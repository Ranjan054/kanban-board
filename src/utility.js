import { labels } from './constant';

const { P0, P1, P2, P3, P4 } = labels;

export const getIsoMatch = (dateString) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).\d{3}Z$/;
    const match = regex.exec(dateString);
    if (match) {
        return match;
    }
    return false

};

export const formatISODate = (isoDateString) => {
    const match = getIsoMatch(isoDateString);
    if (!match) {
        return 'invalid date';
    }
    const [, year, month, day, hours, minutes] = match;
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
};

export const getLabelColor = (label) => {
    switch (label) {
        case P0:
            return 'text-red-500'
        case P1:
            return 'text-indigo-500'
        case P2:
            return 'text-purple-500'
        case P3:
            return 'text-sky-500'
        case P4:
            return 'text-green-500'
        default:
            return 'text-slate-900'
    }
}
