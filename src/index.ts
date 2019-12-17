import { request, RequestOptions } from "https";
import { validateAdress } from "./validateAdress";
import { GetInfoResponse } from "./GetInfoResponse";

class IpgeoClient {
  constructor(private readonly host: string, private readonly port: number) {}

  async getInfo(ip: string): Promise<GetInfoResponse> {
    await validateAdress(ip);
    return this.sendRequest(ip);
  }

  private sendRequest(ip: string): Promise<GetInfoResponse> {
    return new Promise((resolve, reject) => {
      const options: RequestOptions = {
        host: this.host,
        port: this.port,
        path: `/?ip=${ip}`
      };

      request(options, res => {
        res.on("error", reject);

        if (res.statusCode !== 200) {
          reject(
            new Error(`Request was not successful, status: ${res.statusCode}`)
          );
        }

        let data = "";

        res.on("data", chunk => (data += chunk));

        res.on("end", () => {
          const parsedResponse: GetInfoResponse = JSON.parse(data);
          resolve(parsedResponse);
        });
      }).end();
    });
  }
}

export default IpgeoClient;
