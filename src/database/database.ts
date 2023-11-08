import logger from "@shared/logger";
import mongoose from "mongoose";
import app from "@server";

class Database {
  //   /**
  //    * Get DB Instance
  //    */
  //   public static async getDBInstance() {
  //     if (!Database.instance) {
  //       try {
  //         console.log("mongo connection created");
  //         Database.instance = new Database();
  //       } catch (error: any) {
  //         console.log("Mongo Connection ERROR! " + error);
  //         process.exit(1);
  //       }
  //     }
  //     return Database.instance;
  //   }

  //   constructor() {
  //     // const url = `mongodb+srv://${this.user}:${this.pass}​​​​​​​​​​​​​​​@cluster0.jwkzxtx.mongodb.net/?retryWrites=true&w=majority`;
  //     // const url = `mongodb://${​​​​​​​​this.host}​​​​​​​​:${​​​​​​​​this.port}​​​​​​​​​​​​​​​​?connectTimeoutMS=10000`;
  //     const url = `mongodb://smaiadmin:smai#2020@52.172.248.57:27017?connectTimeoutMS=10000`;

  //     /** create Pool */
  //     const clientOption = {
  //       socketTimeoutMS: 30000,
  //       keepAlive: true,
  //       minPoolSize: 30,
  //       maxPoolSize: 100,
  //       autoIndex: false,
  //     };

  //     mongoose
  //       .createConnection(url, clientOption)
  //       .asPromise()
  //       .then(async (res) => {
  //         console.log("client MongoDB Connection ok!");
  //         app.set("DB", res);
  //       })
  //       .catch((err: Error) => {
  //         logger.error(err);
  //       });

  //     process.on("SIGINT", () => {
  //       mongoose.connection.close();
  //     });
  //   }
  //   private static instance: any = null;
  //   private host: string = process.env.NOSQL_DB_HOST || "localhost";
  //   private user: string = process.env.NOSQL_DB_USER || "";
  //   private pass: string = process.env.NOSQL_DB_PASS || "";
  //   private port: string = process.env.NOSQL_DB_PORT || "27017";

  /**
   * Get DB Instance
   */
  public static async getDBInstance() {
    if (!Database.instance) {
      try {
        console.log("mongo connection created");
        Database.instance = new Database();
      } catch (error: any) {
        console.log("Mongo Connection ERROR! " + error);
        process.exit(1);
      }
    }

    return Database.instance;
  }

  constructor() {
    const url =
      "mongodb+srv://<username>:<pass>@cluster0.jwkzxtx.mongodb.net/?retryWrites=true&w=majority";
    // coment above line and uncomment below line in case of testeing with cluster setup on server
    //`mongodb+srv://${this.user}:${this.pass}@cluster0.jwkzxtx.mongodb.net/?retryWrites=true&w=majority`;
    // umcommnet below line to setup mongo with local
    // `mongodb://${this.user}:${this.pass}@${this.host}​​​​​​​​:${this.port}​​​​​​​​​​​​​​​​?connectTimeoutMS=10000`;
    const clientOption = {
      socketTimeoutMS: 30000,
      useNewUrlParser: true,
      autoIndex: false,
      useUnifiedTopology: true,
    };

    const db = mongoose.createConnection(url, clientOption);

    db.on(
      "error",
      console.error.bind(console, "MongoDB Connection Error>> : ")
    );
    db.once("open", () => {
      console.log("client MongoDB Connection ok!");
    });

    process.on("SIGINT", () => {
      mongoose.connection.close();
      process.exit(0);
    });

    app.set("DB", db);
  }

  private static instance: any = null;
  private host: string = process.env.NOSQL_DB_HOST || "localhost";
  private user: string = process.env.NOSQL_DB_USER || "";
  private pass: string = process.env.NOSQL_DB_PASS || "";
  private port: string = process.env.NOSQL_DB_PORT || "27017";
}

export { Database };
