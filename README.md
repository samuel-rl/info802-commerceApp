<h1 align="center">INFO 802</h1>

<h3 align="center">Commerce App :</h3>

J'ai décider de recommencer depuis le début pour faire une application React-Native car ce sera dans la Roadmap de mon stage.

Ici je suis partie du principe que c'est un projet pour un client, qui souhaite une application de vente de vétements par collection.
Voici le [Dribble original pour le design](https://dribbble.com/shots/7272690-RHB-App).

<div align="center">
    <img align="center" src="https://github.com/samuel3105/info802-commerceApp/blob/master/assets/commerce.gif?raw=true" alt="image" />
</div>

<h3 align="center">GraphQL :</h3>

_*Problème*_ : Ici impossible d'utiliser [graphql-tools](https://github.com/ardatan/graphql-tools) sur firebase lors du `firebase deploy`. Cette bibliothèque est une des bibliothèques utiliser par l'entreprise de mon stage donc j'ai perdu du temps à essayer de l'utiliser avant de voir que le problème venait de Firebase. Cette bibliothèque permet de mieux organiser notre graphql comme par exemple :

-   avoir un fichier `.graphql` séparer du reste.
-   avoir nos resolvers dans un fichier séparer du reste.

On utilisera Firebase avec Firestore comme base de donnée. Tout sera stocké dessus :

-   les images
-   les données

De plus, on utilisera les clouds functions de firebase, ce qui facilitera son déploiment.

_*Attention*_ : Depuis quelques teps, on est obligé de passer notre projet en mode `Blaze plan`.

Les types qu'on utilisera :

```
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
```

Nos Query:

-   `getAllItem` : renvoi tous les items de la base de donnée
-   `getAllCollection` : renvoi toutes les collections
-   `getHomeCollection` : renvoi la première collection de la base de donnée, ce sera celle sur l'accueil.
-   `getNewArrivals` : renvoi les 6 premiers items de la base de donnée

Nos Mutation:

-   `addPurchaseById` : ajoute dans la base de donnée le panier de l'acheteur, pour garder une trace de l'achat.

Pour la mutation, on vas récuperer l'identifiant unique du téléphone de l'acheteur, si il est pas dans la base de donnée on l'ajoute un on lui met son panier acheté, si il existe déja dans la base de donnée, alors c'est qu'il a déjà acheté des choses, on lui mettra son nouveau panier acheter en plus dans autres. Il aurait été possible de pouvoir retrouver les commandes passées pour chaque utilisateur, mais le but ici était surtout de pouvoir utiliser et comprendre les mutations.

<h3 align="center">Soap :</h3>

Le soap est fait en javascript avec un serveur node. J'ai utiliser Heroku héberger le serveur.

Le wsdl est accessible ici : https://info802-serveur-soap.herokuapp.com/pricecalculator?wsdl

Ici, pour calculer le prix de livraison, on va regarder dans quel pays on va livrer
Pour des raisons de simplicités, le poids d'un produit est égal a 1, car je n'avais pas implémenté de poids dès le début dans la base de donnée et dans le typage de mes produits.

Si le pays dans lequel on envoit le colis est :

-   France (FR) alors on fait `poids * 0.5`,
-   Belgique (BE) alors on fait `poids * 1`,
-   N'importe quel autres pays alors on fait `poids * 2`,

```js
const weight = args.weight;
const country = args.country;
let frais = 0;
switch (country) {
	case 'FR':
		frais = 0.5 * weight;
		break;
	case 'BE':
		frais = 1 * weight;
		break;
	default:
		frais = 2 * weight;
		break;
}
return { frais: frais };
```

<div align="center">
    <img align="center" src="https://github.com/samuel3105/info802-commerceApp/blob/master/assets/soap.gif?raw=true" alt="image" />
</div>

Le prix de livraison est recalculé à chaque fois que le pays est changé sur l'application.

Il y a aussi dans la partie soap, un fichier html qui sera utilisé pour la partie MangoPay, c'est le plus simple de l'intégré ici car le soap allait être le seul déployé sur Heroku et la page HTML devait être accessible sur internet. 

<h3 align="center">MangoPay :</h3>

Ici on a un wallet de base qui à été créé en amont, ce sera notre wallet.
A chaque fois qu'un utilisateur voudra payer, son profil sera créé dans la sandboard MangoPay.
On peut tester en payant avec une fake carte de MangoPay.

<div align="center">
    <img align="center" src="https://github.com/samuel3105/info802-commerceApp/blob/master/assets/mangopay.gif?raw=true" alt="image" />
</div>

Une fois le payement réussi une page est lancée pour nous prevenir que tout c'est bien passé. Au bout du compte à rebourt, la page se ferme grace a un message envoyé en javascript avec `sendMessage` et grace à un `onMessage` sur l'application (de la même manière que pour les websockets).

Le lien de la page de payement réussi : https://info802-serveur-soap.herokuapp.com/payementSuccess.

Lorsqu'on retourne sur la page d'accueil, on remet le panier à zéro. 

_*Attention*_ : Je n'ai pas pensé à mettre des verifications sur les champs textes du formulaires, il faut donc faire attention à bien remplir les Inputs.

<h3 align="center">Les images originales</h3>
<div align="center">

[le site Caroll](https://www.caroll.com/fr_fr/)

</div>
