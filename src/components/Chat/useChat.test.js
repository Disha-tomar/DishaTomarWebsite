const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

import { renderHook, act } from "@testing-library/react-hooks";
import { useChat } from "./useChat";

function streamResponse(text) {
  const encoder = new TextEncoder();
  return {
    ok: true,
    body: {
      getReader() {
        let done = false;
        return {
          read() {
            if (done) return Promise.resolve({ done: true, value: undefined });
            done = true;
            return Promise.resolve({ done: false, value: encoder.encode(text) });
          },
        };
      },
    },
  };
}

test("send streams the assistant reply into messages", async () => {
  global.fetch = jest.fn().mockResolvedValue(streamResponse("Hello there!"));
  const { result } = renderHook(() => useChat());

  act(() => result.current.setInput("Hi"));
  await act(async () => {
    await result.current.send();
  });

  const roles = result.current.messages.map((m) => m.role);
  expect(roles).toEqual(["user", "assistant"]);
  expect(result.current.messages[1].content).toBe("Hello there!");
  expect(global.fetch).toHaveBeenCalledWith("/api/chat", expect.objectContaining({ method: "POST" }));
});
