import { MongoClient, Collection, ObjectId } from "mongodb";
import { IAuthTokenPayload } from "routes/authRoutes";

interface IReviewDocument {
  game: string;
  user: string;
  rating: number;
  text: string;
}

interface IGameDocument {
  _id?: ObjectId;
  title: String;
  image: String;
  averageRating: Number;
  players: String;
  playTime: String;
  age: String;
  description: String;
}

interface Users {
  _id?: ObjectId;
  username: String;
}

export class GameProvider {
  private gameCollection: Collection<IGameDocument>;
  private reviewCollection: Collection<IReviewDocument>;
  private userCollection: Collection<Users>;

  constructor(private readonly mongoClient: MongoClient) {
    const gamesName = process.env.GAMES_COLLECTION_NAME;
    const reviewsName = process.env.REVIEWS_COLLECTION_NAME;
    const usersName = process.env.USERS_COLLECTION_NAME;

    if (!gamesName || !reviewsName || !usersName) {
      throw new Error("Missing collection name(s) in .env");
    }

    this.gameCollection = this.mongoClient
      .db()
      .collection<IGameDocument>(gamesName);
    this.reviewCollection = this.mongoClient
      .db()
      .collection<IReviewDocument>(reviewsName);
      this.userCollection = this.mongoClient
      .db()
      .collection<Users>(usersName);
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
    if (result.insertedId === undefined) {
      return false;
    }
    const game = review.game;
    const allReviews = await this.reviewCollection.find({ game }).toArray();

    const newAvg =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    const res = await this.gameCollection.updateOne(
      { title: game },
      { $set: { averageRating: newAvg } }
    );
    if (!res) {
      return false;
    }
    console.log(res.matchedCount);

    return true;
  }

  async getReviewsForGame(gameTitle: string): Promise<IReviewDocument[]> {
    const reviews = await this.reviewCollection
      .find({ game: { $regex: `^${gameTitle}$`, $options: "i" } }) // case-insensitive match
      .sort({ date: -1 })
      .toArray();

    return reviews;
  }

  async getUserReviews(user: IAuthTokenPayload): Promise<IReviewDocument[]> {
    const result = await this.reviewCollection
      .find({ user: user.username })
      .sort({ createdAt: -1 })
      .toArray();
      return result; 
  }
}
