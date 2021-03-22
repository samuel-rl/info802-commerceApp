const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

var serviceAccount = require('./info802-firebase-graphql-firebase-adminsdk-vvccg-9cc2fefbc4.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://info802-firebase-graphql-default-rtdb.firebaseio.com',
});

const typeDefs = gql`
	type Item {
		price: Float!
		name: String!
		image: String!
		description: String!
	}

	type Collection {
		name: String!
		items: [Item]!
		image: String!
	}

	type Query {
		getAllItem: [Item]!
		getAllCollection: [Collection]!
		getHomeCollection: Collection!
		getNewArrivals: [Item]!
	}

	input ItemMutation {
		price: Float!
		name: String!
		image: String!
		description: String!
	}

	input Purchase {
		uniqueId: String!
		items: [ItemMutation]!
	}

	type Mutation {
		addPurchaseById(data: Purchase!): [Item]!
	}
`;

const resolvers = {
	Query: {
		async getAllItem() {
			let tempDoc = [];
			const db = admin.firestore().collection('items');
			await db.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					tempDoc.push({ id: doc.id, ...doc.data() });
				});
			});
			return tempDoc;
		},
		async getAllCollection() {
			let tempDoc = [];
			const db = admin.firestore().collection('collections');
			await db.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					tempDoc.push({ id: doc.id, ...doc.data() });
				});
			});
			return tempDoc;
		},
		async getHomeCollection() {
			let tempDoc = [];
			const db = admin.firestore().collection('collections');
			await db.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					tempDoc.push({ id: doc.id, ...doc.data() });
				});
			});
			return tempDoc[0];
		},
		async getNewArrivals() {
			let tempDoc = [];
			const db = admin.firestore().collection('items').limit(6);
			await db.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					tempDoc.push(doc.data());
				});
			});
			return tempDoc;
		},
	},
	Mutation: {
		async addPurchaseById(_, args) {
			const doc = admin.firestore().collection('purchases').doc(args.data.uniqueId);
			await doc.get().then(docData => {
				if (docData.exists) {
					doc.update({
						purchases: admin.firestore.FieldValue.arrayUnion({ items: args.data.items }),
					});
				} else {
					doc.set({
						purchases: [{ items: args.data.items }],
					});
				}
			});
			return args.data.items;
		},
	},
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/', cors: true });
exports.graphql = functions.https.onRequest(app);
