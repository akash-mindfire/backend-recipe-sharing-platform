import { Request, Response } from "express";
import {
  Homepage,
  MostViewed,
  CuratedCollection,
  Trending,
} from "../schema/home.schema"; // Adjust the path accordingly

// Controller to fetch all homepage-related data in one response
export const getAllHomepageData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [
      homepageRecipes,
      trendingRecipes,
      mostViewedRecipes,
      curatedCollections,
    ] = await Promise.all([
      Homepage.find(),
      Trending.find(),
      MostViewed.find(),
      CuratedCollection.find(),
    ]);

    const combinedResponse = {
      carousel: homepageRecipes,
      trending: trendingRecipes,
      mostViewed: mostViewedRecipes,
      curatedCollection: curatedCollections,
    };

    // Combine the data into a single response object
    res.status(200).json(combinedResponse);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// Other controller functions remain unchanged...
