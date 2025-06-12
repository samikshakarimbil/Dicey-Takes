import { MongoClient, Collection, ObjectId } from "mongodb";


interface IReviewDocument {
  game: string; 
  user: string;
  rating: number;
  text: string;
}


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
  private reviewCollection: Collection<IReviewDocument>;

  constructor(private readonly mongoClient: MongoClient) {
    const gamesName = process.env.GAMES_COLLECTION_NAME;
    const reviewsName = process.env.REVIEWS_COLLECTION_NAME;

    if (!gamesName || !reviewsName ) {
      throw new Error("Missing collection name(s) in .env");
    }

    this.gameCollection = this.mongoClient.db().collection<IGameDocument>(gamesName);
    this.reviewCollection = this.mongoClient.db().collection<IReviewDocument>(reviewsName);
  }
  


  async getAllGames() {
    const query: any = {};
    const games = await this.gameCollection.find(query).toArray();

    const result = games.map((game) => ({
      ...game,
    }));

    return result;
  }

  async addReview(review: IReviewDocument): Promise<boolean> {
    const result = await this.reviewCollection.insertOne(review);
    return result.insertedId !== undefined;
  }
  
  async getReviewsForGame(gameTitle: string): Promise<IReviewDocument[]> {
    const reviews = await this.reviewCollection
      .find({ game: { $regex: `^${gameTitle}$`, $options: "i" } }) // case-insensitive match
      .sort({ date: -1 }) 
      .toArray();
  
    return reviews;
  }
  

}
