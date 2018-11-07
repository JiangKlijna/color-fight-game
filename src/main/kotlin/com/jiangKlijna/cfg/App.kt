package com.jiangklijna.cfg

import io.vertx.core.Vertx.vertx
import io.vertx.ext.web.Router
import io.vertx.ext.web.handler.StaticHandler

class App {

    val vertx = vertx()

    fun start() {
        val r = Router.router(vertx)
        r.route().handler(StaticHandler.create("html/"))
        val server = vertx.createHttpServer()
        server.websocketHandler(WebSocket.handler)
        server.requestHandler(r::accept).listen(8080)
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            App().start()
        }
    }

}