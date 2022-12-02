import {Seasons} from "./types/types";
import * as React from "react";

const currentMonth = new Date().getMonth();

export const seasonBackground = (): Seasons => {

    if ([11, 0, 1].includes(currentMonth)) {
        return Seasons.Winter
    } else if ([2, 3, 4].includes(currentMonth)) {
        return Seasons.Spring
    } else if ([5, 6, 7].includes(currentMonth)) {
        return Seasons.Summer
    } else {
        return Seasons.Autumn
    }
}



