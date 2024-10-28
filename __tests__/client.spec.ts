import { client } from "../src/client";

describe("client", () => {
  it("should define dynamicClient", () => {
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
    expect(client.viem).toBeDefined();
    expect(client.reactNative).toBeDefined();
    expect(client.reactNative.WebView).toBeDefined();
  });
});
