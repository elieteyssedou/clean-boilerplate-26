/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const up = async (db, client) => {
    // Create exampleresources collection with indexes
    await db.createCollection('exampleresources');
    
    // Create indexes for efficient querying
    await db.collection('exampleresources').createIndex({ teamId: 1 });
    await db.collection('exampleresources').createIndex({ '_meta.createdAt': -1 });
    await db.collection('exampleresources').createIndex({ 
        name: 'text', 
        description: 'text', 
        content: 'text',
        tags: 'text'
    });
    
    console.log('ExampleResource collection and indexes created successfully');
};

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db, client) => {
    // Drop the exampleresources collection
    await db.collection('exampleresources').drop();
    console.log('ExampleResource collection dropped successfully');
};
