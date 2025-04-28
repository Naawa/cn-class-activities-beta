interface Activity {
    name: string,
    image: string,
}

export function getTimeBlocks(weekday: boolean, hour: number) {
    let timeBlocks: Date[] = []
    let minute: number = 0
    if (weekday) {
        minute = 30
    }
    for (let i = 0; i < 6; i++) {
        if (minute == 60) {
            minute = 0
            hour += 1;
        }
        let activityTimeBlock = new Date()
        activityTimeBlock.setHours(hour, minute, 0, 0)
        timeBlocks.push(activityTimeBlock)
        if (i == 1 || i == 2) {
            minute += 20
        }
        else {
            minute += 10
        }
    }
    return timeBlocks
}

export function getSeniorTimeBlocks(weekday: boolean, hour: number, numberOfActivities: number) {
    let timeBlocks: Date[] = []
    let minute: number = 0
    if (weekday) {
        minute = 30
    }
    for (let i = 0; i < numberOfActivities + 1; i++) {
        if (minute == 60) {
            minute = 0
            hour += 1;
        }
        let activityTimeBlock = new Date()
        activityTimeBlock.setHours(hour, minute, 0, 0)
        timeBlocks.push(activityTimeBlock)
        if (i == numberOfActivities - 2) {
            minute += 40
        }
        else {
            minute += 10
        }
    }
    return timeBlocks
}


export let activities: Activity[] = [
    {
        name: "Typing",
        image: "keyboard.svg"
    },
    {
        name: "Code.org",
        image: "code.svg"
    },
    {
        name: "CodeSpark",
        image: "code-spark.svg"
    },
    {
        name: "Free Time",
        image: "free-time.svg"
    },
]

export let seniorActivities: Activity[] = [
    {
        name: "Typing",
        image: "keyboard.svg"
    },
    {
        name: "Impact",
        image: "code.svg"
    },
    {
        name: "Exploration",
        image: "free-time.svg"
    },
]

