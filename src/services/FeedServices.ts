import { useAccessTokenStore } from "../stores/accessToken";
import { HttpApiServices } from "./HttpApiServices";

export class FeedServices extends HttpApiServices {
  async getHomeFeed() {
    return await this.get("/feed");
  }

  async getFeedById(id: String) {
    return await this.get("/feed?id=" + id);
  }

  async togglLike(id: String) {
    return this.put(`/like?id=${id}`);
  }

  async sendComment(id: String, comment: String) {
    return this.put(`/comment?id=${id}`, {
      comment,
    });
  }
}
