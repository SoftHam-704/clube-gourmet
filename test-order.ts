
import { db } from './src/db/index';
import { plans } from './src/api/database/schema';

async function test() {
    try {
        console.log("Testing orderBy...");
        const res1 = await db.select().from(plans).orderBy(plans.price);
        console.log("Result 1 (default): success,", res1.length, "plans found.");
        res1.forEach(p => console.log(`${p.name}: ${p.price}`));
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
