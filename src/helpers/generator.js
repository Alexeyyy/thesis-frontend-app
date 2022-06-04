export function generateTeams(users, count) {
    const teams = []
    for (let i = 0; i < count; i++) {
        const memberCount = generateNumber(4, 7)
        const memberIndices = []
        while (memberIndices.length != memberCount) {
            const index = generateNumber(0, users.length - 1)
            if (!memberIndices.includes(index)) {
                memberIndices.push(index)
            }
        }

        const members = users
            .filter((user, index) => memberIndices.includes(index))
            .map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    login: user.login,
                    avatar_url: user.avatar_url
                }
            });

        const team = {
            sort: i + 1,
            members: members,
            overallRating: generateFloatNumber(1.0, 4.0),
            techList: [
                'Java', '.NET', 'JavaScript', 'Kafka', 'Vue.js'
            ],
            metrics: [
                {
                    name: 'Зрелость команды',
                    value: generateFloatNumber(1.0, 4.0)
                },
                {
                    name: 'Soft skills',
                    value: generateFloatNumber(1.0, 4.0)
                },
                {
                    name: 'Признание проектов',
                    value: generateFloatNumber(1.0, 4.0)
                }
            ]
        }
        teams.push(team)
    }
    return teams
}

export function generateArray (count, min, max) {
    let array = []
    while (array.length !== count) {
        const number = generateNumber(min, max)
        if (!array.includes(number)) {
            array.push(number)
        }
    }
    return array.sort()
}

export function generateAscendingArray (count, min, step) {
    let array = []
    let val = min
    for (var i = 0; i < count; i++) {
        array.push(val)
        val += step
    }
    return array
}

export function generateNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateFloatNumber (min, max) {
    return (Math.random() * (max - min + 1.0) + min).toFixed(1)
}

export function generateTasks (users) {
    const tasks = []
    users.forEach((user, index) => {
        console.log(generateNumber(1, 2))
        const task = {
            id: generateNumber(1, 100),
            alpha: user,
            name: `Поиск #${index + 1}`,
            depth: generateNumber(1, 4),
            duration: generateNumber(60, 300),
            status: generateNumber(1, 2),
            details: {
                progress: 100,
                repos: generateNumber(500, 6000),
                profiles: generateNumber(500, 50000),
                teams: generateNumber(10, 80)
            }
        }
        tasks.push(task)
        console.log(`generated task for user ${user.id}`)
    });
    return tasks
}