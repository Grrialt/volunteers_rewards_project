import {
    RaccoonMeadowsVolunteers,
    RaccoonMeadowsActivity,
    raccoonMeadowsVolunteers,
} from './raccoon-meadows-log';

import {
    WolfPointVolunteers,
    WolfPointActivity,
    wolfPointVolunteers,
} from './wolf-point-log';

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;

type Volunteers = {
    id: number;
    name: string;
    activities: CombinedActivity[];
};

function combineVolunteers(
    volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
) {
    return volunteers.map( volunteer => {
        let id = volunteer.id
        if( typeof id === 'string'){
            id = parseInt(id, 10)
        }
        return {
            id: id,
            name: volunteer.name,
            activities: volunteer.activities
        }
    })
}

function isVerified(verified: string|boolean){
    if(typeof verified === 'string'){
        return verified === 'Yes'?true:false
    }

    return verified;
}

function getHours(activity){
    if('hours' in activity){
        return activity.hours
    }
    else activity.time
}

function calculateHours(volunteers: Volunteers[]) {
    return volunteers.map((volunteer) => {
        let hours = 0;

        volunteer.activities.forEach((activity) => {
            if(isVerified(activity.verified)){
                hours+=getHours(activity);
            }
        });

        return {
            id: volunteer.id,
            name: volunteer.name,
            hours: hours,
        };
    });
}

function byHours(a,b){
    return b.hours-a.hours
}

const combinedVolunteers = combineVolunteers(
    [].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);

let result = calculateHours(combinedVolunteers);
console.log(result.sort(byHours))

console.log(combinedVolunteers)
