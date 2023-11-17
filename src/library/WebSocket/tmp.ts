import TCPWebSocket from "npm:tcp-websocket";

function ModifyCloseMethod<T extends { new (...args: any[]): any }>(BaseClass: T) {
	return class extends BaseClass {
			// Override close method with a different parameter type
			close(code: number, reason: string) {
					super.close(reason, code)
			}
	};
}

const WebSocketClose = ModifyCloseMethod(TCPWebSocket);

class WebSocket extends WebSocketClose {
	addEventListener = (eventName: string, listener: (...args: any[]) => void) => {
		return this.addListener(eventName, listener);
};
}

export default WebSocket;
