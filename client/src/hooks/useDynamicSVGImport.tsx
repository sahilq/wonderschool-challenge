import React from 'react';
import Completed from '../icons/Completed';
import Group from '../icons/Group';
import Incomplete from '../icons/Incomplete';
import Locked from '../icons/Locked';

export default function useDynamicSVGImport(
    name: string,
) {
    switch (name) {
        case 'completed': {
            return { SvgIcon: Completed };

        }
        case 'group': {
            return { SvgIcon: Group };

        }
        case 'incomplete': {
            return { SvgIcon: Incomplete };

        }
        case 'locked': {
            return { SvgIcon: Locked };

        }
        default: {
            return { SvgIcon: Completed };

        }
    }
}
