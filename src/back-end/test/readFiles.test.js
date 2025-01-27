/**
 * Tests exported security functions.
 */

/* Mock envvars */
process.env.HASHKEY = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

/* Imports */
const schema = require("../schema.js");
const { readUser } = require("../readFiles/readUser.js");
const { updateUser } = require("../updateFiles/updateUser.js");
const mongoose = require("mongoose");

describe("readUser() Tests", () => {
    const ENCRYPTION_KEY = "KEYKEYKEYKEYKEYKEYKEYKEY";

    /**
     * Create an empty user object with the username and password.
     *
     * @param {String} email The email of the user to create.
     */
    const createEmptyUser = (email) => ({
        email: email,
        theme: "lightmode",
        index: {
            objectType: "index",
            futureLogs: [],
            collections: []
        },
        dailyLogs: [],
        monthlyLogs: [],
        futureLogs: [],
        trackers: [],
        collections: [],
        imageBlocks: [],
        audioBlocks: [],
        textBlocks: [],
        events: [],
        tasks: [],
        signifiers: []
    });

    /**
     * Removes Mongo userIds from userdata.
     *
     * @param {Object} user The object to remove the IDs from.
     */
    const removeIds = (user) => {
        delete user.__v;
        delete user._id;
        for (let obj of user.dailyLogs) {
            delete obj._id;
        }
        for (let obj of user.monthlyLogs) {
            delete obj._id;
            for (let day of obj.days) {
                delete day._id;
            }
        }
        for (let obj of user.futureLogs) {
            delete obj._id;
            for (let month of obj.months) {
                delete month._id;
            }
        }
        for (let obj of user.trackers) {
            delete obj._id;
        }
        for (let obj of user.collections) {
            delete obj._id;
        }
        for (let obj of user.imageBlocks) {
            delete obj._id;
        }
        for (let obj of user.audioBlocks) {
            delete obj._id;
        }
        for (let obj of user.textBlocks) {
            delete obj._id;
        }
        for (let obj of user.events) {
            delete obj._id;
        }
        for (let obj of user.tasks) {
            delete obj._id;
        }
        for (let obj of user.signifiers) {
            delete obj._id;
        }
        return user;
    };

    /**
     * Inserts a user into the database.
     *
     * @param {Object} user The user to insert.
     */
    const insertUser = async (user) => {
        await new schema.User(user).save();
        let insertedUser = await updateUser(user.email, ENCRYPTION_KEY, user);
        return insertedUser;
    };

    /* Connect to the in-memory Mongo server */
    beforeAll(async () => {
        mongoose.set("useCreateIndex", true);
        await mongoose.connect(`${globalThis.__MONGO_URI__}${globalThis.__MONGO_DB_NAME__}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    });

    /* Drop the database */
    afterEach(async () => {
        await schema.User.deleteMany({});
    });

    /* Clean up the connection */
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Empty user read", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with daily log", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.dailyLogs.push({
            id: "DEADBEEF",
            collections: ["BEEFBEEF", "CAFECAFE"],
            objectType: "signifier",
            date: JSON.parse(JSON.stringify(new Date(0))),
            parent: "CAFEBEEF",
            content: ["First String", "Second String", "Third String"],
            trackers: ["First Tracker", "Second Tracker", "Third Tracker"]
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with monthly log", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.monthlyLogs.push({
            id: "DEADBEEF",
            objectType: "signifier",
            parent: "CAFEBEEF",
            startDate: JSON.parse(JSON.stringify(new Date(0))),
            endDate: JSON.parse(JSON.stringify(new Date(2000 * 200))),
            content: ["BEEFCAFE"],
            collections: ["AAAAAAA"],
            days: [
                {
                    id: "CAFECAFE",
                    date: JSON.parse(JSON.stringify(new Date(0)))
                }
            ],
            trackers: ["First Tracker", "Second Tracker", "Third Tracker"],
            recurringTrackers: ["TRACEKRS TRACKERS"]
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with future log", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.futureLogs.push({
            id: "DEADBEEF",
            objectType: "signifier",
            title: "The Lorax",
            startDate: JSON.parse(JSON.stringify(new Date(0))),
            endDate: JSON.parse(JSON.stringify(new Date(100000000))),
            content: ["CFEFVED", "ASDASFDF"],
            collections: ["72132432", "34235325"],
            months: [
                {
                    id: "CAFECAFE",
                    date: JSON.parse(JSON.stringify(new Date(787878)))
                }
            ],
            trackers: ["First Tracker", "Second Tracker", "Third Tracker"],
            recurringTrackers: ["Hoop", "la"]
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with trackers", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.trackers.push({
            id: "DEADBEEF",
            objectType: "signifier",
            title: "Tacker",
            content: ["Lorem", "Ipsum", "Novo"],
            parent: "CAFEBEEF"
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with collections", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.collections.push({
            id: "DEADBEEF",
            objectType: "signifier",
            title: "Collection",
            parent: "CAFEBEEF",
            content: ["First", "Second", "Third"],
            collections: ["342q34234", "34234243"],
            trackers: ["34254235", "455423544"]
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    /*
     * Image and audio blocks are broken and may be removed in the future.
     * This test may come in hand when/if they aren't removed. As of now it
     * is impossible for them to pass given the current schema.
     */
    /*
     *Test("User with imageBlocks", async (done) => {
     *    const insertedUser = createEmptyUser('user@example.com');
     *    insertedUser.imageBlocks.push({
     *        id: "DEADBEEF",
     *        objectType: "signifier",
     *        parent: "CAFEBEEF",
     *        arrangement: "Up",
     *        data: (new TextEncoder()).encode("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
     *    });
     *    let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
     *    user = removeIds(JSON.parse(JSON.stringify(user)));
     *    expect(user).toEqual(insertedUser);
     *});
     */

    test("User with text blocks", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.textBlocks.push({
            id: "DEADBEEF",
            objectType: "signifier",
            tabLevel: 0,
            parent: "BEEFBEEF",
            kind: "Event",
            objectReference: "DEADEAD",
            text: "This is some text",
            signifiers: ["orange", "purple"]
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with events", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.events.push({
            id: "CAFEBEEF",
            objectType: "signifier",
            title: "A title",
            references: ["DEADBEEF"],
            date: JSON.parse(JSON.stringify(new Date()))
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with tasks", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.tasks.push({
            id: "CAFEBEEF",
            objectType: "task",
            references: ["DEADBEEF"],
            text: "A task",
            complete: 0
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with signifiers", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.signifiers.push({
            id: "CAFEBEEF",
            objectType: "signifier",
            meaning: "general",
            symbol: "&#x1F7E0;"
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User with one of everything", async () => {
        const insertedUser = createEmptyUser("user@example.com");
        insertedUser.dailyLogs.push({
            id: "DEADBEEF",
            collections: ["BEEFBEEF", "CAFECAFE"],
            objectType: "signifier",
            date: JSON.parse(JSON.stringify(new Date(0))),
            parent: "CAFEBEEF",
            content: ["First String", "Second String", "Third String"],
            trackers: ["First Tracker", "Second Tracker", "Third Tracker"]
        });
        insertedUser.monthlyLogs.push({
            id: "DEADBEEF",
            objectType: "signifier",
            parent: "CAFEBEEF",
            startDate: JSON.parse(JSON.stringify(new Date(0))),
            endDate: JSON.parse(JSON.stringify(new Date(2000 * 200))),
            content: ["BEEFCAFE"],
            collections: ["AAAAAAA"],
            days: [
                {
                    id: "CAFECAFE",
                    date: JSON.parse(JSON.stringify(new Date(0)))
                }
            ],
            trackers: ["First Tracker", "Second Tracker", "Third Tracker"],
            recurringTrackers: ["TRACEKRS TRACKERS"]
        });
        insertedUser.futureLogs.push({
            id: "DEADBEEF",
            objectType: "signifier",
            title: "The Lorax",
            startDate: JSON.parse(JSON.stringify(new Date(0))),
            endDate: JSON.parse(JSON.stringify(new Date(100000000))),
            content: ["CFEFVED", "ASDASFDF"],
            collections: ["72132432", "34235325"],
            months: [
                {
                    id: "CAFECAFE",
                    date: JSON.parse(JSON.stringify(new Date(787878)))
                }
            ],
            trackers: ["First Tracker", "Second Tracker", "Third Tracker"],
            recurringTrackers: ["Hoop", "la"]
        });
        insertedUser.trackers.push({
            id: "DEADBEEF",
            objectType: "signifier",
            title: "Tacker",
            content: ["Lorem", "Ipsum", "Novo"],
            parent: "CAFEBEEF"
        });
        insertedUser.collections.push({
            id: "DEADBEEF",
            objectType: "signifier",
            title: "Collection",
            parent: "CAFEBEEF",
            content: ["First", "Second", "Third"],
            collections: ["342q34234", "34234243"],
            trackers: ["34254235", "455423544"]
        });
        insertedUser.events.push({
            id: "CAFEBEEF",
            objectType: "signifier",
            title: "A title",
            references: ["DEADBEEF"],
            date: JSON.parse(JSON.stringify(new Date()))
        });
        insertedUser.textBlocks.push({
            id: "DEADBEEF",
            objectType: "signifier",
            tabLevel: 0,
            parent: "BEEFBEEF",
            kind: "Event",
            objectReference: "DEADEAD",
            text: "This is some text",
            signifiers: ["orange", "purple"]
        });
        insertedUser.signifiers.push({
            id: "CAFEBEEF",
            objectType: "signifier",
            meaning: "general",
            symbol: "&#x1F7E0;"
        });
        await insertUser(insertedUser);
        let user = await readUser(insertedUser.email, ENCRYPTION_KEY);
        user = removeIds(JSON.parse(JSON.stringify(user)));
        expect(user).toEqual(insertedUser);
    });

    test("User does not exist", (done) => {
        readUser("user@example.com", ENCRYPTION_KEY).
            then(() => {
                expect(true).toBe(false);
                done();
            }).
            catch((err) => {
                expect(err.message).toBe("User does not exist!");
                done();
            });
    });

    test("User password isn't returned", async () => {
        const emptyUser = createEmptyUser("user@example.com");
        emptyUser.pwd = "Nonsense";
        await new schema.User(emptyUser).save();
        const user = await readUser("user@example.com", ENCRYPTION_KEY);
        expect(user.pwd).toBeUndefined();
    });
});
