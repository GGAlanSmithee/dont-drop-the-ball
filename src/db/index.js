import Dexie from 'dexie'

var db = new Dexie('DontDropTheBall')

// Define a schema
db.version(1).stores({
    teams: '++id, isActive, name',
    players: '++id, isActive, teamId, name, x, y, [teamId+isActive]',
    balls: '++id, isActive, playerId, task, [playerId+isActive]'
})

class Team {
    toJSON() {
        return {
            id: parseInt(this.id || 0, 10),
            isActive: parseInt(this.isActive || 0, 10) === 1 ? true : false,
            name: this.name || ''
        }
    }
}

db.balls.mapToClass(Team)

class Player {
    toJSON() {
        return {
            id: parseInt(this.id || 0, 10),
            isActive: parseInt(this.isActive || 0, 10) === 1 ? true : false,
            teamId: parseInt(this.teamId || 0, 10),
            name: this.name || '',
            x: parseInt(this.x || 0, 10),
            y: parseInt(this.y || 0, 10)
        }
    }
}

db.players.mapToClass(Player)

class Ball {
    toJSON() {
        return {
            id: parseInt(this.id || 0, 10),
            isActive: parseInt(this.isActive || 0, 10) === 1 ? true : false,
            playerId: parseInt(this.playerId || 0, 10),
            task: this.task || ''
        }
    }
}

db.balls.mapToClass(Ball)

// Open the database
db.open().catch(console.error)

export default db
export {
    Team,
    Player,
    Ball
}