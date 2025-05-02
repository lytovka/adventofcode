import { assertRequiredEnvs } from "./misc.js";
import HttpHelper from "./http.js";

class AoCService {
  constructor() {
    const { sessionToken, baseUrl } = assertRequiredEnvs();
    this.baseUrl = baseUrl;
    this.sessionToken = sessionToken;
    this.http = new HttpHelper();
  }

  async fetchInput(year, day) {
    const url = `${this.baseUrl}/${year}/day/${day}/input`;
    return await this.http.get(url, {
      cookie: `session=${this.sessionToken}`,
    });
  }

  async fetchPuzzle(year, day) {
    const url = `${this.baseUrl}/${year}/day/${day}`;
    return await this.http.get(url, {
      cookie: `session=${this.sessionToken}`,
    });
  }

  async submitAnswer(year, day, part, answer) {
    const url = `${this.baseUrl}/${year}/day/${day}/answer`;
    return await this.http.post(url, `level=${part}&answer=${answer}`, {
      "Content-Type": "application/x-www-form-urlencoded",
      cookie: `session=${this.sessionToken}`,
    });
  }
}

const aocService = new AoCService();

export default aocService;
