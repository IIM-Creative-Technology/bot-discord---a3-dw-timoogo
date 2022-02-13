# projet de bot

## pour le faire fonctionner

### installation

__Cloner le repo__

```bash

git clone git@github.com:IIM-Creative-Technology/bot-discord---a3-dw-timoogo.git
```

__Entrer dans le dossier__

```bash
cd bot-discord---a3-dw-timoogo
```

__installer les dépendances__

```bash
npm install
```

---

### Configurer le `.env`

Dans le projet, il faut dupliquer le fichier `.env.example` et renommer la duplication `.env`. Dedans, il faudra remplacer les variables ["YOUR_TOKEN","YOUR_DATABASE_HOST", "YOUR_USER", "YOUR_PASSWORD","YOUR_DB_NAME"] par les informations qui correspondent

Pour que le projet fonctionne, dans le server discord, il faudra un channel (pour moi `awaken_hollow` modifiable dans ./bot/js:10). Il suffit de remplacer l'id déjà mit par l'id du channel
il faudra également un channel "test" (et donc modifier la ligne 41 du même fichier)

### pour la db

La requete sql pour créer la table xp nécéssaire pour l'xp des user

```sql
CREATE TABLE `xp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(25) NOT NULL DEFAULT '',
  `xp_count` int(11) unsigned NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```

### Template du serveur Discord à importer
[Lien du template de mon serveur](https://discord.new/6ZqYZME6AYw8)
Il y a : 
- [x] Les salons (je ne les ai pas tous utilisés pour ce projet)
- [x] Les Roles
- [x] Les paramètres de base
### Choix du préfix

Le choix du préfix des commandes se trouve dans `./bot.js` à la ligne 20

```js
const COMMAND_PREFIX = '!'; // il suffit de le remplacer par le préfix souhaité 
```

### Commandes disponibles

<details>
    <summary>`./commands/CleanChannel.js` <code>[rm]</code> </summary>
    <p>Permet de supprimer X messages dans un channel. Pour la lancer `[COMMAND_PREFIX]rm [nombre entre 2 et 99] </p>
    <h2>example</h2>
    <code>[COMMAND_PREFIX]rm [amount]``` \n example: ```!rm 50```</code>
</details>

<details>
    <summary>`./commands/getxp.js` </summary>
    <p>Permet de voir notre level & xp actuel </p>
    <h2>example</h2>
    <code>[COMMAND_PREFIX]getxp``` \n example: ```!getxp```</code>
    <p>la liste des palliers de niveaux est définie dans `./bot.js:80` </p>
 ```js
    const arrayoflevel = [20, 50, 100, 200,400]
```
</details>

<details>
    <summary>`./commands/Help.js` </summary>
    <p>Permet  de voir la liste des commandes et leur usages </p>
    <h2>example</h2>
    <code>[COMMAND_PREFIX]help [COMMAND_NAME]``` \n example: ```!help [COMMAND_NAME]```</code>
    <i> retourne un message si l'argument ne fait pas partie des commandes connues</i>
    <p> Liste les commandes disponibles sur le serveur. il faut spécifier celle que l'on souhaite a la place du [COMMAND_NAME] pour connaitre l'usage </p>
    <i>Dans une deuxième version, je ferais une loop qui les affichent toutes s'il n'y a pas d'argument. il faut aussi que je vérifie si l'utilisateur a les rôles assez élevés pour pouvoir faire les commandes</i>
</details>

<details>
    <summary>`./commands/WelcomeUser.js` <code>[wlc]</code>   </summary>
    <p>Permet  de tester a notre arrivé sur le serveur </p>
    <h2>example</h2>
    <code>[COMMAND_PREFIX]wlc [COMMAND_NAME]``` \n example: ```!wlc```</code>
    <p> Le bot nous souhaite la bienvenue </p>

    <i>dans une v2, il faudra que je vérifie si l'utilisateur ne l'a pas déjà lancé, et de donner assez de points pour passer le 1er niveau</i>
</details>
