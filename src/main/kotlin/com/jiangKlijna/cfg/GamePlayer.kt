package com.jiangklijna.cfg

import com.jiangklijna.cfg.Api.Companion.failure
import com.jiangklijna.cfg.Api.Companion.invoke
import io.vertx.core.http.ServerWebSocket
import io.vertx.core.http.WebSocketFrame
import io.vertx.core.json.JsonObject
import java.util.concurrent.ConcurrentHashMap

class GamePlayer(val id: String, val socket: ServerWebSocket) {

    val api = Api()
    val room: GameRoom? = null

    init {
        socket.frameHandler(this::frameHandler)
        socket.closeHandler {
            room?.quit(this)
            clients.remove(id)
        }
    }

    private fun frameHandler(frame: WebSocketFrame) {
        val result = try {
            val obj = JsonObject(frame.textData())
            api.invoke(obj)
        } catch (e: Exception) {
            failure(e)
        }
        socket.writeTextMessage(result.toString())
    }

    companion object {

        private val clients = ConcurrentHashMap<String, GamePlayer>()

        operator fun get(id: String) = clients[id]

        operator fun contains(id: String) = clients.contains(id)

        operator fun iterator() = clients.iterator()

        val handler = { socket: ServerWebSocket ->
            val id = socket.binaryHandlerID()
            if (id !in this) {
                clients[id] = GamePlayer(id, socket)
            }
        }
    }
}
