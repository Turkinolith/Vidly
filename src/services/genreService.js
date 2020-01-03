import httpService from "./httpService";
import { Endpoint } from "../config.json";

export function getRealGenres() {
  return httpService.get(Endpoint + "/genres");
}
