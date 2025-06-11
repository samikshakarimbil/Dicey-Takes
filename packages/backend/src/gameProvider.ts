import { MongoClient, Collection, ObjectId } from "mongodb";

interface IGameDocument {
  _id?: ObjectId;
  title: String,
  image: String,
  averageRating: Number,
  players: String,
  playTime: String,
  age: String,
  description: String,
  reviews: [];
}

export class GameProvider {
  private gameCollection: Collection<IGameDocument>;

  constructor(private readonly mongoClient: MongoClient) {
    const gamesName = process.env.GAMES_COLLECTION_NAME;

    if (!gamesName ) {
      throw new Error("Missing collection name(s) in .env");
    }

    this.gameCollection = this.mongoClient
      .db()
      .collection<IGameDocument>(gamesName);
  }


  async getAllGames() {
    const query: any = {};
    const games = await this.gameCollection.find(query).toArray();

    const result = games.map((game) => ({
      ...game,
    }));

    return result;
  }
}
