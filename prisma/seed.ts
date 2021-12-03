import { User } from '.prisma/client';
import dbClient from '../src/utils/dbClient'

async function seed() {
await dbClient.user.deleteMany();

console.log(`Start Seeding`)

const user:User = await dbClient.user.create({
    data: {
email: 'Emmanuel',
password: 'qwerty'
    }
})
console.log("Created User and Seeding finished:", user)
}
seed()
.catch((error) => {
    console.error(error.message)
})
.finally(async () => {
    await dbClient.$disconnect();
    process.exit(1)
}) 
