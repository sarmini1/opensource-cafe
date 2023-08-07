import axios from "axios";

const BASE_API_URL = "http://localhost:5001";

/**
 * Class holds static methods for making API calls to the
 * SnackOrBoozeAPI and presenting errors as needed.
 */
class SnackOrBoozeApi {

  //Returns a string with formatted error info
  static generateErrorMessage(err) {
    let statusCode = err.response.request.status;
    let url = err.response.config.url;
    return `Location: ${url}, status: ${statusCode}`;
  }

  //Receives a type and sends GET request to API to retrieve
  // an array of items of that type. Returns array.
  static async getItems(type) {
    try {
      const result = await axios.get(`${BASE_API_URL}/${type}`);
      return result.data;
    } catch (err) {
      console.error("API Error:", err.response);
      throw this.generateErrorMessage(err);
    }
  }

  //Sends POST request to add a new item to the appropriate place
  // based on the type of item. Returns new item.
  static async addItem(item) {
    const { id, name, description, recipe, serve } = item;
    try {
      const result = await axios.post(`${BASE_API_URL}/${item.type}s`,
        { id, name, description, recipe, serve });
      return result.data;
    } catch (err) {
      console.error("API Error:", err.response);
      throw this.generateErrorMessage(err);
    }
  }

}

export default SnackOrBoozeApi;