package com.jiangklijna.cfg

import io.vertx.core.http.ServerWebSocket
import io.vertx.core.http.WebSocketFrame
import java.util.concurrent.ConcurrentHashMap

class WebSocket(val id: String, val socket: ServerWebSocket) {

    init {
        socket.frameHandler(this::frameHandler)
        socket.closeHandler { clients.remove(id) }
    }

    private fun frameHandler(frame: WebSocketFrame) {

    }

    companion object {

        private val clients = ConcurrentHashMap<String, WebSocket>()

        operator fun get(id: String) = clients[id]

        operator fun contains(id: String) = clients.contains(id)

        val handler = { socket: ServerWebSocket ->
            val id = socket.binaryHandlerID()
            if (id !in clients) {
                clients[id] = WebSocket(id, socket)
            }
        }
    }
}
